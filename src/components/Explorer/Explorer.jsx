import SearchBar from "./SearchBar";
import Toolbar from "./Toolbar";
import GlobeViewer from "./GlobeViewer";
import InfoPanel from "./InfoPanel";
import Timeline from "./Timeline";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";  
import "./Explorer.css";
import { ExplorerProvider } from "../../context/ExplorerContext";

export default function Explorer() {
    const [searchParams] = useSearchParams();
    const activeLayer =
        searchParams.get("layer") || "earthquakes";

    useEffect(() => {
        console.log("Explorer Layer:", activeLayer);
    }, [activeLayer]);
    return (
  <ExplorerProvider>
    <section className="explorer-section">

      <div className="explorer-header">
        <p className="explorer-tag">
          INSIDE THE APP
        </p>

        <h2>
          Built for explorers, not tabs.
        </h2>

        <p>
          Search a city, scrub through history,
          or drop into live mode — every layer,
          one command deck.
        </p>
      </div>

      <div className="explorer-window">

        <SearchBar />

        <div className="explorer-body">

          <Toolbar />

          <GlobeViewer />

          <InfoPanel />

        </div>

        <Timeline />

      </div>

    </section>
  </ExplorerProvider>
);
}