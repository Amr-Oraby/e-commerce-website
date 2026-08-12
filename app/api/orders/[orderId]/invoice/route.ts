import { serverGet } from "@/lib/api/serverRoute";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;
  return serverGet(`client/orders/${orderId}/invoice`);
}
