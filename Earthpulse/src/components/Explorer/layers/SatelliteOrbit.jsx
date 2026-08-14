import { useMemo } from "react";
import * as THREE from "three";
import * as satellite from "satellite.js";

import { useExplorer } from "../../../context/ExplorerContext";
import latLngToVector3 from "../../../utils/latLngToVector3";

const EARTH_RADIUS_KM = 6371;

export default function SatelliteOrbit() {
  const {
    selectedEvent,
    selectedType,
  } = useExplorer();

  const geometry = useMemo(() => {
    if (
      !selectedEvent ||
      selectedType !== "satellite"
    ) {
      return null;
    }

    try {
      const satrec =
        satellite.json2satrec(
          selectedEvent
        );

      const meanMotion =
        Number(
          selectedEvent.MEAN_MOTION
        );

      if (
        !meanMotion ||
        meanMotion <= 0
      ) {
        return null;
      }

      // Orbital period in minutes
      const orbitalPeriod =
        1440 / meanMotion;

      /*
       * One complete orbital revolution.
       *
       * 180 points gives us a smooth
       * trajectory without creating
       * unnecessary geometry.
       */
      const samples = 180;

      const points = [];

      const now = new Date();

      for (
        let i = 0;
        i < samples;
        i++
      ) {
        const progress =
          i / (samples - 1);

        const minutes =
          orbitalPeriod * progress;

        const time = new Date(
          now.getTime() +
            minutes * 60 * 1000
        );

        const result =
          satellite.propagate(
            satrec,
            time
          );

        if (
          !result ||
          !result.position
        ) {
          continue;
        }

        const gmst =
          satellite.gstime(time);

        const geodetic =
          satellite.eciToGeodetic(
            result.position,
            gmst
          );

        const latitude =
          satellite.degreesLat(
            geodetic.latitude
          );

        const longitude =
          satellite.degreesLong(
            geodetic.longitude
          );

        const altitude =
          geodetic.height;

        /*
         * Earth = 1.0 in our Three.js
         * coordinate system.
         *
         * Scale the satellite's
         * altitude relative to Earth.
         */
        const radius =
          1 +
          altitude / EARTH_RADIUS_KM;

        const position =
          latLngToVector3(
            latitude,
            longitude,
            radius
          );

        points.push(
          new THREE.Vector3(
            position[0],
            position[1],
            position[2]
          )
        );
      }

      if (points.length < 2) {
        return null;
      }

      return new THREE.BufferGeometry()
        .setFromPoints(points);

    } catch (error) {
      console.error(
        "Satellite orbit error:",
        error
      );

      return null;
    }
  }, [
    selectedEvent,
    selectedType,
  ]);

  if (!geometry) {
    return null;
  }

  return (
    <line
      geometry={geometry}
    >
      <lineBasicMaterial
        color="#9b6cff"
        transparent
        opacity={0.5}
        toneMapped={false}
      />
    </line>
  );
}