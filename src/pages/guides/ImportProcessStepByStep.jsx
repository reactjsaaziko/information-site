// Import Process Step by Step - SEO Guide Page
import { CheckCircle, AlertTriangle, Package, Truck } from 'lucide-react'
import GuidePageLayout from '../../components/GuidePageLayout'
import AazikoHelpsBlock from '../../components/AazikoHelpsBlock'

const ImportProcessStepByStep = () => {
  const intro = `Importing goods requires careful planning and execution across multiple stages—from finding suppliers to receiving goods at your warehouse. Understanding each step helps you manage timelines, control costs, and avoid common pitfalls. This comprehensive guide walks you through the complete import process, covering supplier selection, order placement, quality inspection, shipping, customs clearance, and final delivery.`

  const sections = [
    {
      heading: 'Import Process Overview',
      content: (
        <>
          <p>The import journey typically follows these major phases:</p>
          <div className="seo-grid-3">
            <div className="seo-card">
              <h3>Phase 1: Sourcing</h3>
              <p>Find suppliers, request quotes, negotiate terms, place order</p>
            </div>
            <div className="seo-card">
              <h3>Phase 2: Production & Shipping</h3>
              <p>Monitor production, arrange inspection, coordinate shipping</p>
            </div>
            <div className="seo-card">
              <h3>Phase 3: Clearance & Delivery</h3>
              <p>Customs clearance, duty payment, local delivery</p>
            </div>
          </div>
        </>
      )
    },
    {
      heading: 'Step 1: Find and Verify Suppliers',
      content: (
        <>
          <p>Supplier selection is critical for successful importing:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>Research Suppliers:</strong> Use B2B platforms, trade shows, industry referrals</li>
            <li><CheckCircle size={18} /> <strong>Verify Credentials:</strong> Check business registration, export history, certifications</li>
            <li><CheckCircle size={18} /> <strong>Request Samples:</strong> Evaluate product quality before bulk orders</li>
            <li><CheckCircle size={18} /> <strong>Check References:</strong> Contact existing buyers for feedback</li>
            <li><CheckCircle size={18} /> <strong>Factory Audit:</strong> Consider on-site verification for large orders</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Step 2: Request Quotes and Negotiate',
      content: (
        <>
          <ol className="seo-steps">
            <li><strong>Submit RFQ:</strong> Provide detailed product specifications, quantity, delivery requirements</li>
            <li><strong>Compare Quotes:</strong> Evaluate pricing, MOQ, lead time, payment terms across suppliers</li>
            <li><strong>Clarify Incoterms:</strong> Understand what's included in the price (FOB, CIF, DDP)</li>
            <li><strong>Negotiate Terms:</strong> Discuss pricing, payment schedule, quality guarantees</li>
            <li><strong>Request Proforma Invoice:</strong> Get formal quote document with all terms</li>
          </ol>
        </>
      )
    },
    {
      heading: 'Step 3: Place Order and Arrange Payment',
      content: (
        <>
          <p>Formalize the order with proper documentation:</p>
          <div className="seo-grid-2">
            <div className="seo-card">
              <h3>Order Documentation</h3>
              <ul>
                <li>Purchase Order (PO)</li>
                <li>Sales Contract</li>
                <li>Product specifications</li>
                <li>Packing requirements</li>
                <li>Labeling instructions</li>
              </ul>
            </div>
            <div className="seo-card">
              <h3>Payment Options</h3>
              <ul>
                <li>T/T (Bank Transfer): 30% advance + 70% before shipment</li>
                <li>Letter of Credit (LC): Bank-guaranteed payment</li>
                <li>Escrow: Third-party holds funds</li>
                <li>Trade Finance: Financing options available</li>
              </ul>
            </div>
          </div>
        </>
      )
    },
    {
      heading: 'Step 4: Monitor Production and Arrange Inspection',
      content: (
        <>
          <p>Stay informed during the production phase:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>Production Updates:</strong> Request regular progress reports with photos/videos</li>
            <li><CheckCircle size={18} /> <strong>In-Process Check:</strong> Optional inspection during production for large orders</li>
            <li><CheckCircle size={18} /> <strong>Pre-Shipment Inspection:</strong> Final quality check before goods are packed</li>
            <li><CheckCircle size={18} /> <strong>Review Inspection Report:</strong> Approve or request corrections before shipping</li>
          </ul>
          <div className="seo-info-box">
            <p><Package size={18} style={{display: 'inline', marginRight: '8px'}} />
            Pre-shipment inspection is your last chance to catch quality issues before goods leave the factory.</p>
          </div>
        </>
      )
    },
    {
      heading: 'Step 5: Shipping and Documentation',
      content: (
        <>
          <p>Coordinate shipping and collect required documents:</p>
          <ol className="seo-steps">
            <li><strong>Book Freight:</strong> Arrange shipping (or supplier arranges if CIF/DDP)</li>
            <li><strong>Receive Shipping Advice:</strong> Get vessel/flight details and ETD/ETA</li>
            <li><strong>Collect Documents:</strong> Commercial Invoice, Packing List, B/L, COO, certificates</li>
            <li><strong>Arrange Insurance:</strong> Ensure cargo is covered during transit</li>
            <li><strong>Track Shipment:</strong> Monitor cargo location and estimated arrival</li>
          </ol>
        </>
      )
    },
    {
      heading: 'Step 6: Customs Clearance',
      content: (
        <>
          <p>Clear goods through customs at destination:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>File Bill of Entry:</strong> Submit import declaration with all documents</li>
            <li><CheckCircle size={18} /> <strong>Customs Assessment:</strong> Duty calculation based on HS code and value</li>
            <li><CheckCircle size={18} /> <strong>Pay Duties:</strong> Clear customs duty, GST/VAT, and applicable cess</li>
            <li><CheckCircle size={18} /> <strong>Examination:</strong> Present goods if selected for physical inspection</li>
            <li><CheckCircle size={18} /> <strong>Out of Charge:</strong> Receive clearance to take delivery</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Step 7: Take Delivery',
      content: (
        <>
          <div className="seo-grid-2">
            <div className="seo-card">
              <h3>Port/Airport Pickup</h3>
              <p>Arrange transport from port to your warehouse. Check for demurrage/detention deadlines.</p>
            </div>
            <div className="seo-card">
              <h3>Delivery Inspection</h3>
              <p>Verify quantity and condition upon receipt. Document any damage for insurance claims.</p>
            </div>
          </div>
          <div className="seo-info-box">
            <p><Truck size={18} style={{display: 'inline', marginRight: '8px'}} />
            Clear cargo promptly to avoid demurrage (port storage) and detention (container) charges.</p>
          </div>
        </>
      )
    },
    {
      heading: 'Common Import Mistakes to Avoid',
      content: (
        <>
          <div className="seo-warning-box">
            <p><AlertTriangle size={18} style={{display: 'inline', marginRight: '8px'}} />
            These common mistakes lead to delays, unexpected costs, and quality issues.</p>
          </div>
          <ul className="seo-checklist">
            <li><AlertTriangle size={18} color="#f59e0b" /> Ordering without sample approval</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Skipping supplier verification</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Not arranging pre-shipment inspection</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Unclear product specifications in PO</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Underestimating total landed cost</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Delaying customs clearance (demurrage costs)</li>
          </ul>
        </>
      )
    }
  ]

  const faqs = [
    { q: 'How long does the import process take?', a: 'Timeline varies by origin and shipping method. Typical breakdown: Sourcing 1-2 weeks, production 2-4 weeks, sea freight 4-8 weeks, customs clearance 2-5 days. Total: 8-14 weeks for sea freight.' },
    { q: 'What is the minimum order quantity (MOQ)?', a: 'MOQ varies by product and supplier. Manufacturers typically have higher MOQs (500-1000+ units) than trading companies. Negotiate based on your needs and order frequency.' },
    { q: 'How do I calculate total landed cost?', a: 'Landed cost = Product cost + Freight + Insurance + Customs duty + GST/VAT + Port charges + Local delivery + Inspection fees. Request CIF or DDP quotes for easier comparison.' },
    { q: 'What if goods arrive damaged?', a: 'Document damage immediately with photos. File insurance claim within the policy timeframe (usually 3-7 days). Having pre-shipment inspection evidence strengthens your claim.' },
    { q: 'Do I need an import license?', a: 'Most goods can be imported freely. However, some categories (food, pharmaceuticals, electronics, chemicals) require specific licenses or registrations. Check your country\'s import regulations.' }
  ]

  const relatedLinks = [
    { label: 'Export Import Guides Hub', to: '/guides' },
    { label: 'Submit RFQ', to: '/rfq' },
    { label: 'Verified Suppliers', to: '/verified-suppliers' },
    { label: 'Customs Documentation', to: '/customs-documentation' },
    { label: 'Contact Support', to: '/contact' }
  ]

  const aazikoHelps = {
    bullets: [
      'Our platform connects you with verified suppliers, reducing sourcing risk',
      'Track your order through every stage from production to delivery',
      'Customs documentation support simplifies the clearance process',
      'Dispute resolution protection if issues arise during import'
    ],
    links: [
      { label: 'Customs Documentation', to: '/customs-documentation' },
      { label: 'Shipment Tracking', to: '/shipment-tracking' },
      { label: 'Dispute Resolution', to: '/dispute-resolution' }
    ]
  }

  return (
    <GuidePageLayout
      title="Import Process Step by Step: Complete Guide for Buyers"
      intro={intro}
      sections={sections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      badge="Import Guide"
      badgeIcon={<Truck size={16} />}
    >
      <AazikoHelpsBlock
        bullets={aazikoHelps.bullets}
        links={aazikoHelps.links}
      />
    </GuidePageLayout>
  )
}

export default ImportProcessStepByStep
