"use client";
import { FaStar } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { Product } from "@/app/types/product";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

import { useToggleWishlist } from "../wishlists/useToggleWishlist";

function ProductCard({ product }: { product?: Product }) {
  const router = useRouter();
  const t = useTranslations("product");
  const locale = useLocale();
  const { mutate: toggleWishlist, isPending } = useToggleWishlist();

  if (!product) return null;

  const hasDiscount = (product?.discount_percentage ?? 0) > 0;
  // Fallback to regular price if price_after_discount is missing
  const currentPrice = product?.price_after_discount ?? product?.price ?? 0;
  const originalPrice = product?.price ?? 0;
  const rawImageUrl = typeof product.image === "string" ? product.image : product?.image?.url;
  const imageUrl = rawImageUrl?.replace(/(https?:\/\/[^\/]+)\/\/+/, "$1/");

  return (
    <div
      className="flex flex-col gap-4 group cursor-pointer"
      onClick={() => product?.id && router.push(`/products/${product.id}`)}
    >
      {/* Image Container */}
      <div className="relative aspect-square rounded-2xl bg-[#f8f8f8] flex items-center justify-center overflow-hidden">
        {/* Discount Badge (Top Right in RTL) */}
        {hasDiscount && (
          <span className="absolute top-3 end-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
            {product?.discount_percentage}% {t("off")}
          </span>
        )}

        {/* Heart Icon (Top Left in RTL) */}
        <button
          disabled={isPending}
          className={`absolute top-3 start-3 p-2 rounded-full shadow-sm transition-colors z-10 ${
            product?.is_wishlist
              ? "bg-red-50 text-red-500"
              : "bg-white text-gray-400 hover:text-red-500"
          } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={(e) => {
            e.stopPropagation(); // Prevents navigating to the product page when clicking the heart
            if (product?.id) {
              toggleWishlist(product.id);
            }
          }}
        >
          <FiHeart
            className={`w-4 h-4 ${product?.is_wishlist ? "fill-current" : ""}`}
          />
        </button>

        {/* Product Image */}
        <Image
          src={imageUrl || "/images/new-arrival.png"} // Add a local fallback image path here
          alt={product?.name || "Product image"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-gray-800 text-sm leading-relaxed line-clamp-2 min-h-10">
          {locale === "en" 
            ? (product?.en?.name || product?.name || "Unknown Product") 
            : (product?.ar?.name || product?.name || "Unknown Product")}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <FaStar className="text-amber-400 w-3 h-3" />
          <span className="font-semibold text-gray-700">
            {product?.average_rate ?? 0}
          </span>
          <span>({product?.reviews_count ?? 0})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg text-gray-900">
            {currentPrice.toFixed(2)}{" "}
            <span className="text-sm font-normal">{t("currency")}</span>
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              {originalPrice.toFixed(2)} {t("currency")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
