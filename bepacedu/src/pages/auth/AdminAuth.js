import React, { useCallback, useEffect } from "react";
import classes from "./auth.module.css";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/use-input";
import ErrorModal from "../../components/error/ErrorModal";
import Input from "../../components/input/Input";
import { useDispatch, useSelector } from "react-redux";

import * as authActions from "../../store/auth/authActions";

const AdminAuth = () => {
  const { error, errorMessage } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);

  const isNotEmpty = (value) => value.trim() !== "";
  const isEmail = (value) => value.includes("@");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    const userData = JSON.parse(userDetails);

    const userToken = userData ? userData.token : null;

    if (userToken || token) {
      dispatch(authActions.getUserBack(userData.user, userData.token));
      navigate("/dashboard");
    }
  }, [dispatch, navigate, token]);

  const {
    value: userEmail,
    isValid: userEmailInvalid,
    valueChangeHandler: userEmailChangeHandler,
    inputBlurHandler: userEmailBlurHandler,
    reset: userEmailReset,
    hasError: userEmailHasError,
  } = useInput(isEmail);

  const {
    value: password,
    isValid: passwordIsvalid,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
    hasError: passwordHasError,
  } = useInput(isNotEmpty);

  const clearError = () => {
    dispatch(authActions.clearError());
  };

  const submit = () => {
    dispatch(authActions.login(userEmail, password));

    navigate("/dashboard");
  };
  if (error) {
    return (
      <ErrorModal title={error} message={errorMessage} onConfirm={clearError} />
    );
  }

  return (
    <div className={classes.container}>
      <strong>Login</strong>
      <form className={classes.form} onSubmit={submit}>
        <div className={classes.loginContainer}>
          <Input
            title="User Name"
            type="email"
            onChange={userEmailChangeHandler}
            onFocus={userEmailReset}
            onBlur={userEmailBlurHandler}
            id="userName"
          />
          {userEmailHasError && (
            <p className={classes.error}> Please Enter a valid Email ID </p>
          )}
          <Input
            title="Password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            onFocus={passwordReset}
            type="password"
            id="pass"
          />
          {passwordHasError && (
            <p className={classes.error}> Please Enter your Password </p>
          )}
        </div>
        <div className={classes.btnContainer}>
          <button className={classes.btn} onClick={() => {}}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAuth;
