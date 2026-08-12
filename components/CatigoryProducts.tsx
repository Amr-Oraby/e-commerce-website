import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { Product } from "@/app/types/product";
import ProductList from "@/app/features/products/ProductList";
import { SortSelect } from "./SortSelect";
import { FilterPopover } from "./FilterPopover";
import { useTranslations } from "next-intl";

function CatigoryProducts({
  products,
  title,
}: {
  products: Product[];
  title: string;
}) {
  const t = useTranslations("common");
  return (
    <section className="w-full max-w-7xl mx-auto p-6 font-sans">
      {/* Top Header & Controls */}
      <div className="flex flex-col gap-4 mb-8">
        <FilterPopover />

        {/* Title and Sort Button Row */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {title}
          </h1>

          <SortSelect />
        </div>
      </div>

      {(!products || products.length === 0) ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50 rounded-2xl border border-gray-100 mt-8">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{t("noProducts")}</h3>
          <p className="text-gray-500 max-w-sm">{t("noProductsDesc")}</p>
        </div>
      ) : (
        <>
          {/* 4-Column Product Grid */}
          <ProductList products={products} />

          {/* Pagination (Static Shape) */}
          <div className="flex items-center justify-center gap-2 mt-16 text-sm font-medium">
            {/* Next Page Arrow (RTL layout means right arrow goes back, left arrow goes forward visually, but keeping matching standard logic) */}
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-amber-500 transition-colors">
              <FiChevronRight className="w-5 h-5" />
            </button>

            {/* Active Page */}
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-500 text-white cursor-pointer">
              1
            </div>

            {/* Inactive Pages */}
            {[2, 3, 4].map((page) => (
              <div
                key={page}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-amber-400 text-amber-500 hover:bg-amber-50 cursor-pointer transition-colors"
              >
                {page}
              </div>
            ))}

            {/* Ellipsis */}
            <span className="text-amber-500 mx-1">...</span>

            {/* Later Pages */}
            {[12, 13].map((page) => (
              <div
                key={page}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-amber-400 text-amber-500 hover:bg-amber-50 cursor-pointer transition-colors"
              >
                {page}
              </div>
            ))}

            {/* Previous Page Arrow */}
            <button className="w-8 h-8 flex items-center justify-center text-amber-500 hover:text-amber-600 transition-colors">
              <FiChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default CatigoryProducts;
