import Link from "next/link";
import { ArrowRight } from "lucide-react";

const productCards = [
  {
    id: "hot-stock",
    title: "Hot Stock Items",
    description: "High-demand electronic components ready to ship from our extensive in-house inventory.",
    image: "/col1.png",
    tag: "Hot Stock Items",
    tagColor: "bg-[#ef4444]",
    href: "/products?category=hot-stock",
  },
  {
    id: "best-selling",
    title: "Best Selling Components",
    description: "Top-performing ICs, capacitors, and connectors trusted by procurement teams worldwide.",
    image: "/col2.png",
    tag: "Best Selling Components",
    tagColor: "bg-[#1a6fff]",
    href: "/products",
  },
  {
    id: "aircraft",
    title: "Best Selling Aircraft",
    description: "Mission-critical aerospace parts with full traceability for defense and commercial fleets.",
    image: "/col3.png",
    tag: "Best Selling Aircraft",
    tagColor: "bg-[#0d9488]",
    href: "/products?category=aerospace",
  },
];

export default function TopProducts() {
  return (
    <section className="py-20 bg-[#0F1D45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-12">
          <h2 className="text-3xl sm:text-4xl font-display text-white">
            Top Products
          </h2>
          <p className="text-[#5a7a9e] text-sm leading-relaxed sm:max-w-xs">
            Explore our most sourced electronic components, from in-demand ICs to critical passive components and assemblies.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {productCards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="group relative overflow-hidden block"
              style={{ borderRadius: "0.3px", height: "500px" }}
            >
              {/* Image */}
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-[#0F1D45]/50" />

              {/* Tag — plain white text, top left */}
              <div className="absolute top-4 left-4">
                <span
                  style={{
                    fontFamily: "'Microsoft Sans Serif', sans-serif",
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontSize: "16px",
                    lineHeight: "24px",
                    letterSpacing: "0.16px",
                    color: "#E8F4FF",
                  }}
                >
                  {card.tag}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[#8aa3c2] text-xs leading-relaxed mb-3">
                  {card.description}
                </p>
                <div className="flex items-center gap-2 text-[#1a6fff] text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Explore Parts
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Border glow on hover */}
              <div className="absolute inset-0 border border-[#1a6fff]/0 group-hover:border-[#1a6fff]/30 transition-colors duration-300" style={{ borderRadius: "0.3px" }} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
