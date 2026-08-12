"use client";

import { useState } from "react";
import { ArrowRight, FileDown, XCircle, RefreshCcw, Undo2 } from "lucide-react";
import { useOrderDetails } from "../hooks/useOrderDetails";
import { useCancelOrder } from "../hooks/useCancelOrder";
import { useOrderInvoice } from "../hooks/useOrderInvoice";
import { useReorder } from "../hooks/useReorder";
import dynamic from "next/dynamic";
const ReturnRequestDialog = dynamic(() => import("./ReturnRequestDialog"));
import Spinner from "@/components/Spinner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Order, OrderItem } from "@/app/types/order";
import { useTranslations } from "next-intl";

export default function OrderDetailsComponent({ orderId }: { orderId: string }) {
  const router = useRouter();
  const { data, isPending } = useOrderDetails(orderId);
  const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder(orderId);
  const { mutate: getInvoice, isPending: isGettingInvoice } = useOrderInvoice(orderId);
  const { mutate: reorder, isPending: isReordering } = useReorder(orderId);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showReturnDialog, setShowReturnDialog] = useState(false);
  const t = useTranslations("profile");

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Spinner />
      </div>
    );
  }

  const order: Order | undefined = data?.data;

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-gray-500 font-medium">{t("orderNotFound")}</p>
      </div>
    );
  }

  const getPaymentMethodLabel = (label: string) => {
    switch (label) {
      case "PaymentGateway":
        return t("onlinePayment");
      case "CashOnDelivery":
        return t("cashOnDelivery");
      default:
        return label || t("cashOnDelivery");
    }
  };

  const getStatusLabel = (statusId: number, statusLabel: string) => {
    switch (statusId) {
      case 1:
        return t("processing");
      case 2:
        return t("onTheWay");
      case 3:
      case 4:
        return t("completed");
      case 5:
        return t("cancelled");
      default:
        return statusLabel || t("processing");
    }
  };

  const totalDiscount = (order.discount_amount || 0) + (order.coupon_discount || 0) + (order.loyalty_points_discount || 0);
  const isCancellable = order.status === 1;
  const isCanceled = order.status === 5;
  const isCompleted = order.status === 4;

  const handleConfirmCancel = () => {
    cancelOrder(undefined, {
      onSuccess: () => setShowCancelDialog(false),
    });
  };

  const handleDownloadInvoice = () => {
    getInvoice(undefined, {
      onSuccess: (res) => {
        if (res?.data?.url) {
          window.open(res.data.url, "_blank");
        }
      }
    });
  };

  const handleReorder = () => {
    reorder(undefined, {
      onSuccess: () => {
        router.push("/cart");
      }
    });
  };

  return (
    <>
      <div className="w-full font-sans text-gray-900 pb-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-black transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">{t("orderDetails")}</h1>
        </div>

        {/* Top Info Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-sm flex flex-wrap justify-between items-start md:items-center gap-6 text-center">
          <div className="flex flex-col gap-2 w-[45%] md:w-auto items-center">
            <span className="font-bold text-gray-900">{t("orderNumber")}</span>
            <span className="text-amber-500 font-bold" dir="ltr">{order.order_number}</span>
          </div>
          <div className="flex flex-col gap-2 w-[45%] md:w-auto items-center">
            <span className="font-bold text-gray-900">{t("orderDate")}</span>
            <span className="text-gray-500 text-sm" dir="ltr">{order.created_at?.split(" ")[0]}</span>
          </div>
          <div className="flex flex-col gap-2 w-[45%] md:w-auto items-center">
            <span className="font-bold text-gray-900">{t("orderStatus")}</span>
            <span className="text-gray-500 text-sm">{getStatusLabel(order.status, order.status_label)}</span>
          </div>
          <div className="flex flex-col gap-2 w-[45%] md:w-auto items-center">
            <span className="font-bold text-gray-900">{t("paymentMethod")}</span>
            <span className="text-gray-500 text-sm">{getPaymentMethodLabel(order.payment_method_label)}</span>
          </div>
        </div>

        {/* Two Columns Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Right Column: Products List */}
          <div className="flex-1 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-6">{t("products")} ({order.items?.length || 0})</h2>

            <div className="flex flex-col gap-6">
              {order.items?.map((item: OrderItem) => (
                <div key={item.id} className="flex items-center justify-between gap-4">
                  {/* Product Image & Name */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative shrink-0">
                      <div className="w-16 h-16 bg-gray-50 rounded-full border border-gray-100 overflow-hidden flex items-center justify-center p-2">
                        <Image
                          src={item.product?.image?.url || "/images/new-arrival.png"}
                          alt={item.product?.name || "Product"}
                          width={64}
                          height={64}
                          className="object-contain w-full h-full"
                        />
                      </div>
                      {/* Quantity Badge */}
                      <div className="absolute -top-1 -right-2 bg-[#ffedd5] text-amber-600 font-bold text-[10px] px-2 py-0.5 rounded-full border border-white">
                        X {item.amount}
                      </div>
                    </div>
                    <span className="font-bold text-sm text-gray-800 line-clamp-2 max-w-[200px]">
                      {item.product?.name}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="font-bold text-sm shrink-0" dir="ltr">
                    <span className="mr-1 text-xs font-normal">﷼</span>
                    {item.price_after_discount > 0 ? item.price_after_discount?.toFixed(2) : item.main_price?.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left Column: Order Summary */}
          <div className="w-full lg:w-80 shrink-0 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm h-fit">
            <h2 className="text-lg font-bold mb-6">{t("orderSummary")}</h2>

            <div className="flex flex-col gap-4 text-sm font-medium mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{t("subTotal")}</span>
                <div dir="ltr"><span className="mx-1 text-xs text-gray-500">SAR</span>{order.main_price?.toFixed(2) || "0.00"}</div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">{t("productsCount")}</span>
                <span>{order.items?.reduce((acc: number, curr: OrderItem) => acc + curr.amount, 0) || 0}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">{t("shippingFees")}</span>
                <div dir="ltr"><span className="mx-1 text-xs text-gray-500">SAR</span>{order.shipping_cost?.toFixed(2) || "0.00"}</div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">{t("discountValue")}</span>
                <div dir="ltr"><span className="mx-1 text-xs text-gray-500">SAR</span>{totalDiscount.toFixed(2)}</div>
              </div>
            </div>

            <div className="flex justify-between items-center font-bold text-lg mb-8 pt-4 border-t border-gray-100">
              <span>{t("total")}</span>
              <div dir="ltr"><span className="mx-1 text-sm text-gray-600 font-normal">SAR</span>{order.amount_to_pay?.toFixed(2) || order.main_price?.toFixed(2)}</div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleDownloadInvoice}
                disabled={isGettingInvoice}
                className="w-full bg-[#111111] hover:bg-black text-white rounded-full py-3.5 px-4 font-bold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGettingInvoice ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <FileDown className="w-4 h-4" />
                )}
                {t("downloadInvoice")}
              </button>

              {isCancellable && (
                <button
                  onClick={() => setShowCancelDialog(true)}
                  className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full py-3 px-4 font-bold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  {t("cancelOrder")}
                </button>
              )}

              {isCanceled && (
                <button
                  onClick={handleReorder}
                  disabled={isReordering}
                  className="w-full text-amber-500 hover:text-amber-600 hover:bg-amber-50 rounded-full py-3 px-4 font-bold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isReordering ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
                  ) : (
                    <RefreshCcw className="w-4 h-4" />
                  )}
                  {t("reorder")}
                </button>
              )}

              {isCompleted && (
                <button
                  onClick={() => setShowReturnDialog(true)}
                  className="w-full border-2 border-[#111111] text-[#111111] hover:bg-gray-50 rounded-full py-3 px-4 font-bold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Undo2 className="w-4 h-4" />
                  {t("returnRequest")}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Dialog */}
      {showCancelDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
          onClick={() => setShowCancelDialog(false)}
        >
          <div
            dir="rtl"
            className="bg-white rounded-3xl p-10 w-[90%] max-w-md flex flex-col items-center text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Trash Icon */}
            <div className="mb-6">
              <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Bin body */}
                <rect x="18" y="28" width="54" height="52" rx="8" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="3" />
                {/* Lid */}
                <rect x="12" y="20" width="66" height="10" rx="5" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="3" />
                {/* Handle */}
                <path d="M34 20V15a4 4 0 014-4h14a4 4 0 014 4v5" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                {/* Lines inside bin */}
                <line x1="33" y1="42" x2="33" y2="68" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                <line x1="45" y1="42" x2="45" y2="68" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                <line x1="57" y1="42" x2="57" y2="68" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                {/* Steam/bubbles */}
                <circle cx="45" cy="10" r="3" fill="#F59E0B" opacity="0.5" />
                <circle cx="37" cy="7" r="2" fill="#F59E0B" opacity="0.35" />
                <circle cx="53" cy="7" r="2" fill="#F59E0B" opacity="0.35" />
              </svg>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t("cancelTitle")}</h2>

            {/* Subtitle */}
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              {t("cancelDesc")}
            </p>

            {/* Keep Order Button - filled amber */}
            <button
              onClick={() => setShowCancelDialog(false)}
              className="w-full bg-amber-400 hover:bg-amber-500 text-white font-bold py-4 rounded-full text-base transition-colors mb-4"
            >
              {t("keepOrder")}
            </button>

            {/* Confirm Cancel Button - outlined amber */}
            <button
              onClick={handleConfirmCancel}
              disabled={isCancelling}
              className="w-full border-2 border-amber-400 text-amber-500 hover:bg-amber-50 font-bold py-4 rounded-full text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isCancelling ? (
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
              ) : (
                t("confirmCancel")
              )}
            </button>
          </div>
        </div>
      )}

      {/* Return / Exchange Request Dialog */}
      <ReturnRequestDialog
        isOpen={showReturnDialog}
        onClose={() => setShowReturnDialog(false)}
        order={order}
      />
    </>
  );
}
