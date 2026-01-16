// Quality Inspection Checklist Guide - SEO Guide Page (Cluster C)
import { CheckCircle, AlertTriangle, Search, Camera, FileText, Package, Scale, Shield } from 'lucide-react'
import GuidePageLayout from '../../components/GuidePageLayout'
import AazikoHelpsBlock from '../../components/AazikoHelpsBlock'

const QualityInspectionChecklist = () => {
  const intro = `Pre-shipment quality inspection is your last line of defense before goods leave the factory. A thorough inspection verifies that products meet specifications, quantities are correct, and packaging is export-ready. This guide provides a practical inspection checklist covering what to verify, how to document findings, and when to request re-inspection. Whether you're conducting inspection yourself or working with third-party inspectors, this checklist helps ensure nothing is missed.`

  const sections = [
    {
      heading: 'Pre-Inspection Preparation',
      content: (
        <>
          <p>Before inspection day, ensure you have:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>Approved sample:</strong> Reference sample that buyer approved</li>
            <li><CheckCircle size={18} /> <strong>Product specifications:</strong> Detailed specs including materials, dimensions, colors</li>
            <li><CheckCircle size={18} /> <strong>Order quantity:</strong> Total pieces, carton count, pallet count</li>
            <li><CheckCircle size={18} /> <strong>Packaging requirements:</strong> Inner packing, carton specs, labeling requirements</li>
            <li><CheckCircle size={18} /> <strong>Inspection criteria:</strong> AQL levels, critical/major/minor defect definitions</li>
            <li><CheckCircle size={18} /> <strong>Access confirmation:</strong> Factory access arranged, contact person identified</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Quantity Verification Checklist',
      content: (
        <>
          <p>Verify quantities match the order:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>Total piece count:</strong> Count or sample-count to verify total quantity</li>
            <li><CheckCircle size={18} /> <strong>Carton count:</strong> Number of cartons matches packing list</li>
            <li><CheckCircle size={18} /> <strong>Pieces per carton:</strong> Random cartons opened to verify count</li>
            <li><CheckCircle size={18} /> <strong>Size/color assortment:</strong> Breakdown matches order (if applicable)</li>
            <li><CheckCircle size={18} /> <strong>Weight verification:</strong> Net and gross weights within tolerance</li>
          </ul>
          <div className="seo-info-box">
            <p><Scale size={18} style={{display: 'inline', marginRight: '8px'}} />
            For large orders, use statistical sampling (e.g., square root of carton count) rather than 100% count.</p>
          </div>
        </>
      )
    },
    {
      heading: 'Quality Verification Checklist',
      content: (
        <>
          <p>Check product quality against specifications:</p>
          <div className="seo-grid-2">
            <div className="seo-card">
              <h3>Visual Inspection</h3>
              <ul className="seo-checklist">
                <li><CheckCircle size={16} /> Color matches approved sample</li>
                <li><CheckCircle size={16} /> No visible defects (scratches, stains, dents)</li>
                <li><CheckCircle size={16} /> Finish quality (texture, coating, printing)</li>
                <li><CheckCircle size={16} /> Assembly complete and correct</li>
              </ul>
            </div>
            <div className="seo-card">
              <h3>Measurement Checks</h3>
              <ul className="seo-checklist">
                <li><CheckCircle size={16} /> Dimensions within tolerance</li>
                <li><CheckCircle size={16} /> Weight per unit correct</li>
                <li><CheckCircle size={16} /> Material thickness (if applicable)</li>
                <li><CheckCircle size={16} /> Functional measurements</li>
              </ul>
            </div>
          </div>
        </>
      )
    },
    {
      heading: 'Functional Testing Checklist',
      content: (
        <>
          <p>Test product functionality where applicable:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>Basic function test:</strong> Product works as intended</li>
            <li><CheckCircle size={18} /> <strong>Moving parts:</strong> Hinges, zippers, buttons operate smoothly</li>
            <li><CheckCircle size={18} /> <strong>Electrical items:</strong> Power on, all features work, safety checks</li>
            <li><CheckCircle size={18} /> <strong>Durability spot-check:</strong> Stress test on sample units</li>
            <li><CheckCircle size={18} /> <strong>Safety features:</strong> Guards, warnings, child-safety as required</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Packaging Inspection Checklist',
      content: (
        <>
          <p>Verify packaging meets export requirements:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>Inner packaging:</strong> Product protected, correct materials used</li>
            <li><CheckCircle size={18} /> <strong>Carton quality:</strong> Correct grade, no damage, proper sealing</li>
            <li><CheckCircle size={18} /> <strong>Carton markings:</strong> Shipping marks, handling symbols, weights</li>
            <li><CheckCircle size={18} /> <strong>Product labels:</strong> All required labels present and correct</li>
            <li><CheckCircle size={18} /> <strong>Barcodes:</strong> Scannable and correct (if applicable)</li>
            <li><CheckCircle size={18} /> <strong>Pallet compliance:</strong> ISPM-15 stamp, proper stacking</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Documentation and Evidence',
      content: (
        <>
          <p>Capture evidence during inspection:</p>
          <div className="seo-grid-2">
            <div className="seo-card">
              <h3><Camera size={20} />Photo Documentation</h3>
              <ul className="seo-checklist">
                <li><CheckCircle size={16} /> Overall production area</li>
                <li><CheckCircle size={16} /> Product close-ups (good and defective)</li>
                <li><CheckCircle size={16} /> Packaging and labels</li>
                <li><CheckCircle size={16} /> Carton markings</li>
                <li><CheckCircle size={16} /> Measurement readings</li>
              </ul>
            </div>
            <div className="seo-card">
              <h3><FileText size={20} />Report Contents</h3>
              <ul className="seo-checklist">
                <li><CheckCircle size={16} /> Inspection date and location</li>
                <li><CheckCircle size={16} /> Quantity verified</li>
                <li><CheckCircle size={16} /> Defects found (with photos)</li>
                <li><CheckCircle size={16} /> Pass/fail determination</li>
                <li><CheckCircle size={16} /> Recommendations</li>
              </ul>
            </div>
          </div>
        </>
      )
    }
  ]

  const faqs = [
    { q: 'What is AQL and how does it work?', a: 'AQL (Acceptable Quality Level) is a statistical sampling method. Common levels: 2.5 for major defects, 4.0 for minor defects. It defines how many defects are acceptable in a sample size based on total order quantity.' },
    { q: 'When should I schedule pre-shipment inspection?', a: 'Schedule inspection when 80–100% of goods are packed and ready. Too early means incomplete production; too late leaves no time for corrections.' },
    { q: 'What if inspection fails?', a: 'Request the supplier to fix issues and schedule re-inspection. Document all defects clearly. For serious issues, consider rejecting the shipment or negotiating compensation.' },
    { q: 'Should I use third-party inspection?', a: 'Third-party inspection is recommended for first orders, high-value shipments, and when you cannot inspect personally. They provide unbiased reports and professional documentation.' },
    { q: 'How many samples should be inspected?', a: 'Follow AQL sampling tables based on lot size. For example, a 2,000-piece order typically requires inspecting 125 samples. Your inspector or AQL chart will specify exact numbers.' }
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
      'Practical inspection checklist before shipment',
      'Know what to verify (quantity, defects, packaging, labeling)',
      'Reduce disputes by capturing evidence and acceptance criteria early',
      'Connect verified suppliers + inspection readiness'
    ],
    links: [
      { label: 'Inspection Services', to: '/inspection' },
      { label: 'Inspection Partners', to: '/inspection-partners' },
      { label: 'Verified Suppliers', to: '/verified-suppliers' },
      { label: 'Contact Us', to: '/contact' }
    ]
  }

  return (
    <GuidePageLayout
      title="Quality Inspection Checklist: Pre-Shipment Verification Guide"
      intro={intro}
      sections={sections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      badge="Inspection Guide"
    >
      <AazikoHelpsBlock
        bullets={aazikoHelps.bullets}
        links={aazikoHelps.links}
      />
    </GuidePageLayout>
  )
}

export default QualityInspectionChecklist
