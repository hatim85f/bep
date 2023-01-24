import { mainLink } from "../link";

export const NEW_USER = "NEW_USER";
export const ERROR = "ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const clearError = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_ERROR,
      error: null,
    });
  };
};

export const getUserBack = (user, token) => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN,
      userEmail: user.userEmail,
      firstName: user.firstName,
      lastName: user.lastName,
      token: token,
      adminType: user.adminType,
      _id: user._id,
      isAdmin: user.isAdmin,
    });
  };
};

export const setError = (error, message) => {
  return async (dispatch) => {
    dispatch({
      type: ERROR,
      error: error,
      message: message,
    });
  };
};

export const newUser = (userDetails) => {
  return async (dispatch) => {
    const response = await fetch(`${mainLink}/api/registeration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userDetails: userDetails }),
    });

    const resData = await response.json();

    console.log(resData);

    if (!response.ok) {
      dispatch({
        type: ERROR,
        message: resData.message,
        error: resData.error,
      });
    }

    dispatch({
      type: ERROR,
      error: "Success",
      message: resData.message,
    });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(`${mainLink}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const resData = await response.json();

    console.log(resData, "resData");

    const { user, token } = resData;

    if (!response.ok) {
      dispatch({
        type: ERROR,
        error: resData.error,
        message: resData.message,
      });
    }

    window.localStorage.setItem(
      "userDetails",
      JSON.stringify({
        user: resData.user,
        token: resData.token,
      })
    );

    dispatch({
      type: LOGIN,
      userEmail: user.userEmail,
      firstName: user.firstName,
      lastName: user.lastName,
      token: token,
      adminType: user.adminType,
      isAdmin: user.isAdmin,
      _id: user._id,
    });
  };
};

export const logOut = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("userDetails");

    dispatch({
      type: LOGOUT,
    });
  };
};
