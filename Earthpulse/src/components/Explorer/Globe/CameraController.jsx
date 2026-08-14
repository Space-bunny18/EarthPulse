import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import { useExplorer } from "../../../context/ExplorerContext";
import latLngToVector3 from "../../../utils/latLngToVector3";

export default function CameraController() {
  const { camera } = useThree();

  const {
    selectedEvent,
    selectedType,
  } = useExplorer();

  const targetPosition = useRef(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    if (!selectedEvent || !selectedType) return;

    let lat;
    let lng;

    // -------------------------
    // EARTHQUAKE
    // -------------------------
    if (selectedType === "earthquake") {
      const coordinates =
        selectedEvent.geometry?.coordinates;

      if (!coordinates) return;

      [lng, lat] = coordinates;
    }

    // -------------------------
    // FLIGHT
    // -------------------------
    if (selectedType === "flight") {
      lat = selectedEvent.latitude;
      lng = selectedEvent.longitude;
    }

    // Make sure coordinates exist
    if (
      lat === null ||
      lat === undefined ||
      lng === null ||
      lng === undefined
    ) {
      return;
    }

    targetPosition.current =
      latLngToVector3(lat, lng, 2.4);

    isAnimating.current = true;

  }, [selectedEvent, selectedType]);

  useFrame(() => {
    if (
      !isAnimating.current ||
      !targetPosition.current
    ) {
      return;
    }

    camera.position.lerp(
      targetPosition.current,
      0.05
    );

    camera.lookAt(
      new THREE.Vector3(0, 0, 0)
    );

    const distance =
      camera.position.distanceTo(
        targetPosition.current
      );

    if (distance < 0.01) {
      camera.position.copy(
        targetPosition.current
      );

      isAnimating.current = false;
    }
  });

  return null;
}