import { NextResponse } from "next/server";
import crypto from "crypto";

// In-memory active tokens store (or signature based)
const activeSessions = new Set();

const VALID_USERNAMES = ["admin", "pawantraders", "pawan"];

function getValidPasswords() {
  const envPass = process.env.ADMIN_PASSWORD;
  const list = ["admin123", "pawan@2026"];
  if (envPass && !list.includes(envPass)) {
    list.push(envPass);
  }
  return list;
}

// Generate secure session token
function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

// GET: Check if current cookie session is authenticated
export async function GET(request) {
  const sessionCookie = request.cookies.get("pt_admin_session")?.value;

  if (sessionCookie && activeSessions.has(sessionCookie)) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}

// POST: Authenticate user & issue secure HTTP-only cookie
export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const cleanUser = (username || "").trim().toLowerCase();
    const cleanPass = (password || "").trim();

    const validPasswords = getValidPasswords();

    if (VALID_USERNAMES.includes(cleanUser) && validPasswords.includes(cleanPass)) {
      const token = generateToken();
      activeSessions.add(token);

      const response = NextResponse.json({
        success: true,
        message: "Authentication successful",
      });

      // Secure HTTP-Only Cookie
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
      { success: false, error: "Invalid username or password" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Logout & destroy cookie session
export async function DELETE(request) {
  const sessionCookie = request.cookies.get("pt_admin_session")?.value;
  if (sessionCookie) {
    activeSessions.delete(sessionCookie);
  }

  const response = NextResponse.json({ success: true, message: "Logged out" });
  response.cookies.delete("pt_admin_session");
  return response;
}

