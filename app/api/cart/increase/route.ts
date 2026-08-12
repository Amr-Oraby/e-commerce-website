import { serverPost } from "@/lib/api/serverRoute";

export async function POST(request: Request) {
  const body = await request.json();
  return serverPost("client/carts/increment", {
    product_id: body.productId,
    product_variation_id: body.variantId,
    amount: body.amount,
  });
}
