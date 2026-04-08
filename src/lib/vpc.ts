// ---------------------------------------------------------------------------
// VPC (Vertical Page Content) — Server-side fetch utility
// ---------------------------------------------------------------------------

import type { VpcApiResponse, VpcTemplate } from "@/types/vpc";

// ---------------------------------------------------------------------------
// Environment helpers (mirror cms-api.ts pattern, server-only)
// ---------------------------------------------------------------------------

function getCmsUrl(): string {
  const url =
    process.env.CMS_API_URL ?? process.env.NEXT_PUBLIC_CMS_URL;
  if (!url) throw new Error("CMS_API_URL / NEXT_PUBLIC_CMS_URL is not set");
  return url.replace(/\/+$/, "");
}

function getSiteId(): string {
  const id = process.env.SITE_ID ?? process.env.NEXT_PUBLIC_SITE_ID;
  if (!id) throw new Error("SITE_ID / NEXT_PUBLIC_SITE_ID is not set");
  return id;
}

function getApiKey(): string {
  return (
    process.env.CMS_INTERNAL_API_KEY ??
    process.env.NEXT_PUBLIC_CMS_API_KEY ??
    ""
  );
}

// ---------------------------------------------------------------------------
// Core fetch
// ---------------------------------------------------------------------------

/**
 * Fetch a single VPC entry from the CMS. Returns `null` when the CMS has no
 * matching content for the given `pageType` / `verticalId` combination.
 *
 * Uses ISR with a 300-second revalidation window matching the CMS
 * `Cache-Control: s-maxage=300`.
 */
async function fetchVpcRaw(
  pageType: string,
  verticalId?: string,
): Promise<VpcTemplate | null> {
  const url = new URL(
    `/api/sites/${getSiteId()}/vertical-page-content/resolve`,
    getCmsUrl(),
  );
  url.searchParams.set("pageType", pageType);
  if (verticalId) {
    url.searchParams.set("verticalId", verticalId);
  }

  const apiKey = getApiKey();
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (apiKey) {
    headers["x-internal-key"] = apiKey;
  }

  try {
    const res = await fetch(url.toString(), {
      headers,
      next: { revalidate: 300 },
    });

    if (!res.ok) return null;

    const json = (await res.json()) as VpcApiResponse;

    if (!json.success || !json.data || !json.data.isActive) return null;

    const d = json.data;
    return {
      title: d.title,
      keywords: d.keywords,
      description: d.description,
      heading: d.heading,
      content: d.content,
      headerImage: d.headerImage,
      headerImageAlt: d.headerImageAlt,
      structuredData: d.structuredData,
    };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Public API with fallback chain
// ---------------------------------------------------------------------------

/**
 * Fetch VPC content with automatic fallback:
 *
 * 1. Exact `pageType` + `verticalId`
 * 2. If subcategory → try `CATEGORY_STATIC`
 * 3. Try `VERTICAL_LANDING`
 * 4. Try without `verticalId`
 */
export async function fetchVpcContent(
  pageType: string,
  verticalId?: string,
): Promise<VpcTemplate | null> {
  // 1. Exact match
  const exact = await fetchVpcRaw(pageType, verticalId);
  if (exact) return exact;

  // 2. Subcategory fallback → category
  if (pageType.startsWith("SUBCATEGORY_")) {
    const catFallback = await fetchVpcRaw("CATEGORY_STATIC", verticalId);
    if (catFallback) return catFallback;
  }

  // 3. Vertical landing fallback
  if (pageType !== "VERTICAL_LANDING") {
    const vertFallback = await fetchVpcRaw("VERTICAL_LANDING", verticalId);
    if (vertFallback) return vertFallback;
  }

  // 4. Without verticalId
  if (verticalId) {
    const noVert = await fetchVpcRaw(pageType);
    if (noVert) return noVert;
  }

  return null;
}
