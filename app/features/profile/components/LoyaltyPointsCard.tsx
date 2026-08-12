"use client";

import React, { useEffect } from "react";
import { Star, Minus, AlertCircle, RefreshCcw, Inbox } from "lucide-react";
import { LoyaltyPointsData, LoyaltyTransaction } from "@/app/types/profile";
import { ApiResponse } from "@/app/types/api";
import { useLoyalityPoints } from "../hooks/useLoyalityPoints";
import { useTranslations } from "next-intl";

// Types for the component props and API response

interface LoyaltyComponentProps {
  balance?: number;
  pointsValue?: number;
  expiringPoints?: number;
  expiryDate?: string;
  totalEarned?: number;
  totalSpent?: number;
  transactions?: LoyaltyTransaction[];
}

export default function LoyaltyPointsCard({
  balance = 1250,
  pointsValue = 100.0,
  expiringPoints = 350,
  expiryDate = "22 يونيو 2026",
  totalEarned = 150,
  totalSpent = 150,
}: LoyaltyComponentProps) {
  const t = useTranslations("profile");
  // We use 'any' here temporarily to bypass strict typing if the hook isn't fully typed yet
  const { data: response } = useLoyalityPoints() as { data: ApiResponse<LoyaltyPointsData> };
  const data = response?.data;

  useEffect(() => {
    // console.log"loyality points api hook data", data);
  }, [data]);

  // Extract data from the API response, falling back to props/defaults if undefined
  const account = data?.account;
  const apiTransactions = data?.transactions?.transactions || [];

  const displayBalance = account?.balance ?? balance;
  const displayTotalEarned = account?.total_earned ?? totalEarned;
  const displayTotalSpent = account?.total_redeemed ?? totalSpent;

  const hasContent = apiTransactions && apiTransactions.length > 0;

  return (
    <div
      dir="rtl"
      /* Minimized outer padding for extremely small screens */
      className=" w-full mx-auto px-2 py-2 sm:px-6 sm:py-5 lg:p-6 font-sans"
    >
      {/* Header Section */}
      <div className="mb-2 sm:mb-6">
        <h2 className="text-sm sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-0.5 sm:mb-2">
          {t("loyaltyPointsTitle")}
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm lg:text-base">
          {t("loyaltyPointsDesc")}
        </p>
      </div>

      {/* Main Balance Card */}
      <div className="bg-[#fff9ed] rounded-xl sm:rounded-3xl p-2.5 sm:p-8 lg:p-10 flex items-center justify-between shadow-sm relative overflow-hidden">
        <div className="flex flex-col space-y-0.5 sm:space-y-2 z-10">
          <span className="text-gray-700 font-medium text-xs sm:text-sm lg:text-base">
            {t("yourPointsBalance")}
          </span>
          <div className="flex items-baseline gap-1 sm:gap-2 text-amber-500 font-bold">
            {/* Drastically reduced the main number size for mobile */}
            <span className="text-xl sm:text-5xl lg:text-6xl" dir="ltr">
              {displayBalance.toLocaleString()}
            </span>
            <span className="text-xs sm:text-2xl lg:text-3xl">{t("point")}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-800 font-semibold text-xs sm:text-sm lg:text-base pt-0.5 sm:pt-2">
            <span>{t("pointsValueLabel")}</span>
            <span dir="ltr">{pointsValue.toFixed(2)}</span>
            <span>﷼</span>
          </div>
        </div>

        {/* Abstract Graphic Representation */}
        <div className="relative text-amber-500 opacity-80 shrink-0 ml-0.5 sm:ml-4 z-10">
          {/* Shrunk graphic container for 350px screens */}
          <div className="relative w-8 h-8 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center">
            <RefreshCcw
              className="w-5 h-5 sm:w-14 sm:h-14 absolute opacity-50"
              strokeWidth={1}
            />
            <div className="w-2.5 h-2.5 sm:w-8 sm:h-8 bg-amber-500 rounded-t-full absolute top-0 right-0" />
            <div className="w-3 h-1.5 sm:w-10 sm:h-6 bg-amber-500 rounded-sm absolute bottom-0.5 left-0" />
          </div>
        </div>
      </div>

      {/* Warning Badge (Expiring Points) */}
      <div className="flex justify-start sm:justify-end mt-2 sm:mt-4 mb-3 sm:mb-8">
        <div className="inline-flex items-center gap-1 sm:gap-2 border border-amber-500 bg-white rounded-full px-2 py-1 sm:px-5 sm:py-2 text-amber-600 shadow-sm w-full sm:w-auto justify-center sm:justify-start">
          <span className="text-xs sm:text-sm font-bold">
            {t("pointsExpiringWarning", { points: expiringPoints, date: expiryDate })}
          </span>
          <AlertCircle className="w-2.5 h-2.5 sm:w-5 sm:h-5 fill-amber-500 text-white" />
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-4 mb-4 sm:mb-10">
        {/* Spent Points Summary */}
        <div className="bg-white border border-gray-100 rounded-lg sm:rounded-3xl p-2.5 sm:p-6 flex items-center justify-between shadow-sm">
          <div className="flex flex-col space-y-0.5 sm:space-y-2">
            <span className="text-gray-900 font-bold text-xs sm:text-sm lg:text-base">
              {t("totalPointsSpent")}
            </span>
            <span
              className="text-red-500 font-bold text-sm sm:text-2xl lg:text-3xl"
              dir="ltr"
            >
              - {displayTotalSpent}
            </span>
          </div>
          <div className="w-6 h-6 sm:w-14 sm:h-14 rounded-full border border-red-200 bg-red-50 flex items-center justify-center shrink-0">
            <Minus
              className="w-3 h-3 sm:w-6 sm:h-6 text-red-500"
              strokeWidth={2}
            />
          </div>
        </div>

        {/* Earned Points Summary */}
        <div className="bg-white border border-gray-100 rounded-lg sm:rounded-3xl p-2.5 sm:p-6 flex items-center justify-between shadow-sm">
          <div className="flex flex-col space-y-0.5 sm:space-y-2">
            <span className="text-gray-900 font-bold text-xs sm:text-sm lg:text-base">
              {t("totalPointsEarned")}
            </span>
            <span
              className="text-green-600 font-bold text-sm sm:text-2xl lg:text-3xl"
              dir="ltr"
            >
              + {displayTotalEarned}
            </span>
          </div>
          <div className="w-6 h-6 sm:w-14 sm:h-14 rounded-full border border-green-300 bg-green-50 flex items-center justify-center shrink-0">
            <Star
              className="w-3 h-3 sm:w-6 sm:h-6 text-green-500"
              strokeWidth={2}
            />
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="bg-gray-50/80 rounded-lg sm:rounded-3xl p-2.5 sm:p-6 lg:p-8">
        <h3 className="text-xs sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-6">
          {t("pointsHistory")}
        </h3>

        {!hasContent ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-4 sm:py-10 text-center">
            <div className="bg-gray-100 p-2 sm:p-4 rounded-full mb-1 sm:mb-3">
              <Inbox
                className="w-4 h-4 sm:w-8 sm:h-8 text-gray-400"
                strokeWidth={1.5}
              />
            </div>
            <p className="text-gray-500 font-medium text-xs sm:text-sm lg:text-base">
              {t("noPreviousPoints")}
            </p>
          </div>
        ) : (
          /* Transactions List */
          <div className="space-y-1.5 sm:space-y-4">
            {apiTransactions.map((transaction: LoyaltyTransaction) => {
              // Dynamic checks based on potential API response fields
              const isEarned =
                transaction.type === 1 || transaction.type_label?.includes(t("earnedType"));
              const displayTitle =
                transaction.type_label || (isEarned ? t("earnedType") : t("redeemedType"));
              const displayDate =
                transaction.created_at || "";
              const rawAmount = Math.abs(Number(transaction.points || 0));
              const displayAmount = isEarned
                ? `${rawAmount}+`
                : `${rawAmount}-`;

              return (
                <div
                  key={transaction.id}
                  className="bg-white rounded-md sm:rounded-2xl p-2 sm:p-4 lg:p-5 flex items-center justify-between shadow-sm transition-shadow hover:shadow-md gap-1 sm:gap-2"
                >
                  {/* Right side: Icon + Title + Date */}
                  <div className="flex items-center gap-1.5 sm:gap-4 min-w-0">
                    {/* Status Icon */}
                    <div
                      className={`flex items-center justify-center w-5 h-5 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full border shrink-0 ${
                        isEarned
                          ? "border-green-200 bg-green-50/30"
                          : "border-red-200 bg-red-50/30"
                      }`}
                    >
                      {isEarned ? (
                        <Star
                          className="w-2.5 h-2.5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-500"
                          strokeWidth={1.5}
                        />
                      ) : (
                        <Minus
                          className="w-2.5 h-2.5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-red-500"
                          strokeWidth={2}
                        />
                      )}
                    </div>

                    {/* Transaction Details */}
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-xs sm:text-sm lg:text-base text-gray-900 truncate">
                        {displayTitle}
                      </span>
                      <span className="text-gray-400 text-xs sm:text-xs lg:text-sm truncate">
                        {displayDate}
                      </span>
                    </div>
                  </div>

                  {/* Left side: Amount */}
                  <div
                    className={`flex items-center font-bold text-xs sm:text-lg lg:text-xl shrink-0 ${
                      isEarned ? "text-green-600" : "text-red-500"
                    }`}
                    dir="ltr"
                  >
                    {displayAmount}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
