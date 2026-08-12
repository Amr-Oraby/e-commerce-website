import { useQuery } from "@tanstack/react-query";
import { getReturnDetails } from "../profileApi";
import { useUser } from "../../authentication/hooks/useUser";

export function useReturnDetails(id: string) {
  const { user } = useUser();
  
  return useQuery({
    queryKey: ["return-details", id],
    queryFn: () => getReturnDetails(id),
    enabled: !!user && !!id,
  });
}
