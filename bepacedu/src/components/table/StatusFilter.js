import React from "react";

import classes from "./ReusableTable.css";

const StatusFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  const filterList = ["Pending", "Accepted", "Rejected", "All"];

  const changeFilter = (e) => {
    if (e === "All") {
      setFilter("");
    } else {
      setFilter(e);
    }
  };
  return (
    <span>
      <select
        name="status"
        value={filterValue || ""}
        onChange={(e) => changeFilter(e.target.value)}
        placeholder="Select"
        className={classes.select}
      >
        <option value="" disabled selected className={classes.placeholder}>
          Select Status
        </option>
        {filterList.map((f, i) => {
          return (
            <option value={f} key={i} className={classes.options}>
              {f}
            </option>
          );
        })}
      </select>
    </span>
  );
};

export default StatusFilter;
