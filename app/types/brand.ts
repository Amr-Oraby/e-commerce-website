export interface Brand {
  id: number;
  title: string;
  image?: {
    id: number;
    url: string;
  };
}

export interface BrandsResponse {
  status: string;
  message: string;
  data: {
    brands: Brand[];
  };
}
