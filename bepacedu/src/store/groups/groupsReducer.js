import { CREATE_GROUP, GET_GROUPS } from "./groupsActions";

const initialState = {
  groups: [],
};

export const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUPS:
      return {
        ...state,
        groups: action.groups,
      };
    case CREATE_GROUP:
      return {
        ...state,
        groups: [...state.groups, action.group],
      };
    default:
      return state;
  }
};
