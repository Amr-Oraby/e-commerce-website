export interface CategoryImage {
  id: number;
  url: string;
}

export interface Category {
  id: number;
  name: string;
  image?: CategoryImage;
  children?: Category[];
}

export interface CategoriesResponse {
  status: string;
  message: string;
  data: {
    categories: Category[];
  };
}
