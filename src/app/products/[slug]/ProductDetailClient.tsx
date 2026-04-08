"use client";

import { useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Package,
  CheckCircle2,
  Clock,
  Tag,
  Building2,
  FileText,
  ShieldCheck,
  Send,
  Loader2,
  ChevronRight,
  Layers,
} from "lucide-react";
import { useCmsData } from "@/hooks/useCmsData";
import { useSmartPagination } from "@/hooks/useSmartPagination";
import { normalizeManufacturers } from "@/lib/smart-listing/normalizers";
import type { PaginatedResponse, ManufacturerItem } from "@/lib/smart-listing/types";
import Pagination from "@/components/smart-listing/ui/Pagination";
import type { VpcTemplate } from "@/types/vpc";

interface Props {
  slug: string;
  vpc: VpcTemplate | null;
}

const msFont = { fontFamily: "'Microsoft Sans Serif', sans-serif" } as React.CSSProperties;

const availabilityConfig: Record<string, { label: string; color: string; icon: typeof Package }> = {
  "in-stock": { label: "In Stock", color: "text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/20", icon: CheckCircle2 },
  "out-of-stock": { label: "Out of Stock", color: "text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/20", icon: Package },
  "lead-time": { label: "Lead Time", color: "text-[#f59e0b] bg-[#f59e0b]/10 border-[#f59e0b]/20", icon: Clock },
};

// ---------------------------------------------------------------------------
// Types for the full API response
// ---------------------------------------------------------------------------

interface BreadcrumbItem {
  id: string;
  name: string;
  slug: string;
  entityType: string;
  catType?: number;
}

interface CategoryObj {
  id: string;
  name: string;
  slug: string;
  catType?: number;
}

interface ManufacturerObj {
  id: string;
  name: string;
  slug: string;
}

interface PartDetail {
  id: string;
  partNumber: string;
  name: string;
  description: string;
  skuUrl: string;
  manufacturer: ManufacturerObj;
  category: CategoryObj;
  subCategory?: CategoryObj;
  categoryBreadcrumb?: BreadcrumbItem[];
  categoryId?: string;
  isActive?: boolean;
  rawCategoryId?: number;
  rawManufacturerId?: string;
  [key: string]: unknown;
}

interface PartResponse {
  part: PartDetail;
  descriptionContext?: Record<string, string>;
  breadcrumbs?: BreadcrumbItem[];
}

/** Convert camelCase / snake_case key to a human-readable label. */
function formatFieldLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

// ---------------------------------------------------------------------------
// Manufacturers section (below part detail)
// ---------------------------------------------------------------------------

function CategoryManufacturers({ categoryId }: { categoryId: string }) {
  const fetchPage = useCallback(
    async (page: number, cursor?: string): Promise<PaginatedResponse<ManufacturerItem>> => {
      const params = new URLSearchParams();
      params.set("path", "/categories/manufacturers");
      params.set("categoryId", categoryId);
      params.set("page", String(page));
      params.set("limit", "20");
      if (cursor) params.set("cursor", cursor);

      try {
        const res = await fetch(`/api/verticals?${params.toString()}`);
        const json = await res.json();
        return normalizeManufacturers(json);
      } catch {
        return { success: false, data: [], pagination: { page: 1, totalItems: 0, totalPages: 0, limit: 20 } };
      }
    },
    [categoryId],
  );

  // Initial fetch via useCmsData
  const { data: initialMfrs, pagination: initialPag } = useCmsData<ManufacturerItem[]>(
    "/verticals/categories/manufacturers",
    { categoryId, page: 1, limit: 20 },
  );

  const initialPagination = {
    page: initialPag?.page ?? 1,
    totalItems: initialPag?.totalItems ?? 0,
    totalPages: initialPag?.totalPages ?? 0,
    limit: initialPag?.limit ?? 20,
    nextCursor: initialPag?.nextCursor ?? undefined,
  };

  const { data, pagination, loading, handlePageChange } = useSmartPagination({
    initialData: initialMfrs ?? [],
    initialPagination,
    fetchPage,
    pageParamKey: "mfrPage",
  });

  if (data.length === 0 && !loading) return null;

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-display font-bold text-white">Manufacturers in this Category</h2>
        {pagination.totalItems > 0 && (
          <span className="text-[#4a6a8e] text-xs" style={msFont}>
            {pagination.totalItems.toLocaleString()} manufacturers
          </span>
        )}
      </div>

      {loading && data.length === 0 ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-6 h-6 text-[#1a6fff] animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {data.map((mfr) => (
              <Link
                key={mfr.id}
                href={`/manufacturers/${mfr.slug}`}
                className="flex items-center gap-3 px-4 py-3.5 rounded-lg border border-[#1a2f4a]/60 hover:border-[#1a6fff]/40 hover:bg-white/[0.02] transition-all group"
              >
                <div className="w-8 h-8 rounded flex items-center justify-center bg-[#0F1D45] border border-[#1a2f4a]/60 flex-shrink-0">
                  <Building2 className="w-4 h-4 text-[#4a6a8e] group-hover:text-[#1a6fff] transition-colors" />
                </div>
                <div className="min-w-0">
                  <p className="text-[#8aa3c2] group-hover:text-white text-sm truncate transition-colors" style={msFont}>
                    {mfr.name}
                  </p>
                  {mfr.partsCount != null && mfr.partsCount > 0 && (
                    <p className="text-[#4a6a8e] text-xs" style={msFont}>
                      {mfr.partsCount.toLocaleString()} parts
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {loading && data.length > 0 && (
            <div className="flex justify-center py-4">
              <Loader2 className="w-4 h-4 text-[#1a6fff] animate-spin" />
            </div>
          )}

          <Pagination pagination={pagination} loading={loading} onPageChange={handlePageChange} />
        </>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function ProductDetailClient({ slug, vpc }: Props) {
  const router = useRouter();

  const { data: partResponse, loading, error } = useCmsData<PartResponse>(
    `/verticals/parts/${encodeURIComponent(slug)}`,
  );

  const product = partResponse?.part ?? null;
  const descriptionContext = partResponse?.descriptionContext;
  const breadcrumbs = partResponse?.breadcrumbs;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1D45] pt-24 pb-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#1a6fff] animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#0F1D45] pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h1 className="text-2xl text-white font-bold mb-4">Product Not Found</h1>
          <p className="text-[#5a7a9e] mb-6">{error ?? "The requested product could not be found."}</p>
          <button onClick={() => router.push("/products")} className="text-[#1a6fff] hover:underline text-sm">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Extract all fields from the API response
  const partNumber = product.partNumber ?? product.name ?? slug;
  const name = product.name ?? partNumber;
  const description = product.description ?? "";
  const mfr = product.manufacturer;
  const cat = product.category;
  const subCat = product.subCategory;
  const categoryId = cat?.id ?? "";

  // Fields that may or may not be present
  const nsn = (product.nsn ?? "") as string;
  const cage = (product.cage ?? "") as string;
  const unitOfMeasure = (product.unitOfMeasure ?? "") as string;
  const availability = (product.availability ?? "") as string;
  const quantity = Number(product.quantity ?? 0);
  const leadTime = (product.leadTime ?? "") as string;
  const image = vpc?.headerImage ?? (product.image ?? "") as string;
  const specs = (product.specs ?? {}) as Record<string, string>;
  const certifications = (product.certifications ?? []) as string[];

  const avail = availabilityConfig[availability] ?? null;

  // Use VPC heading if available
  const heading = vpc?.heading || partNumber;

  // Collect any remaining fields from the product not already rendered above
  const handledKeys = new Set([
    "id", "slug", "partNumber", "name", "description", "skuUrl",
    "manufacturer", "category", "subCategory", "categoryBreadcrumb",
    "categoryId", "isActive", "rawCategoryId", "rawManufacturerId",
    "nsn", "cage", "unitOfMeasure", "availability", "quantity",
    "leadTime", "image", "specs", "certifications",
  ]);
  const additionalFields = Object.entries(product)
    .filter(
      ([key, val]) =>
        !handledKeys.has(key) &&
        val != null &&
        val !== "" &&
        typeof val !== "object" &&
        !Array.isArray(val),
    )
    .map(([key, val]) => [formatFieldLabel(key), String(val)] as const);

  return (
    <div className="min-h-screen bg-[#0F1D45] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb — from API breadcrumbs array */}
        <div className="flex items-center gap-1.5 text-xs text-[#4a6a8e] mb-8 flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/products" className="hover:text-white transition-colors">Products</Link>
          {breadcrumbs?.map((crumb) => (
            <span key={crumb.id} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3" />
              <Link
                href={
                  crumb.entityType === "vertical"
                    ? `/products?vertical=${crumb.slug}`
                    : crumb.entityType === "category"
                      ? `/products?category=${crumb.slug}`
                      : `/products?q=${crumb.slug}`
                }
                className="hover:text-white transition-colors"
              >
                {crumb.name}
              </Link>
            </span>
          ))}
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#8aa3c2]">{partNumber}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ── LEFT: Image ── */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <div className="relative rounded-2xl overflow-hidden bg-[#0a1535] border border-[#1a2f4a] aspect-[4/3]">
              {image ? (
                <img src={image} alt={vpc?.headerImageAlt ?? name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-16 h-16 text-[#1a2f4a]" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1535]/60 to-transparent" />
              {avail && (
                <div className={`absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${avail.color}`}>
                  <avail.icon className="w-3.5 h-3.5" />
                  {avail.label}
                </div>
              )}
            </div>

            {/* Certifications */}
            {certifications.length > 0 && (
              <div className="bg-[#0d1e42] border border-[#1a2f4a] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-4 h-4 text-[#1a6fff]" />
                  <h3 className="text-white text-sm font-semibold">Certifications</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert) => (
                    <span key={cert} className="px-2.5 py-1 rounded-full border border-[#1a3055] text-[#8aa3c2] text-xs">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── CENTER + RIGHT: Details ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Header with category + subcategory badges */}
            <div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {cat && (
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="text-[#1a6fff] text-xs font-semibold uppercase tracking-wider bg-[#1a6fff]/10 px-2.5 py-1 rounded hover:bg-[#1a6fff]/20 transition-colors"
                  >
                    {cat.name}
                  </Link>
                )}
                {subCat && (
                  <>
                    <ChevronRight className="w-3 h-3 text-[#4a6a8e]" />
                    <Link
                      href={`/products?category=${subCat.slug}`}
                      className="text-[#8aa3c2] text-xs font-semibold uppercase tracking-wider bg-white/5 px-2.5 py-1 rounded hover:bg-white/10 transition-colors"
                    >
                      {subCat.name}
                    </Link>
                  </>
                )}
              </div>

              <h1 className="text-3xl font-display font-bold text-white mb-1">{heading}</h1>
              <h2 className="text-[#8aa3c2] text-lg font-medium mb-4">{name}</h2>
              <p className="text-[#5a7a9e] text-sm leading-relaxed">{description}</p>
            </div>

            {/* VPC body content */}
            {vpc?.content && (
              <div className="bg-[#0d1e42] border border-[#1a2f4a] rounded-xl p-5">
                <div
                  className="text-[#8aa3c2] text-sm leading-relaxed prose prose-invert prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: vpc.content }}
                />
              </div>
            )}

            {/* Key Info grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* Manufacturer */}
              {mfr && (
                <Link
                  href={`/manufacturers/${mfr.slug}`}
                  className="bg-[#0d1e42] border border-[#1a2f4a] rounded-xl p-4 hover:border-[#1a6fff]/40 transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#1a6fff]" />
                    <span className="text-[#5a7a9e] text-xs">Manufacturer</span>
                  </div>
                  <p className="text-white text-sm font-medium group-hover:text-[#1a6fff] transition-colors">{mfr.name}</p>
                </Link>
              )}

              {/* Category */}
              {cat && (
                <Link
                  href={`/products?category=${cat.slug}`}
                  className="bg-[#0d1e42] border border-[#1a2f4a] rounded-xl p-4 hover:border-[#1a6fff]/40 transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#1a6fff]" />
                    <span className="text-[#5a7a9e] text-xs">Category</span>
                  </div>
                  <p className="text-white text-sm font-medium group-hover:text-[#1a6fff] transition-colors">{cat.name}</p>
                </Link>
              )}

              {/* Subcategory */}
              {subCat && (
                <Link
                  href={`/products?category=${subCat.slug}`}
                  className="bg-[#0d1e42] border border-[#1a2f4a] rounded-xl p-4 hover:border-[#1a6fff]/40 transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#1a6fff]" />
                    <span className="text-[#5a7a9e] text-xs">Subcategory</span>
                  </div>
                  <p className="text-white text-sm font-medium group-hover:text-[#1a6fff] transition-colors">{subCat.name}</p>
                </Link>
              )}

              {/* Unit of measure */}
              {unitOfMeasure && (
                <div className="bg-[#0d1e42] border border-[#1a2f4a] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#1a6fff]" />
                    <span className="text-[#5a7a9e] text-xs">Unit of Measure</span>
                  </div>
                  <p className="text-white text-sm font-medium">{unitOfMeasure}</p>
                </div>
              )}

              {/* NSN */}
              {nsn && (
                <div className="bg-[#0d1e42] border border-[#1a2f4a] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#1a6fff]" />
                    <span className="text-[#5a7a9e] text-xs">NSN</span>
                  </div>
                  <p className="text-white text-sm font-medium font-mono">{nsn}</p>
                </div>
              )}

              {/* CAGE */}
              {cage && (
                <div className="bg-[#0d1e42] border border-[#1a2f4a] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#1a6fff]" />
                    <span className="text-[#5a7a9e] text-xs">CAGE Code</span>
                  </div>
                  <p className="text-white text-sm font-medium font-mono">{cage}</p>
                </div>
              )}
            </div>

            {/* Availability */}
            {avail && (
              <div className="bg-[#0d1e42] border border-[#1a2f4a] rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white text-sm font-semibold">Availability</h3>
                  <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${avail.color}`}>
                    <avail.icon className="w-3.5 h-3.5" />
                    {avail.label}
                  </span>
                </div>
                {quantity > 0 && (
                  <p className="text-[#5a7a9e] text-sm">
                    <span className="text-white font-semibold">{quantity.toLocaleString()}</span> units available
                  </p>
                )}
                {leadTime && (
                  <p className="text-[#5a7a9e] text-sm mt-1">
                    Lead Time: <span className="text-[#f59e0b] font-medium">{leadTime}</span>
                  </p>
                )}
              </div>
            )}

            {/* Description context (SEO metadata from CMS) */}
            {descriptionContext && Object.keys(descriptionContext).length > 0 && (
              <div className="bg-[#0d1e42] border border-[#1a2f4a] rounded-xl p-5">
                <h3 className="text-white text-sm font-semibold mb-3">About This Part</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(descriptionContext).map(([key, val]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-[#4a6a8e] text-xs capitalize">{key.replace(/_/g, " ")}</span>
                      <span className="text-[#8aa3c2] text-sm" style={msFont}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="flex-1 flex items-center justify-center gap-2 bg-[#1a6fff] hover:bg-[#0f5ce8] text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-[#1a6fff]/25"
              >
                <Send className="w-4 h-4" />
                Request a Quote
              </Link>
              <Link
                href="/products"
                className="flex-1 flex items-center justify-center gap-2 bg-[#0d1e42] border border-[#1a2f4a] hover:border-[#1a6fff]/40 text-[#8aa3c2] hover:text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Catalog
              </Link>
            </div>
          </div>
        </div>

        {/* Specs table */}
        {Object.keys(specs).length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-display font-bold text-white mb-5">Technical Specifications</h2>
            <div className="bg-[#0d1e42] border border-[#1a2f4a] rounded-xl overflow-hidden">
              <table className="w-full">
                <tbody>
                  {Object.entries(specs).map(([key, val], i) => (
                    <tr key={key} className={i % 2 === 0 ? "bg-[#0d1e42]" : "bg-[#0a1535]/50"}>
                      <td className="px-5 py-3.5 text-[#5a7a9e] text-sm font-medium w-1/3">{key}</td>
                      <td className="px-5 py-3.5 text-white text-sm font-mono">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Additional Details — any remaining API fields */}
        {additionalFields.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-display font-bold text-white mb-5">Additional Details</h2>
            <div className="bg-[#0d1e42] border border-[#1a2f4a] rounded-xl overflow-hidden">
              <table className="w-full">
                <tbody>
                  {additionalFields.map(([label, val], i) => (
                    <tr key={label} className={i % 2 === 0 ? "bg-[#0d1e42]" : "bg-[#0a1535]/50"}>
                      <td className="px-5 py-3.5 text-[#5a7a9e] text-sm font-medium w-1/3">{label}</td>
                      <td className="px-5 py-3.5 text-white text-sm">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Manufacturers in this category (paginated) ── */}
        {categoryId && <CategoryManufacturers categoryId={categoryId} />}
      </div>
    </div>
  );
}
