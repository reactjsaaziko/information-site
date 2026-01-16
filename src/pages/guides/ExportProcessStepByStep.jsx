// Export Process Step by Step - SEO Guide Page
import { CheckCircle, AlertTriangle, Ship, Package } from 'lucide-react'
import GuidePageLayout from '../../components/GuidePageLayout'
import AazikoHelpsBlock from '../../components/AazikoHelpsBlock'

const ExportProcessStepByStep = () => {
  const intro = `Exporting goods involves multiple stages from order confirmation to final delivery. Understanding each step helps you plan timelines, prepare documents, and avoid common pitfalls. This comprehensive guide walks you through the complete export process, covering production, quality inspection, documentation, customs clearance, and shipping. Whether you're a supplier preparing your first export or scaling operations, this step-by-step guide ensures smooth execution.`

  const sections = [
    {
      heading: 'Export Process Overview',
      content: (
        <>
          <p>The export journey typically follows these major phases:</p>
          <div className="seo-grid-3">
            <div className="seo-card">
              <h3>Phase 1: Order & Production</h3>
              <p>Contract signing, advance payment, manufacturing, quality control</p>
            </div>
            <div className="seo-card">
              <h3>Phase 2: Pre-Shipment</h3>
              <p>Inspection, documentation, packing, customs filing</p>
            </div>
            <div className="seo-card">
              <h3>Phase 3: Shipping & Delivery</h3>
              <p>Cargo handover, transit, destination clearance, final delivery</p>
            </div>
          </div>
        </>
      )
    },
    {
      heading: 'Step 1: Order Confirmation & Contract',
      content: (
        <>
          <p>Establish clear terms before production begins:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>Proforma Invoice:</strong> Detailed quote with product specs, pricing, Incoterm, payment terms</li>
            <li><CheckCircle size={18} /> <strong>Purchase Order:</strong> Buyer's formal order confirmation</li>
            <li><CheckCircle size={18} /> <strong>Sales Contract:</strong> Legally binding agreement covering all terms</li>
            <li><CheckCircle size={18} /> <strong>Advance Payment:</strong> Typically 30% advance to start production</li>
          </ul>
          <div className="seo-info-box">
            <p><Package size={18} style={{display: 'inline', marginRight: '8px'}} />
            Tip: Ensure product specifications, packing requirements, and labeling details are clearly documented in the contract.</p>
          </div>
        </>
      )
    },
    {
      heading: 'Step 2: Production & Quality Control',
      content: (
        <>
          <ol className="seo-steps">
            <li><strong>Production Planning:</strong> Schedule manufacturing based on lead time and shipping deadline</li>
            <li><strong>Raw Material Procurement:</strong> Source materials meeting buyer specifications</li>
            <li><strong>Manufacturing:</strong> Produce goods per approved samples and specs</li>
            <li><strong>In-Process QC:</strong> Regular quality checks during production</li>
            <li><strong>Final QC:</strong> Complete inspection before packing</li>
            <li><strong>Production Updates:</strong> Share progress photos/videos with buyer</li>
          </ol>
        </>
      )
    },
    {
      heading: 'Step 3: Pre-Shipment Inspection',
      content: (
        <>
          <p>Quality inspection protects both buyer and seller:</p>
          <div className="seo-grid-2">
            <div className="seo-card">
              <h3>What Inspectors Check</h3>
              <ul>
                <li>Quantity verification</li>
                <li>Quality vs. approved sample</li>
                <li>Packing and labeling</li>
                <li>Functionality testing</li>
                <li>Documentation accuracy</li>
              </ul>
            </div>
            <div className="seo-card">
              <h3>Inspection Outcomes</h3>
              <ul>
                <li><strong>Pass:</strong> Goods ready for shipment</li>
                <li><strong>Conditional:</strong> Minor issues to fix</li>
                <li><strong>Fail:</strong> Major issues requiring rework</li>
              </ul>
            </div>
          </div>
        </>
      )
    },
    {
      heading: 'Step 4: Export Documentation',
      content: (
        <>
          <p>Prepare all required documents before cargo handover:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>Commercial Invoice:</strong> Final invoice with all shipment details</li>
            <li><CheckCircle size={18} /> <strong>Packing List:</strong> Carton-wise breakdown of contents</li>
            <li><CheckCircle size={18} /> <strong>Certificate of Origin:</strong> Apply through chamber of commerce</li>
            <li><CheckCircle size={18} /> <strong>Shipping Bill:</strong> Export declaration filed with customs</li>
            <li><CheckCircle size={18} /> <strong>Product Certificates:</strong> Test reports, compliance certificates as required</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Step 5: Customs Clearance & Cargo Handover',
      content: (
        <>
          <ol className="seo-steps">
            <li><strong>File Shipping Bill:</strong> Submit export declaration through customs portal (ICEGATE in India)</li>
            <li><strong>Customs Examination:</strong> Present goods if selected for physical inspection</li>
            <li><strong>Let Export Order:</strong> Receive clearance to export</li>
            <li><strong>Cargo Handover:</strong> Deliver goods to port/airport/carrier</li>
            <li><strong>Bill of Lading:</strong> Obtain transport document from shipping line</li>
          </ol>
        </>
      )
    },
    {
      heading: 'Step 6: Shipping & Transit',
      content: (
        <>
          <div className="seo-grid-2">
            <div className="seo-card">
              <h3>Sea Freight</h3>
              <p><strong>Timeline:</strong> 4-8 weeks depending on route</p>
              <p><strong>Best for:</strong> Large volumes, cost-sensitive shipments</p>
              <p><strong>Document:</strong> Bill of Lading (B/L)</p>
            </div>
            <div className="seo-card">
              <h3>Air Freight</h3>
              <p><strong>Timeline:</strong> 3-7 days</p>
              <p><strong>Best for:</strong> Urgent, high-value, perishable goods</p>
              <p><strong>Document:</strong> Airway Bill (AWB)</p>
            </div>
          </div>
          <div className="seo-info-box">
            <p><Ship size={18} style={{display: 'inline', marginRight: '8px'}} />
            Track your shipment using the B/L or AWB number through the carrier's website or tracking platforms.</p>
          </div>
        </>
      )
    },
    {
      heading: 'Common Export Mistakes to Avoid',
      content: (
        <>
          <div className="seo-warning-box">
            <p><AlertTriangle size={18} style={{display: 'inline', marginRight: '8px'}} />
            These common mistakes cause delays, additional costs, and buyer dissatisfaction.</p>
          </div>
          <ul className="seo-checklist">
            <li><AlertTriangle size={18} color="#f59e0b" /> Starting production without confirmed payment terms</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Skipping pre-shipment inspection</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Document preparation at the last minute</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Incorrect HS code classification</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Packing not suitable for export (damage risk)</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Missing shipping deadlines due to poor planning</li>
          </ul>
        </>
      )
    }
  ]

  const faqs = [
    { q: 'How long does the export process take?', a: 'Timeline varies by product and destination. Typical breakdown: Production 2-4 weeks, inspection 3-5 days, documentation 2-3 days, sea freight 4-8 weeks. Total: 8-14 weeks for sea freight orders.' },
    { q: 'What payment terms are common in exports?', a: 'Common terms include: 30% advance + 70% before shipment, Letter of Credit (LC), 100% advance for small orders, or milestone-based payments for large orders.' },
    { q: 'Is pre-shipment inspection mandatory?', a: 'Not always mandatory, but highly recommended for first orders, high-value shipments, and custom products. Inspection provides evidence that protects both parties.' },
    { q: 'Who arranges shipping in FOB terms?', a: 'Under FOB (Free On Board), the seller delivers goods to the vessel at origin port. The buyer arranges and pays for freight from that point.' },
    { q: 'What happens if goods are damaged during shipping?', a: 'Marine insurance covers transit damage. File a claim with the insurance company using the inspection report, photos, and shipping documents as evidence.' }
  ]

  const relatedLinks = [
    { label: 'Export Import Guides Hub', to: '/guides' },
    { label: 'Submit RFQ', to: '/rfq' },
    { label: 'Verified Suppliers', to: '/verified-suppliers' },
    { label: 'Export Documentation', to: '/export-documentation' },
    { label: 'Contact Support', to: '/contact' }
  ]

  const aazikoHelps = {
    bullets: [
      'Our structured order process guides you through each export stage',
      'Built-in milestone tracking keeps production and shipping on schedule',
      'Real-time shipment tracking from factory to destination port',
      'Submit RFQs and receive quotes from verified buyers worldwide'
    ],
    links: [
      { label: 'How We Work', to: '/how-we-work' },
      { label: 'Submit RFQ', to: '/rfq' },
      { label: 'Shipment Tracking', to: '/shipment-tracking' }
    ]
  }

  return (
    <GuidePageLayout
      title="Export Process Step by Step: Complete Guide for Suppliers"
      intro={intro}
      sections={sections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      badge="Export Guide"
      badgeIcon={<Ship size={16} />}
    >
      <AazikoHelpsBlock
        bullets={aazikoHelps.bullets}
        links={aazikoHelps.links}
      />
    </GuidePageLayout>
  )
}

export default ExportProcessStepByStep
