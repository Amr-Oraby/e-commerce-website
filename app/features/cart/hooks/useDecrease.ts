import { useMutation, useQueryClient } from "@tanstack/react-query";
import { descreaseAmount } from "../cartApi";

type DecreaseCartInput = {
  productId: string;
  variantId: string;
  amount: number;
};

type CartProduct = {
  id?: number | string;
  variation?: {
    id?: number | string;
  };
};

type CartItem = {
  product?: CartProduct;
  amount?: number;
};

type CartPayload = {
  items?: CartItem[];
  total_quantity?: number;
  items_count?: number;
};

type CartCacheShape = {
  data?: Array<CartPayload>;
};

export function useDecrease() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: descreaseAmount,

    onMutate: async (variables: DecreaseCartInput) => {
      await queryClient.cancelQueries({
        queryKey: ["cart"],
      });

      const previousCart = queryClient.getQueryData<CartCacheShape>(["cart"]);

      queryClient.setQueryData<CartCacheShape>(["cart"], (currentCart) => {
        if (!currentCart?.data || !Array.isArray(currentCart.data)) {
          return currentCart;
        }

        const nextCart: CartCacheShape = JSON.parse(
          JSON.stringify(currentCart),
        );
        const cartPayload = nextCart.data?.[0];
        const cartItems = cartPayload?.items;

        if (!cartPayload || !Array.isArray(cartItems)) {
          return currentCart;
        }

        const target = cartItems.find((item) => {
          const productId = Number(item?.product?.id ?? 0);
          const variantId = Number(item?.product?.variation?.id ?? 0);

          return (
            productId === Number(variables.productId) &&
            (!variables.variantId || variantId === Number(variables.variantId))
          );
        });

        if (target) {
          const amountToRemove = Number(variables.amount || 1);
          const nextAmount = Math.max(
            Number(target.amount || 0) - amountToRemove,
            0,
          );
          target.amount = nextAmount;

          if (typeof cartPayload.total_quantity === "number") {
            cartPayload.total_quantity = Math.max(
              cartPayload.total_quantity - amountToRemove,
              0,
            );
          }

          if (typeof cartPayload.items_count === "number") {
            cartPayload.items_count = Math.max(
              cartPayload.items_count - amountToRemove,
              0,
            );
          }
        }

        return nextCart;
      });

      return {
        previousCart,
      };
    },

    onError: (
      _error,
      _variables,
      context: { previousCart?: CartCacheShape } | undefined,
    ) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  return {
    mutate,
    isPending,
  };
}
