import {
  motion,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";

import AnimatedCounter from "./AnimatedCounter";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

export default function DashboardCard({ card }) {
    const navigate = useNavigate();
  const numericValue = parseInt(
    String(card.value).replace(/[^0-9]/g, ""),
    10
  );

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();

    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const spotlight = useMotionTemplate`
    radial-gradient(
      250px circle at ${mouseX}px ${mouseY}px,
      rgba(87,216,255,0.18),
      transparent 70%
    )
  `;

  return (
    <motion.div
      className="dashboard-card"
            onClick={() =>
            navigate(
                `/explorer?layer=${card.title.toLowerCase()}`
            )
        }   
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ duration: 0.25 }}
      onMouseMove={handleMouseMove}
    >

      <motion.div
        className="card-spotlight"
        style={{
          background: spotlight,
        }}
      />

      <div className="card-top">
        <span
          className="card-icon"
          style={{ color: card.color }}
        >
          {card.icon}
        </span>

        <span className="card-trend">
          {card.trend}
        </span>
      </div>

      <h2 className="card-value">
        {isNaN(numericValue) ? (
          card.value
        ) : (
          <AnimatedCounter value={numericValue} />
        )}
      </h2>

      <p className="card-title">
        {card.title}
      </p>

      <div className="mini-chart">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="card-bottom">
        <span className="live-dot"></span>
        Live Updating
      </div>
    </motion.div>
  );
}