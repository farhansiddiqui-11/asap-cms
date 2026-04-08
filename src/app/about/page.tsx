import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";
import TestimonialSlider from "@/components/about/TestimonialSlider";
import FAQAccordion from "@/components/about/FAQAccordion";
import Image from "next/image";
import aboutBanner from "../../../public/about_banner.png"
import aboutContainerLarge from "../../../public/about_banner_large.png"
import { fetchVpcContent } from "@/lib/vpc";
import { resolveAllVpcTags } from "@/lib/vpc-tags";

export async function generateMetadata(): Promise<Metadata> {
  const verticalId = process.env.NEXT_PUBLIC_VERTICAL_ID;
  const vpc = await fetchVpcContent("STATIC_PAGE", verticalId);

  if (!vpc) {
    return {
      title: "About Us",
      description: "ASAP Semiconductor — a leading global distributor of electronic components and semiconductors since 1985.",
    };
  }

  const resolved = resolveAllVpcTags(vpc, { vertical_name: verticalId });
  const meta: Metadata = { title: resolved.title ?? "About Us" };
  if (resolved.description) meta.description = resolved.description;
  if (resolved.keywords) meta.keywords = resolved.keywords;
  return meta;
}

const values = [
  {
    title: "Integrity",
    description: "We build trust through transparency, honesty, and accountability in every partnership.",
  },
  {
    title: "Insights",
    description: "We combine deep experience and domain expertise to deliver strategies that truly make an impact.",
  },
  {
    title: "Collaboration",
    description: "Inclusive growth requires that clients, teams, and separate come together.",
  },
  {
    title: "Excellence",
    description: "We pursue excellence in every detail, ensuring our work consistently meets the highest standards.",
  },
];

const teamMembers = [
  {
    name: "Robert Kravets",
    title: "Chief Executive Officer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&q=80",
  },
  {
    name: "David Hartman",
    title: "Chief Financial Officer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&q=80",
  },
  {
    name: "Michael Torres",
    title: "Chief Operations Officer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&q=80",
  },
  {
    name: "Sarah Mitchell",
    title: "Chief Revenue Officer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&q=80",
  },
];

const stats = [
  { value: "150+", label: "Million Parts Sold", description: "Across all product categories globally" },
  { value: "6+", label: "Active Parts", description: "Active parts in inventory at any time" },
  { value: "1,000+", label: "Happy Customers", description: "Customers served worldwide consistently" },
  { value: "125+", label: "Countries Covered", description: "Countries we deliver components to" },
];


const galleryImages = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&h=400&fit=crop&q=80",
];

const galleryImages2 = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=600&h=400&fit=crop&q=80",
];

const msFont = { fontFamily: "'Microsoft Sans Serif', sans-serif" } as React.CSSProperties;

export default async function AboutPage() {
  const verticalId = process.env.NEXT_PUBLIC_VERTICAL_ID;
  const vpc = await fetchVpcContent("STATIC_PAGE", verticalId);
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

      {/* ── 1. HERO ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Trusted badge */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div style={{ width: "28px", height: "1px", background: "#BBD6FF59" }} />
                <span style={{ ...msFont, color: "#BBD6FF80", fontSize: "11px", letterSpacing: "0.3em", lineHeight: "1" }} className="uppercase">
                  {resolvedVpc?.headerImageAlt || "Trusted Distributor Since 1985"}
                </span>
                <div style={{ width: "28px", height: "1px", background: "#BBD6FF59" }} />
              </div>
              <h1 className="text-white mb-5" style={{ ...msFont, fontWeight: 400, fontSize: "42px", lineHeight: "52px", letterSpacing: "-0.5px" }}>
                {resolvedVpc?.heading || <>ASAP Semiconductor<br />at a Glance</>}
              </h1>
              <p className="mb-6" style={{ ...msFont, color: "#BBD6FFBF", fontSize: "15px", lineHeight: "26px" }}>
                {resolvedVpc?.description || "A leading global distributor of electronic components and semiconductors. We specialize in aerospace, defense, and beyond since 1985."}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#1a6fff] hover:bg-[#0f5ce8] text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200"
                style={msFont}
              >
                <FileText className="w-4 h-4" />
                Get in Touch
              </Link>
            </div>
            <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
              <Image
                src={aboutBanner}
                alt="ASAP Semiconductor operations"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1D45]/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. OUR STORY ── */}
      <section className="py-16 border-t border-[#1a2f4a]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
            <h2 className="text-white" style={{ ...msFont, fontWeight: 400, fontSize: "38px", lineHeight: "48px", letterSpacing: "-0.4px" }}>
              Our Story
            </h2>
            {resolvedVpc?.content ? (
              <div
                className="prose prose-invert prose-sm max-w-none"
                style={{ ...msFont, color: "#BBD6FFBF", fontSize: "14px", lineHeight: "24px" }}
                dangerouslySetInnerHTML={{ __html: resolvedVpc.content }}
              />
            ) : (
              <p style={{ ...msFont, color: "#BBD6FFBF", fontSize: "14px", lineHeight: "24px" }}>
                Founded in 1985, ASAP Semiconductor has grown from a small components supplier into a globally recognized distributor serving aerospace, defense, and commercial industries. With decades of expertise, we&#39;ve built lasting partnerships rooted in trust, reliability, and an unwavering commitment to delivering authentic parts — exactly when they&#39;re needed.
              </p>
            )}
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ borderTop: "1px solid #BBD6FF26" }}>
            {[
              {
                label: "Our Mission",
                text: "To connect aerospace and defense industries with reliable access to authentic electronic components through transparent processes, rigorous quality control, and exceptional customer service.",
              },
              {
                label: "Our Vision",
                text: "To be the most trusted and efficient global supply chain partner, recognized for our dedication, integrity, and unwavering commitment to customer success.",
              },
            ].map((item, i) => (
              <div
                key={item.label}
                className="flex flex-col gap-3 py-8"
                style={{ borderLeft: i === 1 ? "1px solid #BBD6FF26" : "none", paddingLeft: i === 1 ? "32px" : "0" }}
              >
                <div className="flex items-center gap-1">
                  <div style={{ width: "4px", height: "28px", background: "rgba(44, 107, 201, 0.5)", borderRadius: "1px" }} />
                  <div style={{ width: "4px", height: "28px", background: "rgb(44, 107, 201)", borderRadius: "1px" }} />
                </div>
                <h3 className="text-white" style={{ ...msFont, fontSize: "15px", fontWeight: 400, lineHeight: "22px" }}>
                  {item.label}
                </h3>
                <p style={{ ...msFont, color: "#5a7a9e", fontSize: "13px", lineHeight: "22px" }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. IMAGE MARQUEE ── */}
      <section className="py-4 overflow-hidden">
        <div
          className="flex gap-2"
          style={{
            animation: "marquee 30s linear infinite",
            width: "fit-content",
          }}
        >
          {[...galleryImages, ...galleryImages].map((src, i) => 
            {
              if(i ==3) {
                return(
                  <div key={i} className="flex-shrink-0 w-[400px] h-[300px] overflow-hidden">
                    We are a trusted
                    network of engineers,
                    sourcing experts, and
                    quality specialists.
                  </div>
                )
              }
            return (<div key={i} className="flex-shrink-0 w-[400px] h-[300px] overflow-hidden">
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </div>
                  )
            }
          )}
        </div>

        {/* Row 2: left to right */}
        <div
          className="flex gap-2 mt-2"
          style={{
            animation: "marquee-reverse 30s linear infinite",
            width: "fit-content",
          }}
        >
          {[...galleryImages2, ...galleryImages2].map((src, i) => (
            <div key={i} className="flex-shrink-0 w-[400px] h-[280px] overflow-hidden">
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. OUR VALUES ── */}
      <section className="py-20 border-t border-[#1a2f4a]/40 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left */}
            <div>
              <h2 className="text-white mb-4" style={{ ...msFont, fontWeight: 400, fontSize: "36px", lineHeight: "46px", letterSpacing: "-0.4px" }}>
                Our Values
              </h2>
              <p style={{ ...msFont, color: "#5a7a9e", fontSize: "13px", lineHeight: "22px" }}>
                The principles that guide every decision we make and every commitment we deliver.
              </p>
            </div>

            {/* Values list */}
            <div className="lg:col-span-2 flex flex-col gap-0 border-t border-[#BBD6FF26]">
              {values.map((val) => (
                <div key={val.title} className="grid grid-cols-3 gap-6 py-5 border-b border-[#BBD6FF26]">
                  <span className="text-white" style={{ ...msFont, fontSize: "14px", fontWeight: 400, lineHeight: "22px" }}>
                    {val.title}
                  </span>
                  <p className="col-span-2" style={{ ...msFont, color: "#5a7a9e", fontSize: "13px", lineHeight: "22px" }}>
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. MEET OUR VISIONARIES ── */}
      <section className="py-20 border-t border-[#1a2f4a]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
            <div>
              <h2 className="text-white mb-3" style={{ ...msFont, fontWeight: 400, fontSize: "36px", lineHeight: "46px", letterSpacing: "-0.4px" }}>
                Meet our{" "}
                <span style={{ color: "#BBD6FFBF", fontStyle: "italic" }}>visionaries</span>
              </h2>
              <p style={{ ...msFont, color: "#5a7a9e", fontSize: "13px", lineHeight: "22px" }}>
                The leadership team driving innovation and excellence across our global operations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {teamMembers.map((member) => (
              <div key={member.name} className="group flex flex-col gap-3">
                <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1D45]/80 to-transparent" />
                  <button className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-[#1a6fff] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-bold">in</span>
                  </button>
                </div>
                <div>
                  <p className="text-white" style={{ ...msFont, fontSize: "14px", lineHeight: "20px" }}>
                    {member.name}
                  </p>
                  <p style={{ ...msFont, color: "#5a7a9e", fontSize: "12px", lineHeight: "18px" }}>
                    {member.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. GLOBAL CLIENTS / TESTIMONIAL ── */}
      <section className="py-28 border-t border-[#1a2f4a]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-white mb-2" style={{ ...msFont, fontWeight: 400, fontSize: "36px", lineHeight: "46px", letterSpacing: "-0.4px" }}>
              Global Clients
            </h2>
            <p style={{ ...msFont, color: "#5a7a9e", fontSize: "13px", lineHeight: "22px" }} className="mb-10">
              Serving aerospace, defense, and commercial industries worldwide with precision-sourced electronic components.
            </p>

            <TestimonialSlider />
          </div>
        </div>
      </section>

      {/* ── 7. STATS / OUR IMPACT IN NUMBERS ── */}
      <section className="border-t border-[#1a2f4a]/40" style={{height: "650px"}}>
        <div className="flex flex-col lg:flex-row w-full">
          {/* Left: text + stats — 50% */}
          <div className="w-full lg:w-1/2 py-20 px-6 sm:px-10 lg:px-16">
            <h2 className="text-white mb-4" style={{ ...msFont, fontWeight: 400, fontSize: "36px", lineHeight: "46px", letterSpacing: "-0.4px" }}>
              Our Impact in Numbers
            </h2>
            <p className="mb-10" style={{ ...msFont, color: "#5a7a9e", fontSize: "13px", lineHeight: "22px" }}>
              Proven reliability at scale — trusted by over 1,000 customers across 125+ countries.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.value} className="flex flex-col gap-1 pb-6 border-b border-[#BBD6FF26]">
                  <span className="text-white" style={{ ...msFont, fontSize: "36px", lineHeight: "44px", letterSpacing: "-0.5px" }}>
                    {stat.value}
                  </span>
                  <p className="text-white" style={{ ...msFont, fontSize: "13px", lineHeight: "18px" }}>
                    {stat.label}
                  </p>
                  <p style={{ ...msFont, color: "#5a7a9e", fontSize: "12px", lineHeight: "18px" }}>
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image — 50% */}
          <div className="relative w-full lg:w-1/2" style={{height: "650px"}}>
            <Image
              src={aboutContainerLarge}
              alt="ASAP Semiconductor impact"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ── */}
      <section className="py-20 border-t border-[#1a2f4a]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left */}
            <div>
              <h2 className="text-white mb-4" style={{ ...msFont, fontWeight: 400, fontSize: "36px", lineHeight: "46px", letterSpacing: "-0.4px" }}>
                Frequently Asked Questions
              </h2>
              <p style={{ ...msFont, color: "#5a7a9e", fontSize: "13px", lineHeight: "22px" }}>
                Common questions about our services, certifications, and how we support your component sourcing needs.
              </p>
            </div>

            {/* FAQ list */}
            <div className="lg:col-span-2">
              <FAQAccordion />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
