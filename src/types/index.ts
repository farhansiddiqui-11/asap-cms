export interface Product {
  id: string;
  slug: string;
  partNumber: string;
  name: string;
  description: string;
  category: string;
  subCategory: string;
  manufacturer: string;
  manufacturerSlug: string;
  nsn?: string;
  cage?: string;
  unitOfMeasure: string;
  condition: "new" | "used" | "refurbished" | "overhauled";
  availability: "in-stock" | "out-of-stock" | "lead-time";
  leadTime?: string;
  quantity: number;
  image: string;
  specs: Record<string, string>;
  certifications: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Manufacturer {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  logo: string;
  coverImage: string;
  website?: string;
  founded?: string;
  headquarters?: string;
  industries: string[];
  productCount: number;
  certifications: string[];
  featured: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  productCount: number;
}

export interface ApiResponse<T> {
  data: T;
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
