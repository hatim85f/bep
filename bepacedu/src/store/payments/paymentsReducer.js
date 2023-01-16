import {
  GET_PAYMENTS,
  PAYMENT_HISTORY,
  UPDATE_PAYMENT,
} from "./paymentsActions";

const initialState = {
  payments: [],
  paymentHistory: [],
};

export const paymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAYMENTS:
      return {
        ...state,
        payments: action.payments,
      };
    case UPDATE_PAYMENT:
      let newPayment = state.payments;
      newPayment[action.paymentListIndex].status = "Paid";
      newPayment[action.paymentListIndex].receipt = action.receipt;
      return {
        ...state,
        payments: newPayment,
      };
    case PAYMENT_HISTORY:
      return {
        ...state,
        paymentHistory: action.paymentHistory,
      };
    default:
      return state;
  }
};
