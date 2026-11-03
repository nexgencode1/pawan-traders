/**
 * PAWAN TRADERS - Central Next.js Data Store
 * Battery & Solar Solutions
 */

export const INITIAL_DATA = {
  settings: {
    businessName: "Pawan Traders",
    tagline: "Battery & Solar Energy Solutions",
    director: "Mr. Pawan Kumar Kushwaha",
    directorImage: "/director.jpeg",
    manager: "Mr. Kartik Kushwaha",
    managerImage: "/manager.jpeg",
    email: "pawantraderspuramufti@gmail.com",
    callingNumber: "9935618513",
    whatsAppNumber: "8299362360",
    managerContact: "9305839018",
    experienceYears: "15+",
    happyCustomers: "10,000+",
    solarProjectsInstalled: "250+",
    workingHours: "Monday - Sunday: 8:00 AM - 9:00 PM",
    announcement: "⚡ Special Festive Offer: Flat 10% Off on Solar Hybrid Inverters & Free Battery Health Checkup at both Branches!",
    seoTitle: "Pawan Traders | Best Battery & Solar Solutions in Prayagraj & Kaushambi",
    seoDescription: "Authorized dealer of Amaron, Exide, Luminous, Microtek, Vion Lithium & Solar Panels. Main branch at Puramufti Prayagraj & Second branch at Charwa Kaushambi. Call 9935618513.",
    seoKeywords: "Battery Shop in Puramufti, Battery Dealer in Prayagraj, Exide Battery Dealer, Amaron Battery Dealer, Inverter Battery Shop, Solar Panel Dealer in Kaushambi, Lithium Battery Dealer, Solar Solutions in Prayagraj"
  },

  branches: [
    {
      id: "branch-prayagraj",
      isMain: true,
      name: "Main Branch - Puramufti (Prayagraj)",
      city: "Prayagraj",
      district: "Prayagraj",
      state: "Uttar Pradesh",
      pincode: "212208",
      address: "Pawan Traders, GT Road, Puramufti, Prayagraj, Uttar Pradesh – 212208",
      landmark: "Near Main Market / Puramufti Crossing",
      phone: "9935618513",
      altPhone: "9305839018",
      whatsapp: "8299362360",
      email: "pawantraderspuramufti@gmail.com",
      hours: "8:00 AM - 9:00 PM (All 7 Days)",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14407.472149504626!2d81.7051282!3d25.4760493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399acadbe904cf75%3A0xe6bf446b528b8cf9!2sPura%20Mufti%2C%20Uttar%20Pradesh%20212208!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
      mapDirectionsUrl: "https://maps.google.com/?q=Puramufti+Prayagraj+Uttar+Pradesh+212208"
    },
    {
      id: "branch-kaushambi",
      isMain: false,
      name: "Second Branch - Charwa Town (Kaushambi)",
      city: "Kaushambi",
      district: "Kaushambi",
      state: "Uttar Pradesh",
      pincode: "212203",
      address: "Pawan Traders, Charwa Town Area, In Front of Petrol Pump, Kaushambi, Uttar Pradesh – 212203",
      landmark: "Directly in front of Petrol Pump, Main Charwa Bazaar Road",
      phone: "9305839018",
      altPhone: "9935618513",
      whatsapp: "8299362360",
      email: "pawantraderspuramufti@gmail.com",
      hours: "8:30 AM - 8:30 PM (All 7 Days)",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14418.52837267104!2d81.569421!3d25.431289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399a341b1bf4a0bd%3A0x6b4fb6c18d4512e0!2sCharwa%2C%20Uttar%20Pradesh%20212203!5e0!3m2!1sen!2sin!4v1700000000001!5m2!1sen!2sin",
      mapDirectionsUrl: "https://maps.google.com/?q=Charwa+Town+Petrol+Pump+Kaushambi+Uttar+Pradesh+212203"
    }
  ],

  categories: [
    {
      id: "cat-automotive",
      name: "Automotive Batteries",
      slug: "automotive-batteries",
      image: "/assets/images/categories/automotive.svg",
      description: "High-cranking maintenance-free car, SUV, 2-wheeler, tractor and commercial truck batteries with extended warranty.",
      subcategories: ["Two Wheeler Batteries", "Four Wheeler Batteries", "Car Batteries", "Commercial Vehicle Batteries", "Tractor & Heavy Machinery"],
      featured: true,
      active: true,
      order: 1
    },
    {
      id: "cat-lithium",
      name: "Lithium Batteries",
      slug: "lithium-batteries",
      image: "/assets/images/categories/lithium.svg",
      description: "Next-gen LiFePO4 smart lithium home energy storage, high-efficiency solar lithium packs, and fast-charging inverter setups.",
      subcategories: ["Lithium-Ion Batteries", "Lithium Batteries with Inverter", "Solar Lithium Battery Solutions", "Home Energy Storage Solutions", "Inverter-Compatible Lithium", "Complete Lithium Projects"],
      featured: true,
      active: true,
      order: 2
    },
    {
      id: "cat-solar",
      name: "Solar Panels & Systems",
      slug: "solar-panels",
      image: "/assets/images/categories/solar.svg",
      description: "Tier-1 Mono PERC & Bifacial solar panels, On-Grid, Off-Grid & Hybrid Solar inverter projects with full subsidy assistance.",
      subcategories: ["Mono PERC Solar Panels", "On-Grid Solar Systems", "Off-Grid Solar Systems", "Hybrid Solar Systems", "Solar Panel Installation", "Residential Rooftop", "Commercial Projects"],
      featured: true,
      active: true,
      order: 3
    },
    {
      id: "cat-water",
      name: "Water Batteries (Tubular)",
      slug: "water-batteries",
      image: "/assets/images/categories/water.svg",
      description: "Deep cycle tall tubular lead-acid water batteries engineered for severe power cuts, long life, and heavy household loads.",
      subcategories: ["Lead Acid Water Batteries", "Inverter Water Batteries", "Home Inverter Batteries", "Commercial Inverter Batteries", "Solar Water Batteries", "Tall Tubular Batteries"],
      featured: true,
      active: true,
      order: 4
    },
    {
      id: "cat-dry",
      name: "Dry Batteries (UPS Batteries)",
      slug: "dry-batteries",
      image: "/assets/images/categories/dry.svg",
      description: "Valve Regulated SMF (Sealed Maintenance Free) dry batteries for computer UPS, emergency lights, medical setups, and servers.",
      subcategories: ["UPS Batteries", "SMF Batteries", "Sealed Maintenance-Free", "Computer UPS Batteries", "Office UPS Batteries", "Security & Telecom"],
      featured: true,
      active: true,
      order: 5
    }
  ],

  brands: [
    {
      id: "brand-amaron",
      name: "AMARON",
      slug: "amaron",
      logo: "/assets/images/brands/amaron.svg",
      tagline: "Lasts Long, Really Long",
      categories: ["cat-automotive", "cat-water", "cat-dry"],
      popular: true,
      active: true,
      description: "Pioneers of zero-maintenance SilvenX alloy technology for cars, bikes, and robust home inverters."
    },
    {
      id: "brand-exide",
      name: "EXIDE",
      slug: "exide",
      logo: "/assets/images/brands/exide.svg",
      tagline: "India Moves on Exide",
      categories: ["cat-automotive", "cat-solar", "cat-water", "cat-dry"],
      popular: true,
      active: true,
      description: "India's most iconic battery manufacturer with industry-leading automotive, tubular, and solar batteries."
    },
    {
      id: "brand-luminous",
      name: "LUMINOUS",
      slug: "luminous",
      logo: "/assets/images/brands/luminous.svg",
      tagline: "Khushiyon Ka Ghar",
      categories: ["cat-solar", "cat-water"],
      popular: true,
      active: true,
      description: "Leader in home inverters, solar panels, and long-backup tall tubular batteries."
    },
    {
      id: "brand-microtek",
      name: "MICROTEK",
      slug: "microtek",
      logo: "/assets/images/brands/microtek.svg",
      tagline: "Technology We Live In",
      categories: ["cat-solar", "cat-water"],
      popular: true,
      active: true,
      description: "Trusted household name for high-efficiency solar inverters and rugged tubular inverter batteries."
    },
    {
      id: "brand-vion",
      name: "VION",
      slug: "vion",
      logo: "/assets/images/brands/vion.svg",
      tagline: "Smart Lithium Energy",
      categories: ["cat-lithium"],
      popular: true,
      active: true,
      description: "Advanced LiFePO4 wall and rack-mount smart batteries with 10+ years design life and fast recharging."
    },
    {
      id: "brand-tatagreen",
      name: "TATA GREEN",
      slug: "tata-green",
      logo: "/assets/images/brands/tatagreen.svg",
      tagline: "A Tata Enterprise",
      categories: ["cat-automotive"],
      popular: true,
      active: true,
      description: "Precision engineered automotive and commercial vehicle batteries backed by Tata reliability."
    },
    {
      id: "brand-sfsonic",
      name: "SF SONIC",
      slug: "sf-sonic",
      logo: "/assets/images/brands/sfsonic.svg",
      tagline: "Power That Never Stops",
      categories: ["cat-automotive"],
      popular: false,
      active: true,
      description: "High-crank power batteries built tough for rugged Indian road and temperature conditions."
    },
    {
      id: "brand-livfast",
      name: "LIVFAST",
      slug: "livfast",
      logo: "/assets/images/brands/livfast.svg",
      tagline: "Fast Charge Batteries",
      categories: ["cat-automotive"],
      popular: true,
      active: true,
      description: "High performance automotive and inverter batteries engineered for rapid recharging."
    },
    {
      id: "brand-smarten",
      name: "SMARTEN",
      slug: "smarten",
      logo: "/assets/images/brands/smarten.svg",
      tagline: "Power & Solar Experts",
      categories: ["cat-solar", "cat-water"],
      popular: false,
      active: true,
      description: "High-grade MPPT solar inverters, solar PCUs and heavy deep-discharge tubular batteries."
    },
    {
      id: "brand-utl",
      name: "UTL SOLAR",
      slug: "utl-solar",
      logo: "/assets/images/brands/utl.svg",
      tagline: "India's Trusted Solar",
      categories: ["cat-solar"],
      popular: true,
      active: true,
      description: "Government-approved solar panels, MPPT solar inverters, and complete rooftop solar setups."
    },
    {
      id: "brand-extron",
      name: "EXTRON",
      slug: "extron",
      logo: "/assets/images/brands/extron.svg",
      tagline: "Heavy Duty Tubular",
      categories: ["cat-water"],
      popular: false,
      active: true,
      description: "Heavy-duty tall tubular inverter batteries built for frequent and prolonged power outages."
    },
    {
      id: "brand-amaze",
      name: "AMAZE",
      slug: "amaze",
      logo: "/assets/images/brands/amaze.svg",
      tagline: "Long Lasting Inverters",
      categories: ["cat-water"],
      popular: false,
      active: true,
      description: "Affordable and ultra-reliable tubular batteries and pure sine wave inverters."
    },
    {
      id: "brand-tugapower",
      name: "TUGA POWER",
      slug: "tuga-power",
      logo: "/assets/images/brands/tugapower.svg",
      tagline: "Powerful Energy",
      categories: ["cat-water"],
      popular: false,
      active: true,
      description: "Heavy lead-acid tubular batteries engineered for maximum backup and zero electrolyte leakage."
    },
    {
      id: "brand-konta",
      name: "KONTA (KENTA)",
      slug: "konta",
      logo: "/assets/images/brands/konta.svg",
      tagline: "Reliable UPS Batteries",
      categories: ["cat-dry"],
      popular: true,
      active: true,
      description: "Precision VRLA / SMF dry batteries for computer UPS, security systems, and office server backup."
    }
  ],

  products: [
    // CAT 1: AUTOMOTIVE BATTERIES
    {
      id: "prod-auto-01",
      name: "Amaron Pro 12V 65Ah Car Battery",
      model: "AM-PRO-DIN65",
      brandId: "brand-amaron",
      categoryId: "cat-automotive",
      capacityAh: "65 Ah",
      voltage: "12V",
      warranty: "72 Months (36 Free + 36 Pro-rata)",
      image: "/assets/images/products/automotive-battery.svg",
      priceText: "Call for Best Price / Old Battery Exchange",
      featured: true,
      published: true,
      badge: "Best Seller",
      shortDescription: "Zero-maintenance automotive car battery with SilvenX alloy technology for sedans, SUVs, and premium hatchbacks.",
      specs: {
        "Capacity": "65 Ah",
        "Voltage": "12 Volts",
        "CCA (Cold Cranking Amps)": "600 A",
        "Technology": "SilvenX Silver Alloy",
        "Terminal Layout": "Standard / Left or Right",
        "Maintenance": "Zero Maintenance (Sealed)",
        "Suitable Vehicles": "Hyundai Creta, Kia Seltos, Honda City, Maruti Brezza, Mahindra Thar",
        "Warranty": "72 Months Official Warranty"
      }
    },
    {
      id: "prod-auto-02",
      name: "Exide Mileage 12V 35Ah Car Battery",
      model: "ML38B20R",
      brandId: "brand-exide",
      categoryId: "cat-automotive",
      capacityAh: "35 Ah",
      voltage: "12V",
      warranty: "55 Months (30 Free + 25 Pro-rata)",
      image: "/assets/images/products/automotive-battery.svg",
      priceText: "Best Wholesale Rate + Free Fitting",
      featured: true,
      published: true,
      badge: "High Demand",
      shortDescription: "Specialized for Indian hatchback cars with robust plates that resist heat and vibration.",
      specs: {
        "Capacity": "35 Ah",
        "Voltage": "12 Volts",
        "Technology": "Robust Hybrid Alloy",
        "Maintenance": "Maintenance Free with Magic Eye",
        "Suitable Vehicles": "Maruti Alto, WagonR, Swift, Celerio, Hyundai Santro, Grand i10",
        "Warranty": "55 Months"
      }
    },
    {
      id: "prod-auto-03",
      name: "Tata Green Yuva 12V 100Ah Heavy Commercial Battery",
      model: "TG-COMM-100",
      brandId: "brand-tatagreen",
      categoryId: "cat-automotive",
      capacityAh: "100 Ah",
      voltage: "12V",
      warranty: "36 Months (24 Free + 12 Pro-rata)",
      image: "/assets/images/products/automotive-battery.svg",
      priceText: "Special Commercial Fleet Rate",
      featured: false,
      published: true,
      badge: "Heavy Duty",
      shortDescription: "Heavy-duty commercial vehicle battery for trucks, tractors, school buses, and commercial transport.",
      specs: {
        "Capacity": "100 Ah",
        "Voltage": "12 Volts",
        "Technology": "Heavy-Cast Antimonial Alloy",
        "Suitable Vehicles": "Tata 407, Eicher Pro, Ashok Leyland Dost, Swaraj & Mahindra Tractors",
        "Warranty": "36 Months"
      }
    },
    {
      id: "prod-auto-04",
      name: "SF Sonic Turbo 12V 5Ah Two Wheeler Battery",
      model: "SF-TURBO-5LB",
      brandId: "brand-sfsonic",
      categoryId: "cat-automotive",
      capacityAh: "5 Ah",
      voltage: "12V",
      warranty: "48 Months (24 Free + 24 Pro-rata)",
      image: "/assets/images/products/automotive-battery.svg",
      priceText: "Instant Store Replacement Available",
      featured: false,
      published: true,
      badge: "Bike Battery",
      shortDescription: "High-surge cranking power for modern self-start motorcycles and scooters with leak-proof design.",
      specs: {
        "Capacity": "5 Ah",
        "Voltage": "12 Volts",
        "Suitable Vehicles": "Hero Splendor iSmart, Pulsar 150/180, Apache RTR, Honda Activa",
        "Warranty": "48 Months"
      }
    },
    {
      id: "prod-auto-05",
      name: "Livfast Maxx 12V 45Ah Automotive Battery",
      model: "LF-MX-45",
      brandId: "brand-livfast",
      categoryId: "cat-automotive",
      capacityAh: "45 Ah",
      voltage: "12V",
      warranty: "60 Months",
      image: "/assets/images/products/automotive-battery.svg",
      priceText: "Attractive Exchange Rebate",
      featured: false,
      published: true,
      badge: "Fast Charging",
      shortDescription: "Built with patented quick-charging grid technology for urban stop-and-go driving.",
      specs: {
        "Capacity": "45 Ah",
        "Voltage": "12 Volts",
        "Suitable Vehicles": "Maruti Dzire, Baleno, Honda Amaze, Hyundai i20",
        "Warranty": "60 Months"
      }
    },

    // CAT 2: LITHIUM BATTERIES (VION)
    {
      id: "prod-lith-01",
      name: "Vion Smart LiFePO4 48V 100Ah Wall Energy Storage",
      model: "VION-ESS-48100",
      brandId: "brand-vion",
      categoryId: "cat-lithium",
      capacityAh: "100 Ah (5.12 kWh)",
      voltage: "48V",
      warranty: "10 Years (5 Years Replacement + 5 Pro-rata)",
      image: "/assets/images/products/lithium-battery.svg",
      priceText: "Subsidized Solar Combo Available",
      featured: true,
      published: true,
      badge: "Next-Gen Tech",
      shortDescription: "Grade-A LiFePO4 cells with built-in Smart BMS, active cell balancing, and CAN/RS485 communication with all inverters.",
      specs: {
        "Nominal Voltage": "51.2 Volts",
        "Usable Energy": "5.12 kWh",
        "Cycle Life": "6,000+ Cycles @ 80% DoD",
        "BMS Protection": "Overcharge, Short Circuit, Thermal Runaway, Overdischarge",
        "Display": "Digital Color LCD + LED Capacity Bar",
        "Weight": "45 Kg (Wall Mount)",
        "Charging Time": "2 Hours Fast Charge Compatible",
        "Warranty": "10 Years Warranty"
      }
    },
    {
      id: "prod-lith-02",
      name: "Vion Li-Ion 12.8V 100Ah Inverter Battery",
      model: "VION-INV-12100",
      brandId: "brand-vion",
      categoryId: "cat-lithium",
      capacityAh: "100 Ah (1.28 kWh)",
      voltage: "12V",
      warranty: "5 Years Full Replacement",
      image: "/assets/images/products/lithium-battery.svg",
      priceText: "Direct Lead-Acid Drop-in Replacement",
      featured: true,
      published: true,
      badge: "Direct Replacement",
      shortDescription: "Drop-in replacement for traditional bulky lead-acid inverter batteries. 1/3rd the weight and 3x longer life.",
      specs: {
        "Nominal Voltage": "12.8V",
        "Capacity": "100 Ah (1280 Wh)",
        "Weight": "11.5 Kg only (vs 45 Kg Lead Acid)",
        "Depth of Discharge": "100% Usable Capacity",
        "Charging Time": "2 to 3 Hours Full Charge",
        "Inverter Compatibility": "Works with all standard 12V Inverters (Luminous, Microtek, Exide)"
      }
    },
    {
      id: "prod-lith-03",
      name: "Vion All-In-One Lithium Solar Inverter System",
      model: "VION-SOLAR-HYBRID-3K",
      brandId: "brand-vion",
      categoryId: "cat-lithium",
      capacityAh: "3 kWh Built-in Storage",
      voltage: "24V / 230V AC",
      warranty: "5 Years Comprehensive",
      image: "/assets/images/products/lithium-battery.svg",
      priceText: "Complete Inverter + Lithium Package",
      featured: true,
      published: true,
      badge: "Complete System",
      shortDescription: "Integrated pure sine wave solar hybrid inverter with internal lithium battery bank. Plug-and-play installation for modern homes.",
      specs: {
        "Inverter Rating": "3.5 kVA Pure Sine Wave",
        "Internal Lithium Bank": "3.2 kWh LiFePO4",
        "MPPT Solar Input": "Up to 3,000 Watts Solar Panels",
        "Efficiency": "> 94%",
        "App Monitoring": "WiFi / Bluetooth Mobile App Support"
      }
    },

    // CAT 3: SOLAR PANELS & SYSTEMS
    {
      id: "prod-sol-01",
      name: "Luminous 550W Mono PERC Half-Cut Solar Panel",
      model: "LUM-MONO-550",
      brandId: "brand-luminous",
      categoryId: "cat-solar",
      capacityAh: "550 Watts (24V)",
      voltage: "24V (Voc ~49.8V)",
      warranty: "25 Years Performance Warranty (10 Yrs Product)",
      image: "/assets/images/products/solar-panel.svg",
      priceText: "PM Surya Ghar Subsidy Approved",
      featured: true,
      published: true,
      badge: "Top Rated Solar",
      shortDescription: "Tier-1 144-cell Monocrystalline Half-cut PERC panel with anti-reflective high-transmission tempered glass for maximum generation even on cloudy days.",
      specs: {
        "Rated Power": "550 Watts",
        "Cell Type": "Mono PERC Half-Cut (Grade A)",
        "Module Efficiency": "21.3%",
        "Frame": "Anodized Aluminum Alloy 35mm",
        "Certifications": "MNRE, BIS, IEC Approved",
        "Warranty": "25 Years Linear Performance"
      }
    },
    {
      id: "prod-sol-02",
      name: "Microtek 5 kVA MPPT Solar Hybrid On-Grid / Off-Grid System",
      model: "MT-SOLAR-5000",
      brandId: "brand-microtek",
      categoryId: "cat-solar",
      capacityAh: "5 kVA / 48V",
      voltage: "48V DC to 230V AC",
      warranty: "5 Years Manufacturer Warranty",
      image: "/assets/images/products/solar-panel.svg",
      priceText: "Includes Free Site Survey & Net Metering",
      featured: true,
      published: true,
      badge: "High Capacity",
      shortDescription: "Industrial-grade MPPT solar PCU capable of running multiple 1.5 Ton ACs, water pumps, refrigerators, and entire household load.",
      specs: {
        "Capacity": "5 kVA (4000 Watts Output)",
        "MPPT Solar Charger": "80 Amps",
        "Solar Panel Support": "Up to 5500 Watts",
        "Grid Export": "Net Metering Supported",
        "Battery Voltage": "48V (4 Batteries)"
      }
    },
    {
      id: "prod-sol-03",
      name: "UTL Gamma Plus 1 kVA MPPT Solar Inverter",
      model: "UTL-GAMMA-1000",
      brandId: "brand-utl",
      categoryId: "cat-solar",
      capacityAh: "1 kVA (Runs on Single 12V Battery)",
      voltage: "12V",
      warranty: "5 Years Warranty",
      image: "/assets/images/products/solar-panel.svg",
      priceText: "Best Entry-Level Solar PCU",
      featured: false,
      published: true,
      badge: "Budget Friendly",
      shortDescription: "India's most popular single-battery MPPT solar PCU that can run loads directly from solar power even without a grid supply.",
      specs: {
        "Rating": "1000 VA / 800 W",
        "Solar Panel Input": "Up to 1000 Watts",
        "Battery Bank": "1 Battery (12V)",
        "Technology": "r-MPPT (Rapid Maximum Power Point Tracking)"
      }
    },
    {
      id: "prod-sol-04",
      name: "Complete 3 kW On-Grid Rooftop Solar Plant (PM Surya Ghar Scheme)",
      model: "PT-SOLAR-ONGRID-3KW",
      brandId: "brand-luminous",
      categoryId: "cat-solar",
      capacityAh: "3 kW (12 - 15 Units/Day)",
      voltage: "Single Phase 230V AC",
      warranty: "25 Years on Panels, 5 Years on Inverter",
      image: "/assets/images/products/solar-panel.svg",
      priceText: "Subsidy Up to ₹78,000 Direct to Bank",
      featured: true,
      published: true,
      badge: "Government Subsidy",
      shortDescription: "Turnkey rooftop solar installation including Mono PERC panels, grid-tied inverter, GI structure, earthing, lightning arrestor, net meter approval, and portal paperwork.",
      specs: {
        "Daily Generation": "12 to 15 Units (kWh) / day",
        "Monthly Savings": "Approx ₹3,000 to ₹4,500 on electricity bill",
        "Roof Area Required": "Approx 250 - 300 sq.ft shadow-free",
        "Installation Support": "Full Prayagraj & Kaushambi DISCOM Liaison"
      }
    },

    // CAT 4: WATER BATTERIES (TALL TUBULAR)
    {
      id: "prod-wat-01",
      name: "Luminous RedCharge RC 18000 150Ah Tall Tubular Battery",
      model: "RC-18000",
      brandId: "brand-luminous",
      categoryId: "cat-water",
      capacityAh: "150 Ah",
      voltage: "12V",
      warranty: "54 Months (36 Free Replacement + 18 Pro-rata)",
      image: "/assets/images/products/water-battery.svg",
      priceText: "Call for Today's In-Stock Special Rate",
      featured: true,
      published: true,
      badge: "India's No. 1",
      shortDescription: "Ultra-pure spine alloy tubular technology designed to survive frequent and prolonged power outages with minimum water top-up.",
      specs: {
        "Capacity": "150 Ah @ C20",
        "Voltage": "12 Volts",
        "Container": "Heavy Duty Polypropylene Tall Tubular",
        "Water Top-up Interval": "Once in 8 to 10 Months",
        "Electrolyte Indicators": "6 Ceramic Float Indicators",
        "Warranty": "54 Months (36F + 18P)"
      }
    },
    {
      id: "prod-wat-02",
      name: "Exide InvaTubular IT500 150Ah Heavy Duty Inverter Battery",
      model: "IT500",
      brandId: "brand-exide",
      categoryId: "cat-water",
      capacityAh: "150 Ah",
      voltage: "12V",
      warranty: "66 Months (48 Free Replacement + 18 Pro-rata)",
      image: "/assets/images/products/water-battery.svg",
      priceText: "Free Delivery in Prayagraj & Kaushambi",
      featured: true,
      published: true,
      badge: "Longest Warranty",
      shortDescription: "The gold standard of tubular batteries in India. Extra thick tubular positive plates ensure immense deep discharge recovery.",
      specs: {
        "Capacity": "150 Ah",
        "Voltage": "12 Volts",
        "Plate Construction": "HADI High Pressure Cast Tubular Spines",
        "Float Guides": "High Precision Magnetic Float Indicators",
        "Warranty": "66 Months (48 Free + 18 Pro-rata)"
      }
    },
    {
      id: "prod-wat-03",
      name: "Extron Gold Heavy Duty 220Ah Jumbo Tubular Battery",
      model: "EXT-2200-TT",
      brandId: "brand-extron",
      categoryId: "cat-water",
      capacityAh: "220 Ah",
      voltage: "12V",
      warranty: "60 Months",
      image: "/assets/images/products/water-battery.svg",
      priceText: "Massive Heavy Duty Backup",
      featured: true,
      published: true,
      badge: "Jumbo Backup",
      shortDescription: "Extra large 220Ah capacity for heavy household inverter setups, shop setups, clinics, and prolonged rural power outages.",
      specs: {
        "Capacity": "220 Ah",
        "Voltage": "12 Volts",
        "Backup Time": "10-12 Hours on standard home load",
        "Container Type": "Jumbo Tall Tubular with Acid Level Sensors"
      }
    },
    {
      id: "prod-wat-04",
      name: "Amaze Tall Tubular 200Ah Inverter Battery",
      model: "AMZ-TT-200",
      brandId: "brand-amaze",
      categoryId: "cat-water",
      capacityAh: "200 Ah",
      voltage: "12V",
      warranty: "54 Months",
      image: "/assets/images/products/water-battery.svg",
      priceText: "Best Value for Money",
      featured: false,
      published: true,
      badge: "Value Pick",
      shortDescription: "High-grade tubular positive spines for uninterrupted home power with quick recharging capabilities.",
      specs: {
        "Capacity": "200 Ah",
        "Voltage": "12 Volts",
        "Spine Casting": "High Pressure Low Antimony",
        "Warranty": "54 Months"
      }
    },
    {
      id: "prod-wat-05",
      name: "Tuga Power Super Tubular 160Ah Water Battery",
      model: "TUGA-ST-160",
      brandId: "brand-tugapower",
      categoryId: "cat-water",
      capacityAh: "160 Ah",
      voltage: "12V",
      warranty: "48 Months",
      image: "/assets/images/products/water-battery.svg",
      priceText: "Local Factory Direct Warranty",
      featured: false,
      published: true,
      badge: "Economy",
      shortDescription: "Reliable lead-acid tall tubular water battery built with heavy lead content for superior cyclic life.",
      specs: {
        "Capacity": "160 Ah",
        "Voltage": "12 Volts",
        "Warranty": "48 Months"
      }
    },

    // CAT 5: DRY BATTERIES (UPS BATTERIES)
    {
      id: "prod-dry-01",
      name: "Exide Powersafe Plus 12V 7Ah SMF UPS Battery",
      model: "EP7-12",
      brandId: "brand-exide",
      categoryId: "cat-dry",
      capacityAh: "7 Ah",
      voltage: "12V",
      warranty: "24 Months Replacement",
      image: "/assets/images/products/dry-battery.svg",
      priceText: "Wholesale & Bulk Rate Available",
      featured: true,
      published: true,
      badge: "Top UPS Battery",
      shortDescription: "Sealed Maintenance Free (SMF) VRLA dry battery with AGM separator for desktop computer UPS, biometric attendance, and security systems.",
      specs: {
        "Capacity": "7 Ah",
        "Voltage": "12 Volts",
        "Type": "VRLA / AGM Sealed Maintenance Free",
        "Terminals": "Faston Tab F1 / F2",
        "Application": "Computer UPS (APC, Microtek, Intex, Luminous), CCTV Power Supplies",
        "Leakproof": "100% Spill-proof in any position",
        "Warranty": "24 Months"
      }
    },
    {
      id: "prod-dry-02",
      name: "Konta (Kenta) 12V 12Ah Heavy SMF Dry Battery",
      model: "KONTA-12-12",
      brandId: "brand-konta",
      categoryId: "cat-dry",
      capacityAh: "12 Ah",
      voltage: "12V",
      warranty: "24 Months",
      image: "/assets/images/products/dry-battery.svg",
      priceText: "Ready In-Stock at Prayagraj & Charwa",
      featured: true,
      published: true,
      badge: "Long Life SMF",
      shortDescription: "High-integrity ABS dry battery ideal for medical equipment, emergency lights, electronic weighing scales, and extended UPS backup.",
      specs: {
        "Capacity": "12 Ah",
        "Voltage": "12 Volts",
        "Design Life": "3 to 5 Years Floating Service",
        "Applications": "Medical Monitors, Dental Chairs, Heavy UPS Banks, Electric Sprayers"
      }
    },
    {
      id: "prod-dry-03",
      name: "Amaron Quanta 12V 26Ah Industrial SMF Battery",
      model: "12AL026",
      brandId: "brand-amaron",
      categoryId: "cat-dry",
      capacityAh: "26 Ah",
      voltage: "12V",
      warranty: "24 Months",
      image: "/assets/images/products/dry-battery.svg",
      priceText: "Special Bank & Office Quote",
      featured: false,
      published: true,
      badge: "Commercial UPS",
      shortDescription: "Heavy-duty VRLA battery with Radgrid technology for office workstation UPS, telecom exchanges, and elevator backup systems.",
      specs: {
        "Capacity": "26 Ah",
        "Voltage": "12 Volts",
        "Technology": "Quanta Radgrid Technology",
        "Applications": "Online UPS Systems (1 kVA to 10 kVA), Server Rooms, ATM Machines"
      }
    }
  ],

  enquiries: [
    {
      id: "enq-101",
      name: "Rajesh Kumar Tiwari",
      mobile: "9839123456",
      email: "rajesh.tiwari@gmail.com",
      category: "cat-solar",
      categoryName: "Solar Panels & Systems",
      productName: "Complete 3 kW On-Grid Rooftop Solar Plant",
      branchId: "branch-prayagraj",
      branchName: "Main Branch - Puramufti (Prayagraj)",
      message: "Need 3kW rooftop solar setup for my home near Puramufti. Please call me with total cost after government subsidy.",
      date: "2026-10-29 14:32",
      status: "New",
      notes: "Customer interested in PM Surya Ghar scheme subsidy."
    },
    {
      id: "enq-102",
      name: "Mohd. Shakeel",
      mobile: "9450987654",
      email: "shakeel.charwa@yahoo.com",
      category: "cat-water",
      categoryName: "Water Batteries (Tubular)",
      productName: "Luminous RedCharge RC 18000 150Ah",
      branchId: "branch-kaushambi",
      branchName: "Second Branch - Charwa Town (Kaushambi)",
      message: "Want to exchange old 135Ah battery and buy new 150Ah tall tubular in Charwa branch. Need best exchange discount.",
      date: "2026-10-30 11:15",
      status: "In Progress",
      notes: "Quote given ₹12,500 with old battery return."
    },
    {
      id: "enq-103",
      name: "Amitabh Singh",
      mobile: "9125678901",
      email: "amitabh.singh@outlook.com",
      category: "cat-lithium",
      categoryName: "Lithium Batteries",
      productName: "Vion Smart LiFePO4 48V 100Ah",
      branchId: "branch-prayagraj",
      branchName: "Main Branch - Puramufti (Prayagraj)",
      message: "Interested in Vion 48V Lithium wall mount for 5kVA solar setup. When can your technician visit for site survey?",
      date: "2026-10-30 16:45",
      status: "Contacted",
      notes: "Site survey scheduled for Saturday 11 AM."
    }
  ],

  gallery: [
    {
      _id: "gal-01",
      title: "Pawan Traders Puramufti Showroom Front",
      caption: "Full inventory of Amaron, Exide, and Luminous batteries ready for dispatch on GT Road Puramufti.",
      imageUrl: "/assets/images/gallery/gallery-01.jpg",
      category: "branches",
      featured: true,
      order: 1
    },
    {
      _id: "gal-02",
      title: "Rooftop Solar Panel Structure Installation",
      caption: "High efficiency Mono-PERC rooftop project with PM Surya Ghar subsidy approval in Prayagraj region.",
      imageUrl: "/assets/images/gallery/gallery-02.jpg",
      category: "solar",
      featured: true,
      order: 2
    },
    {
      _id: "gal-03",
      title: "Inverter & Tall Tubular Battery Stock",
      caption: "Heavy duty inverter and tubular battery solutions tested and dispatched same-day.",
      imageUrl: "/assets/images/gallery/gallery-03.jpg",
      category: "batteries",
      featured: true,
      order: 3
    },
    {
      _id: "gal-04",
      title: "PM Surya Ghar On-Grid Solar Plant",
      caption: "Certified rooftop solar EPC installation with net-metering and direct bank subsidy.",
      imageUrl: "/assets/images/gallery/gallery-04.jpg",
      category: "solar",
      featured: true,
      order: 4
    },
    {
      _id: "gal-05",
      title: "Amaron & Exide Battery Display",
      caption: "100% genuine sealed batteries with official manufacturer barcode warranty registration.",
      imageUrl: "/assets/images/gallery/gallery-05.jpg",
      category: "batteries",
      featured: true,
      order: 5
    },
    {
      _id: "gal-06",
      title: "Lithium Inverter High-Capacity Bank",
      caption: "Next-gen wall mounted smart LiFePO4 energy storage system for silent backup.",
      imageUrl: "/assets/images/gallery/gallery-06.jpg",
      category: "batteries",
      featured: true,
      order: 6
    },
    {
      _id: "gal-07",
      title: "Charwa Branch Service Desk & Testing",
      caption: "Direct battery health testing, acid-level check, and fast doorstep delivery counter in Charwa.",
      imageUrl: "/assets/images/gallery/gallery-07.jpg",
      category: "branches",
      featured: true,
      order: 7
    },
    {
      _id: "gal-08",
      title: "Residential Solar Rooftop Setup",
      caption: "Complete 3kW to 10kW residential solar project lowering electricity bills to zero.",
      imageUrl: "/assets/images/gallery/gallery-08.jpg",
      category: "solar",
      featured: true,
      order: 8
    },
    {
      _id: "gal-09",
      title: "Heavy Commercial Automotive Battery Bank",
      caption: "High-cranking maintenance-free batteries for commercial transport and trucks.",
      imageUrl: "/assets/images/gallery/gallery-09.jpg",
      category: "installations",
      featured: true,
      order: 9
    },
    {
      _id: "gal-10",
      title: "Mono-PERC Solar Module Array",
      caption: "550W+ Tier-1 high efficiency solar panels with 25 years performance warranty.",
      imageUrl: "/assets/images/gallery/gallery-10.jpg",
      category: "solar",
      featured: false,
      order: 10
    },
    {
      _id: "gal-11",
      title: "Shop Inventory & Trolley Setups",
      caption: "Neat, modern battery trollies and sine wave inverter combinations for home safety.",
      imageUrl: "/assets/images/gallery/gallery-11.jpg",
      category: "branches",
      featured: false,
      order: 11
    },
    {
      _id: "gal-12",
      title: "Pure Sine Wave Inverter Connections",
      caption: "Microtek and Luminous smart inverters installed with clean wire management.",
      imageUrl: "/assets/images/gallery/gallery-12.jpg",
      category: "batteries",
      featured: false,
      order: 12
    },
    {
      _id: "gal-13",
      title: "Commercial Backup Power Inverter Rack",
      caption: "Heavy duty battery racks for offices, hospitals, and commercial complexes.",
      imageUrl: "/assets/images/gallery/gallery-13.jpg",
      category: "installations",
      featured: false,
      order: 13
    },
    {
      _id: "gal-14",
      title: "Rooftop Solar Net Metering Project",
      caption: "UPPCL net metering compliant bi-directional meter installation in Puramufti.",
      imageUrl: "/assets/images/gallery/gallery-14.jpg",
      category: "solar",
      featured: false,
      order: 14
    },
    {
      _id: "gal-15",
      title: "Same-Day Customer Dispatch Counter",
      caption: "Free fitting and delivery vehicles leaving for customer locations.",
      imageUrl: "/assets/images/gallery/gallery-15.jpg",
      category: "branches",
      featured: false,
      order: 15
    },
    {
      _id: "gal-16",
      title: "Solar PCU Hybrid Controller Setup",
      caption: "Intelligent solar power conditioning unit managing grid, battery, and solar power.",
      imageUrl: "/assets/images/gallery/gallery-16.jpg",
      category: "solar",
      featured: false,
      order: 16
    },
    {
      _id: "gal-17",
      title: "Industrial SMF UPS Battery Installation",
      caption: "12V VRLA Konta SMF battery bank installation for uninterrupted server operations.",
      imageUrl: "/assets/images/gallery/gallery-17.jpg",
      category: "installations",
      featured: false,
      order: 17
    },
    {
      _id: "gal-18",
      title: "Authorized Brand Battery Stockpile",
      caption: "Freshly manufactured batteries received directly from company depots.",
      imageUrl: "/assets/images/gallery/gallery-18.jpg",
      category: "batteries",
      featured: false,
      order: 18
    },
    {
      _id: "gal-19",
      title: "High-Efficiency Solar Inverter Unit",
      caption: "MPPT solar hybrid inverters ensuring maximum yield even on cloudy days.",
      imageUrl: "/assets/images/gallery/gallery-19.jpg",
      category: "solar",
      featured: false,
      order: 19
    },
    {
      _id: "gal-20",
      title: "Full Showroom Battery Inventory",
      caption: "Wide selection of 2-wheeler, car, inverter, and solar storage solutions.",
      imageUrl: "/assets/images/gallery/gallery-20.jpg",
      category: "branches",
      featured: false,
      order: 20
    },
    {
      _id: "gal-21",
      title: "Technician Battery Testing & Health Check",
      caption: "Digital load testers and hydrometers verifying battery gravity and health.",
      imageUrl: "/assets/images/gallery/gallery-21.jpg",
      category: "branches",
      featured: false,
      order: 21
    },
    {
      _id: "gal-22",
      title: "Solar Wiring & Lightning Protection",
      caption: "Safety earthing and surge protection devices installed for rooftop projects.",
      imageUrl: "/assets/images/gallery/gallery-22.jpg",
      category: "solar",
      featured: false,
      order: 22
    },
    {
      _id: "gal-23",
      title: "Charwa Main Market Store Display",
      caption: "Prominent location in front of Petrol Pump on Main Charwa Bazaar Road.",
      imageUrl: "/assets/images/gallery/gallery-23.jpg",
      category: "branches",
      featured: false,
      order: 23
    },
    {
      _id: "gal-24",
      title: "Home Inverter & Trolley Installation",
      caption: "Safe household installation keeping batteries neat, elevated, and well-ventilated.",
      imageUrl: "/assets/images/gallery/gallery-24.jpg",
      category: "installations",
      featured: false,
      order: 24
    }
  ]
};

// WhatsApp Link Generator
export function buildWhatsAppUrl(message, number = "8299362360") {
  const cleanNumber = (number || "8299362360").replace(/[^0-9]/g, "");
  const finalNumber = cleanNumber.startsWith("91") ? cleanNumber : `91${cleanNumber}`;
  return `https://wa.me/${finalNumber}?text=${encodeURIComponent(message)}`;
}

export function buildProductWhatsAppUrl(prod, brandName = "") {
  const msg = `Hello Pawan Traders,\n\nI am interested in:\n• Product: ${prod.name}\n• Brand: ${brandName || prod.brandId}\n• Model: ${prod.model}\n• Capacity: ${prod.capacityAh} (${prod.voltage})\n• Warranty: ${prod.warranty}\n\nPlease share today's best price, exchange discount, and delivery availability to Prayagraj / Kaushambi.`;
  return buildWhatsAppUrl(msg);
}

