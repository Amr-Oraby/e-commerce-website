"use client";

import React from "react";
import { ArrowRight, FileDown, Truck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useReturnDetails } from "../hooks/useReturnDetails";
import Spinner from "@/components/Spinner";
import { ReturnRequest, ReturnItem } from "@/app/types/order";
import { ApiResponse } from "@/app/types/api";

export default function ReturnDetailsComponent({ returnId }: { returnId: string }) {
  const router = useRouter();
  const { data, isPending } = useReturnDetails(returnId) as { data: ApiResponse<ReturnRequest>, isPending: boolean };

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Spinner />
      </div>
    );
  }

  const details = data?.data;

  if (!details) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500">تعذر العثور على تفاصيل الطلب</p>
      </div>
    );
  }

  const orderDate = details.created_at
    ? new Date(details.created_at).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    : "";

  const displayReason = typeof details.reason === "string"
    ? (details.reason === "changed_mind" ? "تغيير الرأي" : details.reason)
    : (details.reason?.name || details.reason?.other_reason || "");

  const returnAddress = details.address
    ? `${details.address.city?.name || ""}, ${details.address.country?.name || ""} - ${details.address.district?.name || ""}, ${details.address.building_name || ""}`
    : "العنوان غير متوفر";

  // Check if we have any user-uploaded image for the return
  const firstUploadedImage = details.items?.[0]?.image?.url;

  return (
    <div dir="rtl" className="w-full max-w-7xl mx-auto p-2 sm:p-4 lg:p-6 font-sans">
      {/* --- Top Bar --- */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          تفاصيل الطلب
        </h1>
      </div>

      {/* --- Top Status Card --- */}
      <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-sm">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-2">
          {/* Order Number */}
          <div className="flex flex-col space-y-1 sm:space-y-1.5">
            <span className="text-gray-900 font-bold text-xs sm:text-sm lg:text-base">
              رقم الطلب
            </span>
            <span
              className="text-amber-500 font-bold text-xs sm:text-sm lg:text-base"
              dir="ltr"
            >
              {details.order?.order_number || `#${details.order_id}`}
            </span>
          </div>

          {/* Order Date */}
          <div className="flex flex-col space-y-1 sm:space-y-1.5">
            <span className="text-gray-900 font-bold text-xs sm:text-sm lg:text-base">
              تاريخ الطلب
            </span>
            <span className="text-gray-500 text-xs sm:text-xs lg:text-sm">
              {orderDate}
            </span>
          </div>

          {/* Order Status */}
          <div className="flex flex-col space-y-1 sm:space-y-1.5">
            <span className="text-gray-900 font-bold text-xs sm:text-sm lg:text-base">
              حالة الطلب
            </span>
            <span className="text-gray-500 text-xs sm:text-xs lg:text-sm">
              {details.status?.label || ""}
            </span>
          </div>

          {/* Order Reason */}
          <div className="flex flex-col space-y-1 sm:space-y-1.5">
            <span className="text-gray-900 font-bold text-xs sm:text-sm lg:text-base">
              سبب الطلب
            </span>
            <span className="text-gray-500 text-xs sm:text-xs lg:text-sm">
              {displayReason}
            </span>
          </div>
        </div>
      </div>

      {/* --- Main Content Split --- */}
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">

        {/* Right Column: Products & Images (flex-grow) */}
        <div className="flex-1 flex flex-col space-y-6 sm:space-y-8">

          {/* Products List Card */}
          <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
              المنتجات ({details.items?.length || 0})
            </h2>
            <div className="space-y-4">
              {details.items?.map((item: ReturnItem) => (
                <div key={item.id} className="flex items-center justify-between gap-4 py-2">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-50 rounded-xl overflow-hidden relative border border-gray-100 flex-shrink-0">
                      {item.product?.image?.url ? (
                        <Image
                          src={item.product.image.url}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                          صورة
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm sm:text-base text-gray-900 line-clamp-2">
                        {item.product?.name || "اسم المنتج"}
                      </span>
                    </div>
                  </div>
                  <div className="text-left font-bold text-sm sm:text-base text-gray-900 whitespace-nowrap">
                    {item.subtotal || 0} ﷼
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Uploaded Image Section */}
          {firstUploadedImage && (
            <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                صورة المنتج
              </h2>
              <div className="relative w-full aspect-square max-w-sm mx-auto sm:max-w-md rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src={firstUploadedImage}
                  alt="صورة المنتج المرفقة"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Return Destination Banner */}
          <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm flex items-start gap-2 sm:gap-3">
            <Truck
              className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 shrink-0 mt-0.5"
              strokeWidth={2}
            />
            <div className="text-sm sm:text-base leading-relaxed">
              <span className="text-gray-400">وجهة الاسترجاع: </span>
              <span className="text-gray-700 font-medium">{returnAddress}</span>
            </div>
          </div>
        </div>

        {/* Left Column: Order Summary (fixed width on desktop) */}
        <div className="w-full lg:w-[350px] xl:w-[400px] flex-shrink-0">
          <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm sticky top-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
              ملخص الطلب
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm sm:text-base">
                <span className="text-gray-500 font-medium">المجموع الفرعي</span>
                <span className="text-gray-900 font-bold">{details.summary?.subtotal || 0} ﷼</span>
              </div>

              <div className="flex justify-between items-center text-sm sm:text-base">
                <span className="text-gray-500 font-medium">عدد المنتجات</span>
                <span className="text-gray-900 font-bold">{details.summary?.quantity || 0}</span>
              </div>

              <div className="flex justify-between items-center text-sm sm:text-base">
                <span className="text-gray-500 font-medium">رسوم الشحن</span>
                <span className="text-gray-900 font-bold">{details.summary?.shipping_price || 0} ﷼</span>
              </div>

              <div className="flex justify-between items-center text-sm sm:text-base">
                <span className="text-gray-500 font-medium">قيمة الخصم</span>
                <span className="text-gray-900 font-bold">{details.summary?.discount || 0} ﷼</span>
              </div>

              <hr className="border-dashed border-gray-200 my-4" />

              <div className="flex justify-between items-center text-base sm:text-lg">
                <span className="text-gray-900 font-bold">الإجمالي</span>
                <span className="text-gray-900 font-bold">{details.summary?.refunded_amount || 0} ﷼</span>
              </div>

              {/* Assuming same invoice format is desired for now */}
              <button
                type="button"
                className="w-full mt-6 bg-[#111111] hover:bg-black text-white font-bold py-3.5 sm:py-4 px-4 rounded-full text-sm sm:text-base transition-colors flex items-center justify-center gap-2"
              >
                <FileDown className="w-4 h-4 sm:w-5 sm:h-5" />
                تحميل الفاتورة
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
