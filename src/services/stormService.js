export async function getStorms() {
    const response = await fetch(
        "http://localhost:5000/api/storms"
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch storms"
        );
    }

    return await response.json();
}