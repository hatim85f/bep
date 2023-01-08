import { ADD_COURSES, GET_CATEGORIES, GET_COURSES } from "./coursesActions";

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
    default:
      return state;
  }
};
