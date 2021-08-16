import { INITIAL_APP_LANGUAGE } from "../../constants/constants";

export const getAppLanguage = () => {
  const lang = INITIAL_APP_LANGUAGE;
  const value = localStorage.getItem("lang");
  return value || lang;
};

export const setAppLanguage = (lang: string) => {
  localStorage.setItem("lang", lang);
};

export const setItem = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};

export const clearStorage = () => {
  localStorage.clear();
};
