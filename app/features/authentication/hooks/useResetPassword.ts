import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../authApi";
import { useRouter } from "next/navigation";

export function useResetPassword() {
  const router = useRouter();

  const { mutate, isPending, data, error } = useMutation({
    mutationFn: resetPassword,

    onSuccess: (responseData) => {
      if (responseData?.status === "success" || responseData?.message) {
        // Since the backend doesn't log the user in (data is null),
        // we redirect them to the login page to log in with their new password.
        router.push("/login");
      }
    },

    onError: (error) => {
      console.error("Reset password error:", error.message);
    },
  });

  return {
    mutate,
    isPending,
    data,
    error,
  };
}
