import { GET_ADMIN } from "./adminActions";

const initialState = {
  admins: [],
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMIN:
      return {
        ...state,
        admins: action.admins,
      };
    default:
      return state;
  }
};
