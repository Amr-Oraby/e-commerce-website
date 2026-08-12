import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../authApi";
import { useRouter } from "next/navigation";

export function useForgotPassword() {
  const router = useRouter();

  const { mutate, isPending, data, error } = useMutation({
    mutationFn: forgotPassword,

    onSuccess: (responseData, variables) => {
      // Check if request was successful and we got a token
      if (responseData?.status === "success" && responseData?.data?.verification_token) {
        const token = responseData.data.verification_token;
        const phone = variables.phone;
        const phoneCode = variables.phone_code;
        
        // Navigate to the forgot password verify route passing the token and phone number in URL
        router.push(`/forgot-password/verify?token=${token}&phone=${phone}&phoneCode=${phoneCode}`);
      } else {
        console.warn("Forgot password successful but no verification token received", responseData);
      }
    },

    onError: (error) => {
      console.error("Forgot password error:", error.message);
    },
  });

  return {
    mutate,
    isPending,
    data,
    error,
  };
}
