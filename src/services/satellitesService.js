
export async function getSatellites() {
  const response = await fetch(
    "http://localhost:5000/api/satellites"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch satellites");
  }

  return await response.json();
}