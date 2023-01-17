import React from "react";

import classes from "./warning.module.css";

const Warning = (props) => {
  return (
    <div className={classes.warningContainer}>
      <strong>{props.text}</strong>
    </div>
  );
};

export default Warning;
