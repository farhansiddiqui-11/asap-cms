import { Product, Manufacturer, Category } from "@/types";

export const categories: Category[] = [
  {
    id: "1",
    slug: "integrated-circuits",
    name: "Integrated Circuits (ICs)",
    description: "Microprocessors, microcontrollers, digital signal processors, analog ICs, and application-specific integrated circuits for diverse applications.",
    icon: "cpu",
    productCount: 500000,
  },
  {
    id: "2",
    slug: "passive-components",
    name: "Passive Components",
    description: "Resistors, capacitors, inductors, and filters for circuit stability and signal conditioning.",
    icon: "zap",
    productCount: 280000,
  },
  {
    id: "3",
    slug: "connectors-cables",
    name: "Connectors & Cables",
    description: "MIL-SPEC connectors, circular connectors, RF coaxial, fiber optic, and wire harnesses.",
    icon: "plug",
    productCount: 150000,
  },
  {
    id: "4",
    slug: "semiconductors-diodes",
    name: "Semiconductors & Diodes",
    description: "Transistors, MOSFETs, IGBTs, Schottky diodes, and Zener diodes for power management.",
    icon: "triangle",
    productCount: 320000,
  },
  {
    id: "5",
    slug: "memory-storage",
    name: "Memory & Storage",
    description: "DRAM, SRAM, Flash, EEPROM, and ruggedized memory modules for mission-critical systems.",
    icon: "hard-drive",
    productCount: 95000,
  },
];

export const manufacturers: Manufacturer[] = [
  {
    id: "1",
    slug: "texas-instruments",
    name: "Texas Instruments",
    shortName: "TI",
    description: "Texas Instruments is a global semiconductor design and manufacturing company that develops analog ICs and embedded processors.",
    logo: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=80&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=400&fit=crop",
    website: "https://www.ti.com",
    founded: "1951",
    headquarters: "Dallas, TX",
    industries: ["Aerospace", "Automotive", "Industrial", "Communications"],
    productCount: 45000,
    certifications: ["ISO 9001", "IATF 16949", "AS9100"],
    featured: true,
  },
  {
    id: "2",
    slug: "intel",
    name: "Intel Corporation",
    shortName: "Intel",
    description: "Intel is a technology company known for designing and manufacturing advanced integrated digital technology platforms.",
    logo: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?w=80&h=80&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?w=1200&h=400&fit=crop",
    website: "https://www.intel.com",
    founded: "1968",
    headquarters: "Santa Clara, CA",
    industries: ["Aerospace & Defense", "Embedded Systems", "Communications"],
    productCount: 28000,
    certifications: ["ISO 9001", "AS9100D"],
    featured: true,
  },
  {
    id: "3",
    slug: "molex",
    name: "Molex LLC",
    shortName: "Molex",
    description: "Molex is a leading manufacturer of electronic, electrical, and fiber optic interconnection systems.",
    logo: "https://images.unsplash.com/photo-1601134467661-3d775b999c18?w=80&h=80&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1601134467661-3d775b999c18?w=1200&h=400&fit=crop",
    website: "https://www.molex.com",
    founded: "1938",
    headquarters: "Lisle, IL",
    industries: ["Military", "Aerospace", "Medical", "Automotive"],
    productCount: 62000,
    certifications: ["ISO 9001", "IATF 16949", "MIL-SPEC"],
    featured: true,
  },
  {
    id: "4",
    slug: "analog-devices",
    name: "Analog Devices",
    shortName: "ADI",
    description: "Analog Devices is a global leader in the design and manufacturing of analog, mixed signal, and DSP ICs.",
    logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=80&h=80&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=400&fit=crop",
    website: "https://www.analog.com",
    founded: "1965",
    headquarters: "Wilmington, MA",
    industries: ["Defense", "Aerospace", "Industrial", "Healthcare"],
    productCount: 38000,
    certifications: ["ISO 9001", "AS9100D", "ITAR"],
    featured: false,
  },
  {
    id: "5",
    slug: "amphenol",
    name: "Amphenol Corporation",
    shortName: "Amphenol",
    description: "Amphenol is one of the largest manufacturers of interconnect products in the world, serving military and commercial markets.",
    logo: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=80&h=80&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&h=400&fit=crop",
    website: "https://www.amphenol.com",
    founded: "1932",
    headquarters: "Wallingford, CT",
    industries: ["Military", "Commercial Aerospace", "Industrial"],
    productCount: 75000,
    certifications: ["ISO 9001", "AS9100", "MIL-DTL-38999"],
    featured: true,
  },
  {
    id: "6",
    slug: "vishay",
    name: "Vishay Intertechnology",
    shortName: "Vishay",
    description: "Vishay is a leading manufacturer of discrete semiconductors and passive electronic components.",
    logo: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=80&h=80&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=400&fit=crop",
    website: "https://www.vishay.com",
    founded: "1962",
    headquarters: "Malvern, PA",
    industries: ["Aerospace", "Defense", "Automotive", "Industrial"],
    productCount: 90000,
    certifications: ["AEC-Q101", "ISO 9001", "ITAR Registered"],
    featured: false,
  },
];

export const products: Product[] = [
  {
    id: "1",
    slug: "ti-tms320f28379d",
    partNumber: "TMS320F28379D",
    name: "TMS320F28379D Dual-Core Microcontroller",
    description: "The TMS320F28379D is a powerful floating-point microcontroller unit (MCU) designed for advanced closed-loop control applications such as industrial drives and servo motor control, solar inverters, digital power, transportation and motor control.",
    category: "Integrated Circuits (ICs)",
    subCategory: "Microcontrollers",
    manufacturer: "Texas Instruments",
    manufacturerSlug: "texas-instruments",
    nsn: "5895-01-543-1234",
    cage: "04TP5",
    unitOfMeasure: "Each",
    condition: "new",
    availability: "in-stock",
    quantity: 1250,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    specs: {
      "Core": "Dual C28x",
      "Frequency": "200 MHz",
      "Flash": "1 MB",
      "RAM": "204 KB",
      "Package": "176-Pin LQFP",
      "Voltage": "3.3V",
      "Temperature": "-40°C to 125°C",
    },
    certifications: ["RoHS", "AEC-Q100", "AS9100"],
    createdAt: "2024-01-15",
    updatedAt: "2024-06-20",
  },
  {
    id: "2",
    slug: "molex-mil-dtl-38999",
    partNumber: "MX-38999/20WB35SN",
    name: "MIL-DTL-38999 Series III Circular Connector",
    description: "Mil-spec circular connector designed for harsh military and aerospace environments. Features aluminum alloy shell with electroless nickel finish and 360° EMI shielding.",
    category: "Connectors & Cables",
    subCategory: "Circular Connectors",
    manufacturer: "Molex LLC",
    manufacturerSlug: "molex",
    nsn: "5935-01-234-5678",
    cage: "71780",
    unitOfMeasure: "Each",
    condition: "new",
    availability: "in-stock",
    quantity: 432,
    image: "https://images.unsplash.com/photo-1601134467661-3d775b999c18?w=600&h=400&fit=crop",
    specs: {
      "Shell Size": "20",
      "Contacts": "35",
      "Gender": "Receptacle",
      "Shell Material": "Aluminum Alloy",
      "Finish": "Electroless Nickel",
      "IP Rating": "IP68",
      "Temperature": "-65°C to 200°C",
    },
    certifications: ["MIL-DTL-38999", "QPL Listed"],
    createdAt: "2024-02-10",
    updatedAt: "2024-07-01",
  },
  {
    id: "3",
    slug: "adi-adsp-21489",
    partNumber: "ADSP-21489BSWZ-2AA",
    name: "ADSP-21489 32-Bit DSP Processor",
    description: "High-performance SHARC floating-point DSP with on-chip SRAM optimized for high-precision signal processing applications in defense and aerospace.",
    category: "Integrated Circuits (ICs)",
    subCategory: "Digital Signal Processors",
    manufacturer: "Analog Devices",
    manufacturerSlug: "analog-devices",
    nsn: "5895-01-456-7890",
    cage: "04BGB",
    unitOfMeasure: "Each",
    condition: "new",
    availability: "in-stock",
    quantity: 87,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
    specs: {
      "Core": "SHARC",
      "Frequency": "400 MHz",
      "SRAM": "5 Mbit",
      "Package": "144-Lead LQFP",
      "Voltage": "1.2V Core",
      "I/O Voltage": "3.3V",
      "Temperature": "-40°C to 85°C",
    },
    certifications: ["RoHS", "ITAR", "J-STD-020"],
    createdAt: "2024-03-05",
    updatedAt: "2024-07-15",
  },
  {
    id: "4",
    slug: "amphenol-radsok",
    partNumber: "AMP-RADSOK-4.6-AU",
    name: "RADSOK High Current Power Connector",
    description: "High current power connector with RADSOK technology for reliable high-cycle connection in military ground vehicles and UAV power distribution systems.",
    category: "Connectors & Cables",
    subCategory: "Power Connectors",
    manufacturer: "Amphenol Corporation",
    manufacturerSlug: "amphenol",
    unitOfMeasure: "Each",
    condition: "new",
    availability: "in-stock",
    quantity: 2100,
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop",
    specs: {
      "Current Rating": "85A",
      "Voltage Rating": "600V",
      "Contact Diameter": "4.6mm",
      "Mating Cycles": "10,000",
      "Contact Plating": "Gold",
      "Temperature": "-55°C to 125°C",
    },
    certifications: ["MIL-SPEC", "UL Listed", "RoHS"],
    createdAt: "2024-04-12",
    updatedAt: "2024-07-20",
  },
  {
    id: "5",
    slug: "vishay-melf-resistor",
    partNumber: "CMF55-100K-BEA",
    name: "CMF55 Precision Film Resistor 100kΩ",
    description: "Precision metal film resistor with excellent long-term stability and low temperature coefficient, suited for precision measurement and military electronics.",
    category: "Passive Components",
    subCategory: "Resistors",
    manufacturer: "Vishay Intertechnology",
    manufacturerSlug: "vishay",
    nsn: "5905-00-123-4567",
    unitOfMeasure: "Each",
    condition: "new",
    availability: "in-stock",
    quantity: 50000,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop",
    specs: {
      "Resistance": "100 kΩ",
      "Tolerance": "±0.1%",
      "Power Rating": "0.6W",
      "TCR": "±25 ppm/°C",
      "Package": "Axial",
      "Temperature": "-55°C to 155°C",
    },
    certifications: ["MIL-PRF-55182", "RoHS", "QPL Listed"],
    createdAt: "2024-01-20",
    updatedAt: "2024-06-10",
  },
  {
    id: "6",
    slug: "intel-atom-e3950",
    partNumber: "FJ8067803251200",
    name: "Intel Atom x7-E3950 Embedded Processor",
    description: "Intel Atom x7-E3950 processor designed for extended temperature embedded applications in avionics, defense communications, and industrial computing.",
    category: "Integrated Circuits (ICs)",
    subCategory: "Processors",
    manufacturer: "Intel Corporation",
    manufacturerSlug: "intel",
    cage: "OD060",
    unitOfMeasure: "Each",
    condition: "new",
    availability: "lead-time",
    leadTime: "8-12 weeks",
    quantity: 0,
    image: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?w=600&h=400&fit=crop",
    specs: {
      "Cores": "4",
      "Base Frequency": "1.6 GHz",
      "Burst Frequency": "2.0 GHz",
      "TDP": "12W",
      "Package": "FC-BGA12F",
      "Process": "14nm",
      "Temperature": "-40°C to 85°C",
    },
    certifications: ["RoHS", "IEC 60068"],
    createdAt: "2024-05-01",
    updatedAt: "2024-07-25",
  },
];

export async function getProducts(params?: {
  category?: string;
  manufacturer?: string;
  search?: string;
  page?: number;
  limit?: number;
}) {
  // Simulate API delay
  await new Promise((r) => setTimeout(r, 100));

  let filtered = [...products];

  if (params?.category) {
    filtered = filtered.filter((p) =>
      p.category.toLowerCase().includes(params.category!.toLowerCase())
    );
  }
  if (params?.manufacturer) {
    filtered = filtered.filter((p) =>
      p.manufacturerSlug === params.manufacturer
    );
  }
  if (params?.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.partNumber.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  const page = params?.page || 1;
  const limit = params?.limit || 12;
  const start = (page - 1) * limit;

  return {
    data: filtered.slice(start, start + limit),
    total: filtered.length,
    page,
    limit,
    hasMore: start + limit < filtered.length,
  };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await new Promise((r) => setTimeout(r, 50));
  return products.find((p) => p.slug === slug) || null;
}

export async function getManufacturers() {
  await new Promise((r) => setTimeout(r, 100));
  return {
    data: manufacturers,
    total: manufacturers.length,
    page: 1,
    limit: 20,
    hasMore: false,
  };
}

export async function getManufacturerBySlug(slug: string): Promise<Manufacturer | null> {
  await new Promise((r) => setTimeout(r, 50));
  return manufacturers.find((m) => m.slug === slug) || null;
}
