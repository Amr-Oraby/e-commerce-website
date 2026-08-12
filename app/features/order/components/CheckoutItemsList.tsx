import React from "react";
import Image from "next/image";

export type CartItem = {
  id: number;
  amount: number;
  subtotal: number;
  product: {
    id: number;
    name: string;
    image: { url: string };
    brand: { name: string };
  };
};

type CheckoutItemsListProps = {
  items: CartItem[];
};

export default function CheckoutItemsList({ items }: CheckoutItemsListProps) {
  if (!items || items.length === 0) return null;

  return (
    <div
      dir="rtl"
      className="w-full max-w-2xl p-6 border rounded-2xl border-gray-200 bg-white font-sans mx-auto"
    >
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-xl font-bold text-gray-900">المنتجات</h2>
      </div>

      <div className="flex flex-col gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between w-full pb-6 border-b border-gray-100 last:border-0 last:pb-0"
          >
            {/* Right side: Image and Details */}
            <div className="flex items-start gap-3 sm:gap-4 w-4/5">
              {/* Image */}
              <div className="w-16 h-20 sm:w-20 sm:h-24 shrink-0 relative bg-white flex items-center justify-center">
                <Image
                  src={item.product.image.url}
                  alt={item.product.name}
                  fill
                  sizes="(max-width: 640px) 64px, 80px"
                  className="object-contain"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col text-right">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                  {item.product.name}
                </h3>
                <span className="text-xs sm:text-sm text-gray-500 mt-1">
                  {item.product.brand.name}
                </span>

                <span className="text-[10px] sm:text-xs text-gray-400 mt-2 sm:mt-3">
                  السعر الاجمالي
                </span>
                <span className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-1 mt-0.5">
                  {item.subtotal.toFixed(2)} <span>﷼</span>
                </span>
              </div>
            </div>

            {/* Left side: Quantity Badge */}
            <div className="bg-amber-100 text-gray-800 text-xs sm:text-sm font-bold px-3 py-1 rounded-lg shrink-0 mt-1">
              X {item.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
