import { useQuery } from "@tanstack/react-query";
import { getReturns } from "../profileApi";
import { useUser } from "../../authentication/hooks/useUser";

export function useReturns() {
  const { user } = useUser();
  const { data, isPending } = useQuery({
    queryKey: ["retruns"],
    queryFn: getReturns,
    enabled: !!user,
  });
  return { data, isPending };
}
