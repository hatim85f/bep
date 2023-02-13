import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import classes from "./auth.module.css";

const Resolve = () => {
  const { token, isAdmin } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const clearCache = () => {
    window.localStorage.removeItem("userDetails");
  };
  useEffect(() => {
    if (token) {
      if (isAdmin) {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }
    }
  }, [token, isAdmin, navigate]);

  return (
    <div className={classes.btnContainer}>
      <button onClick={clearCache} className={classes.btn}>
        Clear Cache
      </button>
    </div>
  );
};

export default Resolve;
