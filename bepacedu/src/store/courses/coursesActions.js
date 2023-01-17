import { ERROR } from "../auth/authActions";
import { mainLink } from "../link";

export const ADD_COURSES = "ADD_COURSES";
export const GET_COURSES = "GET_COURSES";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const UPDATE_COURSE = "UPDATE_COURSE";
export const DELETE_COURSE = "DELETE_COURSE";

export const getCourses = () => {
  return async (dispatch) => {
    const response = await fetch(`${mainLink}/api/courses`);

    const resData = await response.json();

    if (!response.ok) {
      dispatch({
        type: ERROR,
        error: resData.error,
        message: resData.message,
      });
    }

    dispatch({
      type: GET_COURSES,
      courses: resData.courses,
    });
  };
};

export const addCourses = (course) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/courses`, {
      method: "POST",
      body: JSON.stringify({ courseDetails: course }),
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

    dispatch({
      type: ADD_COURSES,
      course: course,
    });
  };
};

export const getCategories = () => {
  return async (dispatch) => {
    const response = await fetch(`${mainLink}/api/category`);

    const resData = await response.json();

    dispatch({
      type: GET_CATEGORIES,
      categories: resData.categories,
    });
  };
};

export const updateCourse = (course, courseId) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    const response = await fetch(`http://localhost:5000/api/courses`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ course, courseId }),
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
      type: UPDATE_COURSE,
      course: course,
      courseId: courseId,
    });
  };
};

export const deleteCourse = (id) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/courses`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ courseId: id }),
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
      type: DELETE_COURSE,
      courseId: id,
    });
  };
};
