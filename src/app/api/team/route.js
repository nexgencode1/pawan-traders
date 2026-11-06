import { NextResponse } from "next/server";
import {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "@/lib/dataStore";
import { deleteImage } from "@/lib/cloudinary";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";
    const teamMembers = await getTeamMembers(!all);
    return NextResponse.json({ success: true, teamMembers });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.name || !body.name.trim()) {
      return NextResponse.json({ error: "Team member name is required" }, { status: 400 });
    }
    if (!body.designation || !body.designation.trim()) {
      return NextResponse.json({ error: "Designation is required" }, { status: 400 });
    }
    if (!body.image) {
      return NextResponse.json({ error: "Photo / Image is required" }, { status: 400 });
    }

    const member = await createTeamMember({
      name: body.name.trim(),
      designation: body.designation.trim(),
      eyebrow: body.eyebrow?.trim() || "",
      phone: body.phone?.trim() || "",
      image: body.image,
      cloudinaryPublicId: body.cloudinaryPublicId || "",
      quote: body.quote?.trim() || "",
      bio: body.bio?.trim() || "",
      order: Number(body.order) || 0,
      active: body.active !== undefined ? Boolean(body.active) : true,
    });

    return NextResponse.json({ success: true, teamMember: member }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "Team member ID is required" }, { status: 400 });
    }

    if (updateData.order !== undefined) {
      updateData.order = Number(updateData.order) || 0;
    }
    if (updateData.active !== undefined) {
      updateData.active = Boolean(updateData.active);
    }

    const updated = await updateTeamMember(id, updateData);
    if (!updated) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, teamMember: updated });
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
      return NextResponse.json({ error: "Team member ID is required" }, { status: 400 });
    }

    if (publicId) {
      try {
        await deleteImage(publicId);
      } catch (err) {
        console.warn("Could not delete image from Cloudinary:", err.message);
      }
    }

    await deleteTeamMember(id);
    return NextResponse.json({ success: true, message: "Team member deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

