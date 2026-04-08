// ---------------------------------------------------------------------------
// VPC Tag Resolution
// ---------------------------------------------------------------------------

import type { VpcTemplate } from "@/types/vpc";

/**
 * Replace `{{tag}}` placeholders in a template string with values from a
 * context map. Unknown tags resolve to an empty string.
 */
export function resolveVpcTags(
  template: string,
  context: Record<string, string | undefined>,
): string {
  return template.replace(/\{\{([^}]+)\}\}/g, (_match, key: string) => {
    const normalized = key.trim().replace(/\./g, "_");
    return context[normalized] ?? "";
  });
}

/**
 * Resolve every non-null string field of a VpcTemplate in one pass.
 * Returns a new object — the original is not mutated.
 */
export function resolveAllVpcTags(
  vpc: VpcTemplate,
  context: Record<string, string | undefined>,
): VpcTemplate {
  const resolve = (v: string | null) =>
    v ? resolveVpcTags(v, context) : v;

  return {
    title: resolve(vpc.title),
    keywords: resolve(vpc.keywords),
    description: resolve(vpc.description),
    heading: resolve(vpc.heading),
    content: resolve(vpc.content),
    headerImage: vpc.headerImage,
    headerImageAlt: resolve(vpc.headerImageAlt),
    structuredData: resolve(vpc.structuredData),
  };
}

// ---------------------------------------------------------------------------
// Route → pageType mapping
// ---------------------------------------------------------------------------

const PAGE_TYPE_MAP: Record<string, { static: string; paginated: string }> = {
  vertical: {
    static: "VERTICAL_LANDING",
    paginated: "VERTICAL_LANDING",
  },
  category: {
    static: "CATEGORY_STATIC",
    paginated: "CATEGORY_PAGINATED",
  },
  subcategory: {
    static: "SUBCATEGORY_STATIC",
    paginated: "SUBCATEGORY_PAGINATED",
  },
  manufacturer: {
    static: "MANUFACTURER_DETAIL_STATIC",
    paginated: "MANUFACTURER_DETAIL_PAGINATED",
  },
  "part-type": {
    static: "PART_TYPE_DETAIL",
    paginated: "PART_TYPE_DETAIL",
  },
  "category-list": {
    static: "CATEGORY_LIST_STATIC",
    paginated: "CATEGORY_LIST_PAGINATED",
  },
  "manufacturer-list": {
    static: "MANUFACTURER_LIST_STATIC",
    paginated: "MANUFACTURER_LIST_PAGINATED",
  },
  "part-type-list": {
    static: "PART_TYPE_LIST_STATIC",
    paginated: "PART_TYPE_LIST_PAGINATED",
  },
};

/**
 * Map a semantic route type + page number to the CMS `pageType` value.
 *
 * ```ts
 * getPageType("category", 1);  // "CATEGORY_STATIC"
 * getPageType("category", 3);  // "CATEGORY_PAGINATED"
 * ```
 */
export function getPageType(routeType: string, page: number = 1): string {
  const entry = PAGE_TYPE_MAP[routeType];
  if (!entry) return "VERTICAL_LANDING";
  return page > 1 ? entry.paginated : entry.static;
}
