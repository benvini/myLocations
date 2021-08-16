import React, { useCallback } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { IconButton, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

import COLOR from "../../styles/Color";
import { Location } from "../../types/types";
import { getItem } from "../utils/localstorage";
import { deleteLocationInStorage } from "../utils/utils";
import { setLocations } from "../../store/actions/locations";

type Props = {
  location: Location;
  className?: any;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  background-color: ${COLOR.PRIMARY};
  border: 1px solid black;
  width: 360px;
`;

const LocationTypography = styled(Typography)`
  color: white;
`;

const LocationItem = ({ location, className }: Props) => {
  const {
    name,
    address,
    category,
    coordinates: { lat, lng },
  } = location;
  const { t } = useTranslation("locationItem");
  const dispatch = useDispatch();

  const onDeleteLocation = useCallback(
    (locationId: string) => {
      deleteLocationInStorage(locationId);
      const updatedLocations = getItem("locations");
      dispatch(setLocations(updatedLocations));
    },
    [dispatch]
  );

  return (
    <Container className={className ? className : undefined}>
      <LocationTypography>{`${t("name")}: ${name}`}</LocationTypography>
      <LocationTypography>{`${t("address")}: ${address}`}</LocationTypography>
      <LocationTypography>{`${t("coordinates")}: ${t("lat")} ${lat}, ${t(
        "lng"
      )} ${lng}`}</LocationTypography>
      <LocationTypography>{`${t("category")}: ${category}`}</LocationTypography>
      <IconButton
        edge="start"
        color="inherit"
        onClick={() => onDeleteLocation(location.id)}
      >
        <Delete />
      </IconButton>
    </Container>
  );
};

export default LocationItem;
