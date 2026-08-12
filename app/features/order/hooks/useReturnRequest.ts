import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitReturnRequest } from "../orderApi";
import { ReturnRequestPayload } from "@/app/types/order";

export function useReturnRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ReturnRequestPayload) => submitReturnRequest(payload),
    onSuccess: () => {
      // Invalidate queries related to returns and orders
      queryClient.invalidateQueries({ queryKey: ["returns"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
