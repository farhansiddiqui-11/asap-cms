"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useSmartPagination } from "@/hooks/useSmartPagination";
import Pagination from "../ui/Pagination";
import { SECTION_PAGE_PARAMS } from "@/lib/smart-listing/constants";
import type { PaginatedResponse, PaginationState, SubcategoryItem } from "@/lib/smart-listing/types";

const msFont = { fontFamily: "'Microsoft Sans Serif', sans-serif" } as React.CSSProperties;

interface SubcategoriesGridProps {
  initialData: SubcategoryItem[];
  initialPagination: PaginationState;
  fetchPage: (page: number, cursor?: string) => Promise<PaginatedResponse<SubcategoryItem>>;
  basePath?: string;
}

export default function SubcategoriesGrid({
  initialData,
  initialPagination,
  fetchPage,
  basePath = "/products",
}: SubcategoriesGridProps) {
  const { data, pagination, loading, handlePageChange } = useSmartPagination({
    initialData,
    initialPagination,
    fetchPage,
    pageParamKey: SECTION_PAGE_PARAMS.subcategories,
  });

  if (data.length === 0 && !loading) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-lg font-semibold" style={msFont}>Categories</h2>
        {pagination.totalItems > 0 && (
          <span className="text-[#4a6a8e] text-xs" style={msFont}>
            {pagination.totalItems.toLocaleString()} categories
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
            {data.map((cat) => (
              <Link
                key={cat.id}
                href={`${basePath}?category=${cat.slug}`}
                className="px-4 py-3 rounded-lg border border-[#1a2f4a]/60 hover:border-[#1a6fff]/40 hover:bg-white/[0.02] transition-all group"
              >
                <p className="text-[#8aa3c2] group-hover:text-white text-sm truncate transition-colors" style={msFont}>
                  {cat.name}
                </p>
                {cat.partsCount != null && cat.partsCount > 0 && (
                  <p className="text-[#4a6a8e] text-xs mt-0.5" style={msFont}>
                    {cat.partsCount.toLocaleString()} parts
                  </p>
                )}
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
