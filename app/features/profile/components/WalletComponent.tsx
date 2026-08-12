"use client";

import React from "react";
import { Wallet, ArrowUp, ArrowDown, Inbox } from "lucide-react";
import { useWallet } from "../hooks/useWallet";
import { WalletData, WalletTransaction } from "@/app/types/profile";
import { PaginationLinks, PaginationMeta } from "@/app/types/api";
import { ApiResponse } from "@/app/types/api";
import { useTranslations } from "next-intl";

export default function WalletComponent() {
  const t = useTranslations("profile");
  // Fetch data using your hook
  const { data: response, isPending } = useWallet() as { data: ApiResponse<WalletData>, isPending: boolean };
  const data = response?.data;

  // Extract wallet balance (default to 0 if not found)
  const balance = data?.wallet?.balance || 0;

  // Extract transactions array (default to empty array if not found)
  const transactions = data?.transactions?.transactions || [];

  // Check if there are any transactions
  const hasContent = transactions.length > 0;

  return (
    <div
      dir="rtl"
      className="max-w-4xl w-full mx-auto p-2 sm:p-4 lg:p-6 font-sans"
    >
      {/* Header Section */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
          {t("walletTitle")}
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm lg:text-base">
          {t("walletDesc")}
        </p>
      </div>

      {/* Balance Card */}
      <div className="bg-[#fff9ed] rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 lg:p-10 flex items-center justify-between mb-5 sm:mb-8 shadow-sm">
        <div className="flex flex-col space-y-1 sm:space-y-2">
          <span className="text-gray-700 font-medium text-xs sm:text-sm lg:text-base">
            {t("currentBalance")}
          </span>
          <div className="flex items-center gap-1 sm:gap-1.5 text-amber-500 font-bold text-2xl sm:text-4xl lg:text-5xl">
            <span dir="ltr">{balance.toLocaleString()}</span>
            <span className="text-lg sm:text-2xl lg:text-3xl">﷼</span>
          </div>
          <span className="text-gray-500 text-xs sm:text-xs lg:text-sm">
            {t("refundBalanceNote")}
          </span>
        </div>

        {/* Wallet Icon (Responsive size) */}
        <div className="text-amber-500 bg-amber-100/50 p-2 sm:p-5 lg:p-6 rounded-full shrink-0">
          <Wallet
            className="w-6 h-6 sm:w-12 sm:h-12 lg:w-16 lg:h-16"
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div className="bg-gray-50/80 rounded-2xl sm:rounded-3xl p-3 sm:p-6 lg:p-8">
        <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900 mb-3 sm:mb-6">
          {t("recentTransactions")}
        </h3>

        {!hasContent ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-6 sm:py-10 text-center">
            <div className="bg-gray-100 p-3 sm:p-4 rounded-full mb-2 sm:mb-3">
              <Inbox
                className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400"
                strokeWidth={1.5}
              />
            </div>
            <p className="text-gray-500 font-medium text-xs sm:text-sm lg:text-base">
              {t("noPreviousTransactions")}
            </p>
          </div>
        ) : (
          /* Transactions List */
          <div className="space-y-2.5 sm:space-y-4">
            {transactions.map((transaction: WalletTransaction) => {
              // Adjust this logic based on what your API specifically returns for refund types
              const isRefund = transaction.type === 1 || transaction.type_label === t("refundFallback");

              // Handle potential variations in API keys for title and date
              const displayTitle =
                transaction.type_label ||
                transaction.description ||
                (isRefund ? t("refundFallback") : t("deductionFallback"));
              const displayDate = transaction.created_at || "";

              // Ensure amount is formatted nicely with + or - if the API only returns raw numbers
              const rawAmount = Number(transaction.amount || 0).toFixed(2);
              const displayAmount = isRefund
                ? `+${rawAmount}`
                : `-${rawAmount}`;

              return (
                <div
                  key={transaction.id}
                  className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 lg:p-5 flex items-center justify-between shadow-sm transition-shadow hover:shadow-md gap-1.5 sm:gap-2"
                >
                  {/* Right side: Icon + Title + Date */}
                  <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                    {/* Arrow Icon */}
                    <div
                      className={`flex items-center justify-center w-7 h-7 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full border shrink-0 ${
                        isRefund
                          ? "border-green-200 text-green-500 bg-green-50/30"
                          : "border-red-200 text-red-500 bg-red-50/30"
                      }`}
                    >
                      {isRefund ? (
                        <ArrowUp
                          className="w-3.5 h-3.5 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                          strokeWidth={2}
                        />
                      ) : (
                        <ArrowDown
                          className="w-3.5 h-3.5 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                          strokeWidth={2}
                        />
                      )}
                    </div>

                    {/* Transaction Details */}
                    <div className="flex flex-col space-y-0.5 min-w-0">
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
                    className={`flex items-center gap-0.5 sm:gap-1 font-bold text-xs sm:text-base lg:text-lg shrink-0 ${
                      isRefund ? "text-green-600" : "text-red-600"
                    }`}
                    dir="ltr"
                  >
                    <span>{displayAmount}</span>
                    <span className="text-xs sm:text-sm lg:text-base mt-0.5">
                      ﷼
                    </span>
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
