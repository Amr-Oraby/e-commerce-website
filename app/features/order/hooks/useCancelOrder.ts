import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "../orderApi";

export function useCancelOrder(orderId: string | number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cancelOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order", String(orderId)] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
