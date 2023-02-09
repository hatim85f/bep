import { mainLink } from "../link";

import { ERROR } from "../auth/authActions";

export const GET_EVENT = "GET_EVENT";
export const ADD_EVENT = "ADD_EVENT";
export const UPDATE_EVENT = "UPDATE_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";

export const getEvents = () => {
  return async (dispatch) => {
    const response = await fetch(`${mainLink}/api/events`);

    const resData = await response.json();

    dispatch({
      type: GET_EVENT,
      events: resData.events,
    });
  };
};

export const addEvent = (imageURL, program, date, location, client) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ imageURL, program, date, location, client }),
    });

    const resData = await response.json();

    console.log(resData);

    if (!response.ok) {
      dispatch({
        type: ERROR,
        error: resData.error,
        message: resData.message,
      });
    } else if (response.ok) {
      dispatch({
        type: ERROR,
        message: resData.message,
      });
    }

    dispatch({
      type: ADD_EVENT,
      event: {
        imageURL,
        program,
        date,
        location,
        client,
      },
    });
  };
};

export const updateEvent = (
  eventId,
  imageURL,
  program,
  date,
  location,
  client
) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/events`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        eventId,
        imageURL,
        program,
        date,
        location,
        client,
      }),
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
        message: resData.message,
      });
    }

    dispatch({
      type: UPDATE_EVENT,
      eventId,
      event: {
        imageURL,
        program,
        date,
        location,
        client,
      },
    });
  };
};

export const deleteEvent = (eventId) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/events`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ eventId }),
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
        message: resData.message,
      });
    }

    dispatch({
      type: DELETE_EVENT,
      eventId,
    });
  };
};
