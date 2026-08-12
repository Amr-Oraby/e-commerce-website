import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleWishlist } from "./wishlistApi";

export function useToggleWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => toggleWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      // Invalidate products query to update the heart icon on products list if needed
      queryClient.invalidateQueries({ queryKey: ["products"] }); 
    },
  });
}
