import { useQuery } from "@tanstack/react-query";
import { getCart } from "../cartApi";
import { useUser } from "../../authentication/hooks/useUser";

export function useCart() {
  const { user } = useUser();
  const { data, isPending } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    enabled: !!user,
  });
  return { data, isPending };
}
