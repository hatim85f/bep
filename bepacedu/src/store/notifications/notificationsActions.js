import { ERROR } from "../auth/authActions";
import { mainLink } from "../link";

export const GET_NOTIFICATIONS = "ADD_NOTIFICATIONS";

export const getNotifications = () => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/notifications`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    const resData = await response.json();

    dispatch({
      type: GET_NOTIFICATIONS,
      notifications: resData.notifications,
    });
  };
};

export const addNotifications = (userId, courseId, message) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/notifications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ userId, courseId, message }),
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
        error: "Done",
        message: resData.message,
      });
    }
  };
};
