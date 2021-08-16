import { Location } from "../../types/types";
import { SET_LOCATIONS } from "./actionTypes";

export const setLocations = (locations: Location[]) => {
  return {
    type: SET_LOCATIONS,
    locations,
  };
};
