import { Sphere } from "@react-three/drei";

export default function Earth() {
  return (
    <Sphere args={[1.55, 128, 128]}>
      <meshStandardMaterial
        color="#07111F"
        roughness={1}
        metalness={0}
      />
    </Sphere>
  );
}