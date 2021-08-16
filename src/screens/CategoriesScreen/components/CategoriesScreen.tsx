import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { List } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getItem } from "../../../shared/utils/localstorage";
import { styles } from "../styles/styles";
import { Screen, Typography, MainButton } from "../../../shared/components";
import CategoryItem from "../../../shared/components/CategoryItem";
import { CategoriesState } from "../../../types/types";
import COLOR from "../../../styles/Color";
import { MainScreen } from "../../../shared/components/MainScreen";
import CustomToolbar from "../../../shared/components/CustomToolbar";
import {
  deleteCategory,
  removeHighlightCategory,
  setCategories,
} from "../../../store/actions/categories";
import CustomSnackbar from "../../../shared/components/CustomSnackbar";
import {
  removeCategoryInStorage,
  removeCategoryLocationsInStorage,
} from "../../../shared/utils/utils";

const AddCategoryButton = styled(MainButton)`
  margin-left: auto;
  background-color: ${COLOR.SUCCESS};
`;

const SuccessTypography = styled(Typography)`
  color: ${COLOR.SUCCESS};
`;

const EditCategoryButton = styled(MainButton)`
  margin-left: auto;
  background-color: ${COLOR.PRIMARY};
`;

const ViewCategoryButton = styled(MainButton)`
  margin-left: 8px;
  background-color: ${COLOR.PRIMARY};
`;

const DeleteCategoryButton = styled(MainButton)`
  margin-left: 8px;
  background-color: ${COLOR.ERROR};
`;

const AddLocationButton = styled(MainButton)`
  margin-left: 8px;
  background-color: ${COLOR.SUCCESS};
`;

const StyledCategory = styled(CategoryItem)`
  margin-bottom: 12px;
`;

const BoldTypography = styled(Typography)`
  font-weight: bold;
`;

const CategoriesScreen = () => {
  const { t } = useTranslation("categoriesScreen");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const categories = useSelector((state: CategoriesState) => state.categories);
  const highlightedCategory = useSelector(
    (state: CategoriesState) => state.highlightedCategory
  );

  useEffect(() => {
    const fetchedCategories = getItem("categories");
    if (fetchedCategories) {
      dispatch(setCategories(fetchedCategories));
    }
  }, [dispatch]);

  const onEditCategory = useCallback(() => {
    history.push(`/category/edit/${highlightedCategory}`);
  }, [history, highlightedCategory]);

  const onViewCategory = useCallback(() => {
    history.push(`/category/view/${highlightedCategory}`);
  }, [history, highlightedCategory]);

  const onAddCategory = useCallback(() => {
    history.push("/category/add");
  }, [history]);

  const onAddLocation = useCallback(() => {
    history.push(`/location/add/${highlightedCategory}`);
  }, [history, highlightedCategory]);

  const onDeleteCategory = useCallback(() => {
    removeCategoryInStorage(highlightedCategory);
    removeCategoryLocationsInStorage(highlightedCategory);
    dispatch(deleteCategory(highlightedCategory));
    dispatch(removeHighlightCategory());
    setShowSnackbar(true);
  }, [dispatch, highlightedCategory]);

  const closeSnackbar = useCallback(() => {
    setShowSnackbar(false);
  }, []);

  return (
    <Screen>
      <CustomToolbar>
        <BoldTypography>{t("categories")}</BoldTypography>
        {highlightedCategory && highlightedCategory.length ? (
          <>
            <EditCategoryButton
              title={t("editCategory")}
              onClick={() => onEditCategory()}
            />
            <ViewCategoryButton
              title={t("viewCategory")}
              onClick={() => onViewCategory()}
            />
            <DeleteCategoryButton
              title={t("deleteCategory")}
              onClick={() => onDeleteCategory()}
            />
            <AddLocationButton
              title={t("addLocation")}
              onClick={() => onAddLocation()}
            />
          </>
        ) : (
          <AddCategoryButton title={t("addCategory")} onClick={onAddCategory} />
        )}
      </CustomToolbar>
      <MainScreen>
        {categories.length > 0 && (
          <List style={styles.list}>
            {categories.map((category, index) => (
              <StyledCategory
                key={`${category.name} ${index}`}
                name={category.name}
              />
            ))}
          </List>
        )}
        {showSnackbar && (
          <CustomSnackbar show={showSnackbar} closeHandler={closeSnackbar}>
            <SuccessTypography>{t("categoryDeleted")}</SuccessTypography>
          </CustomSnackbar>
        )}
      </MainScreen>
    </Screen>
  );
};

export default CategoriesScreen;
