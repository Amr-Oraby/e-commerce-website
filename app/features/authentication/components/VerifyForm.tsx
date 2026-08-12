"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { InputOTPGroup, InputOTPSlot, InputOTP } from "@/components/ui/input-otp";
import { useConfirmResetCode } from "../hooks/useConfirmResetCode";
import { useResendForgotPassword } from "../hooks/useResendForgotPassword";

export default function VerifyForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const phone = searchParams.get("phone") || "";
  const phoneCode = searchParams.get("phoneCode") || "";
  const router = useRouter();

  useEffect(() => {
    if (!token || !phone) {
      router.replace("/forgot-password");
    }
  }, [token, phone, router]);

  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(0); // Set to 0 to enable immediately for testing
  const [errorMsg, setErrorMsg] = useState("");

  const { mutate, isPending } = useConfirmResetCode();
  const { mutate: resendMutate, isPending: isResendPending } = useResendForgotPassword();

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

  const handleResend = () => {
    setErrorMsg("");
    resendMutate(
      { token },
      {
        onSuccess: (data) => {
          if (data?.status === "success" && data?.data?.verification_token) {
            const newToken = data.data.verification_token;
            // Update URL to use new token without reloading the page
            router.replace(`/forgot-password/verify?token=${newToken}&phone=${phone}&phoneCode=${phoneCode}`);
            setTimeLeft(60);
          } else {
            setErrorMsg(data?.message || "حدث خطأ أثناء إعادة إرسال الرمز");
          }
        },
        onError: () => {
          setErrorMsg("حدث خطأ أثناء إعادة إرسال الرمز");
        }
      }
    );
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

    mutate(
      {
        type: "phone",
        code,
        verification_token: token,
      },
      {
        onError: () => {
          setErrorMsg("رمز التحقق غير صحيح، يرجى المحاولة مرة أخرى.");
        },
        onSuccess: (data) => {
          if (data?.status !== 'success') {
            setErrorMsg(data?.message || "رمز التحقق غير صحيح، يرجى المحاولة مرة أخرى.");
          } else {
            // Pass the phone and phoneCode along to the reset page
            router.push(`/forgot-password/reset?token=${token}&phone=${phone}&phoneCode=${phoneCode}`);
          }
        }
      }
    );
  };

  if (!token || !phone) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] w-full">
        <div className="w-8 h-8 border-4 border-[#F9A826] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center" dir="rtl">
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
      <div className="text-center mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 mb-3 sm:mb-4">
          تأكيد الهوية
        </h1>
        <p className="text-[#8e8e8e] text-sm sm:text-base font-medium leading-relaxed max-w-[400px] mx-auto">
          أرسلنا رمز تحقق مكون من 4 أرقام إلى {phone} الرمز الموجود في
          المربع أدناه للمتابعة.
        </p>
      </div>

      {/* Edit Phone Link */}
      <div className="flex justify-start mb-6 sm:mb-8 w-full">
        <Link
          href="/forgot-password"
          className="flex items-center gap-2 text-[#F9A826] text-sm sm:text-base font-bold border-b border-[#F9A826] pb-0.5 hover:opacity-80 transition-opacity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4 sm:w-5 sm:h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          تعديل رقم الهاتف
        </Link>
      </div>

      {/* Form Content */}
      <form
        className="flex flex-col gap-8 w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        {/* Shadcn OTP Input */}
        <div className="flex justify-center" dir="ltr">
          <InputOTP maxLength={4} value={code} onChange={setCode}>
            {/* Added gap between slots to match the separated circles/squares design */}
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
        <div className="flex justify-between items-center text-sm sm:text-base font-medium px-2">
          <span className="text-gray-500 font-mono tracking-wider">{formatTime(timeLeft)}</span>
          <div>
            <span className="text-[#8e8e8e]">لم تستلم الكود؟ </span>
            <button
              type="button"
              disabled={timeLeft > 0 || isResendPending}
              onClick={handleResend}
              className={`font-bold transition-colors ${timeLeft > 0 || isResendPending ? "text-gray-400 cursor-not-allowed" : "text-[#F9A826] hover:underline underline-offset-4"}`}
            >
              {isResendPending ? "جاري الإرسال..." : "اعادة ارسال"}
            </button>
          </div>
        </div>

        {/* Back to Login Link */}
        <div className="text-center mt-6">
          <Link
            href="/login"
            className="text-[#8e8e8e] hover:text-gray-700 text-sm sm:text-base font-bold transition-colors"
          >
            العودة إلى تسجيل الدخول
          </Link>
        </div>
      </form>
    </div>
  );
}
