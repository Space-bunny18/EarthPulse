import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import ExplorerPage from "./pages/Explorer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/explorer" element={<ExplorerPage />} />
    </Routes>
  );
}

export default App;