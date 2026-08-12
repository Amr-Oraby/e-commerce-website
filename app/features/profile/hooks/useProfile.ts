import { useQuery } from "@tanstack/react-query";
import { getProfileData } from "../profileApi";
import { useUser } from "../../authentication/hooks/useUser";

export function useProfile() {
  const { user } = useUser();
  const { data, isPending } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileData,
    enabled: !!user,
  });
  return { data, isPending };
}
