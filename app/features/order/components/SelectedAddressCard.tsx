"use client";
import React from "react";
import { useAddressDetails } from "../hooks/useAddressDetails";

export default function SelectedAddressCard({ addressId }: { addressId: number | null }) {
  const { data, isPending } = useAddressDetails(addressId);
  const address = data?.data;

  if (isPending || !addressId) {
    return (
      <div dir="rtl" className="w-full max-w-[520px] p-6 border rounded-2xl border-gray-200 bg-white mx-auto animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }

  if (!address) return null;

  return (
    <div dir="rtl" className="w-full max-w-[520px] p-6 rounded-2xl bg-gray-50 font-sans text-gray-900 mx-auto flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">عنوان التوصيل</h2>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          {address.location?.city?.name}، {address.location?.country?.name} - {address.location?.district?.name}، شارع {address.description}، مبنى {address.building_name}، الطابق {address.floor_number}
        </p>
      </div>
      <svg
        className="w-5 h-5 text-gray-400 shrink-0 mr-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );
}
