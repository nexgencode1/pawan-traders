import { connectToDatabase, isMongoConnected } from "./mongodb";
import HeroSlide from "@/models/HeroSlide";
import Product from "@/models/Product";
import GalleryItem from "@/models/GalleryItem";
import ContactSubmission from "@/models/ContactSubmission";
import SiteSetting from "@/models/SiteSetting";
import { INITIAL_DATA } from "@/data/pawanData";

let memorySettings = {
  announcementText: "⚡ Special Festive Offer: Flat 10% Off on Solar Hybrid Inverters & Free Battery Health Checkup at both Branches! Call 9935618513 / 9305839018",
  showAnnouncement: true,
  heroSingleText: "Authorized Wholesale & Retail Battery & Solar Superstore for Prayagraj & Kaushambi",
  showHeroSingleText: true,
};

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
    _id: "gal-01",
    title: "Pawan Traders Puramufti Showroom Front",
    caption: "Full inventory of Amaron, Exide, and Luminous batteries ready for dispatch on GT Road Puramufti.",
    imageUrl: "/assets/images/gallery/gallery-01.jpg",
    cloudinaryPublicId: "",
    category: "branches",
    featured: true,
    order: 1,
    createdAt: new Date(),
  },
  {
    _id: "gal-02",
    title: "Rooftop Solar Panel Structure Installation",
    caption: "High efficiency Mono-PERC rooftop project with PM Surya Ghar subsidy approval in Prayagraj region.",
    imageUrl: "/assets/images/gallery/gallery-02.jpg",
    cloudinaryPublicId: "",
    category: "solar",
    featured: true,
    order: 2,
    createdAt: new Date(),
  },
  {
    _id: "gal-03",
    title: "Inverter & Tall Tubular Battery Stock",
    caption: "Heavy duty inverter and tubular battery solutions tested and dispatched same-day.",
    imageUrl: "/assets/images/gallery/gallery-03.jpg",
    cloudinaryPublicId: "",
    category: "batteries",
    featured: true,
    order: 3,
    createdAt: new Date(),
  },
  {
    _id: "gal-04",
    title: "PM Surya Ghar On-Grid Solar Plant",
    caption: "Certified rooftop solar EPC installation with net-metering and direct bank subsidy.",
    imageUrl: "/assets/images/gallery/gallery-04.jpg",
    cloudinaryPublicId: "",
    category: "solar",
    featured: true,
    order: 4,
    createdAt: new Date(),
  },
  {
    _id: "gal-05",
    title: "Amaron & Exide Battery Display",
    caption: "100% genuine sealed batteries with official manufacturer barcode warranty registration.",
    imageUrl: "/assets/images/gallery/gallery-05.jpg",
    cloudinaryPublicId: "",
    category: "batteries",
    featured: true,
    order: 5,
    createdAt: new Date(),
  },
  {
    _id: "gal-06",
    title: "Lithium Inverter High-Capacity Bank",
    caption: "Next-gen wall mounted smart LiFePO4 energy storage system for silent backup.",
    imageUrl: "/assets/images/gallery/gallery-06.jpg",
    cloudinaryPublicId: "",
    category: "batteries",
    featured: true,
    order: 6,
    createdAt: new Date(),
  },
  {
    _id: "gal-07",
    title: "Charwa Branch Service Desk & Testing",
    caption: "Direct battery health testing, acid-level check, and fast doorstep delivery counter in Charwa.",
    imageUrl: "/assets/images/gallery/gallery-07.jpg",
    cloudinaryPublicId: "",
    category: "branches",
    featured: true,
    order: 7,
    createdAt: new Date(),
  },
  {
    _id: "gal-08",
    title: "Residential Solar Rooftop Setup",
    caption: "Complete 3kW to 10kW residential solar project lowering electricity bills to zero.",
    imageUrl: "/assets/images/gallery/gallery-08.jpg",
    cloudinaryPublicId: "",
    category: "solar",
    featured: true,
    order: 8,
    createdAt: new Date(),
  },
  {
    _id: "gal-09",
    title: "Heavy Commercial Automotive Battery Bank",
    caption: "High-cranking maintenance-free batteries for commercial transport and trucks.",
    imageUrl: "/assets/images/gallery/gallery-09.jpg",
    cloudinaryPublicId: "",
    category: "installations",
    featured: true,
    order: 9,
    createdAt: new Date(),
  },
  {
    _id: "gal-10",
    title: "Mono-PERC Solar Module Array",
    caption: "550W+ Tier-1 high efficiency solar panels with 25 years performance warranty.",
    imageUrl: "/assets/images/gallery/gallery-10.jpg",
    cloudinaryPublicId: "",
    category: "solar",
    featured: false,
    order: 10,
    createdAt: new Date(),
  },
  {
    _id: "gal-11",
    title: "Shop Inventory & Trolley Setups",
    caption: "Neat, modern battery trollies and sine wave inverter combinations for home safety.",
    imageUrl: "/assets/images/gallery/gallery-11.jpg",
    cloudinaryPublicId: "",
    category: "branches",
    featured: false,
    order: 11,
    createdAt: new Date(),
  },
  {
    _id: "gal-12",
    title: "Pure Sine Wave Inverter Connections",
    caption: "Microtek and Luminous smart inverters installed with clean wire management.",
    imageUrl: "/assets/images/gallery/gallery-12.jpg",
    cloudinaryPublicId: "",
    category: "batteries",
    featured: false,
    order: 12,
    createdAt: new Date(),
  },
  {
    _id: "gal-13",
    title: "Commercial Backup Power Inverter Rack",
    caption: "Heavy duty battery racks for offices, hospitals, and commercial complexes.",
    imageUrl: "/assets/images/gallery/gallery-13.jpg",
    cloudinaryPublicId: "",
    category: "installations",
    featured: false,
    order: 13,
    createdAt: new Date(),
  },
  {
    _id: "gal-14",
    title: "Rooftop Solar Net Metering Project",
    caption: "UPPCL net metering compliant bi-directional meter installation in Puramufti.",
    imageUrl: "/assets/images/gallery/gallery-14.jpg",
    cloudinaryPublicId: "",
    category: "solar",
    featured: false,
    order: 14,
    createdAt: new Date(),
  },
  {
    _id: "gal-15",
    title: "Same-Day Customer Dispatch Counter",
    caption: "Free fitting and delivery vehicles leaving for customer locations.",
    imageUrl: "/assets/images/gallery/gallery-15.jpg",
    cloudinaryPublicId: "",
    category: "branches",
    featured: false,
    order: 15,
    createdAt: new Date(),
  },
  {
    _id: "gal-16",
    title: "Solar PCU Hybrid Controller Setup",
    caption: "Intelligent solar power conditioning unit managing grid, battery, and solar power.",
    imageUrl: "/assets/images/gallery/gallery-16.jpg",
    cloudinaryPublicId: "",
    category: "solar",
    featured: false,
    order: 16,
    createdAt: new Date(),
  },
  {
    _id: "gal-17",
    title: "Industrial SMF UPS Battery Installation",
    caption: "12V VRLA Konta SMF battery bank installation for uninterrupted server operations.",
    imageUrl: "/assets/images/gallery/gallery-17.jpg",
    cloudinaryPublicId: "",
    category: "installations",
    featured: false,
    order: 17,
    createdAt: new Date(),
  },
  {
    _id: "gal-18",
    title: "Authorized Brand Battery Stockpile",
    caption: "Freshly manufactured batteries received directly from company depots.",
    imageUrl: "/assets/images/gallery/gallery-18.jpg",
    cloudinaryPublicId: "",
    category: "batteries",
    featured: false,
    order: 18,
    createdAt: new Date(),
  },
  {
    _id: "gal-19",
    title: "High-Efficiency Solar Inverter Unit",
    caption: "MPPT solar hybrid inverters ensuring maximum yield even on cloudy days.",
    imageUrl: "/assets/images/gallery/gallery-19.jpg",
    cloudinaryPublicId: "",
    category: "solar",
    featured: false,
    order: 19,
    createdAt: new Date(),
  },
  {
    _id: "gal-20",
    title: "Full Showroom Battery Inventory",
    caption: "Wide selection of 2-wheeler, car, inverter, and solar storage solutions.",
    imageUrl: "/assets/images/gallery/gallery-20.jpg",
    cloudinaryPublicId: "",
    category: "branches",
    featured: false,
    order: 20,
    createdAt: new Date(),
  },
  {
    _id: "gal-21",
    title: "Technician Battery Testing & Health Check",
    caption: "Digital load testers and hydrometers verifying battery gravity and health.",
    imageUrl: "/assets/images/gallery/gallery-21.jpg",
    cloudinaryPublicId: "",
    category: "branches",
    featured: false,
    order: 21,
    createdAt: new Date(),
  },
  {
    _id: "gal-22",
    title: "Solar Wiring & Lightning Protection",
    caption: "Safety earthing and surge protection devices installed for rooftop projects.",
    imageUrl: "/assets/images/gallery/gallery-22.jpg",
    cloudinaryPublicId: "",
    category: "solar",
    featured: false,
    order: 22,
    createdAt: new Date(),
  },
  {
    _id: "gal-23",
    title: "Charwa Main Market Store Display",
    caption: "Prominent location in front of Petrol Pump on Main Charwa Bazaar Road.",
    imageUrl: "/assets/images/gallery/gallery-23.jpg",
    cloudinaryPublicId: "",
    category: "branches",
    featured: false,
    order: 23,
    createdAt: new Date(),
  },
  {
    _id: "gal-24",
    title: "Home Inverter & Trolley Installation",
    caption: "Safe household installation keeping batteries neat, elevated, and well-ventilated.",
    imageUrl: "/assets/images/gallery/gallery-24.jpg",
    cloudinaryPublicId: "",
    category: "installations",
    featured: false,
    order: 24,
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
      const filter = activeOnly ? { active: true } : {};
      const dbSlides = await HeroSlide.find(filter).sort({ order: 1, createdAt: -1 }).lean();
      if (dbSlides && dbSlides.length > 0) {
        return dbSlides;
      }
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
      const dbProds = await Product.find(filter).sort({ order: 1, createdAt: -1 }).lean();
      if (dbProds && dbProds.length > 0) {
        return dbProds;
      }
    } catch (e) {
      console.warn("Error fetching products from Mongo:", e.message);
    }
  }
  return memoryProducts;
}

export async function getProductById(id) {
  if (!id) return null;
  const db = await connectToDatabase();
  if (db) {
    try {
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
      let prod = null;
      if (isObjectId) {
        prod = await Product.findById(id).lean();
      }
      if (!prod) {
        prod = await Product.findOne({ $or: [{ _id: id }, { id: id }, { model: id }] }).lean();
      }
      if (prod) return prod;
    } catch (e) {
      console.warn("Error finding product by id:", e.message);
    }
  }
  return memoryProducts.find((p) => String(p._id) === String(id) || p.id === id || p.model === id) || null;
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
      const query = category && category !== "all" ? { category } : {};
      const dbItems = await GalleryItem.find(query).sort({ order: 1, createdAt: -1 }).lean();
      if (dbItems && dbItems.length > 0) {
        return dbItems;
      }
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

export async function getSettings() {
  const db = await connectToDatabase();
  if (db) {
    try {
      let doc = await SiteSetting.findOne({ key: "general" }).lean();
      if (!doc) {
        doc = await SiteSetting.create({
          key: "general",
          announcementText: memorySettings.announcementText,
          showAnnouncement: memorySettings.showAnnouncement,
          heroSingleText: memorySettings.heroSingleText,
          showHeroSingleText: memorySettings.showHeroSingleText,
        });
      }
      return {
        announcementText: doc.announcementText || memorySettings.announcementText,
        showAnnouncement: doc.showAnnouncement !== false,
        heroSingleText: doc.heroSingleText !== undefined ? doc.heroSingleText : memorySettings.heroSingleText,
        showHeroSingleText: doc.showHeroSingleText !== false,
      };
    } catch (e) {}
  }
  return memorySettings;
}

export async function updateSettings(data) {
  if (data.announcementText !== undefined) {
    memorySettings.announcementText = data.announcementText;
  }
  if (data.showAnnouncement !== undefined) {
    memorySettings.showAnnouncement = Boolean(data.showAnnouncement);
  }
  if (data.heroSingleText !== undefined) {
    memorySettings.heroSingleText = data.heroSingleText;
  }
  if (data.showHeroSingleText !== undefined) {
    memorySettings.showHeroSingleText = Boolean(data.showHeroSingleText);
  }
  const db = await connectToDatabase();
  if (db) {
    try {
      const updated = await SiteSetting.findOneAndUpdate(
        { key: "general" },
        {
          announcementText: memorySettings.announcementText,
          showAnnouncement: memorySettings.showAnnouncement,
          heroSingleText: memorySettings.heroSingleText,
          showHeroSingleText: memorySettings.showHeroSingleText,
        },
        { upsert: true, new: true }
      ).lean();
      return {
        announcementText: updated.announcementText,
        showAnnouncement: updated.showAnnouncement !== false,
        heroSingleText: updated.heroSingleText,
        showHeroSingleText: updated.showHeroSingleText !== false,
      };
    } catch (e) {}
  }
  return memorySettings;
}

