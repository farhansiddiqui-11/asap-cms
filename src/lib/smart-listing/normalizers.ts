// ---------------------------------------------------------------------------
// Smart Listing — API Response Normalizers
// ---------------------------------------------------------------------------
// Handles inconsistent backend shapes and normalizes into PaginatedResponse.
// ---------------------------------------------------------------------------

import type {
  PaginatedResponse,
  PaginationState,
  SubcategoryItem,
  ManufacturerItem,
  PartItem,
  PartTypeItem,
  EntityMeta,
  ManufacturersGroupedResponse,
} from "./types";
import { emptyPaginated } from "./types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function extractPagination(raw: Record<string, unknown>): PaginationState {
  const p = (raw.pagination ?? {}) as Record<string, unknown>;
  return {
    page: Number(p.page ?? 1),
    totalItems: Number(p.totalItems ?? p.total ?? 0),
    totalPages: Number(p.totalPages ?? 0),
    limit: Number(p.limit ?? 20),
    nextCursor: (p.nextCursor as string) ?? undefined,
  };
}

// ---------------------------------------------------------------------------
// Entity meta
// ---------------------------------------------------------------------------

export function normalizeMeta(raw: Record<string, unknown>): EntityMeta | null {
  const d = raw.data as Record<string, unknown> | undefined;
  if (!d) return null;

  // The backend nests differently: data.manufacturer, data.category, data.part, or data directly
  const entity =
    (d.manufacturer as Record<string, unknown>) ??
    (d.category as Record<string, unknown>) ??
    (d.part as Record<string, unknown>) ??
    (d.partType as Record<string, unknown>) ??
    d;

  if (!entity || !entity.id) return null;

  return {
    id: String(entity.id),
    numericId: entity.numericId != null ? Number(entity.numericId) : undefined,
    name: String(entity.name ?? entity.slug ?? ""),
    slug: String(entity.slug ?? ""),
    description: (entity.description as string) ?? undefined,
    descriptionContext: (d.descriptionContext as Record<string, string>) ?? undefined,
    ...entity,
  };
}

// ---------------------------------------------------------------------------
// Subcategories / Categories
// ---------------------------------------------------------------------------

export function normalizeSubcategories(
  raw: Record<string, unknown>,
): PaginatedResponse<SubcategoryItem> {
  try {
    const d = raw.data;
    let items: unknown[];

    if (Array.isArray(d)) {
      items = d;
    } else if (d && typeof d === "object") {
      const obj = d as Record<string, unknown>;
      items =
        (obj.subcategories as unknown[]) ??
        (obj.categories as unknown[]) ??
        (obj.items as unknown[]) ??
        [];
    } else {
      return emptyPaginated();
    }

    return {
      success: true,
      data: items.map((item) => {
        const r = item as Record<string, unknown>;
        return {
          id: String(r.id ?? r.numericId ?? ""),
          name: String(r.name ?? ""),
          slug: String(r.slug ?? ""),
          partsCount: r.partsCount != null ? Number(r.partsCount) : undefined,
        };
      }),
      pagination: extractPagination(raw),
    };
  } catch {
    return emptyPaginated();
  }
}

// ---------------------------------------------------------------------------
// Manufacturers
// ---------------------------------------------------------------------------

export function normalizeManufacturers(
  raw: Record<string, unknown>,
): PaginatedResponse<ManufacturerItem> {
  try {
    const d = raw.data;
    let items: unknown[];

    if (Array.isArray(d)) {
      items = d;
    } else if (d && typeof d === "object") {
      const obj = d as Record<string, unknown>;
      items =
        (obj.manufacturers as unknown[]) ??
        (obj.items as unknown[]) ??
        [];
    } else {
      return emptyPaginated();
    }

    return {
      success: true,
      data: items.map((item) => {
        const r = item as Record<string, unknown>;
        return {
          id: String(r.id ?? ""),
          name: String(r.name ?? ""),
          slug: String(r.slug ?? ""),
          partsCount: r.partsCount != null ? Number(r.partsCount) : undefined,
        };
      }),
      pagination: extractPagination(raw),
    };
  } catch {
    return emptyPaginated();
  }
}

// ---------------------------------------------------------------------------
// Parts
// ---------------------------------------------------------------------------

export function normalizeParts(
  raw: Record<string, unknown>,
): PaginatedResponse<PartItem> {
  try {
    const d = raw.data;
    let items: unknown[];

    if (Array.isArray(d)) {
      items = d;
    } else if (d && typeof d === "object") {
      const obj = d as Record<string, unknown>;
      items =
        (obj.parts as unknown[]) ??
        (obj.items as unknown[]) ??
        [];
    } else {
      return emptyPaginated();
    }

    return {
      success: true,
      data: items.map((item) => {
        const r = item as Record<string, unknown>;
        const mfr = r.manufacturer as Record<string, unknown> | undefined;
        const cat = r.category as Record<string, unknown> | undefined;
        const subCat = r.subCategory as Record<string, unknown> | undefined;
        return {
          id: String(r.id ?? ""),
          partNumber: String(r.partNumber ?? r.name ?? ""),
          name: (r.name as string) ?? undefined,
          slug: String(r.skuUrl ?? r.slug ?? ""),
          description: (r.description as string) ?? undefined,
          manufacturer: mfr
            ? { name: String(mfr.name ?? ""), slug: String(mfr.slug ?? "") }
            : undefined,
          category: cat
            ? { name: String(cat.name ?? ""), slug: String(cat.slug ?? "") }
            : undefined,
          subCategory: subCat
            ? { name: String(subCat.name ?? ""), slug: String(subCat.slug ?? "") }
            : undefined,
        };
      }),
      pagination: extractPagination(raw),
    };
  } catch {
    return emptyPaginated();
  }
}

// ---------------------------------------------------------------------------
// Part Types
// ---------------------------------------------------------------------------

export function normalizePartTypes(
  raw: Record<string, unknown>,
): PaginatedResponse<PartTypeItem> {
  try {
    const d = raw.data;
    let items: unknown[];

    if (Array.isArray(d)) {
      items = d;
    } else if (d && typeof d === "object") {
      const obj = d as Record<string, unknown>;
      items =
        (obj.partTypes as unknown[]) ??
        (obj.items as unknown[]) ??
        [];
    } else {
      return emptyPaginated();
    }

    return {
      success: true,
      data: items.map((item) => {
        const r = item as Record<string, unknown>;
        return {
          id: String(r.id ?? ""),
          name: String(r.name ?? ""),
          slug: String(r.slug ?? ""),
        };
      }),
      pagination: extractPagination(raw),
    };
  } catch {
    return emptyPaginated();
  }
}

// ---------------------------------------------------------------------------
// Grouped manufacturers (A-Z)
// ---------------------------------------------------------------------------

export function normalizeManufacturersGrouped(
  raw: Record<string, unknown>,
): ManufacturersGroupedResponse {
  try {
    const d = raw.data as Record<string, unknown>;
    return {
      tabGroups: ((d?.tabGroups as unknown[]) ?? []).map((tg) => {
        const g = tg as Record<string, unknown>;
        return {
          label: String(g.label ?? ""),
          letterSections: ((g.letterSections as unknown[]) ?? []).map((ls) => {
            const s = ls as Record<string, unknown>;
            return {
              letter: String(s.letter ?? ""),
              items: ((s.items as unknown[]) ?? []).map((it) => {
                const i = it as Record<string, unknown>;
                return { name: String(i.name ?? ""), slug: String(i.slug ?? "") };
              }),
              total: Number(s.total ?? 0),
            };
          }),
          total: Number(g.total ?? 0),
        };
      }),
      total: Number(d?.total ?? 0),
    };
  } catch {
    return { tabGroups: [], total: 0 };
  }
}
