import useWildfires from "../../../hooks/useWildfires";
import latLngToVector3 from "../../../utils/latLngToVector3";
import { useExplorer } from "../../../context/ExplorerContext";

export default function WildfireLayer() {
  const {
    fires,
    loading,
  } = useWildfires();

  const {
    selectEvent,
  } = useExplorer();

  if (loading) {
    return null;
  }

  // Keep rendering lightweight
  const visibleFires = fires.slice(0, 1200);

  return (
    <>
      {visibleFires.map((fire, index) => {
        const latitude =
          Number(fire.latitude);

        const longitude =
          Number(fire.longitude);

        if (
          !Number.isFinite(latitude) ||
          !Number.isFinite(longitude)
        ) {
          return null;
        }

        const brightness =
          Number(fire.bright_ti4) || 0;

        let size = 0.006;
        let color = "#ff7043";

        if (brightness >= 330) {
          size = 0.007;
          color = "#ffb52e";
        }

        if (brightness >= 360) {
          size = 0.008;
          color = "#ff3b30";
        }

        const position =
          latLngToVector3(
            latitude,
            longitude,
            1.035
          );

        return (
          <mesh
            key={
              `${fire.acq_date || "fire"}-` +
              `${fire.acq_time || index}-` +
              index
            }
            position={position}
            onClick={(event) => {
              event.stopPropagation();

              selectEvent(
                fire,
                "wildfire"
              );
            }}
          >
            <sphereGeometry
              args={[
                size,
                6,
                6,
              ]}
            />

            <meshBasicMaterial
              color={color}
              toneMapped={false}
            />
          </mesh>
        );
      })}
    </>
  );
}