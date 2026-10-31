# PAWAN TRADERS – Next.js Full-Stack Web Application

> **Project Name:** Pawan Traders – Battery & Solar Solutions  
> **Framework:** Next.js 15+ (App Router) + React 19 + Tailwind/CSS Variables  
> **Director:** Mr. Pawan Kumar Kushwaha (Ph: 9935618513)  
> **Manager:** Mr. Kartik Kushwaha (Ph: 9305839018)  
> **WhatsApp:** 8299362360  
> **Email:** pawantraderspuramufti@gmail.com  

---

## ⚡ 5 Major Categories & Brand Portfolio

1. **Automotive Batteries:** Amaron, Exide, Tata Green, SF Sonic, Livfast (Car, SUV, Commercial, 2-Wheeler).
2. **Lithium Batteries:** Vion (LiFePO4 Home Energy Storage, Inverter-Compatible Lithium, Solar Lithium Packs).
3. **Solar Panels & Systems:** Luminous, Microtek, Smarten, UTL Solar, Exide (Mono PERC, On-Grid Net Metering, Off-Grid, Hybrid EPC, PM Surya Ghar Subsidy).
4. **Water Batteries (Tall Tubular):** Extron, Luminous, Exide, Microtek, Amaron, Exide Solar, Amaze, Smarten, Tuga Power (Heavy-duty deep cycle inverter batteries).
5. **Dry Batteries (UPS Batteries):** Amaron, Exide, Konta / Kenta (12V 7Ah, 12Ah, 26Ah VRLA / SMF batteries for computer UPS, medical setups & servers).

---

## 🚀 How to Run the Next.js Project

### 1. Development Mode (with Live Reload)
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Production Build & Start
```bash
npm run build
npm start
```

---

## 🏢 Website Routes (App Router)

- `/` &mdash; **Homepage:** Hero showcase, Quick Finder, 5 Category Cards, Brand Partners Marquee, In-stock featured products, Solar calculator, Why Choose Pawan Traders, Both Branch locators, Quick enquiry form, floating WhatsApp & Call buttons.
- `/about` &mdash; **About Us:** 15+ years experience, Director Mr. Pawan Kumar Kushwaha, Manager Mr. Kartik Kushwaha, Mission & Vision.
- `/products` &mdash; **Product Catalogue:** Category chips, brand filter, capacity sort, instant search, and quick view modal.
- `/products/[id]` &mdash; **Product Details:** Full specs table (Ah, Voltage, Warranty, Application), WhatsApp quote button, and direct dialer.
- `/brands` &mdash; **Brands Directory:** All 14 authorized brands with taglines and product counts.
- `/brands/[slug]` &mdash; **Brand Showcase:** Filtered products for specific brands (e.g. `/brands/amaron`, `/brands/exide`, `/brands/vion`).
- `/solar` &mdash; **Solar Solutions & Subsidy:** On-Grid, Off-Grid, Hybrid guides, PM Surya Ghar Yojana subsidy estimates, and Rooftop Solar Calculator.
- `/branches` &mdash; **Our Branches:** Main Branch (Puramufti, Prayagraj – 212208) & Second Branch (Charwa Town, Kaushambi – 212203) with Google Maps embeds and direct calling buttons.
- `/contact` &mdash; **Contact Us:** Verified directory, enquiry form, and physical branch locations.
- `/admin` &mdash; **Admin Control Panel:** Master staff portal.

---

## 🔐 Admin Panel Access

- **URL:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Username:** `admin` (or `pawantraders`)
- **Password:** `pawan@2026` (or `admin123`)

### Admin Capabilities:
- **Dashboard:** Real-time metrics for products, categories, brands, and customer enquiries.
- **Product Management:** Add new models, edit specs (Ah, Voltage, Warranty), update images, toggle featured/publish status.
- **Enquiry Management:** View all customer leads, update follow-up status (`New`, `In Progress`, `Contacted`, `Closed`), 1-click WhatsApp customer reply, and **Export records to CSV**.
- **Branch Management:** Update addresses, phone numbers, and Google Maps embed links for Puramufti and Charwa branches.
- **Website Content & SEO:** Update top announcements, director/manager info, meta tags, and local SEO keywords.

---

## 📁 Project Structure

```
pawan-traders-next/
├── public/
│   └── assets/
│       ├── images/
│       │   ├── logo.svg              # High-res vector logo
│       │   ├── logo-mark.svg         # Compact logo emblem
│       │   ├── favicon.svg           # Favicon icon
│       │   ├── categories/           # 5 Category vector illustrations
│       │   ├── products/             # Detailed battery & solar visuals
│       │   └── brands/               # 14 Partner brand badges
├── src/
│   ├── app/
│   │   ├── layout.js                 # Global Root Layout with Schema.org JSON-LD
│   │   ├── page.js                   # Main Homepage
│   │   ├── globals.css               # Global design system & theme variables
│   │   ├── about/page.js             # About Us page
│   │   ├── products/page.js          # Product Catalogue with filterable state
│   │   ├── products/[id]/page.js     # Dedicated Product Details dynamic route
│   │   ├── brands/page.js            # Brands Directory
│   │   ├── brands/[slug]/page.js     # Brand-specific showcase dynamic route
│   │   ├── solar/page.js             # Solar Solutions & Rooftop Calculator
│   │   ├── branches/page.js          # Both branches with interactive maps
│   │   ├── contact/page.js           # Contact Us with enquiry form
│   │   └── admin/page.js             # Complete secure Admin Control Panel
│   ├── components/
│   │   ├── Header.jsx                # Responsive header with announcement bar
│   │   ├── Footer.jsx                # Comprehensive footer with branch directory
│   │   ├── ProductCard.jsx           # Clean reusable product card
│   │   ├── SolarCalculator.jsx       # Interactive rooftop solar & subsidy slider
│   │   ├── QuickEnquiryModal.jsx     # Instant WhatsApp enquiry popup
│   │   └── FloatingActions.jsx       # Sticky WhatsApp & Call pills
│   └── data/
│       └── pawanData.js              # Centralized seed store & WhatsApp helpers
├── package.json
├── jsconfig.json
└── next.config.mjs
```

