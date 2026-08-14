import { useEffect, useState } from "react";
import { getEarthquakes } from "../services/earthquakeService";

export default function useEarthquakes() {
  const [earthquakes, setEarthquakes] = useState({
        count: 0,
        strongest: 0,
        events: [],
        loading: true,
    });

  useEffect(() => {
    async function load() {
      try {
        const data = await getEarthquakes();

       setEarthquakes({
        count: data.count,
        strongest: data.strongest,
        events: data.events,
        loading: false,
        });
      } catch (err) {
        console.error(err);

        setEarthquakes((prev) => ({
          ...prev,
          loading: false,
        }));
      }
    }

    load();

    const interval = setInterval(load, 60000);

    return () => clearInterval(interval);
  }, []);

  return earthquakes;
}