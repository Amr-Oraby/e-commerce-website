import { useQuery } from "@tanstack/react-query";
import { getBrands } from "@/lib/api/brandsApi";

export function useBrands() {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });
  return { data, isPending, refetch };
}
