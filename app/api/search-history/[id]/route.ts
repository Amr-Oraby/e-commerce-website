import { serverDelete } from "@/lib/api/serverRoute";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return serverDelete(`client/search-history/${id}`);
}
