import { apiClient } from "@/lib/api/client";
import { ApiResponse } from "@/app/types/api";
import { OrderResponse } from "@/app/types/order";

export const getProfileData = () => apiClient<ApiResponse<any>>("/api/profile");

export const getLoyalityPoints = () => apiClient<ApiResponse<any>>("/api/loyality-points");

export const getReturns = () => apiClient<ApiResponse<any>>("/api/returns");

export const getReturnDetails = (id: string | number) => apiClient<ApiResponse<any>>(`/api/returns/${id}`);

export const getWallet = () => apiClient<ApiResponse<any>>("/api/wallet");

export const getOrders = (status?: number): Promise<OrderResponse> => {
  const url = status ? `/api/orders?status=${status}` : "/api/orders";
  return apiClient<ApiResponse<any>>(url);
};

export const uploadMedia = (file: File, collection: string = "avatar") => {
  const formData = new FormData();
  formData.append("file[]", file);
  formData.append("collection", collection);
  return apiClient<ApiResponse<any>>("/api/media/upload", { method: "POST", body: formData });
};

export const updateProfile = (data: {
  full_name?: string;
  password?: string;
  password_confirmation?: string;
  image?: string;
}) => apiClient<ApiResponse<any>>("/api/profile", { method: "PUT", body: JSON.stringify(data) });

export const changePhone = (phone: string, phoneCode: string) =>
  apiClient<ApiResponse<any>>("/api/profile/change-phone", { method: "POST", body: JSON.stringify({ phone, phone_code: phoneCode }) });

export const confirmPhone = (code: string, token: string) =>
  apiClient<ApiResponse<any>>("/api/profile/confirm-phone", { method: "POST", body: JSON.stringify({ code, token }) });
