import { NextResponse } from "next/server";
import {
  getHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
} from "@/lib/dataStore";
import { deleteImage } from "@/lib/cloudinary";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";
    const slides = await getHeroSlides(!all);
    return NextResponse.json({ success: true, slides });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.imageUrl) {
      return NextResponse.json({ error: "Slide image is required" }, { status: 400 });
    }

    const newSlide = await createHeroSlide({
      imageUrl: body.imageUrl,
      cloudinaryPublicId: body.cloudinaryPublicId || "",
      title: body.title || "", // Single text (optional)
      badge: body.badge || "",
      button1Text: body.button1Text || "Explore Products",
      button1Link: body.button1Link || "/products",
      button2Text: body.button2Text || "WhatsApp Quote",
      button2Link: body.button2Link || "https://wa.me/918299362360",
      order: Number(body.order) || 0,
      active: body.active !== undefined ? Boolean(body.active) : true,
    });

    return NextResponse.json({ success: true, slide: newSlide }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "Slide ID is required" }, { status: 400 });
    }

    const updated = await updateHeroSlide(id, updateData);
    return NextResponse.json({ success: true, slide: updated });
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
      return NextResponse.json({ error: "Slide ID is required" }, { status: 400 });
    }

    if (publicId) {
      await deleteImage(publicId);
    }

    await deleteHeroSlide(id);
    return NextResponse.json({ success: true, message: "Slide deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

