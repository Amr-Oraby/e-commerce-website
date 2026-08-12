import { serverGet, serverPost } from "@/lib/api/serverRoute";

export async function GET() {
  return serverGet("client/addresses");
}

export async function POST(request: Request) {
  const payload = await request.json();
  return serverPost("client/addresses", payload);
}
