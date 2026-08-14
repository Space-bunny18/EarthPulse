import { Stars } from "@react-three/drei";

export default function ExplorerStars() {
  return (
    <Stars
      radius={120}
      depth={60}
      count={5000}
      factor={5}
      saturation={0}
      fade
      speed={0.3}
    />
  );
}