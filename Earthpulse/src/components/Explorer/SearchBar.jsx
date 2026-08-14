import "./Explorer.css";

export default function SearchBar() {
  return (
    <div className="search-bar">

      <div className="window-controls">
        <span className="red"></span>
        <span className="yellow"></span>
        <span className="green"></span>
      </div>

      <div className="search-icon">
        🔎
      </div>

      <input
        type="text"
        placeholder="Search cities, countries, flights, earthquakes, satellites..."
        aria-label="Search EarthPulse"
      />

      <div className="search-status">
        <span className="status-dot"></span>
        <span>LIVE</span>
      </div>

    </div>
  );
}