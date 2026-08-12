import { serverPost } from "@/lib/api/serverRoute";

export async function POST(request: Request) {
  const body = await request.json();
  return serverPost("client/auth/reset-password", {
    token: body.token,
    password: body.password,
    password_confirmation: body.password_confirmation,
  }, false);
}
