// ---------------------------------------------------------------------------
// Smart Listing — Constants
// ---------------------------------------------------------------------------

import type { NodeType, SectionKey } from "./types";

/**
 * Which sections to fetch for each node type.
 */
export const NODE_SECTIONS: Record<NodeType, SectionKey[]> = {
  vertical: ["subcategories", "manufacturers", "partTypes"],
  category: ["subcategories", "manufacturers", "parts"],
  manufacturer: ["subcategories", "parts", "partTypes"],
  "part-type": ["manufacturers", "parts"],
};

/**
 * Map of variant name → which sections it renders.
 * Used to skip fetches for sections that won't be displayed.
 */
export const VARIANT_SECTIONS: Record<string, SectionKey[]> = {
  variant1: ["subcategories", "manufacturers", "parts", "partTypes"],
  variant2: ["subcategories", "parts"],
  variant3: ["manufacturers", "parts"],
  // Default: render all applicable sections
  default: ["subcategories", "manufacturers", "parts", "partTypes"],
};

/**
 * URL param keys per section for independent pagination.
 */
export const SECTION_PAGE_PARAMS: Record<SectionKey, string> = {
  subcategories: "catPage",
  manufacturers: "mfrPage",
  parts: "partsPage",
  partTypes: "ptPage",
};

/**
 * Effective sections = intersection of node-type sections ∩ variant sections.
 */
export function getEffectiveSections(
  nodeType: NodeType,
  variant: string,
): SectionKey[] {
  const nodeSections = NODE_SECTIONS[nodeType];
  const variantSections = VARIANT_SECTIONS[variant] ?? VARIANT_SECTIONS.default;
  return nodeSections.filter((s) => variantSections.includes(s));
}
