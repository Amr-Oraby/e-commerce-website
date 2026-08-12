import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/api/fetcher";

type VerifyResponse = {
  status: string;
  message: string;
  data: null
}
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const data = await apiFetch<VerifyResponse>({
      // We assume it's the same verify endpoint or a specific check-code one. 
      // Adjust if the backend endpoint for forgot password verification is different.
      endpoint: "client/auth/verify",
      method: "POST",
      body: {
        type: body.type,
        code: body.code,
        verification_token: body.verification_token,
      },
    });

    if (data?.status === "fail" || !data?.status) {
      return NextResponse.json(data, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Confirm Reset Code Error:", error);
    return NextResponse.json(
      { message: "Verification failed" },
      { status: 500 }
    );
  }
}
