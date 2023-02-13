import { EDIT_USER_DATA, GET_USER_DATA } from "./userActions";

const initialState = {
  firstName: "",
  lastName: "",
  image: "",
  phone: "",
  whatsApp: "",
  gender: "",
  country: "",
  nationality: "",
  courses: [],
  certificates: [],
  wishList: [],
  payments: [],
  history: [],
  activeCourses: [],
  scheduledPayments: [],
  linkedin: "",
  currentCompany: "",
  positio: "",
  DOB: "",
  aspiration: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA: {
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName,
        image: action.image,
        phone: action.phone,
        whatsApp: action.whatsApp,
        gender: action.gender,
        country: action.country,
        nationality: action.nationality,
        courses: action.courses,
        certificates: action.certificates,
        wishList: action.wishList,
        payments: action.payments,
        history: action.history,
        activeCourses: action.activeCourses,
        scheduledPayments: action.scheduledPayments,
        linkedin: action.linkedin,
        currentCompany: action.currentCompany,
        position: action.position,
        DOB: action.DOB,
        aspiration: action.aspiration,
      };
    }
    case EDIT_USER_DATA:
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName,
        image: action.image,
        phone: action.phone,
        whatsApp: action.whatsApp,
        gender: action.gender,
        country: action.country,
        nationality: action.nationality,
        wishList: action.wishList,
        linkedin: action.linkedin,
        currentCompany: action.currentCompany,
        position: action.position,
        DOB: action.DOB,
        aspiration: action.aspiration,
      };
    default:
      return state;
  }
};
