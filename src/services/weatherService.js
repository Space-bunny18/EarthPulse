import { API_URL } from "../config";
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const CITY = "New Delhi";

export async function getWeather() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather");
  }

  const data = await response.json();

  return {
    temp: Math.round(data.main.temp),
    city: data.name,
    humidity: data.main.humidity,
    condition: data.weather[0].main,
  };
}