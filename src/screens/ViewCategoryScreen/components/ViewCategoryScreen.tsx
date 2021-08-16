import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { IconButton, List } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Screen, Typography } from "../../../shared/components";
import { MainScreen } from "../../../shared/components/MainScreen";
import {
  CategoriesState,
  Location,
  ViewCategoryParams,
} from "../../../types/types";
import LocationItem from "../../../shared/components/LocationItem";
import CustomToolbar from "../../../shared/components/CustomToolbar";
import {
  removeHighlightCategory,
  setLocations,
} from "../../../store/actions/categories";
import { getLocationsByCategory } from "../../../shared/utils/utils";

const BoldTypography = styled(Typography)`
  font-weight: bold;
`;

const Title = styled(Typography)`
  font-weight: bold;
  font-size: 32px;
`;

const StyledLocation = styled(LocationItem)`
  margin-top: 12px;
`;

const ViewCategoryScreen = () => {
  const { t } = useTranslation("viewCategoryScreen");
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const { category_name } = useParams<ViewCategoryParams>();
  const locations = useSelector((state: CategoriesState) => state.locations);

  useEffect(() => {
    const updatedLocations = getLocationsByCategory(category_name);
    setFilteredLocations(updatedLocations);
    dispatch(setLocations(updatedLocations));
  }, [category_name, dispatch]);

  useEffect(() => {
    const updatedLocations = getLocationsByCategory(category_name);
    setFilteredLocations(updatedLocations);
  }, [locations, category_name]);

  const onBack = useCallback(() => {
    dispatch(removeHighlightCategory());
    history.goBack();
  }, [history, dispatch]);

  return (
    <Screen>
      <CustomToolbar>
        <IconButton edge="start" color="inherit" onClick={onBack}>
          <ArrowBack />
        </IconButton>
        <BoldTypography>{t("viewCategory")}</BoldTypography>
      </CustomToolbar>
      {filteredLocations && filteredLocations.length ? (
        <MainScreen>
          <Title>{t("locationsInCategory", { category: category_name })}</Title>
          <List>
            {filteredLocations.map((location, index) => (
              <StyledLocation
                key={`${location.name} ${index}`}
                location={location}
              />
            ))}
          </List>
        </MainScreen>
      ) : (
        <Typography>{t("noDataAvailable")}</Typography>
      )}
    </Screen>
  );
};

export default ViewCategoryScreen;
