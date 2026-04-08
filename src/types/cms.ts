// ---------------------------------------------------------------------------
// CMS Verticals API — Type Definitions
// ---------------------------------------------------------------------------

/** Standard paginated response wrapper from the CMS. */
export interface CmsApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: CmsPagination;
  statusCode: number;
}

export interface CmsPagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  nextCursor: string | null;
}

/** Error shape returned by the CMS on 4xx/5xx. */
export interface CmsErrorResponse {
  success: false;
  message: string;
  statusCode: number;
}

// ---------------------------------------------------------------------------
// Common query parameters shared by all list endpoints
// ---------------------------------------------------------------------------
export interface CmsListParams {
  verticalId?: string;
  page?: number;
  limit?: number;
  cursor?: string;
  skipCount?: boolean;
  q?: string;
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
export interface CmsCategoryListParams extends CmsListParams {
  q?: string;
}

export interface CmsSubcategoryParams extends CmsListParams {
  categoryId: string;
}

export interface CmsCategoryManufacturersParams extends CmsListParams {
  categoryId: string;
  q?: string;
}

export interface CmsCategoryPartsParams extends CmsListParams {
  categoryId: string;
}

export interface CmsCategory {
  id: string;
  slug: string;
  name: string;
  description?: string;
  descriptionContext?: string;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Manufacturers
// ---------------------------------------------------------------------------
export interface CmsManufacturerListParams extends CmsListParams {
  q?: string;
  letter?: string; // A-Z, #, _
}

export interface CmsManufacturersGroupedParams {
  verticalId?: string;
  previewLimit?: number;
}

export interface CmsManufacturerPartsParams extends CmsListParams {
  manufacturerId: string;
}

export interface CmsManufacturerCategoriesParams extends CmsListParams {
  manufacturerId: string;
  catType?: string;
  q?: string;
}

export interface CmsManufacturerPartTypesParams extends CmsListParams {
  manufacturerId: string;
  q?: string;
}

export interface CmsManufacturer {
  id: string;
  slug: string;
  name: string;
  description?: string;
  descriptionContext?: string;
  partsCount?: number;
  [key: string]: unknown;
}

export interface CmsManufacturerGroup {
  letter: string;
  count: number;
  manufacturers: CmsManufacturer[];
}

// ---------------------------------------------------------------------------
// Parts
// ---------------------------------------------------------------------------
export interface CmsPartsListParams extends CmsListParams {
  category?: string;
  manufacturer?: string;
  partType?: string;
  q?: string;
}

export interface CmsPartDetailParams {
  category?: string;
  subcategory?: string;
  manufacturer?: string;
  partType?: string;
}

export interface CmsPart {
  id: string;
  slug: string;
  name?: string;
  partNumber?: string;
  description?: string;
  descriptionContext?: string;
  [key: string]: unknown;
}

export interface CmsPartsResponse {
  parts: CmsPart[];
  extractedManufacturers?: CmsManufacturer[];
  extractedCategories?: CmsCategory[];
}

// ---------------------------------------------------------------------------
// Part Types
// ---------------------------------------------------------------------------
export interface CmsPartType {
  id: string;
  name: string;
  description?: string;
  descriptionContext?: string;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------
export type CmsSearchType = "manufacturer" | "part_type" | "part_number";
export type CmsSearchScope = "global" | "vertical";

export interface CmsSearchParams {
  verticalId?: string;
  q: string;
  type?: CmsSearchType;
  scope?: CmsSearchScope;
}

export interface CmsSearchResults {
  manufacturers?: CmsManufacturer[];
  parts?: CmsPart[];
  partTypes?: CmsPartType[];
}

// ---------------------------------------------------------------------------
// Hierarchy & Meta
// ---------------------------------------------------------------------------
export interface CmsHierarchy {
  categories?: unknown[];
  manufacturers?: unknown[];
  partTypes?: unknown[];
  pageDepth?: number;
  [key: string]: unknown;
}

export interface CmsVerticalMeta {
  name: string;
  description?: string;
  capabilities?: string[];
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Unified Data Endpoint
// ---------------------------------------------------------------------------
export type CmsEntityType =
  | "categories"
  | "manufacturers"
  | "parts"
  | "subcategories-by-category"
  | "manufacturers-by-category"
  | "parts-by-category"
  | "manufacturer-parts"
  | "manufacturer-categories"
  | "manufacturer-subcategories"
  | "category-page"
  | "related-parts"
  | "alternate-manufacturers";

export interface CmsUnifiedDataParams extends CmsListParams {
  entity: CmsEntityType;
  [key: string]: unknown;
}
