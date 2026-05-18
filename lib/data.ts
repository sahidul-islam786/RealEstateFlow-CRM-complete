// Organization
export const organization = {
  name: "Sunrise Realty Pvt Ltd",
  logo: "/logo.png",
};

// Team Members
export type TeamMember = {
  id: string;
  name: string;
  role: "Admin" | "Sales Manager" | "Sales Agent" | "Field Executive" | "Social Media Manager";
  phone: string;
  email: string;
};

export const teamMembers: TeamMember[] = [
  { id: "tm1", name: "Arjun Mehta", role: "Admin", phone: "+91 98765 43210", email: "arjun@sunriserealty.in" },
  { id: "tm2", name: "Priya Sharma", role: "Sales Agent", phone: "+91 98765 43211", email: "priya@sunriserealty.in" },
  { id: "tm3", name: "Rahul Verma", role: "Sales Agent", phone: "+91 98765 43212", email: "rahul@sunriserealty.in" },
  { id: "tm4", name: "Sneha Patel", role: "Sales Manager", phone: "+91 98765 43213", email: "sneha@sunriserealty.in" },
  { id: "tm5", name: "Karan Singh", role: "Field Executive", phone: "+91 98765 43214", email: "karan@sunriserealty.in" },
  { id: "tm6", name: "Meera Joshi", role: "Social Media Manager", phone: "+91 98765 43215", email: "meera@sunriserealty.in" },
];

// Leads
export type LeadSource = "MagicBricks" | "36 Acre" | "Housing.com" | "Facebook" | "Instagram" | "Website" | "Referral" | "Manual";
export type PropertyType = "Apartment" | "Villa" | "Plot" | "Commercial" | "Rental";
export type LeadStatus = "New" | "Contacted" | "Interested" | "Site Visit Scheduled" | "Negotiation" | "Won" | "Lost" | "Not Responding";
export type Temperature = "Hot" | "Warm" | "Cold";

export type Lead = {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  source: LeadSource;
  propertyType: PropertyType;
  budgetMin: number;
  budgetMax: number;
  preferredLocation: string;
  status: LeadStatus;
  temperature: Temperature;
  assignedAgent: string;
  notes: string;
  nextFollowup: string;
  lastContacted: string;
  createdAt: string;
};

export const leads: Lead[] = [
  {
    id: "lead1",
    fullName: "Rajesh Kumar",
    phone: "+91 99887 76655",
    email: "rajesh.kumar@gmail.com",
    source: "MagicBricks",
    propertyType: "Apartment",
    budgetMin: 7500000,
    budgetMax: 12000000,
    preferredLocation: "Gurgaon",
    status: "Interested",
    temperature: "Hot",
    assignedAgent: "tm2",
    notes: "Looking for 3BHK near metro station. Prefers gated community.",
    nextFollowup: "2024-01-15",
    lastContacted: "2024-01-13T10:30:00",
    createdAt: "2024-01-10T09:00:00",
  },
  {
    id: "lead2",
    fullName: "Anita Desai",
    phone: "+91 98765 12345",
    email: "anita.desai@yahoo.com",
    source: "Facebook",
    propertyType: "Villa",
    budgetMin: 25000000,
    budgetMax: 35000000,
    preferredLocation: "Bangalore",
    status: "Site Visit Scheduled",
    temperature: "Hot",
    assignedAgent: "tm2",
    notes: "Interested in premium villas with garden. Site visit on Sunday.",
    nextFollowup: "2024-01-14",
    lastContacted: "2024-01-12T14:00:00",
    createdAt: "2024-01-08T11:00:00",
  },
  {
    id: "lead3",
    fullName: "Vikram Malhotra",
    phone: "+91 87654 32109",
    email: "vikram.m@outlook.com",
    source: "Instagram",
    propertyType: "Commercial",
    budgetMin: 50000000,
    budgetMax: 75000000,
    preferredLocation: "Mumbai",
    status: "Negotiation",
    temperature: "Hot",
    assignedAgent: "tm3",
    notes: "Looking for office space in BKC. 5000+ sqft required.",
    nextFollowup: "2024-01-15",
    lastContacted: "2024-01-13T16:00:00",
    createdAt: "2024-01-05T10:00:00",
  },
  {
    id: "lead4",
    fullName: "Sunita Reddy",
    phone: "+91 76543 21098",
    email: "sunita.r@gmail.com",
    source: "36 Acre",
    propertyType: "Plot",
    budgetMin: 15000000,
    budgetMax: 20000000,
    preferredLocation: "Hyderabad",
    status: "Contacted",
    temperature: "Warm",
    assignedAgent: "tm2",
    notes: "Interested in plots near ORR. Investment purpose.",
    nextFollowup: "2024-01-16",
    lastContacted: "2024-01-11T09:30:00",
    createdAt: "2024-01-09T14:00:00",
  },
  {
    id: "lead5",
    fullName: "Amit Sharma",
    phone: "+91 65432 10987",
    email: "amit.sharma@hotmail.com",
    source: "Housing.com",
    propertyType: "Apartment",
    budgetMin: 4500000,
    budgetMax: 6500000,
    preferredLocation: "Noida",
    status: "New",
    temperature: "Warm",
    assignedAgent: "tm3",
    notes: "First-time buyer. Looking for 2BHK.",
    nextFollowup: "2024-01-14",
    lastContacted: "",
    createdAt: "2024-01-13T08:00:00",
  },
  {
    id: "lead6",
    fullName: "Neha Gupta",
    phone: "+91 54321 09876",
    email: "neha.gupta@gmail.com",
    source: "Website",
    propertyType: "Rental",
    budgetMin: 25000,
    budgetMax: 40000,
    preferredLocation: "Pune",
    status: "Interested",
    temperature: "Hot",
    assignedAgent: "tm2",
    notes: "Corporate relocation. Needs 2BHK near Hinjewadi.",
    nextFollowup: "2024-01-14",
    lastContacted: "2024-01-12T11:00:00",
    createdAt: "2024-01-11T16:00:00",
  },
  {
    id: "lead7",
    fullName: "Sanjay Patel",
    phone: "+91 43210 98765",
    email: "sanjay.p@yahoo.com",
    source: "Referral",
    propertyType: "Villa",
    budgetMin: 30000000,
    budgetMax: 45000000,
    preferredLocation: "Chennai",
    status: "New",
    temperature: "Cold",
    assignedAgent: "tm3",
    notes: "Referred by Rajesh Kumar. Looking for independent house.",
    nextFollowup: "2024-01-17",
    lastContacted: "",
    createdAt: "2024-01-13T10:00:00",
  },
  {
    id: "lead8",
    fullName: "Priyanka Singh",
    phone: "+91 32109 87654",
    email: "priyanka.s@gmail.com",
    source: "MagicBricks",
    propertyType: "Apartment",
    budgetMin: 8000000,
    budgetMax: 11000000,
    preferredLocation: "Delhi",
    status: "Won",
    temperature: "Hot",
    assignedAgent: "tm2",
    notes: "Booked 3BHK in Green Valley. Token paid.",
    nextFollowup: "",
    lastContacted: "2024-01-10T15:00:00",
    createdAt: "2024-01-01T09:00:00",
  },
  {
    id: "lead9",
    fullName: "Karthik Iyer",
    phone: "+91 21098 76543",
    email: "karthik.i@outlook.com",
    source: "Facebook",
    propertyType: "Commercial",
    budgetMin: 20000000,
    budgetMax: 30000000,
    preferredLocation: "Bangalore",
    status: "Lost",
    temperature: "Cold",
    assignedAgent: "tm3",
    notes: "Went with competitor. Budget constraints.",
    nextFollowup: "",
    lastContacted: "2024-01-08T14:00:00",
    createdAt: "2023-12-20T11:00:00",
  },
  {
    id: "lead10",
    fullName: "Deepa Menon",
    phone: "+91 10987 65432",
    email: "deepa.m@gmail.com",
    source: "Instagram",
    propertyType: "Apartment",
    budgetMin: 5500000,
    budgetMax: 7500000,
    preferredLocation: "Gurgaon",
    status: "Not Responding",
    temperature: "Cold",
    assignedAgent: "tm2",
    notes: "Multiple call attempts. No response.",
    nextFollowup: "2024-01-18",
    lastContacted: "2024-01-05T10:00:00",
    createdAt: "2023-12-28T09:00:00",
  },
  {
    id: "lead11",
    fullName: "Rohit Jain",
    phone: "+91 98123 45678",
    email: "rohit.jain@gmail.com",
    source: "MagicBricks",
    propertyType: "Plot",
    budgetMin: 10000000,
    budgetMax: 15000000,
    preferredLocation: "Noida",
    status: "Interested",
    temperature: "Warm",
    assignedAgent: "tm3",
    notes: "Looking for plot in Sector 150.",
    nextFollowup: "2024-01-15",
    lastContacted: "2024-01-12T09:00:00",
    createdAt: "2024-01-07T14:00:00",
  },
  {
    id: "lead12",
    fullName: "Meghana Rao",
    phone: "+91 87234 56789",
    email: "meghana.r@yahoo.com",
    source: "36 Acre",
    propertyType: "Villa",
    budgetMin: 35000000,
    budgetMax: 50000000,
    preferredLocation: "Hyderabad",
    status: "Contacted",
    temperature: "Warm",
    assignedAgent: "tm2",
    notes: "NRI buyer. Looking for farmhouse style villa.",
    nextFollowup: "2024-01-16",
    lastContacted: "2024-01-11T18:00:00",
    createdAt: "2024-01-06T10:00:00",
  },
  {
    id: "lead13",
    fullName: "Arun Nair",
    phone: "+91 76345 67890",
    email: "arun.nair@hotmail.com",
    source: "Housing.com",
    propertyType: "Apartment",
    budgetMin: 6000000,
    budgetMax: 8500000,
    preferredLocation: "Mumbai",
    status: "New",
    temperature: "Warm",
    assignedAgent: "tm3",
    notes: "Relocating from Chennai. Prefers western suburbs.",
    nextFollowup: "2024-01-14",
    lastContacted: "",
    createdAt: "2024-01-13T11:00:00",
  },
  {
    id: "lead14",
    fullName: "Divya Kapoor",
    phone: "+91 65456 78901",
    email: "divya.k@gmail.com",
    source: "Facebook",
    propertyType: "Rental",
    budgetMin: 35000,
    budgetMax: 50000,
    preferredLocation: "Bangalore",
    status: "Won",
    temperature: "Hot",
    assignedAgent: "tm2",
    notes: "Signed lease for Whitefield apartment.",
    nextFollowup: "",
    lastContacted: "2024-01-09T16:00:00",
    createdAt: "2024-01-02T09:00:00",
  },
  {
    id: "lead15",
    fullName: "Manish Tiwari",
    phone: "+91 54567 89012",
    email: "manish.t@outlook.com",
    source: "Instagram",
    propertyType: "Commercial",
    budgetMin: 15000000,
    budgetMax: 25000000,
    preferredLocation: "Pune",
    status: "Site Visit Scheduled",
    temperature: "Hot",
    assignedAgent: "tm3",
    notes: "Looking for retail space in Koregaon Park.",
    nextFollowup: "2024-01-14",
    lastContacted: "2024-01-13T11:00:00",
    createdAt: "2024-01-04T15:00:00",
  },
  {
    id: "lead16",
    fullName: "Shruti Verma",
    phone: "+91 43678 90123",
    email: "shruti.v@gmail.com",
    source: "Website",
    propertyType: "Apartment",
    budgetMin: 9000000,
    budgetMax: 13000000,
    preferredLocation: "Gurgaon",
    status: "Interested",
    temperature: "Hot",
    assignedAgent: "tm2",
    notes: "Looking for 4BHK with servant quarter.",
    nextFollowup: "2024-01-15",
    lastContacted: "2024-01-12T10:00:00",
    createdAt: "2024-01-08T09:00:00",
  },
  {
    id: "lead17",
    fullName: "Gaurav Saxena",
    phone: "+91 32789 01234",
    email: "gaurav.s@yahoo.com",
    source: "MagicBricks",
    propertyType: "Plot",
    budgetMin: 5000000,
    budgetMax: 8000000,
    preferredLocation: "Delhi",
    status: "Contacted",
    temperature: "Cold",
    assignedAgent: "tm3",
    notes: "Budget conscious. Looking in outskirts.",
    nextFollowup: "2024-01-17",
    lastContacted: "2024-01-10T14:00:00",
    createdAt: "2024-01-09T11:00:00",
  },
  {
    id: "lead18",
    fullName: "Pooja Sharma",
    phone: "+91 21890 12345",
    email: "pooja.sharma@gmail.com",
    source: "36 Acre",
    propertyType: "Villa",
    budgetMin: 20000000,
    budgetMax: 30000000,
    preferredLocation: "Chennai",
    status: "Won",
    temperature: "Hot",
    assignedAgent: "tm2",
    notes: "Booked villa in ECR. Full payment done.",
    nextFollowup: "",
    lastContacted: "2024-01-07T15:00:00",
    createdAt: "2023-12-15T10:00:00",
  },
  {
    id: "lead19",
    fullName: "Akash Reddy",
    phone: "+91 10901 23456",
    email: "akash.r@hotmail.com",
    source: "Facebook",
    propertyType: "Apartment",
    budgetMin: 4000000,
    budgetMax: 5500000,
    preferredLocation: "Hyderabad",
    status: "New",
    temperature: "Warm",
    assignedAgent: "tm3",
    notes: "Young professional. First home buyer.",
    nextFollowup: "2024-01-14",
    lastContacted: "",
    createdAt: "2024-01-13T14:00:00",
  },
  {
    id: "lead20",
    fullName: "Lakshmi Krishnan",
    phone: "+91 99012 34567",
    email: "lakshmi.k@gmail.com",
    source: "Instagram",
    propertyType: "Rental",
    budgetMin: 20000,
    budgetMax: 30000,
    preferredLocation: "Noida",
    status: "Interested",
    temperature: "Hot",
    assignedAgent: "tm2",
    notes: "Student. Looking for 1BHK near college.",
    nextFollowup: "2024-01-14",
    lastContacted: "2024-01-13T09:00:00",
    createdAt: "2024-01-12T16:00:00",
  },
];

// Properties
export type PropertyStatus = "Available" | "Hold" | "Sold" | "Rented";
export type Furnishing = "Furnished" | "Semi-Furnished" | "Unfurnished";

export type Property = {
  id: string;
  title: string;
  location: string;
  address: string;
  type: PropertyType;
  price: number;
  isRental: boolean;
  size: number;
  bedrooms: number;
  bathrooms: number;
  floor: string;
  furnishing: Furnishing;
  status: PropertyStatus;
  description: string;
  amenities: string[];
  image: string;
};

export const properties: Property[] = [
  {
    id: "prop1",
    title: "Luxury 3BHK in DLF Phase 5",
    location: "Gurgaon",
    address: "Tower B, DLF Park Place, Sector 54, Gurgaon",
    type: "Apartment",
    price: 11500000,
    isRental: false,
    size: 2100,
    bedrooms: 3,
    bathrooms: 3,
    floor: "12th of 24",
    furnishing: "Semi-Furnished",
    status: "Available",
    description: "Spacious 3BHK apartment with stunning city views. Modern kitchen with modular fittings, marble flooring throughout, and large balconies. Located in a premium gated community with 24/7 security.",
    amenities: ["Swimming Pool", "Gym", "Clubhouse", "Power Backup", "Covered Parking", "Children Play Area", "Jogging Track"],
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
  },
  {
    id: "prop2",
    title: "Premium Villa in Whitefield",
    location: "Bangalore",
    address: "Villa 42, Prestige Lakeside Habitat, Whitefield",
    type: "Villa",
    price: 32000000,
    isRental: false,
    size: 4500,
    bedrooms: 4,
    bathrooms: 5,
    floor: "G+2",
    furnishing: "Furnished",
    status: "Available",
    description: "Exquisite 4BHK villa with private garden and terrace. Italian marble flooring, home automation system, and designer interiors. Premium location with excellent connectivity.",
    amenities: ["Private Garden", "Swimming Pool", "Home Theatre", "Servant Quarter", "Solar Panels", "Rainwater Harvesting", "Smart Home"],
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
  },
  {
    id: "prop3",
    title: "Commercial Space in BKC",
    location: "Mumbai",
    address: "Unit 501, One BKC, Bandra Kurla Complex",
    type: "Commercial",
    price: 65000000,
    isRental: false,
    size: 5200,
    bedrooms: 0,
    bathrooms: 4,
    floor: "5th of 12",
    furnishing: "Unfurnished",
    status: "Available",
    description: "Prime commercial space in Mumbai's business district. Open floor plan suitable for IT/ITES companies. Excellent natural lighting and panoramic views of the city.",
    amenities: ["Central AC", "24/7 Access", "Food Court", "Conference Rooms", "High-speed Lifts", "Ample Parking", "Metro Connectivity"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
  },
  {
    id: "prop4",
    title: "Premium Plot in Jubilee Hills",
    location: "Hyderabad",
    address: "Plot 78, Road No. 10, Jubilee Hills",
    type: "Plot",
    price: 18000000,
    isRental: false,
    size: 3200,
    bedrooms: 0,
    bathrooms: 0,
    floor: "N/A",
    furnishing: "Unfurnished",
    status: "Available",
    description: "Prime residential plot in Jubilee Hills. Clear title, ready for construction. Corner plot with excellent frontage. Surrounded by established residences and close to major hospitals.",
    amenities: ["Gated Community", "Underground Electricity", "Water Connection", "Wide Roads", "Park Facing"],
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
  },
  {
    id: "prop5",
    title: "Modern 2BHK for Rent",
    location: "Bangalore",
    address: "Apt 304, Brigade Gateway, Rajajinagar",
    type: "Rental",
    price: 45000,
    isRental: true,
    size: 1200,
    bedrooms: 2,
    bathrooms: 2,
    floor: "3rd of 8",
    furnishing: "Furnished",
    status: "Available",
    description: "Fully furnished 2BHK apartment available for immediate move-in. Modern appliances, modular kitchen, and premium fittings. Walking distance to metro station and malls.",
    amenities: ["AC", "Washing Machine", "Refrigerator", "Microwave", "Gym Access", "Swimming Pool", "Covered Parking"],
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
  },
  {
    id: "prop6",
    title: "Spacious 4BHK in Powai",
    location: "Mumbai",
    address: "Wing C, Hiranandani Gardens, Powai",
    type: "Apartment",
    price: 28000000,
    isRental: false,
    size: 2800,
    bedrooms: 4,
    bathrooms: 4,
    floor: "18th of 30",
    furnishing: "Semi-Furnished",
    status: "Hold",
    description: "Elegant 4BHK apartment with lake views. Premium location in Hiranandani complex with world-class amenities. Ideal for large families looking for luxury living.",
    amenities: ["Lake View", "Gymnasium", "Tennis Court", "Clubhouse", "24/7 Security", "Concierge", "Shopping Complex"],
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
  },
  {
    id: "prop7",
    title: "Executive Villa in ECR",
    location: "Chennai",
    address: "Beach House 15, ECR Road, Injambakkam",
    type: "Villa",
    price: 42000000,
    isRental: false,
    size: 5000,
    bedrooms: 5,
    bathrooms: 6,
    floor: "G+1",
    furnishing: "Furnished",
    status: "Sold",
    description: "Beachfront villa with private access to the beach. Luxurious interiors with imported fittings. Perfect weekend getaway or permanent residence for those who love the sea.",
    amenities: ["Beach Access", "Private Pool", "Landscaped Garden", "BBQ Area", "Guest House", "Covered Parking", "Generator"],
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
  },
  {
    id: "prop8",
    title: "IT Park Office Space",
    location: "Pune",
    address: "Building 5, EON IT Park, Kharadi",
    type: "Commercial",
    price: 22000000,
    isRental: false,
    size: 3500,
    bedrooms: 0,
    bathrooms: 3,
    floor: "7th of 15",
    furnishing: "Unfurnished",
    status: "Available",
    description: "Modern office space in premium IT park. Ideal for startups and mid-sized companies. Plug and play option available with ready infrastructure.",
    amenities: ["Cafeteria", "ATM", "Business Center", "Ample Parking", "24/7 Power", "High-speed Internet", "Security"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
  },
  {
    id: "prop9",
    title: "2BHK in Sector 150",
    location: "Noida",
    address: "Tower 7, ATS Pristine, Sector 150",
    type: "Apartment",
    price: 6500000,
    isRental: false,
    size: 1100,
    bedrooms: 2,
    bathrooms: 2,
    floor: "8th of 25",
    furnishing: "Unfurnished",
    status: "Available",
    description: "Affordable 2BHK in upcoming sector. Great investment opportunity with excellent appreciation potential. Near proposed metro line and expressway.",
    amenities: ["Swimming Pool", "Gym", "Power Backup", "Security", "Parking", "Club House"],
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
  },
  {
    id: "prop10",
    title: "Farm Plot near ORR",
    location: "Hyderabad",
    address: "Survey 145, Shankarpally, near ORR Exit 14",
    type: "Plot",
    price: 12000000,
    isRental: false,
    size: 10890,
    bedrooms: 0,
    bathrooms: 0,
    floor: "N/A",
    furnishing: "Unfurnished",
    status: "Available",
    description: "Agricultural land perfect for farmhouse development. Beautiful natural surroundings with existing mango trees. Easy access from ORR with excellent future development potential.",
    amenities: ["Water Source", "Electricity Available", "Wide Approach Road", "Fenced", "Mango Orchard"],
    image: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800",
  },
];

// Follow-ups
export type FollowupType = "WhatsApp" | "Call" | "Email";
export type FollowupStatus = "due" | "upcoming" | "completed";
export type Priority = "high" | "medium" | "low";

export type Followup = {
  id: string;
  leadId: string;
  leadName: string;
  type: FollowupType;
  template: string;
  dueDate: string;
  status: FollowupStatus;
  priority: Priority;
};

const today = new Date().toISOString().split("T")[0];
const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

export const followups: Followup[] = [
  {
    id: "fu1",
    leadId: "lead1",
    leadName: "Rajesh Kumar",
    type: "WhatsApp",
    template: "Hi Rajesh, following up on the 3BHK apartments we discussed. Would you like to schedule a site visit this weekend?",
    dueDate: today,
    status: "due",
    priority: "high",
  },
  {
    id: "fu2",
    leadId: "lead2",
    leadName: "Anita Desai",
    type: "Call",
    template: "Call to confirm site visit timing for Sunday. Discuss villa options in Whitefield.",
    dueDate: today,
    status: "due",
    priority: "high",
  },
  {
    id: "fu3",
    leadId: "lead6",
    leadName: "Neha Gupta",
    type: "WhatsApp",
    template: "Hi Neha, I have found a perfect 2BHK near Hinjewadi matching your requirements. Can we schedule a viewing tomorrow?",
    dueDate: today,
    status: "due",
    priority: "medium",
  },
  {
    id: "fu4",
    leadId: "lead16",
    leadName: "Shruti Verma",
    type: "Email",
    template: "Dear Shruti, please find attached the brochure for the 4BHK properties in Gurgaon. Let me know your preferred time for a site visit.",
    dueDate: today,
    status: "due",
    priority: "medium",
  },
  {
    id: "fu5",
    leadId: "lead3",
    leadName: "Vikram Malhotra",
    type: "Call",
    template: "Discussion on final pricing and negotiation for BKC office space.",
    dueDate: tomorrow,
    status: "upcoming",
    priority: "high",
  },
  {
    id: "fu6",
    leadId: "lead11",
    leadName: "Rohit Jain",
    type: "WhatsApp",
    template: "Hi Rohit, sharing some plot options in Sector 150. Let me know which ones interest you.",
    dueDate: tomorrow,
    status: "upcoming",
    priority: "medium",
  },
  {
    id: "fu7",
    leadId: "lead15",
    leadName: "Manish Tiwari",
    type: "Call",
    template: "Confirm site visit for Koregaon Park retail space. Discuss lease terms.",
    dueDate: tomorrow,
    status: "upcoming",
    priority: "high",
  },
  {
    id: "fu8",
    leadId: "lead20",
    leadName: "Lakshmi Krishnan",
    type: "WhatsApp",
    template: "Hi Lakshmi, I found a nice 1BHK near your college. Available for immediate move-in. Interested?",
    dueDate: tomorrow,
    status: "upcoming",
    priority: "low",
  },
];

// Calls
export type CallStatus = "completed" | "no-answer";
export type CallOutcome = "interested" | "callback" | "not-interested" | "wrong-number" | "";

export type CallRecord = {
  id: string;
  leadId: string;
  leadName: string;
  agentName: string;
  status: CallStatus;
  duration: number; // seconds
  outcome: CallOutcome;
  startedAt: string;
};

export const calls: CallRecord[] = [
  {
    id: "call1",
    leadId: "lead1",
    leadName: "Rajesh Kumar",
    agentName: "Priya Sharma",
    status: "completed",
    duration: 420,
    outcome: "interested",
    startedAt: "2024-01-13T10:30:00",
  },
  {
    id: "call2",
    leadId: "lead2",
    leadName: "Anita Desai",
    agentName: "Priya Sharma",
    status: "completed",
    duration: 600,
    outcome: "interested",
    startedAt: "2024-01-12T14:00:00",
  },
  {
    id: "call3",
    leadId: "lead10",
    leadName: "Deepa Menon",
    agentName: "Priya Sharma",
    status: "no-answer",
    duration: 0,
    outcome: "",
    startedAt: "2024-01-13T09:00:00",
  },
  {
    id: "call4",
    leadId: "lead3",
    leadName: "Vikram Malhotra",
    agentName: "Rahul Verma",
    status: "completed",
    duration: 900,
    outcome: "interested",
    startedAt: "2024-01-13T16:00:00",
  },
  {
    id: "call5",
    leadId: "lead15",
    leadName: "Manish Tiwari",
    agentName: "Rahul Verma",
    status: "completed",
    duration: 480,
    outcome: "callback",
    startedAt: "2024-01-13T11:00:00",
  },
];

// Attendance
export type AttendanceStatus = "checked-in" | "late" | "absent";

export type Attendance = {
  id: string;
  userId: string;
  userName: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: AttendanceStatus;
};

export const attendance: Attendance[] = [
  { id: "att1", userId: "tm1", userName: "Arjun Mehta", date: today, checkIn: "09:02", checkOut: null, status: "checked-in" },
  { id: "att2", userId: "tm2", userName: "Priya Sharma", date: today, checkIn: "08:55", checkOut: null, status: "checked-in" },
  { id: "att3", userId: "tm3", userName: "Rahul Verma", date: today, checkIn: "09:35", checkOut: null, status: "late" },
  { id: "att4", userId: "tm4", userName: "Sneha Patel", date: today, checkIn: "08:50", checkOut: null, status: "checked-in" },
  { id: "att5", userId: "tm5", userName: "Karan Singh", date: today, checkIn: null, checkOut: null, status: "absent" },
  { id: "att6", userId: "tm6", userName: "Meera Joshi", date: today, checkIn: "09:10", checkOut: null, status: "checked-in" },
];

// Social Media Posts
export type SocialPlatform = "Instagram Post" | "Instagram Reel" | "Facebook Post" | "LinkedIn Post" | "Story";
export type PostStatus = "Idea" | "Draft" | "Scheduled" | "Published";

export type SocialPost = {
  id: string;
  type: SocialPlatform;
  caption: string;
  status: PostStatus;
  scheduledAt: string | null;
  assignedTo: string;
};

export const socialPosts: SocialPost[] = [
  {
    id: "post1",
    type: "Instagram Reel",
    caption: "Walkthrough of our stunning 3BHK in DLF Phase 5! Modern living at its finest. #LuxuryHomes #GurgaonRealEstate",
    status: "Scheduled",
    scheduledAt: "2024-01-15T10:00:00",
    assignedTo: "tm6",
  },
  {
    id: "post2",
    type: "Facebook Post",
    caption: "New listing alert! Premium villa in Whitefield, Bangalore. 4BHK with private garden. Starting at 3.2 Cr. DM for details!",
    status: "Published",
    scheduledAt: "2024-01-12T12:00:00",
    assignedTo: "tm6",
  },
  {
    id: "post3",
    type: "LinkedIn Post",
    caption: "Sunrise Realty achieves record sales in Q4 2023! Thank you to our amazing team and valued clients. Here's to an even better 2024!",
    status: "Draft",
    scheduledAt: null,
    assignedTo: "tm6",
  },
  {
    id: "post4",
    type: "Instagram Post",
    caption: "Investment opportunity: Premium plots in Jubilee Hills, Hyderabad. Limited inventory available. Book your site visit today!",
    status: "Idea",
    scheduledAt: null,
    assignedTo: "tm6",
  },
  {
    id: "post5",
    type: "Story",
    caption: "Behind the scenes at our new project site! Exciting things coming soon...",
    status: "Scheduled",
    scheduledAt: "2024-01-14T18:00:00",
    assignedTo: "tm6",
  },
];

// Activity Log
export type ActivityType = "call" | "whatsapp" | "note" | "followup" | "property_share" | "status_change";

export type Activity = {
  id: string;
  leadId: string;
  type: ActivityType;
  description: string;
  timestamp: string;
  agentName: string;
};

export const activities: Activity[] = [
  // Lead 1 activities
  {
    id: "act1",
    leadId: "lead1",
    type: "call",
    description: "Called and discussed 3BHK options. Client interested in DLF Phase 5.",
    timestamp: "2024-01-13T10:30:00",
    agentName: "Priya Sharma",
  },
  {
    id: "act2",
    leadId: "lead1",
    type: "whatsapp",
    description: "Sent property brochure for DLF Park Place.",
    timestamp: "2024-01-13T11:00:00",
    agentName: "Priya Sharma",
  },
  {
    id: "act3",
    leadId: "lead1",
    type: "property_share",
    description: "Shared property: Luxury 3BHK in DLF Phase 5",
    timestamp: "2024-01-13T11:05:00",
    agentName: "Priya Sharma",
  },
  {
    id: "act4",
    leadId: "lead1",
    type: "note",
    description: "Client prefers east-facing apartment. Budget flexible up to 1.2 Cr.",
    timestamp: "2024-01-13T11:15:00",
    agentName: "Priya Sharma",
  },
  {
    id: "act5",
    leadId: "lead1",
    type: "followup",
    description: "Follow-up scheduled for site visit confirmation.",
    timestamp: "2024-01-13T11:20:00",
    agentName: "Priya Sharma",
  },
  // Lead 2 activities
  {
    id: "act6",
    leadId: "lead2",
    type: "call",
    description: "Initial call. Client looking for premium villas with garden space.",
    timestamp: "2024-01-10T09:00:00",
    agentName: "Priya Sharma",
  },
  {
    id: "act7",
    leadId: "lead2",
    type: "whatsapp",
    description: "Shared villa listings in Whitefield area.",
    timestamp: "2024-01-10T09:30:00",
    agentName: "Priya Sharma",
  },
  {
    id: "act8",
    leadId: "lead2",
    type: "call",
    description: "Follow-up call. Discussed Prestige Lakeside Habitat villa. Client very interested.",
    timestamp: "2024-01-12T14:00:00",
    agentName: "Priya Sharma",
  },
  {
    id: "act9",
    leadId: "lead2",
    type: "property_share",
    description: "Shared property: Premium Villa in Whitefield",
    timestamp: "2024-01-12T14:30:00",
    agentName: "Priya Sharma",
  },
  {
    id: "act10",
    leadId: "lead2",
    type: "status_change",
    description: "Status changed from Interested to Site Visit Scheduled",
    timestamp: "2024-01-12T15:00:00",
    agentName: "Priya Sharma",
  },
  // Recent activities for dashboard
  {
    id: "act11",
    leadId: "lead3",
    type: "call",
    description: "Negotiation call with Vikram Malhotra for BKC office space.",
    timestamp: "2024-01-13T16:00:00",
    agentName: "Rahul Verma",
  },
  {
    id: "act12",
    leadId: "lead5",
    type: "note",
    description: "New lead assigned: Amit Sharma - 2BHK in Noida",
    timestamp: "2024-01-13T08:00:00",
    agentName: "Rahul Verma",
  },
  {
    id: "act13",
    leadId: "lead15",
    type: "call",
    description: "Site visit confirmed for Manish Tiwari - Koregaon Park.",
    timestamp: "2024-01-13T11:00:00",
    agentName: "Rahul Verma",
  },
  {
    id: "act14",
    leadId: "lead6",
    type: "whatsapp",
    description: "Sent rental options to Neha Gupta for Hinjewadi.",
    timestamp: "2024-01-13T12:00:00",
    agentName: "Priya Sharma",
  },
];

// Chart Data
export const leadsBySource = [
  { source: "MagicBricks", count: 6 },
  { source: "Facebook", count: 4 },
  { source: "Instagram", count: 4 },
  { source: "36 Acre", count: 3 },
  { source: "Website", count: 2 },
  { source: "Referral", count: 1 },
];

export const leadStatusBreakdown = [
  { status: "New", count: 4 },
  { status: "Contacted", count: 3 },
  { status: "Interested", count: 5 },
  { status: "Site Visit", count: 2 },
  { status: "Negotiation", count: 1 },
  { status: "Won", count: 3 },
  { status: "Lost", count: 1 },
  { status: "Not Responding", count: 1 },
];

export const callsPerDay = [
  { day: "Mon", calls: 2 },
  { day: "Tue", calls: 4 },
  { day: "Wed", calls: 3 },
  { day: "Thu", calls: 5 },
  { day: "Fri", calls: 4 },
  { day: "Sat", calls: 6 },
  { day: "Sun", calls: 5 },
];

export const agentPerformance = [
  { name: "Priya Sharma", leads: 12, calls: 4, won: 2, conversion: 17 },
  { name: "Rahul Verma", leads: 8, calls: 1, won: 1, conversion: 13 },
];

// Helper functions
export function getTeamMember(id: string): TeamMember | undefined {
  return teamMembers.find((m) => m.id === id);
}

export function getLead(id: string): Lead | undefined {
  return leads.find((l) => l.id === id);
}

export function getProperty(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

export function getActivitiesForLead(leadId: string): Activity[] {
  return activities.filter((a) => a.leadId === leadId).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export function getFollowupsForLead(leadId: string): Followup[] {
  return followups.filter((f) => f.leadId === leadId);
}

export function getRecommendedProperties(lead: Lead): Property[] {
  return properties.filter((p) => {
    const typeMatch = p.type === lead.propertyType || (lead.propertyType === "Rental" && p.isRental);
    const budgetMatch = p.price >= lead.budgetMin * 0.8 && p.price <= lead.budgetMax * 1.2;
    const available = p.status === "Available";
    return typeMatch && budgetMatch && available;
  }).slice(0, 3);
}
