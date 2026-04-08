const certs = [
  { name: "AS9120B", abbr: "AS9120B", color: "#1a6fff" },
  { name: "ISO 9001:2015", abbr: "ISO 9001", color: "#5a7a9e" },
  { name: "ITAR Registered", abbr: "ITAR", color: "#0d9488" },
  { name: "ASA-100", abbr: "ASA-100", color: "#8b5cf6" },
  { name: "ERAI Member", abbr: "ERAI", color: "#f59e0b" },
  { name: "NBAA Member", abbr: "NBAA", color: "#1a6fff" },
  { name: "CASR Registered", abbr: "CASR", color: "#ef4444" },
  { name: "ESD Compliant", abbr: "ESD", color: "#22c55e" },
];

export default function Certifications() {
  return (
    <section className="py-16 bg-[#0F1D45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-display text-white mb-4">
            Certifications and Memberships
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-2">
          {certs.map((cert) => (
            <div
              key={cert.name}
              className="group flex flex-col items-center gap-2.5 px-5 py-4 rounded-xl border border-[#1a2f4a] bg-[#0d1e42]/50 hover:border-[#1a6fff]/30 hover:bg-[#0d1e42] transition-all duration-200 cursor-default min-w-[100px]"
            >
              {/* Badge circle */}
              <div
                className="w-14 h-14 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: `${cert.color}40`, backgroundColor: `${cert.color}10` }}
              >
                <span
                  className="text-xs font-display font-bold text-center leading-tight"
                  style={{ color: cert.color }}
                >
                  {cert.abbr}
                </span>
              </div>
              <span className="text-[#5a7a9e] text-xs text-center group-hover:text-white transition-colors">
                {cert.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
