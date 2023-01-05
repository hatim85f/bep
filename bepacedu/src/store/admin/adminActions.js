import { ERROR } from "../auth/authActions";
import { mainLink } from "../link";

export const GET_ADMIN = "GET_ADMIN";

export const getAdmins = () => {
  return async (dispatch, getState) => {
    const { token, _id } = getState().auth;

    const response = await fetch(`${mainLink}/api/admin?userId=${_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    const resData = await response.json();

    dispatch({
      type: GET_ADMIN,
      admins: resData.admins,
    });
  };
};

export const addAdmin = (
  firstName,
  lastName,
  password,
  userEmail,
  adminType
) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/admin_create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        password: password,
        userEmail: userEmail,
        adminType: adminType,
      }),
    });

    const resData = await response.json();

    if (!response.ok) {
      dispatch({
        type: ERROR,
        error: resData.error,
        message: resData.message,
      });
    } else {
      dispatch({
        type: ERROR,
        error: "Success",
        message: resData.message,
      });
    }
  };
};
