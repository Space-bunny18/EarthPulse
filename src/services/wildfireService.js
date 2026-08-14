export async function getWildfires() {
  const response = await fetch(
    "http://localhost:5000/api/wildfires"
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch wildfires"
    );
  }

  return await response.json();
}