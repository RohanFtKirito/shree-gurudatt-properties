export interface Property {
  id: string;
  slug: string;
  title: string;
  price: string;
  location: string;
  type: "Residential" | "Commercial";
  status: "For Sale" | "For Rent";
  configuration: string;
  area: string;
  description: string;
  image: string;
  images: string[];
  amenities: string[];
}

export const properties: Property[] = [
  {
    id: "1",
    slug: "2bhk-flat-goregaon-west",
    title: "Spacious 2BHK Flat in Goregaon West",
    price: "₹1.25 Cr",
    location: "Goregaon West, Mumbai",
    type: "Residential",
    status: "For Sale",
    configuration: "2BHK",
    area: "850 sq ft",
    description: "A beautifully designed 2BHK apartment with modern interiors, spacious balcony, and cross-ventilation. Located in a prime residential society with 24/7 security, covered parking, and access to a well-maintained garden. Close to Goregaon railway station and the Western Express Highway.",
    image: "/property-1.jpg",
    images: ["/property-1.jpg", "/property-3.jpg"],
    amenities: ["Covered Parking", "24/7 Security", "Garden", "Gym", "Children's Play Area", "Power Backup"],
  },
  {
    id: "2",
    slug: "office-space-goregaon-east",
    title: "Premium Office Space in Goregaon East",
    price: "₹85 Lakh",
    location: "Goregaon East, Mumbai",
    type: "Commercial",
    status: "For Sale",
    configuration: "Office",
    area: "1200 sq ft",
    description: "Fully furnished office space in a commercial complex near the SEEPZ area. Ideal for IT companies and startups. Comes with conference room, open work area, pantry, and high-speed elevator access. Excellent connectivity to the Western Express Highway and Goregaon railway station.",
    image: "/property-2.jpg",
    images: ["/property-2.jpg"],
    amenities: ["Furnished", "Conference Room", "High-speed Elevator", "Pantry", "Visitor Parking", "Power Backup"],
  },
  {
    id: "3",
    slug: "3bhk-flat-goregaon-west",
    title: "Luxury 3BHK Apartment with Modern Kitchen",
    price: "₹2.10 Cr",
    location: "Goregaon West, Mumbai",
    type: "Residential",
    status: "For Sale",
    configuration: "3BHK",
    area: "1350 sq ft",
    description: "A premium 3BHK apartment featuring a modular kitchen, wooden flooring in the master bedroom, and three bathrooms. The society offers a swimming pool, clubhouse, and landscaped garden. Situated in a quiet, well-connected locality near Aarey Road.",
    image: "/property-3.jpg",
    images: ["/property-3.jpg", "/property-1.jpg"],
    amenities: ["Swimming Pool", "Clubhouse", "Modular Kitchen", "Wooden Flooring", "Landscaped Garden", "Covered Parking"],
  },
  {
    id: "4",
    slug: "shop-goregaon-east",
    title: "Commercial Shop in Goregaon East",
    price: "₹45,000/mo",
    location: "Goregaon East, Mumbai",
    type: "Commercial",
    status: "For Rent",
    configuration: "Shop",
    area: "400 sq ft",
    description: "A ground floor commercial shop with a glass storefront, suitable for retail, boutique, or service businesses. Located on a busy main road with high footfall. Well-maintained building with CCTV security and ample visitor parking.",
    image: "/property-4.jpg",
    images: ["/property-4.jpg"],
    amenities: ["Glass Storefront", "Main Road", "CCTV", "Visitor Parking", "High Footfall Area"],
  },
  {
    id: "5",
    slug: "1bhk-flat-goregaon-east",
    title: "Affordable 1BHK in Goregaon East",
    price: "₹18,000/mo",
    location: "Goregaon East, Mumbai",
    type: "Residential",
    status: "For Rent",
    configuration: "1BHK",
    area: "500 sq ft",
    description: "A compact and well-maintained 1BHK apartment ideal for working professionals and small families. Located close to the railway station and major bus routes. The building offers lift access, water supply, and a watchman.",
    image: "/property-1.jpg",
    images: ["/property-1.jpg"],
    amenities: ["Lift", "Water Supply", "Watchman", "Near Railway Station"],
  },
  {
    id: "6",
    slug: "2bhk-flat-goregaon-east",
    title: "Semi-furnished 2BHK in Goregaon East",
    price: "₹95 Lakh",
    location: "Goregaon East, Mumbai",
    type: "Residential",
    status: "For Sale",
    configuration: "2BHK",
    area: "780 sq ft",
    description: "Semi-furnished 2BHK flat with modular kitchen and wardrobe fittings. East-facing unit with ample natural light. The housing complex has a garden, security, and children's playground. Close to schools, hospitals, and shopping centres.",
    image: "/property-3.jpg",
    images: ["/property-3.jpg"],
    amenities: ["Semi-furnished", "Modular Kitchen", "Garden", "Children's Playground", "Near Schools"],
  },
];

