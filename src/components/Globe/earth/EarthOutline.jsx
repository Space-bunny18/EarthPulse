import { Sphere, useTexture } from "@react-three/drei";

export default function EarthOutline() {
  return (
    <Sphere args={[1.553, 128, 128]}>
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.65}
        color="#7DEEFF"
        depthWrite={false}
      />
    </Sphere>
  );
}