import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      default: "",
    },
    brandId: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    capacityAh: {
      type: String,
      default: "",
    },
    voltage: {
      type: String,
      default: "12V",
    },
    warranty: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      required: true,
    },
    cloudinaryPublicId: {
      type: String,
      default: "",
    },
    priceText: {
      type: String,
      default: "Call for Best Price",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: true,
    },
    badge: {
      type: String,
      default: "",
    },
    shortDescription: {
      type: String,
      default: "",
    },
    seoKeywords: {
      type: String,
      default: "",
    },
    seoDescription: {
      type: String,
      default: "",
    },
    specs: {
      type: Map,
      of: String,
      default: {},
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

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);

