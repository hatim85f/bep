import React from "react";

import classes from "./input.module.css";

const Input = (props) => {
  return (
    <div className={classes.mainContainer}>
      <label htmlFor="inpt" className={classes.label}>
        {" "}
        {props.title}{" "}
      </label>
      <div className={classes.inputContainer}>
        <input
          id="inpt"
          className={classes.input}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder={props.placeholder}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
