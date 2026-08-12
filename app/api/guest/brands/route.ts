import { serverGet } from "@/lib/api/serverRoute";

export async function GET() {
  // guest routes don't require auth
  return serverGet("guest/brands", false);
}
