import { API_URL } from "../config";
export async function getWildfires() {
  const response = await fetch(`${API_URL}/api/wildfires`);

  if (!response.ok) {
    throw new Error(
      "Failed to fetch wildfires"
    );
  }

  return await response.json();
}