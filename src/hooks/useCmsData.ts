"use client";

// ---------------------------------------------------------------------------
// useCmsData — Reusable client-side data fetching hook for CMS Verticals API
// ---------------------------------------------------------------------------
// Handles loading, error, pagination (page-based & cursor-based), and
// provides loadMore / goToPage helpers.
//
// Usage:
//   const { data, loading, error, pagination, loadMore, goToPage } = useCmsData(
//     '/verticals/categories',
//     { verticalId, page: 1, limit: 20 }
//   );
// ---------------------------------------------------------------------------

import { useCallback, useEffect, useRef, useState } from "react";
import type { CmsApiResponse, CmsPagination } from "@/types/cms";
import { CmsApiError } from "@/lib/cms-api";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getCmsUrl(): string {
  const url = process.env.NEXT_PUBLIC_CMS_URL;
  if (!url) throw new Error("NEXT_PUBLIC_CMS_URL is not set");
  return url.replace(/\/+$/, "");
}

function getSiteId(): string {
  const id = process.env.NEXT_PUBLIC_SITE_ID;
  if (!id) throw new Error("NEXT_PUBLIC_SITE_ID is not set");
  return id;
}

function getVerticalId(): string {
  const id = process.env.NEXT_PUBLIC_VERTICAL_ID;
  if (!id) throw new Error("NEXT_PUBLIC_VERTICAL_ID is not set");
  return id;
}

function getApiKey(): string {
  return process.env.NEXT_PUBLIC_CMS_API_KEY ?? "";
}

function cmsHeaders(): HeadersInit {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  const key = getApiKey();
  if (key) {
    headers["x-internal-key"] = key;
  }
  return headers;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface UseCmsDataParams {
  [key: string]: unknown;
  verticalId?: string;
  page?: number;
  limit?: number;
  cursor?: string;
  skipCount?: boolean;
}

export interface UseCmsDataResult<T> {
  /** The data returned by the CMS (null until first successful fetch). */
  data: T | null;
  /** True while a request is in-flight. */
  loading: boolean;
  /** Error message from the most recent failed request, or null. */
  error: string | null;
  /** Pagination metadata returned by the CMS. */
  pagination: CmsPagination | null;
  /** Load the next page (cursor-based or page+1). Appends data for arrays. */
  loadMore: () => void;
  /** Jump to a specific page number (page-based pagination). */
  goToPage: (page: number) => void;
  /** Re-fetch the current page. */
  refetch: () => void;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Generic client-side data fetching hook for CMS Verticals API endpoints.
 *
 * @param path  — The endpoint path starting with `/verticals/...`
 * @param params — Query parameters. `verticalId` defaults to env var.
 *
 * @example
 * ```tsx
 * const { data, loading, error, pagination, loadMore, goToPage } = useCmsData<CmsCategory[]>(
 *   '/verticals/categories',
 *   { page: 1, limit: 20 }
 * );
 * ```
 */
export function useCmsData<T = unknown>(
  path: string,
  params?: UseCmsDataParams,
): UseCmsDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<CmsPagination | null>(null);

  // Internal state for current page / cursor (allows loadMore & goToPage to
  // work independently of the caller's params).
  const [currentPage, setCurrentPage] = useState(params?.page ?? 1);
  const [currentCursor, setCurrentCursor] = useState<string | null>(
    (params?.cursor as string) ?? null,
  );
  const [isAppending, setIsAppending] = useState(false);

  // Serialise incoming params (minus page/cursor which we control) so we can
  // detect when the *caller* changes filters / search terms.
  const stableParamsKey = JSON.stringify(
    (() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { page, cursor, ...rest } = params ?? {};
      return rest;
    })(),
  );

  // Reset to page 1 whenever the caller changes non-pagination params.
  const prevParamsKey = useRef(stableParamsKey);
  useEffect(() => {
    if (prevParamsKey.current !== stableParamsKey) {
      prevParamsKey.current = stableParamsKey;
      setCurrentPage(params?.page ?? 1);
      setCurrentCursor((params?.cursor as string) ?? null);
      setData(null);
      setIsAppending(false);
    }
  }, [stableParamsKey, params?.page, params?.cursor]);

  // Abort controller ref for request cancellation.
  const abortRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    // Cancel any in-flight request.
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      // Build query string.
      const merged: Record<string, unknown> = {
        verticalId: getVerticalId(),
        ...(params ?? {}),
        page: currentPage,
      };
      if (currentCursor) {
        merged.cursor = currentCursor;
      }
      // Remove undefined / null / empty values.
      const qs = new URLSearchParams();
      for (const [key, value] of Object.entries(merged)) {
        if (value !== undefined && value !== null && value !== "") {
          qs.set(key, String(value));
        }
      }
      const queryString = qs.toString();
      const url = `${getCmsUrl()}/api/sites/${getSiteId()}${path}${queryString ? `?${queryString}` : ""}`;

      const res = await fetch(url, { signal: controller.signal, headers: cmsHeaders() });
      const json: CmsApiResponse<T> = await res.json();

      if (!res.ok || json.success === false) {
        const errBody = json as unknown as { message?: string; statusCode?: number };
        throw new CmsApiError(
          errBody.statusCode ?? res.status,
          errBody.message ?? `Request failed: ${res.status}`,
        );
      }

      if (isAppending && Array.isArray(json.data)) {
        // Append mode: concat new items onto existing array data.
        setData((prev) => {
          if (Array.isArray(prev)) {
            return [...prev, ...(json.data as unknown[])] as unknown as T;
          }
          return json.data;
        });
      } else {
        setData(json.data);
      }

      setPagination(json.pagination ?? null);
      setIsAppending(false);
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError(
        err instanceof CmsApiError
          ? err.message
          : err instanceof Error
            ? err.message
            : "An unknown error occurred",
      );
      setIsAppending(false);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, stableParamsKey, currentPage, currentCursor, isAppending]);

  // Fetch whenever dependencies change.
  useEffect(() => {
    fetchData();
    return () => abortRef.current?.abort();
  }, [fetchData]);

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------

  /** Load next page — supports both cursor-based and page-based pagination. */
  const loadMore = useCallback(() => {
    if (!pagination) return;

    setIsAppending(true);

    if (pagination.nextCursor) {
      setCurrentCursor(pagination.nextCursor);
    } else if (currentPage < pagination.totalPages) {
      setCurrentPage((p) => p + 1);
    }
  }, [pagination, currentPage]);

  /** Jump to a specific page (page-based pagination). */
  const goToPage = useCallback((page: number) => {
    setCurrentCursor(null);
    setIsAppending(false);
    setCurrentPage(page);
  }, []);

  /** Re-run the current fetch. */
  const refetch = useCallback(() => {
    setIsAppending(false);
    fetchData();
  }, [fetchData]);

  return { data, loading, error, pagination, loadMore, goToPage, refetch };
}
