import { Category, Location } from "../../types/types";
import {
  SET_HIGHLIGHTED_CATEGORY,
  REMOVE_HIGHLIGHTED_CATEGORY,
  SET_CATEGORIES,
  DELETE_CATEGORY,
  SET_LOCATIONS,
} from "./actionTypes";

export const setHighlightCategory = (categoryName: string) => {
  return {
    type: SET_HIGHLIGHTED_CATEGORY,
    categoryName,
  };
};

export const removeHighlightCategory = () => {
  return {
    type: REMOVE_HIGHLIGHTED_CATEGORY,
  };
};

export const setCategories = (categories: Category[]) => {
  return {
    type: SET_CATEGORIES,
    categories,
  };
};

export const deleteCategory = (category: string) => {
  return {
    type: DELETE_CATEGORY,
    category,
  };
};

export const setLocations = (locations: Location[]) => {
  return {
    type: SET_LOCATIONS,
    locations,
  };
};
