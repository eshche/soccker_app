import React from "react";

export default function Pagination({
  leaguesPerPage,
  totalLeagues,
  paginate,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalLeagues / leaguesPerPage); i++) {
    pageNumbers.push(i);
  }

  

  return (
    <div>
      <nav class="pagination" role="navigation" aria-label="pagination">
        <ul class="pagination is-centered">
          {pageNumbers.map((num) => (
            <li className="page-item" key={num}>
              <a class="pagination-link" onClick={() => paginate(num)}>
                {num}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
