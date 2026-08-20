export interface OrderLocation {
  id: number;
  name: string;
}

export interface OrderAddress {
  id: number;
  building_name: string;
  description: string;
  phone: string;
  city: OrderLocation;
  district: OrderLocation;
}

export interface CreateAddressPayload {
  country_id: number;
  city_id: number;
  district_id: number;
  building_name: string;
  floor_number?: string;
  is_default: boolean;
  phone_code?: string;
  phone: string;
  description: string;
}

export interface ReturnRequestItem {
  order_item_id: number;
  image: string;
}

import { ImageType } from "./product";

export interface ReturnRequestPayload {
  order_id: number;
  type: string;
  reason: string;
  items: ReturnRequestItem[];
}

export interface ReturnItem {
  id: number;
  order_item_id: number;
  product: {
    id: number;
    name: string;
    image: ImageType;
  };
  variation: {
    id: number;
    image: ImageType | null;
  };
  quantity: number;
  subtotal?: number;
  image?: ImageType;
}

export interface ReturnRequest {
  id: number;
  order_id: number;
  order: {
    id?: number;
    order_number: string;
    payment_method?: { value: number; label: string; };
    address?: any;
  };
  address?: any;
  type: {
    value: string;
    label: string;
  };
  status: {
    value: string;
    label: string;
  };
  reason: string | { id?: number; name?: string; other_reason?: string; type?: string; type_label?: string; };
  admin_notes?: string | null;
  summary?: {
    quantity: number;
    subtotal: number;
    discount: number;
    shipping_price: number;
    refunded_amount: number;
  };
  items: ReturnItem[];
  created_at: string;
  updated_at?: string;
}

export interface Country {
  id: number;
  name: string;
  phone_code: string;
  phone_length: number;
  shipping_cost: number;
  image: ImageType;
}

export interface City {
  id: number;
  name: string;
  is_active: boolean;
}

export interface District {
  id: number;
  name: string;
}

export interface OrderBranch {
  id: number;
  name: string;
  country: OrderLocation;
  city: OrderLocation;
  district: OrderLocation;
}

export interface OrderProductImage {
  id: number;
  url: string;
}

export interface OrderProduct {
  id: number;
  name: string;
  image: OrderProductImage | null;
  is_reviewed: boolean;
}

export interface OrderVariation {
  id: number;
  sku: string;
  image: OrderProductImage | null;
}

export interface OrderItem {
  id: number;
  product_id: number;
  product_variation_id: number;
  product: OrderProduct;
  variation: OrderVariation | null;
  amount: number;
  main_price: number;
  discount_amount_for_single_item: number;
  price_after_discount: number;
  subtotal: number;
}

export interface Coupon {
  id?: number;
  code?: string;
  discount_amount?: number;
  [key: string]: unknown;
}

export interface Order {
  id: number;
  order_number: string;
  status: number;
  status_label: string;
  cancellation_reason: string | null;
  cancellation_reason_label: string | null;
  delivery_type: number;
  delivery_type_label: string;
  payment_method: number;
  payment_method_label: string;
  paid: boolean;
  is_reviewed: boolean;
  notes: string | null;
  coupon: Coupon | null;
  main_price: number;
  discount_amount: number;
  coupon_discount: number;
  loyalty_points_used: number;
  loyalty_points_discount: number;
  loyalty_points_earned: number;
  tax_amount: number;
  shipping_cost: number;
  cod_fees: number;
  wallet_amount: number;
  total: number;
  amount_to_pay: number;
  address: OrderAddress | null;
  branch: OrderBranch | null;
  items_count?: number;
  items: OrderItem[];
  created_at: string;
}

export interface OrderData {
  orders: Order[];
}

export interface OrderResponse {
  status: string;
  message: string;
  data: OrderData;
}
