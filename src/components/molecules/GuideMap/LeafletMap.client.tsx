import { GuideHeader } from "@/components/molecules/GuideMap/GuideMap.styled";
import { Picture } from "@/components/molecules/Picture";
import { items } from "@/content/guide/barcelona";
import { LeafletProvider } from "@/context/LeafletProvider";
import type { GuideTableItem } from "@/types/Guide";
import { css } from "@emotion/react";
import { Map, Marker } from "leaflet";
import { RefObject, useEffect, useMemo, useRef } from "react";

type LeafletMapProps = {
  selectedItem?: string | null;
  isSelectionActive?: boolean;
};

type MapSelectionProps = {
  selectedItem?: string | null;
  isSelectionActive?: boolean;
  mapItems: GuideTableItem[];
  markerRefs: RefObject<Record<number, Marker | null>>;
  useMap: () => Map;
};

const MapMarkerView = ({
  selectedItem,
  isSelectionActive,
  mapItems,
  markerRefs,
  useMap,
}: MapSelectionProps) => {
  const map = useMap();

  useEffect(() => {
    if (!isSelectionActive || !selectedItem) return;

    const itemIndex = mapItems.findIndex((item) => item.id === selectedItem);
    if (itemIndex < 0) return;

    const item = mapItems[itemIndex];
    if (!item.coordinates) return;

    const marker = markerRefs.current[itemIndex];
    if (!marker) return;

    map.setView(item.coordinates, map.getZoom(), { animate: true });

    const open = () => {
      marker.openPopup();
      map.off("moveend", open);
    };

    map.on("moveend", open);
  }, [isSelectionActive, map, mapItems, markerRefs, selectedItem]);

  return null;
};

const LeafletMap = ({
  selectedItem,
  isSelectionActive = true,
}: LeafletMapProps) => {
  const markerRefs = useRef<Record<number, Marker | null>>({});
  const mapItems = useMemo(() => items, []);

  return (
    <LeafletProvider>
      {({ MapContainer, TileLayer, Marker, Popup, useMap }) => (
        <MapContainer
          center={[41.3851, 2.1734]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapMarkerView
            selectedItem={selectedItem}
            isSelectionActive={isSelectionActive}
            mapItems={mapItems}
            markerRefs={markerRefs}
            useMap={useMap}
          />

          {mapItems.map(
            (item, index) =>
              item.coordinates && (
                <Marker
                  key={index}
                  position={item.coordinates}
                  ref={(marker) => {
                    markerRefs.current[index] = marker;
                  }}
                >
                  <Popup autoPan={false} className="map-popup">
                    <GuideHeader>{item.title}</GuideHeader>
                    {item.image && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Picture
                          src={item.image}
                          alt={item.title}
                          style={css`
                            max-height: 120px;
                            margin-top: 0.4rem;
                          `}
                        />
                      </a>
                    )}
                  </Popup>
                </Marker>
              )
          )}
        </MapContainer>
      )}
    </LeafletProvider>
  );
};

export default LeafletMap;
