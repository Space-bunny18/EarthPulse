import useTemperature from "../../../hooks/useTemperature";
import latLngToVector3 from "../../../utils/latLngToVector3";
import { useExplorer } from "../../../context/ExplorerContext";

function getTemperatureColor(temp) {
    if (temp <= 0) return "#4aa3ff";
    if (temp <= 10) return "#63d8ff";
    if (temp <= 20) return "#7cff8a";
    if (temp <= 30) return "#ffe066";
    if (temp <= 40) return "#ff9f43";

    return "#ff4d4d";
}

export default function TemperatureLayer() {
    const {
        temperatures,
        loading,
    } = useTemperature();

    const {
        selectEvent,
    } = useExplorer();

    if (loading) {
        return null;
    }

    return (
        <>
            {temperatures.map(
                (point, index) => {

                    const latitude =
                        Number(point.latitude);

                    const longitude =
                        Number(point.longitude);

                    const temperature =
                        Number(point.temperature);

                    if (
                        !Number.isFinite(
                            latitude
                        ) ||
                        !Number.isFinite(
                            longitude
                        ) ||
                        !Number.isFinite(
                            temperature
                        )
                    ) {
                        return null;
                    }

                    const position =
                        latLngToVector3(
                            latitude,
                            longitude,
                            1.025
                        );

                    const color =
                        getTemperatureColor(
                            temperature
                        );

                    return (
                        <group
                            key={`${latitude}-${longitude}-${index}`}
                            position={position}
                            onClick={(event) => {
                                event.stopPropagation();

                                selectEvent(
                                    {
                                        ...point,
                                    },
                                    "temperature"
                                );
                            }}
                        >

                            {/* Temperature glow */}

                            <mesh>
                                <sphereGeometry
                                    args={[
                                        0.025,
                                        8,
                                        8,
                                    ]}
                                />

                                <meshBasicMaterial
                                    color={color}
                                    transparent
                                    opacity={0.15}
                                    depthWrite={false}
                                    toneMapped={false}
                                />
                            </mesh>

                            {/* Temperature point */}

                            <mesh>
                                <sphereGeometry
                                    args={[
                                        0.010,
                                        8,
                                        8,
                                    ]}
                                />

                                <meshBasicMaterial
                                    color={color}
                                    toneMapped={false}
                                />
                            </mesh>

                        </group>
                    );
                }
            )}
        </>
    );
}