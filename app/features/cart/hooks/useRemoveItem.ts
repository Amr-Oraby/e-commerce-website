import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromCart } from "../cartApi";

type RemoveCartInput = {
  productId: string;
  variantId: string;
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

export function useRemoveItem() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: removeFromCart,

    onMutate: async (variables: RemoveCartInput) => {
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

        const itemIndex = cartItems.findIndex((item) => {
          const productId = Number(item?.product?.id ?? 0);
          const variantId = Number(item?.product?.variation?.id ?? 0);

          return (
            productId === Number(variables.productId) &&
            (!variables.variantId || variantId === Number(variables.variantId))
          );
        });

        if (itemIndex >= 0) {
          const removedItem = cartItems[itemIndex];
          const removedAmount = Number(removedItem?.amount || 0);

          cartItems.splice(itemIndex, 1);

          if (typeof cartPayload.total_quantity === "number") {
            cartPayload.total_quantity = Math.max(
              cartPayload.total_quantity - removedAmount,
              0,
            );
          }

          if (typeof cartPayload.items_count === "number") {
            cartPayload.items_count = Math.max(
              cartPayload.items_count - removedAmount,
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
