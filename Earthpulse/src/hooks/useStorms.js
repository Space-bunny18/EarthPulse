import { useEffect, useState } from "react";
import { getStorms } from "../services/stormService";

export default function useStorms() {
    const [storms, setStorms] = useState({
        storms: [],
        count: 0,
        loading: true,
    });

    useEffect(() => {
        async function loadStorms() {
            try {
                const data =
                    await getStorms();

                setStorms({
                    storms:
                        data.storms || [],
                    count:
                        data.count || 0,
                    loading: false,
                });

            } catch (err) {
                console.error(
                    "Storm loading error:",
                    err
                );

                setStorms({
                    storms: [],
                    count: 0,
                    loading: false,
                });
            }
        }

        loadStorms();

        // Refresh every minute
        const interval =
            setInterval(
                loadStorms,
                60000
            );

        return () =>
            clearInterval(interval);

    }, []);

    return storms;
}