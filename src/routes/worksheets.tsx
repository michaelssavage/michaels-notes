import type {
  CustomWorksheet,
  SpanishWorksheet,
  SWItem,
  TranslationItem,
} from "@/api/spanish-homework.api";
import {
  getCustomWorksheet,
  getLatestSpanishWorksheet,
} from "@/api/spanish-homework.api";
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
  MixedViewToggle,
  WorksheetDate,
  WorksheetHeader,
} from "@/styles/routes/routes.styled";
import { css } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";

type WorksheetItem = SWItem | TranslationItem;
type SectionEntry = { key: string; title: string; items: WorksheetItem[] };

function getFirstAnswer(answer: WorksheetItem["answer"]): string {
  return Array.isArray(answer) ? (answer[0] ?? "") : answer;
}

const REQUEST_INPUT_ID = "spanish-worksheet-request";
const keys = ["past", "present", "future", "subjunctive"] as const;

function getLatestSection(worksheet?: SpanishWorksheet): SectionEntry[] {
  if (!worksheet) return [];

  return keys
    .filter((k) => worksheet.content[k]?.length)
    .map((k) => ({
      key: k,
      title: k.charAt(0).toUpperCase() + k.slice(1),
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
              correctAnswer={getFirstAnswer(item.answer)}
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
export const Route = createFileRoute("/worksheets")({
  component: WorksheetsPage,
});

function WorksheetsPage() {
  const { isAdmin } = useRouteContext({ from: "__root__" });
  const fetchWorksheet = useServerFn(getLatestSpanishWorksheet);
  const createWorksheet = useServerFn(getCustomWorksheet);

  const [mixedSections, setMixedSections] = useState(false);
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

  const { data, isLoading } = useQuery<SpanishWorksheet>({
    queryKey: ["spanish-worksheet", "latest"],
    queryFn: fetchWorksheet,
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
    queryKey: ["spanish-worksheet", "custom", request],
    queryFn: () => createWorksheet({ data: { request } }),
    enabled: false,
  });

  const latestSections = useMemo(() => getLatestSection(data), [data]);

  const mixedItems = useMemo(() => {
    const all = latestSections.flatMap((s) => s.items);
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j]!, all[i]!];
    }
    return all;
  }, [latestSections]);

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
          <h1>Spanish Worksheets</h1>

          {data?.themes ? (
            <Group direction="column" gap="0.5rem" width="100%">
              <p>
                This project generates Spanish homework using AI and gets
                updated every two days.
                <br />
                <Anchor
                  link="https://michaelsavage.ie/projects/spanish-worksheets"
                  text="Read about the project here."
                  variant="link"
                />
                <br />
                Current theme: {data.themes.join(", ")}
              </p>

              <MixedViewToggle>
                <p>Split Tenses</p>
                <Toggle
                  on={mixedSections}
                  handleChange={() => setMixedSections(!mixedSections)}
                />
                <p>Mixed Tenses</p>
              </MixedViewToggle>
            </Group>
          ) : null}

          {isAdmin ? (
            <Group
              direction="row"
              gap="0.25rem"
              wrap="wrap"
              css={css`
                max-width: 560px;

                input {
                  flex: 3;
                  width: auto;
                  padding: 6px 10px;
                }
                button {
                  flex: 1;
                  max-width: fit-content;
                  justify-content: center;
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
            {mixedSections ? (
              <WorksheetItems
                items={mixedItems}
                answers={answers}
                onAnswerChange={handleAnswerChange}
              />
            ) : (
              latestSections.map(({ key, title, items }) => (
                <Group key={key} direction="column" gap="0.75rem" width="100%">
                  <h2>{title}</h2>
                  <WorksheetItems
                    items={items}
                    answers={answers}
                    onAnswerChange={handleAnswerChange}
                  />
                </Group>
              ))
            )}
          </Group>
        ) : null}
      </Panel>
    </Page>
  );
}
