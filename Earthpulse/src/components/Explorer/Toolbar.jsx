import "./Explorer.css";
import { useNavigate, useSearchParams } from "react-router-dom";

const tools = [
    {
        icon: "🌍",
        layer: "earthquakes",
    },
    {
        icon: "✈️",
        layer: "flights",
    },
    {
        icon: "🔥",
        layer: "wildfires",
    },
    {
        icon: "🛰️",
        layer: "satellites",
    },
    {
        icon: "🌪️",
        layer: "storms",
    },
    {
        icon: "🌡️",
        layer: "temperature",
    },
];

export default function Toolbar() {
    const navigate = useNavigate();

    const [searchParams] =
        useSearchParams();

    const activeLayer =
        searchParams.get("layer") ||
        "earthquakes";

    function handleLayerChange(layer) {
        navigate(
            `/explorer?layer=${layer}`
        );
    }

    return (
        <div className="toolbar">

            {tools.map((tool) => (

                <button
                    key={tool.layer}
                    className={
                        activeLayer === tool.layer
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        handleLayerChange(
                            tool.layer
                        )
                    }
                    title={tool.layer}
                >
                    {tool.icon}
                </button>

            ))}

        </div>
    );
}