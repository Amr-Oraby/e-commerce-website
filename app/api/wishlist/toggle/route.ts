import { serverPost } from "@/lib/api/serverRoute";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { product_id } = body;

  if (!product_id) {
    return NextResponse.json(
      { message: "Product ID is required" },
      { status: 400 }
    );
  }

  return serverPost("client/wishlists/toggle", { product_id });
}
