import { requireAuth } from "@/lib/auth";
import CartContent from "@/app/features/cart/components/CartContent";

export default async function CartPage() {
  await requireAuth();
  return <CartContent />;
}
