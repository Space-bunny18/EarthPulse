import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import * as satellite from "satellite.js";

import useSatellites from "../../../hooks/useSatellites";
import latLngToVector3 from "../../../utils/latLngToVector3";
import { getSatellitePosition } from "../../../utils/satellitePosition";
import { useExplorer } from "../../../context/ExplorerContext";
import SatelliteOrbit from "./SatelliteOrbit";

const EARTH_RADIUS_KM = 6371;


// =========================================================
// MOVING SATELLITE MARKER
// =========================================================

function SatelliteMarker({
  data,
  position,
  isSelected,
  onSelect,
}) {
  const meshRef = useRef();

  // Create the satellite record only once
  const satrec = useMemo(() => {
    try {
      return satellite.json2satrec(data);
    } catch (error) {
      console.error(
        "Satellite record error:",
        error
      );

      return null;
    }
  }, [data]);


  // -------------------------------------------------------
  // Animate ONLY the selected satellite
  // -------------------------------------------------------

  useFrame(() => {
    if (
      !isSelected ||
      !meshRef.current ||
      !satrec
    ) {
      return;
    }

    const now = new Date();

    const result =
      satellite.propagate(
        satrec,
        now
      );

    if (
      !result ||
      !result.position
    ) {
      return;
    }

    const gmst =
      satellite.gstime(now);

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
     * Convert the real satellite altitude
     * into our Three.js globe scale.
     */
    const radius =
      1 +
      altitude / EARTH_RADIUS_KM;

    const newPosition =
      latLngToVector3(
        latitude,
        longitude,
        radius
      );

    meshRef.current.position.set(
      newPosition[0],
      newPosition[1],
      newPosition[2]
    );
  });


  // -------------------------------------------------------
  // Normal/static position
  // -------------------------------------------------------

  const globePosition =
    latLngToVector3(
      position.latitude,
      position.longitude,
      1.12
    );


  return (
    <mesh
      ref={meshRef}
      position={globePosition}
      scale={
        isSelected
          ? 1.6
          : 1
      }
      onClick={(event) => {
        event.stopPropagation();

        onSelect();
      }}
    >
      <sphereGeometry
        args={[
          0.012,
          8,
          8,
        ]}
      />

      <meshBasicMaterial
        color={
          isSelected
            ? "#ffffff"
            : "#b86cff"
        }
        toneMapped={false}
      />
    </mesh>
  );
}


// =========================================================
// SATELLITE LAYER
// =========================================================

export default function SatelliteLayer() {
  const {
    satellites,
    loading,
  } = useSatellites();

  const {
    selectEvent,
    selectedEvent,
  } = useExplorer();


  // -------------------------------------------------------
  // Calculate initial positions
  // -------------------------------------------------------

  const positions = useMemo(() => {
    if (!satellites.length) {
      return [];
    }

    return satellites
      .map((satelliteData) => {
        const position =
          getSatellitePosition(
            satelliteData
          );

        if (!position) {
          return null;
        }

        return {
          data: satelliteData,
          position,
        };
      })
      .filter(Boolean);
  }, [satellites]);


  if (loading) {
    return null;
  }


  // -------------------------------------------------------
  // Render
  // -------------------------------------------------------

  return (
    <>
      {/* Selected satellite orbit */}
      <SatelliteOrbit />


      {positions.map(
        ({ data, position }) => {

          const satelliteId =
            data.NORAD_CAT_ID ||
            data.OBJECT_ID;

          const selectedId =
            selectedEvent?.NORAD_CAT_ID ||
            selectedEvent?.OBJECT_ID;

          const isSelected =
            satelliteId === selectedId;


          return (
            <SatelliteMarker
              key={satelliteId}
              data={data}
              position={position}
              isSelected={isSelected}
              onSelect={() => {
                selectEvent(
                  {
                    ...data,

                    calculatedPosition:
                      position,
                  },
                  "satellite"
                );
              }}
            />
          );
        }
      )}
    </>
  );
}