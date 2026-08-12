import React from "react";
import { Product } from "@/app/types/product";
import { useTranslations } from "next-intl";
import ProductList from "./ProductList";

export default function MostSelled({ products }: { products: Product[] }) {
  const t = useTranslations("home");
  return (
    // dir="rtl" is crucial for matching the Arabic layout orientation
    <section className="w-full max-w-7xl mx-auto p-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          {t("bestSellers")}
        </h2>
      </div>

      {/* Grid */}

      <ProductList products={products} />
    </section>
  );
}
