import { serverPost } from "@/lib/api/serverRoute";

export async function POST(request: Request) {
  const body = await request.json();
  return serverPost("client/auth/register", {
    full_name: body.full_name,
    phone_code: body.phone_code,
    phone: body.phone,
    password: body.password,
  }, false);
}
