import { Html } from "@react-three/drei";
import { latLngToVector } from "../utils/latLngToVector";
import useEarthquakes from "../../../hooks/useEarthquakes";

export default function EarthquakeLayer() {
    const { loading, events } = useEarthquakes();

    if (loading) return null;

    return (
        <>
            {events.map((quake, index) => {
                const coords = quake.geometry?.coordinates;

                if (!coords) return null;

                const [lng, lat] = coords;

                const position = latLngToVector(lat, lng, 1.02);

                return (
                    <Html
                        key={index}
                        position={position}
                        center
                    >
                        <div
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                background: "#ff3b30",
                                boxShadow: "0 0 18px #ff3b30",
                            }}
                        />
                    </Html>
                );
            })}
        </>
    );
}