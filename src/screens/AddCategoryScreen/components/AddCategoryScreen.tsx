import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { IconButton, TextField } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Screen, Typography, MainButton } from "../../../shared/components";
import COLOR from "../../../styles/Color";
import { MainScreen } from "../../../shared/components/MainScreen";
import CustomToolbar from "../../../shared/components/CustomToolbar";
import CustomSnackbar from "../../../shared/components/CustomSnackbar";
import {
  addCategoryToStorage,
  idGenerator,
  isCategoryExists,
} from "../../../shared/utils/utils";

const AddCategoryButton = styled(MainButton)`
  margin-left: auto;
  color: white;
  background-color: ${(props) =>
    props.disabled ? COLOR.DISABLED : COLOR.SUCCESS};
`;

const FormContainer = styled.form`
  margin-top: 8px;
`;

const ResetButton = styled(MainButton)`
  margin-left: 8px;
  color: white;
  background-color: ${COLOR.ERROR};
`;

const BoldTypography = styled(Typography)`
  font-weight: bold;
`;

const SuccessTypography = styled(Typography)`
  color: ${COLOR.SUCCESS};
`;

const ErrorTypography = styled(Typography)`
  color: ${COLOR.ERROR};
`;

const CategoriesScreen = () => {
  const { t } = useTranslation("addCategoryScreen");
  const [categoryName, setCategoryName] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const history = useHistory();

  const onBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const onReset = useCallback(() => {
    setCategoryName("");
  }, []);

  const onCategoryNameChange = useCallback((event) => {
    const text = event.target.value.trim();
    setCategoryName(text);
  }, []);

  const onAddCategory = useCallback(() => {
    if (isCategoryExists(categoryName)) {
      setErrorMessage(true);
      setShowSnackbar(true);
    } else {
      const categoryToAdd = {
        name: categoryName,
        id: idGenerator(),
      };
      addCategoryToStorage(categoryToAdd);
      setShowSnackbar(true);
    }
  }, [categoryName]);

  const closeSnackbar = useCallback(() => {
    setShowSnackbar(false);
    setErrorMessage(false);
  }, []);

  const getSnackbarContent = useCallback(() => {
    let content;
    if (errorMessage) {
      content = <ErrorTypography>{t("categoryExists")}</ErrorTypography>;
    } else if (showSnackbar) {
      content = <SuccessTypography>{t("categoryAdded")}</SuccessTypography>;
    }
    return content || undefined;
  }, [errorMessage, showSnackbar, t]);

  return (
    <Screen>
      <CustomToolbar>
        <IconButton edge="start" color="inherit" onClick={onBack}>
          <ArrowBack />
        </IconButton>
        <BoldTypography>{t("addCategory")}</BoldTypography>
        <AddCategoryButton
          title={t("add")}
          onClick={onAddCategory}
          disabled={!categoryName.trim().length}
        />
        <ResetButton title={t("reset")} onClick={onReset} />
      </CustomToolbar>
      <MainScreen>
        <FormContainer>
          <TextField
            id="name"
            label={t("name")}
            variant="outlined"
            value={categoryName}
            onChange={onCategoryNameChange}
          />
        </FormContainer>
        {showSnackbar && (
          <CustomSnackbar show={showSnackbar} closeHandler={closeSnackbar}>
            {getSnackbarContent()}
          </CustomSnackbar>
        )}
      </MainScreen>
    </Screen>
  );
};

export default CategoriesScreen;
