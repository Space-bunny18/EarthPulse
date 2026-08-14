import { Sphere, useTexture } from "@react-three/drei";
import dayTexture from "../../../assets/textures/earth_day.jpg";
import bumpTexture from "../../../assets/textures/earth_bump.jpg";
import specularTexture from "../../../assets/textures/earth_specular.jpg";
import nightTexture from "../../../assets/textures/earth_night.jpg";

export default function ExplorerEarth() {
 const [
  dayMap,
  bumpMap,
  specularMap,
  nightMap,
] = useTexture([
  dayTexture,
  bumpTexture,
  specularTexture,
  nightTexture,
]);
  return (
    <>
      {/* Day Earth */}
      <Sphere args={[1, 128, 128]}>
        <meshPhongMaterial
          map={dayMap}
          bumpMap={bumpMap}
          bumpScale={0.04}
          specularMap={specularMap}
          shininess={12}
        />
      </Sphere>

      {/* Night Lights */}
      <Sphere args={[1.001, 128, 128]}>
        <meshBasicMaterial
          map={nightMap}
          transparent
          opacity={0.45}
          blending={2}
        />
      </Sphere>
    </>
  );
}