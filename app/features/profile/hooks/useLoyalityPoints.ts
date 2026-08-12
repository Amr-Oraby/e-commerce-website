import { useQuery } from "@tanstack/react-query";
import { getLoyalityPoints } from "../profileApi";
import { useUser } from "../../authentication/hooks/useUser";

export function useLoyalityPoints() {
  const { user } = useUser();
  const { data, isPending } = useQuery({
    queryKey: ["loyality-points"],
    queryFn: getLoyalityPoints,
    enabled: !!user,
  });
  return { data, isPending };
}
