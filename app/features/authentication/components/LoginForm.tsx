"use client";
import React, { useState } from "react";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import { useLogin } from "../hooks/useLogin";
import Image from "next/image";
import Link from "next/link";
import RegisterForm from "./RegisterForm";
import { useTranslations } from "next-intl";

export default function LoginForm() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { mutate, isPending } = useLogin();
  const t = useTranslations("auth");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!phoneNumber || !password) return;
    mutate(
      { phoneNumber, password, phoneCode: "966" },
      {
        onError: (err) => {
          setErrorMsg(err.message === "Login failed" ? t("loginFailed") : err.message);
        }
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 gap-6">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-10">
        {/* Logo Section */}
        <div className="flex flex-col items-center justify-center mb-8">
          {/* Placeholder for the actual logo image */}
          <div className="text-[#f6a723] flex flex-col items-center">
            <Image
              width={30}
              height={30}
              src="/images/logo.png"
              className="w-30"
              alt=""
              priority
            />
            <span className="font-bold text-lg tracking-wider">Golden B.H</span>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-[#fffcf5] rounded-full p-1.5 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-3 px-6 rounded-full text-sm font-bold transition-colors ${
              activeTab === "login"
                ? "bg-[#f9a01b] text-white shadow-md"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t("loginTab")}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-3 px-6 rounded-full text-sm font-bold transition-colors ${
              activeTab === "register"
                ? "bg-[#f9a01b] text-white shadow-md"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t("registerTab")}
          </button>
        </div>

        {/* Form */}
        {activeTab === "login" ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMsg && (
              <div className="text-red-500 text-sm font-bold text-center bg-red-50 p-3 rounded-lg border border-red-100">
                {errorMsg}
              </div>
            )}
            
            {/* Phone Number Input */}
            <div className="space-y-2">
              <label htmlFor="login-phone" className="block text-sm font-bold text-gray-800">
                {t("phone")}
              </label>
              <div className="flex items-center w-full border border-gray-200 rounded-full bg-white overflow-hidden focus-within:border-[#f9a01b] focus-within:ring-1 focus-within:ring-[#f9a01b] transition-all">
                {/* Country Code Dropdown */}
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-3 bg-white border-l border-gray-200 hover:bg-gray-50"
                >
                  <ChevronDown size={16} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-700" dir="ltr">
                    +966
                  </span>
                  {/* Simple CSS flag representation for SA/Green flag in the image */}
                  <div className="w-5 h-3.5 bg-green-700 flex items-center justify-center rounded-sm">
                    <span className="text-[6px] text-white">🇸🇦</span>
                  </div>
                </button>

                {/* Phone Input Field */}
                <input
                  id="login-phone"
                  name="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder={t("phonePlaceholder")}
                  className="flex-1 px-4 py-3 text-sm text-gray-700 bg-transparent outline-none placeholder:text-gray-400"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="login-password" className="block text-sm font-bold text-gray-800">
                {t("password")}
              </label>
              <div className="flex items-center w-full border border-gray-200 rounded-full bg-white focus-within:border-[#f9a01b] focus-within:ring-1 focus-within:ring-[#f9a01b] transition-all px-4">
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("passwordPlaceholder")}
                  className="flex-1 min-w-0 py-3 text-sm text-gray-700 bg-transparent outline-none placeholder:text-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none p-1 shrink-0"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-start">
              <Link
                href="forgot-password"
                className="text-[#f9a01b] text-sm font-medium hover:underline"
              >
                {t("forgotPassword")}
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#f9a01b] hover:bg-[#e89215] text-white font-bold rounded-full py-4 text-base transition-colors shadow-sm mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending ? t("loginLoading") : t("loginSubmit")}
            </button>
          </form>
        ) : (
          <RegisterForm />
        )}
      </div>

      {/* Demo Credentials Card */}
      <div className="w-full max-w-sm sm:max-w-md bg-blue-50/40 rounded-2xl border border-blue-100 shadow-sm p-4 sm:p-5 flex flex-col items-center justify-center text-center mt-2" dir="ltr">
        <h3 className="text-blue-800 font-bold mb-3 text-sm sm:text-base">Login Credentials</h3>
        <div className="flex flex-col gap-2 w-full max-w-[250px] mx-auto bg-white p-3 rounded-xl border border-blue-50 shadow-sm">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">Phone:</span>
            <span className="font-mono font-bold text-gray-800">109147071</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">Password:</span>
            <span className="font-mono font-bold text-gray-800">password</span>
          </div>
        </div>
      </div>
    </div>
  );
}
