import { useNavigate } from "react-router-dom";
import "./Hero.css";
import StatsBar from "../StatsBar/StatsBar.jsx";

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="hero-content">

      <div className="live-badge">
        <span className="live-dot"></span>
        LIVE • 6,214 EVENTS TRACKED THIS HOUR
      </div>

      <h1 className="hero-title">
        Earth
        <br />
        <span>Pulse.</span>
      </h1>

      <h2 className="hero-subtitle">
        Experience Earth. Live.
      </h2>

      <p className="hero-description">
        One globe, every signal — weather fronts,
        tremors, flights, and orbits rendered in real
        time as they happen. No tabs. No dashboards.
        Just the planet, breathing.
      </p>

      <div className="hero-buttons">

        <button
          className="primary-btn"
          onClick={() => navigate("/explorer")}
        >
          Explore the Globe
        </button>

        <a
          className="secondary-btn"
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </a>

      </div>

      <StatsBar />

    </div>
  );
}

export default Hero;