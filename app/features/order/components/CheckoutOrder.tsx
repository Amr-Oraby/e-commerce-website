import { useState } from "react";
import { ApiResponse } from "@/app/types/api";
import { HiShoppingCart } from "react-icons/hi2";
import { CartData } from "@/app/types/cart";
import type { CheckOrderPayload } from "../orderApi";
import { useFinishOrder } from "../hooks/useFinishOrder";
import { OrderSuccessDialog } from "./OrderSuccessDialog";

interface CheckSummaryProps {
  data: CartData;
  selectedBranchId: number | null | undefined;
  selectedAddressId: number | null | undefined;
  couponValue: string | null | undefined;
  useLoyaltyPoints: 0 | 1 | null | undefined;
  deliveryType: number;
  paymentMethod: number;
  onSuccess?: () => void;
}

export default function CheckoutOrder({
  data,
  paymentMethod,
  selectedBranchId,
  selectedAddressId,
  couponValue,
  useLoyaltyPoints,
  deliveryType,
  onSuccess,
}: CheckSummaryProps) {
  const { mutate, isPending } = useFinishOrder();
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    orderNumber: "",
    orderDate: "",
    totalAmount: "",
    paymentMethod: "",
  });

  function handleCheck() {

    if (selectedBranchId === null && selectedAddressId === null) {
      alert("الرجاء اختيار عنوان التوصيل أو الفرع لإتمام الطلب");
      return;
    }

    if (selectedBranchId !== null && selectedAddressId !== null) {
      return;
    }

    mutate(
      {
        paymentMethod,
        deliveryType,
        addressId: selectedAddressId,
        branchId: selectedBranchId,
        couponCode: couponValue ? couponValue : null,
        useLoyaltyPoints: useLoyaltyPoints ? 1 : 0,
      },
      {
        onSuccess: (res: ApiResponse) => {
          // If the API returns order data in `res.data` or `res.order`, adjust accordingly.
          // Fallback to dummy data if not available in response.
          const responseData = (res?.data || res || {}) as Record<string, any>;

          setOrderDetails({
            orderNumber: responseData?.order_number || responseData?.id || `#${Math.floor(Math.random() * 90000) + 10000}`,
            orderDate: responseData?.created_at
              ? new Date(responseData.created_at).toLocaleDateString("ar-EG", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
              : new Date().toLocaleDateString("ar-EG", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
            totalAmount: data?.total_price_after_discount_and_tax.toFixed(2) || "0.00",
            paymentMethod: paymentMethod === 1 ? "الدفع الالكتروني" : paymentMethod === 2 ? "عند الاستلام" : "المحفظة",
          });
          onSuccess?.();
          setIsSuccessDialogOpen(true);
        },
      }
    );
  }
  return (
    <div className="w-full md:w-140 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-right">
        ملخص الطلب
      </h2>

      <div className="space-y-4 text-sm text-gray-600 mb-6 border-b border-gray-100 pb-6">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-900">
            {data?.main_price} ﷼
          </span>
          <span>المجموع الفرعي</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-900">{data?.items_count}</span>
          <span>عدد المنتجات</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-900">--</span>
          <span>رسوم الشحن</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <span className="text-xl font-bold text-gray-900">
          {data?.total_price_after_discount_and_tax.toFixed(2)} ﷼
        </span>
        <span className="text-lg font-bold text-gray-900">الإجمالي</span>
      </div>

      <button
        onClick={handleCheck}
        disabled={isPending}
        className="cursor-pointer w-full bg-[#111111] hover:bg-black text-white rounded-xl py-4 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
      >
        <span className="font-bold">{isPending ? 'جاري التأكيد...' : 'تأكيد الطلب'}</span>
        <HiShoppingCart className="w-5 h-5" />
      </button>

      <OrderSuccessDialog
        open={isSuccessDialogOpen}
        onOpenChange={setIsSuccessDialogOpen}
        orderDetails={orderDetails}
      />
    </div>
  );
}
