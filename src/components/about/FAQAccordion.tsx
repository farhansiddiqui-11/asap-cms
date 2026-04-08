"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

const msFont = { fontFamily: "'Microsoft Sans Serif', sans-serif" } as React.CSSProperties;

const faqs = [
  {
    question: "What industries does ASAP Semiconductor serve?",
    answer: "We serve a wide range of industries including aerospace, defense, commercial aviation, marine, industrial automation, telecommunications, and medical electronics. Our expertise spans both government and private sector applications.",
  },
  {
    question: "Are your electronic components authentic and certified?",
    answer: "Yes. Every component we supply undergoes rigorous quality inspection and testing. We maintain AS9120B and ISO 9001:2015 certifications, and source exclusively through authorized and traceable supply chains.",
  },
  {
    question: "How quickly can you fulfil an order?",
    answer: "We offer same-day shipping on many in-stock items. For sourced components, typical lead times range from 2–5 business days depending on availability and location. Expedited options are available for urgent AOG situations.",
  },
  {
    question: "Do you handle hard to find or obsolete components?",
    answer: "Absolutely. Sourcing hard-to-find, obsolete, and end-of-life components is one of our core specialties. Our global network and deep industry relationships allow us to locate parts that others can't.",
  },
  {
    question: "What certifications does ASAP Semiconductor hold?",
    answer: "We hold AS9120B, ISO 9001:2015, and FAA AC 00-56B certifications. We are also a member of ERAI and GIDEP, ensuring full traceability and compliance with industry standards.",
  },
  {
    question: "How do I request a quote?",
    answer: "You can request a quote through our website by submitting a part number, contacting our sales team directly, or sending us an email. We typically respond within 15 minutes during business hours.",
  },
];

export default function FAQAccordion() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-0 border-t border-[#BBD6FF26]">
      {faqs.map((faq, i) => (
        <div key={i} style={{ borderBottom: "1px solid #BBD6FF26" }}>
          <button
            onClick={() => setOpenId(openId === i ? null : i)}
            className="w-full flex items-center justify-between py-4 text-left"
          >
            <span
              style={{
                ...msFont,
                color: openId === i ? "#E8F4FFD9" : "#8aa3c2",
                fontSize: "14px",
                lineHeight: "22px",
                transition: "color 0.3s ease",
              }}
            >
              {faq.question}
            </span>
            <div className="flex-shrink-0 ml-4">
              {openId === i ? (
                <X className="w-4 h-4 text-white" />
              ) : (
                <Plus className="w-4 h-4 text-[#5a7a9e]" />
              )}
            </div>
          </button>

          {/* Animated content */}
          <div
            style={{
              display: "grid",
              gridTemplateRows: openId === i ? "1fr" : "0fr",
              transition: "grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div style={{ overflow: "hidden" }}>
              <p
                className="pb-5"
                style={{ ...msFont, color: "#5a7a9e", fontSize: "13px", lineHeight: "22px" }}
              >
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
