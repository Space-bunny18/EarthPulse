import { createContext, useContext, useState } from "react";

const ExplorerContext = createContext();

export function ExplorerProvider({ children }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  function selectEvent(event, type) {
    setSelectedEvent(event);
    setSelectedType(type);
  }

  function clearSelection() {
    setSelectedEvent(null);
    setSelectedType(null);
  }

  return (
    <ExplorerContext.Provider
      value={{
        selectedEvent,
        setSelectedEvent,

        selectedType,
        setSelectedType,

        selectEvent,
        clearSelection,
      }}
    >
      {children}
    </ExplorerContext.Provider>
  );
}

export function useExplorer() {
  return useContext(ExplorerContext);
}