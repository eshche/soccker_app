import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Breadcrumbs from "../Components/Ui/Breadcrumbs";

export default function CalendarLeague(props) {
  const { leagueId } = useParams();

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const axios = require("axios").default;
  const token = process.env.REACT_APP_TOKEN;

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      const response = await axios
        // .get(`http://api.football-data.org/v2/competitions/2003/matches`, {
        .get(
          `http://api.football-data.org/v2/competitions/${leagueId}/matches/`,
          {
            // .get(`https://api.football-data.org/v2/competitions/CL/matches`, {
            headers: {
              "X-Auth-Token": token,
              "Content-Type": "text/plain",
              // "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((res) => res)
        .catch((err) => setError(err))
        .finally(() => {
          setLoading(false);
        });
      console.log("matches", response.data.matches);
      console.log("err", error);
      setMatches(response.data.matches);
      setLoading(false);
    };
    fetchMatches();
  }, []);

  // if (loading) {
  //   return <h1>loading...</h1>;
  // }
  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : (
        <div>
          {error && (
            <div>
              <p>{error.message}</p>
            </div>
          )}
        <div>
          <table class="table">
            <tbody>
              {matches.map((match) => (
                <tr key={matches.indexOf(match)}>
                  <th>{match.utcDate} </th>
                  <th>{match.status}</th>
                  <th>{match.homeTeam.name}</th>
                  <th>{match.awayTeam.name}</th>
                  <th>
                    {match.score.fullTime.homeTeam} :{" "}
                    {match.score.fullTime.awayTeam}{" "}
                  </th>
                  {match.score.extraTime.homeTeam !== null && (
                    <th>
                      {match.score.extraTime.homeTeam} :
                      {match.score.extraTime.awayTeam}{" "}
                    </th>
                  )}
                  {match.score.penalties.homeTeam !== null && (
                    <th>
                      {match.score.penalties.homeTeam} :
                      {match.score.penalties.awayTeam}{" "}
                    </th>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      )}{" "}
    </div>
  );
}
