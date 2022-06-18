import React, { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Leagues from "./routes/Leagues";
import Teams from "./routes/Teams";
import Navbar from "./Components/Ui/Navbar";
import CalendarLeague from "./routes/CalendarLeague";

export default function Router() {
  const [leageId, setLeageId] = useState();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="teams" element={<Teams />} />
        <Route path="leagues" element={<Leagues />} />
        <Route path="leagues/:leageId" element={<CalendarLeague leageId={leageId}/>} />
        <Route index element={<Leagues />} />
        <Route path="*" element={<>Страница не найдена 404</>} />
      </Routes>
    </BrowserRouter>
  );
}
