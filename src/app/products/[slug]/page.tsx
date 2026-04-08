import type { Metadata } from "next";
import { cache } from "react";
import { getPartBySlug } from "@/lib/cms-api";
import { fetchVpcContent } from "@/lib/vpc";
import { resolveAllVpcTags, getPageType } from "@/lib/vpc-tags";
import type { VpcTemplate } from "@/types/vpc";
import ProductDetailClient from "./ProductDetailClient";

type Props = { params: Promise<{ slug: string }> };

// ---------------------------------------------------------------------------
// Cached data fetcher (deduplicated across generateMetadata + page render)
// ---------------------------------------------------------------------------

interface PartContext {
  partName: string;
  partNumber: string;
  manufacturerName: string;
  categoryName: string;
  subcategoryName: string;
  description: string;
}

const getPartContext = cache(async (slug: string): Promise<PartContext> => {
  const fallback: PartContext = {
    partName: slug,
    partNumber: slug,
    manufacturerName: "",
    categoryName: "",
    subcategoryName: "",
    description: "",
  };

  try {
    const res = await getPartBySlug(slug);
    // API may return data as { part: { ... } } or flat
    const raw = res.data as Record<string, unknown>;
    const part = (raw?.part ?? raw) as Record<string, unknown>;

    const mfr = part?.manufacturer as Record<string, unknown> | undefined;
    const cat = part?.category as Record<string, unknown> | undefined;
    const sub = part?.subCategory as Record<string, unknown> | undefined;

    return {
      partName: (part?.name ?? part?.partNumber ?? slug) as string,
      partNumber: (part?.partNumber ?? part?.name ?? slug) as string,
      manufacturerName: (mfr?.name ?? "") as string,
      categoryName: (cat?.name ?? "") as string,
      subcategoryName: (sub?.name ?? "") as string,
      description: (part?.description ?? "") as string,
    };
  } catch {
    return fallback;
  }
});

const getVpc = cache(async (verticalId?: string): Promise<VpcTemplate | null> => {
  const pageType = getPageType("category", 1);
  return fetchVpcContent(pageType, verticalId);
});

function buildTagContext(ctx: PartContext, verticalId?: string): Record<string, string | undefined> {
  return {
    entity_name: ctx.partName,
    category_name: ctx.categoryName,
    subcategory_name: ctx.subcategoryName,
    manufacturer_name: ctx.manufacturerName,
    vertical_name: verticalId,
  };
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const verticalId = process.env.NEXT_PUBLIC_VERTICAL_ID;

  const [ctx, vpc] = await Promise.all([
    getPartContext(slug),
    getVpc(verticalId),
  ]);

  if (vpc) {
    const resolved = resolveAllVpcTags(vpc, buildTagContext(ctx, verticalId));

    const meta: Metadata = {
      title: resolved.title ?? `${ctx.partNumber} — ${ctx.manufacturerName || "Parts"}`,
    };
    if (resolved.description) meta.description = resolved.description;
    if (resolved.keywords) meta.keywords = resolved.keywords;
    return meta;
  }

  // Fallback: use part data directly
  return {
    title: `${ctx.partNumber} — ${ctx.manufacturerName || "Parts"}`,
    description: ctx.description || `Buy ${ctx.partNumber} from ${ctx.manufacturerName}. Browse specifications, availability, and request a quote.`,
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const verticalId = process.env.NEXT_PUBLIC_VERTICAL_ID;

  const [ctx, vpc] = await Promise.all([
    getPartContext(slug),
    getVpc(verticalId),
  ]);

  const resolvedVpc = vpc
    ? resolveAllVpcTags(vpc, buildTagContext(ctx, verticalId))
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
      <ProductDetailClient slug={slug} vpc={resolvedVpc} />
    </>
  );
}
