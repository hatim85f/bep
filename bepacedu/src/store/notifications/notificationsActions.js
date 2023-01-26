import { ERROR } from "../auth/authActions";
import { mainLink } from "../link";

export const GET_NOTIFICATIONS = "ADD_NOTIFICATIONS";
export const OPEN_NOTIFICATION = "OPEN_NOTIFICATION";

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

export const addNotifications = (userId, courseId, message, type) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/notifications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ userId, courseId, message, type }),
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

export const openNotification = (notificationId) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    console.log(token);

    await fetch(`${mainLink}/api/notifications/isOpened`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ notificationId }),
    });

    dispatch({
      type: OPEN_NOTIFICATION,
      notificationId: notificationId,
    });
  };
};
