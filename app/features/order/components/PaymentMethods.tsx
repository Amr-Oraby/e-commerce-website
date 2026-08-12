"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";

// تعريف ثوابت طرق الدفع المطلوبة

const PAYMENT_GATEWAY = 1;
const COD = 2;
const WALLET = 3;

export default function PaymentMethods({
  paymentMethod,
  setPaymentMethod,
}: {
  paymentMethod: number;
  setPaymentMethod: Dispatch<SetStateAction<number>>;
}) {
  const options = [
    {
      id: PAYMENT_GATEWAY, // 1
      title: "الدفع الإلكتروني",
      subtitle: "(مدى، Apple Pay، والبطاقات الائتمانية)",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="2" y="6" width="20" height="12" rx="2" fill="#FBBF24" />
          <rect x="2" y="10" width="20" height="2" fill="#1F2937" />
          <rect x="17" y="14" width="3" height="2" rx="0.5" fill="#FFFFFF" />
        </svg>
      ),
    },
    {
      id: WALLET, // 3
      title: "الدفع بالمحفظة",
      subtitle: "(مدى، Apple Pay، والبطاقات الائتمانية)",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="6"
            width="16"
            height="12"
            rx="2"
            fill="#FDE68A"
            stroke="#1F2937"
            strokeWidth="1.5"
          />
          <path
            d="M19 10v4c0 1.1-.9 2-2 2H3"
            stroke="#1F2937"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <rect
            x="15"
            y="9"
            width="6"
            height="6"
            rx="1"
            fill="#FBBF24"
            stroke="#1F2937"
            strokeWidth="1.5"
          />
          <circle cx="18" cy="12" r="1" fill="#1F2937" />
        </svg>
      ),
    },
    {
      id: COD, // 2
      title: "الدفع عند الاستلام",
      subtitle: "الدفع نقداً",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="6" y="8" width="14" height="10" rx="1.5" fill="#FBBF24" />
          <path
            d="M16 8V6c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v3"
            fill="#FEF3C7"
            stroke="#F59E0B"
            strokeWidth="1.2"
          />
          <circle cx="11" cy="6.5" r="1.5" fill="#F59E0B" />
          <path
            d="M20 11v4"
            stroke="#F59E0B"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <rect
            x="17"
            y="11"
            width="4"
            height="4"
            rx="1"
            fill="#fff"
            stroke="#F59E0B"
            strokeWidth="1.2"
          />
        </svg>
      ),
    },
  ];

  return (
    <div dir="rtl" className="w-full max-w-2xl mx-auto p-4 font-sans">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6 text-right">
        طرق الدفع
      </h2>

      <RadioGroup
        value={paymentMethod.toString()}
        onValueChange={(val) => setPaymentMethod(Number(val))}
        className="flex flex-col gap-3 sm:gap-4"
      >
        {options?.map((option) => (
          <Label
            key={option.id}
            htmlFor={`payment-${option.id}`}
            className="flex items-center justify-between p-4 sm:p-5 border border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50/50 transition-all bg-white"
          >
            {/* المحتوى الأيمن: النص والأيقونة */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
                {option.icon}
              </div>
              <div className="flex flex-col gap-1 sm:gap-1.5">
                <span className="font-bold text-sm sm:text-base text-gray-900 leading-none">
                  {option.title}
                </span>
                <span className="text-xs sm:text-sm text-gray-400 font-medium leading-none">
                  {option.subtitle}
                </span>
              </div>
            </div>

            {/* المحتوى الأيسر: زر الاختيار (Radio) */}
            <RadioGroupItem
              value={option.id.toString()}
              id={`payment-${option.id}`}
              className="h-6 w-6 sm:h-7 sm:w-7 border-gray-200 text-amber-500 data-[state=checked]:border-amber-500 data-[state=checked]:border-[2px] [&_svg]:h-3.5 [&_svg]:w-3.5 sm:[&_svg]:h-4 sm:[&_svg]:w-4 [&_svg]:fill-amber-500 transition-colors"
            />
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}
