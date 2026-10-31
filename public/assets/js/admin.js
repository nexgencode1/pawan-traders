/**
 * PAWAN TRADERS - Complete Admin Panel Controller
 * Category, Brand, Product, Enquiry, Branch & Content Management
 */

document.addEventListener("DOMContentLoaded", () => {
  window.admin = new PawanAdmin();
});

class PawanAdmin {
  constructor() {
    this.currentTab = "dashboard";
    this.init();
  }

  init() {
    this.checkAuth();
    this.bindEvents();
  }

  checkAuth() {
    const isAuth = window.db.checkAdminAuth();
    const loginView = document.getElementById("adminLoginView");
    const appView = document.getElementById("adminAppView");

    if (!isAuth) {
      if (loginView) loginView.style.display = "flex";
      if (appView) appView.style.display = "none";
    } else {
      if (loginView) loginView.style.display = "none";
      if (appView) appView.style.display = "flex";
      this.switchTab("dashboard");
    }
  }

  bindEvents() {
    // Login form
    const loginForm = document.getElementById("adminLoginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const user = document.getElementById("loginUser").value.trim();
        const pass = document.getElementById("loginPass").value.trim();
        const res = window.db.loginAdmin(user, pass);
        if (res.success) {
          this.showToast("Logged in successfully!", "success");
          this.checkAuth();
        } else {
          this.showToast(res.message, "error");
        }
      });
    }

    // Logout
    const logoutBtn = document.getElementById("adminLogoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        window.db.logoutAdmin();
        this.showToast("Logged out.", "success");
        this.checkAuth();
      });
    }

    // Sidebar navigation tabs
    document.querySelectorAll(".sidebar-link[data-tab]").forEach(link => {
      link.addEventListener("click", () => {
        const tab = link.getAttribute("data-tab");
        this.switchTab(tab);
      });
    });

    // Mobile sidebar toggle
    const toggleBtn = document.getElementById("adminMobileToggle");
    const sidebar = document.getElementById("adminSidebar");
    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("show");
      });
    }

    // Modal Close buttons
    document.querySelectorAll(".modal-close-btn, .modal-overlay").forEach(el => {
      el.addEventListener("click", (e) => {
        if (e.target === el) {
          this.closeModals();
        }
      });
    });
  }

  switchTab(tabName) {
    this.currentTab = tabName;

    // Update active nav links
    document.querySelectorAll(".sidebar-link[data-tab]").forEach(link => {
      if (link.getAttribute("data-tab") === tabName) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Hide all panels
    document.querySelectorAll(".admin-tab-pane").forEach(pane => {
      pane.style.display = "none";
    });

    // Show target pane
    const target = document.getElementById(`tab-${tabName}`);
    if (target) target.style.display = "block";

    // Update top header title
    const titleEl = document.getElementById("adminTopTitle");
    if (titleEl) {
      const titles = {
        dashboard: "Dashboard Overview",
        products: "Product Management (Catalogue)",
        categories: "Category Management (5 Categories)",
        brands: "Brand Management & Partnerships",
        enquiries: "Customer Enquiries & WhatsApp Leads",
        branches: "Branch Locations & Map Integration",
        settings: "Website Content & SEO Configuration",
        backup: "Data Backup & Factory Reset"
      };
      titleEl.textContent = titles[tabName] || "Admin Panel";
    }

    // Route renderers
    if (tabName === "dashboard") this.renderDashboard();
    else if (tabName === "products") this.renderProductsList();
    else if (tabName === "categories") this.renderCategoriesList();
    else if (tabName === "brands") this.renderBrandsList();
    else if (tabName === "enquiries") this.renderEnquiriesList();
    else if (tabName === "branches") this.renderBranchesForm();
    else if (tabName === "settings") this.renderSettingsForm();
  }

  // =================== DASHBOARD ===================
  renderDashboard() {
    const metrics = window.db.getDashboardMetrics();

    const pCount = document.getElementById("statTotalProducts");
    const cCount = document.getElementById("statTotalCategories");
    const bCount = document.getElementById("statTotalBrands");
    const eCount = document.getElementById("statTotalEnquiries");

    if (pCount) pCount.textContent = metrics.totalProducts;
    if (cCount) cCount.textContent = metrics.totalCategories;
    if (bCount) bCount.textContent = metrics.totalBrands;
    if (eCount) eCount.textContent = metrics.totalEnquiries;

    // Badge counter on enquiries sidebar
    const enqBadge = document.getElementById("sidebarEnquiriesCount");
    if (enqBadge) enqBadge.textContent = metrics.newEnquiries || 0;

    // Render recent enquiries table
    const tableBody = document.getElementById("dashboardRecentEnquiries");
    if (tableBody) {
      if (metrics.recentEnquiries.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #94A3B8; padding: 24px;">No enquiries yet.</td></tr>`;
      } else {
        tableBody.innerHTML = metrics.recentEnquiries.map(e => `
          <tr>
            <td><strong>${e.name}</strong><br><small style="color: #64748B;">${e.date}</small></td>
            <td><a href="tel:+91${e.mobile}" style="color: var(--admin-primary); font-weight: 700;">${e.mobile}</a></td>
            <td>${e.productName || e.categoryName}</td>
            <td><small>${e.branchName || 'Main Branch'}</small></td>
            <td><span class="status-badge ${e.status.toLowerCase().replace(' ', '')}">${e.status}</span></td>
            <td>
              <button class="table-action-btn whatsapp-reply" onclick="admin.replyCustomerWhatsApp('${e.id}')">
                <i class="fa-brands fa-whatsapp"></i> Chat
              </button>
            </td>
          </tr>
        `).join("");
      }
    }
  }

  // =================== PRODUCT MANAGEMENT ===================
  renderProductsList() {
    const tableBody = document.getElementById("productsTableBody");
    if (!tableBody) return;

    const products = window.db.getProducts({ onlyPublished: false });
    tableBody.innerHTML = products.map(p => {
      const brand = window.db.getBrandById(p.brandId);
      const cat = window.db.getCategoryById(p.categoryId);

      return `
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: 12px;">
              <img src="${p.image}" alt="${p.name}" style="width: 48px; height: 48px; object-fit: contain; background: #F8FAFC; border-radius: 6px; padding: 4px; border: 1px solid #E2E8F0;">
              <div>
                <strong>${p.name}</strong><br>
                <small style="color: #64748B;">Model: ${p.model} &bull; ${p.capacityAh}</small>
              </div>
            </div>
          </td>
          <td><span style="font-weight: 700; color: #1D4ED8;">${brand ? brand.name : '-'}</span></td>
          <td>${cat ? cat.name : '-'}</td>
          <td>${p.voltage}</td>
          <td><span class="status-badge ${p.published ? 'closed' : 'new'}">${p.published ? 'Published' : 'Draft'}</span></td>
          <td>
            <div style="display: flex; gap: 6px;">
              <button class="table-action-btn" onclick="admin.openEditProductModal('${p.id}')"><i class="fa-solid fa-pen"></i></button>
              <button class="table-action-btn delete" onclick="admin.deleteProduct('${p.id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  }

  openAddProductModal() {
    const form = document.getElementById("productForm");
    if (form) form.reset();
    document.getElementById("prodFormId").value = "";
    document.getElementById("prodModalHeading").textContent = "Add New Product";
    
    // Populate Categories & Brands in select
    this.populateProductFormSelects();

    document.getElementById("adminProductModal").classList.add("active");
  }

  openEditProductModal(id) {
    const prod = window.db.getProductById(id);
    if (!prod) return;

    this.populateProductFormSelects();

    document.getElementById("prodFormId").value = prod.id;
    document.getElementById("prodFormName").value = prod.name;
    document.getElementById("prodFormModel").value = prod.model;
    document.getElementById("prodFormBrand").value = prod.brandId;
    document.getElementById("prodFormCategory").value = prod.categoryId;
    document.getElementById("prodFormCapacity").value = prod.capacityAh;
    document.getElementById("prodFormVoltage").value = prod.voltage;
    document.getElementById("prodFormWarranty").value = prod.warranty;
    document.getElementById("prodFormPrice").value = prod.priceText || "";
    document.getElementById("prodFormBadge").value = prod.badge || "";
    document.getElementById("prodFormDesc").value = prod.shortDescription || "";
    document.getElementById("prodFormImage").value = prod.image || "";
    document.getElementById("prodFormFeatured").checked = !!prod.featured;
    document.getElementById("prodFormPublished").checked = prod.published !== false;

    document.getElementById("prodModalHeading").textContent = `Edit Product: ${prod.name}`;
    document.getElementById("adminProductModal").classList.add("active");
  }

  populateProductFormSelects() {
    const catSelect = document.getElementById("prodFormCategory");
    const brandSelect = document.getElementById("prodFormBrand");

    if (catSelect) {
      const cats = window.db.getCategories(false);
      catSelect.innerHTML = cats.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
    }
    if (brandSelect) {
      const brands = window.db.getBrands(false);
      brandSelect.innerHTML = brands.map(b => `<option value="${b.id}">${b.name}</option>`).join("");
    }
  }

  saveProductFromModal(e) {
    e.preventDefault();
    const id = document.getElementById("prodFormId").value;
    const name = document.getElementById("prodFormName").value.trim();
    const model = document.getElementById("prodFormModel").value.trim();
    const brandId = document.getElementById("prodFormBrand").value;
    const categoryId = document.getElementById("prodFormCategory").value;
    const capacityAh = document.getElementById("prodFormCapacity").value.trim();
    const voltage = document.getElementById("prodFormVoltage").value.trim();
    const warranty = document.getElementById("prodFormWarranty").value.trim();
    const priceText = document.getElementById("prodFormPrice").value.trim();
    const badge = document.getElementById("prodFormBadge").value.trim();
    const shortDescription = document.getElementById("prodFormDesc").value.trim();
    const image = document.getElementById("prodFormImage").value.trim() || "assets/images/products/automotive-battery.svg";
    const featured = document.getElementById("prodFormFeatured").checked;
    const published = document.getElementById("prodFormPublished").checked;

    if (!name || !model) {
      this.showToast("Product name and model number are required.", "error");
      return;
    }

    const payload = {
      name, model, brandId, categoryId, capacityAh, voltage, warranty,
      priceText, badge, shortDescription, image, featured, published
    };

    if (id) {
      window.db.updateProduct(id, payload);
      this.showToast("Product updated successfully!", "success");
    } else {
      window.db.addProduct(payload);
      this.showToast("New product created successfully!", "success");
    }

    this.closeModals();
    this.renderProductsList();
  }

  deleteProduct(id) {
    if (confirm("Are you sure you want to delete this product?")) {
      window.db.deleteProduct(id);
      this.showToast("Product deleted.", "success");
      this.renderProductsList();
    }
  }

  // =================== CATEGORY MANAGEMENT ===================
  renderCategoriesList() {
    const listBody = document.getElementById("categoriesTableBody");
    if (!listBody) return;

    const cats = window.db.getCategories(false);
    listBody.innerHTML = cats.map((c, idx) => `
      <tr>
        <td><strong>0${idx + 1}</strong></td>
        <td>
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="${c.image}" alt="${c.name}" style="width: 44px; height: 44px; object-fit: cover; border-radius: 6px;">
            <div>
              <strong>${c.name}</strong><br>
              <small style="color: #64748B;">${c.description.slice(0, 60)}...</small>
            </div>
          </div>
        </td>
        <td>${(c.subcategories || []).length} Types</td>
        <td><span class="status-badge ${c.active !== false ? 'closed' : 'new'}">${c.active !== false ? 'Active' : 'Hidden'}</span></td>
        <td>
          <button class="table-action-btn" onclick="admin.openEditCategoryModal('${c.id}')"><i class="fa-solid fa-pen"></i></button>
          <button class="table-action-btn delete" onclick="admin.deleteCategory('${c.id}')"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `).join("");
  }

  openAddCategoryModal() {
    const form = document.getElementById("categoryForm");
    if (form) form.reset();
    document.getElementById("catFormId").value = "";
    document.getElementById("catModalHeading").textContent = "Add Product Category";
    document.getElementById("adminCategoryModal").classList.add("active");
  }

  openEditCategoryModal(id) {
    const cat = window.db.getCategoryById(id);
    if (!cat) return;

    document.getElementById("catFormId").value = cat.id;
    document.getElementById("catFormName").value = cat.name;
    document.getElementById("catFormDesc").value = cat.description;
    document.getElementById("catFormImage").value = cat.image || "";
    document.getElementById("catFormActive").checked = cat.active !== false;

    document.getElementById("catModalHeading").textContent = `Edit Category: ${cat.name}`;
    document.getElementById("adminCategoryModal").classList.add("active");
  }

  saveCategoryFromModal(e) {
    e.preventDefault();
    const id = document.getElementById("catFormId").value;
    const name = document.getElementById("catFormName").value.trim();
    const description = document.getElementById("catFormDesc").value.trim();
    const image = document.getElementById("catFormImage").value.trim() || "assets/images/categories/automotive.svg";
    const active = document.getElementById("catFormActive").checked;

    if (!name) {
      this.showToast("Category name is required.", "error");
      return;
    }

    if (id) {
      window.db.updateCategory(id, { name, description, image, active });
      this.showToast("Category updated!", "success");
    } else {
      window.db.addCategory({ name, description, image, active });
      this.showToast("Category created!", "success");
    }

    this.closeModals();
    this.renderCategoriesList();
  }

  deleteCategory(id) {
    if (confirm("Are you sure you want to delete this category?")) {
      window.db.deleteCategory(id);
      this.showToast("Category removed.", "success");
      this.renderCategoriesList();
    }
  }

  // =================== BRAND MANAGEMENT ===================
  renderBrandsList() {
    const body = document.getElementById("brandsTableBody");
    if (!body) return;

    const brands = window.db.getBrands(false);
    body.innerHTML = brands.map(b => `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="${b.logo}" alt="${b.name}" style="height: 32px; width: auto; object-fit: contain;">
            <strong>${b.name}</strong>
          </div>
        </td>
        <td><small style="color: #64748B;">${b.tagline}</small></td>
        <td><small>${(b.categories || []).length} Categories</small></td>
        <td><span class="status-badge ${b.active !== false ? 'closed' : 'new'}">${b.active !== false ? 'Active' : 'Disabled'}</span></td>
        <td>
          <button class="table-action-btn" onclick="admin.openEditBrandModal('${b.id}')"><i class="fa-solid fa-pen"></i></button>
          <button class="table-action-btn delete" onclick="admin.deleteBrand('${b.id}')"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `).join("");
  }

  openAddBrandModal() {
    const form = document.getElementById("brandForm");
    if (form) form.reset();
    document.getElementById("brandFormId").value = "";
    document.getElementById("brandModalHeading").textContent = "Add Brand";
    document.getElementById("adminBrandModal").classList.add("active");
  }

  openEditBrandModal(id) {
    const brand = window.db.getBrandById(id);
    if (!brand) return;

    document.getElementById("brandFormId").value = brand.id;
    document.getElementById("brandFormName").value = brand.name;
    document.getElementById("brandFormTagline").value = brand.tagline || "";
    document.getElementById("brandFormLogo").value = brand.logo || "";
    document.getElementById("brandFormDesc").value = brand.description || "";
    document.getElementById("brandFormActive").checked = brand.active !== false;

    document.getElementById("brandModalHeading").textContent = `Edit Brand: ${brand.name}`;
    document.getElementById("adminBrandModal").classList.add("active");
  }

  saveBrandFromModal(e) {
    e.preventDefault();
    const id = document.getElementById("brandFormId").value;
    const name = document.getElementById("brandFormName").value.trim();
    const tagline = document.getElementById("brandFormTagline").value.trim();
    const logo = document.getElementById("brandFormLogo").value.trim() || "assets/images/brands/amaron.svg";
    const description = document.getElementById("brandFormDesc").value.trim();
    const active = document.getElementById("brandFormActive").checked;

    if (!name) {
      this.showToast("Brand name is required.", "error");
      return;
    }

    if (id) {
      window.db.updateBrand(id, { name, tagline, logo, description, active });
      this.showToast("Brand updated!", "success");
    } else {
      window.db.addBrand({ name, tagline, logo, description, active });
      this.showToast("Brand created!", "success");
    }

    this.closeModals();
    this.renderBrandsList();
  }

  deleteBrand(id) {
    if (confirm("Are you sure you want to delete this brand?")) {
      window.db.deleteBrand(id);
      this.showToast("Brand deleted.", "success");
      this.renderBrandsList();
    }
  }

  // =================== ENQUIRY MANAGEMENT ===================
  renderEnquiriesList() {
    const body = document.getElementById("enquiriesTableBody");
    const filterSelect = document.getElementById("enquiryStatusFilter");
    if (!body) return;

    const filterStatus = filterSelect ? filterSelect.value : null;
    const enquiries = window.db.getEnquiries(filterStatus);

    if (enquiries.length === 0) {
      body.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #94A3B8; padding: 24px;">No enquiries found.</td></tr>`;
      return;
    }

    body.innerHTML = enquiries.map(e => `
      <tr>
        <td>
          <strong>${e.name}</strong><br>
          <small style="color: #64748B;">${e.date}</small>
        </td>
        <td>
          <a href="tel:+91${e.mobile}" style="font-weight: 700; color: var(--admin-primary);">${e.mobile}</a><br>
          <small style="color: #64748B;">${e.email || 'No email'}</small>
        </td>
        <td><strong>${e.productName}</strong><br><small style="color: #64748B;">${e.categoryName}</small></td>
        <td><small>${e.branchName || '-'}</small></td>
        <td>
          <select class="form-control" style="height: 34px; padding: 4px 8px; font-size: 0.8rem; width: 130px;" onchange="admin.updateEnqStatus('${e.id}', this.value)">
            <option value="New" ${e.status === 'New' ? 'selected' : ''}>New</option>
            <option value="In Progress" ${e.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
            <option value="Contacted" ${e.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
            <option value="Closed" ${e.status === 'Closed' ? 'selected' : ''}>Closed / Won</option>
          </select>
        </td>
        <td>
          <button class="table-action-btn" onclick="admin.openEnquiryNotesModal('${e.id}')" title="View Message & Add Notes">
            <i class="fa-solid fa-file-lines"></i>
          </button>
          <button class="table-action-btn whatsapp-reply" onclick="admin.replyCustomerWhatsApp('${e.id}')" title="Reply on WhatsApp">
            <i class="fa-brands fa-whatsapp"></i>
          </button>
          <button class="table-action-btn delete" onclick="admin.deleteEnquiry('${e.id}')">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `).join("");
  }

  updateEnqStatus(id, newStatus) {
    window.db.updateEnquiryStatus(id, newStatus);
    this.showToast(`Status updated to ${newStatus}`, "success");
    this.renderDashboard();
  }

  openEnquiryNotesModal(id) {
    const enq = window.db.getEnquiries().find(e => e.id === id);
    if (!enq) return;

    document.getElementById("enqNoteId").value = enq.id;
    document.getElementById("enqNoteCustomer").textContent = `${enq.name} (${enq.mobile})`;
    document.getElementById("enqNoteMsg").textContent = enq.message || "No custom message provided.";
    document.getElementById("enqNoteInput").value = enq.notes || "";

    document.getElementById("adminEnquiryNotesModal").classList.add("active");
  }

  saveEnquiryNotes(e) {
    e.preventDefault();
    const id = document.getElementById("enqNoteId").value;
    const notes = document.getElementById("enqNoteInput").value.trim();

    window.db.updateEnquiryStatus(id, null, notes);
    this.showToast("Follow-up notes saved!", "success");
    this.closeModals();
    this.renderEnquiriesList();
  }

  replyCustomerWhatsApp(id) {
    const enq = window.db.getEnquiries().find(e => e.id === id);
    if (!enq) return;

    const cleanNum = enq.mobile.replace(/[^0-9]/g, "");
    const finalNum = cleanNum.startsWith("91") ? cleanNum : `91${cleanNum}`;
    const text = `Hello ${enq.name},\nThis is Mr. Pawan Kumar Kushwaha / Kartik Kushwaha from *Pawan Traders*. We received your website enquiry regarding *${enq.productName}*. How may we assist you today with pricing and installation?`;
    window.open(`https://wa.me/${finalNum}?text=${encodeURIComponent(text)}`, "_blank");
  }

  exportCSV() {
    const csvContent = window.db.exportEnquiriesCSV();
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Pawan_Traders_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.showToast("Enquiry CSV exported successfully!", "success");
  }

  deleteEnquiry(id) {
    if (confirm("Delete this customer enquiry record?")) {
      window.db.deleteEnquiry(id);
      this.showToast("Enquiry deleted.", "success");
      this.renderEnquiriesList();
      this.renderDashboard();
    }
  }

  // =================== BRANCH MANAGEMENT ===================
  renderBranchesForm() {
    const branches = window.db.getBranches();
    const b1 = branches.find(b => b.isMain) || branches[0];
    const b2 = branches.find(b => !b.isMain) || branches[1];

    if (b1) {
      document.getElementById("branch1Address").value = b1.address || "";
      document.getElementById("branch1Phone").value = b1.phone || "";
      document.getElementById("branch1Hours").value = b1.hours || "";
      document.getElementById("branch1Embed").value = b1.mapEmbedUrl || "";
    }
    if (b2) {
      document.getElementById("branch2Address").value = b2.address || "";
      document.getElementById("branch2Phone").value = b2.phone || "";
      document.getElementById("branch2Hours").value = b2.hours || "";
      document.getElementById("branch2Embed").value = b2.mapEmbedUrl || "";
    }
  }

  saveBranches(e) {
    e.preventDefault();
    const branches = window.db.getBranches();
    if (branches[0]) {
      window.db.updateBranch(branches[0].id, {
        address: document.getElementById("branch1Address").value.trim(),
        phone: document.getElementById("branch1Phone").value.trim(),
        hours: document.getElementById("branch1Hours").value.trim(),
        mapEmbedUrl: document.getElementById("branch1Embed").value.trim()
      });
    }
    if (branches[1]) {
      window.db.updateBranch(branches[1].id, {
        address: document.getElementById("branch2Address").value.trim(),
        phone: document.getElementById("branch2Phone").value.trim(),
        hours: document.getElementById("branch2Hours").value.trim(),
        mapEmbedUrl: document.getElementById("branch2Embed").value.trim()
      });
    }
    this.showToast("Branch information updated!", "success");
  }

  // =================== SETTINGS & SEO ===================
  renderSettingsForm() {
    const s = window.db.getSettings();

    document.getElementById("setBizName").value = s.businessName || "";
    document.getElementById("setDirector").value = s.director || "";
    document.getElementById("setManager").value = s.manager || "";
    document.getElementById("setEmail").value = s.email || "";
    document.getElementById("setCalling").value = s.callingNumber || "";
    document.getElementById("setWhatsApp").value = s.whatsAppNumber || "";
    document.getElementById("setManagerPhone").value = s.managerContact || "";
    document.getElementById("setAnnouncement").value = s.announcement || "";
    document.getElementById("setSeoTitle").value = s.seoTitle || "";
    document.getElementById("setSeoDesc").value = s.seoDescription || "";
    document.getElementById("setSeoKeywords").value = s.seoKeywords || "";
  }

  saveSettings(e) {
    e.preventDefault();
    const payload = {
      businessName: document.getElementById("setBizName").value.trim(),
      director: document.getElementById("setDirector").value.trim(),
      manager: document.getElementById("setManager").value.trim(),
      email: document.getElementById("setEmail").value.trim(),
      callingNumber: document.getElementById("setCalling").value.trim(),
      whatsAppNumber: document.getElementById("setWhatsApp").value.trim(),
      managerContact: document.getElementById("setManagerPhone").value.trim(),
      announcement: document.getElementById("setAnnouncement").value.trim(),
      seoTitle: document.getElementById("setSeoTitle").value.trim(),
      seoDescription: document.getElementById("setSeoDesc").value.trim(),
      seoKeywords: document.getElementById("setSeoKeywords").value.trim()
    };

    window.db.updateSettings(payload);
    this.showToast("Website Settings & SEO updated!", "success");
  }

  // =================== BACKUP & RESTORE ===================
  exportBackup() {
    const jsonStr = window.db.exportDatabaseJSON();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `pawan_traders_full_backup_${Date.now()}.json`;
    link.click();
    this.showToast("Database backup downloaded!", "success");
  }

  importBackup(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const res = window.db.importDatabaseJSON(e.target.result);
      if (res.success) {
        this.showToast("Database restored successfully!", "success");
        setTimeout(() => location.reload(), 800);
      } else {
        this.showToast(res.message, "error");
      }
    };
    reader.readAsText(file);
  }

  resetSeed() {
    if (confirm("Reset all products, brands, categories and settings back to original factory seeds? Any custom additions will be restored.")) {
      window.db.resetToSeed();
      this.showToast("Database restored to default factory seed!", "success");
      setTimeout(() => location.reload(), 800);
    }
  }

  closeModals() {
    document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
  }

  showToast(message, type = "success") {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    const icon = type === "success" ? "fa-circle-check" : "fa-triangle-exclamation";
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
}

