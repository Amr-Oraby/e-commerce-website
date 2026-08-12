import { serverGet } from "@/lib/api/serverRoute";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cityId = searchParams.get("city_id");
  const endpoint = cityId ? `guest/districts?city_id=${cityId}` : "guest/districts";
  return serverGet(endpoint, false);
}
