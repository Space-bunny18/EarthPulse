import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import Earth from "./Earth";
import Atmosphere from "./Atmosphere";
import Grid from "./Grid";

import OrbitSystem from "../effects/OrbitSystem";
import SignalSystem from "../effects/SignalSystem";
import CountryRenderer from "../countries/CountryRenderer";

export default function EarthGroup() {
    const globe = useRef();

    useFrame((state, delta) => {
        if (!globe.current) return;

        globe.current.rotation.y += delta * 0.08;

        globe.current.position.y =
            Math.sin(state.clock.elapsedTime * 0.6) * 0.05;

        globe.current.rotation.x +=
            (state.pointer.y * 0.15 - globe.current.rotation.x) * 0.04;

        globe.current.rotation.z +=
            (-state.pointer.x * 0.15 - globe.current.rotation.z) * 0.04;
    });

    return (
        <group ref={globe} scale={0.82}>
            <Earth />
            <Grid />
            <CountryRenderer />
            <Atmosphere />
            <SignalSystem />
            <OrbitSystem />
        </group>
    );
}