const brands = [
  "NORTHROP",
  "BAE SYSTEMS",
  "HONEYWELL",
  "GE AVIATION",
  "COLLINS",
  "L3HARRIS",
  "RTX",
  "BOEING",
  "LOCKHEED",
  "RAYTHEON",
  "GENERAL DYNAMICS",
  "TEXTRON",
];

export default function BrandMarquee() {
  return (
    <section
      className="relative bg-transparent overflow-hidden"
      style={{
        width: "100%",
        height: "102px",
        transform: "rotate(0deg)",
        opacity: 1,
        borderTopWidth: "1px",
        borderBottomWidth: "1px",
        borderTopStyle: "solid",
        borderBottomStyle: "solid",
        borderColor: "#1a2f4a",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Edge fades */}
      <div
        className="absolute left-0 top-0 bottom-0 w-32 z-10"
        style={{ background: "linear-gradient(90deg, #0B1F3F 0%, rgba(0, 0, 0, 0) 100%)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-32 z-10"
        style={{ background: "linear-gradient(270deg, #0B1F3F 0%, rgba(0, 0, 0, 0) 100%)" }}
      />

      <div className="flex h-full">
        <div className="flex items-center animate-marquee whitespace-nowrap flex-shrink-0 h-full">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={i}
              style={{
                width: "240px",
                height: "100%",
                transform: "rotate(0deg)",
                opacity: 1,
                borderRightWidth: "1px",
                borderRightStyle: "solid",
                borderColor: "#1a2f4a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span className="text-[#3a5a7e] text-xs font-display font-semibold tracking-[0.2em] uppercase hover:text-[#8aa3c2] transition-colors cursor-default select-none">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
