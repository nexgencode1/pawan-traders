import { connectToDatabase, isMongoConnected } from "./mongodb";
import HeroSlide from "@/models/HeroSlide";
import Product from "@/models/Product";
import GalleryItem from "@/models/GalleryItem";
import ContactSubmission from "@/models/ContactSubmission";
import { INITIAL_DATA } from "@/data/pawanData";

// In-Memory Fallback State (used when MongoDB is not connected)
let memoryHeroSlides = [
  {
    _id: "slide-1",
    imageUrl: "/assets/images/categories/solar.svg",
    cloudinaryPublicId: "",
    title: "Official Battery & Solar Energy Superstore for Prayagraj & Kaushambi",
    badge: "100% Authorized Hub",
    button1Text: "Explore Products",
    button1Link: "/products",
    button2Text: "Solar Subsidy Calculator",
    button2Link: "/solar",
    order: 1,
    active: true,
    createdAt: new Date(),
  },
  {
    _id: "slide-2",
    imageUrl: "/assets/images/categories/lithium.svg",
    cloudinaryPublicId: "",
    title: "Advanced LiFePO4 Lithium Storage & Tall Tubular Inverter Setups",
    badge: "Vion Lithium Authorized",
    button1Text: "View Lithium Range",
    button1Link: "/products",
    button2Text: "Get WhatsApp Quote",
    button2Link: "https://wa.me/918299362360?text=Hello%20Pawan%20Traders,%20I%20need%20a%20quote%20for%20Lithium%20Inverter.",
    order: 2,
    active: true,
    createdAt: new Date(),
  },
  {
    _id: "slide-3",
    imageUrl: "/assets/images/categories/automotive.svg",
    cloudinaryPublicId: "",
    title: "", // Demonstrating optional single text!
    badge: "Same-Day Delivery & Free Fitting",
    button1Text: "Call Puramufti: 9935618513",
    button1Link: "tel:+919935618513",
    button2Text: "Call Charwa: 9305839018",
    button2Link: "tel:+919305839018",
    order: 3,
    active: true,
    createdAt: new Date(),
  },
];

let memoryGallery = [
  {
    _id: "gal-1",
    title: "10kW On-Grid Rooftop Solar Installation",
    caption: "High efficiency Mono-PERC rooftop project with PM Surya Ghar subsidy approval in Prayagraj.",
    imageUrl: "/assets/images/categories/solar.svg",
    cloudinaryPublicId: "",
    category: "solar",
    featured: true,
    order: 1,
    createdAt: new Date(),
  },
  {
    _id: "gal-2",
    title: "Puramufti Main Branch Battery Showroom",
    caption: "Full inventory of Amaron, Exide, and Luminous batteries ready for dispatch on GT Road Puramufti.",
    imageUrl: "/assets/images/categories/automotive.svg",
    cloudinaryPublicId: "",
    category: "branches",
    featured: true,
    order: 2,
    createdAt: new Date(),
  },
  {
    _id: "gal-3",
    title: "Vion LiFePO4 Home Energy Lithium Pack",
    caption: "Wall-mount smart lithium inverter battery installation for uninterruptible 24/7 backup.",
    imageUrl: "/assets/images/categories/lithium.svg",
    cloudinaryPublicId: "",
    category: "batteries",
    featured: true,
    order: 3,
    createdAt: new Date(),
  },
  {
    _id: "gal-4",
    title: "Charwa Branch Kaushambi Service Station",
    caption: "Direct battery health testing, acid-level check, and fast doorstep delivery counter in Charwa.",
    imageUrl: "/assets/images/categories/water.svg",
    cloudinaryPublicId: "",
    category: "branches",
    featured: true,
    order: 4,
    createdAt: new Date(),
  },
  {
    _id: "gal-5",
    title: "Commercial UPS Dry Battery Bank Setup",
    caption: "12V VRLA Konta SMF battery bank installation for bank server and hospital backup.",
    imageUrl: "/assets/images/categories/dry.svg",
    cloudinaryPublicId: "",
    category: "installations",
    featured: true,
    order: 5,
    createdAt: new Date(),
  },
];

let memoryProducts = INITIAL_DATA.products.map((p) => ({
  _id: p.id,
  ...p,
  createdAt: new Date(),
}));

let memoryEnquiries = [
  {
    _id: "enq-101",
    name: "Ramesh Singh",
    phone: "9876543210",
    email: "ramesh.singh@example.com",
    branch: "Main Branch - Puramufti (Prayagraj)",
    category: "cat-automotive",
    batteryOrSolarReq: "Amaron Pro 65Ah Car Battery",
    message: "Need urgent replacement for my Creta car near Puramufti crossing.",
    status: "New",
    createdAt: new Date(Date.now() - 3600000 * 2),
  },
  {
    _id: "enq-102",
    name: "Vikas Patel",
    phone: "9123456789",
    email: "vikas.charwa@gmail.com",
    branch: "Second Branch - Charwa Town (Kaushambi)",
    category: "cat-solar",
    batteryOrSolarReq: "3kW Rooftop Solar System with Subsidy",
    message: "Want to install solar under PM Surya Ghar Yojana. Please share estimate.",
    status: "Contacted",
    createdAt: new Date(Date.now() - 86400000),
  },
];

// Helper: Seed DB if empty
async function seedDatabaseIfEmpty() {
  const db = await connectToDatabase();
  if (!db) return false;

  try {
    const slideCount = await HeroSlide.countDocuments();
    if (slideCount === 0) {
      const slidesToSeed = memoryHeroSlides.map(({ _id, ...rest }) => rest);
      await HeroSlide.insertMany(slidesToSeed);
    }

    const prodCount = await Product.countDocuments();
    if (prodCount === 0) {
      const prodsToSeed = memoryProducts.map(({ _id, ...rest }) => rest);
      await Product.insertMany(prodsToSeed);
    }

    const galCount = await GalleryItem.countDocuments();
    if (galCount === 0) {
      const galToSeed = memoryGallery.map(({ _id, ...rest }) => rest);
      await GalleryItem.insertMany(galToSeed);
    }

    const enqCount = await ContactSubmission.countDocuments();
    if (enqCount === 0) {
      const enqToSeed = memoryEnquiries.map(({ _id, ...rest }) => rest);
      await ContactSubmission.insertMany(enqToSeed);
    }

    return true;
  } catch (err) {
    console.warn("DB seeding notice:", err.message);
    return false;
  }
}

// ================= HERO SLIDES =================
export async function getHeroSlides(activeOnly = true) {
  const db = await connectToDatabase();
  if (db) {
    try {
      await seedDatabaseIfEmpty();
      const filter = activeOnly ? { active: true } : {};
      return await HeroSlide.find(filter).sort({ order: 1, createdAt: -1 }).lean();
    } catch (e) {
      console.warn("Error fetching hero slides from Mongo, falling back to memory:", e.message);
    }
  }
  return activeOnly ? memoryHeroSlides.filter((s) => s.active) : memoryHeroSlides;
}

export async function createHeroSlide(data) {
  const db = await connectToDatabase();
  if (db) {
    try {
      const newSlide = await HeroSlide.create(data);
      return newSlide.toObject();
    } catch (e) {
      console.warn("Error inserting slide to Mongo:", e.message);
    }
  }
  const fallback = {
    _id: "slide-" + Date.now(),
    ...data,
    createdAt: new Date(),
  };
  memoryHeroSlides.unshift(fallback);
  return fallback;
}

export async function updateHeroSlide(id, data) {
  const db = await connectToDatabase();
  if (db) {
    try {
      const updated = await HeroSlide.findByIdAndUpdate(id, data, { new: true }).lean();
      if (updated) return updated;
    } catch (e) {}
  }
  const idx = memoryHeroSlides.findIndex((s) => String(s._id) === String(id));
  if (idx !== -1) {
    memoryHeroSlides[idx] = { ...memoryHeroSlides[idx], ...data };
    return memoryHeroSlides[idx];
  }
  return null;
}

export async function deleteHeroSlide(id) {
  const db = await connectToDatabase();
  if (db) {
    try {
      await HeroSlide.findByIdAndDelete(id);
      return true;
    } catch (e) {}
  }
  memoryHeroSlides = memoryHeroSlides.filter((s) => String(s._id) !== String(id));
  return true;
}

// ================= PRODUCTS =================
export async function getProducts(filter = {}) {
  const db = await connectToDatabase();
  if (db) {
    try {
      await seedDatabaseIfEmpty();
      return await Product.find(filter).sort({ order: 1, createdAt: -1 }).lean();
    } catch (e) {
      console.warn("Error fetching products from Mongo:", e.message);
    }
  }
  return memoryProducts;
}

export async function createProduct(data) {
  const db = await connectToDatabase();
  if (db) {
    try {
      const newProd = await Product.create(data);
      return newProd.toObject();
    } catch (e) {}
  }
  const fallback = {
    _id: "prod-" + Date.now(),
    ...data,
    createdAt: new Date(),
  };
  memoryProducts.unshift(fallback);
  return fallback;
}

export async function updateProduct(id, data) {
  const db = await connectToDatabase();
  if (db) {
    try {
      const updated = await Product.findByIdAndUpdate(id, data, { new: true }).lean();
      if (updated) return updated;
    } catch (e) {}
  }
  const idx = memoryProducts.findIndex((p) => String(p._id) === String(id) || p.id === id);
  if (idx !== -1) {
    memoryProducts[idx] = { ...memoryProducts[idx], ...data };
    return memoryProducts[idx];
  }
  return null;
}

export async function deleteProduct(id) {
  const db = await connectToDatabase();
  if (db) {
    try {
      await Product.findByIdAndDelete(id);
      return true;
    } catch (e) {}
  }
  memoryProducts = memoryProducts.filter((p) => String(p._id) !== String(id) && p.id !== id);
  return true;
}

// ================= GALLERY =================
export async function getGalleryItems(category = null) {
  const db = await connectToDatabase();
  if (db) {
    try {
      await seedDatabaseIfEmpty();
      const query = category && category !== "all" ? { category } : {};
      return await GalleryItem.find(query).sort({ order: 1, createdAt: -1 }).lean();
    } catch (e) {}
  }
  if (category && category !== "all") {
    return memoryGallery.filter((g) => g.category === category);
  }
  return memoryGallery;
}

export async function createGalleryItem(data) {
  const db = await connectToDatabase();
  if (db) {
    try {
      const item = await GalleryItem.create(data);
      return item.toObject();
    } catch (e) {}
  }
  const fallback = {
    _id: "gal-" + Date.now(),
    ...data,
    createdAt: new Date(),
  };
  memoryGallery.unshift(fallback);
  return fallback;
}

export async function deleteGalleryItem(id) {
  const db = await connectToDatabase();
  if (db) {
    try {
      await GalleryItem.findByIdAndDelete(id);
      return true;
    } catch (e) {}
  }
  memoryGallery = memoryGallery.filter((g) => String(g._id) !== String(id));
  return true;
}

// ================= ENQUIRIES / CONTACT SUBMISSIONS =================
export async function getEnquiries() {
  const db = await connectToDatabase();
  if (db) {
    try {
      await seedDatabaseIfEmpty();
      return await ContactSubmission.find({}).sort({ createdAt: -1 }).lean();
    } catch (e) {}
  }
  return memoryEnquiries;
}

export async function createEnquiry(data) {
  const db = await connectToDatabase();
  if (db) {
    try {
      const submission = await ContactSubmission.create(data);
      return submission.toObject();
    } catch (e) {}
  }
  const fallback = {
    _id: "enq-" + Date.now(),
    ...data,
    status: data.status || "New",
    createdAt: new Date(),
  };
  memoryEnquiries.unshift(fallback);
  return fallback;
}

export async function updateEnquiryStatus(id, status, notes = "") {
  const db = await connectToDatabase();
  if (db) {
    try {
      const updateData = { status };
      if (notes) updateData.notes = notes;
      const updated = await ContactSubmission.findByIdAndUpdate(id, updateData, { new: true }).lean();
      if (updated) return updated;
    } catch (e) {}
  }
  const idx = memoryEnquiries.findIndex((e) => String(e._id) === String(id));
  if (idx !== -1) {
    memoryEnquiries[idx].status = status;
    if (notes) memoryEnquiries[idx].notes = notes;
    return memoryEnquiries[idx];
  }
  return null;
}

export async function deleteEnquiry(id) {
  const db = await connectToDatabase();
  if (db) {
    try {
      await ContactSubmission.findByIdAndDelete(id);
      return true;
    } catch (e) {}
  }
  memoryEnquiries = memoryEnquiries.filter((e) => String(e._id) !== String(id));
  return true;
}

