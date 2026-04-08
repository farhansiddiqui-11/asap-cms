"use client";

import Link from "next/link";
import { FileText, ShoppingCart, Loader2 } from "lucide-react";
import { useSmartPagination } from "@/hooks/useSmartPagination";
import Pagination from "../ui/Pagination";
import { SECTION_PAGE_PARAMS } from "@/lib/smart-listing/constants";
import type { PaginatedResponse, PaginationState, PartItem } from "@/lib/smart-listing/types";

const msFont = { fontFamily: "'Microsoft Sans Serif', sans-serif" } as React.CSSProperties;

interface PartsTableProps {
  initialData: PartItem[];
  initialPagination: PaginationState;
  fetchPage: (page: number, cursor?: string) => Promise<PaginatedResponse<PartItem>>;
}

function PartRow({ part }: { part: PartItem }) {
  return (
    <tr className="border-b border-[#1a2f4a]/40 hover:bg-white/[0.02] transition-colors">
      <td className="px-5 py-4 w-[220px]">
        <Link href={`/products/${part.slug}`} className="block">
          <p className="text-white hover:text-[#1a6fff] transition-colors" style={{ ...msFont, fontSize: "14px", lineHeight: "20px" }}>
            {part.partNumber}
          </p>
        </Link>
      </td>
      <td className="px-5 py-4 w-[200px]">
        {part.manufacturer ? (
          <Link
            href={`/manufacturers/${part.manufacturer.slug}`}
            className="text-[#8aa3c2] hover:text-white text-sm transition-colors"
            style={{ ...msFont, fontSize: "14px" }}
          >
            {part.manufacturer.name}
          </Link>
        ) : (
          <span className="text-[#5a7a9e] text-sm" style={msFont}>—</span>
        )}
      </td>
      <td className="px-5 py-4">
        <p className="text-[#5a7a9e] text-sm line-clamp-1" style={{ ...msFont, fontSize: "13px", lineHeight: "20px" }}>
          {part.name ?? part.description ?? part.partNumber}
        </p>
      </td>
      <td className="px-5 py-4 w-[100px]">
        <div className="flex items-center gap-2">
          <Link
            href={`/products/${part.slug}`}
            className="w-8 h-8 flex items-center justify-center rounded border border-[#1a2f4a] text-[#5a7a9e] hover:border-[#1a6fff]/40 hover:text-white transition-all"
            title="View Details"
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

export default function PartsTable({
  initialData,
  initialPagination,
  fetchPage,
}: PartsTableProps) {
  const { data, pagination, loading, handlePageChange } = useSmartPagination({
    initialData,
    initialPagination,
    fetchPage,
    pageParamKey: SECTION_PAGE_PARAMS.parts,
  });

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-lg font-semibold" style={msFont}>Parts</h2>
        {pagination.totalItems > 0 && (
          <span className="text-[#4a6a8e] text-xs" style={msFont}>
            {pagination.totalItems.toLocaleString()} parts
          </span>
        )}
      </div>

      <div className="rounded-lg overflow-hidden border border-[#1a2f4a]/60">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1a2f4a]/60">
              {["PART NUMBER", "MANUFACTURER", "DESCRIPTION", "ACTIONS"].map((h, i) => (
                <th
                  key={h}
                  className={`px-5 py-3.5 text-left text-[#4a6a8e] ${i === 0 ? "w-[220px]" : i === 1 ? "w-[200px]" : i === 3 ? "w-[100px]" : ""}`}
                  style={{ ...msFont, fontSize: "11px", letterSpacing: "0.08em" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && data.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-16 text-center">
                  <Loader2 className="w-6 h-6 text-[#1a6fff] animate-spin mx-auto" />
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-16 text-center text-[#5a7a9e] text-sm">
                  No parts found.
                </td>
              </tr>
            ) : (
              data.map((part) => <PartRow key={part.id} part={part} />)
            )}
          </tbody>
        </table>
      </div>

      {loading && data.length > 0 && (
        <div className="flex justify-center py-4">
          <Loader2 className="w-4 h-4 text-[#1a6fff] animate-spin" />
        </div>
      )}

      <Pagination pagination={pagination} loading={loading} onPageChange={handlePageChange} />
    </section>
  );
}
