"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useSmartPagination } from "@/hooks/useSmartPagination";
import Pagination from "../ui/Pagination";
import { SECTION_PAGE_PARAMS } from "@/lib/smart-listing/constants";
import type { PaginatedResponse, PaginationState, PartTypeItem } from "@/lib/smart-listing/types";

const msFont = { fontFamily: "'Microsoft Sans Serif', sans-serif" } as React.CSSProperties;

interface PartTypesGridProps {
  initialData: PartTypeItem[];
  initialPagination: PaginationState;
  fetchPage: (page: number, cursor?: string) => Promise<PaginatedResponse<PartTypeItem>>;
}

export default function PartTypesGrid({
  initialData,
  initialPagination,
  fetchPage,
}: PartTypesGridProps) {
  const { data, pagination, loading, handlePageChange } = useSmartPagination({
    initialData,
    initialPagination,
    fetchPage,
    pageParamKey: SECTION_PAGE_PARAMS.partTypes,
  });

  if (data.length === 0 && !loading) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-lg font-semibold" style={msFont}>Part Types</h2>
        {pagination.totalItems > 0 && (
          <span className="text-[#4a6a8e] text-xs" style={msFont}>
            {pagination.totalItems.toLocaleString()} part types
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
            {data.map((pt) => (
              <Link
                key={pt.id}
                href={`/products?partType=${pt.slug}`}
                className="px-4 py-3 rounded-lg border border-[#1a2f4a]/60 hover:border-[#1a6fff]/40 hover:bg-white/[0.02] transition-all group"
              >
                <p className="text-[#8aa3c2] group-hover:text-white text-sm truncate transition-colors" style={msFont}>
                  {pt.name}
                </p>
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
