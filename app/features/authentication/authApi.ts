// features/auth/loginApi.ts
import { apiClient } from "@/lib/api/client";
import { ApiResponse } from "@/app/types/api";

export const getCurrentUser = () => apiClient<ApiResponse<any>>("/api/auth/getCurrentUser");

export const logout = () => apiClient<ApiResponse<any>>("/api/auth/logout", { method: "POST" });

export const login = (credentials: {
  phoneNumber: string;
  password: string;
  phoneCode: string;
}) => apiClient<ApiResponse<any>>("/api/auth/login", { method: "POST", body: JSON.stringify(credentials) });

export const register = (credentials: {
  full_name: string;
  phone_code: string;
  phone: string;
  password: string;
}) => apiClient<ApiResponse<any>>("/api/auth/register", { method: "POST", body: JSON.stringify(credentials) });

export const verify = (credentials: {
  type: string;
  code: string;
  verification_token: string;
}) => apiClient<ApiResponse<any>>("/api/auth/verify", { method: "POST", body: JSON.stringify(credentials) });

export const forgotPassword = (credentials: {
  phone_code: string;
  phone: string;
}) => apiClient<ApiResponse<any>>("/api/auth/forgot-password", { method: "POST", body: JSON.stringify(credentials) });

export const confirmResetCode = (credentials: {
  type: string;
  code: string;
  verification_token: string;
}) => apiClient<ApiResponse<any>>("/api/auth/confirm-reset-code", { method: "POST", body: JSON.stringify(credentials) });

export const resetPassword = (credentials: {
  token: string;
  password: string;
  password_confirmation: string;
}) => apiClient<ApiResponse<any>>("/api/auth/reset-password", { method: "POST", body: JSON.stringify(credentials) });

export const resendForgotPassword = (credentials: {
  token: string;
}) => apiClient<ApiResponse<any>>("/api/auth/resend-forgot-password", { method: "POST", body: JSON.stringify(credentials) });
