import { serverPost } from "@/lib/api/serverRoute";

export async function POST(request: Request) {
  const body = await request.json();
  return serverPost("client/auth/forgot-password", {
    phone_code: body.phone_code,
    phone: body.phone,
  }, false);
}
