import React from "react";

interface LogoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutDialog({
  isOpen,
  onClose,
  onConfirm,
}: LogoutDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity p-4">
      {/* Dialog Container - Adjusted for smaller screens with sm: breakpoints */}
      <div
        dir="rtl"
        className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 pb-8 sm:pb-10 w-full max-w-sm flex flex-col items-center shadow-2xl"
      >
        {/* Responsive Icon */}
        <div className="mb-4 sm:mb-6 relative flex justify-center items-center">
          <svg
            viewBox="0 0 100 100"
            className="w-24 h-24 sm:w-28 sm:h-28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Light yellow body */}
            <path
              d="M35 15 H50 C65 15 70 20 70 35 V45 C70 47 68 49 66 49 H45 C40 49 38 51 38 56 V64 C38 69 40 71 45 71 H66 C68 71 70 73 70 75 V85 C70 100 65 105 50 105 H35 C20 105 15 100 15 85 V35 C15 20 20 15 35 15 Z"
              fill="#FDE49E"
            />
            {/* Dark yellow/orange arrow */}
            <path
              d="M45 60 L85 60"
              stroke="#F9A826"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M70 45 L85 60 L70 75"
              stroke="#F9A826"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Responsive Typography */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">
          هل تريد تسجيل الخروج؟
        </h2>
        <p className="text-[#8e8e8e] text-center text-xs sm:text-sm font-medium leading-relaxed mb-6 sm:mb-8 px-1 sm:px-2">
          سيتم إيقاف متابعة الطلبات والإشعارات حتى تسجيل الدخول مجددًا.
        </p>

        {/* Responsive Action Buttons */}
        <div className="w-full flex flex-col gap-3 sm:gap-4">
          <button
            onClick={onClose}
            className="w-full bg-[#F9A826] hover:bg-[#e69820] text-white text-base sm:text-lg font-bold py-3 sm:py-3.5 rounded-full transition-colors"
          >
            إلغاء
          </button>
          <button
            onClick={onConfirm}
            className="w-full bg-white border-2 border-[#F9A826] text-[#F9A826] hover:bg-orange-50 text-base sm:text-lg font-bold py-3 sm:py-3.5 rounded-full transition-colors"
          >
            تسجيل الخروج
          </button>
        </div>
      </div>
    </div>
  );
}
