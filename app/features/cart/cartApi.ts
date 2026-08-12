import { apiClient } from "@/lib/api/client";
import { ApiResponse } from "@/app/types/api";

export const getCart = () => apiClient<ApiResponse<any>>("/api/cart/getCart");

export const addToCart = (data: {
  productId: string;
  variantId: string;
  amount: number;
}) => apiClient<ApiResponse<any>>("/api/cart/add", { method: "POST", body: JSON.stringify(data) });

export const removeFromCart = (data: {
  productId: string;
  variantId: string;
}) => apiClient<ApiResponse<any>>("/api/cart/remove", { method: "POST", body: JSON.stringify(data) });

export const descreaseAmount = (data: {
  productId: string;
  variantId: string;
  amount: number;
}) => apiClient<ApiResponse<any>>("/api/cart/decrease", { method: "POST", body: JSON.stringify(data) });

export const increaseAmount = (data: {
  productId: string;
  variantId: string;
  amount: number;
}) => apiClient<ApiResponse<any>>("/api/cart/increase", { method: "POST", body: JSON.stringify(data) });
