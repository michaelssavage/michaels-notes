import { Group } from "@/components/atoms/Group";
import { MapIcon } from "@/components/icons";
import {
  GuideDescription,
  GuideHeader,
  GuideLink,
  GuidePrice,
} from "@/components/molecules/GuideMap/GuideMap.styled";
import { Picture } from "@/components/molecules/Picture";
import { items } from "@/content/guide/barcelona";
import { BasicLink } from "@/styles/routes/guide.styled";
import { css } from "@emotion/react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export const GuideMap = () => {
  return (
    <div style={{ height: "600px", width: "100%" }}>
      <MapContainer
        center={[41.3851, 2.1734]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {items.map(
          (item, index) =>
            item.coordinates && (
              <Marker key={index} position={item.coordinates}>
                <Popup className="map-popup">
                  <Group direction="row" gap="0.5rem">
                    {item.image && (
                      <Picture
                        src={item.image}
                        alt={item.title}
                        style={css`
                          flex: 1;
                          max-height: 100px;
                        `}
                      />
                    )}
                    <Group
                      direction="column"
                      justify="space-between"
                      gap="0.25rem"
                      css={css`
                        flex: 1;
                      `}
                    >
                      <GuideHeader>{item.title}</GuideHeader>
                      <GuidePrice>{item.price}</GuidePrice>
                    </Group>
                  </Group>
                  <GuideDescription>{item.description}</GuideDescription>

                  <Group
                    direction="row"
                    gap="0.25rem"
                    align="center"
                    justify="space-between"
                  >
                    <BasicLink
                      href={item.location}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Map <MapIcon />
                    </BasicLink>
                    {item.link && (
                      <GuideLink
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Website →
                      </GuideLink>
                    )}
                  </Group>
                </Popup>
              </Marker>
            )
        )}
      </MapContainer>
    </div>
  );
};
