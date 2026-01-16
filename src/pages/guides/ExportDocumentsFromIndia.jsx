// Export Documents from India - SEO Guide Page
import { CheckCircle, AlertTriangle, FileText } from 'lucide-react'
import GuidePageLayout from '../../components/GuidePageLayout'
import AazikoHelpsBlock from '../../components/AazikoHelpsBlock'

const ExportDocumentsFromIndia = () => {
  const intro = `Exporting from India requires specific documentation to ensure smooth customs clearance and compliance with international trade regulations. Whether you're a first-time exporter or scaling your operations, having the right documents ready prevents delays, penalties, and shipment rejections. This guide covers the essential export documents required for shipping goods from India, including mandatory paperwork, product-specific certificates, and common mistakes to avoid.`

  const sections = [
    {
      heading: 'Mandatory Export Documents Checklist',
      content: (
        <>
          <p>Every export shipment from India requires these core documents:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>Commercial Invoice:</strong> Details product description, quantity, value, HS code, buyer/seller information</li>
            <li><CheckCircle size={18} /> <strong>Packing List:</strong> Carton-wise breakdown with net/gross weights, dimensions, and markings</li>
            <li><CheckCircle size={18} /> <strong>Bill of Lading (Sea) / Airway Bill (Air):</strong> Transport document proving shipment handover</li>
            <li><CheckCircle size={18} /> <strong>Shipping Bill:</strong> Filed with Indian Customs for export declaration</li>
            <li><CheckCircle size={18} /> <strong>Certificate of Origin (COO):</strong> Required for duty benefits under trade agreements</li>
            <li><CheckCircle size={18} /> <strong>IEC (Import Export Code):</strong> Mandatory registration for all Indian exporters</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Product-Specific Documents',
      content: (
        <>
          <p>Depending on your product category and destination country, you may need additional certificates:</p>
          <div className="seo-grid-2">
            <div className="seo-card">
              <h3>Food & Agricultural Products</h3>
              <p>Phytosanitary Certificate, Health Certificate, FSSAI License, Lab Test Reports</p>
            </div>
            <div className="seo-card">
              <h3>Chemicals & Hazardous Goods</h3>
              <p>MSDS (Material Safety Data Sheet), DGR Compliance, UN Classification</p>
            </div>
            <div className="seo-card">
              <h3>Textiles & Garments</h3>
              <p>GSP Certificate, Handloom Mark, Quality Inspection Certificate</p>
            </div>
            <div className="seo-card">
              <h3>Electronics & Machinery</h3>
              <p>CE Marking (for EU), Test Reports, Technical Specifications</p>
            </div>
          </div>
        </>
      )
    },
    {
      heading: 'Step-by-Step Document Preparation',
      content: (
        <>
          <ol className="seo-steps">
            <li><strong>Verify IEC Registration:</strong> Ensure your Import Export Code is active and linked to your GST</li>
            <li><strong>Confirm Product HS Code:</strong> Use the correct 8-digit HS code for accurate duty calculation</li>
            <li><strong>Prepare Commercial Invoice:</strong> Include all required fields matching the proforma invoice</li>
            <li><strong>Create Detailed Packing List:</strong> Match quantities and weights with the invoice</li>
            <li><strong>Obtain Required Certificates:</strong> Apply for COO, test reports, or product certifications as needed</li>
            <li><strong>File Shipping Bill:</strong> Submit through ICEGATE portal before cargo handover</li>
          </ol>
        </>
      )
    },
    {
      heading: 'Common Mistakes to Avoid',
      content: (
        <>
          <div className="seo-warning-box">
            <p><AlertTriangle size={18} style={{display: 'inline', marginRight: '8px'}} />
            Document errors are the leading cause of export delays. Double-check all details before submission.</p>
          </div>
          <ul className="seo-checklist">
            <li><AlertTriangle size={18} color="#f59e0b" /> Mismatched product descriptions across documents</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Incorrect HS code leading to wrong duty rates</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Missing or expired IEC registration</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Invoice value not matching bank documents</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Forgetting destination-specific certificates</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Document Verification Checklist',
      content: (
        <>
          <p>Before shipping, verify these details match across all documents:</p>
          <div className="seo-grid-3">
            <div className="seo-card">
              <h3>Company Details</h3>
              <p>Name, address, IEC, GST number</p>
            </div>
            <div className="seo-card">
              <h3>Product Information</h3>
              <p>Description, HS code, quantity, unit price</p>
            </div>
            <div className="seo-card">
              <h3>Weights & Dimensions</h3>
              <p>Net weight, gross weight, CBM</p>
            </div>
          </div>
          <div className="seo-info-box">
            <p><FileText size={18} style={{display: 'inline', marginRight: '8px'}} />
            Pro tip: Create a master document template to ensure consistency across all export paperwork.</p>
          </div>
        </>
      )
    }
  ]

  const faqs = [
    { q: 'What is the most important export document from India?', a: 'The Commercial Invoice is the most critical document as it forms the basis for customs valuation, duty calculation, and payment processing. All other documents reference information from the commercial invoice.' },
    { q: 'Do I need a Certificate of Origin for every shipment?', a: 'Not always. COO is required when the destination country mandates it or when claiming preferential duty rates under trade agreements like SAFTA, APTA, or bilateral FTAs.' },
    { q: 'How long does it take to get export documents ready?', a: 'Standard documents (invoice, packing list) can be prepared in 1-2 days. Certificates like COO take 2-3 working days. Product-specific certifications may take 1-2 weeks depending on testing requirements.' },
    { q: 'What happens if my export documents have errors?', a: 'Document errors cause customs holds, requiring amendments that add 2-5 days delay and additional fees. Significant errors may result in shipment rejection or penalties.' },
    { q: 'Is GST registration mandatory for export from India?', a: 'Yes, GST registration is mandatory for exporters. Exports are zero-rated under GST, meaning you can claim refund on input taxes paid.' }
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
      'Our verified suppliers provide complete, accurate export documentation with every order',
      'Document templates and checklists are built into our order management system',
      'Real-time tracking lets you monitor document status throughout the export process',
      'Our team reviews all paperwork before shipment to catch errors early'
    ],
    links: [
      { label: 'Export Documentation', to: '/export-documentation' },
      { label: 'Customs Documentation', to: '/customs-documentation' },
      { label: 'Submit RFQ', to: '/rfq' },
      { label: 'Contact Us', to: '/contact' }
    ]
  }

  return (
    <GuidePageLayout
      title="Export Documents from India: Complete Checklist & Requirements"
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

export default ExportDocumentsFromIndia
