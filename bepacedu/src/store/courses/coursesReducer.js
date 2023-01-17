import {
  ADD_COURSES,
  DELETE_COURSE,
  GET_CATEGORIES,
  GET_COURSES,
  UPDATE_COURSE,
} from "./coursesActions";

const initialState = {
  courses: [],
  categories: [],
};

export const coursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        courses: action.courses,
      };
    case ADD_COURSES:
      return {
        ...state,
        courses: [...state.courses, action.courses],
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    case UPDATE_COURSE:
      const allCourses = state.courses;
      const courseIndex = allCourses.findIndex(
        (x) => x._id === action.courseId
      );
      allCourses[courseIndex] = action.course;
      return {
        ...state,
        courses: allCourses,
      };
    case DELETE_COURSE:
      const newCourses = state.courses.filter((a) => a._id !== action.courseId);
      return {
        ...state,
        courses: newCourses,
      };
    default:
      return state;
  }
};
