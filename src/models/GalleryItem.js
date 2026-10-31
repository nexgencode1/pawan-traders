import mongoose from "mongoose";

const GalleryItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    caption: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      required: true,
    },
    cloudinaryPublicId: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: ["solar", "batteries", "branches", "installations", "general"],
      default: "general",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.GalleryItem || mongoose.model("GalleryItem", GalleryItemSchema);

