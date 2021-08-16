import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { IconButton, TextField } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";

import { MainButton, Screen, Typography } from "../../../shared/components";
import { styles } from "../styles/styles";
import { MainScreen } from "../../../shared/components/MainScreen";
import { AddLocationParams } from "../../../types/types";
import CustomToolbar from "../../../shared/components/CustomToolbar";
import { removeHighlightCategory } from "../../../store/actions/categories";
import CustomSnackbar from "../../../shared/components/CustomSnackbar";
import COLOR from "../../../styles/Color";
import { addLocationToStorage, idGenerator } from "../../../shared/utils/utils";

const BoldTypography = styled(Typography)`
  font-weight: bold;
`;

const Title = styled(Typography)`
  font-weight: bold;
  font-size: 32px;
  margin-bottom: 8px;
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

const SuccessTypography = styled(Typography)`
  color: ${COLOR.SUCCESS};
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
`;

const AddLocationScreen = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const { t } = useTranslation("addLocationScreen");
  const history = useHistory();
  const dispatch = useDispatch();
  const { category_name } = useParams<AddLocationParams>();

  const onBack = useCallback(() => {
    dispatch(removeHighlightCategory());
    history.goBack();
  }, [history, dispatch]);

  const onLocationNameChange = useCallback((event) => {
    const text = event.target.value.trim();
    setLocationName(text);
  }, []);

  const onLocationAddressChange = useCallback((event) => {
    const text = event.target.value.trim();
    setLocationAddress(text);
  }, []);

  const onLatChange = useCallback((event) => {
    const text = event.target.value.trim();
    setLat(text);
  }, []);

  const onLngChange = useCallback((event) => {
    const text = event.target.value.trim();
    setLng(text);
  }, []);

  const closeSnackbar = useCallback(() => {
    setShowSnackbar(false);
  }, []);

  const isFormValid = useCallback(() => {
    let isValid = true;

    if (
      isEmpty(locationName.trim()) ||
      isEmpty(locationAddress.trim()) ||
      isEmpty(lat.trim()) ||
      isEmpty(lng.trim())
    ) {
      isValid = false;
    }
    return isValid;
  }, [locationName, locationAddress, lat, lng]);

  const onReset = useCallback(() => {
    setLocationName("");
    setLocationAddress("");
    setLat("");
    setLng("");
  }, []);

  const onSaveLocation = useCallback(() => {
    const locationToAdd = {
      name: locationName,
      address: locationAddress,
      coordinates: {
        lat,
        lng,
      },
      category: category_name,
      id: idGenerator(),
    };

    addLocationToStorage(locationToAdd);
    setShowSnackbar(true);
  }, [lat, lng, locationName, locationAddress, category_name]);

  return (
    <Screen>
      <CustomToolbar>
        <IconButton edge="start" color="inherit" onClick={onBack}>
          <ArrowBack />
        </IconButton>
        <BoldTypography>{t("addLocation")}</BoldTypography>
        <SaveButton
          title={t("save")}
          onClick={onSaveLocation}
          disabled={!isFormValid()}
        />
        <ResetButton title={t("reset")} onClick={onReset} />
      </CustomToolbar>
      <MainScreen>
        <Title>{t("addLocationInCategory", { category: category_name })}</Title>
        <FormContainer>
          <TextField
            id="name"
            label={t("name")}
            variant="outlined"
            value={locationName}
            onChange={onLocationNameChange}
            style={styles.mb16}
          />
          <TextField
            id="address"
            label={t("address")}
            variant="outlined"
            value={locationAddress}
            onChange={onLocationAddressChange}
            style={styles.mb16}
          />
          <TextField
            id="lat"
            type="number"
            label={t("latitude")}
            variant="outlined"
            value={lat}
            onChange={onLatChange}
            style={styles.mb16}
          />
          <TextField
            id="lng"
            type="number"
            label={t("longitude")}
            variant="outlined"
            value={lng}
            onChange={onLngChange}
            style={styles.mb16}
          />
          <TextField
            id="category"
            label={t("category")}
            variant="outlined"
            value={category_name}
            disabled
          />
        </FormContainer>
        {showSnackbar && (
          <CustomSnackbar show={showSnackbar} closeHandler={closeSnackbar}>
            <SuccessTypography>{t("locationAdded")}</SuccessTypography>
          </CustomSnackbar>
        )}
      </MainScreen>
    </Screen>
  );
};

export default AddLocationScreen;
