import { ERROR } from "../auth/authActions";
import { mainLink } from "../link";

export const CREATE_GROUP = "CREATE_GROUP";
export const GET_GROUPS = "GET_GROUPS";

export const getGroups = () => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/groups`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    const resData = await response.json();

    dispatch({
      type: GET_GROUPS,
      groups: resData.groups,
    });
  };
};

export const createGroup = (group) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ groupData: group }),
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
      type: CREATE_GROUP,
      group: group,
    });
  };
};
