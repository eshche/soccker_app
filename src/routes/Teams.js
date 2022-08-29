import React, { useEffect, useState } from "react";
import axios from "axios";

import TeamCard from "../Components/Ui/TeamCard"
import Pagination from "../Components/Pagination";

import { useNavigate, useParams } from "react-router-dom";
import { useLeagues } from "../hooks/useLeaguesAndTeams";
import Search from "../Components/Search";



export default function TeamssList() {
  const axios = require("axios").default;
  const token = process.env.REACT_APP_TOKEN;

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [leaguesPerPage] = useState(10);
  const [error, setError] = useState("");

  const [filter, setFilter] = useState({ query: "" });
  const searchedLeagues = useLeagues(teams, filter.query);

  const lastLeagueIndex = currentPage * leaguesPerPage;
  const firstLeagueIndex = lastLeagueIndex - leaguesPerPage;
  const currentLeagues = searchedLeagues.slice(firstLeagueIndex, lastLeagueIndex);

  let navigate = useNavigate();

  const redirect = (id) => {
    navigate(`/teams/${id}`);
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
        .get("http://api.football-data.org/v2/teams/", {
          headers: {
            "X-Auth-Token": token,
            "Content-Type": "text/plain",
            // "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => res)
        .catch((err) => console.log(err));
      console.log("teams", response.data.teams);
      setTeams(response.data.teams);
      setLoading(false);
    };
    fetchLeagues();
  }, []);

  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
    <div>
      <Search filter={filter} setFilter={setFilter} />
      {loading ? (
        <p>loading...</p>
      ) : (
        <div>
          {error && (
            <div>
              <p>{error.message}</p>
            </div>
          )}
      <div class="columns is-desktop is-multiline">
        {currentLeagues.map((team) => (
          <div
            class="column is-one-third-desktop"
            key={team.id}
            onClick={() => redirect(team.id)}
          >
            <TeamCard team={team} />
          </div>
        ))}
      </div>
      </div>
      )}
      
      <Pagination
        itemsPerPage={leaguesPerPage}
        totalItems={teams.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <a class="pagination-previous" onClick={prevPage}>Previous</a>
      <a class="pagination-next" onClick={nextPage}>Next page</a>
    </div>
  );
}
