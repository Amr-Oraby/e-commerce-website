import { useQuery } from "@tanstack/react-query";
import { getWallet } from "../profileApi";
import { useUser } from "../../authentication/hooks/useUser";

export function useWallet() {
  const { user } = useUser();
  const { data, isPending } = useQuery({
    queryKey: ["wallet"],
    queryFn: getWallet,
    enabled: !!user,
  });
  return { data, isPending };
}
