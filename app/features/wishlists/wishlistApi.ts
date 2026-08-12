import { apiClient } from "@/lib/api/client";
import { ApiResponse } from "@/app/types/api";

export const getWishlist = () => apiClient<ApiResponse<any>>("/api/wishlist/getWishlist");

export const toggleWishlist = (productId: number) => apiClient<ApiResponse<any>>("/api/wishlist/toggle", {
  method: "POST",
  body: JSON.stringify({ product_id: productId }),
});
