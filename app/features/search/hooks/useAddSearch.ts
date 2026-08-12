import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSearchHistory } from "../api/searchApi";

export function useAddSearch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (term: string) => addSearchHistory(term),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["search-history"] });
    },
  });
}
