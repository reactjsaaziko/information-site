/**
 * SEO Routes Configuration - Single Source of Truth
 * All canonical routes for prerendering and sitemap generation
 * 
 * Meta Description Guidelines:
 * - 150-160 characters max
 * - Include primary keyword near start
 * - Include call-to-action or value proposition
 * - Make it compelling to click
 */

export const SITE_URL = "https://aaziko.com";

// Canonical routes to be pre-rendered and indexed
export const CANONICAL_ROUTES = [
  "/about",
  "/buyers/overview",
  "/buyers/journey",
  "/buyers/benefits",
  "/buyers/cost-savings",
  "/rfq",
  "/find-verified-indian-suppliers",
  "/find-verified-suppliers",
  "/verified-suppliers",
  "/how-we-work",
  "/customs-documentation",
  "/shipment-tracking",
  "/suppliers/overview",
  "/create-company-profile",
  "/list-products",
  "/get-verified",
  "/quote-order-milestones",
  "/inspection-readiness",
  "/export-documentation",
  "/supplier-faqs",
  "/marketplace",
  "/inspection",
  "/finance",
  "/logistics",
  "/planet1-market",
  "/order-process",
  "/blog",
  "/guides",
  "/guides/export-documents-from-india",
  "/guides/import-documents-checklist",
  "/guides/incoterms-explained",
  "/guides/how-to-find-hs-code",
  "/guides/export-process-step-by-step",
  "/guides/import-process-step-by-step",
  "/guides/rfq-template",
  "/guides/moq-lead-time-sampling",
  // Cluster B - Logistics & Shipping
  "/guides/sea-vs-air-freight",
  "/guides/export-packaging-labeling",
  "/guides/shipment-tracking-milestones",
  "/guides/customs-clearance-basics",
  // Cluster C - Finance, Quality & Suppliers
  "/guides/international-payment-terms",
  "/guides/quality-inspection-checklist",
  "/guides/supplier-verification-checklist",
  "/trade-agreements",
  "/webinars",
  "/case-studies",
  "/newsroom",
  "/dispute-resolution",
  "/partner-sop",
  "/policy",
  "/contact"
];

// Route metadata for SEO tags - Optimized descriptions
export const ROUTE_META = {
  "/": {
    title: "Aaziko - Global B2B Trade Platform | Verified Indian Suppliers",
    description: "Connect with verified Indian suppliers for secure B2B trade. Quality inspection, customs documentation, and logistics support. Start sourcing today.",
    canonical: SITE_URL
  },
  "/about": {
    title: "About Aaziko | Trusted B2B Trade Platform for Global Buyers",
    description: "Aaziko simplifies international B2B trade with verified suppliers, secure transactions, and end-to-end support. Learn about our mission and process.",
    canonical: `${SITE_URL}/about`
  },
  "/buyers/overview": {
    title: "For Buyers | Source from Verified Indian Suppliers | Aaziko",
    description: "Source products from verified Indian suppliers with secure payments, quality inspection, and seamless logistics. Reduce sourcing risk with Aaziko.",
    canonical: `${SITE_URL}/buyers/overview`
  },
  "/buyers/journey": {
    title: "Buyer Journey | From Inquiry to Delivery | Aaziko",
    description: "Follow the complete buyer journey on Aaziko. Milestone-based payments, quality assurance, and transparent tracking from order to delivery.",
    canonical: `${SITE_URL}/buyers/journey`
  },
  "/buyers/benefits": {
    title: "Buyer Benefits | Why Source Through Aaziko",
    description: "Verified suppliers, secure escrow payments, pre-shipment inspection, and dispute support. Discover the benefits of sourcing through Aaziko.",
    canonical: `${SITE_URL}/buyers/benefits`
  },
  "/buyers/cost-savings": {
    title: "Cost Savings Calculator | Reduce Sourcing Costs | Aaziko",
    description: "Calculate your potential savings when sourcing through Aaziko. Competitive pricing, reduced intermediary costs, and transparent fees.",
    canonical: `${SITE_URL}/buyers/cost-savings`
  },
  "/rfq": {
    title: "Submit RFQ | Get Quotes from Verified Suppliers | Aaziko",
    description: "Submit your Request for Quotation and receive competitive quotes from verified Indian suppliers within 48 hours. Free to post, no commitment.",
    canonical: `${SITE_URL}/rfq`
  },
  "/find-verified-indian-suppliers": {
    title: "Find Verified Indian Suppliers | Manufacturers & Exporters | Aaziko",
    description: "Connect with verified Indian manufacturers and exporters. Background-checked suppliers with quality assurance for global B2B trade.",
    canonical: `${SITE_URL}/find-verified-indian-suppliers`
  },
  "/find-verified-suppliers": {
    title: "Find Verified Suppliers | Quality-Checked Manufacturers | Aaziko",
    description: "Search verified suppliers by product category. All suppliers undergo rigorous verification including background checks and product testing.",
    canonical: `${SITE_URL}/find-verified-suppliers`
  },
  "/verified-suppliers": {
    title: "Verified Suppliers | How Aaziko Validates Supplier Quality",
    description: "Learn how Aaziko verifies suppliers: background checks, product testing, financial health, and ongoing monitoring. Source with confidence.",
    canonical: `${SITE_URL}/verified-suppliers`
  },
  "/how-we-work": {
    title: "How Aaziko Works | Clear Order Journey for Global Trade",
    description: "Understand Aaziko's transparent trade process. From supplier verification to delivery with milestone payments and quality inspection.",
    canonical: `${SITE_URL}/how-we-work`
  },
  "/customs-documentation": {
    title: "Customs Documentation Guide | Import Compliance Checklist | Aaziko",
    description: "Complete guide to customs documentation for international trade. Product compliance, labeling requirements, and document checklists.",
    canonical: `${SITE_URL}/customs-documentation`
  },
  "/shipment-tracking": {
    title: "Shipment Tracking | Real-Time Cargo Visibility | Aaziko",
    description: "Track your shipments in real-time from factory to destination. Milestone notifications, delay alerts, and delivery support.",
    canonical: `${SITE_URL}/shipment-tracking`
  },
  "/suppliers/overview": {
    title: "For Suppliers | Sell to Global Buyers | Aaziko",
    description: "Join Aaziko as a verified supplier. Access global buyers, secure payments, and grow your export business with structured support.",
    canonical: `${SITE_URL}/suppliers/overview`
  },
  "/create-company-profile": {
    title: "Create Company Profile | Join Aaziko as Supplier",
    description: "Create your company profile on Aaziko to showcase products and connect with global buyers. Free registration, premium visibility.",
    canonical: `${SITE_URL}/create-company-profile`
  },
  "/list-products": {
    title: "List Your Products | Reach Global Buyers | Aaziko",
    description: "List your products on Aaziko marketplace. Reach verified global buyers looking for quality Indian suppliers. Easy listing process.",
    canonical: `${SITE_URL}/list-products`
  },
  "/get-verified": {
    title: "Get Verified | Become a Trusted Supplier | Aaziko",
    description: "Complete Aaziko's verification process to become a trusted supplier. Unlock premium buyer access and build credibility.",
    canonical: `${SITE_URL}/get-verified`
  },
  "/quote-order-milestones": {
    title: "Quote & Order Milestones | Transparent Pricing | Aaziko",
    description: "Learn about Aaziko's milestone-based order system. Transparent pricing, secure payments, and clear delivery commitments.",
    canonical: `${SITE_URL}/quote-order-milestones`
  },
  "/inspection-readiness": {
    title: "Inspection Readiness Guide | Prepare for Quality Checks | Aaziko",
    description: "Prepare for quality inspections with Aaziko's inspection readiness guide. Checklist, common issues, and best practices for suppliers.",
    canonical: `${SITE_URL}/inspection-readiness`
  },
  "/export-documentation": {
    title: "Export Documentation | Essential Documents for Shipping | Aaziko",
    description: "Complete guide to export documents: commercial invoice, packing list, COO, and compliance certificates. Checklist and templates.",
    canonical: `${SITE_URL}/export-documentation`
  },
  "/supplier-faqs": {
    title: "Supplier FAQs | Common Questions Answered | Aaziko",
    description: "Frequently asked questions for suppliers on Aaziko. Verification process, payments, order management, and support.",
    canonical: `${SITE_URL}/supplier-faqs`
  },
  "/marketplace": {
    title: "B2B Marketplace | Verified Products & Suppliers | Aaziko",
    description: "Explore Aaziko's B2B marketplace with verified suppliers and quality products. Secure trade solutions for global buyers.",
    canonical: `${SITE_URL}/marketplace`
  },
  "/inspection": {
    title: "Quality Inspection Services | Pre-Shipment Checks | Aaziko",
    description: "Professional quality inspection services for international trade. Pre-shipment, during-production, and container loading inspections.",
    canonical: `${SITE_URL}/inspection`
  },
  "/finance": {
    title: "Trade Finance Solutions | Secure Payments | Aaziko",
    description: "Flexible trade finance options: escrow payments, milestone-based releases, and order financing. Secure transactions for B2B trade.",
    canonical: `${SITE_URL}/finance`
  },
  "/logistics": {
    title: "Logistics Solutions | Freight & Customs | Aaziko",
    description: "End-to-end logistics for international trade. Freight forwarding, customs clearance, and door-to-door delivery with tracking.",
    canonical: `${SITE_URL}/logistics`
  },
  "/planet1-market": {
    title: "Planet1 Market | Sustainable Trade Initiative | Aaziko",
    description: "Discover Planet1 Market - Aaziko's sustainable trade initiative for eco-friendly products and environmentally conscious suppliers.",
    canonical: `${SITE_URL}/planet1-market`
  },
  "/order-process": {
    title: "Order Process | Step-by-Step Trade Journey | Aaziko",
    description: "Step-by-step guide to the Aaziko order process. From inquiry to delivery with milestone payments and quality checkpoints.",
    canonical: `${SITE_URL}/order-process`
  },
  "/blog": {
    title: "Trade Insights Blog | Export Import Tips | Aaziko",
    description: "Expert insights on international trade, sourcing strategies, and B2B commerce trends. Practical tips for buyers and suppliers.",
    canonical: `${SITE_URL}/blog`
  },
  "/guides": {
    title: "Export Import Guides | Trade Documentation & Procedures | Aaziko",
    description: "Comprehensive guides for export-import: HS codes, Incoterms, customs documentation, and shipping procedures. Practical checklists.",
    canonical: `${SITE_URL}/guides`
  },
  "/guides/export-documents-from-india": {
    title: "Export Documents from India | Complete Checklist | Aaziko",
    description: "Complete checklist of export documents required from India: Commercial Invoice, Packing List, COO, Shipping Bill, and product certificates.",
    canonical: `${SITE_URL}/guides/export-documents-from-india`
  },
  "/guides/import-documents-checklist": {
    title: "Import Documents Checklist | Essential Paperwork for Buyers | Aaziko",
    description: "Essential import documents checklist for customs clearance: Commercial Invoice, B/L, COO, and product-specific certificates explained.",
    canonical: `${SITE_URL}/guides/import-documents-checklist`
  },
  "/guides/incoterms-explained": {
    title: "Incoterms Explained | FOB, CIF, DDP Guide | Aaziko",
    description: "Understand Incoterms 2020: FOB, CIF, DDP and more. Learn who pays for shipping, insurance, and customs in international trade.",
    canonical: `${SITE_URL}/guides/incoterms-explained`
  },
  "/guides/how-to-find-hs-code": {
    title: "How to Find HS Code | Product Classification Guide | Aaziko",
    description: "Step-by-step guide to finding the correct HS code for your products. Avoid customs delays and duty disputes with proper classification.",
    canonical: `${SITE_URL}/guides/how-to-find-hs-code`
  },
  "/guides/export-process-step-by-step": {
    title: "Export Process Step by Step | Complete Guide for Suppliers | Aaziko",
    description: "Complete export process guide: from order confirmation to shipping. Production, inspection, documentation, and customs clearance steps.",
    canonical: `${SITE_URL}/guides/export-process-step-by-step`
  },
  "/guides/import-process-step-by-step": {
    title: "Import Process Step by Step | Complete Guide for Buyers | Aaziko",
    description: "Full import process guide: sourcing, ordering, inspection, shipping, customs clearance, and delivery. Plan your import timeline.",
    canonical: `${SITE_URL}/guides/import-process-step-by-step`
  },
  "/guides/rfq-template": {
    title: "RFQ Template | How to Write Request for Quotation | Aaziko",
    description: "RFQ template and best practices for international sourcing. Get accurate quotes with detailed product specifications and requirements.",
    canonical: `${SITE_URL}/guides/rfq-template`
  },
  "/guides/moq-lead-time-sampling": {
    title: "MOQ, Lead Time & Sampling Guide | Aaziko",
    description: "Understand MOQ negotiation, production lead times, and sampling process. Essential knowledge for successful international sourcing.",
    canonical: `${SITE_URL}/guides/moq-lead-time-sampling`
  },
  "/guides/sea-vs-air-freight": {
    title: "Sea vs Air Freight: How to Choose Shipping Mode | Aaziko",
    description: "Compare sea freight and air freight for international shipping. Cost, transit time, and decision framework to choose the right mode.",
    canonical: `${SITE_URL}/guides/sea-vs-air-freight`
  },
  "/guides/export-packaging-labeling": {
    title: "Export Packaging & Labeling Requirements Guide | Aaziko",
    description: "Complete guide to export packaging standards and labeling requirements. Carton marking, product labels, and compliance by destination.",
    canonical: `${SITE_URL}/guides/export-packaging-labeling`
  },
  "/guides/shipment-tracking-milestones": {
    title: "Shipment Tracking Milestones Explained | Aaziko",
    description: "Understand cargo tracking milestones for sea and air freight. What each status means, common delays, and how to respond.",
    canonical: `${SITE_URL}/guides/shipment-tracking-milestones`
  },
  "/guides/customs-clearance-basics": {
    title: "Customs Clearance Basics: Essential Guide | Aaziko",
    description: "Learn customs clearance fundamentals: required documents, process steps, common issues, and tips for smooth import clearance.",
    canonical: `${SITE_URL}/guides/customs-clearance-basics`
  },
  "/guides/international-payment-terms": {
    title: "International Payment Terms Guide: T/T, L/C, D/P | Aaziko",
    description: "Understand payment terms in international trade. Compare advance payment, L/C, D/P, and open account with risk analysis.",
    canonical: `${SITE_URL}/guides/international-payment-terms`
  },
  "/guides/quality-inspection-checklist": {
    title: "Quality Inspection Checklist: Pre-Shipment Guide | Aaziko",
    description: "Practical pre-shipment inspection checklist. What to verify for quantity, quality, packaging, and documentation before shipping.",
    canonical: `${SITE_URL}/guides/quality-inspection-checklist`
  },
  "/guides/supplier-verification-checklist": {
    title: "Supplier Verification Checklist: How to Vet Suppliers | Aaziko",
    description: "Step-by-step supplier verification guide. Documents to request, red flags to watch, and questions to ask before ordering.",
    canonical: `${SITE_URL}/guides/supplier-verification-checklist`
  },
  "/trade-agreements": {
    title: "Trade Agreements Guide | FTA & Duty Benefits | Aaziko",
    description: "Understanding FTAs and PTAs: how trade agreements reduce import duties. Rules of Origin, COO requirements, and common mistakes.",
    canonical: `${SITE_URL}/trade-agreements`
  },
  "/webinars": {
    title: "Webinars & Events | Learn International Trade | Aaziko",
    description: "Join Aaziko webinars and events. Learn about international trade, sourcing best practices, and business growth strategies.",
    canonical: `${SITE_URL}/webinars`
  },
  "/case-studies": {
    title: "Case Studies | Success Stories | Aaziko",
    description: "Real success stories from buyers and suppliers using Aaziko. Learn how businesses grow with verified trade partnerships.",
    canonical: `${SITE_URL}/case-studies`
  },
  "/newsroom": {
    title: "Newsroom | Latest Updates | Aaziko",
    description: "Latest news, press releases, and updates from Aaziko. Platform features, partnerships, and industry insights.",
    canonical: `${SITE_URL}/newsroom`
  },
  "/dispute-resolution": {
    title: "Dispute Resolution | Evidence-Based Trade Support | Aaziko",
    description: "Fair dispute resolution for trade issues. Evidence-based review process, clear outcomes, and prevention tips for buyers and sellers.",
    canonical: `${SITE_URL}/dispute-resolution`
  },
  "/partner-sop": {
    title: "Partner SOP & Onboarding | Service Partners | Aaziko",
    description: "Standard operating procedures and onboarding guide for Aaziko service partners. Logistics, inspection, and finance partners.",
    canonical: `${SITE_URL}/partner-sop`
  },
  "/policy": {
    title: "Terms & Policies | Aaziko",
    description: "Aaziko's terms of service, privacy policy, and platform guidelines. Transparent rules for safe B2B trade.",
    canonical: `${SITE_URL}/policy`
  },
  "/contact": {
    title: "Contact Us | Get Support | Aaziko",
    description: "Get in touch with Aaziko's team. Support for buyers and suppliers, partnership inquiries, and business questions.",
    canonical: `${SITE_URL}/contact`
  }
};

// Default meta for routes not in ROUTE_META
export const DEFAULT_META = {
  title: "Aaziko | Global B2B Trade Platform",
  description: "Aaziko connects global buyers with verified Indian suppliers for secure, transparent international trade with quality assurance.",
  canonical: SITE_URL
};

// Section-specific defaults for fallback
export const SECTION_DEFAULTS = {
  buyers: {
    title: "For Buyers | Aaziko",
    description: "Source products from verified suppliers with secure payments and quality assurance on Aaziko.",
    canonical: `${SITE_URL}/buyers/overview`
  },
  suppliers: {
    title: "For Suppliers | Aaziko", 
    description: "Join Aaziko as a verified supplier to access global buyers and grow your export business.",
    canonical: `${SITE_URL}/suppliers/overview`
  },
  partners: {
    title: "For Partners | Aaziko",
    description: "Partner with Aaziko to provide logistics, inspection, finance, or other trade services.",
    canonical: `${SITE_URL}/partner-sop`
  },
  learn: {
    title: "Resources | Aaziko",
    description: "Educational resources, guides, and insights for international B2B trade.",
    canonical: `${SITE_URL}/guides`
  }
};
