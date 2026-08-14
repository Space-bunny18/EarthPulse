const URL =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

export async function getEarthquakes() {
  const response = await fetch(URL);

  if (!response.ok) {
    throw new Error("Failed to fetch earthquakes");
  }

  const data = await response.json();

  return {
    count: data.features.length,
    strongest: Math.max(
      ...data.features.map((q) => q.properties.mag || 0)
    ).toFixed(1),
    events: data.features,
  };
}