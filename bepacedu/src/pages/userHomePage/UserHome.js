import React from "react";
import { useSelector } from "react-redux";

import classes from "./home.module.css";

const UserHome = () => {
  const { token } = useSelector((state) => state.auth);

  console.log(token);
  return <div className={classes.mainContainer}>UserHome</div>;
};

export default UserHome;
