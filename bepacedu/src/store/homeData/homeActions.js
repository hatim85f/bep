import { ERROR } from "../auth/authActions";
import { mainLink } from "../link";

export const ADD_HOME_ITEM = "ADD_HOME_ITEM";
export const GET_ITEMS = "GET_ITEMS";
export const EDIT_ITEM = "EDIT_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";

export const addHomeItem = (
  title,
  image,
  details,
  articleImage,
  articleDescription,
  articlePoints,
  brochure
) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/home`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        title,
        image,
        details,
        articleImage,
        articleDescription,
        articlePoints,
        brochure,
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
        error: "Success",
        message: resData.message,
      });
    }

    dispatch({
      type: ADD_HOME_ITEM,
      item: {
        title,
        details,
        image,
      },
    });
  };
};

export const getItems = () => {
  return async (dispatch, getState) => {
    const response = await fetch(`${mainLink}/api/home`, {
      method: "GET",
    });

    const resData = await response.json();

    dispatch({
      type: GET_ITEMS,
      items: resData.homeItems,
    });
  };
};

export const editItem = (
  title,
  details,
  image,
  articleImage,
  articleDescription,
  articlePoints,
  brochure,
  itemId
) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/home`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        itemId,
        title,
        image,
        details,
        articleImage,
        articleDescription,
        articlePoints,
        brochure,
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
        error: "Success",
        message: resData.message,
      });
    }

    dispatch({
      type: EDIT_ITEM,
      item: {
        title,
        details,
        image,
      },
      itemId: itemId,
    });
  };
};

export const deleteItem = (itemId) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/home`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ itemId }),
    });

    const resData = await response.json();

    dispatch({
      type: DELETE_ITEM,
      itemId,
    });
  };
};
