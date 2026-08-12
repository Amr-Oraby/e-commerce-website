import { serverGet } from "@/lib/api/serverRoute";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const endpoint = status ? `client/orders?filters[status]=${status}` : "client/orders";
  return serverGet(endpoint);
}
