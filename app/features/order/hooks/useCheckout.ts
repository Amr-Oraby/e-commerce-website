import { useQuery } from "@tanstack/react-query";
import { CheckOrderPayload } from "../orderApi";

export function useCheckout() {
  return useQuery<CheckOrderPayload>({
    queryKey: ["checkout"],
    queryFn: async () => {
      throw new Error("This query has no API endpoint");
    },
    enabled: false,
  });
}
