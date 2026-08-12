import { HiShoppingCart } from "react-icons/hi2";
import { CartData } from "@/app/types/cart";
import type { CheckOrderPayload } from "../orderApi";

interface CheckSummaryProps {
  data: CartData;
  nextStep: string;
  selectedBranchId: number | null;
  selectedAddressId: number | null;
  couponValue: string;
  useLoyaltyPoints: 0 | 1;
  deliveryType: number;
  onCheckOrder: (variables: CheckOrderPayload) => void;
}

export default function CheckSummary({
  data,
  nextStep,
  selectedBranchId,
  selectedAddressId,
  couponValue,
  useLoyaltyPoints,
  onCheckOrder,
  deliveryType,
}: CheckSummaryProps) {
  function handleCheck() {
    if (selectedBranchId === null && selectedAddressId === null) {
      return;
    }

    if (selectedBranchId !== null && selectedAddressId !== null) {
      return;
    }
    onCheckOrder({
      deliveryType,
      addressId: selectedAddressId,
      branchId: selectedBranchId,
      couponCode: couponValue || null,
      useLoyaltyPoints: useLoyaltyPoints,
    });
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
        className="cursor-pointer w-full bg-[#111111] hover:bg-black text-white rounded-xl py-4 flex items-center justify-center gap-2 transition-colors"
      >
        <span className="font-bold">{nextStep}</span>
        <HiShoppingCart className="w-5 h-5" />
      </button>
    </div>
  );
}
