import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/app/types/product";
import { useTranslations } from "next-intl";
import Image from "next/image";

// 3. Promotional Banner Card (For the first column)
const PromoBannerCard = () => {
  const t = useTranslations("home");
  return (
    <div className="relative w-full h-full min-h-85 rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center p-6 group cursor-pointer">
      {/* Background Image Setup (Leave src empty for your actual image) */}
      <Image
        src="/images/perfume-promo-1.png"
        alt="Promo Background"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500 bg-neutral-900"
      />

      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <h3 className="text-white text-2xl md:text-3xl font-bold leading-snug whitespace-pre-wrap">
          {t("promoTitle")}
        </h3>
        <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 px-8 rounded-full transition-colors w-max">
          {t("promoShopNow")}
        </button>
      </div>
    </div>
  );
};

// 4. Main Section Component
export default function SpecialOffersSection({
  products,
}: {
  products: Product[];
}) {
  const t = useTranslations("home");
  return (
    <section className="w-full max-w-7xl mx-auto p-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          {t("specialOffers")}
        </h2>
      </div>

      {/* Grid Layout: Promo card first, followed by products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {/* Column 1: Promo Banner */}
        <PromoBannerCard />

        {/* Columns 2-4: Products */}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
