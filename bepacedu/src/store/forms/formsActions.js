import { mainLink } from "../link";
import { ERROR } from "../auth/authActions";

export const GET_FORMS = "GET_FORMS";
export const GET_COMMENTS = "GET_COMMENTS";

export const getForms = () => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/contact/form`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    const resData = await response.json();

    dispatch({
      type: GET_FORMS,
      forms: resData.forms,
    });
  };
};

export const addForm = (name, email, mobile, whatsApp, message) => {
  return async (dispatch) => {
    const response = await fetch(`${mainLink}/api/contact/form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, mobile, whatsApp, message }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      message: resData.message,
    });
  };
};

export const getComment = () => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/contact/comment`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    const resData = await response.json();

    dispatch({
      type: GET_COMMENTS,
      comments: resData.comments,
    });
  };
};

export const addComment = (name, email, website, comment) => {
  return async (dispatch) => {
    const response = await fetch(`${mainLink}/api/contact/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, website, comment }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      message: resData.message,
    });
  };
};
