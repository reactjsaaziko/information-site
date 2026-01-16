// Simplified Policy Data - Easy to understand
export const policyData = {
  lastUpdated: "30 Dec 2025",
  version: "v1.0",
  
  // Main policy categories with simple explanations
  // Using only Aaziko brand colors: Primary #2563EB, Info #0EA5E9, Success #16A34A, Warning #F59E0B, Error #EF4444
  policies: [
    {
      id: "verification",
      icon: "ShieldCheck",
      title: "Verification",
      tagline: "Trust starts here",
      color: "#2563EB", // Aaziko Blue (Primary)
      description: "We verify every business to keep the platform safe and trustworthy.",
      keyPoints: [
        "Submit valid business documents",
        "Keep your information up to date",
        "Verification takes 1-3 business days"
      ]
    },
    {
      id: "listing",
      icon: "Package",
      title: "Product Listing",
      tagline: "Quality listings, better sales",
      color: "#0EA5E9", // Aaziko Info
      description: "Create accurate, detailed listings to help buyers make informed decisions.",
      keyPoints: [
        "Use clear photos and descriptions",
        "Set honest pricing",
        "Update stock availability regularly"
      ]
    },
    {
      id: "orders",
      icon: "ClipboardList",
      title: "Orders & Contracts",
      tagline: "Commitments matter",
      color: "#16A34A", // Aaziko Success
      description: "Honor your orders and communicate clearly with trading partners.",
      keyPoints: [
        "Confirm orders promptly",
        "Follow agreed terms",
        "Communicate any changes early"
      ]
    },
    {
      id: "payments",
      icon: "CreditCard",
      title: "Payments",
      tagline: "Secure transactions",
      color: "#F59E0B", // Aaziko Warning
      description: "Safe, transparent payment processing for all transactions.",
      keyPoints: [
        "Use approved payment methods",
        "Refunds processed within 7 days",
        "Escrow available for large orders"
      ]
    },
    {
      id: "inspection",
      icon: "Search",
      title: "Quality & Inspection",
      tagline: "Quality you can trust",
      color: "#EF4444", // Aaziko Error
      description: "Meet quality standards and allow inspections when required.",
      keyPoints: [
        "Products must match descriptions",
        "Third-party inspection available",
        "Quality issues = returns at seller cost"
      ]
    },
    {
      id: "logistics",
      icon: "Truck",
      title: "Shipping & Logistics",
      tagline: "Delivered with care",
      color: "#0EA5E9", // Aaziko Info
      description: "Ship on time with proper packaging and tracking.",
      keyPoints: [
        "Ship within committed timeframe",
        "Provide tracking information",
        "Use appropriate packaging"
      ]
    },
    {
      id: "disputes",
      icon: "Scale",
      title: "Dispute Resolution",
      tagline: "Fair solutions",
      color: "#2563EB", // Aaziko Blue (Primary)
      description: "We help resolve disagreements fairly and quickly.",
      keyPoints: [
        "Try direct resolution first",
        "File disputes within 15 days",
        "Provide complete documentation"
      ]
    },
    {
      id: "privacy",
      icon: "Lock",
      title: "Privacy & Security",
      tagline: "Your data is safe",
      color: "#16A34A", // Aaziko Success
      description: "We protect your data with industry-standard security.",
      keyPoints: [
        "Data encrypted and secure",
        "Never shared without consent",
        "GDPR compliant"
      ]
    }
  ],

  // Simple rules everyone should know
  goldenRules: [
    { icon: "✓", text: "Be honest in all dealings" },
    { icon: "✓", text: "Communicate promptly" },
    { icon: "✓", text: "Honor your commitments" },
    { icon: "✓", text: "Respect other users" },
    { icon: "✓", text: "Follow local laws" }
  ],

  // What happens if rules are broken - Using Aaziko status colors
  consequences: [
    { level: "Warning", description: "First-time minor issues", color: "#F59E0B" }, // Aaziko Warning
    { level: "Restriction", description: "Repeated issues", color: "#F59E0B" }, // Aaziko Warning
    { level: "Suspension", description: "Serious violations", color: "#EF4444" }, // Aaziko Error
    { level: "Termination", description: "Major or repeated violations", color: "#EF4444" } // Aaziko Error
  ]
};
