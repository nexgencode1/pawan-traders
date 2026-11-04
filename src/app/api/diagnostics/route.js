import { NextResponse } from "next/server";
import { connectToDatabase, isMongoConnected } from "@/lib/mongodb";
import { isCloudinaryConfigured } from "@/lib/cloudinary";
import { testSmtpConnection } from "@/lib/smtp";
import {
  getProducts,
  getEnquiries,
  getHeroSlides,
  getGalleryItems,
} from "@/lib/dataStore";

export async function GET() {
  try {
    // 1. Check MongoDB
    let dbStatus = "offline_in_memory_fallback";
    let dbDetails = "Using in-memory fallback store with full mock persistence.";
    try {
      const db = await connectToDatabase();
      if (db && isMongoConnected()) {
        dbStatus = "connected";
        dbDetails = `Connected to MongoDB database: ${db.connection.name || "pawan-traders"}`;
      }
    } catch (dbErr) {
      dbDetails = `MongoDB connection attempt: ${dbErr.message}`;
    }

    // 2. Check Cloudinary
    const cloudinaryStatus = {
      configured: isCloudinaryConfigured,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME || "Not set (using base64 inline preview fallback)",
      apiKeyProvided: Boolean(process.env.CLOUDINARY_API_KEY),
      status: isCloudinaryConfigured ? "configured" : "fallback_mode",
    };

    // 3. Check SMTP
    const smtpStatus = await testSmtpConnection();

    // 4. Check Data Store
    const [products, enquiries, slides, gallery] = await Promise.all([
      getProducts(),
      getEnquiries(),
      getHeroSlides(false),
      getGalleryItems(),
    ]);

    const stats = {
      totalProducts: products.length,
      totalEnquiries: enquiries.length,
      newEnquiries: enquiries.filter((e) => e.status === "New").length,
      totalSlides: slides.length,
      totalGallery: gallery.length,
      isMongoConnected: isMongoConnected(),
    };

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      services: {
        database: {
          status: dbStatus,
          connected: isMongoConnected(),
          details: dbDetails,
        },
        cloudinary: cloudinaryStatus,
        smtp: smtpStatus,
      },
      stats,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

