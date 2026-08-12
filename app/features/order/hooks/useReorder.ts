import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reorderOrder } from "../orderApi";

export function useReorder(orderId: string | number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => reorderOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
