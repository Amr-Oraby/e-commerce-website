// hooks/useLogout.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../authApi";
import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending, data, error } = useMutation({
    mutationFn: logout,

    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      queryClient.removeQueries({
        queryKey: ["user"],
      });
      router.refresh();
      router.replace("/");
    },
  });

  return {
    mutate,
    isPending,
    data,
    error,
  };
}
