"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiEyeOff, FiEye, FiChevronDown } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { useProfile } from "../hooks/useProfile";
import { useUser } from "../../authentication/hooks/useUser";
import { uploadMedia } from "../profileApi";
import { User } from "@/app/types/profile";
import { ApiResponse } from "@/app/types/api";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import Image from "next/image";

const ChangePhoneDialog = dynamic(() => import("./ChangePhoneDialog"));

export default function ProfileForm() {
  const t = useTranslations("profile");
  const { data: profileData } = useProfile();
  const { user } = useUser() as unknown as { user: ApiResponse<User> };
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [password, setPassword] = useState("12345");
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (profileData?.data) {
      setFullName(profileData.data.name || profileData.data.full_name || "");
      setPhone(profileData.data.phone || "");
      setPhoneCode(profileData.data.phone_code || "");
      setImagePreview(user?.data?.image?.url || profileData.data.image || "/images/avatar.jpg");
    }
  }, [profileData, user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const { mutate, isPending } = useUpdateProfile();
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    const payload: any = {
      full_name: fullName,
    };

    if (password && password !== "12345") {
      payload.password = password;
      payload.password_confirmation = password;
    }

    try {
      if (selectedImage) {
        setIsUploading(true);
        const uploadRes = await uploadMedia(selectedImage, "avatar");
        const imageHash = uploadRes?.data?.hash;
        setIsUploading(false);
        if (imageHash) {
          payload.image = imageHash;
        }
      }

      mutate(payload, {
        onSuccess: () => {
          setSuccessMsg(t("changesSavedSuccessfully"));
          setSelectedImage(null);
        },
        onError: () => {
          setErrorMsg(t("errorSavingChanges"));
        }
      });
    } catch (error) {
      setIsUploading(false);
      setErrorMsg(t("imageUploadFailed"));
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        dir="rtl"
        className="max-w-4xl w-full p-3 sm:p-4 space-y-6 sm:space-y-8 font-sans"
      >
        {successMsg && (
          <div className="bg-green-50 border border-green-100 text-green-700 p-3 rounded-lg text-sm font-bold text-center">
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="bg-red-50 border border-red-100 text-red-700 p-3 rounded-lg text-sm font-bold text-center">
            {errorMsg}
          </div>
        )}

        {/* Avatar Section */}
        <div className="relative w-20 h-20 md:w-40 md:h-40 mx-auto mb-6">
          <Image
            src={imagePreview || "/images/avatar.jpg"}
            className="rounded-full object-cover"
            alt="avatar"
            fill
            sizes="(max-width: 768px) 80px, 160px"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-2 -left-2 lg:bottom-1 lg:left-1 bg-amber-500 text-white p-1.5 rounded-full border-4 border-white flex items-center justify-center hover:bg-amber-600 transition-colors"
            aria-label="Edit avatar"
          >
            <BiEdit className="w-4 h-4 md:w-6 md:h-6 cursor-pointer" />
          </button>
        </div>

        {/* Full Name */}
        <div className="flex flex-col space-y-2 sm:space-y-3">
          <label className="text-gray-900 font-bold text-xs sm:text-sm">
            {t("fullNameLabel")}
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-gray-200 rounded-full px-4 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-base text-gray-800 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-shadow"
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col space-y-2 sm:space-y-3">
          <label className="text-gray-900 font-bold text-xs sm:text-sm">
            {t("mobileNumberLabel")}
          </label>
          <div className="flex items-center w-full border border-gray-200 rounded-full px-2.5 sm:px-5 py-3  focus-within:ring-1 focus-within:ring-amber-500 transition-shadow">
            {/* Country Code Block */}
            <div className="flex items-center gap-1 sm:gap-2 cursor-pointer text-gray-800 shrink-0">
              <span className="text-sm sm:text-lg leading-none">🇸🇦</span>
              <span className="text-xs sm:text-sm font-medium" dir="ltr">
                {phoneCode ? `+${phoneCode}` : "+966"}
              </span>
              <FiChevronDown className="w-3 sm:w-4 h-3 sm:h-4 text-gray-500" />
            </div>

            {/* Divider */}
            <div className="w-px h-4 sm:h-5 bg-gray-300 mx-1.5 sm:mx-4 shrink-0"></div>

            {/* Input */}
            <input
              type="tel"
              value={phone}
              readOnly
              className="flex-1 w-full min-w-0 text-xs sm:text-base text-gray-800 focus:outline-none bg-transparent cursor-not-allowed text-gray-500"
              dir="ltr"
              style={{ textAlign: "right" }}
            />
          </div>
          <button
            type="button"
            onClick={() => setIsPhoneDialogOpen(true)}
            className="text-amber-500 text-xs sm:text-sm font-medium self-start hover:text-amber-600 transition-colors"
          >
            {t("changeMobileNumber")}
          </button>
        </div>

        {/* Password */}
        <div className="flex flex-col space-y-1.5 sm:space-y-3">
          <label className="text-gray-900 font-bold text-xs sm:text-sm">
            {t("passwordLabel")}
          </label>

          {/* Reduced padding on mobile: px-3 py-2 */}
          <div className="flex items-center w-full border border-gray-200 rounded-full px-3 sm:px-5 py-2 sm:py-3 focus-within:ring-1 focus-within:ring-amber-500 transition-shadow">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // Removed conflicting text sizes. Set to text-sm on mobile, text-lg on desktop.
              // Adjusted tracking to be slightly tighter on mobile.
              className=" flex-1 w-full min-w-0 text-sm sm:text-lg text-gray-800 focus:outline-none bg-transparent tracking-[0.2em] sm:tracking-widest"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-gray-700 transition-colors p-1 shrink-0"
            >
              {showPassword ? (
                <FiEye className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <FiEyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>


        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isPending || isUploading}
            className="w-full sm:w-auto bg-[#f5a522] hover:bg-[#df9011] text-white font-bold py-3 sm:py-3.5 px-10 rounded-full shadow-sm transition-colors text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending || isUploading ? t("saving") : t("saveChanges")}
          </button>
        </div>
      </form>

      <ChangePhoneDialog
        isOpen={isPhoneDialogOpen}
        onClose={() => setIsPhoneDialogOpen(false)}
      />
    </>
  );
}
