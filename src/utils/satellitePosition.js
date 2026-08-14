import * as satellite from "satellite.js";

export function getSatellitePosition(satelliteData) {
  try {
    const satrec =
      satellite.json2satrec(satelliteData);

    const now = new Date();

    const result =
      satellite.propagate(
        satrec,
        now
      );

    if (!result || !result.position) {
      return null;
    }

    const gmst =
      satellite.gstime(now);

    const geodetic =
      satellite.eciToGeodetic(
        result.position,
        gmst
      );

    return {
      latitude:
        satellite.degreesLat(
          geodetic.latitude
        ),

      longitude:
        satellite.degreesLong(
          geodetic.longitude
        ),

      altitude: geodetic.height,
    };

  } catch (error) {
    console.error(
      "Satellite propagation error:",
      error
    );

    return null;
  }
}