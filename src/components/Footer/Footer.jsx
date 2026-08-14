import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-glow"></div>

      <div className="footer-container">

        <div className="footer-brand">

          <h2>🌍 EarthPulse</h2>

          <p>
            Experience Earth. Live.
          </p>

          <span>
            Real-time intelligence for our planet.
          </span>

        </div>

        <div className="footer-links">

          <div>

            <h4>Platform</h4>

            <a href="#">Dashboard</a>
            <a href="#">Earth Layers</a>
            <a href="#">Live Events</a>
            <a href="#">Visualizations</a>

          </div>

          <div>

            <h4>Resources</h4>

            <a href="#">Documentation</a>
            <a href="#">API</a>
            <a href="#">GitHub</a>
            <a href="#">Roadmap</a>

          </div>

          <div>

            <h4>Connect</h4>

            <a href="#">LinkedIn</a>
            <a href="#">Twitter / X</a>
            <a href="#">Contact</a>

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        <span>
          © 2026 EarthPulse • Built with React • Three.js • Open APIs
        </span>

      </div>

    </footer>
  );
}