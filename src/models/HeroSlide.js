import mongoose from "mongoose";

const HeroSlideSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    cloudinaryPublicId: {
      type: String,
      default: "",
    },
    // Single text (Optional, as requested by the user)
    title: {
      type: String,
      default: "",
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    badge: {
      type: String,
      default: "",
    },
    // Two action buttons
    button1Text: {
      type: String,
      default: "Explore Products",
    },
    button1Link: {
      type: String,
      default: "/products",
    },
    button2Text: {
      type: String,
      default: "WhatsApp Quote",
    },
    button2Link: {
      type: String,
      default: "https://wa.me/918299362360?text=Hello%20Pawan%20Traders,%20I%20am%20interested%20in%20battery%20and%20solar%20solutions.",
    },
    order: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.HeroSlide || mongoose.model("HeroSlide", HeroSlideSchema);

