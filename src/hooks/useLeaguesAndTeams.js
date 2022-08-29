import React, { useMemo } from "react";

export const useLeagues = (leagues, query) => {
  
  const searchedLeagues = useMemo(() => {
    return leagues.filter((league) =>
      league.name.toLowerCase().includes(query.toLocaleLowerCase())
    );
  }, [query, leagues]);
  return searchedLeagues;
};