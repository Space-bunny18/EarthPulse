import { Line } from "@react-three/drei";
import { latLngToVector } from "../utils/latLngToVector";

const india = [
  [37, 68],
  [35, 78],
  [30, 88],
  [23, 92],
  [8, 77],
  [22, 68],
  [37, 68],
];

export default function CountryLines() {
  const points = india.map(([lat, lng]) =>
    latLngToVector(lat, lng)
  );

  return (
    <Line
      points={points}
      color="#72E8FF"
      transparent
      opacity={0.8}
      lineWidth={1}
    />
  );
}