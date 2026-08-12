"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { changePhone, confirmPhone } from "../profileApi";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

interface ChangePhoneDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePhoneDialog({ isOpen, onClose }: ChangePhoneDialogProps) {
  const t = useTranslations("profile");
  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("966");
  const [token, setToken] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const queryClient = useQueryClient();

  const { mutateAsync: mutateChangePhone } = useMutation({
    mutationFn: ({ phone, phoneCode }: { phone: string; phoneCode: string }) =>
      changePhone(phone, phoneCode),
  });

  const { mutateAsync: mutateConfirmPhone } = useMutation({
    mutationFn: ({ code, token }: { code: string; token: string }) =>
      confirmPhone(code, token),
  });

  if (!isOpen) return null;

  const handleStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setIsLoading(true);
    try {
      const res = await mutateChangePhone({ phone, phoneCode });
      
      const searchToken = (obj: Record<string, any>): string => {
        if (!obj || typeof obj !== "object") return "";
        for (const key of ["phone_reset_token", "reset_token", "verification_token", "token"]) {
          if (obj[key] && (typeof obj[key] === "string" || typeof obj[key] === "number")) {
            return String(obj[key]);
          }
        }
        if (obj.data) return searchToken(obj.data);
        return "";
      };

      let finalToken = searchToken(res);
      if (!finalToken && typeof res?.data === "string") {
        finalToken = res.data;
      }
      if (!finalToken && typeof res?.data === "number") {
        finalToken = String(res.data);
      }

      setToken(finalToken);
      setSuccessMsg(res?.message || t("verificationCodeSent"));
      setStep(2);
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || t("errorSendingRequest"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setIsLoading(true);
    try {
      await mutateConfirmPhone({ code, token });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      handleClose();
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || t("invalidVerificationCode"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setPhone("");
    setCode("");
    setErrorMsg("");
    setSuccessMsg("");
    setToken("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative" dir="rtl">
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 p-2 border border-gray-200 rounded-full hover:bg-gray-50 text-gray-500 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <h2 className="text-xl font-bold text-gray-900 mb-2">{t("changeMobileNumber")}</h2>
        <p className="text-sm text-gray-500 mb-6">
          {step === 1
            ? t("enterNewMobileNumberDesc")
            : t("enterVerificationCodeDesc")}
        </p>

        {errorMsg && (
          <div className="bg-red-50 text-red-500 text-sm mb-4 p-3 rounded-lg text-center font-bold">
            {errorMsg}
          </div>
        )}
        {successMsg && step === 2 && (
          <div className="bg-green-50 text-green-600 text-sm mb-4 p-3 rounded-lg text-center font-bold">
            {successMsg}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleStep1} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-gray-900 font-bold text-xs">{t("newMobileNumberLabel")}</label>
              <div className="flex items-center w-full border border-gray-200 rounded-full px-4 py-3 focus-within:ring-1 focus-within:ring-amber-500 transition-shadow">
                <span className="text-sm text-gray-800 shrink-0 font-medium" dir="ltr">
                  +{phoneCode}
                </span>
                <div className="w-px h-4 bg-gray-300 mx-3 shrink-0"></div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 w-full min-w-0 text-sm text-gray-800 focus:outline-none bg-transparent"
                  dir="ltr"
                  style={{ textAlign: "right" }}
                  placeholder={t("enterMobileNumber")}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading || !phone}
              className="w-full bg-[#f5a522] hover:bg-[#df9011] text-white font-bold py-3 rounded-full shadow-sm text-sm disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? t("sending") : t("confirm")}
            </button>
          </form>
        ) : (
          <form onSubmit={handleStep2} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-gray-900 font-bold text-xs">{t("verificationCodeLabel")}</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-shadow"
                placeholder={t("enterVerificationCode")}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !code}
              className="w-full bg-[#f5a522] hover:bg-[#df9011] text-white font-bold py-3 rounded-full shadow-sm text-sm disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? t("verifying") : t("confirm")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
