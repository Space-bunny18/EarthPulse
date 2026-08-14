import { useEffect, useState } from "react";
import { getFlights } from "../services/flightsService";

export default function useFlights() {
  const [flights, setFlights] = useState({
    count: 0,
    flights: [],
    loading: true,
  });

  useEffect(() => {
    async function loadFlights() {
      try {
        const data = await getFlights();

        setFlights({
          count: data.count || 0,
          flights: data.flights || [],
          loading: false,
        });
      } catch (err) {
        console.error("Failed to load flights:", err);

        setFlights({
          count: 0,
          flights: [],
          loading: false,
        });
      }
    }

    loadFlights();

    const interval = setInterval(loadFlights, 60000);

    return () => clearInterval(interval);
  }, []);

  return flights;
}