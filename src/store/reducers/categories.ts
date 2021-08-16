import { AnyAction } from "redux";
import { CategoriesState, Category } from "../../types/types";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  highlightedCategory: "",
  categories: [],
};

const CategoriesReducer = (
  state: CategoriesState = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case actionTypes.SET_HIGHLIGHTED_CATEGORY:
      return setHighlightCategory(state, action);
    case actionTypes.REMOVE_HIGHLIGHTED_CATEGORY:
      return removeHighlightCategory(state);
    case actionTypes.SET_CATEGORIES:
      return setCategories(state, action);
    case actionTypes.DELETE_CATEGORY:
      return deleteCategory(state, action);
    default:
      return state;
  }
};

const setHighlightCategory = (state: CategoriesState, action: AnyAction) => {
  return {
    ...state,
    highlightedCategory: action.categoryName,
  };
};

const removeHighlightCategory = (state: CategoriesState) => {
  return {
    ...state,
    highlightedCategory: "",
  };
};

const setCategories = (state: CategoriesState, action: AnyAction) => {
  return {
    ...state,
    categories: action.categories,
  };
};

const deleteCategory = (state: CategoriesState, action: AnyAction) => {
  return {
    ...state,
    categories: state.categories.filter(
      (category: Category) => category.name !== action.category
    ),
  };
};

export default CategoriesReducer;
