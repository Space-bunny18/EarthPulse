import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// =====================================================
// OPENSKY CONFIG
// =====================================================

const CLIENT_ID =
    process.env.OPENSKY_CLIENT_ID;

const CLIENT_SECRET =
    process.env.OPENSKY_CLIENT_SECRET;

let accessToken = null;
let expiresAt = 0;


// =====================================================
// OPENSKY OAUTH TOKEN
// =====================================================

async function getToken() {

    if (
        accessToken &&
        Date.now() < expiresAt
    ) {
        return accessToken;
    }

    const params =
        new URLSearchParams();

    params.append(
        "grant_type",
        "client_credentials"
    );

    params.append(
        "client_id",
        CLIENT_ID
    );

    params.append(
        "client_secret",
        CLIENT_SECRET
    );

    const response =
        await axios.post(
            "https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token",
            params,
            {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded",
                },
            }
        );

    accessToken =
        response.data.access_token;

    expiresAt =
        Date.now() +
        (response.data.expires_in - 60) *
            1000;

    return accessToken;
}


// =====================================================
// FLIGHTS
// =====================================================

app.get(
    "/api/flights",
    async (req, res) => {

        try {

            const token =
                await getToken();

            const response =
                await axios.get(
                    "https://opensky-network.org/api/states/all",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );

            const states =
                response.data.states || [];

            const flights =
                states
                    .filter(
                        (flight) =>
                            flight[5] !== null &&
                            flight[6] !== null
                    )
                    .map(
                        (flight) => ({
                            icao24:
                                flight[0],

                            callsign:
                                flight[1]?.trim() ||
                                "Unknown",

                            longitude:
                                flight[5],

                            latitude:
                                flight[6],

                            altitude:
                                flight[7],

                            velocity:
                                flight[9],

                            heading:
                                flight[10],
                        })
                    );

            res.json({
                count:
                    flights.length,

                flights,
            });

        } catch (err) {

            console.error(
                "FLIGHT API ERROR:",
                err.response?.data ||
                err.message
            );

            res.status(500).json({
                error:
                    "Failed to fetch flights",
            });
        }
    }
);


// =====================================================
// SATELLITES
// =====================================================

app.get(
    "/api/satellites",
    async (req, res) => {

        try {

            const response =
                await axios.get(
                    "https://celestrak.org/NORAD/elements/gp.php?GROUP=STATIONS&FORMAT=JSON"
                );

            const satellites =
                response.data || [];

            res.json({
                count:
                    satellites.length,

                satellites,
            });

        } catch (err) {

            console.error(
                "SATELLITE API ERROR:",
                err.response?.data ||
                err.message
            );

            res.status(500).json({
                error:
                    "Failed to fetch satellites",
            });
        }
    }
);


// =====================================================
// WILDFIRES
// =====================================================

app.get(
    "/api/wildfires",
    async (req, res) => {

        try {

            const mapKey =
                process.env.FIRMS_MAP_KEY;

            if (!mapKey) {

                return res.status(500).json({
                    error:
                        "FIRMS_MAP_KEY is missing",
                });
            }

            const response =
                await axios.get(
                    `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${mapKey}/VIIRS_SNPP_NRT/world/1`
                );

            const csv =
                response.data;

            const lines =
                csv
                    .trim()
                    .split("\n");

            if (lines.length < 2) {

                return res.json({
                    count: 0,
                    fires: [],
                });
            }

            const headers =
                lines[0].split(",");

            const fires =
                lines
                    .slice(1)
                    .map(
                        (line) => {

                            const values =
                                line.split(",");

                            const fire = {};

                            headers.forEach(
                                (
                                    header,
                                    index
                                ) => {

                                    fire[header] =
                                        values[index];
                                }
                            );

                            return fire;
                        }
                    )
                    .filter(
                        (fire) =>
                            fire.latitude &&
                            fire.longitude
                    )
                    .slice(0, 1500);

            res.json({
                count:
                    fires.length,

                fires,
            });

        } catch (err) {

            console.error(
                "WILDFIRE API ERROR:",
                err.response?.data ||
                err.message
            );

            res.status(500).json({
                error:
                    "Failed to fetch wildfire data",
            });
        }
    }
);


// =====================================================
// SEVERE STORMS
// =====================================================

app.get(
    "/api/storms",
    async (req, res) => {

        try {

            const response =
                await axios.get(
                    "https://eonet.gsfc.nasa.gov/api/v3/events",
                    {
                        params: {
                            category:
                                "severeStorms",

                            status:
                                "open",

                            limit: 100,
                        },

                        timeout: 15000,
                    }
                );

            const events =
                response.data?.events || [];

            const storms =
                events
                    .map(
                        (event) => {

                            const geometries =
                                event.geometry ||
                                [];

                            const latest =
                                geometries[
                                    geometries.length - 1
                                ];

                            if (
                                !latest ||
                                !latest.coordinates
                            ) {
                                return null;
                            }

                            return {
                                id:
                                    event.id,

                                title:
                                    event.title ||
                                    "Severe Storm",

                                description:
                                    event.description ||
                                    "",

                                closed:
                                    event.closed ||
                                    null,

                                categories:
                                    event.categories ||
                                    [],

                                geometry:
                                    latest,

                                magnitudeValue:
                                    event.magnitudeValue ??
                                    null,

                                magnitudeUnit:
                                    event.magnitudeUnit ??
                                    null,

                                sources:
                                    event.sources ||
                                    [],
                            };
                        }
                    )
                    .filter(Boolean);

            console.log(
                `Storms fetched: ${storms.length}`
            );

            res.json({
                count:
                    storms.length,

                storms,
            });

        } catch (err) {

            console.error(
                "STORM API ERROR:"
            );

            console.error(
                "Status:",
                err.response?.status
            );

            console.error(
                "Details:",
                err.response?.data ||
                err.message
            );

            res.status(500).json({
                error:
                    "Failed to fetch storm data",

                details:
                    err.response?.data ||
                    err.message,
            });
        }
    }
);

// =====================================================
// TEMPERATURE ENDPOINT
// =====================================================

// =====================================================
// TEMPERATURE
// =====================================================

app.get(
    "/api/temperature",
    async (req, res) => {

        try {

            // -----------------------------------------
            // Create a global temperature grid
            // -----------------------------------------

            const temperatures = [];

            const latitudes = [
                -60,
                -30,
                0,
                30,
                60,
            ];

            const longitudes = [
                -180,
                -150,
                -120,
                -90,
                -60,
                -30,
                0,
                30,
                60,
                90,
                120,
                150,
            ];

            // -----------------------------------------
            // Create paired coordinates
            // -----------------------------------------

            for (
                let latIndex = 0;
                latIndex < latitudes.length;
                latIndex++
            ) {

                for (
                    let lonIndex = 0;
                    lonIndex < longitudes.length;
                    lonIndex++
                ) {

                    temperatures.push({
                        latitude:
                            latitudes[latIndex],

                        longitude:
                            longitudes[lonIndex],
                    });

                }
            }

            // -----------------------------------------
            // Extract coordinates
            // -----------------------------------------

            const latitudeString =
                temperatures
                    .map(
                        (point) =>
                            point.latitude
                    )
                    .join(",");

            const longitudeString =
                temperatures
                    .map(
                        (point) =>
                            point.longitude
                    )
                    .join(",");

            // -----------------------------------------
            // Open-Meteo
            // -----------------------------------------

            const response =
                await axios.get(
                    "https://api.open-meteo.com/v1/forecast",
                    {
                        params: {

                            latitude:
                                latitudeString,

                            longitude:
                                longitudeString,

                            current:
                                "temperature_2m",

                            temperature_unit:
                                "celsius",

                            timezone:
                                "UTC",
                        },

                        timeout: 20000,
                    }
                );

            // -----------------------------------------
            // Process response
            // -----------------------------------------

            const results =
                Array.isArray(
                    response.data
                )
                    ? response.data
                    : [response.data];

            const data =
                results
                    .map((weather) => {

                        const latitude =
                            Number(
                                weather.latitude
                            );

                        const longitude =
                            Number(
                                weather.longitude
                            );

                        const temperature =
                            Number(
                                weather.current
                                    ?.temperature_2m
                            );

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

                        return {
                            latitude,
                            longitude,
                            temperature,
                        };

                    })
                    .filter(Boolean);

            console.log(
                `Temperature points fetched: ${data.length}`
            );

            res.json({
                count: data.length,
                temperatures: data,
            });

        } catch (err) {

            console.error(
                "TEMPERATURE API ERROR:"
            );

            console.error(
                "Status:",
                err.response?.status
            );

            console.error(
                "Details:",
                err.response?.data ||
                err.message
            );

            res.status(500).json({

                error:
                    "Failed to fetch temperature data",

                details:
                    err.response?.data ||
                    err.message,

            });
        }
    }
);

// =====================================================
// SERVER
// =====================================================

app.listen(
    PORT,
    () => {

        console.log(
            `Server running on port ${PORT}`
        );

    }
);