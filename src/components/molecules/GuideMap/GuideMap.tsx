import { Loading } from "@/components/molecules/Loading";
import { SplitMap } from "@/styles/routes/routes.styled";
import { useHydrated } from "@tanstack/react-router";
import { useEffect, useState } from "react";

type GuideMapClient = typeof import("./GuideMap.client").default;

type GuideMapProps = {
  selectedItem?: string | null;
  isSelectionActive?: boolean;
  withWrapper?: boolean;
};

export const GuideMap = ({
  selectedItem,
  isSelectionActive = true,
  withWrapper = true,
}: GuideMapProps) => {
  const isHydrated = useHydrated();
  const [ClientOnlyMap, setClientOnlyMap] = useState<GuideMapClient | null>(
    null
  );

  useEffect(() => {
    if (!isHydrated) return;
    let isActive = true;

    import("./GuideMap.client").then((module) => {
      if (isActive) {
        setClientOnlyMap(() => module.default);
      }
    });

    return () => {
      isActive = false;
    };
  }, [isHydrated]);

  if (!isHydrated || !ClientOnlyMap) {
    const loadingContent = <Loading />;
    return withWrapper ? <SplitMap>{loadingContent}</SplitMap> : loadingContent;
  }

  const mapContent = (
    <ClientOnlyMap
      selectedItem={selectedItem}
      isSelectionActive={isSelectionActive}
    />
  );

  return withWrapper ? <SplitMap>{mapContent}</SplitMap> : mapContent;
};
