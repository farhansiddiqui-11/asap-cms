import Link from "next/link";
import Image from "next/image";
import bottomImage from "../../../public/bottom_image.png";
import type { VpcTemplate } from "@/types/vpc";

export default function CTASection({ vpc }: { vpc?: VpcTemplate | null }) {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={bottomImage}
          alt="Industrial background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1D45]/40 via-[#0a1535]/50 to-[#0F1D45]/70" />
      </div>

      {/* Blue glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-[#1a6fff]/10 blur-[100px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display text-white leading-tight mb-6">
          {vpc?.heading || "Results that build trust"}
        </h2>
        {vpc?.content ? (
          <div
            className="text-[#8aa3c2] text-base sm:text-lg max-w-lg mx-auto leading-relaxed mb-10 prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: vpc.content }}
          />
        ) : (
          <p className="text-[#8aa3c2] text-base sm:text-lg max-w-lg mx-auto leading-relaxed mb-10">
            Discover tailored sourcing strategies built for long-term success. Partner with us and invest with confidence.
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-[#1a6fff] hover:bg-[#0f5ce8] text-white px-8 py-3.5 rounded-lg font-semibold transition-all duration-200 hover:shadow-xl hover:shadow-[#1a6fff]/30"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
