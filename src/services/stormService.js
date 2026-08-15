import { API_URL } from "../config";
export async function getStorms() {
    const response = await fetch(`${API_URL}/api/storms`);

    if (!response.ok) {
        throw new Error(
            "Failed to fetch storms"
        );
    }

    return await response.json();
}