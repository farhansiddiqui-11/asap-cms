// ---------------------------------------------------------------------------
// Smart Listing — Type Definitions
// ---------------------------------------------------------------------------

// --- Pagination ---

export interface PaginationState {
  page: number;
  totalItems: number;
  totalPages: number;
  limit: number;
  nextCursor?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: PaginationState;
}

export function emptyPaginated<T>(limit = 20): PaginatedResponse<T> {
  return {
    success: false,
    data: [],
    pagination: { page: 1, totalItems: 0, totalPages: 0, limit },
  };
}

// --- Entity items ---

export interface SubcategoryItem {
  id: string | number;
  name: string;
  slug: string;
  partsCount?: number;
}

export interface ManufacturerItem {
  id: string | number;
  name: string;
  slug: string;
  partsCount?: number;
}

export interface PartItem {
  id: string | number;
  partNumber: string;
  name?: string;
  slug: string;
  description?: string;
  manufacturer?: { name: string; slug: string };
  category?: { name: string; slug: string };
  subCategory?: { name: string; slug: string };
  [key: string]: unknown;
}

export interface PartTypeItem {
  id: string | number;
  name: string;
  slug: string;
}

// --- Entity metadata ---

export interface EntityMeta {
  id: string | number;
  numericId?: number;
  name: string;
  slug: string;
  description?: string;
  descriptionContext?: Record<string, string>;
  [key: string]: unknown;
}

// --- Node type ---

export type NodeType = "vertical" | "category" | "manufacturer" | "part-type";

// --- Sections ---

export type SectionKey = "subcategories" | "manufacturers" | "parts" | "partTypes";

// --- A-Z grouped manufacturers ---

export interface LetterSection {
  letter: string;
  items: { name: string; slug: string }[];
  total: number;
}

export interface TabGroup {
  label: string;
  letterSections: LetterSection[];
  total: number;
}

export interface ManufacturersGroupedResponse {
  tabGroups: TabGroup[];
  total: number;
}

// --- Sort ---

export type SortField = "partNumber" | "name" | "manufacturer";
export type SortDirection = "asc" | "desc";

export interface SortState {
  field: SortField;
  direction: SortDirection;
}

// --- Filter ---

export interface FilterState {
  manufacturers: string[];
  categories: string[];
}

// --- Cart ---

export interface CartItem {
  partId: string;
  partNumber: string;
  name?: string;
  manufacturer?: string;
  quantity: number;
}

// --- Smart Listing Props ---

export interface SmartListingServerProps {
  siteId: string;
  apiBaseUrl: string;
  slug: string;
  nodeType: NodeType;
  variant?: string;
  searchParams?: Record<string, string | string[] | undefined>;
  pageSize?: number;
  showSubcategories?: boolean;
  showManufacturers?: boolean;
  showParts?: boolean;
  showPartTypes?: boolean;
  apiKey?: string;
  verticalId?: string;
}

export interface SectionData<T> {
  data: T[];
  pagination: PaginationState;
  success: boolean;
}

export interface SmartListingData {
  meta: EntityMeta;
  nodeType: NodeType;
  slug: string;
  verticalId?: string;
  subcategories: SectionData<SubcategoryItem>;
  manufacturers: SectionData<ManufacturerItem>;
  parts: SectionData<PartItem>;
  partTypes: SectionData<PartTypeItem>;
}

export interface LayoutVariantProps {
  data: SmartListingData;
  siteId: string;
  apiBaseUrl: string;
  pageSize: number;
  variant: string;
  apiKey?: string;
}

// --- Pagination hook ---

export interface UseSmartPaginationConfig<T> {
  initialData: T[];
  initialPagination: PaginationState;
  fetchPage: (page: number, cursor?: string) => Promise<PaginatedResponse<T>>;
  pageParamKey: string;
}

export interface UseSmartPaginationResult<T> {
  data: T[];
  pagination: PaginationState;
  loading: boolean;
  handlePageChange: (page: number) => void;
}
