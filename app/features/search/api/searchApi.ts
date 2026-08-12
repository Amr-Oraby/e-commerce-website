import { apiClient } from "@/lib/api/client";
import { SearchHistoryResponse, SearchAddResponse, SearchDeleteResponse } from "../types";

export const getSearchHistory = () => apiClient<SearchHistoryResponse>("/api/search-history");

export const addSearchHistory = (term: string) => 
  apiClient<SearchAddResponse>("/api/search-history", { 
    method: "POST", 
    body: JSON.stringify({ term }) 
  });

export const deleteSearchHistory = (id: number) => 
  apiClient<SearchDeleteResponse>(`/api/search-history/${id}`, { 
    method: "DELETE" 
  });
