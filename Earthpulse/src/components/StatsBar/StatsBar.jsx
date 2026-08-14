import "./StatsBar.css";

const stats = [
  {
    title: "Flights",
    value: "14,382",
    color: "#4FE3FF",
  },
  {
    title: "Quakes today",
    value: "91",
    color: "#FF5A70",
  },
  {
    title: "Wildfires",
    value: "37",
    color: "#FF9D3D",
  },
  {
    title: "Avg AQI",
    value: "61",
    color: "#22D89B",
  },
  {
    title: "Satellites",
    value: "8,611",
    color: "#3B82F6",
  },
];

function StatsBar() {
  return (
    <div className="stats-bar">
      {stats.map((item, index) => (
        <div className="stat-card" key={index}>
          <span
            className="stat-dot"
            style={{ background: item.color }}
          ></span>

          <span className="stat-title">
            {item.title}
          </span>

          <span className="stat-value">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default StatsBar;