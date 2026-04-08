"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Phone,
  Mail,
  ShoppingCart,
  User,
  Search,
  FileText,
  Building2,
  Loader2,
} from "lucide-react";
import clsx from "clsx";
import { useCmsData } from "@/hooks/useCmsData";

const navLinkStyle: React.CSSProperties = {
  width: "85.77px",
  height: "36px",
  borderRadius: "4px",
  fontFamily: "'Microsoft Sans Serif', sans-serif",
  fontWeight: 400,
  fontStyle: "normal",
  fontSize: "14px",
  lineHeight: "20px",
  letterSpacing: "0px",
  textAlign: "center",
};

const msFont = { fontFamily: "'Microsoft Sans Serif', sans-serif" } as React.CSSProperties;

// ---------------------------------------------------------------------------
// Hierarchy types (matches CMS /verticals/hierarchy response)
// ---------------------------------------------------------------------------
interface HierarchyChild {
  id: string;
  name: string;
  slug: string;
  depth: number;
  children: HierarchyChild[];
  parentId?: number;
  numericId?: number;
  entityType?: string;
  verticalId?: string;
  totalChildren?: number;
  hasMoreChildren?: boolean;
}

interface HierarchyFlatItem {
  name: string;
  slug: string;
  entityType?: string;
  partsCount?: number;
}

interface HierarchyVertical {
  id: string;
  name: string;
  slug: string;
  order: number;
  hasMore: boolean;
  isActive: boolean;
  maxDepth: number;
  menuType: "category" | "manufacturer";
  flatItems: HierarchyFlatItem[];
  totalItems: number;
  viewMoreHref: string;
  rootCategories: HierarchyChild[];
}

interface HierarchyResponse {
  hierarchy: HierarchyVertical[];
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

// Manufacturer grouped response types
interface MfrLetterSection {
  letter: string;
  items: { name: string; slug: string }[];
  total: number;
}

interface MfrTabGroup {
  label: string;
  letterSections: MfrLetterSection[];
  total: number;
}

interface MfrGroupedResponse {
  tabGroups: MfrTabGroup[];
  total: number;
}

const leftLinks = [
  { label: "Products", href: "/products", hasDropdown: true, dropdownId: "products" as const },
  { label: "Manufacturer", href: "/manufacturers", hasDropdown: true, dropdownId: "manufacturers" as const },
  { label: "Services", href: "/services" },
];

const rightLinks = [
  { label: "About", href: "/about" },
  { label: "Quality", href: "/quality" },
  { label: "Contact", href: "/contact" },
];

const allLinks = [...leftLinks, ...rightLinks];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeVerticalIdx, setActiveVerticalIdx] = useState<number>(0);
  const [activeSubIdx, setActiveSubIdx] = useState<number>(0);
  const [activeMfrTab, setActiveMfrTab] = useState<number>(0);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch hierarchy data from CMS
  const { data: hierarchyData, loading: hierarchyLoading } = useCmsData<HierarchyResponse>(
    "/verticals/hierarchy",
  );
  const verticals = hierarchyData?.hierarchy ?? [];

  // Fetch grouped manufacturers from CMS
  const { data: mfrGroupedData, loading: mfrLoading } = useCmsData<MfrGroupedResponse>(
    "/verticals/manufacturers/grouped",
    { previewLimit: 10 },
  );

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close on route change
  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
    if (id === "products") {
      setActiveVerticalIdx(0);
      setActiveSubIdx(0);
    }
  };

  // Current vertical for the mega menu
  const activeVertical: HierarchyVertical | undefined = verticals[activeVerticalIdx];

  // Column 2 items depend on menuType
  const col2Items: { name: string; slug: string; hasChildren: boolean; children: HierarchyChild[] }[] =
    activeVertical?.menuType === "category"
      ? (activeVertical.rootCategories ?? []).map((rc) => ({
          name: rc.name,
          slug: rc.slug,
          hasChildren: rc.children.length > 0,
          children: rc.children,
        }))
      : (activeVertical?.flatItems ?? []).map((fi) => ({
          name: fi.name,
          slug: fi.slug,
          hasChildren: false,
          children: [],
        }));

  // Column 3 items (children of selected col2 item)
  const activeCol2 = col2Items[activeSubIdx];
  const col3Items: HierarchyChild[] = activeCol2?.children ?? [];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F1D45]" ref={dropdownRef}>
      {/* ── TOP UTILITY BAR ── */}
      <div className="border-b border-[#1e2f5e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            <form action="/products" method="get" className="hidden sm:flex">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#4a6a8e]" />
                <input
                  name="search"
                  type="text"
                  placeholder="Search parts..."
                  className="h-7 pl-8 pr-3 bg-[#0a1628] border border-[#1e2f5e] rounded text-[#8aa3c2] placeholder-[#3a5a7e] text-xs outline-none focus:border-[#1a6fff]/50 transition-colors w-52"
                />
              </div>
            </form>

            <div className="flex items-center gap-4 ml-auto">
              <a
                href="tel:+17147054780"
                className="hidden md:flex items-center gap-1.5 text-[#6a8ab0] hover:text-white text-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#1a6fff]" />
                +1 (714) 705-4780
              </a>
              <div className="hidden md:block w-px h-4 bg-[#1e2f5e]" />
              <a
                href="mailto:sales@asapsemi.com"
                className="hidden md:flex items-center gap-1.5 text-[#6a8ab0] hover:text-white text-xs transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#1a6fff]" />
                sales@asapsemi.com
              </a>
              <div className="hidden md:block w-px h-4 bg-[#1e2f5e]" />
              <button className="text-[#6a8ab0] hover:text-white transition-colors p-1">
                <ShoppingCart className="w-4 h-4" />
              </button>
              <div className="w-px h-4 bg-[#1e2f5e]" />
              <button className="flex items-center gap-1.5 text-[#6a8ab0] hover:text-white text-xs transition-colors">
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
              <Link
                href="/contact"
                className="flex items-center gap-1.5 bg-[#1a5cd4] hover:bg-[#1550be] text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                Instant RFQ
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN NAV BAR ── */}
      <div className="border-b border-[#1e2f5e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:flex items-center justify-center" style={{ gap: "25px", height: "90px" }}>
            {leftLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => {
                  if (link.hasDropdown && link.dropdownId) {
                    toggleDropdown(link.dropdownId);
                  } else {
                    window.location.href = link.href;
                  }
                }}
                style={navLinkStyle}
                className={clsx(
                  "flex items-center justify-center gap-1 transition-colors flex-shrink-0 cursor-pointer",
                  "text-[#8aa3c2] hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
                {link.hasDropdown && (
                  openDropdown === (link as { dropdownId?: string }).dropdownId
                    ? <ChevronUp className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
                    : <ChevronDown className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
                )}
              </button>
            ))}

            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/asap_nav_logo.svg"
                alt="ASAP"
                width={120}
                height={40}
                priority
                className="h-9 w-auto"
              />
            </Link>

            {rightLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={navLinkStyle}
                className="flex items-center justify-center transition-colors flex-shrink-0 text-[#8aa3c2] hover:text-white hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile nav row */}
          <div className="lg:hidden flex items-center justify-between h-14">
            <Link href="/" className="flex items-center">
              <Image src="/asap_nav_logo.svg" alt="ASAP" width={100} height={34} priority className="h-8 w-auto" />
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-[#8aa3c2] hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── PRODUCTS MEGA DROPDOWN ── */}
      {openDropdown === "products" && (
        <div className="hidden lg:block bg-[#0a1535] border-b border-[#1e2f5e]">
          <div className="max-w-7xl mx-auto flex" style={{ minHeight: "400px" }}>
            {/* Column 1: Verticals */}
            <div className="w-[280px] border-r border-[#1e2f5e] py-5 px-2 overflow-y-auto" style={{ maxHeight: "500px" }}>
              {hierarchyLoading ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="w-5 h-5 text-[#1a6fff] animate-spin" />
                </div>
              ) : verticals.length === 0 ? (
                <p className="px-4 py-3 text-[#5a7a9e] text-xs">No verticals found.</p>
              ) : (
                verticals.map((v, i) => (
                  <button
                    key={v.id}
                    onMouseEnter={() => { setActiveVerticalIdx(i); setActiveSubIdx(0); }}
                    onClick={() => {
                      const href = v.menuType === "manufacturer"
                        ? `/manufacturers?vertical=${v.slug}`
                        : `/products?vertical=${v.slug}`;
                      window.location.href = href;
                    }}
                    className={clsx(
                      "w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors",
                      activeVerticalIdx === i
                        ? "bg-[#1a6fff]/10 text-[#1a6fff]"
                        : "text-[#8aa3c2] hover:text-white hover:bg-white/[0.03]"
                    )}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {v.menuType === "manufacturer" ? (
                        <Building2 className="w-3.5 h-3.5 flex-shrink-0 opacity-50" />
                      ) : (
                        <FileText className="w-3.5 h-3.5 flex-shrink-0 opacity-50" />
                      )}
                      <span className="truncate" style={{ ...msFont, fontSize: "13px", lineHeight: "20px" }}>{v.name}</span>
                    </div>
                    {(v.rootCategories.length > 0 || v.flatItems.length > 0) && (
                      <ChevronRight className="w-3.5 h-3.5 opacity-50 flex-shrink-0" />
                    )}
                  </button>
                ))
              )}

              {/* Separator + View all */}
              <div className="border-t border-[#1e2f5e] mt-4 pt-4 px-4">
                <Link
                  href="/products"
                  className="text-[#1a6fff] text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                  style={msFont}
                  onClick={() => setOpenDropdown(null)}
                >
                  View all products →
                </Link>
              </div>
            </div>

            {/* Column 2: Root categories or flat items for the hovered vertical */}
            <div className="w-[300px] border-r border-[#1e2f5e] py-5 px-2 overflow-y-auto" style={{ maxHeight: "500px" }}>
              {activeVertical && (
                <>
                  {/* Vertical header */}
                  <div className="px-4 pb-3 mb-1 border-b border-[#1e2f5e]/50">
                    <p className="text-white text-xs font-semibold uppercase tracking-wider" style={msFont}>
                      {activeVertical.name}
                    </p>
                    <p className="text-[#4a6a8e] text-xs mt-0.5 flex items-center gap-1.5" style={msFont}>
                      {activeVertical.menuType === "manufacturer" ? (
                        <>
                          <Building2 className="w-3 h-3" />
                          {activeVertical.totalItems > 0
                            ? `${activeVertical.totalItems.toLocaleString()} manufacturers`
                            : "Manufacturers"}
                        </>
                      ) : (
                        <>
                          <FileText className="w-3 h-3" />
                          Categories
                        </>
                      )}
                    </p>
                  </div>

                  {col2Items.length === 0 ? (
                    <p className="px-4 py-3 text-[#5a7a9e] text-xs">No items available.</p>
                  ) : (
                    col2Items.map((item, i) => (
                      <button
                        key={item.slug}
                        onMouseEnter={() => setActiveSubIdx(i)}
                        onClick={() => {
                          const href =
                            activeVertical.menuType === "category"
                              ? `/products?vertical=${activeVertical.slug}&category=${item.slug}`
                              : `/manufacturers/${item.slug}`;
                          window.location.href = href;
                        }}
                        className={clsx(
                          "w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-left transition-colors",
                          activeSubIdx === i
                            ? "bg-[#1a6fff]/10 text-[#1a6fff]"
                            : "text-[#8aa3c2] hover:text-white hover:bg-white/[0.03]"
                        )}
                      >
                        <span style={{ ...msFont, fontSize: "13px", lineHeight: "20px" }}>{item.name}</span>
                        {item.hasChildren && (
                          <ChevronRight className="w-3.5 h-3.5 opacity-50 flex-shrink-0" />
                        )}
                      </button>
                    ))
                  )}

                  {/* View more link */}
                  <div className="border-t border-[#1e2f5e] mt-3 pt-3 px-4">
                    <Link
                      href={
                        activeVertical.menuType === "manufacturer"
                          ? `/manufacturers?vertical=${activeVertical.slug}`
                          : `/products?vertical=${activeVertical.slug}`
                      }
                      className="text-[#1a6fff] text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                      style={msFont}
                      onClick={() => setOpenDropdown(null)}
                    >
                      {activeVertical.menuType === "manufacturer"
                        ? `All ${activeVertical.name} manufacturers →`
                        : `All ${activeVertical.name} categories →`}
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Column 3: Children of selected col2 item (category-type only) */}
            <div className="flex-1 py-5 px-6 overflow-y-auto" style={{ maxHeight: "500px" }}>
              {activeVertical?.menuType === "category" && activeCol2 && (
                <>
                  <p className="text-white mb-4" style={{ ...msFont, fontSize: "14px", fontWeight: 400, lineHeight: "20px" }}>
                    {activeCol2.name}
                  </p>
                  {col3Items.length > 0 ? (
                    <div className="flex flex-col gap-0.5">
                      {col3Items.map((child) => (
                        <Link
                          key={child.id}
                          href={`/products?vertical=${activeVertical.slug}&category=${child.slug}`}
                          className="text-[#8aa3c2] hover:text-[#1a6fff] text-sm transition-colors py-1.5 px-2 rounded hover:bg-white/[0.03]"
                          style={{ ...msFont, fontSize: "13px" }}
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[#4a6a8e] text-xs" style={msFont}>
                      No subcategories available.
                    </p>
                  )}
                </>
              )}

              {activeVertical?.menuType === "manufacturer" && activeCol2 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#0F1D45] border border-[#1a2f4a] flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-[#1a6fff]" />
                    </div>
                    <div>
                      <p className="text-white" style={{ ...msFont, fontSize: "14px", fontWeight: 400, lineHeight: "20px" }}>
                        {activeCol2.name}
                      </p>
                      <p className="text-[#4a6a8e] text-xs" style={msFont}>Manufacturer</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/manufacturers/${activeCol2.slug}`}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-[#1a2f4a] hover:border-[#1a6fff]/40 hover:bg-white/[0.02] transition-all text-[#8aa3c2] hover:text-white text-xs"
                      style={msFont}
                      onClick={() => setOpenDropdown(null)}
                    >
                      <Building2 className="w-3.5 h-3.5 text-[#1a6fff]" />
                      View manufacturer details
                    </Link>
                    <Link
                      href={`/products?manufacturer=${activeCol2.slug}`}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-[#1a2f4a] hover:border-[#1a6fff]/40 hover:bg-white/[0.02] transition-all text-[#8aa3c2] hover:text-white text-xs"
                      style={msFont}
                      onClick={() => setOpenDropdown(null)}
                    >
                      <FileText className="w-3.5 h-3.5 text-[#1a6fff]" />
                      Browse parts by this manufacturer
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── MANUFACTURERS MEGA DROPDOWN ── */}
      {openDropdown === "manufacturers" && (
        <div className="hidden lg:block bg-[#0a1535] border-b border-[#1e2f5e]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {mfrLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-6 h-6 text-[#1a6fff] animate-spin" />
              </div>
            ) : !mfrGroupedData ? (
              <p className="text-[#5a7a9e] text-sm py-10 text-center">No manufacturers found.</p>
            ) : (
              <>
                {/* Tab bar (A-E, F-J, etc.) */}
                <div className="flex items-center gap-1 mb-5 border-b border-[#1e2f5e] pb-3">
                  {mfrGroupedData.tabGroups.map((tab, i) => (
                    <button
                      key={tab.label}
                      onClick={() => setActiveMfrTab(i)}
                      className={clsx(
                        "px-3 py-1.5 rounded text-xs font-medium transition-colors",
                        activeMfrTab === i
                          ? "bg-[#1a6fff]/15 text-[#1a6fff]"
                          : "text-[#6a8ab0] hover:text-white hover:bg-white/[0.03]"
                      )}
                      style={msFont}
                    >
                      {tab.label}
                      <span className="ml-1 text-[#4a6a8e]">({tab.total.toLocaleString()})</span>
                    </button>
                  ))}
                  <div className="ml-auto text-[#4a6a8e] text-xs" style={msFont}>
                    {mfrGroupedData.total.toLocaleString()} total manufacturers
                  </div>
                </div>

                {/* Letter sections for active tab */}
                <div className="grid grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-5" style={{ maxHeight: "380px", overflowY: "auto" }}>
                  {mfrGroupedData.tabGroups[activeMfrTab]?.letterSections.map((section) => (
                    <div key={section.letter}>
                      <div className="flex items-baseline gap-2 mb-2 border-b border-[#1e2f5e]/50 pb-1.5">
                        <span className="text-[#1a6fff] text-sm font-bold" style={msFont}>{section.letter.toUpperCase()}</span>
                        <span className="text-[#4a6a8e] text-xs" style={msFont}>{section.total.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        {section.items.map((mfr) => (
                          <Link
                            key={mfr.slug}
                            href={`/manufacturers/${mfr.slug}`}
                            onClick={() => setOpenDropdown(null)}
                            className="text-[#8aa3c2] hover:text-white text-xs transition-colors py-1 truncate"
                            style={msFont}
                          >
                            {mfr.name}
                          </Link>
                        ))}
                        {section.total > section.items.length && (
                          <Link
                            href={`/manufacturers?letter=${section.letter}`}
                            onClick={() => setOpenDropdown(null)}
                            className="text-[#1a6fff] text-xs mt-1 hover:underline"
                            style={msFont}
                          >
                            +{(section.total - section.items.length).toLocaleString()} more
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* View all link */}
                <div className="flex justify-end mt-5 pt-4 border-t border-[#1e2f5e]">
                  <Link
                    href="/manufacturers"
                    className="text-[#1a6fff] text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                    style={msFont}
                    onClick={() => setOpenDropdown(null)}
                  >
                    View All Manufacturers →
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0F1D45] border-b border-[#1e2f5e]">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-0.5">
            {allLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors text-[#8aa3c2] hover:text-white hover:bg-white/5"
              >
                {link.label}
                {(link as { hasDropdown?: boolean }).hasDropdown && (
                  <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                )}
              </Link>
            ))}
            <div className="mt-2 pt-2 border-t border-[#1e2f5e] flex flex-col gap-2">
              <div className="flex items-center gap-3 px-4 py-2">
                <a href="tel:+17147054780" className="flex items-center gap-1.5 text-[#6a8ab0] text-xs">
                  <Phone className="w-3.5 h-3.5 text-[#1a6fff]" />
                  +1 (714) 705-4780
                </a>
              </div>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mx-4 flex items-center justify-center gap-2 bg-[#1a5cd4] text-white px-4 py-2.5 rounded-lg text-sm font-semibold"
              >
                <FileText className="w-4 h-4" />
                Instant RFQ
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
