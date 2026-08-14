import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

export default function EarthquakeMarker({
  position,
  size,
  color,
  selected,
  onSelect,
}) {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!mesh.current) return;

    const targetScale = selected
      ? 1.8
      : hovered
      ? 1.3
      : 1;

    const pulse = selected
      ? 1 + Math.sin(state.clock.elapsedTime * 4) * 0.12
      : 1;

    const target = new THREE.Vector3(
      targetScale * pulse,
      targetScale * pulse,
      targetScale * pulse
    );

    mesh.current.scale.lerp(target, 0.12);
  });

  return (
    <mesh
      ref={mesh}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "default";
        setHovered(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <sphereGeometry args={[size, 6, 6]} />

      <meshBasicMaterial
        color={color}
        toneMapped={false}
      />
    </mesh>
  );
}