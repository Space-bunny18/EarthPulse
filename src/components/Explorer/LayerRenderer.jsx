import { useSearchParams } from "react-router-dom";

import EarthquakeLayer from "./layers/EarthquakeLayer";
import FlightLayer from "./layers/FlightLayer";
import SatelliteLayer from "./layers/SatelliteLayer";
import WildfireLayer from "./layers/WildfireLayer";
import StormLayer from "./layers/StormLayer";
import TemperatureLayer from "./layers/TemperatureLayer";

export default function LayerRenderer() {
  const [searchParams] = useSearchParams();

  const activeLayer =
    searchParams.get("layer") || "earthquakes";

  switch (activeLayer) {
    case "earthquakes":
      return <EarthquakeLayer />;

    case "flights":
      return <FlightLayer />;

    case "satellites":
      return <SatelliteLayer />;
    case "wildfires":
      return <WildfireLayer />;
    case "storms":
      return <StormLayer />;
    case "temperature":
      return <TemperatureLayer />;
    default:
      return <EarthquakeLayer />;
    
  }
}