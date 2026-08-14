import useFlights from "../../../hooks/useFlights";
import latLngToVector3 from "../../../utils/latLngToVector3";
import { useExplorer } from "../../../context/ExplorerContext";
import * as THREE from "three";

export default function FlightLayer() {
  const { flights, loading } = useFlights();
  const { selectEvent } = useExplorer();

  if (loading) return null;

  // Keep performance under control
  const visibleFlights = flights.slice(0, 400);

  return (
    <>
      {visibleFlights.map((flight) => {
        if (
          flight.latitude === null ||
          flight.latitude === undefined ||
          flight.longitude === null ||
          flight.longitude === undefined
        ) {
          return null;
        }

        const position = latLngToVector3(
          flight.latitude,
          flight.longitude,
          1.045
        );

        // --------------------------------
        // SURFACE NORMAL
        // --------------------------------

        const surfaceNormal = new THREE.Vector3(
          position[0],
          position[1],
          position[2]
        ).normalize();

        // --------------------------------
        // NORTH DIRECTION
        // --------------------------------

        const lat = THREE.MathUtils.degToRad(
          flight.latitude
        );

        const lng = THREE.MathUtils.degToRad(
          flight.longitude
        );

        const north = new THREE.Vector3(
          -Math.sin(lat) * Math.cos(lng),
          Math.cos(lat),
          -Math.sin(lat) * Math.sin(lng)
        ).normalize();

        // --------------------------------
        // EAST DIRECTION
        // --------------------------------

        const east = new THREE.Vector3()
          .crossVectors(north, surfaceNormal)
          .normalize();

        // --------------------------------
        // REAL AIRCRAFT HEADING
        // --------------------------------

        const heading =
          flight.heading !== null &&
          flight.heading !== undefined
            ? THREE.MathUtils.degToRad(
                flight.heading
              )
            : 0;

        const direction = new THREE.Vector3()
          .addScaledVector(
            north,
            Math.cos(heading)
          )
          .addScaledVector(
            east,
            Math.sin(heading)
          )
          .normalize();

        // --------------------------------
        // ROTATE AIRCRAFT
        // --------------------------------

        const quaternion =
          new THREE.Quaternion();

        quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          direction
        );

        return (
          <group
            key={flight.icao24}
            position={position}
            quaternion={quaternion}
            onClick={(event) => {
              event.stopPropagation();

              selectEvent(
                flight,
                "flight"
              );
            }}
          >

            {/* AIRCRAFT BODY */}

            <mesh>
              <capsuleGeometry
                args={[
                  0.0035,
                  0.024,
                  4,
                  6,
                ]}
              />

              <meshBasicMaterial
                color="#58d8ff"
                toneMapped={false}
              />
            </mesh>


            {/* MAIN WINGS */}

            <mesh
              position={[0, 0, 0]}
              rotation={[
                0,
                0,
                Math.PI / 2,
              ]}
            >
              <boxGeometry
                args={[
                  0.003,
                  0.028,
                  0.006,
                ]}
              />

              <meshBasicMaterial
                color="#58d8ff"
                toneMapped={false}
              />
            </mesh>


            {/* TAIL WINGS */}

            <mesh
              position={[
                0,
                -0.009,
                0.002,
              ]}
              rotation={[
                0,
                0,
                Math.PI / 2,
              ]}
            >
              <boxGeometry
                args={[
                  0.002,
                  0.012,
                  0.004,
                ]}
              />

              <meshBasicMaterial
                color="#58d8ff"
                toneMapped={false}
              />
            </mesh>

          </group>
        );
      })}
    </>
  );
}