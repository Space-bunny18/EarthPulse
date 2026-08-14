export async function getFlights() {
    const response = await fetch("http://localhost:5000/api/flights");

    if (!response.ok) {
        throw new Error("Failed to fetch flights");
    }

    return await response.json();
}