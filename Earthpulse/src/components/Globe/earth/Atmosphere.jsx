import { Sphere } from "@react-three/drei";
import * as THREE from "three";

export default function Atmosphere() {
 return (
  <>
    <Sphere args={[1.60, 64, 64]}>
      <meshBasicMaterial
        color="#5AD8FF"
        transparent
        opacity={0.04}
        side={THREE.BackSide}
      />
    </Sphere>

    <Sphere args={[1.68, 64, 64]}>
      <meshBasicMaterial
        color="#5AD8FF"
        transparent
        opacity={0.02}
        side={THREE.BackSide}
      />
    </Sphere>
  </>
);
}