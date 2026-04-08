"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Search,
  Download,
  FileText,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import { useCmsData } from "@/hooks/useCmsData";
import type { CmsPart, CmsCategory } from "@/types/cms";
import type { VpcTemplate } from "@/types/vpc";

interface Props {
  vpc: VpcTemplate | null;
}

function ProductRow({ product }: { product: CmsPart }) {
  const partNumber = (product.partNumber ?? product.name ?? product.slug) as string;
  const mfr = product.manufacturer as { id?: string; name?: string; slug?: string } | string | undefined;
  const manufacturer = typeof mfr === "object" && mfr ? (mfr.name ?? "") : (mfr ?? "") as string;
  const manufacturerSlug = typeof mfr === "object" && mfr ? (mfr.slug ?? "") : ((product.manufacturerSlug ?? "") as string);
  const slug = (product.skuUrl ?? product.slug) as string;
  const specs = (product.specs ?? {}) as Record<string, string>;
  const pkg = specs["Package"] ?? "";

  return (
    <tr className="border-b border-[#1a2f4a]/40 hover:bg-white/[0.02] transition-colors group">
      {/* Part Number */}
      <td className="px-5 py-4 w-[220px]">
        <Link href={`/products/${(product.skuUrl ?? product.slug) as string}`} className="block">
          <p
            className="text-white hover:text-[#1a6fff] transition-colors"
            style={{
              fontFamily: "'Microsoft Sans Serif', sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "20px",
            }}
          >
            {partNumber}
          </p>
          {pkg && (
            <p className="text-[#5a7a9e] text-xs mt-0.5">{pkg}</p>
          )}
        </Link>
      </td>

      {/* Manufacturer */}
      <td className="px-5 py-4 w-[200px]">
        {manufacturerSlug ? (
          <Link
            href={`/manufacturers/${manufacturerSlug}`}
            className="text-[#8aa3c2] hover:text-white text-sm transition-colors"
            style={{ fontFamily: "'Microsoft Sans Serif', sans-serif", fontSize: "14px" }}
          >
            {manufacturer}
          </Link>
        ) : (
          <span
            className="text-[#8aa3c2] text-sm"
            style={{ fontFamily: "'Microsoft Sans Serif', sans-serif", fontSize: "14px" }}
          >
            {manufacturer}
          </span>
        )}
      </td>

      {/* Description */}
      <td className="px-5 py-4">
        <p
          className="text-[#5a7a9e] text-sm line-clamp-1"
          style={{ fontFamily: "'Microsoft Sans Serif', sans-serif", fontSize: "13px", lineHeight: "20px" }}
        >
          {(product.name as string) ?? partNumber} — {Object.entries(specs).slice(0, 3).map(([k, v]) => `${k}: ${v}`).join(", ")}
        </p>
      </td>

      {/* Actions */}
      <td className="px-5 py-4 w-[100px]">
        <div className="flex items-center gap-2">
          <Link
            href={`/products/${slug}`}
            className="w-8 h-8 flex items-center justify-center rounded border border-[#1a2f4a] text-[#5a7a9e] hover:border-[#1a6fff]/40 hover:text-white transition-all"
            title="View Datasheet"
          >
            <FileText className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/contact"
            className="w-8 h-8 flex items-center justify-center rounded bg-[#1a6fff] hover:bg-[#0f5ce8] text-white transition-colors"
            title="Request Quote"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
          </Link>
        </div>
      </td>
    </tr>
  );
}

function ProductsPageContent({ vpc }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchQuery = searchParams.get("search") ?? undefined;
  const categorySlug = searchParams.get("category") ?? undefined;
  const page = Number(searchParams.get("page")) || 1;

  const { data: partsResponse, loading, pagination } = useCmsData<{ parts: CmsPart[] }>(
    "/verticals/parts",
    {
      q: searchQuery,
      category: categorySlug,
      page,
      limit: 12,
    },
  );
  const products = partsResponse?.parts ?? [];

  const { data: categoriesData } = useCmsData<CmsCategory[]>(
    "/verticals/categories",
    { limit: 100 },
  );

  const totalPages = pagination?.totalPages ?? 1;

  const categoryName = categorySlug
    ? categoriesData?.find((c) => c.slug === categorySlug)?.name ?? categorySlug
    : "All Components";

  // Use VPC heading if available
  const heading = vpc?.heading || categoryName;

  // Search form handler
  const [searchInput, setSearchInput] = useState(searchQuery ?? "");
  useEffect(() => {
    setSearchInput(searchQuery ?? "");
  }, [searchQuery]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (categorySlug) params.set("category", categorySlug);
    if (searchInput) params.set("search", searchInput);
    router.push(`/products?${params.toString()}`);
  }

  function pageUrl(p: number) {
    const params = new URLSearchParams();
    if (categorySlug) params.set("category", categorySlug);
    if (searchQuery) params.set("search", searchQuery);
    params.set("page", String(p));
    return `/products?${params.toString()}`;
  }

  return (
    <div className="min-h-screen bg-[#0F1D45] pt-[130px] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-[#4a6a8e] mb-6 pt-6">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/products" className="hover:text-white transition-colors">Products</Link>
          {categorySlug && (
            <>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#8aa3c2]">{categoryName}</span>
            </>
          )}
        </div>

        {/* Page Title */}
        <div className="flex items-center justify-between mb-6">
          <h1
            className="text-white"
            style={{
              fontFamily: "'Microsoft Sans Serif', sans-serif",
              fontWeight: 400,
              fontSize: "32px",
              lineHeight: "40px",
              letterSpacing: "-0.5px",
            }}
          >
            {heading}
          </h1>
          <button className="flex items-center gap-2 px-4 py-2 rounded border border-[#1a2f4a] text-[#8aa3c2] hover:text-white hover:border-[#1a6fff]/40 text-sm transition-all">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        {/* Info Accordions — use VPC content if available */}
        <div className="mb-8 border border-[#1a2f4a]/60 rounded-lg overflow-hidden">
          {/* Open accordion */}
          <div className="border-b border-[#1a2f4a]/60">
            <div className="flex items-center justify-between px-5 py-4 cursor-pointer">
              <span
                className="text-white"
                style={{ fontFamily: "'Microsoft Sans Serif', sans-serif", fontSize: "15px", lineHeight: "22px" }}
              >
                Overview of {categoryName}
              </span>
              <ChevronUp className="w-4 h-4 text-[#5a7a9e]" />
            </div>
            <div className="px-5 pb-5">
              {vpc?.content ? (
                <div
                  className="text-[#5a7a9e] prose prose-invert prose-sm max-w-none"
                  style={{ fontFamily: "'Microsoft Sans Serif', sans-serif", fontSize: "13px", lineHeight: "22px" }}
                  dangerouslySetInnerHTML={{ __html: vpc.content }}
                />
              ) : (
                <p
                  className="text-[#5a7a9e]"
                  style={{ fontFamily: "'Microsoft Sans Serif', sans-serif", fontSize: "13px", lineHeight: "22px" }}
                >
                  Electronic components are essential parts used across a wide range of systems to support safe and efficient operations. These parts are commonly sourced for maintenance, repair, and overhaul (MRO) activities within commercial, defense, and industrial applications where performance, reliability, and system compatibility are critical. This catalog brings together available components to help buyers quickly locate parts relevant to their operational requirements.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between px-5 py-4 cursor-pointer border-b border-[#1a2f4a]/60 hover:bg-white/[0.02] transition-colors">
            <span
              className="text-[#8aa3c2]"
              style={{ fontFamily: "'Microsoft Sans Serif', sans-serif", fontSize: "15px" }}
            >
              Browse Available {categoryName}
            </span>
            <ChevronDown className="w-4 h-4 text-[#5a7a9e]" />
          </div>

          <div className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-white/[0.02] transition-colors">
            <span
              className="text-[#8aa3c2]"
              style={{ fontFamily: "'Microsoft Sans Serif', sans-serif", fontSize: "15px" }}
            >
              Request Quotes for {categoryName}
            </span>
            <ChevronDown className="w-4 h-4 text-[#5a7a9e]" />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
          {/* Filter dropdowns */}
          <div className="flex items-center gap-2 flex-wrap">
            {["Stock Status", "Manufacturer", "Price Range", "Condition"].map((label) => (
              <button
                key={label}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded border border-[#1a2f4a] text-[#8aa3c2] hover:border-[#1a6fff]/40 hover:text-white text-sm transition-all"
                style={{ fontFamily: "'Microsoft Sans Serif', sans-serif", fontSize: "13px" }}
              >
                {label}
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>
            ))}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a6a8e]" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by part number, manufacturer, or keyword..."
              className="w-full h-10 pl-10 pr-4 bg-transparent border border-[#1a2f4a] rounded text-white placeholder-[#4a6a8e] text-sm outline-none focus:border-[#1a6fff]/50 transition-colors"
              style={{ fontFamily: "'Microsoft Sans Serif', sans-serif", fontSize: "13px" }}
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
              <Search className="w-4 h-4 text-[#1a6fff]" />
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="rounded-lg overflow-hidden border border-[#1a2f4a]/60">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1a2f4a]/60">
                <th
                  className="px-5 py-3.5 text-left text-[#4a6a8e] w-[220px]"
                  style={{ fontFamily: "'Microsoft Sans Serif', sans-serif", fontSize: "11px", letterSpacing: "0.08em" }}
                >
                  PART NUMBER
                </th>
                <th
                  className="px-5 py-3.5 text-left text-[#4a6a8e] w-[200px]"
                  style={{ fontFamily: "'Microsoft Sans Serif', sans-serif", fontSize: "11px", letterSpacing: "0.08em" }}
                >
                  MANUFACTURER
                </th>
                <th
                  className="px-5 py-3.5 text-left text-[#4a6a8e]"
                  style={{ fontFamily: "'Microsoft Sans Serif', sans-serif", fontSize: "11px", letterSpacing: "0.08em" }}
                >
                  DESCRIPTION
                </th>
                <th
                  className="px-5 py-3.5 text-left text-[#4a6a8e] w-[100px]"
                  style={{ fontFamily: "'Microsoft Sans Serif', sans-serif", fontSize: "11px", letterSpacing: "0.08em" }}
                >
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-5 py-16 text-center">
                    <Loader2 className="w-6 h-6 text-[#1a6fff] animate-spin mx-auto" />
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-16 text-center text-[#5a7a9e] text-sm">
                    No parts found. Try adjusting your search.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <ProductRow key={product.id} product={product} />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-10">
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={pageUrl(p)}
                className={`w-9 h-9 flex items-center justify-center rounded text-sm font-medium transition-colors ${
                  page === p
                    ? "bg-[#1a6fff] text-white"
                    : "border border-[#1a2f4a] text-[#8aa3c2] hover:border-[#1a6fff]/40 hover:text-white"
                }`}
                style={{ fontFamily: "'Microsoft Sans Serif', sans-serif" }}
              >
                {p}
              </Link>
            ))}
            {totalPages > 4 && (
              <span className="w-9 h-9 flex items-center justify-center text-[#4a6a8e] text-sm">...</span>
            )}
            {totalPages > 3 && (
              <Link
                href={pageUrl(totalPages)}
                className="w-9 h-9 flex items-center justify-center rounded border border-[#1a2f4a] text-[#8aa3c2] hover:border-[#1a6fff]/40 hover:text-white text-sm transition-colors"
                style={{ fontFamily: "'Microsoft Sans Serif', sans-serif" }}
              >
                {totalPages}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsListClient({ vpc }: Props) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0F1D45] pt-[130px] pb-20 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#1a6fff] animate-spin" />
        </div>
      }
    >
      <ProductsPageContent vpc={vpc} />
    </Suspense>
  );
}
