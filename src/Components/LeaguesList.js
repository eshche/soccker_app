import React, { useEffect, useState } from "react";
import axios from "axios";

import LeagueCard from "./Ui/LeagueCard";
import Pagination from "./Pagination";

import { useNavigate, useParams } from "react-router-dom";

export default function LeaguesList() {
  const axios = require("axios").default;
  const token = process.env.REACT_APP_TOKEN;

  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [leaguesPerPage] = useState(10);

  const lastLeagueIndex = currentPage * leaguesPerPage;
  const firstLeagueIndex = lastLeagueIndex - leaguesPerPage;
  const currentLeagues = leagues.slice(firstLeagueIndex, lastLeagueIndex);

  let navigate = useNavigate();

  const redirect = (id) => {
    navigate(`/leagues/${id}`);
  };

  const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
  }

  const nextPage = () => setCurrentPage(prev => prev+1)
  const prevPage = () => setCurrentPage(prev => prev - 1)

  useEffect(() => {
    const fetchLeagues = async () => {
      setLoading(true);
      const response = await axios
        .get("http://api.football-data.org/v2/competitions/", {
          headers: {
            "X-Auth-Token": token,
            "Content-Type": "text/plain",
            // "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => res)
        .catch((err) => console.log(err));
      console.log("leagues", response.data.competitions);
      setLeagues(response.data.competitions);
      setLoading(false);
    };
    fetchLeagues();
  }, []);

  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
    <div>
      <div class="columns is-desktop is-multiline">
        {currentLeagues.map((league) => (
          <div
            class="column is-one-third-desktop"
            key={league.id}
            onClick={() => redirect(league.id)}
          >
            <LeagueCard league={league} />
          </div>
        ))}
      </div>
      
      <Pagination
        leaguesPerPage={leaguesPerPage}
        totalLeagues={leagues.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <a class="pagination-previous" onClick={prevPage}>Previous</a>
      <a class="pagination-next" onClick={nextPage}>Next page</a>
    </div>
  );
}
