import { API_URL } from "../config";
export async function getSatellites() {
  const response = await fetch(`${API_URL}/api/satellites`);

  if (!response.ok) {
    throw new Error("Failed to fetch satellites");
  }

  return await response.json();
}