// ---------------------------------------------------------------------------
// API Proxy Route — /api/verticals
// ---------------------------------------------------------------------------
// Client-side fetches hit this proxy, which forwards to the CMS with the
// x-internal-key header. This keeps the API key server-side only.
// ---------------------------------------------------------------------------

import { NextRequest, NextResponse } from "next/server";

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL ?? "";
const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID ?? "";
const API_KEY = process.env.NEXT_PUBLIC_CMS_API_KEY ?? "";
const VERTICAL_ID = process.env.NEXT_PUBLIC_VERTICAL_ID ?? "";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  // Extract the path param — this is the verticals sub-path
  const path = searchParams.get("path") ?? "";
  searchParams.delete("path");

  // Inject verticalId if not provided
  if (!searchParams.has("verticalId") && VERTICAL_ID) {
    searchParams.set("verticalId", VERTICAL_ID);
  }

  const qs = searchParams.toString();
  const url = `${CMS_URL.replace(/\/+$/, "")}/api/sites/${SITE_ID}/verticals${path}${qs ? `?${qs}` : ""}`;

  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (API_KEY) {
    headers["x-internal-key"] = API_KEY;
  }

  try {
    const upstream = await fetch(url, { headers });
    const body = await upstream.text();

    return new NextResponse(body, {
      status: upstream.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err instanceof Error ? err.message : "Proxy error" },
      { status: 502 },
    );
  }
}
