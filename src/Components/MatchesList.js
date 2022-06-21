import React, { useState } from "react";
import { useGetLeagueMatches } from "../lib/hooks";
import Breadcrumbs from "./Ui/Breadcrumbs";
import Calendar from "./Calendar";
import { useParams } from "react-router-dom";
import Pagination from "./Ui/Pagination";
import CalendarPicker from "./Ui/CalendarPicker";
import Search from "./Ui/Search";

export default function MatchesList() {
  const id = useParams().leageId;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const fetchedMatches = useGetLeagueMatches(id).data;
  // const loading = useGetLeagueMatches.loading

  //console.log("fetchedMatches", fetchedMatches);

  const lastItemIndex = currentPage + itemsPerPage - 1; //21
  const firstItemIndex = lastItemIndex - itemsPerPage; //1

  let currentItems = fetchedMatches.slice(firstItemIndex, lastItemIndex);

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
    console.log("currentpage", currentPage);
  }

  const startDate = Date(2000,0,0);
  const finishDate = Date();

  let datedItems = fetchedMatches.filter(
    (match) => match.date >= startDate && match.date < +finishDate
  );

   console.log("Matchlist", fetchedMatches);
   console.log("leageId", id)
  return (
    <div>
      <Breadcrumbs />
      <Search leageId={id}/>
      <CalendarPicker />

      <Calendar matches={currentItems} />

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={fetchedMatches.length}
        paginate={paginate}
      />
    </div>
  );
}
