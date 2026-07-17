import { Room, Review } from "@/types";

export const LUXURY_ROOMS: Room[] = [
  {
    id: "std-room",
    name: "Standard Room",
    slug: "standard-room",
    tagline: "Serene Comfort for the Discerning Traveler",
    pricePerNight: 8500,
    maxGuests: 2,
    sizeSqFt: 350,
    bedType: "Queen Size Bed",
    view: "City View & Courtyard",
    images: [
      "/images/room_king_bed.jpeg",
      "/images/door_handle.jpeg",
      "/images/room_bedside_lamps.mp4"
    ],
    facilities: [
      "Free high-speed WiFi",
      "Individually controlled AC",
      "Smart LED TV with Netflix",
      "Premium coffee maker",
      "Minibar with gourmet snacks",
      "Electronic safe box",
      "24/7 Room service"
    ],
    description: "Designed with a minimalistic aesthetic, our Standard Room offers an oasis of calm. It features high-quality linens, handcrafted furnishings, and custom lighting to make your stay incredibly cozy.",
    longDescription: "Unwind in an elegant space tailored for ultimate relaxation. The Standard Room combines modern convenience with timeless luxury. Guests can enjoy a curated selection of premium bath amenities, customizable mood lighting, and high-speed fiber internet. A dedicated workstation is provided for business requirements, alongside a plush lounge chair adjacent to the expansive windows overlooking our private manicured courtyard.",
    isPremium: false
  },
  {
    id: "dlx-room",
    name: "Deluxe Room",
    slug: "deluxe-room",
    tagline: "Spacious Elegance with Panoramic Vistas",
    pricePerNight: 12000,
    maxGuests: 2,
    sizeSqFt: 480,
    bedType: "King Size Bed",
    view: "Garden View & Mountains",
    images: [
      "/images/work_desk.jpeg",
      "/images/bathroom_sink.jpeg",
      "/images/working_laptop.mp4"
    ],
    facilities: [
      "Free high-speed WiFi",
      "Individually controlled AC",
      "Smart LED TV with Bose Sound",
      "Espresso machine",
      "Walk-in wardrobe",
      "Soaking bathtub",
      "Gourmet minibar",
      "Valet laundry service"
    ],
    description: "Perfectly blending space, view, and detail, the Deluxe Room features private glass balconies, premium rain showers, and deep-soaking bathtubs for a spa-like retreat.",
    longDescription: "Our Deluxe Rooms invite you to experience the true meaning of relaxation. Step out onto your private balcony to enjoy the fresh mountain air, or sink into the signature plush king-size mattress with 600-thread-count Egyptian cotton sheets. The marble-clad bathroom includes double vanities, organic bath salts, and a rain shower designed to soothe after a long day of travel.",
    isPremium: false
  },
  {
    id: "exec-room",
    name: "Executive Club Room",
    slug: "executive-room",
    tagline: "Refined Luxury with Exclusive Lounge Access",
    pricePerNight: 18500,
    maxGuests: 3,
    sizeSqFt: 620,
    bedType: "King Size + Sofa Bed",
    view: "Lake View & City Skyline",
    images: [
      "/images/reception_desk_1.jpeg",
      "/images/hotel_interior.mp4",
      "/images/room_unlock.mp4"
    ],
    facilities: [
      "Executive Club Lounge access",
      "Complimentary high tea & cocktails",
      "Premium WiFi",
      "Smart home automated room controls",
      "Espresso & premium tea selections",
      "Luxury marble bathroom with rain shower",
      "In-room checkout convenience",
      "Airport transfers included"
    ],
    description: "Tailored for business leaders and luxury connoisseurs, this room offers access to the private Executive Lounge, high-floor views, and round-the-clock butler service.",
    longDescription: "The Executive Club Room sets the standard for high-end hospitality. Furnished with modern bespoke cabinetry, custom art pieces, and state-of-the-art climate controls, this suite-like room is a haven of efficiency and style. Guests receive premium access to the 4 Seasons Lounge, which serves complimentary breakfast, evening hors d'oeuvres, and selected cocktails.",
    isPremium: true
  },
  {
    id: "fam-room",
    name: "Grand Family Room",
    slug: "family-room",
    tagline: "Cherished Moments in Unlimited Luxury",
    pricePerNight: 22000,
    maxGuests: 4,
    sizeSqFt: 750,
    bedType: "Two Double Beds",
    view: "Panoramic Property & Garden View",
    images: [
      "/images/whatsapp_image_1.jpeg",
      "/images/whatsapp_image_2.jpeg",
      "/images/whatsapp_image_3.jpeg"
    ],
    facilities: [
      "Free high-speed WiFi",
      "Double-zone temperature control",
      "2 x Smart LED TVs",
      "Kid-friendly minibar amenities",
      "PlayStation 5 setup on demand",
      "Spacious dining table for four",
      "Free extra bedding options",
      "Buffet breakfast included"
    ],
    description: "Providing generous spaces for the whole family, this layout offers two separate sleeping zones, double vanity bathrooms, and access to children’s activity hubs.",
    longDescription: "Specially designed for family bonding without compromising on luxury. The Grand Family Room consists of two distinct sleeping zones with high-end bedding, a dedicated family media lounge, and a large dining area for room-service gatherings. The room includes priority booking for curated activities, kid-friendly welcome treats, and child-safe furnishings.",
    isPremium: false
  },
  {
    id: "ste-room",
    name: "Presidential Suite",
    slug: "suite-room",
    tagline: "The Pinnacle of Regal Hospitality",
    pricePerNight: 45000,
    maxGuests: 4,
    sizeSqFt: 1400,
    bedType: "King Size Grand Bed & Guest Suite",
    view: "360-Degree Mountain & Lake Vistas",
    images: [
      "/images/bedroom_night.jpeg",
      "/images/bathroom_interior.mp4",
      "/images/reception_desk_2.jpeg"
    ],
    facilities: [
      "Private pool & jacuzzi deck",
      "Dedicated butler service (24/7)",
      "Private chef dining options",
      "In-room private bar & wine cellar",
      "Luxury airport pickup via Rolls Royce",
      "Plush lounge with grand piano",
      "Steam & sauna inside bath area",
      "VIP access to all stay amenities"
    ],
    description: "Spanning across 1400 square feet, the Presidential Suite features a private terrace jacuzzi, a grand dining salon, a master study, and unmatched security and opulence.",
    longDescription: "The absolute crown jewel of 4 Seasons Stay. Our Presidential Suite represents the ultimate in hospitality and architectural design. The suite boasts high ceilings, crystal chandeliers, a private library/study, a fully-equipped kitchen with a personal butler entrance, and an outdoor terrace with a heated infinity jacuzzi. Ideal for VIP guests and celebrations of distinction.",
    isPremium: true
  }
];

export const TESTIMONIALS: Review[] = [
  {
    id: "r1",
    author: "Lady Victoria Sterling",
    rating: 5,
    text: "From the Rolls Royce arrival to the private butler, 4 Seasons Stay is the epitome of fine luxury. The attention to detail in the Presidential Suite is breath-taking.",
    date: "June 2026",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&fit=crop",
    roomName: "Presidential Suite"
  },
  {
    id: "r2",
    author: "Richard Alpert",
    rating: 5,
    text: "I travel 200 days a year. The Executive Club Room at 4 Seasons Stay provided one of the best sleep experiences and lounge environments I've ever had the pleasure to visit.",
    date: "May 2026",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&fit=crop",
    roomName: "Executive Club Room"
  },
  {
    id: "r3",
    author: "The Kapoor Family",
    rating: 5,
    text: "Traveling with two kids is tough, but the Grand Family Room had everything we needed. The PlayStation, the spacious layout, and the complimentary breakfast were outstanding.",
    date: "July 2026",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&fit=crop",
    roomName: "Grand Family Room"
  }
];

export const GALLERY_ITEMS = [
  { id: "g1", category: "exterior", url: "/images/drone_entrance.mp4", type: "video", title: "Drone View: Property Entrance" },
  { id: "g2", category: "lobby", url: "/images/reception_welcome.mp4", type: "video", title: "Lobby Welcoming Guests" },
  { id: "g3", category: "lobby", url: "/images/reception_desk_1.jpeg", type: "image", title: "Grand Reception Counter" },
  { id: "g4", category: "lobby", url: "/images/reception_desk_2.jpeg", type: "image", title: "Lobby Waiting Lounge" },
  { id: "g5", category: "lobby", url: "/images/reception_checkout.mp4", type: "video", title: "Seamless Reception Checkout" },
  { id: "g6", category: "lobby", url: "/images/checkout_reception.jpeg", type: "image", title: "Checkout Reception Desk" },
  { id: "g7", category: "rooms", url: "/images/room_king_bed.jpeg", type: "image", title: "Luxury Suite King Bed" },
  { id: "g8", category: "rooms", url: "/images/bedroom_night.jpeg", type: "image", title: "Bespoke Bedroom At Night" },
  { id: "g9", category: "rooms", url: "/images/room_bedside_lamps.mp4", type: "video", title: "Cozy Evening Bedside Ambiance" },
  { id: "g10", category: "rooms", url: "/images/room_unlock.mp4", type: "video", title: "Keyless Smart Door Entry" },
  { id: "g11", category: "rooms", url: "/images/door_handle.jpeg", type: "image", title: "Modern Premium Door Styling" },
  { id: "g12", category: "rooms", url: "/images/bathroom_interior.mp4", type: "video", title: "Marble Bathroom Walkthrough" },
  { id: "g13", category: "rooms", url: "/images/bathroom_sink.jpeg", type: "image", title: "Luxury Marble Double Vanity" },
  { id: "g14", category: "rooms", url: "/images/work_desk.jpeg", type: "image", title: "Bespoke In-Room Work Station" },
  { id: "g15", category: "rooms", url: "/images/working_laptop.mp4", type: "video", title: "Executive Workspace Environment" },
  { id: "g16", category: "rooms", url: "/images/hotel_interior.mp4", type: "video", title: "Executive Club Tour" },
  { id: "g17", category: "restaurant", url: "/images/tea_coffee_station.jpeg", type: "image", title: "In-Room Tea & Coffee Setup" },
  { id: "g18", category: "restaurant", url: "/images/coffee_pour.mp4", type: "video", title: "Gourmet Breakfast Coffee Pour" },
  { id: "g19", category: "exterior", url: "/images/exterior_warm.jpeg", type: "image", title: "Property Exterior Warm Evening Lighting" },
  { id: "g20", category: "exterior", url: "/images/whatsapp_image_1.jpeg", type: "image", title: "Exclusive Room Suite View" },
  { id: "g21", category: "exterior", url: "/images/whatsapp_image_2.jpeg", type: "image", title: "Property Perspective" },
  { id: "g22", category: "exterior", url: "/images/whatsapp_image_3.jpeg", type: "image", title: "Tranquil Courtyard Setting" }
];

export const NEARBY_ATTRACTIONS = [
  { name: "Royal Botanical Sanctuary", distance: "1.2 km", desc: "A historic 50-acre tropical conservatory housing rare orchids." },
  { name: "The Heritage Museum", distance: "3.5 km", desc: "Explore local cultural artifacts and classical artwork collections." },
  { name: "Azure Lakefront Boardwalk", distance: "0.5 km", desc: "Scenic paved walking paths featuring upscale boutiques and yacht clubs." },
  { name: "Cascade Summit Tramway", distance: "7.8 km", desc: "Cable car rising 4,000 feet with dramatic views of the mountain valley." }
];

export const FAQS = [
  { q: "What are the standard Check-in and Check-out times?", a: "Standard check-in is at 2:00 PM and check-out is at 12:00 PM. Early check-in or late check-out can be requested and is subject to room availability." },
  { q: "Do you offer airport transportation?", a: "Yes, we offer premium airport pick-up and drop-off services. For Presidential Suite guests, this service is complimentary via a luxury sedan. Other guests can arrange transfers for a fixed surcharge during booking." },
  { q: "Is breakfast included in the room rate?", a: "Breakfast is included by default for our Executive Club, Grand Family, and Presidential Suite bookings. For Standard and Deluxe rooms, it can be optionally added during reservation or during check-in." },
  { q: "What is your cancellation policy?", a: "Free cancellation is available up to 48 hours prior to the check-in date. Cancellations made within 48 hours will incur a fee equivalent to a one-night stay." },
  { q: "Is there secure parking at the property?", a: "Yes, we offer complimentary 24/7 secure valet parking for all registered guests. Charging stations for electric vehicles are also available in our parking bay." }
];

export const COUPONS: Record<string, number> = {
  "LUXURY20": 0.20, // 20% Off
  "WELCOME10": 0.10, // 10% Off
  "HONEYMOON50": 0.50, // 50% Off (Suite rooms only in simulation)
  "STAYFREE": 0.15 // 15% Off
};
