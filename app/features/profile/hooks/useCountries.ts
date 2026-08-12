import { useQuery } from "@tanstack/react-query";
import { getCountries } from "../../order/orderApi";

export function useCountries() {
  return useQuery<any>({
    queryKey: ["countries"],
    queryFn: getCountries,
  });
}
