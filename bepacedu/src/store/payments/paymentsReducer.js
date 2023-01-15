import { GET_PAYMENTS, UPDATE_PAYMENT } from "./paymentsActions";

const initialState = {
  payments: [],
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
    default:
      return state;
  }
};
