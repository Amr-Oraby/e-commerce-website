import { serverPost } from "@/lib/api/serverRoute";

export async function POST(request: Request) {
  const body = await request.json();
  return serverPost("client/orders/check", {
    delivery_type: body.deliveryType,
    address_id: body.addressId,
    branch_id: body.branchId,
    coupon_code: body.couponCode,
    use_loyalty_points: body.useLoyaltyPoints,
  });
}
