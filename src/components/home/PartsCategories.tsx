"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Plus, X } from "lucide-react";
import { useCmsData } from "@/hooks/useCmsData";
import type { CmsCategory } from "@/types/cms";

function AccordionItem({
  cat,
  index,
  isOpen,
  onToggle,
}: {
  cat: CmsCategory;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const name = (cat.name ?? cat.slug) as string;
  const description = (cat.description ?? "") as string;
  const productCount = (cat.productCount ?? cat.partsCount ?? 0) as number;

  return (
    <div
      style={{
        background: "transparent",
        borderTop: index === 0 ? "1px solid #BBD6FF80" : "none",
        borderBottom: "1px solid #BBD6FF80",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span
          style={{
            color: isOpen ? "#E8F4FFD9" : "#8aa3c2",
            fontFamily: "'Microsoft Sans Serif', sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "18.4px",
            lineHeight: "27.6px",
            letterSpacing: "0px",
            transition: "color 0.3s ease",
          }}
        >
          {name}
        </span>
        <div
          className="flex-shrink-0"
          style={{ transition: "transform 0.3s ease", transform: isOpen ? "rotate(0deg)" : "rotate(0deg)" }}
        >
          <div
            style={{
              transition: "opacity 0.2s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isOpen ? (
              <X className="w-4 h-4 text-white" />
            ) : (
              <Plus className="w-4 h-4 text-[#5a7a9e]" />
            )}
          </div>
        </div>
      </button>

      {/* Animated content panel */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div ref={contentRef} className="px-5 pb-5">
            <p
              className="text-[#5a7a9e] mb-3"
              style={{
                fontFamily: "'Microsoft Sans Serif', sans-serif",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "14.08px",
                lineHeight: "23.23px",
                letterSpacing: "0px",
              }}
            >
              {description}
            </p>
            <div className="flex items-baseline gap-1.5">
              <span
                className="text-white"
                style={{
                  fontFamily: "'Microsoft Sans Serif', sans-serif",
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "44.8px",
                  lineHeight: "49.28px",
                  letterSpacing: "0px",
                }}
              >
                {productCount >= 1000
                  ? (productCount / 1000).toFixed(0) + "K+"
                  : productCount.toLocaleString() + "+"}
              </span>
              <span className="text-[#5a7a9e] text-xs">In Stock</span>
            </div>
            <Link
              href={`/products?category=${cat.slug}`}
              className="mt-3 inline-flex items-center gap-1.5 text-[#1a6fff] text-xs font-semibold hover:gap-2 transition-all"
            >
              Browse {name} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PartsCategories() {
  const [openId, setOpenId] = useState<string | null>(null);

  const { data: categories, loading } = useCmsData<CmsCategory[]>(
    "/verticals/categories",
    { limit: 20 },
  );

  // Default-open the first category once loaded.
  const cats = categories ?? [];
  if (cats.length > 0 && openId === null) {
    // Will trigger a re-render to open the first item.
    setTimeout(() => setOpenId(cats[0].id), 0);
  }

  return (
    <section className="py-20 bg-[#0F1D45]">
      <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-14">
          <h2 className="text-3xl sm:text-4xl font-display text-white">
            Find the Parts You Need
          </h2>
          <p className="text-[#5a7a9e] text-sm leading-relaxed sm:max-w-sm">
            Access millions of electronic components through our streamlined sourcing process and export procurement services.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* Left: Image — 35% */}
          <div className="relative lg:w-[35%] w-full">
            <div className="rounded-xl overflow-hidden h-full min-h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=700&h=500&fit=crop&q=80"
                alt="Parts procurement specialists"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0a1535]/60 to-transparent" />
            </div>
            <Link
              href="/products"
              className="absolute bottom-5 left-5 bg-[#0d1e42]/90 backdrop-blur-sm border border-[#1a3055] text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:border-[#1a6fff]/40 transition-colors"
            >
              See All →
            </Link>
          </div>

          {/* Right: Accordion — 65% */}
          <div className="flex flex-col gap-0 overflow-hidden h-full lg:w-[65%] w-full">
            {loading ? (
              <div className="flex items-center justify-center py-20 text-[#5a7a9e] text-sm">
                Loading categories...
              </div>
            ) : (
              cats.map((cat, index) => (
                <AccordionItem
                  key={cat.id}
                  cat={cat}
                  index={index}
                  isOpen={openId === cat.id}
                  onToggle={() => setOpenId(openId === cat.id ? null : cat.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
