import { useQuery } from "@tanstack/react-query";
import { getCities } from "../../order/orderApi";

export function useCities(countryId?: string | number) {
  return useQuery<any>({
    queryKey: ["cities", countryId],
    queryFn: () => getCities(countryId),
    enabled: !!countryId, // Only fetch if a country is selected (or true if we don't care, but usually it depends)
  });
}
