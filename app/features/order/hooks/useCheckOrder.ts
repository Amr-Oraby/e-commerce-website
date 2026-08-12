import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkOrder, CheckOrderPayload } from "../orderApi";
import { useRouter } from "next/navigation";

export function useCheckOrder(data: CheckOrderPayload) {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { mutate, isPending } = useMutation({
        mutationFn: checkOrder,

        onSuccess: () => {
            queryClient.setQueryData(["checkout"], data);
            router.replace("/cart/checkout");
            queryClient.invalidateQueries({
                queryKey: ["orderCheck"],
            });
        },
    });

    return {
        mutate,
        isPending,
    };
}
