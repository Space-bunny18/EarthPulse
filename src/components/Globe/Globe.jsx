import { Canvas } from "@react-three/fiber";
import Scene from "./scene/Scene";
import "./Globe.css";

function Globe() {
  return (
    <div className="globe-container">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

export default Globe;