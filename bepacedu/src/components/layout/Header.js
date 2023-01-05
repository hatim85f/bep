import React from "react";
import classes from "./nav.module.css";

import bepac from "../../assets/bepac.png";

const Header = () => {
  return (
    <div>
      <img src={bepac} className={classes.image} alt="logo" />
    </div>
  );
};

export default Header;
