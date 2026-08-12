import { useQuery } from "@tanstack/react-query";
import { getAddressDetails } from "../orderApi";

export function useAddressDetails(id: string | number | null) {
  return useQuery({
    queryKey: ["address", id],
    queryFn: () => getAddressDetails(id as string | number),
    enabled: !!id,
  });
}
