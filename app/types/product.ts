import { PaginationLinks, PaginationMeta } from "./api";

export interface Brand {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface ImageType {
  id: number;
  url: string;
}

export interface Attribute {
  id: number;
  name: string;
}

export interface AttributeValue {
  id: number;
  value: string;
  code: string | null;
  attribute: Attribute;
}

export interface ProductVariation {
  id: number;
  sku: string;
  price: number;
  stock: number;
  image: ImageType | null;
  gallery: ImageType[];
  attribute_values: AttributeValue[];
}

export interface LocalizedContent {
  name?: string;
  description?: string;
}

export interface Specification {
  key?: string;
  value?: string;
}

export interface RelatedProduct {
  id?: number;
  name?: string;
  price?: number;
  discount_percentage?: number;
  price_after_discount?: number;
  average_rate?: number;
  reviews_count?: number;
  image?: ImageType | string;
  is_wishlist?: boolean;
  lowest_price_variation?: ProductVariation;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  discount_type: string | null;
  discount_value_type: string | null;
  discount_percentage: number;
  discount_amount: number;
  price_after_discount: number;
  min_cart_amount: number;
  discount_applies: boolean;
  total_stock: number;
  average_rate: number;
  reviews_count: number;
  image: ImageType | null;
  is_wishlist: boolean;
  lowest_price_variation: ProductVariation;
  brand: Brand | null;
  category: Category | null;
  
  // These fields might only be present in the single product details response
  related_products?: RelatedProduct[];
  ar?: LocalizedContent;
  en?: LocalizedContent;
  specifications?: Specification[];
  variations?: ProductVariation[];
  reviews?: unknown[];
}


export interface ProductsResponseData {
  products: Product[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export interface ProductsResponse {
  status: string;
  message: string;
  data: ProductsResponseData;
}
