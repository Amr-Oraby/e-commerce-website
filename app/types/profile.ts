import { ImageType } from "./product";
import { PaginationLinks, PaginationMeta } from "./api";

export interface UserSettings {
  language: string;
  allow_notifications: boolean;
}

export interface User {
  id: number;
  role: string | null;
  name: string;
  email: string | null;
  phone_code: string;
  phone: string;
  image: ImageType | null;
  user_type: string;
  is_verified: string | null;
  is_banned: boolean;
  is_suspended: boolean;
  settings: UserSettings;
}

export interface LoyaltyAccount {
  id: number;
  balance: number;
  total_earned: number;
  total_redeemed: number;
  last_transaction_at: string;
}

export interface LoyaltyTransaction {
  id: number;
  type: number;
  type_label: string;
  is_credit: boolean;
  points: number;
  balance_after: number;
  order_id: number;
  description: string;
  created_at: string;
}

export interface LoyaltyPointsData {
  account: LoyaltyAccount;
  transactions: {
    transactions: LoyaltyTransaction[];
    links: PaginationLinks;
    meta: PaginationMeta;
  };
}

export interface WalletAccount {
  id: number;
  balance: number;
  total_refunded: number;
  total_spent: number;
  last_transaction_at: string;
}

export interface WalletTransaction {
  id: number;
  type: number;
  type_label: string;
  is_credit: boolean;
  amount: number;
  balance_after: number;
  order_id: number;
  description: string;
  created_at: string;
}

export interface WalletData {
  wallet: WalletAccount;
  transactions: {
    transactions: WalletTransaction[];
    links: PaginationLinks;
    meta: PaginationMeta;
  };
}
