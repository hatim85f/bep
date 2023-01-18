import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import bepac from "../../assets/bepac.png";

import classes from "./homePage.module.css";
import * as authActions from "../../store/auth/authActions";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const [move, setMove] = useState(false);

  const { token, isAdmin } = useSelector((state) => state.auth);

  useEffect(() => {
    setTimeout(() => {
      setMove(true);
    }, 100);
  }, []);

  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(authActions.logOut());
  };

  useEffect(() => {
    if (!token) {
      const userDetails = window.localStorage.getItem("userDetails");
      const userData = JSON.parse(userDetails);

      if (userData) {
        dispatch(authActions.getUserBack(userData.user, userData.token));
      }
    }
  }, [token, dispatch]);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      if (isAdmin) {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }
    }
  }, [isAdmin, token, navigate]);

  return (
    <div className={classes.container}>
      <div className={classes.logoContainer}>
        <img src={bepac} alt="logo" className={classes.logo} />
      </div>
      <div className={classes.actions}>
        <div className={classes.buttonsContainer}>
          <button
            className={classes.button}
            onClick={() => navigate("/registeration")}
          >
            Register
          </button>
          <button className={classes.button} onClick={() => navigate("/auth")}>
            Login
          </button>
          <button className={classes.button} onClick={logOut}>
            Logout
          </button>
        </div>
      </div>
      <div className={move ? classes.dataMoving : classes.dataContainer}>
        <strong> Your Way to Improve </strong>
      </div>
      <div className={move ? classes.sloganMoving : classes.slogan}>
        <strong> All Pharma career in One Place </strong>
        <strong className={classes.capital}> IN ONE PLACE </strong>
      </div>
    </div>
  );
};

export default HomePage;
