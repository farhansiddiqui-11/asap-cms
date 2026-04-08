import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description?: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0F1D45]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#1a6fff]/6 blur-[120px]" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,111,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(26,111,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 text-center max-w-lg">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1a6fff]/30 bg-[#1a6fff]/5 mb-8">
          <Clock className="w-4 h-4 text-[#1a6fff]" />
          <span className="text-[#8aa3c2] text-xs font-medium tracking-wider uppercase">
            Coming Soon
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4 leading-tight">
          {title}
        </h1>

        <p className="text-[#5a7a9e] text-base leading-relaxed mb-10">
          {description ||
            "We're working hard to bring you this page. Check back soon for updates."}
        </p>

        {/* Animated dots */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-[#1a6fff]"
              style={{
                animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#8aa3c2] hover:text-white text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
