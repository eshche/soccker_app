import React from "react";


export default function LeageCard(props) {

  return (
    <div>
      <div class="card" >
        <div class="card-content">
          <div class="media">
            <div class="media-content" key={props.league.id}>
              <p class="title is-4">{props.league.name}</p>
              <p class="subtitle is-6">{props.league.area.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
