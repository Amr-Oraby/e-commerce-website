import { serverGet } from "@/lib/api/serverRoute";

export async function GET() {
  return serverGet("client/wallet");
}
