import { PerspectiveCamera } from "@react-three/drei";

export default function CameraController() {
  return (
    <PerspectiveCamera
      makeDefault
      position={[0, 0, 7.2]}
      fov={30}
      near={0.1}
      far={100}
    />
  );
}