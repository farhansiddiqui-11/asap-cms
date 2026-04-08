import Image, { StaticImageData } from "next/image";
import { Award, Zap, CalendarDays, LucideIcon } from "lucide-react";
import searchIcon from "../../../public/search_icon.png";
import badgeIcon from "../../../public/badge_icon.png";
import timmerIcon from "../../../public/timmer_icon.png";
import likeIocn from "../../../public/likeIcon.png";
import type { VpcTemplate } from "@/types/vpc";

type Feature = {
  icon: StaticImageData | LucideIcon;
  isImage?: boolean;
  color: string;
  bg: string;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: searchIcon,
    isImage: true,
    color: "text-white",
    bg: "bg-[#1a2f4a]",
    title: "Find It Fast",
    description:
      "Search for items by manufacturer, category, part number, and more — our advanced tools help you locate exactly what you need in seconds.",
  },
  {
    icon: badgeIcon,
     isImage: true,
    color: "text-[#ef4444]",
    bg: "bg-[#ef4444]/10",
    title: "Quality Guaranteed",
    description:
      "We only sell warranted and traceable parts, rigorously inspected and certified to meet the highest industry standards.",
  },
  {
    icon: timmerIcon,
     isImage: true,
    color: "text-[#22c55e]",
    bg: "bg-[#22c55e]/10",
    title: "Get It Fast",
    description:
      "Purchases are delivered on-time with worldwide shipping options, including expedited solutions for urgent AOG needs.",
  },
  {
    icon: likeIocn,
     isImage: true,
    color: "text-[#1a6fff]",
    bg: "bg-[#1a6fff]/10",
    title: "365 Days",
    description:
      "We provide year-round ability to efficiently address customer needs, providing dedicated support and rapid response every single day.",
  },
];

export default function WhatSetsUsApart({ vpc }: { vpc?: VpcTemplate | null }) {
  return (
    <section className="py-20 bg-[#0F1D45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-14">
          <div>
            <h2
              className="text-white"
              style={{
                fontFamily: "'Microsoft Sans Serif', sans-serif",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "42.4px",
                lineHeight: "53px",
                letterSpacing: "-0.42px",
              }}
            >
              What Sets Us Apart
            </h2>
          </div>
          <div className="sm:max-w-xs">
            {vpc?.content ? (
              <div
                className="text-[#5a7a9e] text-sm leading-relaxed prose prose-invert prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: vpc.content }}
              />
            ) : (
              <p className="text-[#5a7a9e] text-sm leading-relaxed">
                Certified electronic components sourced fast and reliably for aerospace, defense, and commercial buyers.
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-[#1a6fff]/30 via-[#1a2f4a] to-transparent mb-14" />

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat) => {
            const Icon = feat.icon as LucideIcon;
            return (
              <div key={feat.title} className="group flex flex-col gap-4">
                <div className={`w-10 h-10  flex items-center justify-center flex-shrink-0`}>
                  {feat.isImage ? (
                    <Image
                      src={feat.icon as StaticImageData}
                      alt={feat.title}
                      width={20}
                      height={20}
                      className="w-5 h-5 object-contain"
                    />
                  ) : (
                    <Icon className={`w-5 h-5 ${feat.color}`} />
                  )}
                </div>
                <div>
                  <h3 className="text-white font-display font-semibold text-base mb-2 group-hover:text-[#1a6fff] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-[#5a7a9e] text-sm leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
