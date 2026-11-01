import mongoose from "mongoose";

const SiteSettingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "general",
    },
    announcementText: {
      type: String,
      default: "⚡ Special Festive Offer: Flat 10% Off on Solar Hybrid Inverters & Free Battery Health Checkup at both Branches! Call 9935618513",
    },
    showAnnouncement: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.SiteSetting || mongoose.model("SiteSetting", SiteSettingSchema);

