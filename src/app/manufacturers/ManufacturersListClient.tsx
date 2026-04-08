"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Search,
  Download,
  Package,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { useCmsData } from "@/hooks/useCmsData";
import type { CmsManufacturer } from "@/types/cms";
import type { VpcTemplate } from "@/types/vpc";

interface Props {
  vpc: VpcTemplate | null;
}

function ManufacturerRow({ mfr }: { mfr: CmsManufacturer }) {
  const name = (mfr.name ?? mfr.slug) as string;
  const headquarters = (mfr.headquarters ?? "") as string;
  const industries = (mfr.industries ?? []) as string[];
  const description = (mfr.description ?? "") as string;
  const partsCount = (mfr.partsCount ?? mfr.productCount ?? 0) as number;

  return (
    <tr className="border-b border-[#1a2f4a]/40 hover:bg-white/[0.02] transition-colors group">
      {/* Name */}
      <td className="px-5 py-4 w-[240px]">
        <Link href={`/manufacturers/${mfr.slug}`} className="block">
          <p
            className="text-white hover:text-[#1a6fff] transition-colors"
            style={{
              fontFamily: "'Microsoft Sans Serif', sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "20px",
            }}
          >
            {name}
          </p>
          {headquarters && (
            <p className="text-[#5a7a9e] text-xs mt-0.5">{headquarters}</p>
          )}
        </Link>
      </td>

      {/* Industries */}
      <td className="px-5 py-4 w-[220px]">
        <p
          className="text-[#8aa3c2] text-sm"
          style={{ fontFamily: "'Microsoft Sans Serif', sans-serif", fontSize: "13px" }}
        >
          {industries.slice(0, 2).join(", ")}
          {industries.length > 2 && ` +${industries.length - 2}`}
        </p>
      </td>

      {/* Description */}
      <td className="px-5 py-4">
        <p
          className="text-[#5a7a9e] text-sm line-clamp-1"
          style={{ fontFamily: "'Microsoft Sans Serif', sans-serif", fontSize: "13px", lineHeight: "20px" }}
        >
          {description}
        </p>
      </td>

      {/* Parts count */}
      <td className="px-5 py-4 w-[120px]">
        <div className="flex items-center gap-1.5 text-[#5a7a9e]">
          <Package className="w-3.5 h-3.5 text-[#1a6fff]" />
          <span
            className="text-sm"
            style={{ fontFamily: "'Microsoft Sans Serif', sans-serif", fontSize: "13px" }}
          >
            {partsCount.toLocaleString()}+
          </span>
        </div>
      </td>

      {/* Actions */}
      <td className="px-5 py-4 w-[100px]">
        <div className="flex items-center gap-2">
          <Link
            href={`/manufacturers/${mfr.slug}`}
            className="w-8 h-8 flex items-center justify-center rounded border border-[#1a2f4a] text-[#5a7a9e] hover:border-[#1a6fff]/40 hover:text-white transition-all"
            title="View Parts"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link
            href={`/products?manufacturer=${mfr.slug}`}
            className="w-8 h-8 flex items-center justify-center rounded bg-[#1a6fff] hover:bg-[#0f5ce8] text-white transition-colors"
            title="Browse Parts"
          >
            <Package className="w-3.5 h-3.5" />
          </Link>
        </div>
      </td>
    </tr>
  );
}

export default function ManufacturersListClient({ vpc }: Props) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  const { data: manufacturers, loading, pagination } = useCmsData<CmsManufacturer[]>(
    "/verticals/manufacturers",
    { limit: 20, q: searchInput || undefined },
  );

  const totalPages = pagination?.totalPages ?? 1;

  // Use VPC heading if available
  const heading = vpc?.heading || "Manufacturers";

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    // Search is already reactive via the hook params
  }

  return (
    <div className="min-h-screen bg-[#0F1D45] pt-[130px] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-[#4a6a8e] mb-6 pt-6">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#8aa3c2]">Manufacturers</span>
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
          <div className="border-b border-[#1a2f4a]/60">
            <div className="flex items-center justify-between px-5 py-4 cursor-pointer">
              <span
                className="text-white"
                style={{ fontFamily: "'Microsoft Sans Serif', sans-serif", fontSize: "15px", lineHeight: "22px" }}
              >
                Overview of Our Manufacturer Network
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
                  Our manufacturer network spans the world&apos;s leading electronic component producers, covering aerospace, defense, industrial, automotive, and commercial sectors. Each manufacturer in our catalog is vetted for quality, traceability, and compliance. We source directly from authorized channels and maintain certifications including AS9120B and ISO 9001:2015 to ensure every part meets the highest standards.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between px-5 py-4 cursor-pointer border-b border-[#1a2f4a]/60 hover:bg-white/[0.02] transition-colors">
            <span
              className="text-[#8aa3c2]"
              style={{ fontFamily: "'Microsoft Sans Serif', sans-serif", fontSize: "15px" }}
            >
              Browse by Industry
            </span>
            <ChevronDown className="w-4 h-4 text-[#5a7a9e]" />
          </div>

          <div className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-white/[0.02] transition-colors">
            <span
              className="text-[#8aa3c2]"
              style={{ fontFamily: "'Microsoft Sans Serif', sans-serif", fontSize: "15px" }}
            >
              Request Quotes from Specific Manufacturers
            </span>
            <ChevronDown className="w-4 h-4 text-[#5a7a9e]" />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            {["Industry", "Certification", "Region"].map((label) => (
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

          <form onSubmit={handleSearch} className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a6a8e]" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by manufacturer name or keyword..."
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
                  className="px-5 py-3.5 text-left text-[#4a6a8e] w-[240px]"
                  style={{ fontFamily: "'Microsoft Sans Serif', sans-serif", fontSize: "11px", letterSpacing: "0.08em" }}
                >
                  MANUFACTURER
                </th>
                <th
                  className="px-5 py-3.5 text-left text-[#4a6a8e] w-[220px]"
                  style={{ fontFamily: "'Microsoft Sans Serif', sans-serif", fontSize: "11px", letterSpacing: "0.08em" }}
                >
                  INDUSTRIES
                </th>
                <th
                  className="px-5 py-3.5 text-left text-[#4a6a8e]"
                  style={{ fontFamily: "'Microsoft Sans Serif', sans-serif", fontSize: "11px", letterSpacing: "0.08em" }}
                >
                  DESCRIPTION
                </th>
                <th
                  className="px-5 py-3.5 text-left text-[#4a6a8e] w-[120px]"
                  style={{ fontFamily: "'Microsoft Sans Serif', sans-serif", fontSize: "11px", letterSpacing: "0.08em" }}
                >
                  PARTS
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
                  <td colSpan={5} className="px-5 py-16 text-center">
                    <Loader2 className="w-6 h-6 text-[#1a6fff] animate-spin mx-auto" />
                  </td>
                </tr>
              ) : !manufacturers || manufacturers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center text-[#5a7a9e] text-sm">
                    No manufacturers found.
                  </td>
                </tr>
              ) : (
                manufacturers.map((mfr) => (
                  <ManufacturerRow key={mfr.id} mfr={mfr} />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-10">
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`w-9 h-9 flex items-center justify-center rounded text-sm font-medium transition-colors ${
                  p === 1
                    ? "bg-[#1a6fff] text-white"
                    : "border border-[#1a2f4a] text-[#8aa3c2] hover:border-[#1a6fff]/40 hover:text-white"
                }`}
                style={{ fontFamily: "'Microsoft Sans Serif', sans-serif" }}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
