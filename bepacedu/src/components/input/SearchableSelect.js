import React, { useEffect, useState } from "react";

import VirtualizedSelect from "react-virtualized-select";

import classes from "./input.module.css";

import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";

const SearchableSelect = (props) => {
  const { onChange, options } = props;
  const [item, setItem] = useState(null);

  useEffect(() => {
    onChange(item);
  }, [onChange, item]);

  return (
    <div className={classes.mainContainer}>
      <label htmlFor="inpt" className={classes.label}>
        {" "}
        {props.title}{" "}
      </label>
      <div className={classes.inputContainer}>
        <div className={classes.input} style={{ height: "100%" }}>
          <VirtualizedSelect
            options={options}
            onChange={(value) => setItem(value)}
            value={item}
            id="inpt"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchableSelect;
