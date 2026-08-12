export interface SearchHistoryItem {
  id: number;
  term: string;
  created_at: string;
}

export interface SearchHistoryResponse {
  status: string;
  message: string;
  data: SearchHistoryItem[];
}

export interface SearchAddResponse {
  status: string;
  message: string;
  data: SearchHistoryItem;
}

export interface SearchDeleteResponse {
  status: string;
  message: string;
  data: null;
}
