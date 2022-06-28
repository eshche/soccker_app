import React, { useEffect, useState } from "react";
import LeaguesList from "../Components/LeaguesList";
import Search from "../Components/Search";
import LeagueCard from "../Components/Ui/LeagueCard";
import Pagination from "../Components/Pagination";

import { useNavigate, useParams } from "react-router-dom";

export default function Leagues() {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
  };

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  const axios = require("axios").default;
  const token = process.env.REACT_APP_TOKEN;

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
        .catch((err) => setError(err))
        .finally(() => {
          setLoading(false);
        });
      console.log("leagues", response.data.competitions);
      setLeagues(response.data.competitions);
      // setLoading(false);
    };
    fetchLeagues();
  }, []);

  const [input, setInput] = useState("");

  const filteredLeagues = leagues.filter(league =>{
    return league.name.toLowerCase().includes(league.toLowerCase)
  })

  return (
    <div>
      <Search />
      <input
        type="text"
        placeholder={"search league"}
        className="search_input"
        onChange={(event) => event.target.value}
      ></input>

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
        </div>
      )}

      <Pagination
        leaguesPerPage={leaguesPerPage}
        totalLeagues={leagues.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <a class="pagination-previous" onClick={prevPage}>
        Previous
      </a>
      <a class="pagination-next" onClick={nextPage}>
        Next page
      </a>
    </div>
  );
}
