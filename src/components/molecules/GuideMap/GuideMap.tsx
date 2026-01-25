import { Loading } from "@/components/molecules/Loading";
import { SplitMap } from "@/styles/routes/routes.styled";
import { useHydrated } from "@tanstack/react-router";
import { Suspense, lazy } from "react";

type GuideMapProps = {
  selectedItem?: string | null;
  isSelectionActive?: boolean;
  withWrapper?: boolean;
};

const LazyGuideMap = lazy(() => import("./GuideMap.client"));

export const GuideMap = ({
  selectedItem,
  isSelectionActive = true,
  withWrapper = true,
}: GuideMapProps) => {
  const isHydrated = useHydrated();
  const loadingContent = <Loading />;

  if (!isHydrated || !LazyGuideMap) {
    return withWrapper ? <SplitMap>{loadingContent}</SplitMap> : loadingContent;
  }

  const mapContent = (
    <Suspense fallback={loadingContent}>
      <LazyGuideMap
        selectedItem={selectedItem}
        isSelectionActive={isSelectionActive}
      />
    </Suspense>
  );

  return withWrapper ? <SplitMap>{mapContent}</SplitMap> : mapContent;
};
