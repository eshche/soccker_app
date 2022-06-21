import React from "react";

const LeaguesContext = React.createContext();

function useLeagues() {
  const context = React.useContext(LeaguesContext);
  if (!context) {
    throw new Error("useContext must be used with LeaguesProvider");
  }
  return context;
}

function LeaguesProvider(props) {
  [leagues, setLeagues] = React.useState([]);
  const value = React.useMemo(() => [leagues, setLeagues], [leagues]);
  return <LeaguesContext.Provider value={value} {...props} />;
}

export {LeaguesProvider, useLeagues}