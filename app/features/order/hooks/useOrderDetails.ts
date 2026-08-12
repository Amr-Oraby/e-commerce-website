import { useQuery } from "@tanstack/react-query";
import { getOrderDetails } from "../orderApi";

export function useOrderDetails(orderId: string | number) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderDetails(orderId),
    enabled: !!orderId,
  });
}
