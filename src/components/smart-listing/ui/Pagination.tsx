"use client";

import type { PaginationState } from "@/lib/smart-listing/types";

interface PaginationProps {
  pagination: PaginationState;
  loading?: boolean;
  onPageChange: (page: number) => void;
}

export default function Pagination({ pagination, loading, onPageChange }: PaginationProps) {
  const { page, totalPages } = pagination;
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("...");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  const msFont = { fontFamily: "'Microsoft Sans Serif', sans-serif" } as React.CSSProperties;

  return (
    <div className="flex items-center justify-center gap-1.5 mt-8">
      <button
        disabled={page <= 1 || loading}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1.5 rounded border border-[#1a2f4a] text-[#8aa3c2] hover:border-[#1a6fff]/40 hover:text-white text-xs transition-colors disabled:opacity-30 disabled:pointer-events-none"
        style={msFont}
      >
        Prev
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="w-8 h-8 flex items-center justify-center text-[#4a6a8e] text-sm">
            ...
          </span>
        ) : (
          <button
            key={p}
            disabled={loading}
            onClick={() => onPageChange(p)}
            className={`w-8 h-8 flex items-center justify-center rounded text-xs font-medium transition-colors ${
              page === p
                ? "bg-[#1a6fff] text-white"
                : "border border-[#1a2f4a] text-[#8aa3c2] hover:border-[#1a6fff]/40 hover:text-white"
            }`}
            style={msFont}
          >
            {p}
          </button>
        ),
      )}

      <button
        disabled={page >= totalPages || loading}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1.5 rounded border border-[#1a2f4a] text-[#8aa3c2] hover:border-[#1a6fff]/40 hover:text-white text-xs transition-colors disabled:opacity-30 disabled:pointer-events-none"
        style={msFont}
      >
        Next
      </button>

      {pagination.totalItems > 0 && (
        <span className="ml-3 text-[#4a6a8e] text-xs" style={msFont}>
          {pagination.totalItems.toLocaleString()} total
        </span>
      )}
    </div>
  );
}
