import { useQuery } from "@tanstack/react-query";
import { getSearchHistory } from "../api/searchApi";
import { useUser } from "../../authentication/hooks/useUser";

export function useSearchHistory() {
  const { user } = useUser();
  const { data, isPending, refetch } = useQuery({
    queryKey: ["search-history"],
    queryFn: getSearchHistory,
    enabled: !!user,
  });
  return { data, isPending, refetch };
}
