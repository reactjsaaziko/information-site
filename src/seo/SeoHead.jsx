/**
 * Global SEO Head Component
 * Automatically sets meta tags and structured data based on current route
 */
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { ROUTE_META, DEFAULT_META, SECTION_DEFAULTS, SITE_URL } from './seoRoutes';

export default function SeoHead({ faqs = [], pageType = 'website' }) {
  const { pathname } = useLocation();
  
  // Get meta for current route
  const meta = getMetaForPath(pathname);
  
  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumb(pathname);
  
  // Generate FAQ schema if FAQs provided
  const faqSchema = faqs.length > 0 ? {
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
  } : null;
  
  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.canonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={meta.canonical} />
      <meta property="og:type" content={pageType} />
      <meta property="og:site_name" content="Aaziko" />
      <meta property="og:image" content={`${SITE_URL}/aaziko.png`} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={`${SITE_URL}/aaziko.png`} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large" />
      
      {/* Breadcrumb Schema */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      
      {/* FAQ Schema */}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
    </Helmet>
  );
}

/**
 * Get meta tags for a given path
 * Falls back to section defaults, then global default
 */
function getMetaForPath(pathname) {
  // Normalize path (remove trailing slash)
  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
  
  // Exact match in ROUTE_META
  if (ROUTE_META[normalizedPath]) {
    return ROUTE_META[normalizedPath];
  }
  
  // Section-based fallback
  if (normalizedPath.startsWith('/buyers')) {
    return {
      ...SECTION_DEFAULTS.buyers,
      canonical: `${SITE_URL}${normalizedPath}`
    };
  }
  
  if (normalizedPath.startsWith('/suppliers')) {
    return {
      ...SECTION_DEFAULTS.suppliers,
      canonical: `${SITE_URL}${normalizedPath}`
    };
  }
  
  if (normalizedPath.startsWith('/partners')) {
    return {
      ...SECTION_DEFAULTS.partners,
      canonical: `${SITE_URL}${normalizedPath}`
    };
  }
  
  if (normalizedPath.startsWith('/learn')) {
    return {
      ...SECTION_DEFAULTS.learn,
      canonical: `${SITE_URL}${normalizedPath}`
    };
  }
  
  // Global fallback
  return {
    ...DEFAULT_META,
    canonical: normalizedPath === '/' ? SITE_URL : `${SITE_URL}${normalizedPath}`
  };
}

/**
 * Generate breadcrumb structured data
 */
function generateBreadcrumb(pathname) {
  if (pathname === '/') return null;
  
  const parts = pathname.split('/').filter(Boolean);
  const items = [
    { 
      "@type": "ListItem", 
      "position": 1, 
      "name": "Home", 
      "item": SITE_URL 
    }
  ];
  
  let currentPath = '';
  parts.forEach((part, index) => {
    currentPath += `/${part}`;
    items.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": formatBreadcrumbName(part),
      "item": `${SITE_URL}${currentPath}`
    });
  });
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items
  };
}

/**
 * Format URL segment to readable name
 */
function formatBreadcrumbName(segment) {
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}
