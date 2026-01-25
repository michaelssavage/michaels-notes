import { ReactNode, memo, useEffect, useState } from "react";

type LeafletModule = typeof import("react-leaflet");

type LeafletProviderProps = {
  children: (leaflet: LeafletModule) => ReactNode;
};

export const LeafletProvider = memo(({ children }: LeafletProviderProps) => {
  const [leaflet, setLeaflet] = useState<LeafletModule | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    import("leaflet/dist/leaflet.css");

    Promise.all([import("react-leaflet"), import("leaflet")]).then(
      ([rl, L]) => {
        const leaf = L.default;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (leaf.Icon.Default.prototype as any)._getIconUrl;
        leaf.Icon.Default.mergeOptions({
          iconRetinaUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });

        setLeaflet(rl);
        setReady(true);
      }
    );
  }, []);

  if (!ready || !leaflet) return null;

  return <>{children(leaflet)}</>;
});

LeafletProvider.displayName = "LeafletProvider";
