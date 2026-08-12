import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../cartApi";

export function useAddToCart() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: addToCart,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      // console.log"added cart", data);
    },
  });

  return {
    mutate,
    isPending,
  };
}
