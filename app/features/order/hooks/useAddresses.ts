import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../authentication/hooks/useUser";
import { getAddresses } from "../orderApi";

export function useAddresses() {
  const { user } = useUser();
  const { data, isPending, isFetching } = useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
    enabled: !!user,
  });
  return { data, isPending, isFetching };
}
