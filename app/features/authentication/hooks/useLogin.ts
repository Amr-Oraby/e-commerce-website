// hooks/useLogin.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../authApi";
import { useRouter } from "next/navigation";

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending, data, error } = useMutation({
    mutationFn: login,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      router.replace("/");
    },

    onError: (error) => {
      // console.log("Login failed!");
      console.error(error.message);
    },
  });

  return {
    mutate,
    isPending,
    data,
    error,
  };
}
