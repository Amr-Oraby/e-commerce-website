import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../profile/profileApi";

export function useOrders(status?: number) {
  return useQuery({
    queryKey: ["orders", status],
    queryFn: () => getOrders(status),
  });
}
