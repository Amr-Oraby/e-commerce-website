import React from "react";
import Image from "next/image";

interface FormLayoutProps {
  children: React.ReactNode;
}

export default function FormLayout({ children }: FormLayoutProps) {
  return (
    // Outer wrapper centers the card on the screen
    <div className="min-h-[500px] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-gray-50/30">
      {/* 
        The main card container: 
        - RTL direction for Arabic support
        - Exact border and rounded corners matching the design
        - Responsive padding and max-width 
      */}
      <div
        dir="rtl"
        className="w-full max-w-[700px] bg-white border border-[#EAEAEA] rounded-[1.5rem] px-6 py-10 sm:px-14 sm:py-14 flex flex-col items-center shadow-sm"
      >
        {/* Logo Section */}
        <div className="mb-8 sm:mb-10 flex justify-center items-center">
          <Image
            src="/images/logo.png"
            alt="Golden B.H Logo"
            width={100}
            height={100}
            className="w-20 sm:w-32  h-auto object-contain"
            priority // Loads the logo immediately since it's above the fold
          />
        </div>

        {/* 
          Children Section:
          This is where the title, subtitle, labels, inputs, and button will be injected
        */}
        <div className="w-full flex flex-col">{children}</div>
      </div>
    </div>
  );
}
