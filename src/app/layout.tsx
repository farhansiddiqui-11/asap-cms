import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "ASAP Semi — The Complete Part Purchasing Platform",
    template: "%s | ASAP Semi",
  },
  description:
    "Search and source certified, traceable electronic and aerospace parts with rapid RFQ response and global fulfillment. AS9120B, ISO 9001:2015 certified.",
  keywords: [
    "electronic components",
    "aerospace parts",
    "semiconductors",
    "NSN parts",
    "mil-spec connectors",
    "ICs distributor",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-[#0F1D45] text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
