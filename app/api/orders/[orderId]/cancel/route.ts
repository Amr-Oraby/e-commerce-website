import { serverPost } from "@/lib/api/serverRoute";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;
  return serverPost(`client/orders/${orderId}/cancel`, {
    cancellation_reason: "changed_mind"
  });
}
