// lib/auth.ts

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    redirect("/login");
  }

  const response = await fetch(
    "https://bayt-aljamal-dev.saber.aait-d.com/api/client/profile",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    // console.log"Profile failed:", response.status);
    redirect("/login");
  }

  return response.json();
}
