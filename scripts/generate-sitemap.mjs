/**
 * Enhanced Sitemap Generator
 * Generates sitemap.xml with priority and changefreq
 * Run: node scripts/generate-sitemap.mjs
 */
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SITE_URL = "https://aaziko.com";

// Routes with SEO priority settings
const ROUTES_CONFIG = [
  // High Priority - Core pages
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  
  // High Priority - Buyer conversion pages
  { path: "/rfq", priority: "0.9", changefreq: "weekly" },
  { path: "/verified-suppliers", priority: "0.9", changefreq: "weekly" },
  { path: "/find-verified-suppliers", priority: "0.9", changefreq: "weekly" },
  { path: "/find-verified-indian-suppliers", priority: "0.9", changefreq: "weekly" },
  { path: "/how-we-work", priority: "0.9", changefreq: "monthly" },
  
  // High Priority - SEO content pages
  { path: "/guides", priority: "0.9", changefreq: "weekly" },
  { path: "/guides/export-documents-from-india", priority: "0.8", changefreq: "monthly" },
  { path: "/guides/import-documents-checklist", priority: "0.8", changefreq: "monthly" },
  { path: "/guides/incoterms-explained", priority: "0.8", changefreq: "monthly" },
  { path: "/guides/how-to-find-hs-code", priority: "0.8", changefreq: "monthly" },
  { path: "/guides/export-process-step-by-step", priority: "0.8", changefreq: "monthly" },
  { path: "/guides/import-process-step-by-step", priority: "0.8", changefreq: "monthly" },
  { path: "/guides/rfq-template", priority: "0.8", changefreq: "monthly" },
  { path: "/guides/moq-lead-time-sampling", priority: "0.8", changefreq: "monthly" },
  // Cluster B - Logistics & Shipping
  { path: "/guides/sea-vs-air-freight", priority: "0.8", changefreq: "monthly" },
  { path: "/guides/export-packaging-labeling", priority: "0.8", changefreq: "monthly" },
  { path: "/guides/shipment-tracking-milestones", priority: "0.8", changefreq: "monthly" },
  { path: "/guides/customs-clearance-basics", priority: "0.8", changefreq: "monthly" },
  // Cluster C - Finance, Quality & Suppliers
  { path: "/guides/international-payment-terms", priority: "0.8", changefreq: "monthly" },
  { path: "/guides/quality-inspection-checklist", priority: "0.8", changefreq: "monthly" },
  { path: "/guides/supplier-verification-checklist", priority: "0.8", changefreq: "monthly" },
  { path: "/customs-documentation", priority: "0.8", changefreq: "monthly" },
  { path: "/export-documentation", priority: "0.8", changefreq: "monthly" },
  { path: "/trade-agreements", priority: "0.8", changefreq: "monthly" },
  { path: "/shipment-tracking", priority: "0.8", changefreq: "monthly" },
  { path: "/dispute-resolution", priority: "0.8", changefreq: "monthly" },
  
  // Medium Priority - Buyer pages
  { path: "/buyers/overview", priority: "0.7", changefreq: "monthly" },
  { path: "/buyers/journey", priority: "0.7", changefreq: "monthly" },
  { path: "/buyers/benefits", priority: "0.7", changefreq: "monthly" },
  { path: "/buyers/cost-savings", priority: "0.7", changefreq: "monthly" },
  
  // Medium Priority - Supplier pages
  { path: "/suppliers/overview", priority: "0.7", changefreq: "monthly" },
  { path: "/create-company-profile", priority: "0.7", changefreq: "monthly" },
  { path: "/list-products", priority: "0.7", changefreq: "monthly" },
  { path: "/get-verified", priority: "0.7", changefreq: "monthly" },
  { path: "/quote-order-milestones", priority: "0.6", changefreq: "monthly" },
  { path: "/inspection-readiness", priority: "0.6", changefreq: "monthly" },
  { path: "/supplier-faqs", priority: "0.6", changefreq: "monthly" },
  
  // Medium Priority - Services
  { path: "/marketplace", priority: "0.7", changefreq: "weekly" },
  { path: "/inspection", priority: "0.7", changefreq: "monthly" },
  { path: "/finance", priority: "0.7", changefreq: "monthly" },
  { path: "/logistics", priority: "0.7", changefreq: "monthly" },
  { path: "/order-process", priority: "0.6", changefreq: "monthly" },
  
  // Medium Priority - Learn/Resources
  { path: "/blog", priority: "0.7", changefreq: "weekly" },
  { path: "/webinars", priority: "0.6", changefreq: "weekly" },
  { path: "/case-studies", priority: "0.6", changefreq: "monthly" },
  { path: "/newsroom", priority: "0.6", changefreq: "weekly" },
  
  // Lower Priority - Partner/Support pages
  { path: "/partner-sop", priority: "0.5", changefreq: "monthly" },
  { path: "/logistics-partner", priority: "0.5", changefreq: "monthly" },
  { path: "/freight-forwarders", priority: "0.5", changefreq: "monthly" },
  { path: "/custom-house-agents", priority: "0.5", changefreq: "monthly" },
  { path: "/inspection-partners", priority: "0.5", changefreq: "monthly" },
  { path: "/finance-partners", priority: "0.5", changefreq: "monthly" },
  { path: "/insurance-partners", priority: "0.5", changefreq: "monthly" },
  { path: "/partner-support", priority: "0.5", changefreq: "monthly" },
  
  // Lower Priority - Trade Solutions
  { path: "/trade-solutions/marketplace", priority: "0.5", changefreq: "monthly" },
  { path: "/trade-solutions/transport", priority: "0.5", changefreq: "monthly" },
  { path: "/trade-solutions/inspection", priority: "0.5", changefreq: "monthly" },
  { path: "/trade-solutions/order-finance", priority: "0.5", changefreq: "monthly" },
  { path: "/trade-solutions/api-integrations", priority: "0.5", changefreq: "monthly" },
  
  // Lower Priority - Other
  { path: "/planet1-market", priority: "0.5", changefreq: "monthly" },
  { path: "/policy", priority: "0.4", changefreq: "yearly" },
  { path: "/contact", priority: "0.6", changefreq: "monthly" }
];

const today = new Date().toISOString().split('T')[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${ROUTES_CONFIG.map(route => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

const outputPath = join(__dirname, '..', 'public', 'sitemap.xml');
writeFileSync(outputPath, sitemap, 'utf-8');

console.log(`✓ Generated sitemap.xml with ${ROUTES_CONFIG.length} URLs`);
console.log(`  Output: ${outputPath}`);
console.log(`  Last modified: ${today}`);

// Also generate a simple URL list for reference
const urlList = ROUTES_CONFIG.map(r => `${SITE_URL}${r.path}`).join('\n');
const urlListPath = join(__dirname, '..', 'public', 'urls.txt');
writeFileSync(urlListPath, urlList, 'utf-8');
console.log(`✓ Generated urls.txt for reference`);
