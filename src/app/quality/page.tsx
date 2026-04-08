import type { Metadata } from "next";
import ComingSoon from "@/components/ui/ComingSoon";
import { fetchVpcContent } from "@/lib/vpc";
import { resolveAllVpcTags } from "@/lib/vpc-tags";

export async function generateMetadata(): Promise<Metadata> {
  const verticalId = process.env.NEXT_PUBLIC_VERTICAL_ID;
  const vpc = await fetchVpcContent("STATIC_PAGE", verticalId);

  if (!vpc) {
    return {
      title: "Quality",
      description: "ASAP Semiconductor's quality certifications, inspection processes, and counterfeit prevention programs.",
    };
  }

  const resolved = resolveAllVpcTags(vpc, { vertical_name: verticalId });
  const meta: Metadata = { title: resolved.title ?? "Quality" };
  if (resolved.description) meta.description = resolved.description;
  if (resolved.keywords) meta.keywords = resolved.keywords;
  return meta;
}

export default async function QualityPage() {
  const verticalId = process.env.NEXT_PUBLIC_VERTICAL_ID;
  const vpc = await fetchVpcContent("STATIC_PAGE", verticalId);
  const resolvedVpc = vpc
    ? resolveAllVpcTags(vpc, { vertical_name: verticalId })
    : null;

  return (
    <ComingSoon
      title={resolvedVpc?.heading || "Quality Assurance"}
      description={resolvedVpc?.description || "Our AS9120B, ISO 9001:2015 certified quality programs ensure every component meets the highest traceability and inspection standards. Full page coming soon."}
    />
  );
}
