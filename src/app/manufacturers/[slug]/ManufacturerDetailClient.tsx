"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  Globe,
  Package,
  Calendar,
  MapPin,
  ShieldCheck,
  Tag,
  Send,
  Loader2,
} from "lucide-react";
import { useCmsData } from "@/hooks/useCmsData";
import type { CmsManufacturer, CmsPart } from "@/types/cms";
import type { VpcTemplate } from "@/types/vpc";

interface Props {
  slug: string;
  vpc: VpcTemplate | null;
}

function ProductMiniCard({ product }: { product: CmsPart }) {
  const partNumber = (product.partNumber ?? product.name ?? product.slug) as string;
  const name = (product.name ?? partNumber) as string;
  const image = (product.image ?? "") as string;
  const availability = (product.availability ?? "") as string;

  return (
    <Link
      href={`/products/${(product.skuUrl ?? product.slug) as string}`}
      className="group flex gap-3 p-3 bg-[#0a1535] rounded-xl border border-[#1a2f4a] hover:border-[#1a6fff]/40 transition-all duration-200"
    >
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-14 h-14 rounded-lg object-cover flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
        />
      ) : (
        <div className="w-14 h-14 rounded-lg bg-[#1a2f4a]/50 flex items-center justify-center flex-shrink-0">
          <Package className="w-6 h-6 text-[#1a2f4a]" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-[#1a6fff] text-xs font-mono font-medium mb-0.5 truncate">
          {partNumber}
        </p>
        <p className="text-white text-xs font-medium line-clamp-1 group-hover:text-[#8aa3c2] transition-colors">
          {name}
        </p>
        {availability && (
          <p className="text-[#4a6a8e] text-xs mt-0.5 capitalize">{String(availability).replace("-", " ")}</p>
        )}
      </div>
    </Link>
  );
}

export default function ManufacturerDetailClient({ slug, vpc }: Props) {
  const router = useRouter();

  const { data: mfrResponse, loading: mfrLoading, error: mfrError } = useCmsData<{ manufacturer: CmsManufacturer }>(
    `/verticals/manufacturers/${encodeURIComponent(slug)}`,
  );
  const mfr = mfrResponse?.manufacturer ?? null;

  const { data: partsResponse, loading: partsLoading } = useCmsData<{ parts: CmsPart[] }>(
    "/verticals/manufacturers/parts",
    { manufacturerId: mfr?.id, limit: 6 },
  );

  if (mfrLoading) {
    return (
      <div className="min-h-screen bg-[#0F1D45] pt-20 pb-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#1a6fff] animate-spin" />
      </div>
    );
  }

  if (mfrError || !mfr) {
    return (
      <div className="min-h-screen bg-[#0F1D45] pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h1 className="text-2xl text-white font-bold mb-4">Manufacturer Not Found</h1>
          <p className="text-[#5a7a9e] mb-6">{mfrError ?? "The requested manufacturer could not be found."}</p>
          <button
            onClick={() => router.push("/manufacturers")}
            className="text-[#1a6fff] hover:underline text-sm"
          >
            Back to Manufacturers
          </button>
        </div>
      </div>
    );
  }

  const name = (mfr.name ?? mfr.slug) as string;
  const shortName = (mfr.shortName ?? name) as string;
  const description = (mfr.description ?? "") as string;
  const founded = (mfr.founded ?? "") as string;
  const headquarters = (mfr.headquarters ?? "") as string;
  const partsCount = (mfr.partsCount ?? mfr.productCount ?? 0) as number;
  const industries = (mfr.industries ?? []) as string[];
  const certifications = (mfr.certifications ?? []) as string[];
  const website = (mfr.website ?? "") as string;
  const coverImage = vpc?.headerImage ?? (mfr.coverImage ?? "") as string;
  const coverImageAlt = vpc?.headerImageAlt ?? name;

  const relatedProducts = partsResponse?.parts ?? [];

  // Use VPC heading if available, otherwise default
  const heading = vpc?.heading || name;

  return (
    <div className="min-h-screen bg-[#0F1D45] pt-20 pb-20">
      {/* Cover image */}
      <div className="relative h-52 sm:h-64 overflow-hidden">
        {coverImage ? (
          <img
            src={coverImage}
            alt={coverImageAlt}
            className="w-full h-full object-cover opacity-30"
          />
        ) : (
          <div className="w-full h-full bg-[#0a1535]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F1D45]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1D45]/80 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#4a6a8e] mb-6">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/manufacturers" className="hover:text-white transition-colors">Manufacturers</Link>
          <span>/</span>
          <span className="text-[#8aa3c2]">{name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Header card */}
            <div className="bg-[#0d1e42] border border-[#1a2f4a] rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-[#0a1535] border border-[#1a2f4a] flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-7 h-7 text-[#1a6fff]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-display font-bold text-white mb-1">{heading}</h1>
                  <p className="text-[#5a7a9e] text-sm">{shortName}</p>
                </div>
              </div>

              <p className="text-[#5a7a9e] text-sm leading-relaxed mb-5">{description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  ...(founded ? [{ icon: Calendar, label: "Founded", value: founded }] : []),
                  ...(headquarters ? [{ icon: MapPin, label: "HQ", value: headquarters }] : []),
                  { icon: Package, label: "Parts", value: partsCount.toLocaleString() + "+" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5 p-3 bg-[#0a1535] rounded-xl">
                    <item.icon className="w-4 h-4 text-[#1a6fff] flex-shrink-0" />
                    <div>
                      <p className="text-[#4a6a8e] text-xs">{item.label}</p>
                      <p className="text-white text-sm font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* VPC body content */}
            {vpc?.content && (
              <div className="bg-[#0d1e42] border border-[#1a2f4a] rounded-2xl p-6">
                <div
                  className="text-[#8aa3c2] text-sm leading-relaxed prose prose-invert prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: vpc.content }}
                />
              </div>
            )}

            {/* Industries */}
            {industries.length > 0 && (
              <div className="bg-[#0d1e42] border border-[#1a2f4a] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-[#1a6fff]" />
                  <h2 className="text-white font-semibold">Industries Served</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {industries.map((ind) => (
                    <span key={ind} className="px-3 py-1.5 rounded-full border border-[#1a2f4a] bg-[#1a2f4a]/50 text-[#8aa3c2] text-sm">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div className="bg-[#0d1e42] border border-[#1a2f4a] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-4 h-4 text-[#1a6fff]" />
                  <h2 className="text-white font-semibold">Certifications</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert) => (
                    <span key={cert} className="px-3 py-1.5 rounded-full border border-[#1a6fff]/20 bg-[#1a6fff]/5 text-[#8aa3c2] text-sm">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related products */}
            {relatedProducts.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white font-display font-semibold">
                    Available Parts ({relatedProducts.length})
                  </h2>
                  <Link
                    href={`/products?manufacturer=${mfr.slug}`}
                    className="text-[#1a6fff] text-xs font-medium hover:underline"
                  >
                    View All →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relatedProducts.map((p) => (
                    <ProductMiniCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}

            {partsLoading && (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 text-[#1a6fff] animate-spin" />
              </div>
            )}
          </div>

          {/* Right: Sidebar */}
          <div className="flex flex-col gap-4">
            {/* CTA */}
            <div className="bg-[#0d1e42] border border-[#1a2f4a] rounded-2xl p-5">
              <h3 className="text-white font-semibold mb-1">Need {shortName} Parts?</h3>
              <p className="text-[#5a7a9e] text-xs leading-relaxed mb-4">
                Submit an RFQ and our procurement team will respond within hours.
              </p>
              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-2 bg-[#1a6fff] hover:bg-[#0f5ce8] text-white px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-[#1a6fff]/25"
              >
                <Send className="w-4 h-4" />
                Request a Quote
              </Link>
            </div>

            {website && (
              <div className="bg-[#0d1e42] border border-[#1a2f4a] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-4 h-4 text-[#1a6fff]" />
                  <h3 className="text-white text-sm font-semibold">Official Website</h3>
                </div>
                <p className="text-[#5a7a9e] text-xs mb-3">
                  Visit the manufacturer&apos;s site for datasheets and technical documentation.
                </p>
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1a6fff] text-sm font-medium hover:underline break-all"
                >
                  {website.replace("https://", "")}
                </a>
              </div>
            )}

            <Link
              href="/manufacturers"
              className="flex items-center gap-2 justify-center p-4 rounded-xl border border-[#1a2f4a] text-[#8aa3c2] hover:text-white hover:border-[#1a6fff]/40 text-sm font-medium transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              All Manufacturers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
