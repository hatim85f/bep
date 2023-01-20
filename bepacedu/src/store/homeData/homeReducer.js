import {
  ADD_HOME_ITEM,
  DELETE_ITEM,
  EDIT_ITEM,
  GET_ITEMS,
} from "./homeActions";

const initialState = {
  items: [],
};

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.items,
      };
    case ADD_HOME_ITEM:
      return {
        ...state,
        items: [...state.items, action.item],
      };
    case EDIT_ITEM:
      const currentItems = state.items;
      const itemInex = currentItems.findIndex((x) => x._id === action.itemId);
      currentItems[itemInex] = action.item;
      return {
        ...state,
        items: currentItems,
      };
    case DELETE_ITEM:
      const allItems = state.items.filter((a) => a._id !== action.itemId);
      return {
        ...state,
        items: allItems,
      };

    default:
      return state;
  }
};
