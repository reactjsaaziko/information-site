# Aaziko SEO Implementation Guide

Complete step-by-step guide to optimize your Vite + React website for search engines.

---

## Current SEO Status ✅

Your website already has:
- `SeoHead.jsx` - Dynamic meta tags per route
- `seoRoutes.js` - Centralized route metadata
- `robots.txt` - Search engine crawl rules
- `sitemap.xml` - URL list for search engines
- `SeoPageLayout.jsx` - Semantic HTML structure for content pages

---

## SEO Implementation Checklist

### Phase 1: Technical SEO Foundation

#### 1.1 Update index.html with Essential Meta Tags

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Primary Meta Tags -->
    <title>Aaziko - Global B2B Trade Platform | Verified Suppliers</title>
    <meta name="description" content="Connect with verified suppliers for secure international B2B trade. Quality inspection, customs documentation, and end-to-end logistics support." />
    <meta name="keywords" content="B2B trade, verified suppliers, international trade, export import, quality inspection, trade finance" />
    <meta name="author" content="Aaziko" />
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
    <link rel="apple-touch-icon" href="/aaziko-logo.png" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://aaziko.com/" />
    <meta property="og:title" content="Aaziko - Global B2B Trade Platform" />
    <meta property="og:description" content="Connect with verified suppliers for secure international B2B trade." />
    <meta property="og:image" content="https://aaziko.com/aaziko.png" />
    <meta property="og:site_name" content="Aaziko" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="https://aaziko.com/" />
    <meta name="twitter:title" content="Aaziko - Global B2B Trade Platform" />
    <meta name="twitter:description" content="Connect with verified suppliers for secure international B2B trade." />
    <meta name="twitter:image" content="https://aaziko.com/aaziko.png" />
    
    <!-- Canonical -->
    <link rel="canonical" href="https://aaziko.com/" />
    
    <!-- Theme Color -->
    <meta name="theme-color" content="#2563eb" />
    
    <!-- Robots -->
    <meta name="robots" content="index, follow" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

#### 1.2 Enhance SeoHead.jsx with Structured Data

Add JSON-LD structured data for rich snippets in search results.


#### 1.3 Create Enhanced SeoHead with Structured Data

Update `src/seo/SeoHead.jsx` to include JSON-LD:

```jsx
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { ROUTE_META, DEFAULT_META, SITE_URL } from './seoRoutes';

export default function SeoHead() {
  const { pathname } = useLocation();
  const meta = getMetaForPath(pathname);
  
  // Organization structured data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aaziko",
    "url": "https://aaziko.com",
    "logo": "https://aaziko.com/aaziko-logo.png",
    "description": "Global B2B trade platform connecting buyers with verified suppliers",
    "sameAs": [
      "https://linkedin.com/company/aaziko",
      "https://twitter.com/aaziko"
    ]
  };

  // Website structured data
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Aaziko",
    "url": "https://aaziko.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://aaziko.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Breadcrumb structured data
  const breadcrumbSchema = generateBreadcrumb(pathname);

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.canonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={meta.canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Aaziko" />
      <meta property="og:image" content="https://aaziko.com/aaziko.png" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content="https://aaziko.com/aaziko.png" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
}

function generateBreadcrumb(pathname) {
  if (pathname === '/') return null;
  
  const parts = pathname.split('/').filter(Boolean);
  const items = [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://aaziko.com" }
  ];
  
  let currentPath = '';
  parts.forEach((part, index) => {
    currentPath += `/${part}`;
    items.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      "item": `https://aaziko.com${currentPath}`
    });
  });
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items
  };
}
```

---

### Phase 2: Content SEO

#### 2.1 Page Structure Requirements

Every SEO-important page should have:

| Element | Requirement |
|---------|-------------|
| H1 | Exactly 1 per page, contains primary keyword |
| H2 | 3-6 sections with secondary keywords |
| Meta Title | 50-60 characters, keyword at start |
| Meta Description | 150-160 characters, includes CTA |
| Internal Links | 3-5 links to related pages |
| FAQ Section | 3-6 questions (enables FAQ rich snippets) |
| Word Count | 800-2000 words for informational pages |

#### 2.2 Priority Pages for SEO (Already Updated)

These pages now use `SeoPageLayout` with proper structure:

1. `/guides` - Export Import Guides
2. `/trade-agreements` - Trade Agreements
3. `/customs-documentation` - Customs Documentation
4. `/export-documentation` - Export Documentation
5. `/verified-suppliers` - Verified Suppliers
6. `/how-we-work` - How We Work
7. `/dispute-resolution` - Dispute Resolution
8. `/shipment-tracking` - Shipment Tracking

#### 2.3 Update Meta Descriptions in seoRoutes.js

Improve meta descriptions to be more compelling:

```javascript
// Example improved meta descriptions
"/guides": {
  title: "Export Import Guides | Step-by-Step Trade Documentation | Aaziko",
  description: "Learn export-import procedures with practical guides. HS codes, Incoterms, customs documentation, and shipping checklists for international trade.",
  canonical: `${SITE_URL}/guides`
},
"/verified-suppliers": {
  title: "Verified Suppliers | Quality-Checked Indian Manufacturers | Aaziko",
  description: "Connect with verified Indian suppliers. Background checks, product testing, and ongoing monitoring ensure reliable sourcing partners.",
  canonical: `${SITE_URL}/verified-suppliers`
},
```

---

### Phase 3: Technical Performance

#### 3.1 Core Web Vitals Optimization

```javascript
// vite.config.js optimizations
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion', 'gsap'],
          three: ['three', '@react-three/fiber', '@react-three/drei']
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
});
```

#### 3.2 Image Optimization

1. Use WebP format for all images
2. Add width/height attributes to prevent layout shift
3. Implement lazy loading for below-fold images

```jsx
// Example optimized image
<img 
  src="/images/product.webp" 
  alt="Verified supplier product inspection"
  width="800" 
  height="600"
  loading="lazy"
/>
```

#### 3.3 Prerendering for SEO

Your `scripts/prerender.mjs` should generate static HTML for all routes:

```javascript
// Run before deployment
node scripts/prerender.mjs
```

---

### Phase 4: Structured Data for Rich Snippets

#### 4.1 FAQ Schema (Add to pages with FAQs)

```jsx
// Add to SeoPageLayout.jsx or individual pages
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }))
};
```

#### 4.2 HowTo Schema (For guide pages)

```javascript
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Export Products from India",
  "description": "Step-by-step guide to export documentation and customs clearance",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Prepare Documents",
      "text": "Gather commercial invoice, packing list, and certificates"
    },
    // ... more steps
  ]
};
```

#### 4.3 Product/Service Schema

```javascript
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "B2B Trade Platform",
  "provider": {
    "@type": "Organization",
    "name": "Aaziko"
  },
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Trade Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Supplier Verification"
        }
      }
    ]
  }
};
```

---

### Phase 5: Sitemap and Indexing

#### 5.1 Enhanced Sitemap with Priority

Update `scripts/generate-sitemap.mjs`:

```javascript
const ROUTES_WITH_PRIORITY = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/guides", priority: "0.9", changefreq: "weekly" },
  { path: "/verified-suppliers", priority: "0.9", changefreq: "weekly" },
  { path: "/how-we-work", priority: "0.9", changefreq: "monthly" },
  { path: "/rfq", priority: "0.9", changefreq: "weekly" },
  { path: "/customs-documentation", priority: "0.8", changefreq: "monthly" },
  { path: "/export-documentation", priority: "0.8", changefreq: "monthly" },
  { path: "/trade-agreements", priority: "0.8", changefreq: "monthly" },
  { path: "/dispute-resolution", priority: "0.7", changefreq: "monthly" },
  { path: "/shipment-tracking", priority: "0.7", changefreq: "monthly" },
  // ... other routes with 0.6-0.5 priority
];
```

#### 5.2 Submit to Search Engines

1. **Google Search Console**
   - Go to: https://search.google.com/search-console
   - Add property: https://aaziko.com
   - Verify ownership (HTML file or DNS)
   - Submit sitemap: https://aaziko.com/sitemap.xml

2. **Bing Webmaster Tools**
   - Go to: https://www.bing.com/webmasters
   - Add site and verify
   - Submit sitemap

---

### Phase 6: Internal Linking Strategy

#### 6.1 Link Architecture

```
Homepage
├── /guides (Hub page)
│   ├── Links to: /customs-documentation
│   ├── Links to: /export-documentation
│   ├── Links to: /trade-agreements
│   └── Links to: /shipment-tracking
├── /verified-suppliers (Hub page)
│   ├── Links to: /rfq
│   ├── Links to: /how-we-work
│   └── Links to: /dispute-resolution
└── /how-we-work (Hub page)
    ├── Links to: /verified-suppliers
    ├── Links to: /shipment-tracking
    └── Links to: /dispute-resolution
```

#### 6.2 Footer Links (Add to Footer.jsx)

```jsx
// SEO-important links in footer
<nav aria-label="Quick Links">
  <h4>For Buyers</h4>
  <Link to="/rfq">Submit RFQ</Link>
  <Link to="/verified-suppliers">Find Suppliers</Link>
  <Link to="/how-we-work">How It Works</Link>
  
  <h4>Resources</h4>
  <Link to="/guides">Export Import Guides</Link>
  <Link to="/customs-documentation">Customs Help</Link>
  <Link to="/trade-agreements">Trade Agreements</Link>
</nav>
```

---

### Phase 7: Monitoring and Maintenance

#### 7.1 Weekly Tasks

- [ ] Check Google Search Console for crawl errors
- [ ] Monitor Core Web Vitals scores
- [ ] Review 404 errors and fix broken links

#### 7.2 Monthly Tasks

- [ ] Update sitemap if new pages added
- [ ] Review and refresh meta descriptions
- [ ] Check keyword rankings for priority pages
- [ ] Add new internal links to recent content

#### 7.3 Quarterly Tasks

- [ ] Content audit - update outdated information
- [ ] Competitor analysis for keyword gaps
- [ ] Review and expand FAQ sections
- [ ] Add new guide/resource pages

---

### Phase 8: Quick Wins Checklist

#### Immediate Actions (Do Today)

- [ ] Update `index.html` with full meta tags
- [ ] Regenerate sitemap: `node scripts/generate-sitemap.mjs`
- [ ] Submit sitemap to Google Search Console
- [ ] Add FAQ schema to priority pages

#### This Week

- [ ] Add structured data (Organization, Website schemas)
- [ ] Optimize images (WebP, lazy loading)
- [ ] Add breadcrumb navigation
- [ ] Improve internal linking in footer

#### This Month

- [ ] Set up Google Search Console monitoring
- [ ] Create 5 more content pages targeting keywords
- [ ] Build backlinks from industry directories
- [ ] Add blog posts with long-tail keywords

---

## Target Keywords by Page

| Page | Primary Keyword | Secondary Keywords |
|------|-----------------|-------------------|
| /guides | export import guide | trade documentation, shipping checklist, customs guide |
| /verified-suppliers | verified suppliers India | B2B suppliers, manufacturer verification |
| /customs-documentation | customs documentation | import compliance, customs clearance |
| /export-documentation | export documents | commercial invoice, packing list, COO |
| /trade-agreements | trade agreements | FTA benefits, preferential duty, COO |
| /how-we-work | B2B trade platform | international sourcing, supplier verification |
| /dispute-resolution | trade dispute resolution | order issues, quality claims |
| /shipment-tracking | shipment tracking | cargo tracking, delivery status |

---

## Tools for SEO Monitoring

1. **Google Search Console** - Free, essential for indexing
2. **Google Analytics 4** - Traffic and user behavior
3. **PageSpeed Insights** - Core Web Vitals
4. **Ahrefs/SEMrush** - Keyword tracking (paid)
5. **Screaming Frog** - Technical SEO audit

---

## Next Steps

1. Implement Phase 1 (Technical Foundation) immediately
2. Set up Google Search Console within 24 hours
3. Add structured data within 1 week
4. Monitor and iterate based on Search Console data
