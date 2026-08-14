import { useEffect, useState } from "react";
import { getWildfires } from "../services/wildfireService";

export default function useWildfires() {
  const [wildfires, setWildfires] = useState({
    count: 0,
    fires: [],
    loading: true,
  });

  useEffect(() => {
    async function load() {
      try {
        const data = await getWildfires();

        setWildfires({
          count: data.count || 0,
          fires: data.fires || [],
          loading: false,
        });
      } catch (err) {
        console.error(err);

        setWildfires({
          count: 0,
          fires: [],
          loading: false,
        });
      }
    }

    load();

    const interval = setInterval(
      load,
      10 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, []);

  return wildfires;
}