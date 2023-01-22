import React from "react";

import classes from "./input.module.css";

const TextArea = (props) => {
  return (
    <div className={classes.mainContainer}>
      <label htmlFor="inpt" className={classes.label}>
        {" "}
        {props.title}{" "}
      </label>
      <div className={classes.inputContainer}>
        <textarea
          id="inpt"
          className={classes.area}
          onKeyDown={props.onEnded}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder={props.placeholder}
          {...props}
        />
      </div>
    </div>
  );
};

export default TextArea;
