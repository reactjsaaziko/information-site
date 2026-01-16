// Import Documents Checklist - SEO Guide Page
import { CheckCircle, AlertTriangle, FileCheck } from 'lucide-react'
import GuidePageLayout from '../../components/GuidePageLayout'
import AazikoHelpsBlock from '../../components/AazikoHelpsBlock'

const ImportDocumentsChecklist = () => {
  const intro = `Importing goods requires careful documentation to ensure smooth customs clearance and avoid costly delays. Whether you're importing from India or any other country, having the right paperwork ready is essential for compliance and efficient processing. This comprehensive checklist covers all documents you need as an importer, from basic commercial documents to product-specific certificates and compliance requirements.`

  const sections = [
    {
      heading: 'Essential Import Documents Checklist',
      content: (
        <>
          <p>Every import shipment requires these fundamental documents for customs clearance:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>Commercial Invoice:</strong> Original invoice from supplier with complete product and value details</li>
            <li><CheckCircle size={18} /> <strong>Packing List:</strong> Detailed breakdown of cartons, weights, and contents</li>
            <li><CheckCircle size={18} /> <strong>Bill of Lading / Airway Bill:</strong> Original transport document for cargo release</li>
            <li><CheckCircle size={18} /> <strong>Certificate of Origin:</strong> Proves product origin for duty calculation</li>
            <li><CheckCircle size={18} /> <strong>Insurance Certificate:</strong> Proof of cargo insurance coverage</li>
            <li><CheckCircle size={18} /> <strong>Import License (if applicable):</strong> Required for restricted goods categories</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Pre-Shipment Document Verification',
      content: (
        <>
          <p>Before your supplier ships, verify these documents are accurate and complete:</p>
          <ol className="seo-steps">
            <li><strong>Review Commercial Invoice:</strong> Check product description, HS code, quantity, unit price, and total value</li>
            <li><strong>Verify Packing Details:</strong> Confirm carton count, net/gross weights match invoice quantities</li>
            <li><strong>Confirm Incoterm:</strong> Ensure shipping terms (FOB, CIF, etc.) are clearly stated</li>
            <li><strong>Check Consignee Details:</strong> Your company name and address must be accurate</li>
            <li><strong>Request Draft Documents:</strong> Review drafts before final documents are issued</li>
          </ol>
        </>
      )
    },
    {
      heading: 'Product-Specific Import Requirements',
      content: (
        <>
          <p>Additional documents may be required based on product category:</p>
          <div className="seo-grid-2">
            <div className="seo-card">
              <h3>Food & Beverages</h3>
              <p>Health Certificate, Lab Test Reports, FSSAI Import License, Shelf Life Declaration</p>
            </div>
            <div className="seo-card">
              <h3>Electronics</h3>
              <p>BIS Certificate, Test Reports, Warranty Declaration, Technical Specifications</p>
            </div>
            <div className="seo-card">
              <h3>Textiles & Apparel</h3>
              <p>Fiber Content Certificate, AZO-free Certificate, Country of Origin Label</p>
            </div>
            <div className="seo-card">
              <h3>Machinery & Equipment</h3>
              <p>Technical Manual, Spare Parts List, Installation Guide, CE/ISO Certificates</p>
            </div>
          </div>
        </>
      )
    },
    {
      heading: 'Customs Clearance Document Flow',
      content: (
        <>
          <p>Understanding the document flow helps ensure timely clearance:</p>
          <ol className="seo-steps">
            <li><strong>Receive Shipping Advice:</strong> Supplier sends vessel/flight details and document copies</li>
            <li><strong>Obtain Original Documents:</strong> Collect originals via courier or bank (for LC shipments)</li>
            <li><strong>File Bill of Entry:</strong> Submit import declaration with all supporting documents</li>
            <li><strong>Pay Duties & Taxes:</strong> Clear customs duty, IGST, and applicable cess</li>
            <li><strong>Customs Examination:</strong> Present goods for inspection if selected</li>
            <li><strong>Take Delivery:</strong> Collect cargo after out-of-charge order</li>
          </ol>
        </>
      )
    },
    {
      heading: 'Common Import Document Mistakes',
      content: (
        <>
          <div className="seo-warning-box">
            <p><AlertTriangle size={18} style={{display: 'inline', marginRight: '8px'}} />
            Document discrepancies are the top reason for customs delays. Prevention is easier than correction.</p>
          </div>
          <ul className="seo-checklist">
            <li><AlertTriangle size={18} color="#f59e0b" /> Invoice value doesn't match payment documents</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Wrong HS code classification</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Missing or incorrect Certificate of Origin</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Packing list weights don't match actual cargo</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Expired or invalid product certifications</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Consignee name mismatch with import license</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Document Retention Requirements',
      content: (
        <>
          <p>Maintain proper records for compliance and audit purposes:</p>
          <div className="seo-info-box">
            <p><FileCheck size={18} style={{display: 'inline', marginRight: '8px'}} />
            Most countries require import documents to be retained for 5-7 years. Keep both physical and digital copies organized by shipment.</p>
          </div>
          <div className="seo-grid-3">
            <div className="seo-card">
              <h3>Commercial Documents</h3>
              <p>Invoices, contracts, payment records</p>
            </div>
            <div className="seo-card">
              <h3>Customs Documents</h3>
              <p>Bill of Entry, duty receipts, assessment orders</p>
            </div>
            <div className="seo-card">
              <h3>Shipping Documents</h3>
              <p>B/L, delivery orders, freight invoices</p>
            </div>
          </div>
        </>
      )
    }
  ]

  const faqs = [
    { q: 'What documents do I need to import goods?', a: 'At minimum: Commercial Invoice, Packing List, Bill of Lading/Airway Bill, and Certificate of Origin. Additional documents depend on product category and destination country regulations.' },
    { q: 'Who is responsible for providing import documents?', a: 'The supplier provides commercial documents (invoice, packing list, COO). The shipping line issues transport documents. The importer arranges import licenses and files customs declarations.' },
    { q: 'How do I verify if my import documents are correct?', a: 'Cross-check all documents for consistency in product description, quantities, weights, values, and party details. Ensure HS codes match your product and destination country requirements.' },
    { q: 'What happens if import documents are missing?', a: 'Missing documents cause customs holds. You may need to request replacements from the supplier, which delays clearance by 3-7 days and may incur demurrage charges.' },
    { q: 'Do I need original documents for customs clearance?', a: 'Yes, most customs authorities require original Bill of Lading for cargo release. Other documents may be accepted as copies, but originals are preferred for verification.' }
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
      'All supplier documents are verified and organized in your order dashboard',
      'Automated document checklists ensure nothing is missed before shipment',
      'Track document status in real-time from supplier to customs clearance',
      'Our dispute resolution process protects you if documentation issues arise'
    ],
    links: [
      { label: 'Customs Documentation', to: '/customs-documentation' },
      { label: 'Shipment Tracking', to: '/shipment-tracking' },
      { label: 'Dispute Resolution', to: '/dispute-resolution' }
    ]
  }

  return (
    <GuidePageLayout
      title="Import Documents Checklist: Complete Guide for Buyers"
      intro={intro}
      sections={sections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      badge="Import Guide"
    >
      <AazikoHelpsBlock
        bullets={aazikoHelps.bullets}
        links={aazikoHelps.links}
      />
    </GuidePageLayout>
  )
}

export default ImportDocumentsChecklist
