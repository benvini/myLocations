import { createStore } from "redux";
import CategoriesReducer from "./reducers/categories";

const store = createStore(CategoriesReducer);

export default store;
