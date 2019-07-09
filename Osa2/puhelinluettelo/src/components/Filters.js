import React from "react";

const Filters = ({ filterInput, handleChangeFilter }) => {
  return (
    <div>
      Filter shown with:{" "}
      <input value={filterInput} onChange={handleChangeFilter} />
    </div>
  );
};

export default Filters;
