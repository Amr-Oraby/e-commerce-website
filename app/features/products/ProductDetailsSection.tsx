"use client";

import React, { useState } from "react";
import { Product, Specification } from "@/app/types/product";
import { useTranslations, useLocale } from "next-intl";

interface Props {
  product?: Product;
}

export default function ProductDetailsSection({ product }: Props) {
  const t = useTranslations("product");
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<
    "description" | "brand" | "reviews"
  >("description");

  // Validation: Early return if product is undefined or null
  if (!product) return null;

  const tabs = [
    { id: "description", label: t("productDescription") },
    { id: "brand", label: t("brandInformation") },
    { id: "reviews", label: t("reviews") },
  ] as const;

  // Extract the localized description
  const descriptionText = locale === "en"
    ? (product?.en?.description || product?.ar?.description)
    : (product?.ar?.description || product?.en?.description);
  const hasDescription =
    typeof descriptionText === "string" && descriptionText.trim().length > 0;

  const hasSpecifications =
    Array.isArray(product?.specifications) && product.specifications.length > 0;

  // Fallback data based exactly on image_8509e1.png
  const defaultSpecifications: Specification[] = [
    { key: "الفئة", value: "العناية بالبشرة" },
    { key: "الحجم أو السعة", value: "حسب المنتج" },
    { key: "الوزن", value: "حسب المنتج" },
    { key: "مناسب لـ", value: "حسب المنتج" },
    { key: "أبرز الفوائد", value: "حسب المنتج" },
    {
      key: "المميزات الخاصة",
      value: "خال من السلفات - مقاوم للماء - مناسب للشعر المصبوغ",
    },
  ];

  const specsToDisplay = hasSpecifications
    ? product.specifications
    : defaultSpecifications;

  return (
    <section dir="rtl" className="w-full max-w-5xl mx-auto p-6 font-sans">
      <div className="flex items-center justify-center gap-6 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 transition-colors ${activeTab === tab.id
                ? "px-10 border border-neutral-300 rounded-full text-neutral-900 font-bold"
                : "text-neutral-500 font-medium hover:text-neutral-900"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-50">
        {activeTab === "description" && (
          <>
            <div className="mb-10 text-neutral-600 text-sm md:text-base leading-[2.2] text-right space-y-4">
              {hasDescription ? (
                // Split by newline to support multiple paragraphs if the API returns them
                descriptionText
                  ?.split("\n")
                  .map((paragraph, index) =>
                    paragraph.trim() ? <p key={index}>{paragraph}</p> : null,
                  )
              ) : (
                <p>{t("noDescriptionAvailable")}</p>
              )}
            </div>

            {/* Specifications Section mimicking image_8509e1.png */}
            <div className="w-full flex flex-col overflow-hidden rounded-sm">
              {specsToDisplay?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start py-3.5 px-4 sm:px-6 even:bg-white odd:bg-[#f6f6f8]"
                >
                  <div className="w-28 sm:w-40 text-neutral-400 text-sm font-medium text-right shrink-0">
                    {item?.key || t("notSpecified")}
                  </div>
                  <div className="flex-1 text-neutral-800 font-bold text-sm text-right">
                    {item?.value || t("notSpecified")}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "brand" && (
          <div className="text-neutral-600 text-right">
            {product?.brand ? (
              <p>{t("brandInfoAvailable")}</p>
            ) : (
              <p>{t("noBrandInfo")}</p>
            )}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="text-neutral-600 text-right">
            <p>{t("totalReviews", { count: product?.reviews_count ?? 0 })}</p>
            <p>{t("averageRating", { rate: product?.average_rate ?? 0 })}</p>
          </div>
        )}
      </div>
    </section>
  );
}
