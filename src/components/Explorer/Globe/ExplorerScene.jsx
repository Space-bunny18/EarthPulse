import { OrbitControls } from "@react-three/drei";

import ExplorerEarth from "./ExplorerEarth";
import EarthquakeLayer from "../layers/EarthquakeLayer";
import ExplorerAtmosphere from "./ExplorerAtmosphere";
import ExplorerClouds from "./ExplorerClouds";
import ExplorerStars from "./ExplorerStars";
import CameraController from "./CameraController";
import LayerRenderer from "../LayerRenderer";

export default function ExplorerScene() {

  return (
    <>

      <ambientLight intensity={0.35} />

        <directionalLight
        position={[5, 3, 5]}
        intensity={2.4}
        />

        <directionalLight
        position={[-5, -3, -5]}
        intensity={0.25}
        />

      <ExplorerEarth />
      <LayerRenderer />
      <ExplorerAtmosphere />
      <ExplorerClouds />
       <ExplorerStars />
        <CameraController />
     <ambientLight intensity={0.35} />
        <directionalLight
            position={[5,3,5]}
            intensity={2.4}
        />

        <directionalLight
            position={[-5,-3,-5]}
            intensity={0.25}
        />
      <OrbitControls
            enablePan={false}
            enableZoom={true}
            autoRotate={false}
            minDistance={2}
            maxDistance={4}
        />

    </>
  );

}