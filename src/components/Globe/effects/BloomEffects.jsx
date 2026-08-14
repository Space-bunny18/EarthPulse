import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function BloomEffects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.8}
        luminanceThreshold={0.15}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
    </EffectComposer>
  );
}