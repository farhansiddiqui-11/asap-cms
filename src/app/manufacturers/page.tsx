import type { Metadata } from "next";
import { fetchVpcContent } from "@/lib/vpc";
import { resolveAllVpcTags, getPageType } from "@/lib/vpc-tags";
import ManufacturersListClient from "./ManufacturersListClient";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const verticalId = process.env.NEXT_PUBLIC_VERTICAL_ID;
  const pageType = getPageType("manufacturer-list", 1);
  const vpc = await fetchVpcContent(pageType, verticalId);

  if (!vpc) {
    return { title: "Manufacturers" };
  }

  const resolved = resolveAllVpcTags(vpc, {
    vertical_name: verticalId,
  });

  const meta: Metadata = {
    title: resolved.title ?? "Manufacturers",
  };
  if (resolved.description) meta.description = resolved.description;
  if (resolved.keywords) meta.keywords = resolved.keywords;

  return meta;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function ManufacturersPage() {
  const verticalId = process.env.NEXT_PUBLIC_VERTICAL_ID;
  const pageType = getPageType("manufacturer-list", 1);
  const vpc = await fetchVpcContent(pageType, verticalId);

  const resolvedVpc = vpc
    ? resolveAllVpcTags(vpc, { vertical_name: verticalId })
    : null;

  // Sanitize structured data
  let safeStructuredData: string | null = null;
  if (resolvedVpc?.structuredData) {
    try {
      safeStructuredData = JSON.stringify(JSON.parse(resolvedVpc.structuredData));
    } catch {
      // Invalid JSON — skip
    }
  }

  return (
    <>
      {safeStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeStructuredData }}
        />
      )}
      <ManufacturersListClient vpc={resolvedVpc} />
    </>
  );
}
