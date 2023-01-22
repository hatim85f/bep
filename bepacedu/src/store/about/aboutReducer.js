import { GET_ABOUT } from "./aboutActions";

const initialState = {
  about: [],
};

export const aboutReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ABOUT:
      return {
        ...state,
        about: action.about,
      };
    default:
      return state;
  }
};
