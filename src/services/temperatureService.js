const API_URL =
    "http://localhost:5000/api/temperature";

export async function getTemperatures() {
    const response =
        await fetch(API_URL);

    if (!response.ok) {
        throw new Error(
            "Failed to fetch temperature data"
        );
    }

    return await response.json();
}