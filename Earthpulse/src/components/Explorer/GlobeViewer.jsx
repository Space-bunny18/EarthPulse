import "./Explorer.css";
import ExplorerGlobe from "./Globe/ExplorerGlobe";

export default function GlobeViewer() {
  return (
    <div className="globe-viewer">

      <div className="globe-canvas">

        <ExplorerGlobe />

      </div>

    </div>
  );
}