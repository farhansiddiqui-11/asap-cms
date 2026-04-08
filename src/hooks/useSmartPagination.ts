"use client";

// ---------------------------------------------------------------------------
// useSmartPagination — Client-side pagination hook for Smart Listing sections
// ---------------------------------------------------------------------------
// Each section paginates independently with its own URL param key.
// Supports cursor-based pagination with fallback to offset-based.
// ---------------------------------------------------------------------------

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  PaginatedResponse,
  PaginationState,
  UseSmartPaginationConfig,
  UseSmartPaginationResult,
} from "@/lib/smart-listing/types";

export function useSmartPagination<T>(
  config: UseSmartPaginationConfig<T>,
): UseSmartPaginationResult<T> {
  const { initialData, initialPagination, fetchPage, pageParamKey } = config;

  const [data, setData] = useState<T[]>(initialData);
  const [pagination, setPagination] = useState<PaginationState>(initialPagination);
  const [loading, setLoading] = useState(false);

  // Cursor map: page number → cursor string (for cursor-based pagination)
  const cursorMap = useRef(new Map<number, string>());
  const abortRef = useRef<AbortController | null>(null);

  // Store initial cursor if present
  useEffect(() => {
    if (initialPagination.nextCursor) {
      cursorMap.current.set(initialPagination.page + 1, initialPagination.nextCursor);
    }
  }, [initialPagination]);

  // On mount: read URL param, if page > 1, fetch that page
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlPage = Number(params.get(pageParamKey));
    if (urlPage > 1 && urlPage !== initialPagination.page) {
      doFetch(urlPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doFetch = useCallback(
    async (page: number) => {
      // Abort any in-flight request
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);

      try {
        const cursor = cursorMap.current.get(page);
        const result: PaginatedResponse<T> = await fetchPage(page, cursor);

        if (controller.signal.aborted) return;

        setData(result.data);
        setPagination(result.pagination);

        // Store cursor for next page
        if (result.pagination.nextCursor) {
          cursorMap.current.set(
            result.pagination.page + 1,
            result.pagination.nextCursor,
          );
        }

        // Sync page to URL
        const url = new URL(window.location.href);
        if (page > 1) {
          url.searchParams.set(pageParamKey, String(page));
        } else {
          url.searchParams.delete(pageParamKey);
        }
        window.history.replaceState(null, "", url.toString());
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        // Keep current data on error
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    },
    [fetchPage, pageParamKey],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > pagination.totalPages) return;
      if (page === pagination.page && !loading) return;
      doFetch(page);
    },
    [doFetch, pagination.page, pagination.totalPages, loading],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  return { data, pagination, loading, handlePageChange };
}
