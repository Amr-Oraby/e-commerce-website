import { serverPost } from "@/lib/api/serverRoute";

export async function POST(request: Request) {
  const body = await request.json();
  return serverPost("client/auth/resend-forgot-password", {
    token: body.token,
  }, false);
}
