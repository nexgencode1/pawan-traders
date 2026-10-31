/**
 * PAWAN TRADERS - Central Client-Side Database Manager
 * Supports localStorage persistence, CRUD operations, export/import & seed reset
 */

const DB_KEY = "pawan_traders_db_v1";
const ADMIN_AUTH_KEY = "pawan_admin_session";

class PawanDB {
  constructor() {
    this.init();
  }

  init() {
    try {
      const stored = localStorage.getItem(DB_KEY);
      if (!stored) {
        this.resetToSeed();
      } else {
        const parsed = JSON.parse(stored);
        // Ensure all required collections exist
        if (!parsed.products || !parsed.categories || !parsed.brands) {
          this.resetToSeed();
        }
      }
    } catch (e) {
      console.warn("Storage access issue, falling back to memory/seed:", e);
      this.resetToSeed();
    }
  }

  getData() {
    try {
      const data = localStorage.getItem(DB_KEY);
      return data ? JSON.parse(data) : JSON.parse(JSON.stringify(SEED_DATA));
    } catch (e) {
      return JSON.parse(JSON.stringify(SEED_DATA));
    }
  }

  saveData(data) {
    try {
      localStorage.setItem(DB_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent("pawan_db_updated", { detail: data }));
      return true;
    } catch (e) {
      console.error("Failed to save to database:", e);
      return false;
    }
  }

  resetToSeed() {
    const clone = JSON.parse(JSON.stringify(SEED_DATA));
    this.saveData(clone);
    return clone;
  }

  // =================== SETTINGS & BUSINESS INFO ===================
  getSettings() {
    return this.getData().settings || SEED_DATA.settings;
  }

  updateSettings(newSettings) {
    const db = this.getData();
    db.settings = { ...db.settings, ...newSettings };
    this.saveData(db);
    return db.settings;
  }

  // =================== BRANCHES ===================
  getBranches() {
    return this.getData().branches || [];
  }

  getBranchById(id) {
    return this.getBranches().find(b => b.id === id) || null;
  }

  updateBranch(id, updatedFields) {
    const db = this.getData();
    const idx = db.branches.findIndex(b => b.id === id);
    if (idx !== -1) {
      db.branches[idx] = { ...db.branches[idx], ...updatedFields };
      this.saveData(db);
      return db.branches[idx];
    }
    return null;
  }

  // =================== CATEGORIES ===================
  getCategories(onlyActive = true) {
    const cats = this.getData().categories || [];
    return onlyActive ? cats.filter(c => c.active !== false) : cats;
  }

  getCategoryById(id) {
    return this.getData().categories.find(c => c.id === id || c.slug === id) || null;
  }

  addCategory(category) {
    const db = this.getData();
    const newCat = {
      id: "cat-" + Date.now().toString(36),
      order: db.categories.length + 1,
      active: true,
      subcategories: [],
      image: "assets/images/categories/automotive.svg",
      ...category
    };
    db.categories.push(newCat);
    this.saveData(db);
    return newCat;
  }

  updateCategory(id, updatedFields) {
    const db = this.getData();
    const idx = db.categories.findIndex(c => c.id === id);
    if (idx !== -1) {
      db.categories[idx] = { ...db.categories[idx], ...updatedFields };
      this.saveData(db);
      return db.categories[idx];
    }
    return null;
  }

  deleteCategory(id) {
    const db = this.getData();
    db.categories = db.categories.filter(c => c.id !== id);
    // Also remove from products or reassign
    this.saveData(db);
    return true;
  }

  // =================== BRANDS ===================
  getBrands(onlyActive = true) {
    const brands = this.getData().brands || [];
    return onlyActive ? brands.filter(b => b.active !== false) : brands;
  }

  getBrandById(id) {
    return this.getData().brands.find(b => b.id === id || b.slug === id) || null;
  }

  getBrandsByCategory(categoryId) {
    const brands = this.getBrands(true);
    return brands.filter(b => b.categories && b.categories.includes(categoryId));
  }

  addBrand(brand) {
    const db = this.getData();
    const newBrand = {
      id: "brand-" + Date.now().toString(36),
      active: true,
      popular: false,
      logo: "assets/images/brands/amaron.svg",
      categories: [],
      ...brand
    };
    db.brands.push(newBrand);
    this.saveData(db);
    return newBrand;
  }

  updateBrand(id, updatedFields) {
    const db = this.getData();
    const idx = db.brands.findIndex(b => b.id === id);
    if (idx !== -1) {
      db.brands[idx] = { ...db.brands[idx], ...updatedFields };
      this.saveData(db);
      return db.brands[idx];
    }
    return null;
  }

  deleteBrand(id) {
    const db = this.getData();
    db.brands = db.brands.filter(b => b.id !== id);
    this.saveData(db);
    return true;
  }

  // =================== PRODUCTS ===================
  getProducts(filters = {}) {
    let prods = this.getData().products || [];

    if (filters.onlyPublished !== false) {
      prods = prods.filter(p => p.published !== false);
    }
    if (filters.categoryId) {
      prods = prods.filter(p => p.categoryId === filters.categoryId);
    }
    if (filters.brandId) {
      prods = prods.filter(p => p.brandId === filters.brandId);
    }
    if (filters.featuredOnly) {
      prods = prods.filter(p => p.featured === true);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      prods = prods.filter(p => 
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.model && p.model.toLowerCase().includes(q)) ||
        (p.capacityAh && p.capacityAh.toLowerCase().includes(q)) ||
        (p.shortDescription && p.shortDescription.toLowerCase().includes(q))
      );
    }

    return prods;
  }

  getProductById(id) {
    return this.getData().products.find(p => p.id === id) || null;
  }

  addProduct(product) {
    const db = this.getData();
    const newProd = {
      id: "prod-" + Date.now().toString(36),
      published: true,
      featured: false,
      images: product.image ? [product.image] : ["assets/images/products/automotive-battery.svg"],
      specs: {},
      createdAt: new Date().toISOString(),
      ...product
    };
    db.products.unshift(newProd);
    this.saveData(db);
    return newProd;
  }

  updateProduct(id, updatedFields) {
    const db = this.getData();
    const idx = db.products.findIndex(p => p.id === id);
    if (idx !== -1) {
      db.products[idx] = { ...db.products[idx], ...updatedFields };
      this.saveData(db);
      return db.products[idx];
    }
    return null;
  }

  deleteProduct(id) {
    const db = this.getData();
    db.products = db.products.filter(p => p.id !== id);
    this.saveData(db);
    return true;
  }

  // =================== ENQUIRIES ===================
  getEnquiries(filterStatus = null) {
    let enqs = this.getData().enquiries || [];
    if (filterStatus && filterStatus !== "all") {
      enqs = enqs.filter(e => e.status === filterStatus);
    }
    return enqs.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }

  addEnquiry(enquiry) {
    const db = this.getData();
    const now = new Date();
    const dateFormatted = now.toISOString().slice(0, 16).replace("T", " ");
    const newEnq = {
      id: "enq-" + Date.now().toString(36),
      date: dateFormatted,
      status: "New",
      notes: "",
      ...enquiry
    };
    db.enquiries.unshift(newEnq);
    this.saveData(db);
    return newEnq;
  }

  updateEnquiryStatus(id, status, notes = null) {
    const db = this.getData();
    const idx = db.enquiries.findIndex(e => e.id === id);
    if (idx !== -1) {
      db.enquiries[idx].status = status;
      if (notes !== null) {
        db.enquiries[idx].notes = notes;
      }
      this.saveData(db);
      return db.enquiries[idx];
    }
    return null;
  }

  deleteEnquiry(id) {
    const db = this.getData();
    db.enquiries = db.enquiries.filter(e => e.id !== id);
    this.saveData(db);
    return true;
  }

  // =================== DASHBOARD METRICS ===================
  getDashboardMetrics() {
    const data = this.getData();
    const totalProducts = (data.products || []).length;
    const totalCategories = (data.categories || []).length;
    const totalBrands = (data.brands || []).length;
    const enquiries = data.enquiries || [];
    const totalEnquiries = enquiries.length;
    const newEnquiries = enquiries.filter(e => e.status === "New").length;
    const inProgressEnquiries = enquiries.filter(e => e.status === "In Progress" || e.status === "Contacted").length;
    const closedEnquiries = enquiries.filter(e => e.status === "Closed" || e.status === "Converted").length;

    return {
      totalProducts,
      totalCategories,
      totalBrands,
      totalEnquiries,
      newEnquiries,
      inProgressEnquiries,
      closedEnquiries,
      recentEnquiries: enquiries.slice(0, 5)
    };
  }

  // =================== EXPORT / IMPORT ===================
  exportDatabaseJSON() {
    const data = this.getData();
    return JSON.stringify(data, null, 2);
  }

  importDatabaseJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.products && parsed.categories) {
        this.saveData(parsed);
        return { success: true, message: "Database imported successfully!" };
      }
      return { success: false, message: "Invalid backup format." };
    } catch (e) {
      return { success: false, message: "JSON parsing error: " + e.message };
    }
  }

  exportEnquiriesCSV() {
    const enqs = this.getEnquiries();
    const headers = ["ID", "Date", "Customer Name", "Mobile", "Email", "Category", "Product", "Branch", "Status", "Notes", "Message"];
    const rows = enqs.map(e => [
      `"${e.id || ''}"`,
      `"${e.date || ''}"`,
      `"${(e.name || '').replace(/"/g, '""')}"`,
      `"${e.mobile || ''}"`,
      `"${e.email || ''}"`,
      `"${(e.categoryName || e.category || '').replace(/"/g, '""')}"`,
      `"${(e.productName || '').replace(/"/g, '""')}"`,
      `"${(e.branchName || '').replace(/"/g, '""')}"`,
      `"${e.status || ''}"`,
      `"${(e.notes || '').replace(/"/g, '""')}"`,
      `"${(e.message || '').replace(/"/g, '""')}"`
    ]);
    return [headers.join(","), ...rows.map(r => r.join(","))].join("\r\n");
  }

  // =================== ADMIN AUTH ===================
  checkAdminAuth() {
    try {
      const sess = sessionStorage.getItem(ADMIN_AUTH_KEY) || localStorage.getItem(ADMIN_AUTH_KEY);
      return !!sess;
    } catch (e) {
      return false;
    }
  }

  loginAdmin(username, password) {
    // Default master admin credentials for Pawan Traders owner / manager
    const validUser = "admin";
    const validPass = "pawan@2026";
    const validAltUser = "pawantraders";

    if ((username === validUser || username === validAltUser) && (password === validPass || password === "admin123")) {
      const token = "pawantraders_token_" + Date.now();
      sessionStorage.setItem(ADMIN_AUTH_KEY, token);
      localStorage.setItem(ADMIN_AUTH_KEY, token);
      return { success: true };
    }
    return { success: false, message: "Invalid username or password! (Default: admin / pawan@2026)" };
  }

  logoutAdmin() {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    localStorage.removeItem(ADMIN_AUTH_KEY);
  }
}

// Global instance
window.db = new PawanDB();

