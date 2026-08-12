import ProductList from "./ProductList";
import { Product } from "@/app/types/product";
import { useTranslations } from "next-intl";

// 3. Main Section Component
export default function NewArrivalsSection({
  recentProducts,
}: {
  recentProducts: Product[];
}) {
  const t = useTranslations("home");
  return (
    // dir="rtl" is crucial for matching the Arabic layout orientation
    <section className="mt-30 w-full max-w-7xl  mx-auto py-6 px-2 sm:px-5  mb-10 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          {t("newArrivals")}
        </h2>
      </div>

      <ProductList products={recentProducts} />
    </section>
  );
}
