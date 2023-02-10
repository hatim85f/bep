import { GET_COMMENTS, GET_FORMS } from "./formsActions";

const initialState = {
  forms: [],
  comments: [],
};

export const formsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FORMS:
      return {
        ...state,
        forms: action.forms,
      };
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.comments,
      };
    default:
      return state;
  }
};
