import { useEffect, useState, useLayoutEffect } from "react";

export const useGetLeagues = () => {
  const axios = require("axios").default;
  const token = process.env.REACT_APP_TOKEN;

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
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
      // console.log("hook response: ", response.data.competitions);
      setData(response.data.competitions);
    };
    fetchData();
  }, []);
  return {
    data,
  };
};

export const useGetLeagueMatches = (id) => {
  const axios = require("axios").default;
  const token = process.env.REACT_APP_TOKEN;

  const [data, setData] = useState([]);

  //var link = `http://api.football-data.org/v2/competitions/${id}/matches`
  var link = "http://api.football-data.org/v2/competitions/2003/matches";
  //   console.log("LINK", link);

  useEffect((id) => {
    const fetchData = async () => {
      
      const response = await axios
        .get(link, {
          headers: {
            "X-Auth-Token": token,
            "Content-Type": "text/plain",
          },
        })
        .then((res) => res)
        .catch((err) => console.log(err));
      //console.log("response: ", response.data.matches);

      setData(response.data.matches);
    };
    fetchData();
    console.log("Fetched");
  }, []);
  return {
    data
  };
};

export const useGetTeams = () => {
  const axios = require("axios").default;
  const token = process.env.REACT_APP_TOKEN;

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios
        .get("https://api.football-data.org/v4/teams/2061", {
          headers: {
            "X-Auth-Token": token,
            "Content-Type": "text/plain",
             "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => res)
        .catch((err) => console.error(err));
      console.log("hook response: ", response.data);
      setData(response.data.competitions);
    };
    fetchData();
  }, []);
  return {
    data,
  };
};
