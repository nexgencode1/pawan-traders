import { NextResponse } from "next/server";
import crypto from "crypto";

function getSecret() {
  return process.env.ADMIN_PASSWORD || process.env.SESSION_SECRET || "pawan-traders-admin-secret-key-2026";
}

function getValidCredentials() {
  const envUser = (process.env.ADMIN_USERNAME || "").trim();
  const envPass = (process.env.ADMIN_PASSWORD || "").trim();

  return { envUser, envPass };
}

// Create a tamper-proof signed session token: username:timestamp:signature
function createSignedToken(username) {
  const timestamp = Date.now();
  const secret = getSecret();
  const payload = `${username}:${timestamp}`;
  const signature = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return `${username}:${timestamp}:${signature}`;
}

// Verify tamper-proof token and expiration (7 days)
function verifyToken(token) {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(":");
  if (parts.length !== 3) return false;

  const [username, timestampStr, signature] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Max age: 7 days
  const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
  if (Date.now() - timestamp > MAX_AGE_MS) return false;

  const secret = getSecret();
  const expectedPayload = `${username}:${timestamp}`;
  const expectedSignature = crypto.createHmac("sha256", secret).update(expectedPayload).digest("hex");

  if (crypto.timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expectedSignature, "hex"))) {
    return { username, timestamp };
  }
  return false;
}

// GET: Check session
export async function GET(request) {
  const sessionCookie = request.cookies.get("pt_admin_session")?.value;
  if (sessionCookie && verifyToken(sessionCookie)) {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}

// POST: Authenticate strictly from .env
export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const cleanUser = (username || "").trim().toLowerCase();
    const cleanPass = (password || "").trim();

    const { envUser, envPass } = getValidCredentials();

    // If credentials are not set in environment, block login completely for security
    if (!envUser || !envPass) {
      return NextResponse.json(
        {
          success: false,
          error: "Admin credentials are not configured in environment variables (ADMIN_USERNAME & ADMIN_PASSWORD).",
        },
        { status: 500 }
      );
    }

    // Strict match against .env only
    if (cleanUser === envUser.toLowerCase() && cleanPass === envPass) {
      const token = createSignedToken(cleanUser);

      const response = NextResponse.json({
        success: true,
        message: "Authentication successful",
        user: cleanUser,
      });

      // Set cookie
      response.cookies.set({
        name: "pt_admin_session",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid username or password. Please verify your .env credentials." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Logout
export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out" });
  response.cookies.delete("pt_admin_session");
  return response;
}
