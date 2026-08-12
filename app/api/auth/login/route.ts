"use server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { apiFetch } from "@/lib/api/fetcher";
import { AuthResponse } from "@/app/types/UserType";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const data = await apiFetch<AuthResponse>({
      endpoint: "client/auth/login",
      method: "POST",
      body: {
        phone_code: body.phoneCode,
        login: body.phoneNumber,
        password: body.password,
      },
    });

    if (data?.status === "fail" || !data?.status) {
      return NextResponse.json(data, { status: 401 });
    }

    // TODO: Save the token here
    const { token, ...user } = data?.data;

    const cookieStore = await cookies();
    cookieStore.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",

      // Keep the user logged in for 30 days
      maxAge: 60 * 60 * 24 * 30,
    });

    return NextResponse.json({
      status: data?.status,
      message: data?.message,
      user,
    });
  } catch {
    return NextResponse.json({ message: "Login failed" }, { status: 401 });
  }
}
