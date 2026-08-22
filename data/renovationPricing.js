export const renovationPricing = {
  // Base prices and range calculation rules
  projectTypes: {
    "full-home": {
      name: "Full Home Renovation",
      basePrice: 85000,
      pricePerSqFt: 110,
      minPrice: 100000,
      minSqFt: 1000
    },
    "legal-basement": {
      name: "Legal Basement Apartment",
      basePrice: 65000,
      pricePerSqFt: 75,
      minPrice: 70000,
      minSqFt: 600
    },
    "custom-home": {
      name: "Custom Home",
      basePrice: 350000,
      pricePerSqFt: 220,
      minPrice: 300000,
      minSqFt: 1500
    },
    "kitchen": {
      name: "Kitchen Renovation",
      basePrice: 20000,
      pricePerSqFt: 150,
      minPrice: 25000,
      minSqFt: 150
    },
    "bathroom": {
      name: "Bathroom Renovation",
      basePrice: 12000,
      pricePerSqFt: 180,
      minPrice: 15000,
      minSqFt: 80
    },
    "basement": {
      name: "Basement Renovation",
      basePrice: 25000,
      pricePerSqFt: 45,
      minPrice: 30000,
      minSqFt: 600
    },
    "addition": {
      name: "Home Addition",
      basePrice: 75000,
      pricePerSqFt: 180,
      minPrice: 90000,
      minSqFt: 400
    },
    "commercial-bar": {
      name: "Commercial & Bar Renovation",
      basePrice: 95000,
      pricePerSqFt: 145,
      minPrice: 110000,
      minSqFt: 800
    },
    "other": {
      name: "Other Renovation",
      basePrice: 15000,
      pricePerSqFt: 60,
      minPrice: 15000,
      minSqFt: 200
    }
  },

  finishLevels: {
    essential: {
      name: "Essential",
      multiplier: 1.0,
      description: "Functional updates, quality standard materials, clean finishes."
    },
    standard: {
      name: "Standard",
      multiplier: 1.25,
      description: "Upgraded options, durable popular brands, enhanced aesthetic design."
    },
    premium: {
      name: "Premium",
      multiplier: 1.6,
      description: "Designer fixtures, custom woodworking, high-end materials and fittings."
    },
    luxury: {
      name: "Luxury",
      multiplier: 2.1,
      description: "Bespoke architectural details, imported materials, smart home integration, top-tier craftsmanship."
    }
  },

  addons: {
    cabinets: { name: "Custom Cabinets", price: 15000 },
    flooring: { name: "Premium Flooring", price: 8000 },
    lighting: { name: "Designer Lighting", price: 4500 },
    plumbing: { name: "Upgraded Plumbing", price: 6000 },
    electrical: { name: "Upgraded Electrical", price: 5000 },
    hvac: { name: "HVAC & Ventilation", price: 7500 },
    windows: { name: "Windows & Exterior Doors", price: 10000 },
    painting: { name: "Professional Painting", price: 4000 },
    structural: { name: "Structural Changes", price: 22000 }
  },

  sizes: [
    { id: "under-500", label: "Under 500 sq ft", avgValue: 400 },
    { id: "500-1000", label: "500 – 1,000 sq ft", avgValue: 750 },
    { id: "1000-2000", label: "1,000 – 2,000 sq ft", avgValue: 1500 },
    { id: "2000-3000", label: "2,000 – 3,000 sq ft", avgValue: 2500 },
    { id: "3000-plus", label: "3,000+ sq ft", avgValue: 3500 }
  ],

  timelines: [
    { id: "asap", label: "As Soon As Possible" },
    { id: "1-3-months", label: "1 – 3 Months" },
    { id: "3-6-months", label: "3 – 6 Months" },
    { id: "6-plus-months", label: "6+ Months" },
    { id: "flexible", label: "Flexible" }
  ]
};
