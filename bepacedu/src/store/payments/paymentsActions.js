import { ERROR } from "../auth/authActions";
import { mainLink } from "../link";

export const GET_PAYMENTS = "GET_PAYMENTS";
export const UPDATE_PAYMENT = "UPDATE_PAYMENT";
export const PAYMENT_HISTORY = "PAYMENT_HISTORY";

export const getPayments = () => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/payments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    const resData = await response.json();

    if (!response.ok) {
      dispatch({
        type: ERROR,
        error: resData.error,
        message: resData.message,
      });
    }

    dispatch({
      type: GET_PAYMENTS,
      payments: resData.payments,
    });
  };
};

export const updatePayment = (
  paymentDetails,
  paymentIndex,
  receipt,
  participantIndex,
  paymentListIndex,
  adminId
) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/payments`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        paymentDetails,
        paymentIndex,
        receipt,
        participantIndex,
        adminId,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      message: resData.message,
      error: resData.error,
    });

    dispatch({
      type: UPDATE_PAYMENT,
      paymentDetails,
      paymentIndex,
      receipt,
      participantIndex,
      paymentListIndex,
    });
  };
};

export const getHistory = () => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/payments/history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: PAYMENT_HISTORY,
      paymentHistory: resData.paymentHistory,
    });
  };
};
