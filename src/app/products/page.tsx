import type { Metadata } from "next";
import { fetchVpcContent } from "@/lib/vpc";
import { resolveAllVpcTags, getPageType } from "@/lib/vpc-tags";
import ProductsListClient from "./ProductsListClient";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const verticalId = process.env.NEXT_PUBLIC_VERTICAL_ID;
  const pageType = getPageType("category-list", 1);
  const vpc = await fetchVpcContent(pageType, verticalId);

  if (!vpc) {
    return { title: "Products" };
  }

  const resolved = resolveAllVpcTags(vpc, {
    vertical_name: verticalId,
  });

  const meta: Metadata = {
    title: resolved.title ?? "Products",
  };
  if (resolved.description) meta.description = resolved.description;
  if (resolved.keywords) meta.keywords = resolved.keywords;

  return meta;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function ProductsPage() {
  const verticalId = process.env.NEXT_PUBLIC_VERTICAL_ID;
  const pageType = getPageType("category-list", 1);
  const vpc = await fetchVpcContent(pageType, verticalId);

  const resolvedVpc = vpc
    ? resolveAllVpcTags(vpc, { vertical_name: verticalId })
    : null;

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
      <ProductsListClient vpc={resolvedVpc} />
    </>
  );
}
