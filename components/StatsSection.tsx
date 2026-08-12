import React from "react";
import { FaGlobe, FaCube, FaRegSmile } from "react-icons/fa";
import { GiLipstick } from "react-icons/gi"; // A close match for the cosmetics icon

export default function StatsSection() {
  const statsData = [
    {
      id: 1,
      icon: <FaRegSmile className="w-8 h-8 mb-3" />,
      number: "10.000+",
      label: "عميل سعيد",
    },
    {
      id: 2,
      icon: <GiLipstick className="w-8 h-8 mb-3" />,
      number: "15K+",
      label: "منتج عناية وتجميل",
    },
    {
      id: 3,
      icon: <FaCube className="w-8 h-8 mb-3" />,
      number: "12K+",
      label: "طلب تم تنفيذه",
    },
    {
      id: 4,
      icon: <FaGlobe className="w-8 h-8 mb-3" />,
      number: "600+",
      label: "مدينة نخدمها",
    },
  ];

  return (
    <section
      dir="rtl"
      className="w-full bg-black text-white py-10 px-6 font-sans"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 md:gap-6">
        {statsData?.map((stat) => (
          <div
            key={stat.id}
            className="flex flex-col items-center justify-center text-center w-full md:w-1/4"
          >
            {/* Icon */}
            <div className="text-white mb-2">{stat.icon}</div>

            {/* Large Number */}
            <h3 className="text-3xl md:text-[2rem] font-bold tracking-tight mb-4">
              {stat.number}
            </h3>

            {/* Thin Divider Line */}
            <div className="w-16 h-px bg-white/30 mb-4"></div>

            {/* Label */}
            <p className="text-sm md:text-base font-medium text-gray-200">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
