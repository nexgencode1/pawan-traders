import { NextResponse } from "next/server";
import {
  getGalleryItems,
  createGalleryItem,
  deleteGalleryItem,
} from "@/lib/dataStore";
import { deleteImage } from "@/lib/cloudinary";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const items = await getGalleryItems(category);
    return NextResponse.json({ success: true, items });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }

    const newItem = await createGalleryItem({
      title: body.title || "",
      caption: body.caption || "",
      imageUrl: body.imageUrl,
      cloudinaryPublicId: body.cloudinaryPublicId || "",
      category: body.category || "general",
      featured: Boolean(body.featured),
      order: Number(body.order) || 0,
    });

    return NextResponse.json({ success: true, item: newItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const publicId = searchParams.get("publicId");

    if (!id) {
      return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
    }

    if (publicId) {
      await deleteImage(publicId);
    }

    await deleteGalleryItem(id);
    return NextResponse.json({ success: true, message: "Gallery item removed" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

