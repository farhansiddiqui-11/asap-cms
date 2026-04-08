import type { Metadata } from "next";
import { cache } from "react";
import { getManufacturerBySlug } from "@/lib/cms-api";
import { fetchVpcContent } from "@/lib/vpc";
import { resolveAllVpcTags, getPageType } from "@/lib/vpc-tags";
import type { VpcTemplate } from "@/types/vpc";
import ManufacturerDetailClient from "./ManufacturerDetailClient";

type Props = { params: Promise<{ slug: string }> };

// ---------------------------------------------------------------------------
// Cached data fetchers (deduplicated across generateMetadata + page render)
// ---------------------------------------------------------------------------

const getManufacturerName = cache(async (slug: string): Promise<string> => {
  try {
    const res = await getManufacturerBySlug(slug);
    // API may return { name } directly or nested under { manufacturer: { name } }
    const data = res.data as Record<string, unknown>;
    const nested = data?.manufacturer as Record<string, unknown> | undefined;
    return (nested?.name ?? data?.name ?? slug) as string;
  } catch {
    return slug;
  }
});

const getVpc = cache(async (verticalId?: string): Promise<VpcTemplate | null> => {
  const pageType = getPageType("manufacturer", 1);
  return fetchVpcContent(pageType, verticalId);
});

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const verticalId = process.env.NEXT_PUBLIC_VERTICAL_ID;

  const [manufacturerName, vpc] = await Promise.all([
    getManufacturerName(slug),
    getVpc(verticalId),
  ]);

  if (!vpc) {
    return { title: `${manufacturerName} Parts` };
  }

  const resolved = resolveAllVpcTags(vpc, {
    manufacturer_name: manufacturerName,
    entity_name: manufacturerName,
    vertical_name: verticalId,
  });

  const meta: Metadata = {
    title: resolved.title ?? `${manufacturerName} Parts`,
  };
  if (resolved.description) meta.description = resolved.description;
  if (resolved.keywords) meta.keywords = resolved.keywords;

  return meta;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function ManufacturerDetailPage({ params }: Props) {
  const { slug } = await params;
  const verticalId = process.env.NEXT_PUBLIC_VERTICAL_ID;

  const [manufacturerName, vpc] = await Promise.all([
    getManufacturerName(slug),
    getVpc(verticalId),
  ]);

  const resolvedVpc = vpc
    ? resolveAllVpcTags(vpc, {
        manufacturer_name: manufacturerName,
        entity_name: manufacturerName,
        vertical_name: verticalId,
      })
    : null;

  // Sanitize structured data by round-tripping through JSON.parse
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
      <ManufacturerDetailClient slug={slug} vpc={resolvedVpc} />
    </>
  );
}
