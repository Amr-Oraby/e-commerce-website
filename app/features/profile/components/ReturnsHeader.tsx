"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { useReturns } from "../hooks/useReturns";
import { ReturnRequest } from "@/app/types/order";
import { ApiResponse } from "@/app/types/api";

export default function ReturnsHeader() {
  const t = useTranslations("orders");
  const { data } = useReturns() as { data: ApiResponse<ReturnRequest[]> };

  // Extract the inner data array, default to empty array if undefined
  const returnsList = data?.data || [];

  // Check if there are any returns to display
  const hasContent = returnsList && returnsList.length > 0;

  return (
    <div>
      {hasContent && (
        <div
          dir="rtl"
          className="w-full max-w-7xl mx-auto p-4 sm:p-6 font-sans"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6">
            {/* Header Text */}
            <div className="flex flex-col">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                {t("ordersAndReturns")}
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm">
                {t("trackOrdersEasily")}
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex w-full md:w-80 lg:w-96 h-10 sm:h-12 ">
              {/* Input Wrapper */}
              <div className="relative flex-1 h-full">
                <Search
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                  strokeWidth={1.5}
                />
                <input
                  type="text"
                  placeholder={t("searchByOrderNumber")}
                  className="w-full h-full pl-4 pr-9 sm:pr-11 text-xs sm:text-sm text-gray-700 bg-white border border-gray-200 border-l-0 rounded-r-full outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button
                type="button"
                className="h-full px-6 sm:px-10 bg-[#f5a522] hover:bg-[#df9011] text-white font-bold text-sm sm:text-base rounded-l-full transition-colors shrink-0"
              >
                {t("search")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
