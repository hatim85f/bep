import {
  CREATE_GROUP,
  EDIT_GROUP,
  GET_GROUPS,
  UPDATE_ATTENDANCE,
} from "./groupsActions";

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
    case EDIT_GROUP:
      const groups = state.groups;

      const groupIndex = groups.findIndex((a) => a._id === action.group._id);

      const newGroups = groups;
      newGroups[groupIndex] = action.group;
      return {
        ...state,
        groups: newGroups,
      };
    case UPDATE_ATTENDANCE:
      const neededGroup = state.groups.findIndex(
        (a) => a._id === action.groupId
      );
      const allGroups = state.groups;
      allGroups[neededGroup].groupParticipants = action.attendance;
      return {
        ...state,
        groups: allGroups,
      };
    default:
      return state;
  }
};
