import * as THREE from "three";
import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

function createCircle(radius) {
  const pts = [];

  for (let i = 0; i <= 256; i++) {
    const a = (i / 256) * Math.PI * 2;

    pts.push([
      Math.cos(a) * radius,
      0,
      Math.sin(a) * radius,
    ]);
  }

  return pts;
}

export default function OrbitSystem() {
  const r1 = useRef();
  const r2 = useRef();
  const r3 = useRef();

  const c1 = useMemo(() => createCircle(2.0), []);
  const c2 = useMemo(() => createCircle(2.2), []);
  const c3 = useMemo(() => createCircle(2.45), []);

  useFrame((_, delta) => {
    r1.current.rotation.y += delta * 0.03;
    r2.current.rotation.x += delta * 0.02;
    r3.current.rotation.z -= delta * 0.01;
  });

  return (
    <>
      <group ref={r1} rotation={[0.8, 0.2, 0]}>
        <Line points={c1} color="#88F4FF" transparent opacity={0.08} />
      </group>

      <group ref={r2} rotation={[1.1, -0.5, 0.4]}>
        <Line points={c2} color="#88F4FF" transparent opacity={0.08} />
      </group>

      <group ref={r3} rotation={[0.3, 1.2, 0.8]}>
        <Line points={c3} color="#88F4FF" transparent opacity={0.08} />
      </group>
    </>
  );
}