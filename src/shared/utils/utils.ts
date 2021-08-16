import { getItem, setItem } from "./localstorage";

import { RANDOM_CHARS, RANDOM_ID_LENGTH } from "../../constants/constants";
import { Category, Location } from "../../types/types";

export const idGenerator = () => {
  let id = "";
  for (let i = 0; i < RANDOM_ID_LENGTH; i++) {
    id += RANDOM_CHARS.charAt(Math.floor(Math.random() * RANDOM_CHARS.length));
  }

  return id;
};

export const getLocationsByCategory = (categoryName: string) => {
  const fetchedCategories = getItem("categories") || [];
  const fetchedLocations = getItem("locations") || [];
  const categoryId = getCategoryIdByName(fetchedCategories, categoryName);
  const updatedLocations = fetchedLocations.filter((location: Location) => {
    const locationCategoryId = getCategoryIdByName(
      fetchedCategories,
      location.category
    );
    return (
      locationCategoryId && categoryId && locationCategoryId === categoryId
    );
  });
  return updatedLocations;
};

export const getCategoryIdByName = (
  categories: Category[],
  categoryName: string
) => {
  const category = categories.find(
    (category) => category.name === categoryName
  );
  return category?.id;
};

export const isCategoryExists = (categoryName: string) => {
  const categories = getItem("categories") || [];
  let isExists = false;
  isExists = categories.some(
    (category: Category) => category.name === categoryName
  );
  return isExists;
};

export const addCategoryToStorage = (category: Category) => {
  const categories = getItem("categories") || [];
  categories.push(category);
  setItem("categories", categories);
};

export const isLocationNameExists = (
  locationName: string,
  categoryName: string
) => {
  const locations = getItem("locations") || [];
  const isExist = locations.some(
    (location: Location) =>
      location.name === locationName && categoryName === location.category
  );
  return isExist;
};

export const addLocationToStorage = (locationToAdd: Location) => {
  const locations = getItem("locations") || [];
  const { name, category } = locationToAdd;
  if (isLocationNameExists(name, category)) {
    const updatedLocations = locations.map((location: Location) => {
      if (location.name === name && location.category === category) {
        return locationToAdd;
      } else {
        return location;
      }
    });
    setItem("locations", updatedLocations);
  } else {
    locations.push(locationToAdd);
    setItem("locations", locations);
  }
};

export const removeCategoryInStorage = (categoryName: string) => {
  const categories = getItem("categories") || [];
  const updatedCategories = categories.filter(
    (category: Category) => category.name !== categoryName
  );
  setItem("categories", updatedCategories);
};

export const removeCategoryLocationsInStorage = (categoryName: string) => {
  const locations = getItem("locations") || [];
  const updatedLocations = locations.filter(
    (location: Location) => location.category !== categoryName
  );
  setItem("locations", updatedLocations);
};

export const changeCategoryNameInStorage = (
  oldName: string,
  newName: string
) => {
  const categories = getItem("categories") || [];
  const updatedCategories = categories.map((category: Category) => {
    if (category.name === oldName) {
      return {
        ...category,
        name: newName,
      };
    }
    return category;
  });
  setItem("categories", updatedCategories);
};

export const changeCategoryNameInLocationsInStorage = (
  oldName: string,
  newName: string
) => {
  const fetchedLocations = getItem("locations") || [];
  const updatedLocations = fetchedLocations.map((location: Location) => {
    if (location.category === oldName) {
      return {
        ...location,
        category: newName,
      };
    }
    return location;
  });
  setItem("locations", updatedLocations);
};

export const deleteLocationInStorage = (locationId: string) => {
  const fetchedLocations = getItem("locations") || [];
  const updatedLocations = fetchedLocations.filter(
    (location: Location) => location.id !== locationId
  );
  setItem("locations", updatedLocations);
};
