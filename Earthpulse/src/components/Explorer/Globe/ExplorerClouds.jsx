import { Sphere, useTexture } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import cloudsTexture from "../../../assets/textures/clouds.jpg";

export default function ExplorerClouds() {

  const clouds = useRef();

  const texture = useTexture(cloudsTexture);

  useFrame((state, delta) => {
    if (!clouds.current) return;

    clouds.current.rotation.y += delta * 0.015;
  });

  return (

    <Sphere
      ref={clouds}
      args={[1.012, 128, 128]}
    >

      <meshPhongMaterial
        map={texture}
        transparent
        opacity={0.45}
        depthWrite={false}
      />

    </Sphere>

  );

}