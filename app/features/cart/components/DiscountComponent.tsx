"use client";
import { useState } from "react";

type DiscountComponentProps = {
  couponValue: string;
  setCouponValue: React.Dispatch<React.SetStateAction<string>>;
  useLoyaltyPoints: 0 | 1;
  setUseLoyaltyPoints: React.Dispatch<React.SetStateAction<0 | 1>>;
  loyaltyPoints: number | null;
};

export default function DiscountComponent({
  couponValue,
  setCouponValue,
  useLoyaltyPoints,
  setUseLoyaltyPoints,
  loyaltyPoints,
}: DiscountComponentProps) {
  const isCouponActive = couponValue.trim().length > 0;

  const handleApplyCoupon = () => {
    // Put your apply coupon logic here'
    if (!couponValue) return;
    // console.log("Applying coupon:", couponValue);
  };

  const handleCouponChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextCoupon = event.target.value;

    setCouponValue(nextCoupon);

    if (nextCoupon.trim().length > 0) {
      setUseLoyaltyPoints(0);
    }
  };

  const handleUsePointsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const shouldUsePoints = event.target.checked;

    setUseLoyaltyPoints(shouldUsePoints ? 1 : 0);

    if (shouldUsePoints) {
      setCouponValue("");
    }
  };

  return (
    <div
      dir="rtl"
      className=" p-6 border rounded-2xl border-gray-200 bg-white font-sans text-gray-900"
    >
      <h2 className="text-xl font-bold mb-4">الخصومات</h2>

      <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-600 px-4 py-3 rounded-xl mb-6">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-5 h-5"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4m0 4h.01" />
        </svg>
        <span className="text-sm">لا يمكن استخدام نقاط الولاء مع الكوبون</span>
      </div>

      <h3 className="text-lg font-bold mb-3">كوبون الخصم</h3>

      <div className="flex flex-col md:flex-row gap-5 md:gap-0 items-center border border-gray-200 rounded-xl mb-6 p-1 focus-within:border-amber-400 transition-colors">
        <input
          type="text"
          value={couponValue}
          onChange={handleCouponChange}
          disabled={useLoyaltyPoints === 1}
          placeholder="قم بإدخال رمز القسيمة هنا"
          className="pr-12 md:pr-3 flex-1 px-3 py-2 outline-none text-sm placeholder-gray-400 bg-transparent disabled:opacity-60 disabled:cursor-not-allowed"
        />
        <button
          onClick={handleApplyCoupon}
          disabled={useLoyaltyPoints === 1}
          className="text-amber-500 font-bold px-4 py-1 hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          تطبيق
        </button>
      </div>

      <div className="flex justify-between items-center text-sm">
        <label className="flex items-center gap-3 cursor-pointer font-bold">
          <input
            type="checkbox"
            checked={useLoyaltyPoints === 1}
            disabled={isCouponActive}
            onChange={handleUsePointsChange}
            className="w-4 h-4 rounded border-gray-300 accent-amber-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          />
          استخدام نقاط الولاء
        </label>
        <span className="text-amber-500">رصيدك: {loyaltyPoints ?? 0} نقطة</span>
      </div>
    </div>
  );
}
