import { ERROR } from "../auth/authActions";
import { mainLink } from "../link";

export const ADD_COURSES = "ADD_COURSES";
export const GET_COURSES = "GET_COURSES";
export const GET_CATEGORIES = "GET_CATEGORIES";

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
      courses: resData.course,
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

    console.log(course);

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
