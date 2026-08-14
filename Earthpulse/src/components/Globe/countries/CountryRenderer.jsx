import { Line } from "@react-three/drei";
import world from "../../../data/world.json";
import { latLngToVector } from "../utils/latLngToVector";

export default function CountryRenderer() {
  return (
    <>
      {world.features.map((feature, index) => {
        const geometry = feature.geometry;

        if (!geometry) return null;

        const polygons =
          geometry.type === "Polygon"
            ? [geometry.coordinates]
            : geometry.coordinates;

        return polygons.map((polygon, polyIndex) =>
          polygon.map((ring, ringIndex) => {
            const points = ring.map(([lng, lat]) =>
              latLngToVector(lat, lng)
            );

            return (
              <Line
                key={`${index}-${polyIndex}-${ringIndex}`}
                points={points}
                color="#66E8FF"
                transparent
                opacity={0.55}
                lineWidth={1}
              />
            );
          })
        );
      })}
    </>
  );
}