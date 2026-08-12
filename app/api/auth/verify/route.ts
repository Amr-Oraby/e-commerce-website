import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/api/fetcher";
import { cookies } from "next/headers";
import { AuthResponse } from "@/app/types/UserType";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const data = await apiFetch<AuthResponse>({
      endpoint: "client/auth/verify",
      method: "POST",
      body: {
        type: body.type,
        code: body.code,
        verification_token: body.verification_token,
      },
    });

    // If verification is successful and returns a token, log the user in
    if (data?.data?.token) {
      const { token } = data.data;

      const cookieStore = await cookies();
      cookieStore.set("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        // Keep the user logged in for 30 days
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Verify Error:", error);
    return NextResponse.json(
      { message: "Verification failed" },
      { status: 500 }
    );
  }
}
