"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useResetPassword } from "../hooks/useResetPassword";

export default function ResetPasswordForm() {
  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form state
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/forgot-password");
    }
  }, [token, router]);

  const { mutate, isPending } = useResetPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!password || !passwordConfirmation) {
      setErrorMsg("الرجاء إدخال جميع الحقول");
      return;
    }

    if (password !== passwordConfirmation) {
      setErrorMsg("كلمات المرور غير متطابقة");
      return;
    }

    if (!token) {
      setErrorMsg("رمز التحقق غير موجود");
      return;
    }

    mutate(
      {
        token,
        password,
        password_confirmation: passwordConfirmation,
      },
      {
        onError: (err: Error) => {
          setErrorMsg(err.message || "حدث خطأ أثناء إعادة تعيين كلمة المرور");
        },
      }
    );
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-[#F9A826] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center" dir="rtl">
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 mb-4">
          تغيير كلمة المرور
        </h1>
        <p className="text-[#8e8e8e] text-sm sm:text-base font-medium">
          احفظ كلمة المرور الجديدة جيدًا، وفي حال نسيانها يمكنك إعادة تعيينها
          بسهولة.
        </p>
      </div>

      {/* Form Content */}
      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        {errorMsg && (
          <div className="text-red-500 text-sm text-center font-medium bg-red-50 p-3 rounded-lg">
            {errorMsg}
          </div>
        )}
        {/* Input 1: New Password */}
        <div className="flex flex-col gap-3">
          <label className="text-gray-900 font-bold text-sm sm:text-base">
            كلمة المرور الجديدة*
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="ادخل كلمة المرور الجديدة"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-full py-4 pr-6 pl-12 text-sm placeholder:text-[#b3b3b3] outline-none focus:border-[#F9A826] transition-colors"
            />
            {/* Toggle Icon */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPassword ? (
                // Eye Open Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                // Eye Slash Icon (Matches Image)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Input 2: Confirm New Password */}
        <div className="flex flex-col gap-3">
          <label className="text-gray-900 font-bold text-sm sm:text-base">
            تأكيد كلمة المرور الجديدة*
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="ادخل كلمة المرور"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="w-full border border-gray-200 rounded-full py-4 pr-6 pl-12 text-sm placeholder:text-[#b3b3b3] outline-none focus:border-[#F9A826] transition-colors"
            />
            {/* Toggle Icon */}
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showConfirmPassword ? (
                // Eye Open Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                // Eye Slash Icon (Matches Image)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending || !password || !passwordConfirmation}
          className="w-full bg-[#F9A826] hover:bg-[#e69820] text-white font-bold text-lg py-4 rounded-full transition-colors mt-6 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          {isPending ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "تأكيد"
          )}
        </button>
      </form>
    </div>
  );
}
