import { v2 as cloudinary } from "cloudinary";

const isConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (isConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export { cloudinary, isConfigured as isCloudinaryConfigured };

/**
 * Upload an image buffer or base64 to Cloudinary
 * If Cloudinary is not configured, generates an inline base64 data URI fallback for instant preview
 */
export async function uploadImage(buffer, folder = "pawan-traders", mimeType = "image/jpeg") {
  if (!isConfigured) {
    // Graceful fallback for local development without credentials
    const base64Data = buffer.toString("base64");
    const dataUri = `data:${mimeType};base64,${base64Data}`;
    return {
      success: true,
      url: dataUri,
      public_id: `mock_${Date.now()}`,
      isMock: true,
      note: "Cloudinary credentials not set in .env.local; stored as inline preview."
    };
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload failed:", error);
          reject(error);
        } else {
          resolve({
            success: true,
            url: result.secure_url,
            public_id: result.public_id,
            isMock: false
          });
        }
      }
    );
    uploadStream.end(buffer);
  });
}

/**
 * Delete an image from Cloudinary by its public ID
 */
export async function deleteImage(publicId) {
  if (!isConfigured || !publicId || publicId.startsWith("mock_")) {
    return { success: true, isMock: true };
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return { success: true, result };
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return { success: false, error: error.message };
  }
}

