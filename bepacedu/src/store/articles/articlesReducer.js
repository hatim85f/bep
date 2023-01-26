import { ADD_ARTICLE, GET_ARTICLES } from "./articlesActions";

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
    default:
      return state;
  }
};
