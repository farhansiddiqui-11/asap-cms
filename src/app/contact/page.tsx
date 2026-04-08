import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import BrandMarquee from "@/components/home/BrandMarquee";
import USMap from "@/components/contact/USMap";
import { fetchVpcContent } from "@/lib/vpc";
import { resolveAllVpcTags } from "@/lib/vpc-tags";

export async function generateMetadata(): Promise<Metadata> {
  const verticalId = process.env.NEXT_PUBLIC_VERTICAL_ID;
  const vpc = await fetchVpcContent("RFQ", verticalId);

  if (!vpc) {
    return {
      title: "Contact Us",
      description: "Get in touch with ASAP Semiconductor for parts sourcing, RFQ requests, and customer support.",
    };
  }

  const resolved = resolveAllVpcTags(vpc, { vertical_name: verticalId });
  const meta: Metadata = { title: resolved.title ?? "Contact Us" };
  if (resolved.description) meta.description = resolved.description;
  if (resolved.keywords) meta.keywords = resolved.keywords;
  return meta;
}

const msFont = { fontFamily: "'Microsoft Sans Serif', sans-serif" } as React.CSSProperties;

const locations = [
  {
    label: "HEADQUARTERS",
    city: "Anaheim, CA",
    phone: "+1 (714) 705-4780",
  },
  {
    label: "WASHINGTON OFFICE",
    city: "Everett, WA",
    phone: "+1 (425) 386-2567",
  },
  {
    label: "GEORGIA OFFICE",
    city: "Macon, GA",
    phone: "+1 (478) 403-0109",
  },
];

export default async function ContactPage() {
  const verticalId = process.env.NEXT_PUBLIC_VERTICAL_ID;
  const vpc = await fetchVpcContent("RFQ", verticalId);
  const resolvedVpc = vpc
    ? resolveAllVpcTags(vpc, { vertical_name: verticalId })
    : null;

  let safeStructuredData: string | null = null;
  if (resolvedVpc?.structuredData) {
    try {
      safeStructuredData = JSON.stringify(JSON.parse(resolvedVpc.structuredData));
    } catch { /* skip */ }
  }

  return (
    <div className="min-h-screen bg-[#0F1D45]" style={{ paddingTop: "130px" }}>
      {safeStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeStructuredData }}
        />
      )}

      {/* ── HERO: Left text + Right form ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div className="pt-8">
              <h1
                className="text-white mb-5"
                style={{ ...msFont, fontWeight: 400, fontSize: "48px", lineHeight: "56px", letterSpacing: "-1px" }}
              >
                {resolvedVpc?.heading || <>Let&apos;s source it<br />together</>}
              </h1>
              <p style={{ ...msFont, color: "#5a7a9e", fontSize: "15px", lineHeight: "26px" }}>
                {resolvedVpc?.description || "Every great partnership starts with a conversation."}
              </p>
              {resolvedVpc?.content && (
                <div
                  className="mt-4 text-[#5a7a9e] text-sm leading-relaxed prose prose-invert prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: resolvedVpc.content }}
                />
              )}
            </div>

            {/* Right: Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── BRAND MARQUEE ── */}
      <BrandMarquee />

      {/* ── OUR LOCATIONS ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-5">
            <div style={{ width: "28px", height: "1px", background: "#BBD6FF59" }} />
            <span
              style={{ ...msFont, color: "#BBD6FF80", fontSize: "11px", letterSpacing: "0.3em", lineHeight: "1" }}
              className="uppercase"
            >
              Our Locations
            </span>
            <div style={{ width: "28px", height: "1px", background: "#BBD6FF59" }} />
          </div>

          {/* Title */}
          <h2
            className="mb-12"
            style={{ ...msFont, fontWeight: 400, fontSize: "38px", lineHeight: "48px", letterSpacing: "-0.4px" }}
          >
            <span className="text-white">Nationwide </span>
            <span style={{ color: "#5a7a9e" }}>Presence</span>
          </h2>

          {/* Map */}
          <div className="relative w-full overflow-hidden border border-[#1a2f4a]/40 mb-0" style={{ aspectRatio: "2/1", background: "#111d3e" }}>
            <USMap />
          </div>

          {/* Location cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-[#1a2f4a]/40 border-t-0">
            {locations.map((loc, i) => (
              <div
                key={loc.label}
                className="flex items-center gap-4 px-5 py-5"
                style={{ borderRight: i < 2 ? "1px solid rgba(26, 47, 74, 0.4)" : "none" }}
              >
                <div
                  className="w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 border border-[#1a2f4a]/60"
                >
                  <MapPin className="w-4 h-4 text-[#5a7a9e]" />
                </div>
                <div>
                  <p
                    className="uppercase"
                    style={{ ...msFont, color: "#1a6fff", fontSize: "10px", letterSpacing: "0.1em", lineHeight: "1", marginBottom: "4px" }}
                  >
                    {loc.label}
                  </p>
                  <p className="text-white" style={{ ...msFont, fontSize: "14px", lineHeight: "20px" }}>
                    {loc.city}
                  </p>
                  <p style={{ ...msFont, color: "#5a7a9e", fontSize: "12px", lineHeight: "18px" }}>
                    {loc.phone}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
