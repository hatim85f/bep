import { ERROR } from "../auth/authActions";
import { mainLink } from "../link";

export const ADD_USERS = "ADD_USERS";
export const GET_ALL_USERS = "GET_ALL_USERS";

export const addUsers = (users) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/registeration/all_users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ users }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: response.ok ? "Success" : resData.error,
      message: resData.message,
    });
  };
};

export const getUsers = () => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/registeration/customers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    const resData = await response.json();

    if (!response.ok) {
      dispatch({
        type: ERROR,
        error: resData.error,
        message: resData.message,
      });
    }

    dispatch({
      type: GET_ALL_USERS,
      users: resData.users,
    });
  };
};

export const editFeedback = (userId, feedback, admin) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/registeration/feedback`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ userId, feedback, admin }),
    });

    const resData = await response.json();

    if (!response.ok) {
      dispatch({
        type: ERROR,
        error: resData.error,
        message: resData.message,
      });
    }

    alert(resData.message);
  };
};

export const editRating = (userId, rating, admin) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/registeration/rating`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ userId, rating, admin }),
    });

    const resData = await response.json();

    if (!response.ok) {
      dispatch({
        type: ERROR,
        error: resData.error,
        message: resData.message,
      });
    }

    alert(resData.message);
  };
};
