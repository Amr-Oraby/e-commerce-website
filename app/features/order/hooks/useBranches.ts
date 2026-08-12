import { useQuery } from "@tanstack/react-query";
import { getBranches } from "../orderApi";

export function useBranches() {
  const { data, isPending } = useQuery({
    queryKey: ["branches"],
    queryFn: getBranches,
  });
  return { data, isPending };
}
