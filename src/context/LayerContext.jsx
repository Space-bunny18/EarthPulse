import { createContext, useContext, useState } from "react";

const LayerContext = createContext();

export function LayerProvider({ children }) {
  const [activeLayer, setActiveLayer] = useState("earth");

  return (
    <LayerContext.Provider
      value={{
        activeLayer,
        setActiveLayer,
      }}
    >
      {children}
    </LayerContext.Provider>
  );
}

export function useLayer() {
  return useContext(LayerContext);
}