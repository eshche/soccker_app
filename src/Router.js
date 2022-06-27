import React, { useState } from "react";

import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Leagues from "./routes/Leagues";
import Teams from "./routes/Teams";
import Navbar from "./Components/Ui/Navbar";
import CalendarLeague from "./routes/CalendarLeague";
import CalendarTeam from "./routes/CalendarTeam";

export default function Router() {
  //const { leagueId } = useParams();


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="teams" element={<Teams />} />
        <Route path="teams/:teamId" element={<CalendarTeam leageId={useParams}/>} />
        <Route path="leagues" element={<Leagues />} />
        <Route path="leagues/:leagueId" element={<CalendarLeague leageId={useParams}/>} />
        <Route index element={<Leagues />} />
        <Route path="*" element={<>Страница не найдена 404</>} />
      </Routes>
    </BrowserRouter>
  );
}
