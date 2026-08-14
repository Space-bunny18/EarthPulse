import { Sphere } from "@react-three/drei";
import * as THREE from "three";

export default function ExplorerAtmosphere() {
  return (
    <Sphere args={[1.06, 128, 128]}>
      <meshPhongMaterial
        color="#4cc9ff"
        transparent
        opacity={0.18}
        side={THREE.BackSide}
      />
      <meshPhongMaterial
            color="#59d8ff"
            transparent
            opacity={0.18}
            side={THREE.BackSide}
        />
    </Sphere>
    
  );
}