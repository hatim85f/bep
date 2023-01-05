import { GET_ALL_USERS } from "./usersActions";

const inititalState = {
  users: [],
};

export const usersReducer = (state = inititalState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.users,
      };
    default:
      return state;
  }
};
