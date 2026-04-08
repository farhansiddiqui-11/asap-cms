// ---------------------------------------------------------------------------
// CMS Verticals API Client
// ---------------------------------------------------------------------------
// All fetches are designed to run client-side (browser). The CMS has CORS
// configured — no proxy or API routes required. No auth headers needed.
// ---------------------------------------------------------------------------

import type {
  CmsApiResponse,
  CmsCategory,
  CmsCategoryListParams,
  CmsCategoryManufacturersParams,
  CmsCategoryPartsParams,
  CmsEntityType,
  CmsHierarchy,
  CmsListParams,
  CmsManufacturer,
  CmsManufacturerCategoriesParams,
  CmsManufacturerGroup,
  CmsManufacturerListParams,
  CmsManufacturerPartTypesParams,
  CmsManufacturerPartsParams,
  CmsManufacturersGroupedParams,
  CmsPart,
  CmsPartDetailParams,
  CmsPartType,
  CmsPartsListParams,
  CmsSearchParams,
  CmsSearchResults,
  CmsSubcategoryParams,
  CmsVerticalMeta,
} from "@/types/cms";

// ---------------------------------------------------------------------------
// Configuration helpers
// ---------------------------------------------------------------------------

function getCmsUrl(): string {
  const url = process.env.NEXT_PUBLIC_CMS_URL;
  if (!url) throw new Error("NEXT_PUBLIC_CMS_URL is not set");
  return url.replace(/\/+$/, ""); // strip trailing slash
}

function getSiteId(): string {
  const id = process.env.NEXT_PUBLIC_SITE_ID;
  if (!id) throw new Error("NEXT_PUBLIC_SITE_ID is not set");
  return id;
}

function getVerticalId(): string {
  const id = process.env.NEXT_PUBLIC_VERTICAL_ID;
  if (!id) throw new Error("NEXT_PUBLIC_VERTICAL_ID is not set");
  return id;
}

function getApiKey(): string {
  return process.env.NEXT_PUBLIC_CMS_API_KEY ?? "";
}

/** Base path for all vertical endpoints. */
function basePath(): string {
  return `${getCmsUrl()}/api/sites/${getSiteId()}/verticals`;
}

/** Common headers for all CMS requests. */
function cmsHeaders(): HeadersInit {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  const key = getApiKey();
  if (key) {
    headers["x-internal-key"] = key;
  }
  return headers;
}

// ---------------------------------------------------------------------------
// Internal fetch helper
// ---------------------------------------------------------------------------

export class CmsApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "CmsApiError";
  }
}

/**
 * Build a query string from a params object. Undefined/null values are
 * omitted. `verticalId` is injected automatically when not provided.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildQuery(params: Record<string, any> = {}): string {
  const merged: Record<string, unknown> = {
    verticalId: getVerticalId(),
    ...params,
  };

  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(merged)) {
    if (value !== undefined && value !== null && value !== "") {
      qs.set(key, String(value));
    }
  }
  const str = qs.toString();
  return str ? `?${str}` : "";
}

/**
 * Core fetch wrapper. Returns the parsed `CmsApiResponse<T>`.
 * Throws `CmsApiError` on non-success responses.
 */
async function cmsGet<T>(
  path: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>,
): Promise<CmsApiResponse<T>> {
  const url = `${basePath()}${path}${buildQuery(params)}`;

  const res = await fetch(url, { headers: cmsHeaders() });
  const json = await res.json();

  if (!res.ok || json.success === false) {
    throw new CmsApiError(
      json.statusCode ?? res.status,
      json.message ?? `CMS request failed: ${res.status}`,
    );
  }

  return json as CmsApiResponse<T>;
}

/**
 * Fetch wrapper for the unified `/data` endpoint which lives one level up.
 */
async function cmsGetData<T>(
  entity: CmsEntityType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>,
): Promise<CmsApiResponse<T>> {
  const url =
    `${getCmsUrl()}/api/sites/${getSiteId()}/data` +
    buildQuery({ entity, ...params });

  const res = await fetch(url, { headers: cmsHeaders() });
  const json = await res.json();

  if (!res.ok || json.success === false) {
    throw new CmsApiError(
      json.statusCode ?? res.status,
      json.message ?? `CMS data request failed: ${res.status}`,
    );
  }

  return json as CmsApiResponse<T>;
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

/** Paginated root categories. */
export async function getCategories(params?: CmsCategoryListParams) {
  return cmsGet<CmsCategory[]>("/categories", params);
}

/** Single category detail by slug. */
export async function getCategoryBySlug(slug: string) {
  return cmsGet<CmsCategory>(`/categories/${encodeURIComponent(slug)}`);
}

/** Child categories of a parent category. */
export async function getSubcategories(params: CmsSubcategoryParams) {
  return cmsGet<CmsCategory[]>("/categories/subcategories", params);
}

/** Manufacturers within a category. */
export async function getCategoryManufacturers(
  params: CmsCategoryManufacturersParams,
) {
  return cmsGet<CmsManufacturer[]>("/categories/manufacturers", params);
}

/** Parts within a category (includes extractedManufacturers, extractedCategories). */
export async function getCategoryParts(params: CmsCategoryPartsParams) {
  return cmsGet<unknown>("/categories/parts", params);
}

// ---------------------------------------------------------------------------
// Manufacturers
// ---------------------------------------------------------------------------

/** Paginated manufacturers list. */
export async function getManufacturers(params?: CmsManufacturerListParams) {
  return cmsGet<CmsManufacturer[]>("/manufacturers", params);
}

/** Manufacturers grouped A-Z with counts. */
export async function getManufacturersGrouped(
  params?: CmsManufacturersGroupedParams,
) {
  return cmsGet<CmsManufacturerGroup[]>("/manufacturers/grouped", params);
}

/** Single manufacturer detail by slug. */
export async function getManufacturerBySlug(slug: string) {
  return cmsGet<CmsManufacturer>(`/manufacturers/${encodeURIComponent(slug)}`);
}

/** Parts by manufacturer. */
export async function getManufacturerParts(
  params: CmsManufacturerPartsParams,
) {
  return cmsGet<CmsPart[]>("/manufacturers/parts", params);
}

/** Categories for a manufacturer. */
export async function getManufacturerCategories(
  params: CmsManufacturerCategoriesParams,
) {
  return cmsGet<CmsCategory[]>("/manufacturers/categories", params);
}

/** Part types for a manufacturer. */
export async function getManufacturerPartTypes(
  params: CmsManufacturerPartTypesParams,
) {
  return cmsGet<CmsPartType[]>("/manufacturers/part-types", params);
}

// ---------------------------------------------------------------------------
// Parts
// ---------------------------------------------------------------------------

/** Filtered parts list (includes extractedManufacturers, extractedCategories). */
export async function getParts(params?: CmsPartsListParams) {
  return cmsGet<CmsPart[]>("/parts", params);
}

/** Part detail by slug. */
export async function getPartBySlug(
  slug: string,
  params?: CmsPartDetailParams,
) {
  return cmsGet<CmsPart>(`/parts/${encodeURIComponent(slug)}`, params);
}

// ---------------------------------------------------------------------------
// Part Types
// ---------------------------------------------------------------------------

/** Paginated part types. */
export async function getPartTypes(params?: CmsListParams) {
  return cmsGet<CmsPartType[]>("/part-types", params);
}

/** Part type detail by ID. */
export async function getPartTypeById(id: string) {
  return cmsGet<CmsPartType>(`/part-types/${encodeURIComponent(id)}`);
}

/** Parts under a part type. */
export async function getPartTypeParts(id: string, params?: CmsListParams) {
  return cmsGet<CmsPart[]>(`/part-types/${encodeURIComponent(id)}/parts`, params);
}

/** Manufacturers for a part type. */
export async function getPartTypeManufacturers(
  id: string,
  params?: CmsListParams,
) {
  return cmsGet<CmsManufacturer[]>(
    `/part-types/${encodeURIComponent(id)}/manufacturers`,
    params,
  );
}

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

/** Global or vertical search (q must be >= 3 chars). */
export async function search(params: CmsSearchParams) {
  return cmsGet<CmsSearchResults>("/search", params);
}

// ---------------------------------------------------------------------------
// Hierarchy & Meta
// ---------------------------------------------------------------------------

/** Full category/manufacturer/parttype tree with pageDepth. */
export async function getHierarchy() {
  return cmsGet<CmsHierarchy>("/hierarchy");
}

/** Vertical metadata (name, description, capabilities). */
export async function getVerticalMeta() {
  return cmsGet<CmsVerticalMeta>("/meta");
}

// ---------------------------------------------------------------------------
// Unified Data Endpoint
// ---------------------------------------------------------------------------

/**
 * Generic data endpoint — pass any supported entity type and extra params.
 *
 * ```ts
 * const res = await getUnifiedData<SomeType>("related-parts", { partId: "123" });
 * ```
 */
export async function getUnifiedData<T = unknown>(
  entity: CmsEntityType,
  params?: Record<string, unknown>,
) {
  return cmsGetData<T>(entity, params);
}
