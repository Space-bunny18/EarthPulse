import { Canvas } from "@react-three/fiber";
import ExplorerScene from "./ExplorerScene";
import "./ExplorerGlobe.css";

export default function ExplorerGlobe() {
  return (
    <div className="explorer-globe">

      <Canvas
        camera={{
          position: [0, 0, 3.2],
          fov: 45,
        }}
      >
        <ExplorerScene />
      </Canvas>

    </div>
  );
}   