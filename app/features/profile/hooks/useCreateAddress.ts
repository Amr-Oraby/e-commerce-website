import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAddress } from "../../order/orderApi";
import { CreateAddressPayload } from "@/app/types/order";

export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAddressPayload) => createAddress(payload),
    onSuccess: () => {
      // Invalidate the addresses query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
}
