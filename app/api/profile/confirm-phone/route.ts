import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/api/fetcher";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const data: any = await apiFetch({
      endpoint: "client/profile/confirm-phone",
      method: "POST",
      body,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data?.status === "fail" || data?.status === false || !data?.status) {
      return NextResponse.json(data, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Confirm Phone Error:", error);
    return NextResponse.json(
      { message: error?.message || "Failed to confirm phone" },
      { status: 500 }
    );
  }
}
