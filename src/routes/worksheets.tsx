import { createFileRoute, useRouteContext } from "@tanstack/react-router";

export const Route = createFileRoute("/worksheets")({
  component: RouteComponent,
});

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
  WorksheetDate,
  WorksheetHeader,
} from "@/styles/routes/routes.styled";
import { css } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

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

function WorksheetItems({ items }: { items: WorksheetItem[] }) {
  return (
    <Homework>
      {items.map((item, i) => {
        const prompt = splitFillInTheBlankPrompt(item.prompt);

        if (prompt.type === "translation") {
          return (
            <TranslateTheSentence
              key={`${i}-${item.prompt.slice(0, 24)}`}
              sentence={`${i + 1}. ${prompt.text}`}
              correctAnswer={getFirstAnswer(item.answer)}
            />
          );
        }

        return (
          <FillInTheBlank
            key={`${i}-${prompt.beforeText.slice(0, 24)}`}
            beforeText={`${i + 1}. ${prompt.beforeText}`}
            afterText={prompt.afterText}
            correctAnswer={item.answer}
          />
        );
      })}
    </Homework>
  );
}

function RouteComponent() {
  const { isAdmin } = useRouteContext({ from: "__root__" });
  const fetchWorksheet = useServerFn(getLatestSpanishWorksheet);
  const createWorksheet = useServerFn(getCustomWorksheet);

  const [request, setRequest] = useState("");

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

  const latestSections = getLatestSection(data);

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

          <p>
            A project that generates Spanish worksheets with AI. It gets updated
            every two days.{" "}
            <Anchor
              link="https://michaelsavage.ie/projects/spanish-worksheets"
              text="Read about the project here."
              variant="link"
            />
          </p>

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
              <WorksheetItems items={customData.content.exercises} />
            </Group>
          </Group>
        ) : null}

        {data?.themes ? <p>Themes: {data.themes.join(", ")}</p> : null}

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
                <WorksheetItems items={items} />
              </Group>
            ))}
          </Group>
        ) : null}
      </Panel>
    </Page>
  );
}
