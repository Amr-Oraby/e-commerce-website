import { serverGet } from "@/lib/api/serverRoute";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const countryId = searchParams.get("country_id");
  const endpoint = countryId ? `guest/cities?country_id=${countryId}` : "guest/cities";
  return serverGet(endpoint, false);
}
