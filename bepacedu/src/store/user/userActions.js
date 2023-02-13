import { ERROR } from "../auth/authActions";
import { mainLink } from "../link";

export const GET_USER_DATA = "GET_USER_DATA";
export const EDIT_USER_DATA = "EDIT_USER_DATA";

export const getUserData = () => {
  return async (dispatch, getState) => {
    const { token, _id } = getState().auth;

    const response = await fetch(`${mainLink}/api/profile?userId=${_id}`, {
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

    const user = resData.userDetails;

    dispatch({
      type: GET_USER_DATA,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      phone: user.phone,
      whatsApp: user.whatsApp,
      gender: user.gender,
      country: user.country,
      nationality: user.nationality,
      courses: user.courses,
      certificates: user.certificates,
      wishList: user.wishList,
      payments: user.payments,
      history: user.history,
      activeCourses: user.activeCourses,
      scheduledPayments: user.scheduledPayments,
      linkedin: user.linkedin,
      currentCompany: user.currentCompany,
      position: user.position,
      DOB: user.DOB,
      aspiration: user.aspiration,
    });
  };
};

export const editUserData = (
  firstName,
  lastName,
  image,
  phone,
  whatsApp,
  gender,
  country,
  nationality,
  wishList,
  linkedin,
  currentCompany,
  position,
  DOB,
  aspiration
) => {
  return async (dispatch, getState) => {
    const { token, _id } = getState().auth;

    const response = await fetch(`${mainLink}/api/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: {
        userId: _id,
        firstName,
        lastName,
        image,
        phone,
        whatsApp,
        gender,
        country,
        nationality,
        wishList,
        linkedin,
        currentCompany,
        position,
        DOB,
        aspiration,
      },
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      message: resData.message,
    });

    dispatch({
      type: EDIT_USER_DATA,
      firstName,
      lastName,
      image,
      phone,
      whatsApp,
      gender,
      country,
      nationality,
      wishList,
    });
  };
};

export const uploadCertificate = (studentId, certificate, courseName) => {
  return async (dispatch, getState) => {
    const { token, _id } = getState().auth;

    const response = await fetch(`${mainLink}/api/profile/certificate`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        studentId,
        certificate,
        courseName,
        adminId: _id,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      message: resData.message,
    });
  };
};
