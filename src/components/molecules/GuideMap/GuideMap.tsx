import { Loading } from "@/components/molecules/Loading";
import { SplitMap } from "@/styles/routes/routes.styled";
import { useHydrated } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

type GuideMapProps = {
  selectedItem?: string | null;
  isSelectionActive?: boolean;
  withWrapper?: boolean;
};

const LeafletMap = lazy(() => import("./LeafletMap.client"));

export const GuideMap = ({
  selectedItem,
  isSelectionActive = true,
  withWrapper = true,
}: GuideMapProps) => {
  const isHydrated = useHydrated();

  const loadingContent = <Loading />;

  if (!isHydrated) {
    return withWrapper ? <SplitMap>{loadingContent}</SplitMap> : loadingContent;
  }

  const mapContent = (
    <Suspense fallback={loadingContent}>
      <LeafletMap
        selectedItem={selectedItem}
        isSelectionActive={isSelectionActive}
      />
    </Suspense>
  );

  return withWrapper ? <SplitMap>{mapContent}</SplitMap> : mapContent;
};
