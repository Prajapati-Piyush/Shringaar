/* ==========================================================================
   SHRINGAR — LUXURY JEWELLERY MASTER DATABASE
   Brand: SHRINGAR (Fine Heritage & Contemporary Jewellery)
   ========================================================================== */

export const STORE_CONFIG = {
  brandName: "SHRINGAR",
  subTitle: "FINE HERITAGE & CONTEMPORARY JEWELLERY",
  tagline: "Modern Indian Luxury Meets International Editorial Design",
  whatsappNumber: "919999999999", // International format without '+'
  upiId: "shringar@upi",
  freeShippingThreshold: 999,
  shippingCharge: 79,
  currency: "₹",

  // Top rotating announcement bar
  announcements: [
    "✨ Festive Edit Live: Free Insured Air Shipping on All Orders Above ₹999",
    "🛡️ 18K Hallmarked Gold Plating • 100% Anti-Tarnish & Waterproof Lifetime Warranty",
    "⚡ Instant WhatsApp & UPI Checkout • Cash on Delivery Across 19,000+ Indian Pincodes"
  ],

  // FULL-WIDTH CINEMATIC HERO BANNERS (Responsive: 75–85vh Desktop, 65–75svh Mobile)
  heroBanners: [
    {
      id: "banner-gold",
      collectionTag: "ROYAL GOLD COLLECTION",
      headline: "Elegance That Lives Forever",
      subheadline: "Discover timeless gold creations crafted to celebrate every beautiful moment.",
      ctaText: "Explore Gold",
      filterCategory: "Gold Jewellery",
      // Desktop 16:9 Landscape & Mobile 3:4 Portrait
      image: "/banners/banner_gold.jpg",
      mobileImage: "/banners/banner_gold_mobile.jpg",
      desktopPosition: "object-[center_28%]",
      mobilePosition: "object-[center_15%]",
      accent: "#C6A46A"
    },
    {
      id: "banner-diamond",
      collectionTag: "DIAMOND DREAMS",
      headline: "Where Brilliance Meets Beauty",
      subheadline: "Discover the beauty of timeless diamond jewellery.",
      ctaText: "Explore Diamonds",
      filterCategory: "Diamond Jewellery",
      // Desktop 16:9 Landscape & Mobile 3:4 Portrait
      image: "/banners/banner_diamond.jpg",
      mobileImage: "/banners/banner_diamond_mobile.jpg",
      desktopPosition: "object-[center_30%]",
      mobilePosition: "object-[center_20%]",
      accent: "#DFCCA6"
    },
    {
      id: "banner-heritage",
      collectionTag: "ROYAL HERITAGE ATELIER",
      headline: "Artistry of Imperial Heritage",
      subheadline: "Handcrafted polki and temple jewels forged for contemporary royalty.",
      ctaText: "Discover Heirlooms",
      filterCategory: "Gold Jewellery",
      // Desktop 16:9 Landscape & Mobile 3:4 Portrait
      image: "/banners/banner_bridal.jpg",
      mobileImage: "/banners/banner_bridal_mobile.jpg",
      desktopPosition: "object-[center_22%]",
      mobilePosition: "object-[center_15%]",
      accent: "#C6A46A"
    }
  ],

  // 7 Curated Categories with Authentic Fine Jewellery Photographs
  categories: [
    {
      id: "cat-gold",
      name: "Gold Jewellery",
      slug: "gold",
      description: "18K & 22K temple matte and polished yellow gold",
      image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "cat-diamond",
      name: "Diamond Jewellery",
      slug: "diamond",
      description: "Fine solitaires and pavé crystals",
      image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "cat-rings",
      name: "Rings",
      slug: "rings",
      description: "Navratna cocktail bands & solitaires",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "cat-earrings",
      name: "Earrings",
      slug: "earrings",
      description: "Kundan chandbalis, jhumkas & hoops",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "cat-necklaces",
      name: "Necklaces",
      slug: "necklaces",
      description: "Temple chokers & layered chains",
      image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "cat-bangles",
      name: "Bangles",
      slug: "bangles",
      description: "Traditional gold bangles, kadas & cuffs",
      image: "https://images.unsplash.com/photo-1758995116383-f51775896add?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "cat-pendants",
      name: "Pendants",
      slug: "pendants",
      description: "Solitaire drops & protective talismans",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600"
    }
  ],

  // Featured Luxury Collections
  featuredCollections: [
    { id: "all", name: "All Creations" },
    { id: "Royal Heritage", name: "Royal Heritage" },
    { id: "Everyday Elegance", name: "Everyday Elegance" },
    { id: "Diamond Classics", name: "Diamond Classics" },
    { id: "Festive Radiance", name: "Festive Radiance" }
  ],

  // Exactly 15 Curated Fine Jewellery Products (3 per category: Earrings, Rings, Necklaces, Bangles, Pendants)
  // Strict matching rule: Every single product displays its own unique, verified high-resolution photograph.
  products: [
    {
      id: "prod-1",
      title: "Traditional 22K Gold Jhumka Earrings",
      category: "Earrings",
      categoryGroup: "Gold Jewellery",
      collection: "Royal Heritage",
      badge: "Bestseller",
      price: 1299,
      mrp: 2199,
      rating: 4.9,
      reviewsCount: 142,
      metal: "22K Yellow Gold Dip",
      image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&q=80&w=800",
      hoverImage: null,
      gallery: ["https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&q=80&w=800"],
      description: "Royal bell-shaped temple jhumkas with filigreed golden domes, natural seed pearl tassels, and antique gold matte patina.",
      material: "22K Traditional Temple Gold Micron Plating, Hand-cut Polki glass, Seed pearls",
      care: "Avoid direct contact with perfumes and sanitizers. Store inside the complimentary velvet pouch.",
      specs: "Length: 7.2 cm | Weight: 26g per pair"
    },
    {
      id: "prod-2",
      title: "Elegant Gold Drop Earrings",
      category: "Earrings",
      categoryGroup: "Gold Jewellery",
      collection: "Everyday Elegance",
      badge: "Trending",
      price: 849,
      mrp: 1399,
      rating: 4.8,
      reviewsCount: 93,
      metal: "18K Yellow Gold Dip",
      image: "https://images.unsplash.com/photo-1651160670627-2896ddf7822f?auto=format&fit=crop&q=80&w=800",
      hoverImage: null,
      gallery: ["https://images.unsplash.com/photo-1651160670627-2896ddf7822f?auto=format&fit=crop&q=80&w=800"],
      description: "Handcrafted cascading gold drop earrings with delicate filigree beadwork and warm 18K yellow gold finish.",
      material: "18K gold plated brass, Hypoallergenic surgical posts",
      care: "Put on after perfume and hairspray to preserve natural gold luster.",
      specs: "Drop length: 4.8 cm | Weight: 9g per pair"
    },
    {
      id: "prod-3",
      title: "Diamond Stud Earrings",
      category: "Earrings",
      categoryGroup: "Diamond Jewellery",
      collection: "Diamond Classics",
      badge: "Bestseller",
      price: 749,
      mrp: 1299,
      rating: 4.7,
      reviewsCount: 95,
      metal: "18K Gold Vermeil",
      image: "https://images.unsplash.com/photo-1693212793204-bcea856c75fe?auto=format&fit=crop&q=80&w=800",
      hoverImage: null,
      gallery: ["https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&q=80&w=800"],
      description: "Open-work gold and diamond stud earrings with geometric symmetry and brilliant center fire.",
      material: "Diamond-cut cubic zirconia, 18K gold vermeil, Silicone-cushioned backs",
      care: "Shower safe, safe for daily sleep and workout.",
      specs: "Diameter: 7mm | Protective prong basket"
    },
    {
      id: "prod-4",
      title: "Diamond Solitaire Ring",
      category: "Rings",
      categoryGroup: "Diamond Jewellery",
      collection: "Diamond Classics",
      badge: "Trending",
      price: 699,
      mrp: 1199,
      rating: 4.9,
      reviewsCount: 82,
      metal: "18K Gold Vermeil",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
      hoverImage: null,
      gallery: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800"],
      description: "Brilliant cut solitaire framed by a pavé-embellished band coated in rich 18K yellow gold. Timeless luxury.",
      material: "Brilliant cut solitaire stone, 18K gold shank",
      care: "Gently polish with included micro-suede cloth for blinding sparkle.",
      specs: "Center stone: brilliant cut | Four-prong protective setting"
    },
    {
      id: "prod-5",
      title: "Floral Gold Finger Ring",
      category: "Rings",
      categoryGroup: "Gold Jewellery",
      collection: "Royal Heritage",
      badge: "Bestseller",
      price: 799,
      mrp: 1299,
      rating: 4.9,
      reviewsCount: 64,
      metal: "18K Gold Vermeil",
      image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=800",
      hoverImage: null,
      gallery: ["https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=800"],
      description: "Radiant blooming floral petal arrangement in solid 18K yellow gold finish. Auspicious and feminine.",
      material: "18K gold vermeil, Comfort fit band",
      care: "Clean with dry micro-suede cloth. Avoid harsh chemicals.",
      specs: "Central cluster diameter: 18mm | Comfort curved interior"
    },
    {
      id: "prod-6",
      title: "Rose Gold Solitaire Ring",
      category: "Rings",
      categoryGroup: "Diamond Jewellery",
      collection: "Everyday Elegance",
      badge: "Trending",
      price: 599,
      mrp: 999,
      rating: 4.8,
      reviewsCount: 54,
      metal: "18K Rose Gold Dip",
      image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800",
      hoverImage: null,
      gallery: ["https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800"],
      description: "Romantic cushion-cut solitaire framed with micro-pavé accents on a 18K rose gold vermeil band.",
      material: "18K rose gold over sterling brass, Micro-pavé crystals",
      care: "Wipe with soft cloth after daily wear. Shower safe.",
      specs: "Band width: 2.5mm | Micro-pavé setting"
    },
    {
      id: "prod-7",
      title: "Traditional Gold Necklace",
      category: "Necklaces",
      categoryGroup: "Gold Jewellery",
      collection: "Royal Heritage",
      badge: "Bestseller",
      price: 2499,
      mrp: 3999,
      rating: 5.0,
      reviewsCount: 98,
      metal: "18K Antique Temple Gold",
      image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800",
      hoverImage: null,
      gallery: ["https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800"],
      description: "Inspired by ancient Indian temple architecture, featuring intricate filigreed gold motifs and graceful drop beads.",
      material: "Antique Matte 18K Gold Dip, Filigree gold work, Adjustable silk dori",
      care: "Wipe with soft muslin cloth after wear. 1-year anti-tarnish warranty.",
      specs: "Adjustable silk dori fits all collar dimensions seamlessly"
    },
    {
      id: "prod-8",
      title: "Traditional Gold Mangalsutra",
      category: "Necklaces",
      categoryGroup: "Gold Jewellery",
      collection: "Royal Heritage",
      badge: "Trending",
      price: 1099,
      mrp: 1899,
      rating: 5.0,
      reviewsCount: 129,
      metal: "18K Yellow Gold Dip",
      image: "/products/gold_mangalsutra.jpg",
      hoverImage: null,
      gallery: ["/products/gold_mangalsutra.jpg"],
      description: "Sacred black beads intertwined with solid 18K gold chain, holding an auspicious floral gold center pendant.",
      material: "Sacred black onyx beads, 18K gold chain and filigreed medallion",
      care: "Waterproof, daily shower-friendly. Anti-snag design.",
      specs: "Adjustable 16 to 18-inch length"
    },
    {
      id: "prod-9",
      title: "Royal Pearl & Diamond Choker Necklace",
      category: "Necklaces",
      categoryGroup: "Diamond Jewellery",
      collection: "Festive Radiance",
      badge: "Trending",
      price: 2199,
      mrp: 3499,
      rating: 4.9,
      reviewsCount: 73,
      metal: "18K Gold Dip",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800",
      hoverImage: null,
      gallery: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800"],
      description: "Lustrous cultured pearls interwoven with diamond-cut crystal accents and 18K liquid gold filigree setting.",
      material: "Cultured river pearls, 18K gold micron dip, Shimmering pavé crystals",
      care: "Keep in dry, airtight pouch provided with anti-oxidation silica tabs.",
      specs: "Adjustable choker collar with secure lobster clasp"
    },
    {
      id: "prod-10",
      title: "Traditional Gold Bangles",
      category: "Bangles",
      categoryGroup: "Gold Jewellery",
      collection: "Festive Radiance",
      badge: "Bestseller",
      price: 1499,
      mrp: 2499,
      rating: 4.8,
      reviewsCount: 86,
      metal: "18K Yellow Gold Dip",
      image: "https://images.unsplash.com/photo-1758995116383-f51775896add?auto=format&fit=crop&q=80&w=800",
      hoverImage: null,
      gallery: ["https://images.unsplash.com/photo-1758995116383-f51775896add?auto=format&fit=crop&q=80&w=800"],
      description: "Textured radiance gold bangles pair featuring intricate royal carving and antique gold luster. A festive staple.",
      material: "22K gold dip over solid brass core, Textured hand-carved inlays",
      care: "Waterproof and sweatproof. Safe for daily handwashing.",
      specs: "Set of 2 bangles with secure comfortable interior"
    },
    {
      id: "prod-11",
      title: "Modern Gold Bracelet",
      category: "Bangles",
      categoryGroup: "Gold Jewellery",
      collection: "Everyday Elegance",
      badge: "Trending",
      price: 949,
      mrp: 1599,
      rating: 4.7,
      reviewsCount: 68,
      metal: "18K Yellow Gold Dip",
      image: "https://images.unsplash.com/photo-1611591475155-426c04a292dc?auto=format&fit=crop&q=80&w=800",
      hoverImage: null,
      gallery: ["https://images.unsplash.com/photo-1611591475155-426c04a292dc?auto=format&fit=crop&q=80&w=800"],
      description: "Chic geometric link motif gold bangle bracelet with comfortable flexible contour for sleek everyday stacking.",
      material: "Leaf-patterned 18K gold finish, Flexible comfort spring fit",
      care: "Waterproof, daily wear certified. Never tarnishes with sanitizers.",
      specs: "Band width: 6mm | Interior circumference: 17.5 cm"
    },
    {
      id: "prod-12",
      title: "Imperial Gold Kada",
      category: "Bangles",
      categoryGroup: "Gold Jewellery",
      collection: "Royal Heritage",
      badge: "Trending",
      price: 1699,
      mrp: 2799,
      rating: 4.9,
      reviewsCount: 88,
      metal: "18K Temple Gold Dip",
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800",
      hoverImage: null,
      gallery: ["https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800"],
      description: "Regal hand-crafted traditional loha gold kada with deep engraved patterns and antique temple finish.",
      material: "Handcrafted 22K-style temple gold dip over solid brass core with hinge pin",
      care: "Waterproof, daily wear certified. Never tarnishes with hand sanitizers.",
      specs: "Single openable statement kada with safety screw"
    },
    {
      id: "prod-13",
      title: "Gold Medallion Pendant",
      category: "Pendants",
      categoryGroup: "Gold Jewellery",
      collection: "Everyday Elegance",
      badge: "Trending",
      price: 899,
      mrp: 1499,
      rating: 4.8,
      reviewsCount: 77,
      metal: "18K Yellow Gold Dip",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
      hoverImage: null,
      gallery: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800"],
      description: "Artisanal gold coin medallion talisman suspended on an ultra-fine shimmer cable chain. Designed for effortless daily layering.",
      material: "Hammered medallion charm, 18K liquid gold dip, Lobster clasp",
      care: "Store flat in velvet case to avoid kinks.",
      specs: "Tier 1: 16 inch | Tier 2: 18 inch + 2 inch extension"
    },
    {
      id: "prod-14",
      title: "Diamond Solitaire Pendant",
      category: "Pendants",
      categoryGroup: "Diamond Jewellery",
      collection: "Diamond Classics",
      badge: "Trending",
      price: 1199,
      mrp: 1999,
      rating: 4.8,
      reviewsCount: 59,
      metal: "18K Yellow Gold Dip",
      image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=800",
      hoverImage: null,
      gallery: ["https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=800"],
      description: "Solitaire diamond-cut crystal framed in a shimmering pavé halo, suspended on a delicate 18K yellow gold chain.",
      material: "Austrian brilliant crystal + delicate curb chain, 18K gold vermeil",
      care: "Polish with dry cotton cloth. Do not expose to boiling liquids.",
      specs: "Pendant stone: 10x7mm | 18-inch chain with 2-inch extender"
    },
    {
      id: "prod-15",
      title: "Minimal Droplet Pendant",
      category: "Pendants",
      categoryGroup: "Gold Jewellery",
      collection: "Everyday Elegance",
      badge: "Trending",
      price: 649,
      mrp: 1099,
      rating: 4.8,
      reviewsCount: 83,
      metal: "18K Yellow Gold Dip",
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&q=80&w=800",
      hoverImage: null,
      gallery: ["https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&q=80&w=800"],
      description: "Artisanal droplet talisman suspended on an ultra-fine shimmer cable chain. Designed for effortless daily layering.",
      material: "18K yellow gold PVD plating, Solid stainless steel core, Hypoallergenic",
      care: "Shower safe, sweatproof, perfume resistant.",
      specs: "Disc diameter: 14mm | Chain length: 16 inches + 2-inch extension"
    }
  ],

  // Flagship Boutiques
  boutiques: [
    {
      city: "Mumbai",
      salon: "Kala Ghoda Heritage Flagship",
      address: "14, Forbes Street, Kala Ghoda, Fort, Mumbai 400001",
      phone: "+91 99999 99999",
      hours: "11:00 AM – 8:00 PM (All Days)",
      timing: "11:00 AM – 8:00 PM"
    },
    {
      city: "New Delhi",
      salon: "Mehrauli Royal Atelier",
      address: "Khasra 284, The Qutub Boulevard, Mehrauli, New Delhi 110030",
      phone: "+91 99999 99999",
      hours: "11:00 AM – 8:00 PM (All Days)",
      timing: "11:00 AM – 8:00 PM"
    },
    {
      city: "Bengaluru",
      salon: "Lavelle Road Salon Privé",
      address: "42, Lavelle Road, Shanthala Nagar, Bengaluru 560001",
      phone: "+91 99999 99999",
      hours: "11:00 AM – 8:00 PM (All Days)",
      timing: "11:00 AM – 8:00 PM"
    }
  ],

  // Trust Pillars
  trustPillars: [
    {
      id: "gold",
      title: "18K Micron Gold Plated",
      subtitle: "Triple-Dipped Luster",
      desc: "Authentic 18K yellow and temple gold electro-deposited over a hypoallergenic, skin-safe core."
    },
    {
      id: "tarnish",
      title: "100% Anti-Tarnish Guaranteed",
      subtitle: "Waterproof Shield",
      desc: "Hydrophobic molecular barrier protects against perfumes, moisture, shower water, and daily sweat."
    },
    {
      id: "skin",
      title: "Skin-Safe & Nickel-Free",
      subtitle: "Zero Irritation",
      desc: "Certified zero nickel and lead. Engineered for 12+ hour festive wear without redness or itching."
    },
    {
      id: "shipping",
      title: "Insured Air Express",
      subtitle: "48-Hour Dispatch",
      desc: "Tamper-evident luxury packaging with live BlueDart Air tracking to your doorstep."
    }
  ],

  // Patron Testimonials
  reviews: [
    {
      id: "rev-1",
      name: "Ananya Varma",
      city: "Mumbai",
      location: "Mumbai",
      product: "Mayura Temple Antique Choker",
      stars: 5,
      rating: 5,
      date: "Verified Patron • 3 days ago",
      text: "The antique temple finish on the Mayura Choker looks and weighs identical to 22K ancestral gold. Wore it to my cousin's Sangeet and four different aunties asked which heritage jeweller crafted it!",
      comment: "The antique temple finish on the Mayura Choker looks and weighs identical to 22K ancestral gold. Wore it to my cousin's Sangeet and four different aunties asked which heritage jeweller crafted it!"
    },
    {
      id: "rev-2",
      name: "Radhika Kapoor",
      city: "New Delhi",
      location: "New Delhi",
      product: "Rajwada Kundan Chandbali Jhumkas",
      stars: 5,
      rating: 5,
      date: "Verified Patron • 1 week ago",
      text: "Zero earlobe irritation! I have ultra-sensitive skin and usually have to take off ethnic earrings within two hours. Kept these on for twelve hours straight without a trace of redness or discoloration.",
      comment: "Zero earlobe irritation! I have ultra-sensitive skin and usually have to take off ethnic earrings within two hours. Kept these on for twelve hours straight without a trace of redness or discoloration."
    },
    {
      id: "rev-3",
      name: "Priya Sundaram",
      city: "Bengaluru",
      location: "Bengaluru",
      product: "Zari Meenakari Gold Kada Pair",
      stars: 5,
      rating: 5,
      date: "Verified Patron • 2 weeks ago",
      text: "Sheer royal luxury from the unboxing to the wear. The velvet box, certificate, and anti-tarnish pouch arrived in 48 hours to Indiranagar. The openable screw clasp fits like a dream!",
      comment: "Sheer royal luxury from the unboxing to the wear. The velvet box, certificate, and anti-tarnish pouch arrived in 48 hours to Indiranagar. The openable screw clasp fits like a dream!"
    }
  ],

  // Frequently Asked Questions
  faqs: [
    {
      q: "Is your jewellery really 100% anti-tarnish and waterproof?",
      a: "Yes, absolutely. Our pieces feature an advanced 18K gold micron plating bonded with a hydrophobic molecular shield. They are engineered to withstand tropical humidity, perfumes, shower water, and daily sweat without losing their imperial luster."
    },
    {
      q: "Is SHRINGAR jewellery safe for sensitive Indian skin?",
      a: "Every piece is certified hypoallergenic, 100% nickel-free, cadmium-free, and lead-free. You can comfortably wear our earrings and necklaces for 14+ hours during festivals or weddings with zero redness, itching, or discoloration."
    },
    {
      q: "What is your shipping and delivery timeline?",
      a: "We offer Free Insured Air Express Delivery on all orders above ₹999. Orders are dispatched within 24–48 hours from our ateliers via BlueDart Air, reaching metro cities within 2–3 business days and all other regions within 3–5 business days."
    },
    {
      q: "Do you offer Cash on Delivery (COD)?",
      a: "Yes! Cash on Delivery is available across 19,000+ Indian pincodes. You can pay with cash or scan the courier partner's UPI QR code at your doorstep upon delivery."
    },
    {
      q: "What is your exchange and warranty policy?",
      a: "We provide an unconditional 7-day doorstep replacement guarantee if you experience any sizing issues or transit damage, accompanied by a 1-year anti-tarnish warranty card inside your luxury velvet keepsake box."
    }
  ],

  // Footer & Brand Details
  footer: {
    story: "SHRINGAR was founded to bridge the timeless majesty of Indian royal goldsmithing with modern wearable elegance. Dipped in 18K temple gold and sealed against tarnish, every piece is an heirloom designed for everyday grace.",
    instagramHandle: "@shringar.official",
    craftedBy: "buildwithuss agency",
    agencyUrl: "https://buildwithus-agency.vercel.app/"
  }
};
