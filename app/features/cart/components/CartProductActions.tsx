import { FiMinus, FiPlus } from "react-icons/fi";
import { CartItemType } from "@/app/types/cart";
import { useIncrease } from "../hooks/useIncrease";
import { useDecrease } from "../hooks/useDecrease";
import { useUser } from "../../authentication/hooks/useUser";

function CartProductActions({ item }: { item: CartItemType }) {
  const { mutate: increaseAmount, isPending: isIncreasing } = useIncrease();
  const { mutate: decreaseAmount, isPending: isDecreasing } = useDecrease();
  const { user } = useUser();

  const incrementQuantity = () => {
    increaseAmount({
      productId: item.product?.id?.toString() || "0",
      variantId: item.product?.variation?.id?.toString() || "1",
      amount: 1,
    });
  };

  const decrementQuantity = () => {
    if (!user?.data) {
      alert("رجاء سجل الدخول اولا");
      return;
    }
    decreaseAmount({
      productId: item.product?.id?.toString() || "0",
      variantId: item.product?.variation?.id?.toString() || "1",
      amount: 1,
    });
  };

  return (
    <>
      {item.product?.variation && (
        <div className="flex flex-col gap-3 mb-6">
          <span className="font-bold text-gray-900 text-sm">
            النوع :{" "}
            <span className="font-normal text-gray-600">
              {/* @ts-ignore - Assuming sku exists or using default */}
              {item.product.variation.sku || "افتراضي"}
            </span>
          </span>
          <div className="flex gap-3">
            <button
              disabled
              className="px-5 py-2 rounded-full border text-sm transition-colors border-amber-400 text-amber-600 font-medium"
            >
              {/* @ts-ignore */}
              {item.product.variation.sku || "افتراضي"}
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="flex items-center justify-between border border-gray-300 rounded-full px-4 py-5 w-32 h-6 bg-white">
          <button
            onClick={incrementQuantity}
            disabled={isIncreasing}
            className="text-gray-400 hover:text-amber-500 transition-colors"
          >
            <FiPlus className="w-5 h-5" />
          </button>
          <span className="font-bold text-lg">{item.amount || 0}</span>
          <button
            onClick={decrementQuantity}
            disabled={isDecreasing || item.amount <= 0}
            className="text-gray-400 hover:text-amber-500 transition-colors"
          >
            <FiMinus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
}

export default CartProductActions;
