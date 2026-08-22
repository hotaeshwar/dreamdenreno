export const services = [
  {
    slug: "full-home-renovation",
    name: "Full Home Renovations",
    shortDescription: "Complete transformation of existing homes from design through construction.",
    iconName: "Home",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    description: "Our comprehensive full home renovations breathe new life into older structures. From reconfiguring floor plans for open-concept living to upgrading utility systems and implementing high-end interior finishes, we coordinate every detail of the process.",
    benefits: [
      "Significant increase in property and market value",
      "Tailored layout adjustments to improve daily traffic and functionality",
      "Integration of energy-efficient insulation, lighting, and mechanical systems",
      "Uniform, luxury aesthetics tailored to your architectural style preferences"
    ],
    provisions: [
      "Custom space planning and interior layout design",
      "City permits acquisition and structural engineering",
      "Plumbing, electrical, and HVAC system overhauls",
      "Premium flooring, custom millwork, and wall finishes"
    ],
    process: [
      { step: "01", title: "As-Built Mapping", desc: "Detailed survey and drafting of your existing home structure." },
      { step: "02", title: "Space Optimization", desc: "Collaboratively re-designing layouts and preparing visual renders." },
      { step: "03", title: "Permit Acquisition", desc: "Handling all zoning reviews and engineering approvals with the city." },
      { step: "04", title: "Turnkey Buildout", desc: "Seamless execution from demolition to your final walkthrough." }
    ],
    faqs: [
      {
        question: "Do we need to move out during a full home renovation?",
        answer: "In most cases, we strongly recommend vacating the property. Because we upgrade major systems (water, power, HVAC) and execute extensive structural modifications, living on-site can be stressful, dusty, and limit construction efficiency."
      },
      {
        question: "How long does a full home renovation typically take?",
        answer: "A complete home transformation ranges from 4 to 8 months, depending on the house size, complexity of structural changes, and municipal permit processing times."
      }
    ]
  },
  {
    slug: "legal-basement-apartment",
    name: "Legal Basement Apartments",
    shortDescription: "Professional basement conversions designed around comfort, functionality and applicable local requirements.",
    iconName: "FileText",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    description: "Transform your basement into a fully compliant second dwelling unit in Ontario. We build self-contained suites that comply with all safety regulations, zoning laws, Ontario Building Code, and fire protection requirements, creating a high-quality rental asset or multi-generational space.",
    benefits: [
      "Generate monthly rental income to offset mortgages",
      "Strict compliance with municipal zoning and Building Code regulations",
      "Enhanced fire separation and egress window safety",
      "Independent utility controls and sound dampening insulation"
    ],
    provisions: [
      "Zoning approvals and building permits processing",
      "Fire separation systems (type X drywall and resilient channels)",
      "Separate plumbing lines and sub-panel installations",
      "Egress window installs and walkout entrances"
    ],
    process: [
      { step: "01", title: "Zoning & Feasibility", desc: "Verifying local bylaws and site metrics for a second unit." },
      { step: "02", title: "Safety Engineering", desc: "Designing code-compliant egress paths, ceiling heights, and fire blocks." },
      { step: "03", title: "Building Phase", desc: "Executing insulation, soundproof steps, and specialized HVAC layouts." },
      { step: "04", title: "ESA & City Sign-Off", desc: "Coordinating inspections to receive a registered occupancy permit." }
    ],
    faqs: [
      {
        question: "What makes a basement apartment 'legal' in Ontario?",
        answer: "To be legal, the apartment must have a minimum ceiling height (typically 6'11\"), direct secondary escape routes (egress windows or walks), fire separation barriers between units, separate heating source controls, and compliance with the local zoning regulations and parking rules."
      },
      {
        question: "Is soundproofing included in legal basement builds?",
        answer: "Yes, soundproofing is mandatory under the building code and a core feature of our basements. We use resilient channels, acoustic insulation (like Rockwool Safe'n'Sound), and double-layered drywall to minimize transfer."
      }
    ]
  },
  {
    slug: "custom-homes",
    name: "Custom Homes",
    shortDescription: "Build a home designed specifically around your lifestyle and vision.",
    iconName: "Hammer",
    image: "/images/projects/custom-home-after.jpg",
    description: "Construct a bespoke custom home engineered around your lifestyle, aesthetics, and architectural taste. From contemporary open-plan layouts to traditional Canadian stone estates, we manage design, engineering, zoning reviews, and building construction from the ground up.",
    benefits: [
      "Complete design freedom to select layouts, finishes, and fixtures",
      "Energy Star and Net-Zero building options for low operating costs",
      "Solid, high-quality framing, foundation, and structural materials",
      "Tarion home warranty registration for peace-of-mind coverage"
    ],
    provisions: [
      "Custom architectural renderings and 3D modeling",
      "Zoning variances, committee of adjustment representation",
      "Energy efficiency evaluations and HVAC engineering",
      "Premium exterior siding, brick, stone, and landscaping layouts"
    ],
    process: [
      { step: "01", title: "Site Assessment", desc: "Soil testing, zoning review, and building envelope layout sizing." },
      { step: "02", title: "Architectural Draft", desc: "Developing customized layouts and picking exterior/interior materials." },
      { step: "03", title: "Permit Clearance", desc: "Obtaining all environmental, civic, and structural building permits." },
      { step: "04", title: "General Contracting", desc: "Managing site prep, foundation pour, framing, services, and finishing." }
    ],
    faqs: [
      {
        question: "What is the typical cost per square foot for a custom home?",
        answer: "For premium custom homes in Ontario, base prices start around $220 - $350+ per square foot, depending on architectural complexity, soil composition, structural spans, and materials selected."
      },
      {
        question: "Are custom homes covered by a warranty?",
        answer: "Yes, as a registered builder in Ontario, all custom homes constructed by DreamDen are enrolled in the Tarion Warranty program, providing 1-year, 2-year, and 7-year structural protections."
      }
    ]
  },
  {
    slug: "kitchen-renovation",
    name: "Kitchen Renovations",
    shortDescription: "Modern kitchens with custom cabinetry, premium finishes and smart layouts.",
    iconName: "Layers",
    image: "/images/services/kitchen-header.jpg",
    description: "We craft custom, functional culinary spaces that act as the centerpiece of your home. Combining custom furniture-grade wood cabinetry, durable marble or quartz surfaces, luxury lighting configurations, and professional workflows, we ensure your kitchen is as pleasant to work in as it is beautiful.",
    benefits: [
      "High return on investment (often the highest of any single room)",
      "Optimized storage using pull-outs, hidden pantries, and custom cabinets",
      "Vibrant architectural lighting plans (under-cabinet, task, and ambient)",
      "Modern plumbing fixtures and integrated professional appliances"
    ],
    provisions: [
      "3D kitchen layouts and cabinet rendering",
      "Bespoke solid wood or shaker-style custom cabinetry",
      "Quartz, granite, or porcelain slab installations",
      "Appliance integration (sub-zero panel matches, professional ranges)"
    ],
    process: [
      { step: "01", title: "Concept Design", desc: "Selecting dynamic working triangle layouts and appliance spots." },
      { step: "02", title: "Cabinet Planning", desc: "Configuring exact cabinet sizes, hardware pulls, and color themes." },
      { step: "03", title: "Installation Set", desc: "Installing drywall, heavy-duty floor tiles, plumbing, and cabinets." },
      { step: "04", title: "Finishing Details", desc: "Template and install countertops, backsplash, and fixtures." }
    ],
    faqs: [
      {
        question: "How long does a kitchen renovation take?",
        answer: "A professional kitchen remodel usually takes between 4 to 8 weeks on-site, after cabinet manufacturing is completed."
      },
      {
        question: "Can we modify the location of the sink or stove?",
        answer: "Absolutely. We routinely relocate plumbing stacks and gas lines to optimize the functional layout (creating islands or moving stoves to exterior walls for better ventilation)."
      }
    ]
  },
  {
    slug: "bathroom-renovation",
    name: "Bathroom Renovations",
    shortDescription: "Luxury bathrooms combining functionality and modern design.",
    iconName: "Sparkles",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80",
    description: "Create a private spa sanctuary inside your home. We specialize in wet room installations, custom walk-in double showers with glass enclosures, freestanding soaking tubs, heated tile floors, and custom-designed vanities with luxury gold fixtures.",
    benefits: [
      "Transform basic bathrooms into luxury, resort-style retreats",
      "Advanced waterproofing systems (Schluter-Kerdi) to prevent mold",
      "Energy-efficient low-flow plumbing fixtures and warm radiant floors",
      "Maximization of compact layouts using smart niches and floating elements"
    ],
    provisions: [
      "Schluter-system waterproofing membranes",
      "Curbless walk-in showers with linear drains",
      "Electric or hydronic radiant floor heating systems",
      "Bespoke double vanities and stone tops"
    ],
    process: [
      { step: "01", title: "Spa Concept", desc: "Laying out fixtures, steam lines, freestanding baths, and tile styles." },
      { step: "02", title: "Waterproofing", desc: "Installing high-performance tanking membranes for leak-free lifetime." },
      { step: "03", title: "Tile Artistry", desc: "Precision alignment of large-format slabs, porcelain tiles, or mosaics." },
      { step: "04", title: "Fixtures Mount", desc: "Installing floating toilets, glass panels, rain heads, and gold trim." }
    ],
    faqs: [
      {
        question: "What is curbless shower waterproofing, and why is it premium?",
        answer: "Curbless showers require recessing the floor framing so the bathroom floor flows seamlessly into the shower pan without a step. This requires advanced Schluter-Kerdi waterproofing membranes and detailed grading to ensure perfect drainage."
      },
      {
        question: "Do you install heated floors?",
        answer: "Yes. Almost all of our premium bathroom renovations incorporate electric floor warming cables below the tile, controlled by programmable smart thermostats."
      }
    ]
  },
  {
    slug: "basement-renovation",
    name: "Basement Renovations",
    shortDescription: "Transform unused basement space into beautiful living areas.",
    iconName: "Layout",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    description: "Expand your usable square footage without extending your home's footprint. We transform cold, dark basements into bright, luxury recreation zones, private theaters, home gyms, dry bars, or home offices designed with premium insulation and finishes.",
    benefits: [
      "Creates new spaces for recreation, hobbies, or guest hosting",
      "Highly insulated sub-flooring and walls for cozy ambient temps",
      "Subtle integration of storage solutions and mechanical systems",
      "Significant increase in thermal efficiency and moisture defense"
    ],
    provisions: [
      "Subfloor thermal breaks (DriCore or similar systems)",
      "Premium framing, mold-resistant drywall, and insulation layers",
      "Home theater pre-wiring and integrated surround audio",
      "Custom dry bars, cellars, and fireplace features"
    ],
    process: [
      { step: "01", title: "Moisture Evaluation", desc: "Testing foundation walls and concrete floor slab for moisture levels." },
      { step: "02", title: "Subfloor & Framing", desc: "Building insulation barriers, framing walls, and acoustic ceilings." },
      { step: "03", title: "Services Rough-in", desc: "Running lighting lines, plumbing loops, and heating duct drops." },
      { step: "04", title: "Millwork & Trim", desc: "Installing doors, baseboards, fireplaces, and luxury flooring." }
    ],
    faqs: [
      {
        question: "How do you ensure a renovated basement doesn't feel damp?",
        answer: "We use rigid foam insulation panels or spray foam directly against concrete walls to eliminate thermal transfer, install specialized vapor barriers, and put down insulated subfloor panels to prevent damp concrete cold from rising."
      },
      {
        question: "Do I need a building permit to finish a basement?",
        answer: "Yes, in Ontario, any structural changes, new plumbing, or layout alterations in a basement require a building permit. We handle the entire engineering draft and permit process."
      }
    ]
  },
  {
    slug: "home-addition",
    name: "Home Additions",
    shortDescription: "Expand your home with thoughtfully designed additions.",
    iconName: "Maximize",
    image: "/images/services/addition-header.jpg",
    description: "Add valuable square footage to your existing home with custom home additions. Whether you are planning a second-story addition, a rear extensions, or a sunroom, we handle structural engineering, foundations, framing, and architectural integration.",
    benefits: [
      "Avoids the high transactional costs and hassle of moving homes",
      "Expands specific living areas (e.g. adding a primary suite or double garage)",
      "Allows seamless interior-to-exterior transitional living designs",
      "Modernizes the overall architectural silhouette of your property"
    ],
    provisions: [
      "Excavation and concrete foundation extensions",
      "Structural steel beam installs and load-bearing columns",
      "Siding, roofing, and window matches to existing structures",
      "HVAC extensions and mechanical coordination"
    ],
    process: [
      { step: "01", title: "Survey & Variance", desc: "Analyzing setbacks, lot coverage boundaries, and bylaws." },
      { step: "02", title: "Structural Plan", desc: "Engaging engineers to design secure connections to your home." },
      { step: "03", title: "Foundation Pour", desc: "Excavating and framing footings to extend the concrete floor base." },
      { step: "04", title: "Integration & Build", desc: "Framing the structure, roofing, cladding, and breaking through connecting walls." }
    ],
    faqs: [
      {
        question: "What is a second-story home addition?",
        answer: "A second-story addition involves removing the roof of a single-story home, reinforcing the existing main floor walls and foundation, framing a brand new second level, and building a new roof structure."
      },
      {
        question: "Will the addition match the exterior of my existing house?",
        answer: "Yes. We work carefully to match brick, siding, paint, and roofing materials, or we use the addition as an opportunity to modernize the entire exterior facade."
      }
    ]
  },
  {
    slug: "interior-exterior-renovation",
    name: "Interior & Exterior Renovations",
    shortDescription: "Complete upgrades to improve both appearance and functionality.",
    iconName: "Compass",
    image: "/images/services/interior-exterior-header.jpg",
    description: "We modernize both the inside and outside of your property. Our combined services cover architectural siding updates, stone cladding, modern deck spaces, architectural lighting layouts, new trim work, custom closets, paint finishes, and main entry doors.",
    benefits: [
      "Improves curb appeal and interior spatial flow simultaneously",
      "Upgrades building envelope insulation and exterior weatherproofing",
      "Integrates uniform colors and premium design styling on all facades",
      "Replaces outdated doors and drafty windows for lower thermal bills"
    ],
    provisions: [
      "High-end exterior siding (Maibec wood, composite, brick veneer)",
      "Custom entry doors and multi-slide patio door systems",
      "Interior door packages, casing, baseboard, and trim replacements",
      "Architectural outdoor lighting and composite decking installs"
    ],
    process: [
      { step: "01", title: "Style Boarding", desc: "Choosing matching interior trim profiles and exterior finishes." },
      { step: "02", title: "Envelope Upgrade", desc: "Installing weather barriers, siding insulation sheets, and windows." },
      { step: "03", title: "Interior Trim", desc: "Replacing old hollow-core doors with heavy solid doors and updated casings." },
      { step: "04", title: "Paint & Decking", desc: "Applying fine exterior coatings and constructing outdoor features." }
    ],
    faqs: [
      {
        question: "What siding materials do you recommend for Canadian winters?",
        answer: "We recommend fiber cement (James Hardie), high-grade cedar composites, or engineered wood. These materials offer exceptional resistance to extreme freezing, moisture expansion, and UV decay."
      },
      {
        question: "Do you install smart home locks and security systems?",
        answer: "Yes, we integrate smart door entry sets, modern architectural doorbell cams, and custom exterior accent lighting configurations during envelope builds."
      }
    ]
  },
  {
    slug: "commercial-bar-renovation",
    name: "Commercial & Bar Renovations",
    shortDescription: "Rustic modern pub and beer bar transformations custom designed for operations and atmosphere.",
    iconName: "Compass",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
    description: "We design and build premium commercial spaces, specializing in Canadian beer bars, lounges, and craft breweries. From structural draft taps cooling systems to customized wood bars and acoustics, we manage the entire commercial build.",
    benefits: [
      "Tailored bar layout optimizing server speeds and inventory workflows",
      "Premium commercial-grade plumbing, cooling, and drainage installations",
      "Acoustic design and ambient light staging for superior client comfort",
      "Fully compliant with municipal health department and AGCO requirements"
    ],
    provisions: [
      "Bespoke solid oak bar counters and back-bar layouts",
      "Glycol cooling draught line and tap system installations",
      "Commercial kitchen and glass washing station rough-ins",
      "Atmospheric architectural lighting grids"
    ],
    process: [
      { step: "01", title: "Operational Audit", desc: "Analyzing server traffic patterns, bar layouts, and keg walk-in spots." },
      { step: "02", title: "System Engineering", desc: "Drafting tap loops, plumbing, drainage, ventilation, and cooling lines." },
      { step: "03", title: "Bar Millwork", desc: "Custom building the solid counters and steel foot-rests in our shop." },
      { step: "04", title: "Fit-Out & AGCO", desc: "Completing detailed assembly, testing cooling loops, and securing fire permits." }
    ],
    faqs: [
      {
        question: "Do you handle liquor license (AGCO) layouts and city health permits?",
        answer: "Yes, commercial bar builds require strictly detailed layouts for city building permits, health department clearance, and Alcohol and Gaming Commission of Ontario (AGCO) applications. We prepare all structural and operational layouts."
      },
      {
        question: "What draft line options do you install?",
        answer: "We install both direct-draw walk-in systems and long-draw glycol-chilled line loops to keep craft beers pouring at optimal temperatures regardless of distance."
      }
    ]
  }
];
