import {
  ADD_ARTICLE,
  ADD_COMMENT,
  ADD_LIKE,
  DELETE_ARTICLE,
  GET_ARTICLES,
} from "./articlesActions";

const initialState = {
  articles: [],
};

export const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.articles,
      };
    case ADD_ARTICLE:
      const allArticles = state.articles;
      allArticles.push(action.article);
      return {
        ...state,
        articles: allArticles,
      };
    case ADD_LIKE:
      const newArticles = state.articles;
      const articleIndex = newArticles.findIndex(
        (a) => a._id === action.articleId
      );
      const likes = newArticles[articleIndex].likes;
      likes.push({
        userId: action.userId,
      });
      return {
        ...state,
        articles: newArticles,
      };
    case ADD_COMMENT:
      const neededArticles = state.articles;
      const neededIndex = neededArticles.findIndex(
        (a) => a._id === action.articleId
      );
      const comments = neededArticles[neededIndex].comments;
      comments.push({
        userId: action.userId,
        userName: action.userName,
        comment: action.comment,
      });

      return {
        ...state,
        articles: neededArticles,
      };
    case DELETE_ARTICLE:
      const afterArticles = state.articles;
      const needed = afterArticles.filter((a) => a._id !== action.articleId);
      return {
        ...state,
        articles: needed,
      };
    default:
      return state;
  }
};
