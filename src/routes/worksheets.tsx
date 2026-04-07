import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/worksheets")({
  component: RouteComponent,
});

import type { SpanishWorksheet, SWItem } from "@/api/spanish-homework.api";
import { getLatestSpanishWorksheet } from "@/api/spanish-homework.api";
import { Group } from "@/components/atoms/Group";
import { FillInTheBlank } from "@/components/molecules/FillTheBlank/FillTheBlank";
import { splitFillInTheBlankPrompt } from "@/components/molecules/FillTheBlank/fillInTheBlank.util";
import { TranslateTheSentence } from "@/components/molecules/TranslateTheSentence";
import { WorksheetSkeleton } from "@/components/molecules/WorksheetSkeleton/WorksheetSkeleton";
import { formatDate } from "@/lib/utils";
import { Page, Panel } from "@/styles/routes/blog.styled";
import { WorksheetDate, WorksheetHeader } from "@/styles/routes/routes.styled";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

function WorksheetItems({ items }: { items: SWItem[] }) {
  return (
    <Group direction="column">
      {items.map((item, i) => {
        const parts = splitFillInTheBlankPrompt(item.prompt);

        if (!parts) {
          return (
            <TranslateTheSentence
              key={`${i}-${item.prompt.slice(0, 24)}`}
              sentence={`${i + 1}. ${item.prompt}`}
              correctAnswer={item.answer}
            />
          );
        }

        return (
          <FillInTheBlank
            key={`${i}-${parts.beforeText.slice(0, 24)}`}
            beforeText={`${i + 1}. ${parts.beforeText}`}
            afterText={parts.afterText}
            correctAnswer={item.answer}
          />
        );
      })}
    </Group>
  );
}

function RouteComponent() {
  const fetchWorksheet = useServerFn(getLatestSpanishWorksheet);

  const { data, isLoading } = useQuery<SpanishWorksheet>({
    queryKey: ["spanish-worksheet", "latest"],
    queryFn: fetchWorksheet,
    staleTime: 1000 * 60 * 60 * 48, // 48 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const sections = Object.keys(
    data?.content ?? {},
  ) as (keyof SpanishWorksheet["content"])[];

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
          {data?.themes ? <p>Themes: {data.themes.join(", ")}</p> : null}
        </WorksheetHeader>

        {isLoading ? (
          <WorksheetSkeleton />
        ) : (
          <Group direction="column" gap="1.5rem">
            {sections.map((section) => (
              <Group key={section} direction="column" gap="0.75rem">
                <h2>{section}</h2>
                {data ? <WorksheetItems items={data.content[section]} /> : null}
              </Group>
            ))}
          </Group>
        )}
      </Panel>
    </Page>
  );
}
