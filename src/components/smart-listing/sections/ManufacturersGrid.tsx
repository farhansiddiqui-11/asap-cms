"use client";

import Link from "next/link";
import { Building2, Loader2 } from "lucide-react";
import { useSmartPagination } from "@/hooks/useSmartPagination";
import Pagination from "../ui/Pagination";
import { SECTION_PAGE_PARAMS } from "@/lib/smart-listing/constants";
import type { PaginatedResponse, PaginationState, ManufacturerItem } from "@/lib/smart-listing/types";

const msFont = { fontFamily: "'Microsoft Sans Serif', sans-serif" } as React.CSSProperties;

interface ManufacturersGridProps {
  initialData: ManufacturerItem[];
  initialPagination: PaginationState;
  fetchPage: (page: number, cursor?: string) => Promise<PaginatedResponse<ManufacturerItem>>;
}

export default function ManufacturersGrid({
  initialData,
  initialPagination,
  fetchPage,
}: ManufacturersGridProps) {
  const { data, pagination, loading, handlePageChange } = useSmartPagination({
    initialData,
    initialPagination,
    fetchPage,
    pageParamKey: SECTION_PAGE_PARAMS.manufacturers,
  });

  if (data.length === 0 && !loading) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-lg font-semibold" style={msFont}>Manufacturers</h2>
        {pagination.totalItems > 0 && (
          <span className="text-[#4a6a8e] text-xs" style={msFont}>
            {pagination.totalItems.toLocaleString()} manufacturers
          </span>
        )}
      </div>

      {loading && data.length === 0 ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-5 h-5 text-[#1a6fff] animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {data.map((mfr) => (
              <Link
                key={mfr.id}
                href={`/manufacturers/${mfr.slug}`}
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[#1a2f4a]/60 hover:border-[#1a6fff]/40 hover:bg-white/[0.02] transition-all group"
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
