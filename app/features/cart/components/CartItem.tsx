import Image from "next/image";
import { HiOutlineTrash, HiOutlinePlus, HiOutlineMinus } from "react-icons/hi2";
import { CartItemType } from "@/app/types/cart";
import CartProductActions from "./CartProductActions";
import { useRemoveItem } from "../hooks/useRemoveItem";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { mutate, isPending: isDeleting } = useRemoveItem();
  function handleDelete() {
    mutate({
      productId: item.product.id.toString(),
      variantId: item.product.variation?.id.toString(),
    });
  }

  return (
    <div
      dir="rtl"
      className="relative flex flex-col sm:flex-row items-start gap-4 py-6 border-b border-gray-100 last:border-0"
    >
      {/* Product Image */}
      <div className="relative w-24 h-32 bg-white rounded-lg flex-shrink-0">
        <Image
          src={item.product.image.url}
          alt={item.product.name}
          fill
          className="object-contain"
        />
      </div>

      {/* Product Content */}
      <div className="flex flex-col flex-1 w-full gap-4">
        {/* Title & Brand */}
        <div className="pl-10 text-right min-w-0">
          <h3 className="text-lg font-bold text-gray-900 leading-snug">
            {item.product.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {item.product.brand.name}
          </p>
        </div>

        {/* Pricing & Controls */}
        <div className="flex flex-wrap items-end justify-between sm:justify-start gap-6 sm:gap-14 mt-2 w-full">
          {/* Individual Price */}
          <div className="text-right">
            <p className="text-xs text-gray-400 mb-2">السعر الفردي</p>
            <div className="flex items-center gap-2">
              <p className="font-bold text-gray-900 text-lg">
                {item.price_after_discount} ﷼
              </p>
              {item.main_price > item.price_after_discount && (
                <p className="text-sm text-gray-400 line-through">
                  {item.main_price} ﷼
                </p>
              )}
            </div>
          </div>

          {/* Quantity Selector */}
          <CartProductActions item={item} />
          {/* Total Price */}
          <div className="text-right">
            <p className="text-xs text-gray-400 mb-2">السعر الاجمالي</p>
            <p className="font-bold text-gray-900 text-lg">{item.subtotal} ﷼</p>
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleDelete}
        aria-label="حذف المنتج"
        className="cursor-pointer absolute top-6 left-0 sm:left-4 text-red-600 hover:text-red-700 transition-colors"
      >
        <HiOutlineTrash className="w-6 h-6" />
      </button>
    </div>
  );
}
