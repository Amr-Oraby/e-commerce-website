import { serverGet, serverPost } from "@/lib/api/serverRoute";

export async function GET() {
  return serverGet("client/return-requests");
}

export async function POST(request: Request) {
  const payload = await request.json();
  return serverPost("client/return-requests", payload);
}