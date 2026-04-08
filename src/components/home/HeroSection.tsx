"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Shield, Globe, Clock } from "lucide-react";
import type { VpcTemplate } from "@/types/vpc";

export default function HeroSection({ vpc }: { vpc?: VpcTemplate | null }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/products");
    }
  };

  return (
    <section className="relative overflow-hidden" style={{ height: "100vh" }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/hero_bg.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0F1D45]/60" />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F1D45] to-transparent z-10" />

      {/* Content — centered in space below navbar (130px) */}
      <div
        className="relative z-10 flex flex-col items-center justify-center px-4"
        style={{ height: "calc(100vh - 130px)", marginTop: "130px" }}
      >
        {/* 1. Trust badge */}
        <div className="flex items-center gap-3" style={{ marginBottom: "50px" }}>
          <div style={{ width: "28px", height: "1px", background: "#BBD6FF59" }} />
          <span
            className="uppercase"
            style={{
              color: "#BBD6FF80",
              fontFamily: "'Microsoft Sans Serif', sans-serif",
              fontWeight: 300,
              fontSize: "11px",
              letterSpacing: "0.3em",
              lineHeight: "1",
            }}
          >
            {vpc?.headerImageAlt || "Trusted Distributor Since 1985"}
          </span>
          <div style={{ width: "28px", height: "1px", background: "#BBD6FF59" }} />
        </div>

        {/* 2. Headline */}
        <h1
          className="text-white text-center max-w-4xl"
          style={{
            marginBottom: "50px",
            fontFamily: "'Microsoft Sans Serif', sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "76.8px",
            lineHeight: "79.87px",
            letterSpacing: "-2.69px",
          }}
        >
          {vpc?.heading || "The Complete Part Purchasing Platform"}
        </h1>

        {/* 3. Subtitle */}
        <p
          className="max-w-xl text-center"
          style={{
            marginBottom: "50px",
            fontFamily: "'Microsoft Sans Serif', sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "16px",
            lineHeight: "28px",
            letterSpacing: "0px",
            color: "#BBD6FFBF",
          }}
        >
          {vpc?.description || "Search and source certified, traceable electronic and aerospace parts with rapid RFQ response and global fulfillment."}
        </p>

        {/* 4. Search */}
        <form
          onSubmit={handleSearch}
          className="flex w-full max-w-xl gap-0"
          style={{ height: "60px", marginBottom: "50px" }}
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a7a9e]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Part Number, NSN, or Keyword"
              className="w-full h-full pl-11 pr-4 bg-transparent border border-white/20 border-r-0 rounded-l-lg text-white placeholder-[#4a6a8e] text-sm outline-none focus:border-white/40 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="h-full px-6 bg-[#1a6fff] text-white font-semibold text-sm rounded-r-lg flex items-center gap-2 transition-all duration-200 flex-shrink-0"
            style={{ boxShadow: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0px 8px 20px 0px rgba(26,111,255,0.55)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            Search Parts
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 5. Quick stats */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          {[
            { icon: Shield, label: "AS9120B Certified" },
            { icon: Globe, label: "Global Fulfillment" },
            { icon: Clock, label: "Rapid RFQ Response" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-[#5a7a9e]">
              <Icon className="w-4 h-4 text-[#1a6fff]" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
