import { GET_COUNTRIES } from "./helpersActions";

const initialState = {
  countries: [],
};

export const helpersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.countries,
      };
    default:
      return state;
  }
};
