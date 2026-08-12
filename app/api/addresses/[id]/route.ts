import { serverDelete, serverGet } from "@/lib/api/serverRoute";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return serverDelete(`client/addresses/${id}`);
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return serverGet(`client/addresses/${id}`);
}
