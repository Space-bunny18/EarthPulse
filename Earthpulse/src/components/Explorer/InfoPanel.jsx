import "./Explorer.css";
import { useSearchParams } from "react-router-dom";
import { useExplorer } from "../../context/ExplorerContext";

export default function InfoPanel() {
    const [searchParams] = useSearchParams();

    const activeLayer =
        searchParams.get("layer") || "earthquakes";

    const {
        selectedEvent,
        selectedType,
    } = useExplorer();

    // =====================================================
    // LAYER CONFIG
    // =====================================================

    const layerConfig = {
        earthquakes: {
            icon: "🌍",
            label: "EARTHQUAKE",
            className: "earthquake-type",
            emptyTitle: "No Earthquake Selected",
            emptyMessage:
                "Click an earthquake marker on the globe to view its information.",
        },

        flights: {
            icon: "✈️",
            label: "FLIGHTS",
            className: "flight-type",
            emptyTitle: "No Flight Selected",
            emptyMessage:
                "Click a flight marker on the globe to view its information.",
        },

        satellites: {
            icon: "🛰️",
            label: "SATELLITES",
            className: "satellite-type",
            emptyTitle: "No Satellite Selected",
            emptyMessage:
                "Click a satellite marker on the globe to view its information.",
        },

        wildfires: {
            icon: "🔥",
            label: "WILDFIRES",
            className: "wildfire-type",
            emptyTitle: "No Wildfire Selected",
            emptyMessage:
                "Click a wildfire marker on the globe to view its information.",
        },
        storms: {
          icon: "🌪️",
          label: "SEVERE STORMS",
          className: "storm-type",
          emptyTitle: "No Storm Selected",
          emptyMessage:
              "Click a storm marker on the globe to view its information.",
      },
          temperature: {
            icon: "🌡️",
            label: "TEMPERATURE",
            className: "temperature-type",
            emptyTitle: "No Temperature Selected",
            emptyMessage:
                "Click a temperature marker on the globe to view its information.",
        },
    };

    const config =
        layerConfig[activeLayer] ||
        layerConfig.earthquakes;

    // =====================================================
    // PANEL HEADER
    // =====================================================

    function PanelHeader() {
        return (
            <div className="info-panel-header">

                <div
                    className={`info-type ${config.className}`}
                >
                    <span className="info-type-icon">
                        {config.icon}
                    </span>

                    <span>
                        {config.label}
                    </span>
                </div>

                <span className="info-live">
                    ● LIVE
                </span>

            </div>
        );
    }

    // =====================================================
    // NOTHING SELECTED
    // =====================================================

    if (!selectedEvent) {
        return (
            <aside className="info-panel">

                <PanelHeader />

                <div className="info-empty">

                    <div className="info-empty-icon">
                        {config.icon}
                    </div>

                    <h3>
                        {config.emptyTitle}
                    </h3>

                    <p className="empty-info">
                        {config.emptyMessage}
                    </p>

                </div>

            </aside>
        );
    }

    // =====================================================
    // FLIGHT
    // =====================================================

    if (selectedType === "flight") {
        const flight = selectedEvent;

        return (
            <aside className="info-panel">

                <PanelHeader />

                <div className="selected-heading">

                    <h3>
                        {flight.callsign ||
                            "Unknown Flight"}
                    </h3>

                    <div className="selected-subtitle">
                        AIRCRAFT TRACKING
                    </div>

                </div>

                <div className="info-list">

                    <div className="info-item">
                        <span>Altitude</span>
                        <strong>
                            {flight.altitude !== null &&
                            flight.altitude !== undefined
                                ? `${Math.round(
                                      flight.altitude
                                  )} m`
                                : "Unknown"}
                        </strong>
                    </div>

                    <div className="info-item">
                        <span>Speed</span>
                        <strong>
                            {flight.velocity !== null &&
                            flight.velocity !== undefined
                                ? `${Math.round(
                                      flight.velocity
                                  )} m/s`
                                : "Unknown"}
                        </strong>
                    </div>

                    <div className="info-item">
                        <span>Heading</span>
                        <strong>
                            {flight.heading !== null &&
                            flight.heading !== undefined
                                ? `${Math.round(
                                      flight.heading
                                  )}°`
                                : "Unknown"}
                        </strong>
                    </div>

                    <div className="info-item">
                        <span>Latitude</span>
                        <strong>
                            {flight.latitude !== null &&
                            flight.latitude !== undefined
                                ? flight.latitude.toFixed(2)
                                : "Unknown"}
                        </strong>
                    </div>

                    <div className="info-item">
                        <span>Longitude</span>
                        <strong>
                            {flight.longitude !== null &&
                            flight.longitude !== undefined
                                ? flight.longitude.toFixed(2)
                                : "Unknown"}
                        </strong>
                    </div>

                    <div className="info-item">
                        <span>ICAO24</span>
                        <strong>
                            {flight.icao24 ||
                                "Unknown"}
                        </strong>
                    </div>

                </div>

            </aside>
        );
    }

    // =====================================================
    // SATELLITE
    // =====================================================

    if (selectedType === "satellite") {
        const satellite = selectedEvent;

        const position =
            satellite.calculatedPosition;

        const meanMotion =
            Number(satellite.MEAN_MOTION);

        const orbitalPeriod =
            meanMotion > 0
                ? 1440 / meanMotion
                : null;

        return (
            <aside className="info-panel">

                <PanelHeader />

                <div className="selected-heading">

                    <h3>
                        {satellite.OBJECT_NAME ||
                            "Unknown Satellite"}
                    </h3>

                    <div className="selected-subtitle">
                        ORBITAL TRACKING
                    </div>

                </div>

                <div className="info-list">

                    <div className="info-item">
                        <span>NORAD ID</span>
                        <strong>
                            {satellite.NORAD_CAT_ID ||
                                "Unknown"}
                        </strong>
                    </div>

                    <div className="info-item">
                        <span>Altitude</span>
                        <strong>
                            {position?.altitude !== undefined
                                ? `${position.altitude.toFixed(
                                      0
                                  )} km`
                                : "Unknown"}
                        </strong>
                    </div>

                    <div className="info-item">
                        <span>Latitude</span>
                        <strong>
                            {position?.latitude !== undefined
                                ? `${position.latitude.toFixed(
                                      2
                                  )}°`
                                : "Unknown"}
                        </strong>
                    </div>

                    <div className="info-item">
                        <span>Longitude</span>
                        <strong>
                            {position?.longitude !== undefined
                                ? `${position.longitude.toFixed(
                                      2
                                  )}°`
                                : "Unknown"}
                        </strong>
                    </div>

                    <div className="info-item">
                        <span>Inclination</span>
                        <strong>
                            {satellite.INCLINATION !==
                            undefined
                                ? `${Number(
                                      satellite.INCLINATION
                                  ).toFixed(2)}°`
                                : "Unknown"}
                        </strong>
                    </div>

                    <div className="info-item">
                        <span>Orbital Period</span>
                        <strong>
                            {orbitalPeriod
                                ? `${orbitalPeriod.toFixed(
                                      1
                                  )} min`
                                : "Unknown"}
                        </strong>
                    </div>

                </div>

            </aside>
        );
    }
    // =====================================================
// STORM
// =====================================================

if (selectedType === "storm") {
    const storm = selectedEvent;

    const coordinates =
        storm.geometry?.coordinates || [];

    const longitude =
        Number(coordinates[0]);

    const latitude =
        Number(coordinates[1]);

    const magnitude =
        storm.magnitudeValue;

    return (
        <aside className="info-panel">

            <PanelHeader />

            <div className="selected-heading">

                <h3>
                    {storm.title ||
                        "Severe Storm"}
                </h3>

                <div className="selected-subtitle">
                    SEVERE WEATHER
                </div>

            </div>

            <div className="info-list">

                <div className="info-item">
                    <span>Type</span>

                    <strong>
                        Severe Storm
                    </strong>
                </div>

                <div className="info-item">
                    <span>Latitude</span>

                    <strong>
                        {Number.isFinite(latitude)
                            ? `${latitude.toFixed(
                                  2
                              )}°`
                            : "Unknown"}
                    </strong>
                </div>

                <div className="info-item">
                    <span>Longitude</span>

                    <strong>
                        {Number.isFinite(longitude)
                            ? `${longitude.toFixed(
                                  2
                              )}°`
                            : "Unknown"}
                    </strong>
                </div>

                <div className="info-item">
                    <span>Wind Speed</span>

                    <strong>
                        {magnitude !== null &&
                        magnitude !== undefined
                            ? `${magnitude} ${
                                  storm.magnitudeUnit ||
                                  "units"
                              }`
                            : "Unknown"}
                    </strong>
                </div>

                <div className="info-item">
                    <span>Status</span>

                    <strong>
                        {storm.closed
                            ? "Closed"
                            : "Active"}
                    </strong>
                </div>

                <div className="info-item">
                    <span>Event ID</span>

                    <strong>
                        {storm.id ||
                            "Unknown"}
                    </strong>
                </div>

            </div>

        </aside>
    );
}
// --------------------------------
// TEMPERATURE
// --------------------------------

if (selectedType === "temperature") {
    const temperature =
        Number(selectedEvent.temperature);

    const latitude =
        Number(selectedEvent.latitude);

    const longitude =
        Number(selectedEvent.longitude);

    return (
        <aside className="info-panel">

            <h3>
                Temperature
            </h3>

            <div className="info-list">

                <div className="info-item">
                    <span>Temperature</span>

                    <strong>
                        {Number.isFinite(
                            temperature
                        )
                            ? `${temperature.toFixed(
                                  1
                              )} °C`
                            : "Unknown"}
                    </strong>
                </div>

                <div className="info-item">
                    <span>Latitude</span>

                    <strong>
                        {Number.isFinite(
                            latitude
                        )
                            ? latitude.toFixed(2)
                            : "Unknown"}
                    </strong>
                </div>

                <div className="info-item">
                    <span>Longitude</span>

                    <strong>
                        {Number.isFinite(
                            longitude
                        )
                            ? longitude.toFixed(2)
                            : "Unknown"}
                    </strong>
                </div>

                <div className="info-item">
                    <span>Status</span>

                    <strong>
                        LIVE
                    </strong>
                </div>

            </div>

        </aside>
    );
}
    // =====================================================
    // WILDFIRE
    // =====================================================

    if (selectedType === "wildfire") {
        const fire = selectedEvent;

        const brightness =
            Number(fire.bright_ti4);

        const latitude =
            Number(fire.latitude);

        const longitude =
            Number(fire.longitude);

        let confidence = fire.confidence;

        if (confidence === "h") {
            confidence = "High";
        } else if (confidence === "n") {
            confidence = "Nominal";
        } else if (confidence === "l") {
            confidence = "Low";
        }

        return (
            <aside className="info-panel">

                <PanelHeader />

                <div className="selected-heading">

                    <h3>
                        Active Wildfire
                    </h3>

                    <div className="selected-subtitle">
                        THERMAL DETECTION
                    </div>

                </div>

                <div className="info-list">

                    <div className="info-item">
                        <span>Brightness</span>
                        <strong>
                            {Number.isFinite(
                                brightness
                            )
                                ? `${brightness.toFixed(
                                      1
                                  )} K`
                                : "Unknown"}
                        </strong>
                    </div>

                    <div className="info-item">
                        <span>Confidence</span>
                        <strong>
                            {confidence ||
                                "Unknown"}
                        </strong>
                    </div>

                    <div className="info-item">
                        <span>Satellite</span>
                        <strong>
                            {fire.satellite ||
                                "Unknown"}
                        </strong>
                    </div>

                    <div className="info-item">
                        <span>Latitude</span>
                        <strong>
                            {Number.isFinite(
                                latitude
                            )
                                ? `${latitude.toFixed(
                                      2
                                  )}°`
                                : "Unknown"}
                        </strong>
                    </div>

                    <div className="info-item">
                        <span>Longitude</span>
                        <strong>
                            {Number.isFinite(
                                longitude
                            )
                                ? `${longitude.toFixed(
                                      2
                                  )}°`
                                : "Unknown"}
                        </strong>
                    </div>

                    <div className="info-item">
                        <span>Detection</span>
                        <strong>
                            {fire.acq_date ||
                                "Unknown"}
                        </strong>
                    </div>

                </div>

            </aside>
        );
    }

    // =====================================================
    // EARTHQUAKE
    // =====================================================

    if (selectedType === "earthquake") {
        const props =
            selectedEvent.properties;

        const coords =
            selectedEvent.geometry.coordinates;

        return (
            <aside className="info-panel">

                <PanelHeader />

                <div className="selected-heading">

                    <h3>
                        {props.place}
                    </h3>

                    <div className="selected-subtitle">
                        SEISMIC ACTIVITY
                    </div>

                </div>

                <div className="info-list">

                    <div className="info-item">
                        <span>Magnitude</span>
                        <strong>
                            {props.mag}
                        </strong>
                    </div>

                    <div className="info-item">
                        <span>Depth</span>
                        <strong>
                            {coords[2]} km
                        </strong>
                    </div>

                    <div className="info-item">
                        <span>Latitude</span>
                        <strong>
                            {coords[1].toFixed(2)}
                        </strong>
                    </div>

                    <div className="info-item">
                        <span>Longitude</span>
                        <strong>
                            {coords[0].toFixed(2)}
                        </strong>
                    </div>

                    <div className="info-item">
                        <span>Status</span>
                        <strong>
                            {props.status}
                        </strong>
                    </div>

                </div>

            </aside>
        );
    }

    // =====================================================
    // FALLBACK
    // =====================================================

    return (
        <aside className="info-panel">

            <PanelHeader />

            <div className="info-empty">

                <div className="info-empty-icon">
                    🌍
                </div>

                <h3>
                    Selected Location
                </h3>

                <p className="empty-info">
                    Information for this layer
                    is not available yet.
                </p>

            </div>

        </aside>
    );
}