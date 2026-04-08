import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

const leftFooterLinks = {
  Products: [
    { label: "Semiconductors & ICs", href: "/products?category=integrated-circuits" },
    { label: "Passive Components", href: "/products?category=passive-components" },
    { label: "Connectors", href: "/products?category=connectors-cables" },
    { label: "RF & Microwave", href: "/products?category=rf-microwave" },
    { label: "Power Management", href: "/products?category=power-management" },
    { label: "Database & EQL Parts", href: "/products" },
  ],
  Services: [
    { label: "Parts Sourcing", href: "/services" },
    { label: "BOM Management", href: "/services" },
    { label: "Excess Inventory", href: "/services" },
    { label: "Kitting Services", href: "/services" },
    { label: "Quality Inspection", href: "/quality" },
    { label: "Counterfeit Prevention", href: "/quality" },
  ],
};

const rightFooterLinks = {
  Industries: [
    { label: "Aerospace & Defense", href: "/about" },
    { label: "Automotive", href: "/about" },
    { label: "Medical", href: "/about" },
    { label: "Telecommunications", href: "/about" },
    { label: "Industrial", href: "/about" },
    { label: "Mass Transit", href: "/about" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Certifications", href: "/quality" },
    { label: "Careers", href: "/about" },
    { label: "News & Blog", href: "/about" },
    { label: "Supplier Program", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ],
};

const policies = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Export Compliance Policy", href: "/export-compliance" },
  { label: "Combating Human Trafficking Policy", href: "/human-trafficking" },
];

const termsLinks = [
  { label: "Supplier Terms and Conditions", href: "/supplier-terms" },
  { label: "Customer Terms and Conditions", href: "/customer-terms" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a1535] border-t border-[#1a2f4a]/60">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left Link Columns */}
          {Object.entries(leftFooterLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4 font-display">{title}</h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#5a7a9e] hover:text-white text-sm transition-colors leading-relaxed"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Center Brand Column */}
          <div className="flex flex-col items-center text-center">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/asap_nav_logo.svg"
                alt="ASAP Semi"
                width={120}
                height={40}
                className="h-9 w-auto"
              />
            </Link>
            <p className="text-[#5a7a9e] text-sm leading-relaxed mb-5 max-w-xs">
              Your trusted global distributor of electronic components and semiconductors. AS9120B, ISO 9001:2015, CASR registered.
            </p>

            <div className="flex flex-col gap-2.5 items-center">
              <a href="tel:+17167054760" className="flex items-center gap-2.5 text-[#5a7a9e] hover:text-white text-sm transition-colors group">
                <Phone className="w-4 h-4 text-[#1a6fff] flex-shrink-0" />
                +1 (716) 705-4760
              </a>
              <a href="mailto:sales@asapsemi.com" className="flex items-center gap-2.5 text-[#5a7a9e] hover:text-white text-sm transition-colors">
                <Mail className="w-4 h-4 text-[#1a6fff] flex-shrink-0" />
                sales@asapsemi.com
              </a>
              <div className="flex items-start gap-2.5 text-[#5a7a9e] text-sm">
                <MapPin className="w-4 h-4 text-[#1a6fff] flex-shrink-0 mt-0.5" />
                Chatsworth, CA 91311
              </div>
            </div>

            <div className="flex items-center gap-3 mt-5">
              {[
                { label: "in", href: "#" },
                { label: "X", href: "#" },
                { label: "fb", href: "#" },
                { label: "yt", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-8 h-8 flex items-center justify-center rounded border border-[#1a2f4a] text-[#5a7a9e] hover:text-white hover:border-[#1a6fff]/50 hover:bg-[#1a6fff]/10 transition-all text-xs font-bold"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right Link Columns */}
          {Object.entries(rightFooterLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4 font-display">{title}</h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#5a7a9e] hover:text-white text-sm transition-colors leading-relaxed"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1a2f4a]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <div>
              <p className="text-[#5a7a9e] text-xs mb-1 font-medium uppercase tracking-wider">Policies</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {policies.map((p) => (
                  <Link key={p.label} href={p.href} className="text-[#4a6a8e] hover:text-white text-xs transition-colors">
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[#5a7a9e] text-xs mb-1 font-medium uppercase tracking-wider">Terms & Conditions</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {termsLinks.map((t) => (
                  <Link key={t.label} href={t.href} className="text-[#4a6a8e] hover:text-white text-xs transition-colors">
                    {t.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="md:text-right">
              <p className="text-[#4a6a8e] text-xs">
                © {new Date().getFullYear()} ASAP Semiconductor. All rights reserved.
              </p>
              <p className="text-[#3a5a7e] text-xs mt-1">
                Trusted Distributor Since 1985
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
