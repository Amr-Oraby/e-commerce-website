import { serverPost } from "@/lib/api/serverRoute";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const incomingFormData = await request.formData();
  const file = incomingFormData.get("file[]") as Blob | null;
  const collection = incomingFormData.get("collection") as string || "product";

  if (!file) {
    return NextResponse.json({ message: "No file provided" }, { status: 400 });
  }

  const outgoingFormData = new FormData();
  outgoingFormData.append("file[]", file, (file as File)?.name || "upload.jpg");
  outgoingFormData.append("collection", collection);

  return serverPost("media/upload", outgoingFormData);
}
