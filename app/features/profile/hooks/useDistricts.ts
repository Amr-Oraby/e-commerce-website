import { useQuery } from "@tanstack/react-query";
import { getDistricts } from "../../order/orderApi";

export function useDistricts(cityId?: string | number) {
  return useQuery<any>({
    queryKey: ["districts", cityId],
    queryFn: () => getDistricts(cityId),
    enabled: !!cityId,
  });
}
