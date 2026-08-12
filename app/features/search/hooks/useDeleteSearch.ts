import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSearchHistory } from "../api/searchApi";

export function useDeleteSearch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteSearchHistory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["search-history"] });
    },
  });
}
