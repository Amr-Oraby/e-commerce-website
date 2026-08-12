import { useMutation } from "@tanstack/react-query";
import { getOrderInvoice } from "../orderApi";

export function useOrderInvoice(orderId: string | number) {
  return useMutation({
    mutationFn: () => getOrderInvoice(orderId),
  });
}
