import { API_URL } from "../config";

export async function getTemperatures() {
  const response = await fetch(`${API_URL}/api/temperature`);

  if (!response.ok) {
    throw new Error("Failed to fetch temperature data");
  }

  const data = await response.json();

  return data;
}