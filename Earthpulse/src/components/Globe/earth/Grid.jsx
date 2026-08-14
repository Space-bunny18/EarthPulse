import * as THREE from "three";
import { Line } from "@react-three/drei";
import { useMemo } from "react";

const RADIUS = 1.565;

function createLatitude(latDeg) {
  const pts = [];
  const lat = THREE.MathUtils.degToRad(latDeg);

  const r = RADIUS * Math.cos(lat);
  const y = RADIUS * Math.sin(lat);

  for (let i = 0; i <= 360; i++) {
    const a = THREE.MathUtils.degToRad(i);

    pts.push([
      Math.cos(a) * r,
      y,
      Math.sin(a) * r,
    ]);
  }

  return pts;
}

function createLongitude(lonDeg) {
  const pts = [];
  const lon = THREE.MathUtils.degToRad(lonDeg);

  for (let i = -90; i <= 90; i++) {
    const lat = THREE.MathUtils.degToRad(i);

    pts.push([
      RADIUS * Math.cos(lat) * Math.cos(lon),
      RADIUS * Math.sin(lat),
      RADIUS * Math.cos(lat) * Math.sin(lon),
    ]);
  }

  return pts;
}

export default function Grid() {

  const latitudes = useMemo(() => {
    const arr = [];

    for (let i = -75; i <= 75; i += 10)
      arr.push(createLatitude(i));

    return arr;
  }, []);

  const longitudes = useMemo(() => {
    const arr = [];

    for (let i = 0; i < 360; i += 15)
      arr.push(createLongitude(i));

    return arr;
  }, []);

  return (
    <group>

      {latitudes.map((line, i) => (
        <Line
          key={i}
          points={line}
          color="#88F4FF"
          transparent
          opacity={0.18}
        />
      ))}

      {longitudes.map((line, i) => (
        <Line
          key={100 + i}
          points={line}
          color="#88F4FF"
          transparent
          opacity={0.14}
        />
      ))}

    </group>
  );
}