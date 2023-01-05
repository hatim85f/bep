import React from "react";

import classes from "./ReusableTable.css";

const MobileFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <span style={{ marginTop: 50 }}>
      <input
        type="text"
        defaultValue={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
        className={classes.select}
        placeholder="Write Mobile Number"
      />
    </span>
  );
};

export default MobileFilter;
