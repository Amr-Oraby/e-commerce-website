// hooks/useRegister.ts
import { useMutation } from "@tanstack/react-query";
import { register } from "../authApi";
import { useRouter } from "next/navigation";

export function useRegister() {
  const router = useRouter();

  const { mutate, isPending, data, error } = useMutation({
    mutationFn: register,

    onSuccess: (responseData, variables) => {
      // Check if registration was successful and we got a token
      if (responseData?.status === "success" && responseData?.data?.verification_token) {
        const token = responseData.data.verification_token;
        const phone = variables.phone;
        const phoneCode = variables.phone_code;
        
        // Navigate to the verify route passing the token and phone number in URL
        router.push(`/verify?token=${token}&phone=${phone}&phoneCode=${phoneCode}`);
      } else {
        console.warn("Registration successful but no verification token received", responseData);
        router.push("/verify");
      }
    },

    onError: (error) => {
      console.error("Registration error:", error.message);
    },
  });

  return {
    mutate,
    isPending,
    data,
    error,
  };
}
