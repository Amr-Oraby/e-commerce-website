"use client";
import { FiFilter, FiX } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useTranslations } from "next-intl";
import { useBrands } from "@/app/hooks/useBrands";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function FilterPopover() {
  const t = useTranslations("common");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { data: brandsData } = useBrands();
  
  const brands = brandsData?.data?.brands || [];
  const currentBrands = searchParams.get("brand")?.split(",") || [];

  const handleBrandChange = (brandId: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    let newBrands = [...currentBrands];
    
    if (checked) {
      if (!newBrands.includes(brandId)) newBrands.push(brandId);
    } else {
      newBrands = newBrands.filter(id => id !== brandId);
    }
    
    if (newBrands.length > 0) {
      params.set("brand", newBrands.join(","));
    } else {
      params.delete("brand");
    }
    
    // reset pagination to page 1 on filter change if there is a page param
    params.delete("page");
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleClearBrands = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("brand");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex justify-start">
      <Sheet>
        {/* Trigger Button */}
        <SheetTrigger className="bg-[#f59e0b] hover:bg-[#d97706] text-white flex items-center gap-2 px-6 py-2.5 rounded-md font-bold text-sm cursor-pointer shadow-sm transition-colors">
          <span>{t("filterBy")}</span>
          <FiFilter className="w-4 h-4" />
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-full sm:max-w-md p-0 bg-white border-none overflow-y-auto [&>button]:hidden"
        >
          {/* Hidden title for screen reader accessibility */}
          <SheetTitle className="sr-only">{t("filterBy")}</SheetTitle>

          {/* Custom Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <span className="font-bold text-gray-900 text-xl">{t("filterBy")}</span>
            <SheetClose className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors">
              <FiX className="w-5 h-5" />
            </SheetClose>
          </div>

          <div className="p-6 space-y-8">
            {/* Category: Product Type */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h4 className="font-bold text-base text-gray-900">
                  {t("productType")}
                </h4>
                <button className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                  {t("clear")}
                </button>
              </div>
              <div className="space-y-4">
                {[
                  t("faceWash"),
                  t("moisturizers"),
                  t("serum"),
                  t("masks"),
                  t("sunscreen"),
                  t("scrubs"),
                  t("skinProblemsTreatment"),
                ].map((item) => (
                  <label
                    key={item}
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">
                      {item}
                    </span>
                    <Checkbox className="border-gray-300 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 rounded-lg" />
                  </label>
                ))}
              </div>
            </div>

            {/* Category: Brand */}
            {brands.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h4 className="font-bold text-base text-gray-900">
                    {t("brand")}
                  </h4>
                  <button 
                    onClick={handleClearBrands}
                    className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {t("clear")}
                  </button>
                </div>
                <div className="space-y-4 max-h-48 overflow-y-auto pr-2">
                  {brands.map((brand) => (
                    <label
                      key={brand.id}
                      className="flex items-center justify-between cursor-pointer group"
                    >
                      <span className="text-sm text-gray-600 group-hover:text-gray-900">
                        {brand.title}
                      </span>
                      <Checkbox 
                        checked={currentBrands.includes(brand.id.toString())}
                        onCheckedChange={(checked) => handleBrandChange(brand.id.toString(), checked as boolean)}
                        className="border-gray-300 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 rounded-lg" 
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Category: Price */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h4 className="font-bold text-base text-gray-900">
                  {t("price")}
                </h4>
                <button className="text-sm text-amber-500 hover:text-amber-600 transition-colors">
                  {t("clear")}
                </button>
              </div>

              <div className="flex items-center justify-between mb-4 text-sm font-medium text-gray-900">
                <span dir="ltr">50.00 ﷼</span>
                <span dir="ltr">110.00 ﷼</span>
              </div>

              <div className="px-1 mb-2">
                <Slider
                  defaultValue={[50, 110]}
                  max={200}
                  step={1}
                  className="**:[[role=slider]]:bg-white **:[[role=slider]]:border-gray-400 **:[[role=slider]]:w-4 **:[[role=slider]]:h-4"
                />
              </div>
            </div>

            {/* Category: Rating */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h4 className="font-bold text-base text-gray-900">{t("rating")}</h4>
                <button className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                  {t("clear")}
                </button>
              </div>
              <div className="space-y-4">
                {[t("stars5"), t("stars4AndAbove"), t("stars3AndAbove"), t("anyRating")].map(
                  (item, idx) => (
                    <label
                      key={idx}
                      className="flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex  items-center gap-2">
                        <FaStar className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-sm text-gray-600 group-hover:text-gray-900">
                          {item}
                        </span>
                      </div>
                      <Checkbox className="border-gray-300 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 rounded-lg" />
                    </label>
                  ),
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
