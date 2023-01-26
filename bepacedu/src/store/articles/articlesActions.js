import { ERROR } from "../auth/authActions";
import { mainLink } from "../link";

export const ADD_ARTICLE = "ADD_ARTICLE";
export const GET_ARTICLES = "GET_ARTICLES";

export const getArticles = () => {
  return async (dispatch) => {
    const response = await fetch(`${mainLink}/api/article`);

    const resData = await response.json();

    if (!response.ok) {
      dispatch({
        type: ERROR,
        error: resData.error,
        message: resData.message,
      });
    } else if (response.ok) {
      dispatch({
        type: ERROR,
        error: "Success",
        message: resData.message,
      });
    }

    dispatch({
      type: GET_ARTICLES,
      articles: resData.articles,
    });
  };
};

export const addArticle = (article) => {
  return async (dispatch, getState) => {
    const { _id, token } = getState().auth;

    const response = await fetch(`${mainLink}/api/article`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ article, userId: _id }),
    });

    const resData = await response.json();

    if (!response.ok) {
      dispatch({
        type: ERROR,
        error: resData.error,
        message: resData.message,
      });
    } else if (response.ok) {
      dispatch({
        type: ERROR,
        error: "Success",
        message: resData.message,
      });
    }

    dispatch({
      type: ADD_ARTICLE,
      article: article,
    });
  };
};
