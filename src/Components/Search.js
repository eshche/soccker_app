import React from "react";

const Search = ({ filter, setFilter }) => {
console.log(filter)

  return (
    <div>
      <input
        value={filter.query}
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        placeholder="Search..."
      />
    </div>
  );
};

export default Search;
