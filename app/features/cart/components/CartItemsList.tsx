import { HiOutlineTrash } from "react-icons/hi2";
import CartItem from "./CartItem";
import { CartData } from "@/app/types/cart";

interface CartItemsListProps {
  data: CartData;
}

export default function CartItemsList({ data }: CartItemsListProps) {
  return (
    <div className="w-full max-w-180 bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-100">
        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors">
          <HiOutlineTrash className="w-4 h-4" />
          <span>حذف الكل</span>
        </button>
        <h2 className="text-base sm:text-lg font-bold text-gray-900">
          {data?.items_count} منتجات
        </h2>
      </div>

      {/* Items */}
      <div className="flex flex-col">
        {data?.items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
