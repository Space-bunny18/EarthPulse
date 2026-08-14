export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.25} />

      <directionalLight
        position={[5, 4, 4]}
        intensity={1.2}
        color="#A8E8FF"
      />

      <pointLight
        position={[-5, 2, 3]}
        intensity={0.8}
        color="#57C9FF"
      />

      <pointLight
        position={[0, -5, -2]}
        intensity={0.35}
        color="#2A7FFF"
      />
    </>
  );
}   