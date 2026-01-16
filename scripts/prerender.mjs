/**
 * Prerender Script
 * Generates static HTML for canonical SEO routes using Puppeteer
 * Run: node scripts/prerender.mjs
 */
import puppeteer from 'puppeteer';
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createServer } from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = join(__dirname, '..', 'dist');

// Canonical routes for prerendering
const CANONICAL_ROUTES = [
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

const PORT = 4173;

// Simple static file server
function createStaticServer(dir, port) {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(dir, req.url === '/' ? 'index.html' : req.url);
      
      // For SPA routes, serve index.html
      if (!existsSync(filePath) || !filePath.includes('.')) {
        filePath = join(dir, 'index.html');
      }
      
      try {
        const content = readFileSync(filePath);
        const ext = filePath.split('.').pop();
        const mimeTypes = {
          'html': 'text/html',
          'js': 'application/javascript',
          'css': 'text/css',
          'json': 'application/json',
          'png': 'image/png',
          'jpg': 'image/jpeg',
          'svg': 'image/svg+xml',
          'ico': 'image/x-icon'
        };
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
        res.end(content);
      } catch (e) {
        res.writeHead(404);
        res.end('Not found');
      }
    });
    
    server.listen(port, () => {
      console.log(`📡 Static server running on http://localhost:${port}`);
      resolve(server);
    });
  });
}

async function prerender() {
  console.log('🚀 Starting prerender...');
  console.log(`📁 Static dir: ${distDir}`);
  console.log(`📄 Routes to prerender: ${CANONICAL_ROUTES.length}\n`);

  // Start static server
  const server = await createStaticServer(distDir, PORT);
  
  // Launch browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  let successCount = 0;
  let failCount = 0;

  try {
    for (const route of CANONICAL_ROUTES) {
      const page = await browser.newPage();
      
      try {
        // Inject prerender flag
        await page.evaluateOnNewDocument(() => {
          window.__PRERENDER_INJECTED = { prerender: true };
        });
        
        const url = `http://localhost:${PORT}${route}`;
        console.log(`⏳ Rendering ${route}...`);
        
        // Navigate and wait for content
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
        
        // Wait for prerender-ready event or timeout
        await Promise.race([
          page.evaluate(() => {
            return new Promise((resolve) => {
              if (document.readyState === 'complete') {
                // Give React and Helmet time to render
                setTimeout(resolve, 3000);
              } else {
                document.addEventListener('prerender-ready', resolve);
                setTimeout(resolve, 5000);
              }
            });
          }),
          new Promise(resolve => setTimeout(resolve, 8000))
        ]);
        
        // Wait additional time for Helmet to update the head
        await page.waitForFunction(() => {
          const title = document.title;
          return title && !title.includes('Make Planet Your Market');
        }, { timeout: 5000 }).catch(() => {
          // If title doesn't change, continue anyway
        });
        
        // Get rendered HTML
        const html = await page.content();
        
        // Create output directory and file
        const outputDir = join(distDir, route);
        const outputFile = join(outputDir, 'index.html');
        
        if (!existsSync(outputDir)) {
          mkdirSync(outputDir, { recursive: true });
        }
        
        writeFileSync(outputFile, html);
        console.log(`✓ ${route}`);
        successCount++;
        
      } catch (error) {
        console.error(`✗ ${route}: ${error.message}`);
        failCount++;
      } finally {
        await page.close();
      }
    }
    
    console.log(`\n✅ Prerender complete: ${successCount} succeeded, ${failCount} failed`);
    
  } finally {
    await browser.close();
    server.close();
  }
}

prerender().catch(console.error);
