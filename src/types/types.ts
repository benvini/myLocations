export type Category = {
  id: string;
  name: string;
};

type Point = {
  lat: string;
  lng: string;
};

export type Location = {
  id: string;
  name: string;
  address: string;
  coordinates: Point;
  category: string;
};

export type CategoriesState = {
  highlightedCategory: string;
  categories: Category[];
};

export type LocationsState = {
  locations: Location[];
};

export type EditCategoryParams = {
  category_name: string;
};

export type ViewCategoryParams = {
  category_name: string;
};

export type AddLocationParams = {
  category_name: string;
};
