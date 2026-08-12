import { apiClient } from "@/lib/api/client";
import { ApiResponse } from "@/app/types/api";
import { CreateAddressPayload, ReturnRequestPayload } from "@/app/types/order";

export interface CheckOrderPayload {
  deliveryType: number | undefined;
  addressId: number | null | undefined;
  branchId: number | null | undefined;
  couponCode: string | null | undefined;
  useLoyaltyPoints: 0 | 1 | null | undefined
}
export interface FinishOrderPayload {
  deliveryType: number | undefined;
  paymentMethod: number | undefined;
  addressId: number | null | undefined;
  branchId: number | null | undefined;
  couponCode: string | null | undefined;
  useLoyaltyPoints: 0 | 1 | null | undefined;
}

export const getBranches = () => apiClient<ApiResponse<any>>("/api/guest/branches");

export const getAddresses = () => apiClient<ApiResponse<any>>("/api/addresses");

export const createAddress = (payload: CreateAddressPayload) => apiClient<ApiResponse<any>>("/api/addresses", { method: "POST", body: JSON.stringify(payload) });

export const deleteAddress = (id: string | number) => apiClient<ApiResponse<any>>(`/api/addresses/${id}`, { method: "DELETE" });

export const getAddressDetails = (id: string | number) => apiClient<ApiResponse<any>>(`/api/addresses/${id}`);

export const getCountries = () => apiClient<ApiResponse<any>>("/api/guest/countries");

export const getCities = (countryId?: string | number) => {
  const url = countryId ? `/api/guest/cities?country_id=${countryId}` : "/api/guest/cities";
  return apiClient<ApiResponse<any>>(url);
};

export const getDistricts = (cityId?: string | number) => {
  const url = cityId ? `/api/guest/districts?city_id=${cityId}` : "/api/guest/districts";
  return apiClient<ApiResponse<any>>(url);
};

export const finishOrder = (data: FinishOrderPayload) => apiClient<ApiResponse<any>>("/api/orders/checkout", { method: "POST", body: JSON.stringify(data) });

export const checkOrder = (data: CheckOrderPayload) => apiClient<ApiResponse<any>>("/api/orders/checkOrder", { method: "POST", body: JSON.stringify(data) });

export const getOrderDetails = (orderId: string | number) => apiClient<ApiResponse<any>>(`/api/orders/${orderId}`);

export const cancelOrder = (orderId: string | number) => apiClient<ApiResponse<any>>(`/api/orders/${orderId}/cancel`, { method: "POST" });

export const getOrderInvoice = (orderId: string | number) => apiClient<ApiResponse<any>>(`/api/orders/${orderId}/invoice`);

export const reorderOrder = (orderId: string | number) => apiClient<ApiResponse<any>>(`/api/orders/${orderId}/reorder`, { method: "POST" });

export const submitReturnRequest = (payload: ReturnRequestPayload) => apiClient<ApiResponse<any>>("/api/returns", { method: "POST", body: JSON.stringify(payload) });

export const uploadMedia = (file: File) => {
  const formData = new FormData();
  formData.append("file[]", file);
  formData.append("collection", "product");
  return apiClient<ApiResponse<any>>("/api/media/upload", { method: "POST", body: formData });
};
