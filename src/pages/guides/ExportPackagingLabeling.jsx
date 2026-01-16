// Export Packaging & Labeling Guide - SEO Guide Page (Cluster B)
import { CheckCircle, AlertTriangle, Package, Tag, Box, FileText, Shield } from 'lucide-react'
import GuidePageLayout from '../../components/GuidePageLayout'
import AazikoHelpsBlock from '../../components/AazikoHelpsBlock'

const ExportPackagingLabeling = () => {
  const intro = `Proper packaging and labeling are critical for successful international shipments. Poor packaging leads to damaged goods, while incorrect labeling causes customs delays, rejections, and compliance issues. This guide covers export packaging standards, labeling requirements for different markets, and practical checklists to ensure your shipments arrive safely and clear customs smoothly. Whether you're shipping to the EU, US, Middle East, or Asia, understanding these requirements prevents costly mistakes.`

  const sections = [
    {
      heading: 'Export Packaging Standards Checklist',
      content: (
        <>
          <p>Follow these packaging standards for international shipments:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>Inner packaging:</strong> Product-appropriate protection (bubble wrap, foam, dividers)</li>
            <li><CheckCircle size={18} /> <strong>Carton quality:</strong> Export-grade corrugated boxes (minimum 5-ply for heavy items)</li>
            <li><CheckCircle size={18} /> <strong>Moisture protection:</strong> Silica gel, moisture barriers for sensitive products</li>
            <li><CheckCircle size={18} /> <strong>Strapping and sealing:</strong> Proper tape, strapping bands, corner protectors</li>
            <li><CheckCircle size={18} /> <strong>Palletization:</strong> Heat-treated pallets (ISPM-15 compliant) for most destinations</li>
            <li><CheckCircle size={18} /> <strong>Container loading:</strong> Proper weight distribution, securing, and dunnage</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Carton Marking Requirements',
      content: (
        <>
          <p>Every export carton should include these markings:</p>
          <div className="seo-grid-2">
            <div className="seo-card">
              <h3>Mandatory Markings</h3>
              <ul className="seo-checklist">
                <li><Tag size={16} /> Shipper/Consignee details</li>
                <li><Tag size={16} /> Country of origin</li>
                <li><Tag size={16} /> Carton number (e.g., 1/50, 2/50)</li>
                <li><Tag size={16} /> Net weight / Gross weight</li>
                <li><Tag size={16} /> Dimensions (L × W × H)</li>
              </ul>
            </div>
            <div className="seo-card">
              <h3>Handling Symbols</h3>
              <ul className="seo-checklist">
                <li><Box size={16} /> Fragile (wine glass symbol)</li>
                <li><Box size={16} /> Keep dry (umbrella symbol)</li>
                <li><Box size={16} /> This way up (arrows)</li>
                <li><Box size={16} /> Do not stack (if applicable)</li>
                <li><Box size={16} /> Temperature sensitive (if applicable)</li>
              </ul>
            </div>
          </div>
        </>
      )
    },
    {
      heading: 'Product Labeling by Destination',
      content: (
        <>
          <p>Different markets have specific labeling requirements:</p>
          <div className="seo-grid-2">
            <div className="seo-card">
              <h3>European Union (EU)</h3>
              <ul className="seo-checklist">
                <li><CheckCircle size={16} /> CE marking (for applicable products)</li>
                <li><CheckCircle size={16} /> Local language requirements</li>
                <li><CheckCircle size={16} /> Importer details mandatory</li>
                <li><CheckCircle size={16} /> REACH compliance for chemicals</li>
              </ul>
            </div>
            <div className="seo-card">
              <h3>United States</h3>
              <ul className="seo-checklist">
                <li><CheckCircle size={16} /> Country of origin (Made in...)</li>
                <li><CheckCircle size={16} /> FDA labeling for food/cosmetics</li>
                <li><CheckCircle size={16} /> FCC marking for electronics</li>
                <li><CheckCircle size={16} /> English language required</li>
              </ul>
            </div>
            <div className="seo-card">
              <h3>Middle East / GCC</h3>
              <ul className="seo-checklist">
                <li><CheckCircle size={16} /> Arabic language labels</li>
                <li><CheckCircle size={16} /> Halal certification (food products)</li>
                <li><CheckCircle size={16} /> SASO/GSO standards compliance</li>
                <li><CheckCircle size={16} /> Expiry dates in specific format</li>
              </ul>
            </div>
            <div className="seo-card">
              <h3>General Requirements</h3>
              <ul className="seo-checklist">
                <li><CheckCircle size={16} /> Product name and description</li>
                <li><CheckCircle size={16} /> Manufacturer details</li>
                <li><CheckCircle size={16} /> Batch/lot number</li>
                <li><CheckCircle size={16} /> Manufacturing/expiry dates</li>
              </ul>
            </div>
          </div>
        </>
      )
    },
    {
      heading: 'Common Packaging Mistakes to Avoid',
      content: (
        <>
          <div className="seo-warning-box">
            <p><AlertTriangle size={18} style={{display: 'inline', marginRight: '8px'}} />
            These mistakes cause damage claims, customs holds, and buyer disputes:</p>
          </div>
          <ul className="seo-checklist">
            <li><AlertTriangle size={18} color="#f59e0b" /> Using domestic-grade cartons for export (too weak)</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Missing or incorrect country of origin marking</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Labels not matching invoice/packing list details</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Non-compliant pallets (missing ISPM-15 stamp)</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Inadequate moisture protection for sea freight</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Missing handling symbols for fragile goods</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Pre-Shipment Packaging Checklist',
      content: (
        <>
          <p>Verify these items before dispatch:</p>
          <ol className="seo-steps">
            <li><strong>Inner packaging secure:</strong> Products protected against movement and impact</li>
            <li><strong>Carton integrity:</strong> No damage, proper sealing, correct weight limits</li>
            <li><strong>Labels applied:</strong> All required labels visible and legible</li>
            <li><strong>Markings match documents:</strong> Carton marks align with packing list</li>
            <li><strong>Pallet compliance:</strong> ISPM-15 stamp visible, proper stacking</li>
            <li><strong>Photo documentation:</strong> Capture packaging evidence before loading</li>
          </ol>
        </>
      )
    },
    {
      heading: 'Document-Packaging Alignment',
      content: (
        <>
          <p>Ensure consistency between packaging and documentation:</p>
          <div className="seo-info-box">
            <p><FileText size={18} style={{display: 'inline', marginRight: '8px'}} />
            Customs officers compare physical markings with documents. Any mismatch triggers inspection and delays.</p>
          </div>
          <div className="seo-grid-3">
            <div className="seo-card">
              <h3>Invoice</h3>
              <p>Product description, quantity, value must match labels</p>
            </div>
            <div className="seo-card">
              <h3>Packing List</h3>
              <p>Carton numbers, weights, dimensions must match markings</p>
            </div>
            <div className="seo-card">
              <h3>COO</h3>
              <p>Country of origin on labels must match certificate</p>
            </div>
          </div>
        </>
      )
    }
  ]

  const faqs = [
    { q: 'What is ISPM-15 and why does it matter?', a: 'ISPM-15 is an international standard for wood packaging materials. It requires heat treatment or fumigation to prevent pest spread. Most countries require ISPM-15 compliant pallets and crates. Non-compliant wood packaging can be rejected at customs.' },
    { q: 'Do I need different labels for different countries?', a: 'Yes, labeling requirements vary by destination. Some countries require local language, specific certifications (CE, FDA), or particular formats for dates and measurements. Always verify destination requirements before production.' },
    { q: 'How do I handle labeling for multiple destinations?', a: 'Create a master label with universal requirements, then add destination-specific stickers or secondary labels. Some exporters use multi-language labels covering common destinations.' },
    { q: 'What happens if my packaging doesn\'t match documents?', a: 'Customs may hold the shipment for inspection, require amendments, or reject entry. This causes delays of 2–10 days and additional fees. In serious cases, goods may be returned or destroyed.' },
    { q: 'Should I photograph my packaging before shipping?', a: 'Yes, always document packaging with photos and videos. This provides evidence for insurance claims, dispute resolution, and quality verification. Capture carton markings, pallet stamps, and loading process.' }
  ]

  const relatedLinks = [
    { label: 'Export Import Guides Hub', to: '/guides' },
    { label: 'Submit RFQ', to: '/rfq' },
    { label: 'Find Verified Suppliers', to: '/verified-suppliers' },
    { label: 'Export Documentation', to: '/export-documentation' },
    { label: 'Customs Documentation', to: '/customs-documentation' }
  ]

  const aazikoHelps = {
    bullets: [
      'Packaging + labeling checklist aligned with common export practice',
      'Reduce clearance issues by matching labels with documents',
      'Avoid invoice/packing-list mismatches that cause holds',
      'Track shipment milestones once dispatch happens'
    ],
    links: [
      { label: 'Export Documentation', to: '/export-documentation' },
      { label: 'Customs Documentation', to: '/customs-documentation' },
      { label: 'Shipment Tracking', to: '/shipment-tracking' },
      { label: 'Contact Us', to: '/contact' }
    ]
  }

  return (
    <GuidePageLayout
      title="Export Packaging & Labeling: Complete Requirements Guide"
      intro={intro}
      sections={sections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      badge="Export Guide"
    >
      <AazikoHelpsBlock
        bullets={aazikoHelps.bullets}
        links={aazikoHelps.links}
      />
    </GuidePageLayout>
  )
}

export default ExportPackagingLabeling
