import { serverGet, serverPut } from "@/lib/api/serverRoute";

export async function GET() {
  return serverGet("client/profile");
}

export async function PUT(request: Request) {
  const body = await request.json();
  return serverPut("client/profile", body);
}
