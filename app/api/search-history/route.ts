import { serverGet, serverPost } from "@/lib/api/serverRoute";

export async function GET() {
  return serverGet("client/search-history");
}

export async function POST(request: Request) {
  const body = await request.json();
  return serverPost("client/search-history", {
    term: body.term,
  });
}
