import { combineReducers } from "redux";
import categoriesReducer from "./categories";
import locationsReducer from "./locations";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  locations: locationsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
