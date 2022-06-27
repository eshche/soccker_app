import React from 'react'
//import { useGetLeagueMatches } from '../../lib/hooks';


export default function Breadcrumbs(props) {
 //const leagueName = useGetLeagueMatches(props);

 console.log("Props", props)

  return (
    <div><nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li>Leagues</li>
      <li class="is-active"><a href="#" aria-current="page">{props.league.name}</a></li>
    </ul>
  </nav></div>
  )
}

