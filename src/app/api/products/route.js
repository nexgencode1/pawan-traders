import { NextResponse } from "next/server";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/dataStore";
import { deleteImage } from "@/lib/cloudinary";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const featured = searchParams.get("featured");

    const filter = {};
    if (category) filter.categoryId = category;
    if (brand) filter.brandId = brand;
    if (featured === "true") filter.featured = true;

    const products = await getProducts(filter);
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.name || !body.brandId || !body.categoryId || !body.image) {
      return NextResponse.json(
        { error: "Product name, brand, category, and image are required" },
        { status: 400 }
      );
    }

    const newProd = await createProduct({
      name: body.name,
      model: body.model || "",
      brandId: body.brandId,
      categoryId: body.categoryId,
      capacityAh: body.capacityAh || "",
      voltage: body.voltage || "12V",
      warranty: body.warranty || "",
      image: body.image,
      cloudinaryPublicId: body.cloudinaryPublicId || "",
      priceText: body.priceText || "Call for Best Price",
      featured: Boolean(body.featured),
      published: body.published !== undefined ? Boolean(body.published) : true,
      badge: body.badge || "",
      shortDescription: body.shortDescription || "",
      specs: body.specs || {},
      order: Number(body.order) || 0,
    });

    return NextResponse.json({ success: true, product: newProd }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const updated = await updateProduct(id, updateData);
    return NextResponse.json({ success: true, product: updated });
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
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    if (publicId) {
      await deleteImage(publicId);
    }

    await deleteProduct(id);
    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

