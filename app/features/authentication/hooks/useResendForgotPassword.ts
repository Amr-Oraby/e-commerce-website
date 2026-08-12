import { useMutation } from "@tanstack/react-query";
import { resendForgotPassword } from "../authApi";

export function useResendForgotPassword() {
  const { mutate, isPending, data, error } = useMutation({
    mutationFn: resendForgotPassword,
    onError: (error) => {
      console.error("Resend forgot password error:", error.message);
    },
  });

  return {
    mutate,
    isPending,
    data,
    error,
  };
}
