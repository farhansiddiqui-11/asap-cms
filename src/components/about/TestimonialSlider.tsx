"use client";

import { useState } from "react";
import { Star, ArrowRight, ArrowLeft } from "lucide-react";

const msFont = { fontFamily: "'Microsoft Sans Serif', sans-serif" } as React.CSSProperties;

const testimonials = [
  {
    quote: "I was looking for rare military-grade components, and ASAP Semiconductor not only found them but delivered with full traceability and documentation. Their service is exceptional.",
    name: "Sarah Mitchell",
    role: "Procurement Manager",
    company: "Global Aerospace Operations",
  },
  {
    quote: "ASAP Semiconductor has been our go-to supplier for over five years. Their ability to source obsolete and hard-to-find parts consistently saves us weeks of downtime. Truly reliable partners.",
    name: "James Rodriguez",
    role: "Supply Chain Director",
    company: "Northstar Defense Systems",
  },
  {
    quote: "Their team went above and beyond to find discontinued avionics parts for our fleet. The turnaround was faster than any other distributor we've worked with. Highly recommended.",
    name: "Emily Chen",
    role: "VP of Operations",
    company: "Pacific Aviation Group",
  },
  {
    quote: "We needed certified components for a critical defense contract with zero margin for error. ASAP delivered authentic, fully traceable parts on time, every single time.",
    name: "Mark Thompson",
    role: "Chief Engineer",
    company: "Sentinel Defense Corp",
  },
];

function ReviewCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div className="flex flex-col">
      {/* Stars */}
      <div className="flex items-center gap-1 mb-5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-[#1a6fff] fill-current" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="mb-5 flex-1">
        <p style={{ ...msFont, color: "#E8F4FFD9", fontSize: "15px", lineHeight: "26px" }}>
          &ldquo;{t.quote}&rdquo;
        </p>
      </blockquote>

      {/* Author */}
      <div>
        <p className="text-white" style={{ ...msFont, fontSize: "13px", lineHeight: "18px" }}>
          {t.name}
        </p>
        <p style={{ ...msFont, color: "#5a7a9e", fontSize: "12px" }}>
          {t.role}<br />{t.company}
        </p>
      </div>
    </div>
  );
}

export default function TestimonialSlider() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(testimonials.length / 2);

  const prev = () => setPage((p) => (p === 0 ? totalPages - 1 : p - 1));
  const next = () => setPage((p) => (p === totalPages - 1 ? 0 : p + 1));

  const pair = testimonials.slice(page * 2, page * 2 + 2);

  return (
    <div>
      {/* Two reviews side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {pair.map((t) => (
          <ReviewCard key={t.name} t={t} />
        ))}
      </div>

      {/* Nav arrows + pagination dots — bottom center */}
      <div className="flex items-center justify-center gap-4 mt-12">
        <button
          onClick={prev}
          className="w-8 h-8 flex items-center justify-center rounded border border-[#1a2f4a] text-[#5a7a9e] hover:border-[#1a6fff]/40 hover:text-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Pagination dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className="h-2 rounded-full transition-all"
              style={{
                background: page === i ? "#1a6fff" : "#1a2f4a",
                width: page === i ? "20px" : "8px",
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-8 h-8 flex items-center justify-center rounded border border-[#1a2f4a] text-[#5a7a9e] hover:border-[#1a6fff]/40 hover:text-white transition-all"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
