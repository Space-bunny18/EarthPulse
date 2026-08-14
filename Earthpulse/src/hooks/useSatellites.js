import { useEffect, useState } from "react";
import { getSatellites } from "../services/satellitesService";

export default function useSatellites() {
  const [satellites, setSatellites] = useState({
    count: 0,
    satellites: [],
    loading: true,
  });

  useEffect(() => {
    async function loadSatellites() {
      try {
        const data = await getSatellites();

        setSatellites({
          count: data.count || 0,
          satellites: data.satellites || [],
          loading: false,
        });
      } catch (error) {
        console.error(
          "Failed to load satellites:",
          error
        );

        setSatellites({
          count: 0,
          satellites: [],
          loading: false,
        });
      }
    }

    loadSatellites();

    // Orbital elements don't need to be
    // downloaded every minute.
    const interval = setInterval(
      loadSatellites,
      2 * 60 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, []);

  return satellites;
}