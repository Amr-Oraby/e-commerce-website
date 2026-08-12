import { useMutation, useQueryClient } from "@tanstack/react-query";
import { finishOrder } from "../orderApi";
export function useFinishOrder() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: finishOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["loyality-points"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return {
    mutate,
    isPending,
  };
}
