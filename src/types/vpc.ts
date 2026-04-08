// ---------------------------------------------------------------------------
// VPC (Vertical Page Content) — Type Definitions
// ---------------------------------------------------------------------------

/** The full API response shape from the VPC resolve endpoint. */
export interface VpcApiResponse {
  success: boolean;
  data: VpcApiData | null;
}

/** Raw data returned by the CMS for a single VPC entry. */
export interface VpcApiData {
  id: number;
  siteId: number;
  verticalId: string | null;
  pageType: string;
  title: string | null;
  keywords: string | null;
  description: string | null;
  heading: string | null;
  content: string | null;
  headerImage: string | null;
  headerImageAlt: string | null;
  structuredData: string | null;
  isActive: boolean;
}

/**
 * Slimmed-down template consumed by pages. Fields still contain `{{tag}}`
 * placeholders until resolved via `resolveVpcTags`.
 */
export interface VpcTemplate {
  content: string | null;
  title: string | null;
  keywords: string | null;
  description: string | null;
  heading: string | null;
  headerImage: string | null;
  headerImageAlt: string | null;
  structuredData: string | null;
}
