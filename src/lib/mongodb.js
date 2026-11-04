import mongoose from "mongoose";
import dns from "dns";

// Configure fallback DNS servers for reliable MongoDB SRV lookup across ISP networks
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  // Graceful fallback if dns.setServers is restricted in certain runtimes
}

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  // If no MONGODB_URI is provided, or is localhost in production, return null immediately with 0ms delay
  if (
    !MONGODB_URI ||
    !MONGODB_URI.trim() ||
    (MONGODB_URI.includes("localhost") && process.env.NODE_ENV === "production")
  ) {
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((m) => {
        console.log("✓ Connected to MongoDB successfully:", m.connection.name);
        return m;
      })
      .catch((err) => {
        console.warn("⚠️ MongoDB offline, using rich default data store:", err.message);
        cached.promise = null;
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    return null;
  }

  return cached.conn;
}

export function isMongoConnected() {
  return mongoose.connection.readyState === 1;
}
