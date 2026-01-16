// Supplier Verification Checklist Guide - SEO Guide Page (Cluster C)
import { CheckCircle, AlertTriangle, Shield, Building2, FileText, Search, Users, Award } from 'lucide-react'
import GuidePageLayout from '../../components/GuidePageLayout'
import AazikoHelpsBlock from '../../components/AazikoHelpsBlock'

const SupplierVerificationChecklist = () => {
  const intro = `Verifying suppliers before placing orders is essential to avoid scams, quality issues, and delivery failures. A thorough verification process examines business legitimacy, production capability, quality systems, and trade history. This guide provides a step-by-step verification checklist covering documents to request, red flags to watch for, and questions to ask. Whether you're sourcing from a new supplier or evaluating existing partners, this checklist helps you make informed decisions and reduce sourcing risk.`

  const sections = [
    {
      heading: 'Business Legitimacy Verification',
      content: (
        <>
          <p>Verify the supplier is a legitimate, registered business:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>Business registration:</strong> Request company registration certificate</li>
            <li><CheckCircle size={18} /> <strong>Tax registration:</strong> GST/VAT registration (shows active business)</li>
            <li><CheckCircle size={18} /> <strong>Export license:</strong> IEC or equivalent for their country</li>
            <li><CheckCircle size={18} /> <strong>Company age:</strong> How long have they been in business?</li>
            <li><CheckCircle size={18} /> <strong>Physical address:</strong> Verify factory/office address exists</li>
            <li><CheckCircle size={18} /> <strong>Bank details:</strong> Company bank account (not personal)</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Production Capability Assessment',
      content: (
        <>
          <p>Evaluate if the supplier can actually produce your order:</p>
          <div className="seo-grid-2">
            <div className="seo-card">
              <h3>Capacity Questions</h3>
              <ul className="seo-checklist">
                <li><CheckCircle size={16} /> Monthly production capacity</li>
                <li><CheckCircle size={16} /> Number of production lines</li>
                <li><CheckCircle size={16} /> Workforce size</li>
                <li><CheckCircle size={16} /> Equipment and machinery</li>
              </ul>
            </div>
            <div className="seo-card">
              <h3>Evidence to Request</h3>
              <ul className="seo-checklist">
                <li><CheckCircle size={16} /> Factory photos/videos</li>
                <li><CheckCircle size={16} /> Production line images</li>
                <li><CheckCircle size={16} /> Equipment list</li>
                <li><CheckCircle size={16} /> Virtual factory tour</li>
              </ul>
            </div>
          </div>
        </>
      )
    },
    {
      heading: 'Quality Systems Verification',
      content: (
        <>
          <p>Check quality management capabilities:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>Quality certifications:</strong> ISO 9001, industry-specific certifications</li>
            <li><CheckCircle size={18} /> <strong>QC process:</strong> How do they inspect products?</li>
            <li><CheckCircle size={18} /> <strong>Testing equipment:</strong> In-house testing capabilities</li>
            <li><CheckCircle size={18} /> <strong>Defect handling:</strong> Process for handling quality issues</li>
            <li><CheckCircle size={18} /> <strong>Third-party inspection:</strong> Willingness to allow inspection</li>
          </ul>
          <div className="seo-info-box">
            <p><Award size={18} style={{display: 'inline', marginRight: '8px'}} />
            Request copies of certifications and verify they are current and issued by recognized bodies.</p>
          </div>
        </>
      )
    },
    {
      heading: 'Trade History and References',
      content: (
        <>
          <p>Investigate their track record:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>Export experience:</strong> Which countries have they exported to?</li>
            <li><CheckCircle size={18} /> <strong>Major customers:</strong> Names of key buyers (if they can share)</li>
            <li><CheckCircle size={18} /> <strong>References:</strong> Contact details of 2–3 existing customers</li>
            <li><CheckCircle size={18} /> <strong>Trade platform history:</strong> Reviews on Alibaba, Global Sources, etc.</li>
            <li><CheckCircle size={18} /> <strong>Complaint history:</strong> Any disputes or negative feedback?</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Red Flags to Watch For',
      content: (
        <>
          <div className="seo-warning-box">
            <p><AlertTriangle size={18} style={{display: 'inline', marginRight: '8px'}} />
            These warning signs indicate potential problems:</p>
          </div>
          <ul className="seo-checklist">
            <li><AlertTriangle size={18} color="#f59e0b" /> <strong>No physical address:</strong> Only P.O. box or virtual office</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> <strong>Personal bank accounts:</strong> Requesting payment to individual accounts</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> <strong>Prices too low:</strong> Significantly below market rates</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> <strong>Pressure tactics:</strong> Rushing you to pay quickly</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> <strong>No samples:</strong> Unwilling to provide samples</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> <strong>Inconsistent information:</strong> Details don't match across communications</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> <strong>No inspection allowed:</strong> Refusing third-party inspection</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Verification Action Steps',
      content: (
        <>
          <p>Follow these steps to verify a new supplier:</p>
          <ol className="seo-steps">
            <li><strong>Request documents:</strong> Business registration, export license, certifications</li>
            <li><strong>Verify documents:</strong> Cross-check registration numbers online where possible</li>
            <li><strong>Video call:</strong> Virtual meeting to see factory and meet team</li>
            <li><strong>Order samples:</strong> Test product quality before bulk order</li>
            <li><strong>Check references:</strong> Contact their existing customers</li>
            <li><strong>Start small:</strong> Place a trial order before committing to large volumes</li>
          </ol>
        </>
      )
    }
  ]

  const faqs = [
    { q: 'What documents should I request from a new supplier?', a: 'Request: business registration certificate, export license (IEC), GST/tax registration, quality certifications (ISO, etc.), factory photos, and bank details. Legitimate suppliers will provide these readily.' },
    { q: 'How do I verify if a supplier is a manufacturer or trading company?', a: 'Ask for factory photos/videos, request a virtual tour, check if they have production equipment, ask technical questions about manufacturing process. Trading companies often cannot answer detailed production questions.' },
    { q: 'Should I visit the factory before ordering?', a: 'For large orders or long-term relationships, factory visits are valuable. For smaller orders, virtual tours and third-party verification can be sufficient. Always visit for high-value or critical products.' },
    { q: 'What is a reasonable trial order size?', a: 'Trial orders are typically 10–20% of your target order size, or the supplier\'s MOQ. The goal is to test quality, communication, and delivery before committing to larger volumes.' },
    { q: 'How do I check supplier reviews and reputation?', a: 'Check trade platforms (Alibaba, Global Sources), search for company name + reviews, ask for customer references, and look for any complaints or legal issues online.' }
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
      'Step-by-step verification checklist (documents, capability, red flags)',
      'Understand what "verified" should include in real trade',
      'Reduce scam risk with structured checks',
      'Safe next steps to proceed after verification'
    ],
    links: [
      { label: 'Verified Suppliers', to: '/verified-suppliers' },
      { label: 'Find Verified Suppliers', to: '/find-verified-suppliers' },
      { label: 'How We Work', to: '/how-we-work' },
      { label: 'Contact Us', to: '/contact' }
    ]
  }

  return (
    <GuidePageLayout
      title="Supplier Verification Checklist: How to Vet Suppliers Before Ordering"
      intro={intro}
      sections={sections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      badge="Sourcing Guide"
    >
      <AazikoHelpsBlock
        bullets={aazikoHelps.bullets}
        links={aazikoHelps.links}
      />
    </GuidePageLayout>
  )
}

export default SupplierVerificationChecklist
