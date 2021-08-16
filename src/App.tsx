import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Route } from "react-router-dom";
import { Provider } from "react-redux";

import en from "./shared/locales/en.json";
import he from "./shared/locales/he.json";
import CategoriesScreen from "./screens/CategoriesScreen/components/CategoriesScreen";
import AddCategoryScreen from "./screens/AddCategoryScreen/components/AddCategoryScreen";
import { getAppLanguage } from "./shared/utils/localstorage";
import store from "./store/store";
import EditCategoryScreen from "./screens/EditCategoryScreen/components/EditCategoryScreen";
import ViewCategoryScreen from "./screens/ViewCategoryScreen/components/ViewCategoryScreen";
import AddLocationScreen from "./screens/AddLocationScreen/components/AddLocationScreen";

i18n.use(initReactI18next).init({
  resources: {
    en,
    he,
  },
  lng: getAppLanguage(),
  interpolation: {
    escapeValue: false,
  },
});

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Route path="/" exact>
          <CategoriesScreen />
        </Route>
        <Route path="/category/add" exact>
          <AddCategoryScreen />
        </Route>
        <Route path="/category/edit/:category_name">
          <EditCategoryScreen />
        </Route>
        <Route path="/category/view/:category_name">
          <ViewCategoryScreen />
        </Route>
        <Route path="/location/add/:category_name">
          <AddLocationScreen />
        </Route>
      </Provider>
    </>
  );
};

export default App;
