import { useEffect, useState } from "react";
import { getTemperatures } from "../services/temperatureService";

export default function useTemperature() {
    const [temperatureData, setTemperatureData] =
        useState({
            temperatures: [],
            count: 0,
            loading: true,
        });

    useEffect(() => {
        async function loadTemperatures() {
            try {
                const data =
                    await getTemperatures();

                setTemperatureData({
                    temperatures:
                        data.temperatures || [],
                    count:
                        data.count || 0,
                    loading: false,
                });

            } catch (err) {
                console.error(
                    "Temperature loading error:",
                    err
                );

                setTemperatureData({
                    temperatures: [],
                    count: 0,
                    loading: false,
                });
            }
        }

        loadTemperatures();

        // Refresh every 10 minutes
        const interval = setInterval(
            loadTemperatures,
            600000
        );

        return () =>
            clearInterval(interval);
    }, []);

    return temperatureData;
}