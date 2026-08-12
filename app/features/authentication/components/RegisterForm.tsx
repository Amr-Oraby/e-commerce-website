"use client";

import React, { useState } from "react";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import { useRegister } from "../hooks/useRegister";
import { useTranslations } from "next-intl";

export default function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const t = useTranslations("auth");

  const { mutate, isPending } = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName || !phoneNumber || !password || !confirmPassword) {
      setErrorMsg("Please fill all required fields"); // You could translate these error messages too
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    if (!termsAccepted) {
      setErrorMsg("You must accept the terms and conditions");
      return;
    }

    mutate({
      full_name: fullName,
      phone: phoneNumber,
      password,
      phone_code: "966",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name Input */}
      <div className="space-y-2">
        <label htmlFor="register-fullName" className="block text-sm font-bold text-gray-800">
          {t("name")}
        </label>
        <div className="flex items-center w-full border border-gray-200 rounded-full bg-white overflow-hidden focus-within:border-[#f9a01b] focus-within:ring-1 focus-within:ring-[#f9a01b] transition-all">
          <input
            id="register-fullName"
            name="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={t("namePlaceholder")}
            className="flex-1 px-4 py-3 text-sm text-gray-700 bg-transparent outline-none placeholder:text-gray-400"
            required
          />
        </div>
      </div>

      {/* Phone Number Input */}
      <div className="space-y-2">
        <label htmlFor="register-phone" className="block text-sm font-bold text-gray-800">
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
            <div className="w-5 h-3.5 bg-green-700 flex items-center justify-center rounded-sm">
              <span className="text-[6px] text-white">🇸🇦</span>
            </div>
          </button>

          {/* Phone Input Field */}
          <input
            id="register-phone"
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
        <label htmlFor="register-password" className="block text-sm font-bold text-gray-800">
          {t("password")}
        </label>
        <div className="flex items-center w-full border border-gray-200 rounded-full bg-white focus-within:border-[#f9a01b] focus-within:ring-1 focus-within:ring-[#f9a01b] transition-all px-4">
          <input
            id="register-password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("passwordPlaceholder")}
            className="flex-1 py-3 text-sm text-gray-700 bg-transparent outline-none placeholder:text-gray-400"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-gray-600 focus:outline-none p-1"
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>
      </div>

      {/* Confirm Password Input */}
      <div className="space-y-2">
        <label htmlFor="register-confirmPassword" className="block text-sm font-bold text-gray-800">
          {t("confirmPassword")}
        </label>
        <div className="flex items-center w-full border border-gray-200 rounded-full bg-white focus-within:border-[#f9a01b] focus-within:ring-1 focus-within:ring-[#f9a01b] transition-all px-4">
          <input
            id="register-confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={t("confirmPasswordPlaceholder")}
            className="flex-1 py-3 text-sm text-gray-700 bg-transparent outline-none placeholder:text-gray-400"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-gray-400 hover:text-gray-600 focus:outline-none p-1"
          >
            {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>
      </div>

      {/* Terms and Conditions Checkbox */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <label htmlFor="terms" className="text-sm text-gray-500 font-medium cursor-pointer">
          أؤكد أنني فوق 18 عاماً وأوافق على <span className="text-[#f9a01b]">الشروط والأحكام وسياسة الإسترجاع والاستبدال.</span>
        </label>
        <input
          type="checkbox"
          id="terms"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 text-[#f9a01b] focus:ring-[#f9a01b] cursor-pointer"
        />
      </div>

      {errorMsg && (
        <div className="text-red-500 text-sm font-bold text-center">
          {errorMsg}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-[#f9a01b] hover:bg-[#e89215] text-white font-bold rounded-full py-4 text-base transition-colors shadow-sm mt-4 disabled:opacity-70"
      >
        {isPending ? t("registerLoading") : t("registerSubmit")}
      </button>
    </form>
  );
}
