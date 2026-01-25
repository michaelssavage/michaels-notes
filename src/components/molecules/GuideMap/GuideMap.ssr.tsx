import { Loading } from "@/components/molecules/Loading";
import { SplitMap } from "@/styles/routes/routes.styled";
import { lazy, Suspense, useEffect, useState } from "react";

type GuideMapProps = {
  selectedItem?: string | null;
  isSelectionActive?: boolean;
  withWrapper?: boolean;
};

// Dynamically import only on client
const LazyGuideMap =
  typeof window !== "undefined"
    ? lazy(() => import("./GuideMap.client"))
    : null;

export const GuideMap = ({
  selectedItem,
  isSelectionActive = true,
  withWrapper = true,
}: GuideMapProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const loadingContent = <Loading />;

  if (!isClient || !LazyGuideMap) {
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
