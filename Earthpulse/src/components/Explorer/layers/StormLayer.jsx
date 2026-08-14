import useStorms from "../../../hooks/useStorms";
import latLngToVector3 from "../../../utils/latLngToVector3";
import { useExplorer } from "../../../context/ExplorerContext";

export default function StormLayer() {
    const {
        storms,
        loading,
    } = useStorms();

    const {
        selectEvent,
    } = useExplorer();

    if (loading) {
        return null;
    }

    return (
        <>
            {storms.map((storm) => {
                const coordinates =
                    storm.geometry?.coordinates;

                if (
                    !coordinates ||
                    coordinates.length < 2
                ) {
                    return null;
                }

                const longitude =
                    Number(coordinates[0]);

                const latitude =
                    Number(coordinates[1]);

                if (
                    !Number.isFinite(latitude) ||
                    !Number.isFinite(longitude)
                ) {
                    return null;
                }

                const position =
                    latLngToVector3(
                        latitude,
                        longitude,
                        1.035
                    );

                return (
                    <group
                        key={storm.id}
                        position={position}
                        onClick={(event) => {
                            event.stopPropagation();

                            selectEvent(
                                storm,
                                "storm"
                            );
                        }}
                    >
                        {/* Outer glow */}
                        <mesh>
                            <sphereGeometry
                                args={[
                                    0.025,
                                    10,
                                    10,
                                ]}
                            />

                            <meshBasicMaterial
                                color="#d98cff"
                                transparent
                                opacity={0.18}
                                depthWrite={false}
                                toneMapped={false}
                            />
                        </mesh>

                        {/* Storm marker */}
                        <mesh>
                            <sphereGeometry
                                args={[
                                    0.012,
                                    10,
                                    10,
                                ]}
                            />

                            <meshBasicMaterial
                                color="#d98cff"
                                toneMapped={false}
                            />
                        </mesh>
                    </group>
                );
            })}
        </>
    );
}