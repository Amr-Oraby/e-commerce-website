"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerify } from "../hooks/useVerify";

export default function RegisterVerifyForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const phone = searchParams.get("phone") || "";
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/login"); // or whatever page manages register step
    }
  }, [token, router]);
  
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [errorMsg, setErrorMsg] = useState("");
  
  const { mutate, isPending } = useVerify();

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    return `0:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!code || code.length < 4) {
      setErrorMsg("الرجاء إدخال رمز التحقق بالكامل");
      return;
    }

    if (!token) {
      setErrorMsg("رمز التحقق غير موجود. يرجى المحاولة مرة أخرى.");
      return;
    }

    mutate({
      type: "phone",
      code,
      verification_token: token,
    });
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] bg-gray-50 p-4 w-full">
        <div className="w-8 h-8 border-4 border-[#F9A826] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4" dir="rtl">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-10 flex flex-col">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="text-[#f6a723] flex flex-col items-center">
            <Image
              width={50}
              height={50}
              src="/images/logo.png"
              className="w-auto h-16 object-contain mb-2"
              alt="Golden B.H"
            />
            <span className="font-bold text-lg tracking-wider">Golden B.H</span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 mb-3 sm:mb-4">
            تأكيد الهوية
          </h1>
          <p className="text-[#8e8e8e] text-sm sm:text-base font-medium leading-relaxed max-w-[400px] mx-auto">
            أرسلنا رمز تحقق مكون من 4 أرقام إلى {phone} الرمز الموجود في
            المربع أدناه للمتابعة.
          </p>
        </div>

        {/* Form Content */}
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          
          {/* Shadcn OTP Input */}
          <div className="flex justify-center" dir="ltr">
            <InputOTP maxLength={4} value={code} onChange={setCode}>
              <InputOTPGroup className="flex gap-3 sm:gap-5 w-full justify-center">
                {[0, 1, 2, 3].map((index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="w-14 h-14 sm:w-[72px] sm:h-[72px] text-2xl sm:text-3xl font-bold rounded-[1.25rem] sm:rounded-[1.5rem] border border-gray-200 bg-white ring-offset-background transition-all focus-visible:ring-0 data-[active]:border-[#F9A826] data-[active]:border-2 !border-l-gray-200 first:!border-l-gray-200"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          {errorMsg && (
            <div className="text-red-500 text-sm font-bold text-center -mt-2">
              {errorMsg}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#F9A826] hover:bg-[#e69820] text-white font-bold text-lg py-4 rounded-full transition-colors mt-2 shadow-sm disabled:opacity-70"
          >
            {isPending ? "جاري التحقق..." : "إرسال"}
          </button>

          {/* Resend & Timer */}
          <div className="flex justify-between items-center text-sm sm:text-base font-medium px-2 mt-4">
            <span className="text-gray-500 font-mono tracking-wider">{formatTime(timeLeft)}</span>
            <div>
              <span className="text-[#8e8e8e]">لم تستلم الكود؟ </span>
              <button
                type="button"
                disabled={timeLeft > 0}
                className={`font-bold transition-colors ${timeLeft > 0 ? "text-gray-400 cursor-not-allowed" : "text-[#F9A826] hover:underline underline-offset-4"}`}
                onClick={() => {
                  // Resend logic goes here (not implemented yet)
                  // setTimeLeft(60);
                }}
              >
                اعادة ارسال
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
