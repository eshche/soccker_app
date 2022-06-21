import React , {useEffect, useState} from "react";
import { useParams } from "react-router";
import Breadcrumbs from "../Components/Ui/Breadcrumbs";

export default function CalendarLeague(props) {
  const { leagueId } = useParams();

  //console.log("id", useParams());

  const [league, setLeague] = useState();
  const [loading, setLoading] = useState(false);

  const axios = require("axios").default;
  const token = process.env.REACT_APP_TOKEN;

  useEffect(() => {
    const fetchLeague = async () => {
      setLoading(true);
      const response = await axios
        .get("http://api.football-data.org/v2/competitions/2003", {
          headers: {
            "X-Auth-Token": token,
            "Content-Type": "text/plain",
            // "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => res)
        .catch((err) => console.log(err));
      console.log("league", response.data);
      setLeague(response.data);
      setLoading(false);
    };
    fetchLeague();
  }, []);

  // if (loading) {
  //   return <h1>loading...</h1>;
  // }

  return (
    <div>
      <Breadcrumbs league={league} />
      <div>CalendarLeague</div>
    </div>
  );
}
