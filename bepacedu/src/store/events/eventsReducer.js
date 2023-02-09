import {
  ADD_EVENT,
  DELETE_EVENT,
  GET_EVENT,
  UPDATE_EVENT,
} from "./eventsActions";

const initialState = {
  events: [],
};

export const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENT:
      return {
        ...state,
        events: action.events,
      };
    case ADD_EVENT:
      const newEvents = state.events.push(action.event);
      return {
        ...state,
        events: newEvents,
      };
    case UPDATE_EVENT:
      const allEvents = state.events;
      const eventIndex = allEvents.findIndex((a) => a._id === action.eventId);
      allEvents[eventIndex] = action.event;
      return {
        ...state,
        events: allEvents,
      };
    case DELETE_EVENT:
      const companyEvents = state.events;
      const afterEvents = companyEvents.filter((a) => a._id !== action.eventId);
      return {
        ...state,
        events: afterEvents,
      };
    default:
      return state;
  }
};
