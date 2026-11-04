import { NextResponse } from "next/server";
import {
  getEnquiries,
  createEnquiry,
  updateEnquiryStatus,
  deleteEnquiry,
} from "@/lib/dataStore";
import { sendEnquiryNotificationEmail } from "@/lib/smtp";

export async function GET() {
  try {
    const enquiries = await getEnquiries();
    return NextResponse.json({ success: true, enquiries });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: "Customer name and phone number are required" },
        { status: 400 }
      );
    }

    const newEnquiry = await createEnquiry({
      name: body.name,
      phone: body.phone,
      email: body.email || "",
      branch: body.branch || "Main Branch - Puramufti (Prayagraj)",
      category: body.category || "General",
      batteryOrSolarReq: body.batteryOrSolarReq || "",
      message: body.message || "",
      status: "New",
    });

    // Send asynchronous email notification (awaited so serverless / cloud process doesn't terminate before dispatch)
    let emailSent = false;
    try {
      const emailResult = await sendEnquiryNotificationEmail(newEnquiry);
      emailSent = emailResult?.success || false;
    } catch (emailErr) {
      console.warn("SMTP email notification warning:", emailErr.message);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully! Our team will contact you shortly.",
        enquiry: newEnquiry,
        emailNotificationSent: emailSent,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, status, notes } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Enquiry ID and status are required" }, { status: 400 });
    }

    const updated = await updateEnquiryStatus(id, status, notes);
    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Enquiry ID is required" }, { status: 400 });
    }

    await deleteEnquiry(id);
    return NextResponse.json({ success: true, message: "Enquiry deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

