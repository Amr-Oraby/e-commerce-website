import { serverGet } from "@/lib/api/serverRoute";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return serverGet(`client/return-requests/${id}`);
}
