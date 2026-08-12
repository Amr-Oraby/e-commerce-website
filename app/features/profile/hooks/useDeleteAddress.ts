import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAddress } from "../../order/orderApi";

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => deleteAddress(id),
    onSuccess: () => {
      // Invalidate the addresses query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
}
