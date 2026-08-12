import { ImageType, AttributeValue } from "./product";

export interface ProductImage {
  id: number;
  url: string;
}

export interface Brand {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Variation {
  id: number;
  is_default: boolean;
  price: number;
  price_after_discount: number;
  image: ProductImage;
  gallery: ImageType[];
  attribute_values: AttributeValue[];
}

export interface Product {
  id: number;
  name: string;
  image: ProductImage;
  average_rate: number;
  reviews_count: number;
  brand: Brand;
  category: Category;
  discount_type: string | null;
  discount_percentage: number;
  min_cart_amount: number;
  variation: Variation;
}

export interface CartItemType {
  id: number;
  product: Product;
  amount: number;
  available_stock: number;
  is_in_stock: boolean;
  is_available: boolean;
  main_price: number;
  discount_amount_for_single_item: number;
  price_after_discount: number;
  subtotal: number;
  is_wishlist: boolean;
  created_at: string;
}

export interface CartData {
  id: number;
  main_price: number;
  discount_amount: number;
  subtotal: number;
  tax_amount: number;
  total_price_after_discount_and_tax: number;
  items_count: number;
  total_quantity: number;
  items: CartItemType[];
  recommended_products: Product[];
  exclusive_offers: Product[];
  created_at: string;
}
