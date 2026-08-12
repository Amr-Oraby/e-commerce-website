"use client";
import { useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { Product } from "@/app/types/product";

import OverviewProductActions from "./OverviewProductActions";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
export default function ProductOverview({ product }: { product: Product }) {
  const t = useTranslations("common");
  const locale = useLocale();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Using static thumbnails array since the Product interface provides a single Image object
  const thumbnails = [1, 2, 3, 4, 5];
  const url = typeof product?.image === 'string' ? product.image : product?.image?.url || null;
  const imageUrl = url || "/images/product.png";
  const displayPrice = product?.price_after_discount ?? product?.price ?? 0;

  return (
    <section className="w-full max-w-6xl mx-auto p-6 font-sans">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Right Side: Product Images */}
        <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
          <div className="flex flex-row md:flex-col gap-3 w-full md:w-20 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {thumbnails.map((item, index) => (
              <div
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`relative w-16 h-16 md:w-20 md:h-20 shrink-0 bg-[#f3f3f3] rounded-xl overflow-hidden cursor-pointer border-2 transition-colors ${
                  index === activeImageIndex
                    ? "border-amber-400"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <Image
                  src={imageUrl}
                  alt={`Thumbnail ${item}`}
                  fill
                  sizes="80px"
                  className="object-cover mix-blend-multiply"
                />
              </div>
            ))}
          </div>

          <div className="relative w-full md:flex-1 bg-[#f3f3f3] rounded-2xl overflow-hidden flex items-center justify-center aspect-square md:aspect-auto md:min-h-[400px]">
            <Image
              src={imageUrl}
              alt={product?.name || "Product?"}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover mix-blend-multiply"
            />
          </div>
        </div>

        {/* Left Side: Product? Details */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              {locale === "en" 
                ? (product?.en?.name || product?.name || "Unknown Product") 
                : (product?.ar?.name || product?.name || "غسول ديور الرغوي المنظف Dior")}
            </h1>
            <button className="text-amber-500 hover:text-amber-600 p-1">
              <FiExternalLink className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
            <FaStar className="text-amber-400 w-4 h-4" />
            <span className="font-semibold text-gray-700">
              {product?.average_rate || "0.0"}
            </span>
            <span>({product?.reviews_count || 0})</span>
          </div>

          <div className="flex flex-col gap-1 mb-6">
            <div className="flex items-center gap-3">
              <span className="font-bold text-3xl text-gray-900">
                {displayPrice.toFixed(2)}{" "}
                <span className="text-xl font-normal">﷼</span>
              </span>

              {product?.discount_percentage &&
                product?.discount_percentage > 0 && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      {product?.price?.toFixed(2)} ﷼
                    </span>
                    <span className="bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-md">
                      {product?.discount_percentage}%-
                    </span>
                  </>
                )}
            </div>
            <span className="text-xs text-gray-400">{t("taxInclusive")}</span>
          </div>

          <hr className="border-t border-dashed border-gray-200 mb-6" />

          <OverviewProductActions product={product} />

          <div className="flex flex-col gap-3">
            <span className="font-bold text-gray-900 text-sm">
              {t("installmentPayment")}
            </span>
            <div className="flex items-center gap-3">
              <div className="bg-[#33dcb1] text-black px-4 py-2 rounded font-black tracking-tighter text-lg leading-none flex items-center justify-center h-10 w-24">
                tabby
              </div>
              <div className="bg-linear-to-l from-[#ffb4a6] to-[#f3a4b5] text-black px-4 py-2 rounded font-black text-lg leading-none flex items-center justify-center h-10 w-24">
                تمارا
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
