import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verify } from "../authApi";
import { useRouter } from "next/navigation";

export function useVerify() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending, data, error } = useMutation({
    mutationFn: verify,

    onSuccess: (responseData) => {
      // Invalidate the user query to re-fetch profile if needed
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      
      // Verification successful, redirect to home page
      router.replace("/");
    },

    onError: (error) => {
      console.error("Verification error:", error.message);
    },
  });

  return {
    mutate,
    isPending,
    data,
    error,
  };
}
