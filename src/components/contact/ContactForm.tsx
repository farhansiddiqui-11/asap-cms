"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const msFont = { fontFamily: "'Microsoft Sans Serif', sans-serif" } as React.CSSProperties;

const labelStyle = {
  ...msFont,
  color: "#4a6a8e",
  fontSize: "11px",
  letterSpacing: "0.08em",
  lineHeight: "1",
} as React.CSSProperties;

const inputStyle = {
  ...msFont,
  fontSize: "14px",
  lineHeight: "20px",
} as React.CSSProperties;

export default function ContactForm() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="bg-[#0a1535] border border-[#1a2f4a]/60 rounded-xl p-8">
      <h2
        className="text-white mb-2"
        style={{ ...msFont, fontWeight: 400, fontSize: "28px", lineHeight: "36px", letterSpacing: "-0.3px" }}
      >
        Send us a message
      </h2>
      <p className="mb-8" style={{ ...msFont, color: "#5a7a9e", fontSize: "13px", lineHeight: "22px" }}>
        Choose the type of inquiry and tell us more about what you need.
      </p>

      <form className="flex flex-col gap-5">
        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label style={labelStyle} className="uppercase">
            Full Name
          </label>
          <input
            type="text"
            placeholder="John"
            className="w-full h-12 px-4 bg-[#0F1D45] border border-[#1a2f4a] rounded-lg text-white placeholder-[#3a5a7e] outline-none focus:border-[#1a6fff]/50 transition-colors"
            style={inputStyle}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label style={labelStyle} className="uppercase">
            Email
          </label>
          <input
            type="email"
            placeholder="jon@doe.com"
            className="w-full h-12 px-4 bg-[#0F1D45] border border-[#1a2f4a] rounded-lg text-white placeholder-[#3a5a7e] outline-none focus:border-[#1a6fff]/50 transition-colors"
            style={inputStyle}
          />
        </div>

        {/* Inquiry Type */}
        <div className="flex flex-col gap-2">
          <label style={labelStyle} className="uppercase">
            Inquiry Type
          </label>
          <select
            className="w-full h-12 px-4 bg-[#0F1D45] border border-[#1a2f4a] rounded-lg text-white outline-none focus:border-[#1a6fff]/50 transition-colors appearance-none cursor-pointer"
            style={inputStyle}
            defaultValue=""
          >
            <option value="" disabled className="text-[#3a5a7e]">
              Type of service
            </option>
            <option value="parts-sourcing">Parts Sourcing</option>
            <option value="rfq">Request for Quote</option>
            <option value="bom-management">BOM Management</option>
            <option value="excess-inventory">Excess Inventory</option>
            <option value="quality">Quality Inspection</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Optional Note */}
        <div className="flex flex-col gap-2">
          <label style={labelStyle} className="uppercase">
            Optional Note
          </label>
          <textarea
            placeholder="Tell us about your project"
            rows={4}
            className="w-full px-4 py-3 bg-[#0F1D45] border border-[#1a2f4a] rounded-lg text-white placeholder-[#3a5a7e] outline-none focus:border-[#1a6fff]/50 transition-colors resize-none"
            style={inputStyle}
          />
        </div>

        {/* Agreement */}
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => setAgreed(!agreed)}
            className="w-5 h-5 mt-0.5 flex-shrink-0 rounded border border-[#1a2f4a] flex items-center justify-center transition-colors"
            style={{ background: agreed ? "#1a6fff" : "transparent" }}
          >
            {agreed && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <span style={{ ...msFont, color: "#5a7a9e", fontSize: "12px", lineHeight: "18px" }}>
            By sending this form, I agree to the{" "}
            <a href="#" className="text-white underline hover:text-[#1a6fff] transition-colors">Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="text-white underline hover:text-[#1a6fff] transition-colors">Privacy Policy</a>
          </span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-[#1a6fff] hover:bg-[#0f5ce8] text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 w-fit"
          style={msFont}
        >
          <Send className="w-4 h-4" />
          Send request
        </button>
      </form>
    </div>
  );
}
