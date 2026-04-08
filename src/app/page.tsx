import type { Metadata } from "next";
import { fetchVpcContent } from "@/lib/vpc";
import { resolveAllVpcTags } from "@/lib/vpc-tags";
import HeroSection from "@/components/home/HeroSection";
import BrandMarquee from "@/components/home/BrandMarquee";
import WhatSetsUsApart from "@/components/home/WhatSetsUsApart";
import TopProducts from "@/components/home/TopProducts";
import PartsCategories from "@/components/home/PartsCategories";
import Certifications from "@/components/home/Certifications";
import CTASection from "@/components/home/CTASection";

// ---------------------------------------------------------------------------
// Metadata — VPC VERTICAL_LANDING
// ---------------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const verticalId = process.env.NEXT_PUBLIC_VERTICAL_ID;
  const vpc = await fetchVpcContent("VERTICAL_LANDING", verticalId);

  if (!vpc) return {};

  const resolved = resolveAllVpcTags(vpc, {
    vertical_name: verticalId,
  });

  const meta: Metadata = {};
  if (resolved.title) meta.title = resolved.title;
  if (resolved.description) meta.description = resolved.description;
  if (resolved.keywords) meta.keywords = resolved.keywords;

  return meta;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function HomePage() {
  const verticalId = process.env.NEXT_PUBLIC_VERTICAL_ID;
  const vpc = await fetchVpcContent("VERTICAL_LANDING", verticalId);

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
      <HeroSection vpc={resolvedVpc} />
      <BrandMarquee />
      <WhatSetsUsApart vpc={resolvedVpc} />
      <TopProducts />
      <PartsCategories />
      <Certifications />
      <CTASection vpc={resolvedVpc} />
    </>
  );
}
