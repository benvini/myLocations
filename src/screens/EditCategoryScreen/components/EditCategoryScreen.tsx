import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { IconButton, TextField } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";

import { Screen, Typography, MainButton } from "../../../shared/components";
import { EditCategoryParams } from "../../../types/types";
import COLOR from "../../../styles/Color";
import { MainScreen } from "../../../shared/components/MainScreen";
import { removeHighlightCategory } from "../../../store/actions/categories";
import CustomToolbar from "../../../shared/components/CustomToolbar";
import CustomSnackbar from "../../../shared/components/CustomSnackbar";
import {
  changeCategoryNameInLocationsInStorage,
  changeCategoryNameInStorage,
} from "../../../shared/utils/utils";

const FormContainer = styled.div`
  margin-top: 12px;
`;

const SaveButton = styled(MainButton)`
  margin-left: auto;
  background-color: ${(props) =>
    props.disabled ? COLOR.DISABLED : COLOR.SUCCESS};
`;

const ResetButton = styled(MainButton)`
  margin-left: 8px;
  background-color: ${COLOR.ERROR};
`;

const BoldTypography = styled(Typography)`
  font-weight: bold;
`;

const SuccessTypography = styled(Typography)`
  color: ${COLOR.SUCCESS};
`;

const EditCategoryScreen = () => {
  const [categoryName, setCategoryName] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const dispatch = useDispatch();
  const { category_name } = useParams<EditCategoryParams>();
  const { t } = useTranslation("editCategoryScreen");
  const history = useHistory();

  useEffect(() => {
    setCategoryName(category_name);
  }, [category_name]);

  const onBack = useCallback(() => {
    history.goBack();
    dispatch(removeHighlightCategory());
  }, [history, dispatch]);

  const onCategoryNameChange = useCallback((event) => {
    const text = event.target.value.trim();
    setCategoryName(text);
  }, []);

  const onSaveCategory = useCallback(() => {
    changeCategoryNameInStorage(category_name, categoryName);
    changeCategoryNameInLocationsInStorage(category_name, categoryName);
    setShowSnackbar(true);
    history.replace(`/category/edit/${categoryName}`);
  }, [categoryName, category_name, history]);

  const isFormValid = useCallback(() => {
    let isValid = true;

    if (isEmpty(categoryName.trim())) {
      isValid = false;
    }
    return isValid;
  }, [categoryName]);

  const closeSnackbar = useCallback(() => {
    setShowSnackbar(false);
  }, []);

  const onReset = useCallback(() => {
    setCategoryName("");
  }, []);

  return (
    <Screen>
      <CustomToolbar>
        <IconButton edge="start" color="inherit" onClick={onBack}>
          <ArrowBack />
        </IconButton>
        <BoldTypography>{t("editCategory")}</BoldTypography>
        <SaveButton
          title={t("save")}
          onClick={onSaveCategory}
          disabled={!isFormValid()}
        />
        <ResetButton title={t("reset")} onClick={onReset} />
      </CustomToolbar>
      <MainScreen>
        <FormContainer>
          <TextField
            id="category"
            label={t("category")}
            variant="outlined"
            value={categoryName}
            onChange={onCategoryNameChange}
          />
        </FormContainer>
        {showSnackbar && (
          <CustomSnackbar show={showSnackbar} closeHandler={closeSnackbar}>
            <SuccessTypography>{t("categoryChanged")}</SuccessTypography>
          </CustomSnackbar>
        )}
      </MainScreen>
    </Screen>
  );
};

export default EditCategoryScreen;
