import mongoose from "mongoose";

const ContactSubmissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      default: "",
      trim: true,
    },
    branch: {
      type: String,
      default: "Main Branch - Puramufti (Prayagraj)",
    },
    category: {
      type: String,
      default: "General Enquiry",
    },
    batteryOrSolarReq: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "In Progress", "Closed"],
      default: "New",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ContactSubmission || mongoose.model("ContactSubmission", ContactSubmissionSchema);

