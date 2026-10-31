import { NextResponse } from "next/server";
import { uploadImage, isCloudinaryConfigured } from "@/lib/cloudinary";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder") || "pawan-traders";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await uploadImage(buffer, folder, file.type || "image/jpeg");

    return NextResponse.json({
      success: true,
      url: result.url,
      public_id: result.public_id,
      isMock: result.isMock,
      cloudinaryConfigured: isCloudinaryConfigured,
      note: result.note,
    });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json(
      { error: "Image upload failed: " + error.message },
      { status: 500 }
    );
  }
}

