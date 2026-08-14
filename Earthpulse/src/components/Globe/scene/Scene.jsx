import CameraController from "./CameraController";
import Lights from "./Lights";

import EarthGroup from "../earth/EarthGroup";
import BloomEffects from "../effects/BloomEffects";

export default function Scene() {
  return (
    <>
      <CameraController />

      <Lights />

      <EarthGroup />

      <BloomEffects />
    </>
  );
}