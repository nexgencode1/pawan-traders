/**
 * PAWAN TRADERS - Frontend Application Logic & Router
 * Battery, Inverter, UPS & Solar Energy Solutions
 */

document.addEventListener("DOMContentLoaded", () => {
  window.app = new PawanApp();
});

class PawanApp {
  constructor() {
    this.currentView = "home";
    this.filters = {
      categoryId: "",
      brandId: "",
      search: "",
      sortBy: "featured"
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.handleRoute();
    this.loadGlobalSettings();
    this.renderHomeSections();
    this.initSolarCalculator();

    // Listen for database changes from Admin
    window.addEventListener("pawan_db_updated", () => {
      this.refreshCurrentView();
    });
  }

  // =================== ROUTER & NAVIGATION ===================
  bindEvents() {
    // Hash change
    window.addEventListener("hashchange", () => this.handleRoute());

    // Mobile menu toggle
    const menuBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.getElementById("navLinks");
    if (menuBtn && navLinks) {
      menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");
        const icon = menuBtn.querySelector("i");
        if (icon) {
          icon.classList.toggle("fa-bars");
          icon.classList.toggle("fa-xmark");
        }
      });

      // Close mobile menu on link click
      navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("show");
          const icon = menuBtn.querySelector("i");
          if (icon) {
            icon.classList.add("fa-bars");
            icon.classList.remove("fa-xmark");
          }
        });
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

    // Global Enquiry Form submit
    const enquiryForm = document.getElementById("generalEnquiryForm");
    if (enquiryForm) {
      enquiryForm.addEventListener("submit", (e) => this.handleEnquirySubmit(e));
    }
  }

  handleRoute() {
    const hash = window.location.hash.replace("#", "") || "home";
    const parts = hash.split("/");
    const mainRoute = parts[0];
    const param = parts[1] || "";

    // Close any open mobile menus
    const navLinks = document.getElementById("navLinks");
    if (navLinks) navLinks.classList.remove("show");

    // Update active nav links
    document.querySelectorAll(".nav-item a").forEach(a => {
      const href = a.getAttribute("href");
      if (href === `#${mainRoute}` || (mainRoute === "home" && href === "#home")) {
        a.classList.add("active");
      } else {
        a.classList.remove("active");
      }
    });

    // View switching
    this.showView(mainRoute, param);
  }

  showView(viewName, param = "") {
    this.currentView = viewName;
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Hide all view containers
    document.querySelectorAll(".view-section").forEach(sec => {
      sec.style.display = "none";
    });

    const target = document.getElementById(`view-${viewName}`);
    if (target) {
      target.style.display = "block";
    } else {
      // Default fallback to home
      const home = document.getElementById("view-home");
      if (home) home.style.display = "block";
    }

    // Route-specific triggers
    if (viewName === "products") {
      if (param) {
        if (param.startsWith("cat-")) this.filters.categoryId = param;
        if (param.startsWith("brand-")) this.filters.brandId = param;
      }
      this.renderProductsCatalogue();
    } else if (viewName === "brands") {
      this.renderBrandsPage(param);
    } else if (viewName === "solar") {
      this.initSolarCalculator();
    } else if (viewName === "branches") {
      this.renderBranchesPage();
    } else if (viewName === "home") {
      this.renderHomeSections();
    }
  }

  refreshCurrentView() {
    this.loadGlobalSettings();
    if (this.currentView === "products") {
      this.renderProductsCatalogue();
    } else if (this.currentView === "brands") {
      this.renderBrandsPage();
    } else if (this.currentView === "home") {
      this.renderHomeSections();
    } else if (this.currentView === "branches") {
      this.renderBranchesPage();
    }
  }

  // =================== GLOBAL SETTINGS & BRANDING ===================
  loadGlobalSettings() {
    const settings = window.db.getSettings();
    const branches = window.db.getBranches();

    // Announcement bar
    const annEl = document.getElementById("topAnnouncement");
    if (annEl && settings.announcement) {
      annEl.innerHTML = `<i class="fa-solid fa-bolt"></i> ${settings.announcement}`;
    }

    // Contact numbers
    document.querySelectorAll(".dyn-call-number").forEach(el => {
      el.textContent = settings.callingNumber;
      if (el.tagName === "A") el.setAttribute("href", `tel:+91${settings.callingNumber}`);
    });

    document.querySelectorAll(".dyn-manager-number").forEach(el => {
      el.textContent = settings.managerContact;
      if (el.tagName === "A") el.setAttribute("href", `tel:+91${settings.managerContact}`);
    });

    // WhatsApp buttons
    document.querySelectorAll(".dyn-whatsapp-btn").forEach(el => {
      el.setAttribute("href", this.buildWhatsAppUrl("Hello Pawan Traders, I have an enquiry regarding battery/solar solutions."));
    });

    // Populate branch selectors in forms
    const branchSelects = document.querySelectorAll(".dyn-branch-select");
    branchSelects.forEach(sel => {
      sel.innerHTML = `<option value="">Select Nearest Branch</option>` +
        branches.map(b => `<option value="${b.id}">${b.name}</option>`).join("");
    });
  }

  // =================== HOME PAGE SECTIONS ===================
  renderHomeSections() {
    this.renderHomeCategories();
    this.renderHomeBrands();
    this.renderHomeFeaturedProducts();
    this.renderHomeBranches();
  }

  renderHomeCategories() {
    const catsContainer = document.getElementById("homeCategoriesContainer");
    if (!catsContainer) return;

    const categories = window.db.getCategories(true);
    catsContainer.innerHTML = categories.map((cat, idx) => `
      <div class="category-card" onclick="window.location.hash = 'products/${cat.id}'">
        <div class="cat-card-img-wrap">
          <img src="${cat.image}" alt="${cat.name}" class="cat-card-img" loading="lazy">
        </div>
        <div class="cat-card-body">
          <span class="cat-card-num">Category 0${idx + 1}</span>
          <h3 class="cat-card-title">${cat.name}</h3>
          <p class="cat-card-desc">${cat.description}</p>
          <span class="cat-card-action">Explore Brands &amp; Models <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </div>
    `).join("");

    // Also populate category filter dropdown on finder
    const finderCat = document.getElementById("finderCategory");
    if (finderCat) {
      finderCat.innerHTML = `<option value="">All 5 Categories</option>` +
        categories.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
    }
  }

  renderHomeBrands() {
    const brandsContainer = document.getElementById("homeBrandsContainer");
    if (!brandsContainer) return;

    const brands = window.db.getBrands(true);
    brandsContainer.innerHTML = brands.map(brand => `
      <div class="brand-card" onclick="window.location.hash = 'brands/${brand.id}'" title="${brand.name} - ${brand.tagline}">
        <img src="${brand.logo}" alt="${brand.name}" class="brand-card-logo" loading="lazy">
        <span class="brand-card-name">${brand.name}</span>
      </div>
    `).join("");

    // Populate finder brand dropdown
    const finderBrand = document.getElementById("finderBrand");
    if (finderBrand) {
      finderBrand.innerHTML = `<option value="">All Brands</option>` +
        brands.map(b => `<option value="${b.id}">${b.name}</option>`).join("");
    }
  }

  renderHomeFeaturedProducts() {
    const container = document.getElementById("homeFeaturedProductsContainer");
    if (!container) return;

    const featured = window.db.getProducts({ featuredOnly: true, onlyPublished: true }).slice(0, 8);
    container.innerHTML = featured.map(prod => this.createProductCardHtml(prod)).join("");
  }

  renderHomeBranches() {
    const container = document.getElementById("homeBranchesContainer");
    if (!container) return;

    const branches = window.db.getBranches();
    container.innerHTML = branches.map(b => `
      <div class="branch-card">
        <div class="branch-header">
          <span class="branch-tag">${b.isMain ? '★ MAIN HEAD BRANCH' : '★ AUTHORIZED BRANCH'}</span>
          <h3 class="branch-name">${b.name}</h3>
        </div>
        <div class="branch-body">
          <div class="branch-info-item">
            <div class="branch-icon"><i class="fa-solid fa-location-dot"></i></div>
            <div class="branch-info-text">
              <strong>Address &amp; Landmark</strong>
              ${b.address}<br><small style="color: #64748B;">Landmark: ${b.landmark}</small>
            </div>
          </div>
          <div class="branch-info-item">
            <div class="branch-icon"><i class="fa-solid fa-phone"></i></div>
            <div class="branch-info-text">
              <strong>Calling Contact</strong>
              <a href="tel:+91${b.phone}" style="color: var(--primary); font-weight: 700;">+91 ${b.phone}</a>
              ${b.altPhone ? ` / <a href="tel:+91${b.altPhone}">+91 ${b.altPhone}</a>` : ''}
            </div>
          </div>
          <div class="branch-info-item">
            <div class="branch-icon" style="color: #059669; background: #ECFDF5;"><i class="fa-brands fa-whatsapp"></i></div>
            <div class="branch-info-text">
              <strong>WhatsApp Support</strong>
              <a href="${this.buildWhatsAppUrl(`Hello Pawan Traders (${b.name}), I want to enquire about battery / solar products.`)}" target="_blank" style="color: #059669; font-weight: 700;">
                +91 ${b.whatsapp} (Instant Response)
              </a>
            </div>
          </div>
          <div class="branch-info-item">
            <div class="branch-icon"><i class="fa-regular fa-clock"></i></div>
            <div class="branch-info-text">
              <strong>Working Hours</strong>
              ${b.hours}
            </div>
          </div>

          <iframe src="${b.mapEmbedUrl}" class="branch-map-embed" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

          <div class="branch-actions">
            <a href="tel:+91${b.phone}" class="btn btn-call btn-sm"><i class="fa-solid fa-phone"></i> Call Branch</a>
            <a href="${b.mapDirectionsUrl}" target="_blank" class="btn btn-outline btn-sm"><i class="fa-solid fa-diamond-turn-right"></i> Get Directions</a>
          </div>
        </div>
      </div>
    `).join("");
  }

  // =================== PRODUCT CATALOGUE & FILTERING ===================
  renderProductsCatalogue() {
    const listContainer = document.getElementById("catalogueProductsList");
    const countEl = document.getElementById("catalogueCount");
    if (!listContainer) return;

    // Build categories tabs/filter in catalogue
    this.renderCatalogueFilterBar();

    // Query products from DB
    let products = window.db.getProducts({
      categoryId: this.filters.categoryId || undefined,
      brandId: this.filters.brandId || undefined,
      search: this.filters.search || undefined,
      onlyPublished: true
    });

    // Sorting
    if (this.filters.sortBy === "name-asc") {
      products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.filters.sortBy === "capacity") {
      products.sort((a, b) => (parseInt(b.capacityAh) || 0) - (parseInt(a.capacityAh) || 0));
    }

    if (countEl) countEl.textContent = `${products.length} Products Found`;

    if (products.length === 0) {
      listContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #FFFFFF; border-radius: 16px; border: 1px dashed #CBD5E1;">
          <i class="fa-solid fa-box-open" style="font-size: 3rem; color: #94A3B8; margin-bottom: 16px;"></i>
          <h3 style="font-size: 1.3rem; margin-bottom: 8px;">No products match your selected filters</h3>
          <p style="color: #64748B; margin-bottom: 20px;">Try clearing category or search query to view all available battery and solar models.</p>
          <button class="btn btn-primary btn-sm" onclick="app.clearCatalogueFilters()"><i class="fa-solid fa-rotate"></i> Reset All Filters</button>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = products.map(prod => this.createProductCardHtml(prod)).join("");
  }

  renderCatalogueFilterBar() {
    const catTabs = document.getElementById("catalogueCategoryTabs");
    if (catTabs) {
      const categories = window.db.getCategories(true);
      catTabs.innerHTML = `
        <button class="filter-chip ${!this.filters.categoryId ? 'active' : ''}" onclick="app.setCatalogueCategory('')">
          All Products
        </button>
      ` + categories.map(cat => `
        <button class="filter-chip ${this.filters.categoryId === cat.id ? 'active' : ''}" onclick="app.setCatalogueCategory('${cat.id}')">
          ${cat.name}
        </button>
      `).join("");
    }

    // Brand filter select
    const brandSelect = document.getElementById("catalogueBrandFilter");
    if (brandSelect) {
      const brands = this.filters.categoryId 
        ? window.db.getBrandsByCategory(this.filters.categoryId)
        : window.db.getBrands(true);

      brandSelect.innerHTML = `<option value="">All Brands (${brands.length})</option>` +
        brands.map(b => `<option value="${b.id}" ${this.filters.brandId === b.id ? 'selected' : ''}>${b.name}</option>`).join("");
    }
  }

  createProductCardHtml(prod) {
    const brand = window.db.getBrandById(prod.brandId);
    const category = window.db.getCategoryById(prod.categoryId);

    return `
      <div class="product-card" id="card-${prod.id}">
        <div class="prod-card-top" onclick="app.openProductModal('${prod.id}')">
          <img src="${prod.image}" alt="${prod.name}" class="prod-card-img" loading="lazy">
          ${prod.badge ? `<span class="prod-badge">${prod.badge}</span>` : ''}
          <span class="prod-warranty-badge"><i class="fa-solid fa-shield-check"></i> ${prod.warranty}</span>
        </div>
        <div class="prod-card-body">
          <span class="prod-category-tag">${category ? category.name : 'Battery'} &bull; <strong>${brand ? brand.name : ''}</strong></span>
          <h4 class="prod-card-title" onclick="app.openProductModal('${prod.id}')">${prod.name}</h4>
          <span class="prod-card-model">Model: ${prod.model}</span>
          
          <div class="prod-specs-pills">
            <span class="spec-pill"><i class="fa-solid fa-bolt"></i> ${prod.voltage}</span>
            <span class="spec-pill"><i class="fa-solid fa-battery-full"></i> ${prod.capacityAh}</span>
          </div>

          <div class="prod-price-box">
            <span class="price-label">Pricing &amp; Offers</span>
            <div class="price-text">${prod.priceText || 'Call for Best Price'}</div>
          </div>

          <div class="prod-card-actions">
            <button class="btn btn-outline btn-sm" onclick="app.openProductModal('${prod.id}')">
              <i class="fa-solid fa-circle-info"></i> Details
            </button>
            <a href="${this.buildProductWhatsAppUrl(prod)}" target="_blank" class="btn btn-whatsapp btn-sm">
              <i class="fa-brands fa-whatsapp"></i> Enquire
            </a>
          </div>
        </div>
      </div>
    `;
  }

  setCatalogueCategory(catId) {
    this.filters.categoryId = catId;
    this.renderProductsCatalogue();
  }

  setCatalogueBrand(brandId) {
    this.filters.brandId = brandId;
    this.renderProductsCatalogue();
  }

  setCatalogueSearch(query) {
    this.filters.search = query;
    this.renderProductsCatalogue();
  }

  clearCatalogueFilters() {
    this.filters = { categoryId: "", brandId: "", search: "", sortBy: "featured" };
    const searchInput = document.getElementById("catalogueSearchInput");
    if (searchInput) searchInput.value = "";
    this.renderProductsCatalogue();
  }

  // =================== PRODUCT DETAILS MODAL ===================
  openProductModal(productId) {
    const prod = window.db.getProductById(productId);
    if (!prod) return;

    const brand = window.db.getBrandById(prod.brandId);
    const category = window.db.getCategoryById(prod.categoryId);

    const modalTitle = document.getElementById("prodModalTitle");
    const modalBody = document.getElementById("prodModalBody");
    const modal = document.getElementById("productDetailsModal");

    if (modalTitle) modalTitle.textContent = prod.name;
    if (modalBody) {
      // Build specs table
      const specsHtml = Object.entries(prod.specs || {}).map(([key, val]) => `
        <tr>
          <td style="font-weight: 700; color: #475569; width: 40%; padding: 8px 12px; border-bottom: 1px solid #E2E8F0;">${key}</td>
          <td style="color: #0F172A; padding: 8px 12px; border-bottom: 1px solid #E2E8F0;">${val}</td>
        </tr>
      `).join("");

      modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 24px; margin-bottom: 24px;" class="prod-modal-grid">
          <div style="background: #F8FAFC; border-radius: 12px; padding: 20px; display: flex; align-items: center; justify-content: center;">
            <img src="${prod.image}" alt="${prod.name}" style="max-height: 240px; object-fit: contain;">
          </div>
          <div>
            <div style="display: flex; gap: 8px; margin-bottom: 8px; flex-wrap: wrap;">
              <span class="section-badge" style="margin: 0;">${category ? category.name : ''}</span>
              <span class="section-badge solar" style="margin: 0;">${brand ? brand.name : ''}</span>
            </div>
            <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 8px;">${prod.name}</h3>
            <div style="font-size: 0.9rem; color: #64748B; margin-bottom: 14px;">Model: <strong>${prod.model}</strong></div>
            <p style="font-size: 0.95rem; color: #334155; margin-bottom: 16px; line-height: 1.6;">${prod.shortDescription}</p>

            <div style="background: #EFF6FF; border-left: 4px solid var(--primary); padding: 12px 16px; border-radius: 6px; margin-bottom: 20px;">
              <div style="font-size: 0.8rem; color: #1E40AF; font-weight: 700;">EXCLUSIVE DEALER PRICE</div>
              <div style="font-size: 1.15rem; font-weight: 800; color: #1D4ED8;">${prod.priceText || 'Call for Best Price / Old Battery Exchange'}</div>
            </div>

            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <a href="${this.buildProductWhatsAppUrl(prod)}" target="_blank" class="btn btn-whatsapp" style="flex: 1;">
                <i class="fa-brands fa-whatsapp"></i> Enquire on WhatsApp
              </a>
              <button class="btn btn-primary" onclick="app.openEnquiryModalForProduct('${prod.id}')">
                <i class="fa-solid fa-file-signature"></i> Book / Get Quote
              </button>
            </div>
          </div>
        </div>

        <h4 style="font-size: 1.1rem; font-weight: 800; margin-bottom: 12px; border-bottom: 2px solid var(--primary); padding-bottom: 6px; display: inline-block;">
          Technical Specifications &amp; Warranty
        </h4>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 0.9rem;">
          <tbody>
            <tr>
              <td style="font-weight: 700; color: #475569; padding: 8px 12px; border-bottom: 1px solid #E2E8F0;">Battery / Solar Brand</td>
              <td style="color: #0F172A; padding: 8px 12px; border-bottom: 1px solid #E2E8F0;">${brand ? brand.name : '-'}</td>
            </tr>
            <tr>
              <td style="font-weight: 700; color: #475569; padding: 8px 12px; border-bottom: 1px solid #E2E8F0;">Capacity Rating</td>
              <td style="color: #0F172A; padding: 8px 12px; border-bottom: 1px solid #E2E8F0;">${prod.capacityAh}</td>
            </tr>
            <tr>
              <td style="font-weight: 700; color: #475569; padding: 8px 12px; border-bottom: 1px solid #E2E8F0;">Operating Voltage</td>
              <td style="color: #0F172A; padding: 8px 12px; border-bottom: 1px solid #E2E8F0;">${prod.voltage}</td>
            </tr>
            <tr>
              <td style="font-weight: 700; color: #475569; padding: 8px 12px; border-bottom: 1px solid #E2E8F0;">Manufacturer Warranty</td>
              <td style="color: #059669; font-weight: 800; padding: 8px 12px; border-bottom: 1px solid #E2E8F0;">${prod.warranty}</td>
            </tr>
            ${specsHtml}
          </tbody>
        </table>

        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 16px; font-size: 0.85rem; color: #475569;">
          <strong><i class="fa-solid fa-truck-fast" style="color: var(--primary);"></i> Available at Both Branches:</strong><br>
          • Main Branch: Puramufti, Prayagraj (Ph: 9935618513)<br>
          • Second Branch: Charwa Town, Kaushambi (Ph: 9305839018)<br>
          <em>* Free battery health testing and same-day delivery available across Prayagraj &amp; Kaushambi.</em>
        </div>
      `;
    }

    if (modal) modal.classList.add("active");
  }

  closeModals() {
    document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
  }

  // =================== BRAND PAGES ===================
  renderBrandsPage(targetBrandId = "") {
    const listEl = document.getElementById("brandsPageList");
    if (!listEl) return;

    const brands = window.db.getBrands(true);
    listEl.innerHTML = brands.map(brand => {
      const brandProducts = window.db.getProducts({ brandId: brand.id, onlyPublished: true });
      return `
        <div class="brand-showcase-panel" id="brand-sec-${brand.id}" style="background: #FFFFFF; border: 1px solid var(--gray-200); border-radius: var(--radius-xl); padding: 32px; margin-bottom: 40px; box-shadow: var(--shadow-sm);">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; border-bottom: 1px solid var(--gray-200); padding-bottom: 20px; margin-bottom: 24px;">
            <div style="display: flex; align-items: center; gap: 20px;">
              <img src="${brand.logo}" alt="${brand.name}" style="height: 52px; width: auto; object-fit: contain;">
              <div>
                <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 4px;">${brand.name}</h3>
                <p style="color: #64748B; font-size: 0.95rem;">${brand.tagline} &bull; ${brand.description}</p>
              </div>
            </div>
            <a href="${this.buildWhatsAppUrl(`Hello Pawan Traders, I am interested in ${brand.name} batteries / solar products.`)}" target="_blank" class="btn btn-whatsapp btn-sm">
              <i class="fa-brands fa-whatsapp"></i> Enquire ${brand.name} Rates
            </a>
          </div>

          <h4 style="font-size: 1.05rem; font-weight: 800; color: #475569; margin-bottom: 16px;">
            Available ${brand.name} Models (${brandProducts.length})
          </h4>

          <div class="products-grid">
            ${brandProducts.length > 0 
              ? brandProducts.map(p => this.createProductCardHtml(p)).join("")
              : `<p style="color: #94A3B8; font-style: italic;">Contact us for latest ${brand.name} inventory arrival.</p>`}
          </div>
        </div>
      `;
    }).join("");

    if (targetBrandId) {
      setTimeout(() => {
        const targetEl = document.getElementById(`brand-sec-${targetBrandId}`);
        if (targetEl) targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }

  // =================== BRANCHES PAGE ===================
  renderBranchesPage() {
    this.renderHomeBranches(); // Re-use dynamic branch renderer
  }

  // =================== SOLAR ROI CALCULATOR ===================
  initSolarCalculator() {
    const billSlider = document.getElementById("solarBillSlider");
    const billValDisplay = document.getElementById("solarBillDisplay");
    if (!billSlider) return;

    const calculate = () => {
      const bill = parseInt(billSlider.value) || 3000;
      if (billValDisplay) billValDisplay.textContent = `₹ ${bill.toLocaleString('en-IN')}`;

      // Typical domestic tariff ~ ₹7.5 / kWh in UP
      const unitsPerMonth = bill / 7.5;
      const unitsPerDay = unitsPerMonth / 30;
      // 1 kW solar generates ~4 units/day
      const recommendedKw = Math.max(1, Math.round((unitsPerDay / 4) * 10) / 10);
      const panelCount = Math.ceil((recommendedKw * 1000) / 550);
      const roofArea = Math.ceil(recommendedKw * 90);

      // Subsidy: PM Surya Ghar Muft Bijli Yojana
      let subsidy = 0;
      if (recommendedKw >= 1 && recommendedKw < 2) subsidy = 30000;
      else if (recommendedKw >= 2 && recommendedKw < 3) subsidy = 60000;
      else if (recommendedKw >= 3) subsidy = 78000;

      const monthlySavings = Math.round(unitsPerMonth * 7);
      const annualSavings = monthlySavings * 12;
      const savings25Yrs = annualSavings * 25;

      const kwEl = document.getElementById("calcRecKw");
      const panelsEl = document.getElementById("calcPanels");
      const roofEl = document.getElementById("calcRoofArea");
      const subsidyEl = document.getElementById("calcSubsidy");
      const savingsEl = document.getElementById("calcSavingsAnnual");

      if (kwEl) kwEl.textContent = `${recommendedKw} kW`;
      if (panelsEl) panelsEl.textContent = `${panelCount} Panels (550W Mono PERC)`;
      if (roofEl) roofEl.textContent = `~ ${roofArea} sq.ft`;
      if (subsidyEl) subsidyEl.textContent = `₹ ${subsidy.toLocaleString('en-IN')}`;
      if (savingsEl) savingsEl.textContent = `₹ ${annualSavings.toLocaleString('en-IN')} / year (₹ ${savings25Yrs.toLocaleString('en-IN')} in 25 Yrs)`;

      // Solar enquiry button payload
      const solarEnqBtn = document.getElementById("calcEnquiryBtn");
      if (solarEnqBtn) {
        solarEnqBtn.onclick = () => {
          const msg = `Hello Pawan Traders, I used your Solar Calculator: Monthly Bill ₹${bill}, Recommended System: ${recommendedKw} kW (${panelCount} Panels). Estimated Subsidy ₹${subsidy}. Please provide free site survey and quote.`;
          window.open(this.buildWhatsAppUrl(msg), "_blank");
        };
      }
    };

    billSlider.addEventListener("input", calculate);
    calculate();
  }

  // =================== WHATSAPP & CALL BUILDERS ===================
  buildWhatsAppUrl(messageText) {
    const settings = window.db.getSettings();
    // Default to clean verified WhatsApp number 8299362360
    const cleanNumber = (settings.whatsAppNumber || "8299362360").replace(/[^0-9]/g, "");
    // Ensure country code 91
    const finalNumber = cleanNumber.startsWith("91") ? cleanNumber : `91${cleanNumber}`;
    return `https://wa.me/${finalNumber}?text=${encodeURIComponent(messageText)}`;
  }

  buildProductWhatsAppUrl(prod) {
    const brand = window.db.getBrandById(prod.brandId);
    const msg = `Hello Pawan Traders,\n\nI am interested in:\n• Product: ${prod.name}\n• Brand: ${brand ? brand.name : ''}\n• Model: ${prod.model}\n• Capacity: ${prod.capacityAh} (${prod.voltage})\n• Warranty: ${prod.warranty}\n\nPlease share today's best price, exchange discount, and delivery availability to Prayagraj / Kaushambi.`;
    return this.buildWhatsAppUrl(msg);
  }

  // =================== ENQUIRY SUBMISSIONS ===================
  openEnquiryModalForProduct(productId) {
    const prod = window.db.getProductById(productId);
    const modal = document.getElementById("enquiryModal");
    if (!modal) return;

    const prodInput = document.getElementById("modalEnqProduct");
    const catInput = document.getElementById("modalEnqCategory");
    if (prod && prodInput) prodInput.value = prod.name;
    if (prod && catInput) catInput.value = prod.categoryId;

    modal.classList.add("active");
  }

  handleEnquirySubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const name = formData.get("name") || "";
    const mobile = formData.get("mobile") || "";
    const email = formData.get("email") || "";
    const category = formData.get("category") || "";
    const product = formData.get("product") || "";
    const branchId = formData.get("branchId") || "";
    const message = formData.get("message") || "";

    if (!name.trim() || !mobile.trim()) {
      this.showToast("Please enter your name and 10-digit mobile number.", "error");
      return;
    }

    const branch = window.db.getBranchById(branchId);
    const cat = window.db.getCategoryById(category);

    const enquiryRecord = {
      name: name.trim(),
      mobile: mobile.trim(),
      email: email.trim(),
      category: category,
      categoryName: cat ? cat.name : "General Enquiry",
      productName: product || "Not Specified",
      branchId: branchId,
      branchName: branch ? branch.name : "Main Branch - Puramufti",
      message: message.trim()
    };

    // Save to Database
    window.db.addEnquiry(enquiryRecord);

    // Form notification
    this.showToast("Thank you! Your enquiry has been received. Opening WhatsApp...", "success");
    form.reset();
    this.closeModals();

    // Auto trigger WhatsApp message
    const waText = `*NEW WEBSITE ENQUIRY - PAWAN TRADERS*\n\n` +
      `• *Customer Name:* ${enquiryRecord.name}\n` +
      `• *Mobile:* ${enquiryRecord.mobile}\n` +
      `• *Email:* ${enquiryRecord.email || 'N/A'}\n` +
      `• *Category:* ${enquiryRecord.categoryName}\n` +
      `• *Interested Product:* ${enquiryRecord.productName}\n` +
      `• *Preferred Branch:* ${enquiryRecord.branchName}\n` +
      `• *Message:* ${enquiryRecord.message || 'Looking for best price & warranty details'}`;

    setTimeout(() => {
      window.open(this.buildWhatsAppUrl(waText), "_blank");
    }, 700);
  }

  // =================== TOAST NOTIFICATIONS ===================
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
    }, 4000);
  }
}

