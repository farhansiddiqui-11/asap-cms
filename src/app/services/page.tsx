import type { Metadata } from "next";
import ComingSoon from "@/components/ui/ComingSoon";
import { fetchVpcContent } from "@/lib/vpc";
import { resolveAllVpcTags } from "@/lib/vpc-tags";

export async function generateMetadata(): Promise<Metadata> {
  const verticalId = process.env.NEXT_PUBLIC_VERTICAL_ID;
  const vpc = await fetchVpcContent("STATIC_PAGE", verticalId);

  if (!vpc) {
    return {
      title: "Services",
      description: "Explore ASAP Semiconductor's comprehensive services — parts sourcing, BOM management, kitting, and more.",
    };
  }

  const resolved = resolveAllVpcTags(vpc, { vertical_name: verticalId });
  const meta: Metadata = { title: resolved.title ?? "Services" };
  if (resolved.description) meta.description = resolved.description;
  if (resolved.keywords) meta.keywords = resolved.keywords;
  return meta;
}

export default async function ServicesPage() {
  const verticalId = process.env.NEXT_PUBLIC_VERTICAL_ID;
  const vpc = await fetchVpcContent("STATIC_PAGE", verticalId);
  const resolvedVpc = vpc
    ? resolveAllVpcTags(vpc, { vertical_name: verticalId })
    : null;

  return (
    <ComingSoon
      title={resolvedVpc?.heading || "Our Services"}
      description={resolvedVpc?.description || "Parts sourcing, BOM management, excess inventory, kitting services, and export procurement — all in one platform. Coming soon."}
    />
  );
}
