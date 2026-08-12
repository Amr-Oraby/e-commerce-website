import { apiClient } from "@/lib/api/client";
import { BrandsResponse } from "@/app/types/brand";

export const getBrands = () => apiClient<BrandsResponse>("/api/guest/brands");
