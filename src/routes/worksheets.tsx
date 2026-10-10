import type {
  CustomWorksheet,
  Worksheet,
  WorksheetItem,
  WorksheetLanguage,
} from "@/api/homework.api";
import {
  getCustomWorksheet,
  getLatestWorksheet,
  LANGUAGE_LABELS,
  LanguageSchema,
} from "@/api/homework.api";
import { Group } from "@/components/atoms/Group";
import { Toggle } from "@/components/atoms/Toggle";
import { TextInput } from "@/components/form/TextInput";
import { Anchor } from "@/components/molecules/Anchor";
import { Button } from "@/components/molecules/Button";
import { FillInTheBlank } from "@/components/molecules/FillTheBlank/FillTheBlank";
import { splitFillInTheBlankPrompt } from "@/components/molecules/FillTheBlank/fillInTheBlank.util";
import { TranslateTheSentence } from "@/components/molecules/TranslateTheSentence";
import { WorksheetSkeleton } from "@/components/molecules/WorksheetSkeleton/WorksheetSkeleton";
import { formatDate } from "@/lib/utils";
import { Page, Panel } from "@/styles/routes/blog.styled";
import {
  Homework,
  LanguageToggle,
  WorksheetDate,
  WorksheetHeader,
} from "@/styles/routes/routes.styled";
import { css } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { z } from "zod";

type SectionEntry = { key: string; title: string; items: WorksheetItem[] };

const REQUEST_INPUT_ID = "spanish-worksheet-request";

function titleCase(text: string): string {
  return text.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  );
}

function getLatestSection(worksheet?: Worksheet | null): SectionEntry[] {
  if (!worksheet) return [];

  return Object.keys(worksheet.content)
    .filter((k) => worksheet.content[k]?.length)
    .map((k) => ({
      key: k,
      title: titleCase(k),
      items: worksheet.content[k]!,
    }));
}

function WorksheetItems({
  items,
  answers,
  onAnswerChange,
}: {
  items: WorksheetItem[];
  answers: Record<string, string>;
  onAnswerChange: (prompt: string, value: string) => void;
}) {
  return (
    <Homework>
      {items.map((item, i) => {
        const prompt = splitFillInTheBlankPrompt(item.prompt);

        if (prompt.type === "translation") {
          return (
            <TranslateTheSentence
              key={item.prompt}
              sentence={`${i + 1}. ${prompt.text}`}
              correctAnswer={item.answer}
              value={answers[item.prompt] ?? ""}
              onValueChange={(value) => onAnswerChange(item.prompt, value)}
            />
          );
        }

        return (
          <FillInTheBlank
            key={item.prompt}
            beforeText={`${i + 1}. ${prompt.beforeText}`}
            afterText={prompt.afterText}
            promptText={item.prompt}
            correctAnswer={item.answer}
            value={answers[item.prompt] ?? ""}
            onValueChange={(value) => onAnswerChange(item.prompt, value)}
          />
        );
      })}
    </Homework>
  );
}

const WorksheetsSearchSchema = z.object({
  lang: LanguageSchema.optional().catch(undefined),
});

export const Route = createFileRoute("/worksheets")({
  validateSearch: WorksheetsSearchSchema,
  component: WorksheetsPage,
});

function WorksheetsPage() {
  const { isAdmin } = useRouteContext({ from: "__root__" });
  const fetchWorksheet = useServerFn(getLatestWorksheet);
  const createWorksheet = useServerFn(getCustomWorksheet);
  const navigate = Route.useNavigate();
  const lang: WorksheetLanguage = Route.useSearch().lang ?? "es";
  const languageLabel = LANGUAGE_LABELS[lang];

  function handleLanguageToggle() {
    const next: WorksheetLanguage = lang === "es" ? "ca" : "es";
    navigate({
      search: { lang: next === "es" ? undefined : next },
      replace: true,
    });
  }

  const [request, setRequest] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});

  function handleAnswerChange(prompt: string, value: string) {
    setAnswers((prev) => {
      if (!value) {
        const { [prompt]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [prompt]: value };
    });
  }

  const { data, isLoading } = useQuery<Worksheet | null>({
    queryKey: ["worksheet", "latest", lang],
    queryFn: () => fetchWorksheet({ data: { language: lang } }),
    staleTime: 1000 * 60 * 60 * 48, // 48 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const {
    data: customData,
    isLoading: customIsLoading,
    error: customError,
    refetch,
  } = useQuery<CustomWorksheet>({
    queryKey: ["worksheet", "custom", lang, request],
    queryFn: () => createWorksheet({ data: { request, language: lang } }),
    enabled: false,
  });

  const latestSections = useMemo(() => getLatestSection(data), [data]);

  function handleCustom() {
    const trimmed = request.trim();
    if (!trimmed || customIsLoading) return;
    refetch();
  }

  return (
    <Page>
      <Panel>
        <WorksheetHeader>
          {data?.created_at && (
            <WorksheetDate>
              LAST UPDATED:{" "}
              {formatDate({
                value: data.created_at,
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </WorksheetDate>
          )}
          <h1>{languageLabel} Worksheets</h1>

          <Group direction="column" gap="0.5rem" width="100%">
            <p>
              This project AI-generates {languageLabel} homework and gets
              updated every two days.{" "}
              <Anchor
                link="https://michaelsavage.ie/projects/spanish-worksheets"
                text="Read about the project here."
                variant="link"
              />{" "}
              {data?.themes ? (
                <>Current themes: {data.themes.join(", ")}</>
              ) : null}
            </p>

            <LanguageToggle>
              <p>Español</p>
              <Toggle on={lang === "ca"} handleChange={handleLanguageToggle} />
              <p>Català</p>
            </LanguageToggle>
          </Group>

          {isAdmin ? (
            <Group
              direction="row"
              gap="0"
              wrap="wrap"
              css={css`
                max-width: 560px;
                margin: 1rem auto;

                input {
                  flex: 3;
                  width: 100%;
                  min-width: 250px;
                  padding: 6px 10px;
                  border-top-left-radius: 8px;
                  border-bottom-left-radius: 8px;
                }
                button {
                  flex: 1;
                  max-width: fit-content;
                  justify-content: center;
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                }
              `}
            >
              <TextInput
                id={REQUEST_INPUT_ID}
                name="request"
                placeholder="Enter request... e.g. 'Subjunctive present tense about movies'"
                value={request}
                onChange={(e) => setRequest(e.target.value)}
              />
              <Button
                id="spanish-worksheet-create"
                text={customIsLoading ? "Creating…" : "Create worksheet"}
                disabled={customIsLoading || request.trim().length === 0}
                ariaBusy={customIsLoading}
                onClick={handleCustom}
              />
            </Group>
          ) : null}
        </WorksheetHeader>

        {customIsLoading ? (
          <WorksheetSkeleton />
        ) : customData ? (
          <Group
            direction="row"
            gap="1.5rem"
            css={css`
              margin-top: 1.5rem;
            `}
            wrap="wrap"
          >
            <p>
              <strong>Request:</strong> {customData.request}
            </p>

            <Group direction="column" gap="0.75rem" width="100%">
              <h3>Exercises</h3>
              <WorksheetItems
                items={customData.content.exercises}
                answers={answers}
                onAnswerChange={handleAnswerChange}
              />
            </Group>
          </Group>
        ) : null}

        {customError ? (
          <p role="alert">
            {customError instanceof Error
              ? customError.message
              : "Could not create worksheet."}
          </p>
        ) : null}

        {isLoading ? (
          <WorksheetSkeleton />
        ) : data ? (
          <Group direction="row" gap="1.5rem" wrap="wrap">
            {latestSections.map(({ key, title, items }) => (
              <Group key={key} direction="column" gap="0.75rem" width="100%">
                <h2>{title}</h2>
                <WorksheetItems
                  items={items}
                  answers={answers}
                  onAnswerChange={handleAnswerChange}
                />
              </Group>
            ))}
          </Group>
        ) : data === null ? (
          <p>
            No {languageLabel} worksheet yet. Check back after the next update.
          </p>
        ) : null}
      </Panel>
    </Page>
  );
}
