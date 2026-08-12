import { serverPost } from "@/lib/api/serverRoute";

export async function POST() {
  return serverPost("client/auth/logout", undefined, true);
}
