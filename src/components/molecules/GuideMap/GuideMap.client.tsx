import { Loading } from "@/components/molecules/Loading";
import { items } from "@/content/guide/barcelona";
import { Suspense, lazy, useMemo } from "react";

type ClientOnlyMapProps = {
  selectedItem?: string | null;
  isSelectionActive?: boolean;
};

const LeafletMap = lazy(() => import("./LeafletMap.tsx"));

const ClientOnlyMap = ({
  selectedItem,
  isSelectionActive = true,
}: ClientOnlyMapProps) => {
  const mapItems = useMemo(() => items, []);

  return (
    <Suspense fallback={<Loading />}>
      <LeafletMap
        mapItems={mapItems}
        selectedItem={selectedItem}
        isSelectionActive={isSelectionActive}
      />
    </Suspense>
  );
};

export default ClientOnlyMap;
