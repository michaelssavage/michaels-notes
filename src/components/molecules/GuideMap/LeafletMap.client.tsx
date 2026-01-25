import { GuideHeader } from "@/components/molecules/GuideMap/GuideMap.styled";
import { Picture } from "@/components/molecules/Picture";
import type { GuideTableItem } from "@/types/Guide";
import { css } from "@emotion/react";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

type LeafletMapProps = {
  selectedItem?: string | null;
  isSelectionActive?: boolean;
  mapItems: GuideTableItem[];
};

type MapSelectionProps = {
  selectedItem?: string | null;
  isSelectionActive?: boolean;
  mapItems: GuideTableItem[];
  markerRefs: React.RefObject<Record<number, unknown | null>>;
};

const MapSelectionEffect = ({
  selectedItem,
  isSelectionActive,
  mapItems,
  markerRefs,
}: MapSelectionProps) => {
  const map = useMap();

  useEffect(() => {
    if (!isSelectionActive || !selectedItem) return;

    const itemIndex = mapItems.findIndex((item) => item.id === selectedItem);
    if (itemIndex < 0) return;

    const item = mapItems[itemIndex];
    if (!item.coordinates) return;

    const marker = markerRefs.current[itemIndex];
    map.setView(item.coordinates, map.getZoom(), { animate: true });
    (marker as unknown as { openPopup: () => void })?.openPopup();
  }, [isSelectionActive, map, mapItems, markerRefs, selectedItem]);

  return null;
};

const LeafletMap = ({
  selectedItem,
  isSelectionActive = true,
  mapItems,
}: LeafletMapProps) => {
  const markerRefs = useRef<Record<number, unknown | null>>({});

  return (
    <MapContainer
      center={[41.3851, 2.1734]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapSelectionEffect
        selectedItem={selectedItem}
        isSelectionActive={isSelectionActive}
        mapItems={mapItems}
        markerRefs={markerRefs}
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
              <Popup className="map-popup">
                <GuideHeader>{item.title}</GuideHeader>
                {item.image && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
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
  );
};

export default LeafletMap;
