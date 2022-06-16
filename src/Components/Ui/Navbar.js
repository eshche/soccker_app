import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <>
      <nav class="navbar is-primary">
        <div class="navbar-start">
          <a class="navbar-item">
            <Link to="/leagues">Leagues</Link>
          </a>

          <a class="navbar-item">
            <Link to="/teams">Commands</Link>
          </a>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
