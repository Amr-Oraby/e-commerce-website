import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../profileApi";

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  
  const { mutate, isPending, data, error } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { mutate, isPending, data, error };
}
