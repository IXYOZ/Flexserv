// USERS
export const users = [
  { id: 1, name: "Steve", email:"steven@mail.m", phone:"0123", avatar: "/steve.png", bio: "Web dev and coffee lover", type: "user", rate: 5 },
  { id: 2, name: "John", email:"john@mail.m", phone:"1234", avatar: "/john", bio: "Massage therapist", type: "user", rate: 4.5 },
  { id: 3, name: "Alice", email:"alice@mail.m", phone:"2345", avatar: "/alice.png", bio: "Fasionista", type: "user", rate: 5 }
];

// POSTS (feed, could reference service/job/item)
export const posts = [
  { id: 1, authorId: 1, type: "job", title: "Looking for Designer", content: "Need a freelance designer for my project", refId: 1 },
  { id: 2, authorId: 2, type: "service", title: "New Service: Foot Massage", content: "Promotion discount 10% for new service", refId: 2 },
  { id: 3, authorId: 3, type: "item", title: "New trend winter cloth", content: "Promotion discount 20% code", refId: 1 }
];

// SHOPS/ (Owner owns shop)
export const listings = [
  { id: 1, authorId: 2, name: "Deep Massage", type: "service", description: "Deep massage fixed your pain" },
  { id: 2, authorId: 3, name: "Korea Trending Shop", type: "item", description: "All trend cloth import from Korea" },
  { id: 3, authorId: 1, name: "Steve's Job", type: "job", description: "Recruiter" },
];

// SERVICES (linked to shop)
export const services = [
  { id: 1, listingId: 1, name: "Full Body Relaxing Massage", price: 200, description: "Relaxing full body massage" },
  { id: 2, listingId: 1, name: "Foot Massage", price: 400, description: "Pain points therapy" },
];


// ITEMS (linked to shop)
export const items = [
  { id: 3, listingId: 2, name: "Winter fur cloth", price: 999, description: "Winter cloth from Korea" },
];

// JOBS (optional, can be extended)
export const jobs = [
  { id: 1, listingId: 3, title: "Looking for Designer", description: "Need freelance designer for website", salary: 500, location: "Remote" }
];

// REVIEWS (linked to user & shop/service)
export const reviews = [
  { id: 1, userId: 1, listingId: 1, rate: 5, comment: "Great massage", datetime: "2025-08-30" },
  { id: 2, userId: 2, listingId: 1, rate: 4, comment: "Super relax", datetime: "2025-08-30" },
  { id: 3, userId: 3, listingId: 2, rate: 5, comment: "Love this", datetime: "2025-08-30" },
];

// CART (temporary frontend data)
export const cart: { userId: number; itemId: number; quantity: number; datetime: string }[] = [];

// BOOKINGS (temporary frontend data)
export const bookings: { userId: number; serviceId: number; datetime: string; note?: string }[] = [];

// APPLICATIONS (job applications)
export const applications: { userId: number; jobId: number; resume: string; datetime: string }[] = [];
