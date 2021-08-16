import { AnyAction } from "redux";
import { LocationsState } from "../../types/types";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  locations: [],
};

const LocationsReducer = (
  state: LocationsState = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case actionTypes.SET_LOCATIONS:
      return setLocations(state, action);
    default:
      return state;
  }
};

const setLocations = (state: LocationsState, action: AnyAction) => {
  return {
    ...state,
    locations: action.locations,
  };
};

export default LocationsReducer;
