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

## 🌐 Quick Deployment Guide for Hostinger VPS (Ubuntu / Debian)

Follow these quick steps to deploy and run Pawan Traders on your Hostinger VPS with 24/7 uptime using PM2 and Nginx.

### Step 1: Connect to Your Hostinger VPS via SSH
Open your terminal (PowerShell, Command Prompt, or macOS/Linux Terminal) and connect:
```bash
ssh root@YOUR_SERVER_IP
```

### Step 2: Install Node.js (v20+ LTS), Git & PM2
If you haven't installed Node.js yet, install Node.js 20 LTS:
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 20 via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git nginx

# Verify installation
node -v
npm -v

# Install PM2 globally for process management
sudo npm install -g pm2
```

### Step 3: Clone the Repository
```bash
# Navigate to web directory
cd /var/www

# Clone repository
git clone https://github.com/ShahbazAhmad08/pawan-traders-next.git

# Enter project directory
cd pawan-traders-next
```

### Step 4: Configure Production Environment Variables
Create your production `.env.local` file:
```bash
cp .env.example .env.local
nano .env.local
```

Paste and save your credentials:
```env
# 1. MongoDB Database Connection
MONGODB_URI=mongodb+srv://sa798027:ks9inW6pDV7JOy7m@cluster0.bgatlhp.mongodb.net/pawan-traders?retryWrites=true&w=majority

# 2. Cloudinary Credentials (Image Uploads)
CLOUDINARY_CLOUD_NAME=gcgnebv5
CLOUDINARY_API_KEY=936242873279426
CLOUDINARY_API_SECRET=RMlxc0rqbuMnSu7rX0yeSZPFleA
CLOUDINARY_URL=cloudinary://936242873279426:RMlxc0rqbuMnSu7rX0yeSZPFleA@gcgnebv5

# 3. Staff Admin Panel Password
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_strong_admin_password_here

# 4. SMTP Email Notification Service (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=pawantraders70@gmail.com
SMTP_PASS=
SMTP_FROM="Pawan Traders Lead Alert" <pawantraders70@gmail.com>
ADMIN_NOTIFICATION_EMAIL=pawantraders70@gmail.com

# 5. Site Domain & Base URL for Canonical SEO & Sitemap
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```
*(Press `Ctrl + O` then `Enter` to save, and `Ctrl + X` to exit nano editor).*

### Step 5: Install Dependencies & Build
```bash
npm install
npm run build
```
*(This creates an optimized standalone production build ready for high-performance serving).*

### Step 6: Start the Application with PM2
We have included a pre-configured `ecosystem.config.js` in the repository root:
```bash
# Start the application using PM2
pm2 start ecosystem.config.js

# Save PM2 process list so it auto-restarts on server reboot
pm2 save
pm2 startup
```
*(Run the generated command displayed by `pm2 startup` if prompted).*

### Step 7: Configure Nginx Reverse Proxy
To point your custom domain (or server IP) to the Next.js app running on port 3000:
```bash
sudo nano /etc/nginx/sites-available/pawan-traders
```

Paste the following Nginx server block:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the configuration and reload Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/pawan-traders /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 8: Install Free SSL Certificate (HTTPS)
Use Certbot to generate and auto-renew free Let's Encrypt SSL:
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### 🛠️ Useful Day-to-Day Maintenance Commands

```bash
# Check running application status
pm2 status

# View live application logs
pm2 logs pawan-traders

# Restart application
pm2 restart pawan-traders

# Pull latest updates from GitHub in the future:
cd /var/www/pawan-traders-next
git pull origin main
npm install
npm run build
pm2 reload pawan-traders
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
- `/gallery` &mdash; **Product & Project Gallery:** Live photo showroom of solar installations, lithium setups, showrooms, and customer deliveries with category filters & lightbox modal.
- `/branches` &mdash; **Our Branches:** Main Branch (Puramufti, Prayagraj – 212208) & Second Branch (Charwa Town, Kaushambi – 212203) with Google Maps embeds and direct calling buttons.
- `/contact` &mdash; **Contact Us:** Verified directory, enquiry form with direct MongoDB submission & instant WhatsApp handoff.
- `/admin` &mdash; **Admin Control Panel:** Master staff portal with Cloudinary photo uploads, Hero Slider manager, Product CRUD, Gallery manager, and Contact lead management.

---

## ☁️ Cloudinary & MongoDB Setup

Create `.env.local` in project root:
```env
# MongoDB Connection
MONGODB_URI=

# Cloudinary Storage
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Admin Master Password
ADMIN_PASSWORD=
```

---

## 🔐 Admin Panel Access

- **URL:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Username:** `admin`
- **Password:** `admin123` (or configured via `ADMIN_PASSWORD` in `.env.local`)

### Admin Capabilities:
- **Hero Slider Manager:** Upload slide images (Cloudinary), enter optional single text (if empty, highlights image & buttons cleanly), configure Button 1 (Text + Link) and Button 2 (Text + Link).
- **Product Management:** Add/Edit/Delete products with direct Cloudinary photo upload, specs (Ah, Voltage, Warranty, Price tag), category & brand selectors.
- **Gallery Manager:** Upload showroom & installation photos to Cloudinary, assign category tags, and delete photos.
- **Contact Submissions:** View incoming customer leads from Contact form and Homepage popup, update lead status (New, Contacted, In Progress, Closed), 1-click WhatsApp customer reply, and export to CSV.
- **Dashboard & Health:** Live indicators for MongoDB and Cloudinary connection status.
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

