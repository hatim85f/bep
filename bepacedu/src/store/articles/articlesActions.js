import { ERROR } from "../auth/authActions";
import { mainLink } from "../link";

export const ADD_ARTICLE = "ADD_ARTICLE";
export const GET_ARTICLES = "GET_ARTICLES";
export const ADD_LIKE = "ADD_LIKE";
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_ARTICLE = "DELETE_ARTICLE";

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

export const addLike = (userId, articleId) => {
  return async (dispatch, getState) => {
    await fetch(`${mainLink}/api/article/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, articleId }),
    });

    dispatch({
      type: ADD_LIKE,
      articleId: articleId,
      userId: userId,
    });
  };
};

export const addComment = (userId, comment, articleId) => {
  return async (dispatch, getState) => {
    const { token, _id, firstName, lastName } = getState().auth;

    const response = await fetch(`${mainLink}/api/article/comments`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ userId, comment, articleId }),
    });

    const resData = await response.json();

    console.log(token, resData, userId);

    if (!response.ok) {
      dispatch({
        type: ERROR,
        error: resData.error,
        message: resData.message,
      });
    } else if (response.ok) {
      dispatch({
        type: ERROR,
        error: "Done",
        message: resData.message,
      });
    }

    dispatch({
      type: ADD_COMMENT,
      articleId: articleId,
      userId: _id,
      userName: `${firstName} ${lastName}`,
      comment: comment,
    });
  };
};

export const updateLike = (articleId, commentIndex) => {
  return async (dispatch, getState) => {
    const { _id } = getState().auth;

    await fetch(`${mainLink}/api/article/person_like`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ articleId, userId: _id, commentIndex }),
    });
  };
};

export const deleteArticle = (articleId) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(`${mainLink}/api/article`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ articleId }),
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
        error: "DONE",
        message: resData.message,
      });
    }

    dispatch({
      type: DELETE_ARTICLE,
      articleId,
    });
  };
};
