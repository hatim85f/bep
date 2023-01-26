import { GET_NOTIFICATIONS, OPEN_NOTIFICATION } from "./notificationsActions";

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
    case OPEN_NOTIFICATION:
      const newAll = state.notifications;
      const notificationIndex = newAll.findIndex(
        (a) => a._id === action.notificationId
      );
      newAll[notificationIndex].isOpened = true;
      return {
        ...state,
        notifications: newAll,
      };
    default:
      return state;
  }
};
