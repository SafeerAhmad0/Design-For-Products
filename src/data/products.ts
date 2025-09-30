export interface ProductImage {
  id: number;
  name: string;
  category: string;
  images: string[];
  mainImage: string;
  description?: string;
  price?: string;
  rating?: number;
  reviews?: number;
  dimension?: string;
  material?: string;
  coordinates?: { x: number; y: number };
  size?: 'large' | 'medium' | 'small';
}

export const allProducts: ProductImage[] = [
  // BEDROOMS
  { id: 1, name: "Classic Bedroom Set", category: "bedrooms", images: ["/products/bedrooms/bedroom/b1.jpeg", "/products/bedrooms/bedroom/b2.jpg", "/products/bedrooms/bedroom/b3.jpeg", "/products/bedrooms/bedroom/b4.jpeg", "/products/bedrooms/bedroom/b5.jpeg"], mainImage: "/products/bedrooms/bedroom/b1.jpeg", description: "Complete bedroom furniture with storage drawers", price: "$1,299", rating: 4.8, reviews: 156 },
  { id: 2, name: "Modern Bedroom Suite", category: "bedrooms", images: ["/products/bedrooms/bedroom1/b1.jpeg", "/products/bedrooms/bedroom1/b2.jpeg"], mainImage: "/products/bedrooms/bedroom1/b1.jpeg", description: "Contemporary design with clean lines", price: "$899", rating: 4.7, reviews: 89 },
  { id: 3, name: "Luxury Platform Bed", category: "bedrooms", images: ["/products/bedrooms/bedroom10/b1.jpeg", "/products/bedrooms/bedroom10/b2.jpeg"], mainImage: "/products/bedrooms/bedroom10/b1.jpeg", description: "Premium platform bed with headboard", price: "$1,599", rating: 4.9, reviews: 234 },
  { id: 4, name: "Elegant Bedroom Collection", category: "bedrooms", images: ["/products/bedrooms/bedroom11/b1.jpg", "/products/bedrooms/bedroom11/b2.jpg"], mainImage: "/products/bedrooms/bedroom11/b1.jpg", description: "Sophisticated bedroom furniture set", price: "$1,450", rating: 4.8, reviews: 178 },
  { id: 5, name: "Contemporary Bed Frame", category: "bedrooms", images: ["/products/bedrooms/bedroom12/b1.jpeg", "/products/bedrooms/bedroom12/b2.jpeg"], mainImage: "/products/bedrooms/bedroom12/b1.jpeg", description: "Sleek modern bed design", price: "$749", rating: 4.6, reviews: 145 },
  { id: 6, name: "Premium Wood Bedroom", category: "bedrooms", images: ["/products/bedrooms/bedroom13/b1.JPG", "/products/bedrooms/bedroom13/b2.JPG"], mainImage: "/products/bedrooms/bedroom13/b1.JPG", description: "Handcrafted wooden bedroom set", price: "$1,899", rating: 4.9, reviews: 267 },
  { id: 7, name: "Minimalist Bed Design", category: "bedrooms", images: ["/products/bedrooms/bedroom14/b1.jpg", "/products/bedrooms/bedroom14/b2.jpg"], mainImage: "/products/bedrooms/bedroom14/b1.jpg", description: "Simple elegant bed frame", price: "$649", rating: 4.5, reviews: 98 },
  { id: 8, name: "Storage Bed with Drawers", category: "bedrooms", images: ["/products/bedrooms/bedroom15.jpg"], mainImage: "/products/bedrooms/bedroom15.jpg", description: "Space-saving bed with storage", price: "$1,199", rating: 4.8, reviews: 203 },
  { id: 9, name: "Classic Wooden Bed", category: "bedrooms", images: ["/products/bedrooms/bedroom16.JPG"], mainImage: "/products/bedrooms/bedroom16.JPG", description: "Traditional wooden craftsmanship", price: "$899", rating: 4.6, reviews: 134 },
  { id: 10, name: "Modern Platform Bed", category: "bedrooms", images: ["/products/bedrooms/bedroom17.jpeg"], mainImage: "/products/bedrooms/bedroom17.jpeg", description: "Low profile modern design", price: "$799", rating: 4.7, reviews: 167 },

  // KITCHENS
  { id: 23, name: "Modern Kitchen Set", category: "kitchens", images: ["/products/kitchens/kitchen/k1.jpeg", "/products/kitchens/kitchen/k2.jpeg", "/products/kitchens/kitchen/k3.jpeg"], mainImage: "/products/kitchens/kitchen/k1.jpeg", description: "Complete modern kitchen furniture", price: "$3,499", rating: 4.9, reviews: 289 },
  { id: 24, name: "Contemporary Kitchen", category: "kitchens", images: ["/products/kitchens/kitchen1/k1.jpeg", "/products/kitchens/kitchen1/k2.jpeg", "/products/kitchens/kitchen1/k3.jpeg"], mainImage: "/products/kitchens/kitchen1/k1.jpeg", description: "Sleek contemporary kitchen design", price: "$2,999", rating: 4.8, reviews: 234 },
  { id: 25, name: "Classic Kitchen Units", category: "kitchens", images: ["/products/kitchens/kitchen2/k1.jpeg", "/products/kitchens/kitchen2/k2.jpeg", "/products/kitchens/kitchen2/k3.jpeg"], mainImage: "/products/kitchens/kitchen2/k1.jpeg", description: "Traditional kitchen cabinets", price: "$2,799", rating: 4.7, reviews: 198 },
  { id: 26, name: "Luxury Kitchen Suite", category: "kitchens", images: ["/products/kitchens/kitchen3/k1.jpeg", "/products/kitchens/kitchen3/k2.jpeg", "/products/kitchens/kitchen3/k3.jpeg", "/products/kitchens/kitchen3/k4.jpeg"], mainImage: "/products/kitchens/kitchen3/k1.jpeg", description: "Premium kitchen with island", price: "$4,299", rating: 4.9, reviews: 312 },
  { id: 27, name: "Elegant Kitchen Design", category: "kitchens", images: ["/products/kitchens/kitchen4/k1.jpeg", "/products/kitchens/kitchen4/k2.jpeg", "/products/kitchens/kitchen4/k3.jpeg", "/products/kitchens/kitchen4/k4.jpeg", "/products/kitchens/kitchen4/k5.jpeg"], mainImage: "/products/kitchens/kitchen4/k1.jpeg", description: "Sophisticated kitchen layout", price: "$3,899", rating: 4.8, reviews: 276 },

  // SOFAS
  { id: 37, name: "Arabic Style Sofa Set", category: "sofas", images: ["/products/sofas/arabic/a1.jpg", "/products/sofas/arabic/a2.jpg"], mainImage: "/products/sofas/arabic/a1.jpg", description: "Traditional Arabic majlis seating", price: "$2,199", rating: 4.9, reviews: 189 },
  { id: 38, name: "L-Shape Sofa Bed", category: "sofas", images: ["/products/sofas/bed2lshap/s1.jpeg", "/products/sofas/bed2lshap/s2.jpeg", "/products/sofas/bed2lshap/s3.jpeg", "/products/sofas/bed2lshap/s4.jpeg"], mainImage: "/products/sofas/bed2lshap/s1.jpeg", description: "Convertible L-shape sofa", price: "$1,799", rating: 4.8, reviews: 245 },
  { id: 39, name: "L-Shape Lounger", category: "sofas", images: ["/products/sofas/bedlshap/s1.jpeg", "/products/sofas/bedlshap/s2.jpeg"], mainImage: "/products/sofas/bedlshap/s1.jpeg", description: "Spacious L-shaped seating", price: "$1,599", rating: 4.7, reviews: 167 },
  { id: 40, name: "Boho Chic Sofa", category: "sofas", images: ["/products/sofas/boho/b1.jpeg", "/products/sofas/boho/b2.jpeg"], mainImage: "/products/sofas/boho/b1.jpeg", description: "Bohemian style comfortable sofa", price: "$1,299", rating: 4.6, reviews: 134 },
  { id: 41, name: "Islamic Pattern Sofa", category: "sofas", images: ["/products/sofas/islamic/i1.png", "/products/sofas/islamic/i2.png", "/products/sofas/islamic/i3.png", "/products/sofas/islamic/i4.png", "/products/sofas/islamic/i5.png"], mainImage: "/products/sofas/islamic/i1.png", description: "Traditional Islamic design sofa", price: "$2,499", rating: 4.9, reviews: 298 },
  { id: 42, name: "Modern Sectional Sofa", category: "sofas", images: ["/products/sofas/modern/m1.jpeg", "/products/sofas/modern/m2.jpeg", "/products/sofas/modern/m3.jpeg", "/products/sofas/modern/m4.jpeg"], mainImage: "/products/sofas/modern/m1.jpeg", description: "Contemporary sectional design", price: "$1,899", rating: 4.8, reviews: 223 },
  { id: 43, name: "Panda Sofa Collection", category: "sofas", images: ["/products/sofas/pandasofaset/p1.jpeg", "/products/sofas/pandasofaset/p2.jpeg", "/products/sofas/pandasofaset/p3.jpeg", "/products/sofas/pandasofaset/p4.jpeg"], mainImage: "/products/sofas/pandasofaset/p1.jpeg", description: "Plush comfortable sofa set", price: "$2,099", rating: 4.7, reviews: 189 },

  // TABLES
  { id: 55, name: "Beech Pine Dining Set", category: "tables", images: ["/products/tables/beechpine/bp1.jpg", "/products/tables/beechpine/bp2.jpg"], mainImage: "/products/tables/beechpine/bp1.jpg", description: "Natural wood dining table with bench", price: "$1,499", rating: 4.8, reviews: 178 },
  { id: 56, name: "Bohemian Dining Table", category: "tables", images: ["/products/tables/bohemin/b1.jpeg", "/products/tables/bohemin/b2.jpeg"], mainImage: "/products/tables/bohemin/b1.jpeg", description: "Rustic bohemian style table", price: "$899", rating: 4.6, reviews: 134 },
  { id: 57, name: "Forest Collection Table", category: "tables", images: ["/products/tables/forest/f1.JPG", "/products/tables/forest/f2.JPG", "/products/tables/forest/f3.JPG"], mainImage: "/products/tables/forest/f1.JPG", description: "Natural wood grain dining set", price: "$1,699", rating: 4.9, reviews: 245 },
  { id: 58, name: "Helal Dining Set", category: "tables", images: ["/products/tables/helal/h1.jpeg", "/products/tables/helal/h2.jpg"], mainImage: "/products/tables/helal/h1.jpeg", description: "Contemporary dining table", price: "$1,299", rating: 4.7, reviews: 167 },
  { id: 59, name: "Modern Dining Table", category: "tables", images: ["/products/tables/modern/m1.jpeg"], mainImage: "/products/tables/modern/m1.jpeg", description: "Sleek modern dining furniture", price: "$999", rating: 4.5, reviews: 123 },

  // STORAGE
  { id: 45, name: "Aro Wardrobe", category: "storage", images: ["/products/storage/aro/a1.jpeg", "/products/storage/aro/a2.jpeg"], mainImage: "/products/storage/aro/a1.jpeg", description: "Spacious wardrobe with shelves", price: "$1,299", rating: 4.7, reviews: 156 },
  { id: 46, name: "Arog Storage Unit", category: "storage", images: ["/products/storage/arog/a1.jpeg", "/products/storage/arog/a2.jpeg"], mainImage: "/products/storage/arog/a1.jpeg", description: "Modern storage solution", price: "$899", rating: 4.6, reviews: 123 },
  { id: 50, name: "Rustic Storage Cabinet", category: "storage", images: ["/products/storage/rustic/r1.png", "/products/storage/rustic/r2.png"], mainImage: "/products/storage/rustic/r1.png", description: "Vintage style storage", price: "$799", rating: 4.5, reviews: 98 },
  { id: 51, name: "Smooth Finish Wardrobe", category: "storage", images: ["/products/storage/smooth/sd1.jpeg", "/products/storage/smooth/sd2.png", "/products/storage/smooth/sd3.JPG", "/products/storage/smooth/sd4.JPG"], mainImage: "/products/storage/smooth/sd1.jpeg", description: "Contemporary wardrobe design", price: "$1,499", rating: 4.8, reviews: 189 },
  { id: 52, name: "Steel Frame Storage", category: "storage", images: ["/products/storage/steel/steel.jpeg"], mainImage: "/products/storage/steel/steel.jpeg", description: "Industrial steel storage unit", price: "$699", rating: 4.4, reviews: 87 },
  { id: 53, name: "Steel & Wood Cabinet", category: "storage", images: ["/products/storage/steelwithwood/sw1.jpeg", "/products/storage/steelwithwood/sw2.jpg"], mainImage: "/products/storage/steelwithwood/sw1.jpeg", description: "Mixed material storage", price: "$1,099", rating: 4.7, reviews: 134 },

  // PALLETS & PERGOLA
  { id: 31, name: "Wooden Pallet Furniture", category: "pallets", images: ["/products/pallets/pallet/p1.jpg", "/products/pallets/pallet/p2.jpg", "/products/pallets/pallet/p3.jpg"], mainImage: "/products/pallets/pallet/p1.jpg", description: "Handcrafted pallet furniture", price: "$599", rating: 4.6, reviews: 112 },
  { id: 36, name: "Garden Pergola", category: "pergola", images: ["/products/pergola/pergolav1/p1.jpeg", "/products/pergola/pergolav1/p2.jpeg", "/products/pergola/pergolav1/p3.jpeg"], mainImage: "/products/pergola/pergolav1/p1.jpeg", description: "Outdoor wooden pergola structure", price: "$2,999", rating: 4.8, reviews: 156 },
];

// Featured products (best sellers / most reviewed)
export const featuredProducts = allProducts
  .sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
  .slice(0, 6);

// Get products by category
export const getProductsByCategory = (category: string) => {
  if (category === 'all') return allProducts;
  return allProducts.filter(p => p.category === category);
};

// Get all categories
export const categories = [...new Set(allProducts.map(p => p.category))];