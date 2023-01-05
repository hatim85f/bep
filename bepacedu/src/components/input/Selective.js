import React, { useEffect, useState } from "react";

import classes from "./input.module.css";

const Selective = (props) => {
  const [value, setValue] = useState("");

  const { onChange } = props;

  useEffect(() => {
    onChange(value);
  }, [onChange, value]);

  return (
    <div className={classes.mainContainer}>
      <label htmlFor="inpt" className={classes.label}>
        {" "}
        {props.title}{" "}
      </label>
      <div className={classes.inputContainer}>
        <select
          className={classes.input}
          onChange={(e) => setValue(e.target.value)}
        >
          <option> {value} </option>
          {props.options &&
            props.options.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
        </select>
      </div>
    </div>
  );
};

export default Selective;
