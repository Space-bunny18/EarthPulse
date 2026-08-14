import { useEffect, useState } from "react";
import { getWeather } from "../services/weatherService";

export default function useWeather() {
  const [weather, setWeather] = useState({
    temp: "--",
    city: "",
    humidity: "",
    condition: "",
    loading: true,
  });

  useEffect(() => {
    async function loadWeather() {
      try {
        const data = await getWeather();

        setWeather({
          ...data,
          loading: false,
        });
      } catch (err) {
        console.error(err);

        setWeather((prev) => ({
          ...prev,
          loading: false,
        }));
      }
    }

    loadWeather();

    const interval = setInterval(loadWeather, 600000);

    return () => clearInterval(interval);
  }, []);

  return weather;
}