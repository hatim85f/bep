import React, { useEffect } from "react";
import classes from "./nav.module.css";

import bepac from "../../assets/bepac.png";
import { useDispatch, useSelector } from "react-redux";

import * as authActions from "../../store/auth/authActions";

const Header = () => {
  return (
    <div>
      <img src={bepac} className={classes.image} alt="logo" />
    </div>
  );
};

export default Header;
