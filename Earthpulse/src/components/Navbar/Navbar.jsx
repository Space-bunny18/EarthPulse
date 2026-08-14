import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div
          className="logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <div className="logo-dot"></div>
          <span>EARTH PULSE</span>
        </div>

        <ul className="nav-links">
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/explorer");
              }}
            >
              Layers
            </a>
          </li>

          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/explorer");
              }}
            >
              Explore
            </a>
          </li>

          <li>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
        </ul>

        <button
          className="launch-btn"
          onClick={() => navigate("/explorer")}
        >
          Launch App →
        </button>

      </div>
    </nav>
  );
}

export default Navbar;