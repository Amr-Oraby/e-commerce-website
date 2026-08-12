"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useReturns } from "../hooks/useReturns";
import { ReturnRequest } from "@/app/types/order";
import { ApiResponse } from "@/app/types/api";

type TabType = "returns" | "replacements";

interface ReturnsToggleProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function ReturnsToggle({ activeTab, setActiveTab }: ReturnsToggleProps) {
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
          {/* Outer Container */}
          <div className="flex items-center bg-white border border-gray-200 rounded-full p-1.5 sm:p-2 w-full lg:max-w-2xl mx-auto shadow-sm gap-2">
            {/* Replacements Button (طلبات الاستبدال) */}
            <button
              type="button"
              onClick={() => setActiveTab("replacements")}
              className={`flex-1 text-center py-1.5 sm:py-3 rounded-full text-xs sm:text-sm md:text-base font-bold transition-all duration-300 ${
                activeTab === "replacements"
                  ? "bg-[#fff9ed] border border-amber-400 text-amber-500 shadow-sm" // Active State
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-transparent" // Inactive State
              }`}
            >
              {t("replacements")}
            </button>

            {/* Returns Button (طلبات الإرجاع) */}
            <button
              type="button"
              onClick={() => setActiveTab("returns")}
              className={`flex-1 text-center py-1.5 sm:py-3 rounded-full  text-xs sm:text-sm md:text-base font-bold transition-all duration-300 ${
                activeTab === "returns"
                  ? "bg-[#fff9ed] border border-amber-400 text-amber-500 shadow-sm" // Active State
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-transparent" // Inactive State
              }`}
            >
              {t("returns")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
