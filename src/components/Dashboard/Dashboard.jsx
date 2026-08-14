import DashboardCard from "./DashboardCard";
import dashboardData from "./dashboardData";
import useEarthquakes from "../../hooks/useEarthquakes";
import useWildfires from "../../hooks/useWildfires";
import useWeather from "../../hooks/useWeather";
import useFlights from "../../hooks/useFlights";
import "./Dashboard.css";

export default function Dashboard() {
    const earthquakes = useEarthquakes();
    const wildfires = useWildfires();
    const weather = useWeather();
    const flights = useFlights();
    const cards = dashboardData.map((card) => {
        if (card.title === "Earthquakes") {
            return {
            ...card,
            value: earthquakes.loading
                ? "..."
                : earthquakes.count,

            trend: earthquakes.loading
                ? "Loading..."
                : `${earthquakes.strongest} Max`,
            };
        }
        if (card.title === "Wildfires") {
            return {
                ...card,
                value: wildfires.loading
                ? "..."
                : wildfires.count,

                trend: wildfires.loading
                ? "Loading..."
                : "NASA Live",
            };
        }
        if (card.title === "Temperature") {
            return {
                ...card,
                value: weather.loading
                ? "..."
                : `${weather.temp}°C`,

                trend: weather.loading
                ? "Loading..."
                : weather.city,
            };
        }
        if (card.title === "Flights") {
            return {
                ...card,
                value: flights.loading
                    ? "..."
                    : flights.count,

                trend: flights.loading
                    ? "Loading..."
                    : "OpenSky Live",
            };
        }
        return card;
    });
    return (
        <section className="dashboard-section">

            <div className="dashboard-heading">

                <p className="dashboard-tag">
                LIVE GLOBAL DASHBOARD
                </p>

                <h2>Planet Intelligence</h2>

                <p className="dashboard-subtitle">
                Monitor Earth in real time with live global
                events, weather systems, flights and more.
                </p>

            </div>

            <div className="dashboard-grid">
                {cards.map((card) => (
                <DashboardCard
                    key={card.id}
                    card={card}
                />
                
                ))}
            </div>
        </section>
    );
}