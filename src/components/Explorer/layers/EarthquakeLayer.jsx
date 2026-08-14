import useEarthquakes from "../../../hooks/useEarthquakes";
import latLngToVector3 from "../../../utils/latLngToVector3";
import { useExplorer } from "../../../context/ExplorerContext";
import EarthquakeMarker from "./EarthquakeMarker";

export default function EarthquakeLayer() {
  const { events, loading } = useEarthquakes();
  const { selectedEvent, selectEvent } = useExplorer();

  if (loading) return null;

  return (
    <>
      {events.map((quake) => {
        const [lng, lat] = quake.geometry.coordinates;

        const position = latLngToVector3(lat, lng, 1.02);

        const magnitude = quake.properties.mag || 0;

        let color = "#3cff72";
        let size = 0.012;

        if (magnitude >= 3) {
          color = "#ffe44d";
          size = 0.015;
        }

        if (magnitude >= 5) {
          color = "#ff9f43";
          size = 0.019;
        }

        if (magnitude >= 6.5) {
          color = "#ff4040";
          size = 0.024;
        }

        const isSelected = selectedEvent?.id === quake.id;

        return (
          <EarthquakeMarker
            key={quake.id}
            quake={quake}
            position={position}
            size={size}
            color={color}
            selected={isSelected}
            onSelect={() => selectEvent(quake, "earthquake")}
          />
        );
      })}
    </>
  );
}