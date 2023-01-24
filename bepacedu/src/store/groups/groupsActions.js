import { ERROR } from "../auth/authActions";
import { mainLink } from "../link";

export const CREATE_GROUP = "CREATE_GROUP";
export const GET_GROUPS = "GET_GROUPS";
export const EDIT_GROUP = "EDIT_GROUP";
export const UPDATE_ATTENDANCE = "UPDATE_ATTENDANCE";

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

export const editGroup = (groupId, students, group) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/groups/students`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ students, groupId }),
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
      type: EDIT_GROUP,
      group: group,
    });
  };
};

export const updateAttendance = (groupId, newAttendance) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/groups/attendance`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ groupId, newAttendance }),
    });

    const resData = await response.json();

    if (!response.ok) {
      alert(resData.message);
    }

    dispatch({
      type: UPDATE_ATTENDANCE,
      groupId: groupId,
      attendance: newAttendance,
    });
  };
};

export const passUser = (userId, paymentIndex, groupId) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    const response = await fetch(`${mainLink}/api/courses/pass_student`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ userId, groupId, paymentIndex }),
    });

    const resData = await response.json();

    console.log(resData);

    if (response.ok) {
      dispatch({
        type: ERROR,
        error: "Success",
        message: resData.message,
      });
    }
  };
};

export const enrollToGroup = (groupId, userId, courseId) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/groups/student`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ groupId, userId, courseId }),
    });

    const resData = await response.json();

    if (!response.ok) {
      dispatch({
        type: ERROR,
        message: resData.message,
        error: resData.message,
      });
    } else if (response.ok) {
      dispatch({
        type: ERROR,
        error: "Success",
        message: resData.message,
      });
    }
  };
};
