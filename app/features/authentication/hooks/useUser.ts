import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../authApi";

export function useUser() {
  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return { user, isPending };
}
