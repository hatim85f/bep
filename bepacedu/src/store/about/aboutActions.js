import { ERROR } from "../auth/authActions";
import { mainLink } from "../link";

export const GET_ABOUT = "GET_ABOUT";
export const ADD_ABOUT = "ADD_ABOUT";
export const UPDATE_ABOUNT = "UPDATE_ABOUT";
export const DELETE_ABOUT = "DELETE_ABOUT";

export const getAbout = () => {
  return async (dispatch) => {
    const response = await fetch(`${mainLink}/api/about`);

    const resData = await response.json();

    dispatch({
      type: GET_ABOUT,
      about: resData.about,
    });
  };
};

export const addAbout = (about) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/about`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ about }),
    });

    const resData = await response.json();

    if (!response.ok) {
      dispatch({
        type: ERROR,
        error: resData.error,
        message: resData.message,
      });
    } else if (response.ok) {
      dispatch({
        type: ERROR,
        error: "Success",
        message: resData.message,
      });
    }

    dispatch({
      type: GET_ABOUT,
      about: about,
    });
  };
};

export const updateAbout = (about, aboutId) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/about`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ about, aboutId }),
    });
    const resData = await response.json();
    if (!response.ok) {
      dispatch({
        type: ERROR,
        error: resData.error,
        message: resData.message,
      });
    } else if (response.ok) {
      dispatch({
        type: ERROR,
        error: "Success",
        message: resData.message,
      });
    }

    dispatch({
      type: GET_ABOUT,
      about: about,
    });
  };
};

export const deleteAbout = (id) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/about`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ aboutId: id }),
    });

    const resData = await response.json();

    if (!response.ok) {
      dispatch({
        type: ERROR,
        error: resData.error,
        message: resData.message,
      });
    } else if (response.ok) {
      dispatch({
        type: ERROR,
        error: "Success",
        message: resData.message,
      });
    }

    dispatch({
      type: DELETE_ABOUT,
      aboutId: id,
    });
  };
};
