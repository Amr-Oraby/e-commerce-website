"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Truck, CreditCard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReturnRequest } from "@/app/types/order";
import { ApiResponse } from "@/app/types/api";
import { useReturns } from "../hooks/useReturns";

type TabType = "returns" | "replacements";

interface ReturnsListProps {
  activeTab: TabType;
}

export default function ReturnsList({ activeTab }: ReturnsListProps) {
  const t = useTranslations("orders");
  // Fetch data from the API hook
  const { data, isPending } = useReturns() as { data: ApiResponse<ReturnRequest[]>, isPending: boolean };

  const rawReturnsList = data?.data || [];
  
  // Filter based on active tab
  // API has type.value === "return" or "exchange" (we map "replacements" to "exchange")
  const expectedType = activeTab === "replacements" ? "exchange" : "return";
  const returnsList = rawReturnsList.filter((item: ReturnRequest) => item.type?.value === expectedType);

  // Check if there are any returns to display
  const hasContent = returnsList && returnsList.length > 0;

  if (isPending) {
    return (
      <div className="w-full flex justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="w-full max-w-7xl mx-auto p-2 sm:p-4 lg:p-6 font-sans"
    >
      {!hasContent ? (
        /* --- Empty State UI (Matches image_0686cf.png) --- */
        <div className="flex flex-col items-center justify-center py-12 sm:py-20 text-center px-4">
          {/* Illustration Container */}
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 mb-6 sm:mb-8">
            <Image
              src="/images/no-returns.png" /* Replace with the actual image path from your assets */
              alt={t("noOrdersYet")}
              fill
              className="object-contain"
            />
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
            {t("noOrdersYet")}
          </h3>

          <p className="text-gray-500 text-xs sm:text-sm md:text-base font-medium mb-6 sm:mb-8">
            {t("ordersWillAppearHere")}
          </p>

          <button className="w-full sm:w-auto bg-[#f5a522] hover:bg-[#df9011] text-white font-bold py-3 sm:py-3.5 px-12 sm:px-16 rounded-full text-sm sm:text-base transition-colors shadow-sm">
            {t("startShopping")}
          </button>
        </div>
      ) : (
        /* --- Original List UI --- */
        <div className="space-y-4 sm:space-y-6">
          {returnsList.map(
            (item: ReturnRequest) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 lg:p-6 shadow-sm"
              >
                {/* --- Top Section --- */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 lg:flex lg:flex-row lg:justify-between lg:items-center">
                  {/* Order Number */}
                  <div className="flex flex-col space-y-1">
                    <span className="text-gray-900 font-bold text-xs sm:text-sm lg:text-base">
                      {t("orderNumber")}
                    </span>
                    <span
                      className="text-amber-500 font-bold text-xs sm:text-sm lg:text-base"
                      dir="ltr"
                    >
                      {item.order?.order_number || `#${item.order_id}`}
                    </span>
                  </div>

                  {/* Order Date */}
                  <div className="flex flex-col space-y-1">
                    <span className="text-gray-900 font-bold text-xs sm:text-sm lg:text-base">
                      {t("orderDate")}
                    </span>
                    <span className="text-gray-500 text-xs sm:text-xs lg:text-sm">
                      {item.created_at ? new Date(item.created_at).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" }) : ""}
                    </span>
                  </div>

                  {/* Order Status */}
                  <div className="flex flex-col space-y-1">
                    <span className="text-gray-900 font-bold text-xs sm:text-sm lg:text-base">
                      {t("orderStatus")}
                    </span>
                    <span className="text-gray-500 text-xs sm:text-xs lg:text-sm">
                      {item.status?.label || ""}
                    </span>
                  </div>

                  {/* Order Reason */}
                  <div className="flex flex-col space-y-1">
                    <span className="text-gray-900 font-bold text-xs sm:text-sm lg:text-base">
                      {t("orderReason")}
                    </span>
                    <span className="text-gray-500 text-xs sm:text-xs lg:text-sm">
                      {typeof item.reason === 'string'
                        ? (item.reason === "changed_mind" ? t("changedMind") : item.reason)
                        : (item.reason?.name || item.reason?.other_reason || "")}
                    </span>
                  </div>

                  {/* Action Button */}
                  <div className="col-span-2 lg:col-span-1 flex justify-start lg:justify-end mt-2 lg:mt-0">
                    <Link
                      href={`/profile/returns/${item.id}`}
                      className="w-full lg:w-auto bg-[#111111] hover:bg-black text-white font-bold py-2.5 sm:py-3 px-8 sm:px-10 rounded-full text-xs sm:text-sm transition-colors text-center inline-block"
                    >
                      {t("viewOrder")}
                    </Link>
                  </div>
                </div>

                {/* --- Divider --- */}
                <hr className="border-dashed border-gray-200 my-4 sm:my-5 lg:my-6" />

                {/* --- Bottom Section --- */}
                <div className="flex flex-col space-y-3 sm:space-y-4">
                  {/* Product Info */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gray-100 rounded-full flex-shrink-0 overflow-hidden relative border border-gray-100">
                      {item.items?.[0]?.product?.image?.url ? (
                        <Image src={item.items[0].product.image.url} alt={item.items[0].product.name || ""} fill className="object-cover" />
                      ) : (
                        <div className="absolute inset-0 bg-green-800/10 flex items-center justify-center text-xs text-gray-400">
                          {t("image")}
                        </div>
                      )}
                    </div>
                    <span className="text-gray-900 font-bold text-sm sm:text-sm lg:text-base leading-tight">
                      {item.items?.[0]?.product?.name || t("productNameNotAvailable")}
                    </span>
                  </div>

                  {/* Address & Payment Info */}
                  <div className="flex flex-col space-y-2 sm:space-y-2.5">
                    {/* Return Destination */}
                    <div className="flex items-start gap-1.5 sm:gap-2">
                      <Truck
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-amber-500 shrink-0 mt-0.5"
                        strokeWidth={2}
                      />
                      <div className="text-xs sm:text-xs lg:text-sm leading-relaxed">
                        <span className="text-gray-400">{t("returnDestination")} </span>
                        <span className="text-gray-600 font-medium">
                          {item.order?.address ? 
                            `${item.order.address.city?.name || ""}, ${item.order.address.country?.name || ""} - ${item.order.address.district?.name || ""}, ${item.order.address.building_name || ""}` 
                            : t("addressNotAvailable")}
                        </span>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="flex items-start gap-1.5 sm:gap-2">
                      <CreditCard
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-amber-500 shrink-0 mt-0.5"
                        strokeWidth={2}
                      />
                      <div className="text-xs sm:text-xs lg:text-sm">
                        <span className="text-gray-400">{t("paidVia")} </span>
                        <span className="text-gray-600 font-medium">
                          {item.order?.payment_method?.label || t("paymentMethodNotAvailable")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}
