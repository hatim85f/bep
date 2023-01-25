import { GET_NOTIFICATIONS } from "./notificationsActions";

const inititalState = {
  notifications: [],
};

export const notificationsReducer = (state = inititalState, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.notifications,
      };
    default:
      return state;
  }
};
