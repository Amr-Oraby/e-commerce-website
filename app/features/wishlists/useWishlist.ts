import { useQuery } from "@tanstack/react-query";
import { getWishlist } from "./wishlistApi";

export function useWishlist() {
  const { data, isPending } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });
  return { data, isPending };
}
