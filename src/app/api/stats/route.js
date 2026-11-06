import { NextResponse } from "next/server";
import { isMongoConnected } from "@/lib/mongodb";
import { isCloudinaryConfigured } from "@/lib/cloudinary";
import {
  getProducts,
  getEnquiries,
  getHeroSlides,
  getGalleryItems,
  getTeamMembers,
} from "@/lib/dataStore";

export async function GET() {
  try {
    const [products, enquiries, slides, gallery, teamMembers] = await Promise.all([
      getProducts(),
      getEnquiries(),
      getHeroSlides(false),
      getGalleryItems(),
      getTeamMembers(false),
    ]);

    const newEnquiriesCount = enquiries.filter((e) => e.status === "New").length;

    return NextResponse.json({
      success: true,
      stats: {
        totalProducts: products.length,
        totalEnquiries: enquiries.length,
        newEnquiries: newEnquiriesCount,
        totalSlides: slides.length,
        totalGallery: gallery.length,
        totalTeamMembers: teamMembers.length,
        isMongoConnected: isMongoConnected(),
        isCloudinaryConfigured: isCloudinaryConfigured,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

