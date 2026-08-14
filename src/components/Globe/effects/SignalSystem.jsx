import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const points = [
  [1.1, 0.6, 0.8],
  [-0.9, 0.8, 0.9],
  [0.7, -1.1, 1.0],
  [-0.8, -0.7, -1.2],
  [0.2, 1.3, -0.4],
];

export default function SignalSystem() {
  const refs = useRef([]);

 useFrame(({ clock }) => {
  refs.current.forEach((mesh, i) => {
    if (!mesh) return;

    const pulse =
      1 + Math.sin(clock.elapsedTime * 3 + i) * 0.35;

    mesh.scale.setScalar(pulse);
  });
});

  return (
    <>
      {points.map((p, i) => (
        <Sphere
          key={i}
          args={[0.02, 12, 12]}
          position={p}
          ref={(el) => (refs.current[i] = el)}
        >
            <meshBasicMaterial
                color="#7CEEFF"
                toneMapped={false}
            />
        </Sphere>
      ))}
    </>
  );
}