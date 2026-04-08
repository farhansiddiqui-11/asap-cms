// ---------------------------------------------------------------------------
// Smart Listing — Dual-Mode API Layer
// ---------------------------------------------------------------------------
// Server-side: direct URL + x-internal-key header
// Client-side: proxy through /api/verticals?path=...
// ---------------------------------------------------------------------------

import type {
  PaginatedResponse,
  SubcategoryItem,
  ManufacturerItem,
  PartItem,
  PartTypeItem,
  EntityMeta,
  ManufacturersGroupedResponse,
} from "./types";
import { emptyPaginated } from "./types";
import {
  normalizeMeta,
  normalizeSubcategories,
  normalizeManufacturers,
  normalizeParts,
  normalizePartTypes,
  normalizeManufacturersGrouped,
} from "./normalizers";

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

interface FetchOpts {
  apiBase: string;
  siteId: string;
  path: string;
  params?: Record<string, string | number | undefined>;
  apiKey?: string;
  signal?: AbortSignal;
}

function buildUrl(opts: FetchOpts): string {
  const qs = new URLSearchParams();
  if (opts.params) {
    for (const [k, v] of Object.entries(opts.params)) {
      if (v !== undefined && v !== null && v !== "") qs.set(k, String(v));
    }
  }

  if (opts.apiKey) {
    // Server-side: direct URL
    const query = qs.toString();
    return `${opts.apiBase}/api/sites/${opts.siteId}/verticals${opts.path}${query ? `?${query}` : ""}`;
  }

  // Client-side: proxy via /api/verticals
  qs.set("path", opts.path);
  return `/api/verticals?${qs.toString()}`;
}

async function fetchJson(opts: FetchOpts): Promise<Record<string, unknown>> {
  const url = buildUrl(opts);
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (opts.apiKey) {
    headers["x-internal-key"] = opts.apiKey;
  }

  const res = await fetch(url, { headers, signal: opts.signal });
  if (!res.ok) {
    throw new Error(`API ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<Record<string, unknown>>;
}

// Shared param helper
function paginationParams(
  page: number,
  limit: number,
  verticalId?: string,
  cursor?: string,
): Record<string, string | number | undefined> {
  return {
    page,
    limit,
    verticalId,
    cursor: cursor || undefined,
  };
}

// ---------------------------------------------------------------------------
// Entity metadata fetchers
// ---------------------------------------------------------------------------

export async function fetchVerticalMeta(
  apiBase: string,
  siteId: string,
  slug: string,
  verticalId?: string,
  apiKey?: string,
): Promise<EntityMeta | null> {
  try {
    const raw = await fetchJson({
      apiBase,
      siteId,
      path: "/meta",
      params: { verticalId: verticalId ?? slug },
      apiKey,
    });
    return normalizeMeta(raw) ?? { id: slug, name: slug, slug, ...((raw.data ?? {}) as Record<string, unknown>) };
  } catch {
    return null;
  }
}

export async function fetchCategoryMeta(
  apiBase: string,
  siteId: string,
  slug: string,
  verticalId?: string,
  apiKey?: string,
): Promise<EntityMeta | null> {
  try {
    const raw = await fetchJson({
      apiBase,
      siteId,
      path: `/categories/${encodeURIComponent(slug)}`,
      params: { verticalId },
      apiKey,
    });
    return normalizeMeta(raw);
  } catch {
    return null;
  }
}

export async function fetchManufacturerMeta(
  apiBase: string,
  siteId: string,
  slug: string,
  verticalId?: string,
  apiKey?: string,
): Promise<EntityMeta | null> {
  try {
    const raw = await fetchJson({
      apiBase,
      siteId,
      path: `/manufacturers/${encodeURIComponent(slug)}`,
      params: { verticalId },
      apiKey,
    });
    return normalizeMeta(raw);
  } catch {
    return null;
  }
}

export async function fetchPartTypeMeta(
  apiBase: string,
  siteId: string,
  slug: string,
  verticalId?: string,
  apiKey?: string,
): Promise<EntityMeta | null> {
  try {
    const raw = await fetchJson({
      apiBase,
      siteId,
      path: `/part-types/${encodeURIComponent(slug)}`,
      params: { verticalId },
      apiKey,
    });
    return normalizeMeta(raw);
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Section fetchers — Subcategories
// ---------------------------------------------------------------------------

export async function fetchVerticalCategories(
  apiBase: string,
  siteId: string,
  _slugOrId: string,
  page: number,
  limit: number,
  verticalId?: string,
  apiKey?: string,
  cursor?: string,
  signal?: AbortSignal,
): Promise<PaginatedResponse<SubcategoryItem>> {
  try {
    const raw = await fetchJson({
      apiBase,
      siteId,
      path: "/categories",
      params: { ...paginationParams(page, limit, verticalId, cursor) },
      apiKey,
      signal,
    });
    return normalizeSubcategories(raw);
  } catch {
    return emptyPaginated(limit);
  }
}

export async function fetchCategorySubcategories(
  apiBase: string,
  siteId: string,
  slugOrId: string,
  page: number,
  limit: number,
  verticalId?: string,
  apiKey?: string,
  cursor?: string,
  signal?: AbortSignal,
): Promise<PaginatedResponse<SubcategoryItem>> {
  try {
    const raw = await fetchJson({
      apiBase,
      siteId,
      path: "/categories/subcategories",
      params: { categoryId: slugOrId, ...paginationParams(page, limit, verticalId, cursor) },
      apiKey,
      signal,
    });
    return normalizeSubcategories(raw);
  } catch {
    return emptyPaginated(limit);
  }
}

export async function fetchManufacturerCategories(
  apiBase: string,
  siteId: string,
  slugOrId: string,
  page: number,
  limit: number,
  verticalId?: string,
  apiKey?: string,
  cursor?: string,
  signal?: AbortSignal,
): Promise<PaginatedResponse<SubcategoryItem>> {
  try {
    const raw = await fetchJson({
      apiBase,
      siteId,
      path: "/manufacturers/categories",
      params: { manufacturerId: slugOrId, ...paginationParams(page, limit, verticalId, cursor) },
      apiKey,
      signal,
    });
    return normalizeSubcategories(raw);
  } catch {
    return emptyPaginated(limit);
  }
}

// ---------------------------------------------------------------------------
// Section fetchers — Manufacturers
// ---------------------------------------------------------------------------

export async function fetchVerticalManufacturers(
  apiBase: string,
  siteId: string,
  _slugOrId: string,
  page: number,
  limit: number,
  verticalId?: string,
  apiKey?: string,
  cursor?: string,
  signal?: AbortSignal,
): Promise<PaginatedResponse<ManufacturerItem>> {
  try {
    const raw = await fetchJson({
      apiBase,
      siteId,
      path: "/manufacturers",
      params: { ...paginationParams(page, limit, verticalId, cursor) },
      apiKey,
      signal,
    });
    return normalizeManufacturers(raw);
  } catch {
    return emptyPaginated(limit);
  }
}

export async function fetchCategoryManufacturers(
  apiBase: string,
  siteId: string,
  slugOrId: string,
  page: number,
  limit: number,
  verticalId?: string,
  apiKey?: string,
  cursor?: string,
  signal?: AbortSignal,
): Promise<PaginatedResponse<ManufacturerItem>> {
  try {
    const raw = await fetchJson({
      apiBase,
      siteId,
      path: "/categories/manufacturers",
      params: { categoryId: slugOrId, ...paginationParams(page, limit, verticalId, cursor) },
      apiKey,
      signal,
    });
    return normalizeManufacturers(raw);
  } catch {
    return emptyPaginated(limit);
  }
}

export async function fetchPartTypeManufacturers(
  apiBase: string,
  siteId: string,
  slugOrId: string,
  page: number,
  limit: number,
  verticalId?: string,
  apiKey?: string,
  cursor?: string,
  signal?: AbortSignal,
): Promise<PaginatedResponse<ManufacturerItem>> {
  try {
    const raw = await fetchJson({
      apiBase,
      siteId,
      path: `/part-types/${encodeURIComponent(slugOrId)}/manufacturers`,
      params: { ...paginationParams(page, limit, verticalId, cursor) },
      apiKey,
      signal,
    });
    return normalizeManufacturers(raw);
  } catch {
    return emptyPaginated(limit);
  }
}

// ---------------------------------------------------------------------------
// Section fetchers — Parts
// ---------------------------------------------------------------------------

export async function fetchCategoryParts(
  apiBase: string,
  siteId: string,
  slugOrId: string,
  page: number,
  limit: number,
  verticalId?: string,
  apiKey?: string,
  cursor?: string,
  signal?: AbortSignal,
): Promise<PaginatedResponse<PartItem>> {
  try {
    const raw = await fetchJson({
      apiBase,
      siteId,
      path: "/categories/parts",
      params: { categoryId: slugOrId, ...paginationParams(page, limit, verticalId, cursor) },
      apiKey,
      signal,
    });
    return normalizeParts(raw);
  } catch {
    return emptyPaginated(limit);
  }
}

export async function fetchManufacturerParts(
  apiBase: string,
  siteId: string,
  slugOrId: string,
  page: number,
  limit: number,
  verticalId?: string,
  apiKey?: string,
  cursor?: string,
  signal?: AbortSignal,
): Promise<PaginatedResponse<PartItem>> {
  try {
    const raw = await fetchJson({
      apiBase,
      siteId,
      path: "/manufacturers/parts",
      params: { manufacturerId: slugOrId, ...paginationParams(page, limit, verticalId, cursor) },
      apiKey,
      signal,
    });
    return normalizeParts(raw);
  } catch {
    return emptyPaginated(limit);
  }
}

export async function fetchPartTypeParts(
  apiBase: string,
  siteId: string,
  slugOrId: string,
  page: number,
  limit: number,
  verticalId?: string,
  apiKey?: string,
  cursor?: string,
  signal?: AbortSignal,
): Promise<PaginatedResponse<PartItem>> {
  try {
    const raw = await fetchJson({
      apiBase,
      siteId,
      path: `/part-types/${encodeURIComponent(slugOrId)}/parts`,
      params: { ...paginationParams(page, limit, verticalId, cursor) },
      apiKey,
      signal,
    });
    return normalizeParts(raw);
  } catch {
    return emptyPaginated(limit);
  }
}

// ---------------------------------------------------------------------------
// Section fetchers — Part Types
// ---------------------------------------------------------------------------

export async function fetchVerticalPartTypes(
  apiBase: string,
  siteId: string,
  _slugOrId: string,
  page: number,
  limit: number,
  verticalId?: string,
  apiKey?: string,
  cursor?: string,
  signal?: AbortSignal,
): Promise<PaginatedResponse<PartTypeItem>> {
  try {
    const raw = await fetchJson({
      apiBase,
      siteId,
      path: "/part-types",
      params: { ...paginationParams(page, limit, verticalId, cursor) },
      apiKey,
      signal,
    });
    return normalizePartTypes(raw);
  } catch {
    return emptyPaginated(limit);
  }
}

export async function fetchManufacturerPartTypes(
  apiBase: string,
  siteId: string,
  slugOrId: string,
  page: number,
  limit: number,
  verticalId?: string,
  apiKey?: string,
  cursor?: string,
  signal?: AbortSignal,
): Promise<PaginatedResponse<PartTypeItem>> {
  try {
    const raw = await fetchJson({
      apiBase,
      siteId,
      path: "/manufacturers/part-types",
      params: { manufacturerId: slugOrId, ...paginationParams(page, limit, verticalId, cursor) },
      apiKey,
      signal,
    });
    return normalizePartTypes(raw);
  } catch {
    return emptyPaginated(limit);
  }
}

// ---------------------------------------------------------------------------
// A-Z grouped manufacturers
// ---------------------------------------------------------------------------

export async function fetchManufacturersGrouped(
  apiBase: string,
  siteId: string,
  previewLimit: number,
  verticalId?: string,
  apiKey?: string,
): Promise<ManufacturersGroupedResponse> {
  try {
    const raw = await fetchJson({
      apiBase,
      siteId,
      path: "/manufacturers/grouped",
      params: { previewLimit, verticalId },
      apiKey,
    });
    return normalizeManufacturersGrouped(raw);
  } catch {
    return { tabGroups: [], total: 0 };
  }
}
