"use client";

import React, { useState } from "react";
import { Truck, CreditCard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useOrders } from "../hooks/useOrders";
import { Order } from "@/app/types/order";
import Spinner from "@/components/Spinner";

// Filter categories mapped to API status codes
// 1 = Pending, 5 = Cancelled (Based on your JSON)
const FILTER_TABS = [
  { id: 1, labelKey: "pendingOrders" },
  { id: 3, labelKey: "onTheWayOrders" },
  { id: 4, labelKey: "completedOrders" },
  { id: 5, labelKey: "cancelledOrders" },
];

export default function OrdersCard() {
  const t = useTranslations("orders");
  // استخدام id كحالة افتراضية (1 = طلبات قيد التجهيز)
  const [activeTabId, setActiveTabId] = useState<number>(1);

  // Fetch data from the API hook with the active tab ID
  const { data, isPending } = useOrders(activeTabId);

  // Extract the inner orders array
  const apiOrders = data?.data?.orders || [];

  // Check if there's any data at all
  const hasAnyOrders = apiOrders.length > 0;

  // The API already filters the orders, so we don't need to filter them on the client
  const filteredOrders = apiOrders;

  // دالة مساعدة لترجمة طرق الدفع
  const getPaymentMethodLabel = (label: string) => {
    switch (label) {
      case "PaymentGateway":
        return t("onlinePayment");
      case "CashOnDelivery":
        return t("cashOnDelivery");
      default:
        return label;
    }
  };

  // دالة مساعدة لتحديد وجهة التوصيل
  const getDeliveryDestination = (order: Order) => {
    if (order.delivery_type === 2 && order.branch) {
      return t("storePickup", { branch: order.branch.name });
    }
    if (order.address) {
      return `${order.address.city?.name || ""} - ${order.address.district?.name || ""}`;
    }
    return order.delivery_type_label;
  };

  return (
    <div
      dir="rtl"
      className="w-full max-w-7xl mx-auto p-1.5 sm:p-4 lg:p-6 font-sans"
    >
      {/* --- Filter Header (Tabs) --- */}
      <div className="flex items-center flex-wrap overflow-x-auto hide-scrollbar gap-1.5 sm:gap-3 mb-3 sm:mb-6 pb-2">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={`whitespace-nowrap px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 border ${activeTabId === tab.id
              ? "bg-[#fff9ed] border-amber-400 text-amber-500 shadow-sm"
              : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </div>

      {/* --- Orders List --- */}
      {isPending ? (
        <div className="flex justify-center items-center py-20">
          <Spinner />
        </div>
      ) : filteredOrders.length === 0 ? (
        /* --- Empty State UI --- */
        <div className="flex flex-col items-center justify-center py-12 sm:py-20 text-center px-4">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 mb-6 sm:mb-8">
            <Image
              src="/images/no-returns.png"
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
        /* --- Render Filtered Cards --- */
        <div className="space-y-3 sm:space-y-6">
          {filteredOrders.map((order: Order) => {
            // جلب روابط الصور من المنتجات داخل الطلب
            const images =
              order.items
                ?.map((item) => item.product?.image?.url)
                .filter(Boolean) || [];

            return (
              <div
                key={order.id}
                className="bg-white border border-gray-200 rounded-xl sm:rounded-3xl p-3 sm:p-6 shadow-sm"
              >
                {/* --- Top Section --- */}
                <div className="flex flex-col space-y-2 lg:flex-row lg:justify-between lg:items-center lg:space-y-0 w-full">
                  {/* Order Number */}
                  <div className="flex justify-between items-center w-full lg:w-auto lg:flex-col lg:items-start lg:space-y-1">
                    <span className="text-gray-900 font-bold text-xs sm:text-xs lg:text-base">
                      {t("orderNumber")}
                    </span>
                    <span
                      className="text-amber-500 font-bold text-xs sm:text-xs lg:text-base"
                      dir="ltr"
                    >
                      {order.order_number}
                    </span>
                  </div>

                  {/* Order Date */}
                  <div className="flex justify-between items-center w-full lg:w-auto lg:flex-col lg:items-start lg:space-y-1">
                    <span className="text-gray-900 font-bold text-xs sm:text-xs lg:text-base">
                      {t("orderDate")}
                    </span>
                    <span
                      className="text-gray-500 text-xs sm:text-xs lg:text-sm"
                      dir="ltr"
                    >
                      {order.created_at.split(" ")[0]}{" "}
                      {/* استخراج التاريخ فقط */}
                    </span>
                  </div>

                  {/* Order Status */}
                  <div className="flex justify-between items-center w-full lg:w-auto lg:flex-col lg:items-start lg:space-y-1">
                    <span className="text-gray-900 font-bold text-xs sm:text-xs lg:text-base">
                      {t("orderStatus")}
                    </span>
                    <span className="text-gray-500 text-xs sm:text-xs lg:text-sm">
                      {FILTER_TABS.find((tab) => tab.id === order.status) 
                        ? t(FILTER_TABS.find((tab) => tab.id === order.status)!.labelKey) 
                        : order.status_label}
                    </span>
                  </div>

                  {/* Order Total Value */}
                  <div className="flex justify-between items-center w-full lg:w-auto lg:flex-col lg:items-start lg:space-y-1">
                    <span className="text-gray-900 font-bold text-xs sm:text-xs lg:text-base">
                      {t("totalOrderValue")}
                    </span>
                    <div
                      className="flex items-center gap-1 text-gray-500 font-medium text-xs sm:text-xs lg:text-sm"
                      dir="ltr"
                    >
                      <span>{order.total.toFixed(2)}</span>
                      <span className="text-xs sm:text-xs">{t("currency")}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2 lg:pt-0 w-full lg:w-auto">
                    <Link
                      href={`/profile/orders/${order.id}`}
                      className="block text-center w-full lg:w-auto bg-[#111111] hover:bg-black text-white font-bold py-2 sm:py-3 px-6 sm:px-10 rounded-full text-xs sm:text-sm transition-colors shadow-sm"
                    >
                      {t("viewOrder")}
                    </Link>
                  </div>
                </div>

                {/* --- Divider --- */}
                <hr className="border-dashed border-gray-200 my-3 sm:my-5 lg:my-6" />

                {/* --- Bottom Section --- */}
                <div className="flex flex-col space-y-2.5 sm:space-y-4">
                  {/* Overlapping Images (Pushed to the Left) */}
                  <div className="flex justify-end -space-x-2 -space-x-reverse rtl:space-x-reverse">
                    {images.slice(0, 4).map((image, idx) => (
                      <div
                        key={idx}
                        className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-white rounded-full border-2 border-white overflow-hidden relative shadow-sm shrink-0 flex items-center justify-center"
                      >
                        <Image
                          src={image}
                          alt="Product"
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                    {images.length > 4 && (
                      <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gray-100 rounded-full border-2 border-white overflow-hidden relative shadow-sm shrink-0 flex items-center justify-center text-xs font-bold text-gray-500">
                        +{images.length - 4}
                      </div>
                    )}
                  </div>

                  {/* Product Summary Text */}
                  <div className="text-right">
                    <span className="text-gray-900 font-bold text-xs sm:text-sm lg:text-base leading-tight">
                      {t("containsProducts", { count: order.items_count || 0 })}
                    </span>
                  </div>

                  {/* Address & Payment Info */}
                  <div className="flex flex-col space-y-1.5 sm:space-y-2.5 mt-1">
                    {/* Delivery Destination */}
                    <div className="flex items-start gap-1.5 sm:gap-2">
                      <Truck
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-amber-500 shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <div className="text-xs sm:text-xs lg:text-sm leading-relaxed text-right w-full">
                        <span className="text-gray-400">{t("deliveryDestination")} </span>
                        <span className="text-gray-600 font-medium">
                          {getDeliveryDestination(order)}
                        </span>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="flex items-start gap-1.5 sm:gap-2">
                      <CreditCard
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-amber-500 shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <div className="text-xs sm:text-xs lg:text-sm text-right w-full">
                        <span className="text-gray-400">{t("paidVia")} </span>
                        <span className="text-gray-600 font-medium">
                          {getPaymentMethodLabel(order.payment_method_label)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
