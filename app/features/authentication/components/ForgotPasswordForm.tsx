"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForgotPassword } from "../hooks/useForgotPassword";
import Image from "next/image";

export default function ForgotPasswordForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const { mutate, isPending } = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    mutate({ phone: phoneNumber, phone_code: "966" }); // Using 966 as the default for now
  };

  return (
    <>
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 mb-4">
          استعادة كلمة المرور
        </h1>
        <p className="text-[#8e8e8e] text-sm sm:text-base font-medium leading-relaxed max-w-sm mx-auto">
          يرجي إدخال رقم الهاتف المكون من 47 *** *** *** حتي نتمكن من التحقق من
          هويتك
        </p>
      </div>

      {/* Form Content */}
      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        {/* Phone Input */}
        <div className="flex flex-col gap-3">
          <label className="text-gray-900 font-bold text-sm sm:text-base">
            رقم الجوال*
          </label>
          <div className="relative flex items-center border border-gray-200 rounded-full h-[56px] overflow-hidden focus-within:border-[#F9A826] transition-colors bg-white">
            {/* Country Code Selector (Positioned on the right in RTL) */}
            <div className="flex items-center gap-2 px-4 h-full border-l border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors shrink-0">
              <Image
                src="https://flagcdn.com/w20/sa.png"
                alt="Saudi Arabia"
                width={20}
                height={14}
                className="object-cover rounded-sm"
              />
              <span className="text-gray-800 text-sm font-medium" dir="ltr">
                +966
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>

            {/* Input Field */}
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1 h-full px-4 text-base outline-none bg-transparent"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#F9A826] hover:bg-[#e69820] text-white font-bold text-lg py-4 rounded-full transition-colors mt-2 disabled:opacity-70"
        >
          {isPending ? "جاري الإرسال..." : "متابعة"}
        </button>

        {/* Back to Login Link */}
        <div className="text-center mt-2">
          <Link
            href="/login"
            className="text-[#8e8e8e] hover:text-gray-700 text-sm sm:text-base font-bold transition-colors"
          >
            العودة إلى تسجيل الدخول
          </Link>
        </div>
      </form>
    </>
  );
}
