import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Resolve = () => {
  const { token, isAdmin } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      if (isAdmin) {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }
    }
  }, [token, isAdmin, navigate]);

  return null;
};

export default Resolve;
