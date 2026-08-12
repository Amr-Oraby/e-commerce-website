import { FiHeart, FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import { Loader2 } from "lucide-react";
import { Product, ProductVariation } from "@/app/types/product";
import { useCart } from "../cart/hooks/useCart";
import { useState } from "react";
import { useAddToCart } from "../cart/hooks/useAddToCart";
import { useIncrease } from "../cart/hooks/useIncrease";
import { useDecrease } from "../cart/hooks/useDecrease";
import { useUser } from "../authentication/hooks/useUser";
import { CartData } from "@/app/types/cart";
import { useTranslations } from "next-intl";

type CartItem = CartData["items"][0];

function OverviewProductActions({ product }: { product: Product }) {
  const t = useTranslations("product");
  const { data, isPending: isGettingCart } = useCart();
  
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const productInCart = data?.data?.[0]?.items?.find(
    (item: CartItem) => item.product?.id === product.id,
  );
  const isProductInCart = !!productInCart;
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  
  const selectedVariantIdCart = productInCart?.product?.variation?.id;
  const selectedVariantId = product?.variations?.find(
    (variant) => variant?.sku === selectedVariant,
  )?.id;

  const { mutate: addToCart, isPending: isAdding } = useAddToCart();
  const { mutate: increaseAmount, isPending: isIncreasing } = useIncrease();
  const { mutate: decreaseAmount, isPending: isDecreasing } = useDecrease();
  const { user } = useUser();

  const incrementQuantity = () => {
    if (!isProductInCart) {
      handleAddToCart();
      return;
    }
    increaseAmount({
      productId: product?.id?.toString() || "0",
      variantId: selectedVariantIdCart?.toString() || "1",
      amount: 1,
    });
  };

  const decrementQuantity = () => {
    if (!user?.data) {
      alert(t("loginRequired"));
      return;
    }
    if (productInCart?.amount === 0) return;
    decreaseAmount({
      productId: product?.id?.toString() || "0",
      variantId: selectedVariantIdCart?.toString() || "1",
      amount: 1,
    });
  };

  function handleAddToCart() {
    if (!user?.data) {
      alert(t("loginRequired"));
      return;
    }
    if (!selectedVariant && product.variations && product.variations.length > 0) {
      alert(t("pleaseSelectVariant"));
      return;
    }
    
    addToCart({
      productId: product?.id?.toString() || "0",
      variantId: selectedVariantId?.toString() || (product.lowest_price_variation?.id?.toString()) || "1",
      amount: 1,
    });
  }

  if (isGettingCart) return null;

  return (
    <>
      {product.variations && product.variations.length > 0 && (
        <div className="flex flex-col gap-3 mb-6">
          <span className="font-bold text-gray-900 text-sm">
            {t("typeLabel")}{" "}
            <span className="font-normal text-gray-600">
              {/* @ts-ignore */}
              {productInCart?.product?.variation?.sku || selectedVariant || t("selectVariant")}
            </span>
          </span>
          <div className="flex gap-3">
            {product.variations.map((variant: ProductVariation) => (
              <button
                disabled={productInCart?.product?.variation?.id === variant.id}
                key={variant.id}
                onClick={() => setSelectedVariant(variant.sku)}
                className={`px-5 py-2 rounded-full border text-sm transition-colors ${
                  productInCart?.product?.variation?.id === variant.id ||
                  selectedVariant === variant.sku
                    ? "border-amber-400 text-amber-600 font-medium"
                    : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {variant.sku}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-8">
        <span className="inline-block bg-[#fdf8ed] text-amber-600 text-xs font-bold px-4 py-2 rounded-full">
          {t("remainingStock", { count: product.total_stock || 0 })}
        </span>
      </div>

      <div className="flex items-center gap-3 mb-10">
        <div className="flex items-center justify-between border border-gray-300 rounded-full px-4 py-5 w-32 h-14 bg-white">
          <button
            onClick={incrementQuantity}
            disabled={isIncreasing}
            className="text-gray-400 hover:text-amber-500 transition-colors"
          >
            <FiPlus className="w-5 h-5" />
          </button>
          <span className="font-bold text-lg">
            {productInCart?.amount || 0}
          </span>
          <button
            onClick={decrementQuantity}
            disabled={isDecreasing || !productInCart?.amount}
            className="text-gray-400 hover:text-amber-500 transition-colors"
          >
            <FiMinus className="w-5 h-5" />
          </button>
        </div>

        {!isProductInCart && (
          <button
            onClick={handleAddToCart}
            disabled={isAdding || !user?.data}
            className="disabled:bg-[#5151518b] flex-1 h-14 bg-[#1a1a1a] hover:bg-black text-white rounded-full flex items-center justify-center gap-3 font-bold transition-colors"
          >
            {isAdding ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <FiShoppingCart className="w-5 h-5" />
            )}
            <span className="hidden sm:block">{t("addToCart")}</span>
          </button>
        )}

        <button
          className={`w-14 h-14 flex items-center justify-center border rounded-full transition-colors bg-white ${
            product?.is_wishlist
              ? "text-red-500 border-red-200"
              : "text-gray-400 border-gray-200 hover:text-red-500 hover:border-red-200"
          }`}
        >
          <FiHeart
            className={`w-6 h-6 ${product?.is_wishlist ? "fill-current" : ""}`}
          />
        </button>
      </div>
    </>
  );
}

export default OverviewProductActions;
