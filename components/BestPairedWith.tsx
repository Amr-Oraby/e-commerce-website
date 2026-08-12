import ProductCard from "../app/features/products/ProductCard";
import { RelatedProduct, Product } from "@/app/types/product";
import { useTranslations } from "next-intl";
export default function BestPairedWith({
  products,
}: {
  products?: RelatedProduct[];
}) {
  // Validation: Early return if products array is undefined, null, or empty
  if (!Array.isArray(products) || products.length === 0) {
    return null;
  }
  const t = useTranslations("product");

  return (
    <section dir="rtl" className="w-full max-w-7xl mx-auto p-6 font-sans">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          {t("bestPairedWith")}
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {products.map((product, index) => (
          <ProductCard key={product?.id || index} product={product as unknown as Product} />
        ))}
      </div>
    </section>
  );
}
