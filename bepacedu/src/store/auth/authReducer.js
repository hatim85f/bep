import { CLEAR_ERROR, ERROR, LOGIN, LOGOUT } from "./authActions";

const initialState = {
  error: null,
  errorMessage: "",
  firstName: "",
  lastName: "",
  token: null,
  adminType: null,
  userEmail: "",
  _id: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.token,
        firstName: action.firstName,
        lastName: action.lastName,
        adminType: action.adminType,
        _id: action._id,
        userEmail: action.userEmail,
      };
    case ERROR:
      return {
        ...state,
        error: action.error,
        errorMessage: action.message,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
        errorMessage: "",
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
