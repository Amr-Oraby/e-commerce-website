import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/api/fetcher";

interface ServerRouteOptions {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  requireAuth?: boolean;
  errorMessage?: string;
}

export async function serverRoute({
  endpoint,
  method = "GET",
  body,
  requireAuth = true,
  errorMessage = "Request failed",
}: ServerRouteOptions) {
  try {
    let headers: Record<string, string> = {};

    if (requireAuth) {
      const cookieStore = await cookies();
      const token = cookieStore.get("access_token")?.value;

      if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      headers["Authorization"] = `Bearer ${token}`;
    }

    const data = await apiFetch({
      endpoint,
      method,
      body,
      headers,
    });

    return NextResponse.json(data);
  } catch (error: any) {
    console.error(`Route Error [${method} ${endpoint}]:`, error);
    return NextResponse.json(
      { message: error.message || errorMessage },
      { status: error.status || 500 }
    );
  }
}

export const serverGet = (endpoint: string, requireAuth = true) => 
  serverRoute({ endpoint, method: "GET", requireAuth, errorMessage: "Failed to fetch data" });

export const serverPost = (endpoint: string, body: any, requireAuth = true) => 
  serverRoute({ endpoint, method: "POST", body, requireAuth, errorMessage: "Failed to submit data" });

export const serverPut = (endpoint: string, body: any, requireAuth = true) => 
  serverRoute({ endpoint, method: "PUT", body, requireAuth, errorMessage: "Failed to update data" });

export const serverDelete = (endpoint: string, requireAuth = true) => 
  serverRoute({ endpoint, method: "DELETE", requireAuth, errorMessage: "Failed to delete data" });
