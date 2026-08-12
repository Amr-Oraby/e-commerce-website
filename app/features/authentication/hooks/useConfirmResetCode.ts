import { useMutation } from "@tanstack/react-query";
import { confirmResetCode } from "../authApi";
import { useRouter } from "next/navigation";

export function useConfirmResetCode() {
  const router = useRouter();

  const { mutate, isPending, data, error } = useMutation({
    mutationFn: confirmResetCode,

    onSuccess: (responseData, variables) => {
      if (responseData?.status === "success") {
        const token = variables.verification_token;
        const phone = variables.code; // We would ideally pass phone/phoneCode from the form down to here if needed for next step
        
        // Redirect to reset password page, keeping the token
        router.push(`/forgot-password/reset?token=${token}`);
      }
    },

    onError: (error) => {
      console.error("Confirm reset code error:", error.message);
    },
  });

  return {
    mutate,
    isPending,
    data,
    error,
  };
}
