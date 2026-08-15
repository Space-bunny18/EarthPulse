import { API_URL } from "../config";
export async function getFlights() {
    const response = await fetch(`${API_URL}/api/flights`);

    if (!response.ok) {
        throw new Error("Failed to fetch flights");
    }

    return await response.json();
}