import React from "react";

export default function TeamCard(props) {
  return (
    <div>
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-content" key={props.team.id}>
              <p class="title is-4">{props.team.name}</p>
              <figure class="image is-48x48">
                <img src={props.team.crestUrl} alt="logo" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
