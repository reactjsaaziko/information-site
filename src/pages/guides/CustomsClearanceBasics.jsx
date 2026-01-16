// Customs Clearance Basics Guide - SEO Guide Page (Cluster B)
import { CheckCircle, AlertTriangle, FileText, Shield, Building2, Tag, Clock, Scale } from 'lucide-react'
import GuidePageLayout from '../../components/GuidePageLayout'
import AazikoHelpsBlock from '../../components/AazikoHelpsBlock'

const CustomsClearanceBasics = () => {
  const intro = `Customs clearance is the process of getting your goods approved by customs authorities to enter or leave a country. It involves document verification, duty calculation, and compliance checks. Understanding customs basics helps you avoid delays, penalties, and shipment rejections. This guide covers the essential documents needed, the clearance process step-by-step, common issues that cause holds, and practical tips to ensure smooth clearance for your international shipments.`

  const sections = [
    {
      heading: 'Essential Documents for Customs Clearance',
      content: (
        <>
          <p>These documents are required for most customs clearances:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>Commercial Invoice:</strong> Product details, value, buyer/seller info, HS code</li>
            <li><CheckCircle size={18} /> <strong>Packing List:</strong> Carton-wise breakdown, weights, dimensions</li>
            <li><CheckCircle size={18} /> <strong>Bill of Lading / Airway Bill:</strong> Transport document from carrier</li>
            <li><CheckCircle size={18} /> <strong>Certificate of Origin:</strong> Proves where goods were manufactured</li>
            <li><CheckCircle size={18} /> <strong>Import License:</strong> Required for certain regulated products</li>
            <li><CheckCircle size={18} /> <strong>Product Certificates:</strong> Test reports, compliance certificates as required</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Customs Clearance Process Steps',
      content: (
        <>
          <p>The typical customs clearance process follows these steps:</p>
          <ol className="seo-steps">
            <li><strong>Document Submission:</strong> Customs broker files entry with all required documents</li>
            <li><strong>Document Review:</strong> Customs officers verify paperwork accuracy</li>
            <li><strong>Duty Assessment:</strong> Customs calculates applicable duties and taxes</li>
            <li><strong>Payment:</strong> Importer pays duties, taxes, and fees</li>
            <li><strong>Inspection (if selected):</strong> Physical examination of goods</li>
            <li><strong>Release:</strong> Customs issues release for delivery</li>
          </ol>
        </>
      )
    },
    {
      heading: 'Understanding HS Codes and Duties',
      content: (
        <>
          <p>HS codes determine your duty rates and compliance requirements:</p>
          <div className="seo-grid-2">
            <div className="seo-card">
              <h3><Tag size={20} />What is an HS Code?</h3>
              <p>A 6–10 digit number that classifies products internationally. The first 6 digits are standardized globally; additional digits are country-specific.</p>
            </div>
            <div className="seo-card">
              <h3><Scale size={20} />Why It Matters</h3>
              <p>Wrong HS code = wrong duty rate, potential penalties, and compliance issues. Always verify your HS code before shipping.</p>
            </div>
          </div>
          <div className="seo-info-box">
            <p><FileText size={18} style={{display: 'inline', marginRight: '8px'}} />
            Tip: Use the same HS code across all documents (invoice, packing list, COO) to avoid discrepancies.</p>
          </div>
        </>
      )
    },
    {
      heading: 'Common Customs Clearance Issues',
      content: (
        <>
          <div className="seo-warning-box">
            <p><AlertTriangle size={18} style={{display: 'inline', marginRight: '8px'}} />
            These issues cause most customs delays and holds:</p>
          </div>
          <ul className="seo-checklist">
            <li><AlertTriangle size={18} color="#f59e0b" /> <strong>Document discrepancies:</strong> Mismatched info between invoice, packing list, and B/L</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> <strong>Incorrect HS code:</strong> Wrong classification leading to duty disputes</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> <strong>Missing certificates:</strong> Required permits or test reports not provided</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> <strong>Undervaluation:</strong> Declared value appears too low for the product</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> <strong>Restricted goods:</strong> Products requiring special licenses or approvals</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> <strong>Labeling non-compliance:</strong> Missing required labels or markings</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Pre-Clearance Checklist',
      content: (
        <>
          <p>Verify these items before your shipment arrives at customs:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> All documents prepared and consistent with each other</li>
            <li><CheckCircle size={18} /> HS code verified and matches product description</li>
            <li><CheckCircle size={18} /> Duty rates researched and payment arranged</li>
            <li><CheckCircle size={18} /> Required permits and licenses obtained</li>
            <li><CheckCircle size={18} /> Customs broker notified with shipment details</li>
            <li><CheckCircle size={18} /> Product labeling meets destination requirements</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Working with Customs Brokers',
      content: (
        <>
          <p>A good customs broker helps ensure smooth clearance:</p>
          <div className="seo-grid-2">
            <div className="seo-card">
              <h3>What Brokers Do</h3>
              <ul className="seo-checklist">
                <li><CheckCircle size={16} /> File customs entries on your behalf</li>
                <li><CheckCircle size={16} /> Calculate and pay duties</li>
                <li><CheckCircle size={16} /> Handle inspections and queries</li>
                <li><CheckCircle size={16} /> Advise on compliance requirements</li>
              </ul>
            </div>
            <div className="seo-card">
              <h3>What You Provide</h3>
              <ul className="seo-checklist">
                <li><CheckCircle size={16} /> Complete, accurate documents</li>
                <li><CheckCircle size={16} /> Correct product information</li>
                <li><CheckCircle size={16} /> Timely responses to queries</li>
                <li><CheckCircle size={16} /> Payment authorization</li>
              </ul>
            </div>
          </div>
        </>
      )
    }
  ]

  const faqs = [
    { q: 'How long does customs clearance take?', a: 'Normal clearance takes 1–3 days for sea freight and 1–2 days for air freight. If selected for inspection or if there are document issues, it can take 5–10 days or longer.' },
    { q: 'What happens if my shipment is held at customs?', a: 'Contact your customs broker immediately to understand the reason. Common causes include missing documents, inspection selection, or duty disputes. Provide requested information promptly to minimize delays.' },
    { q: 'Do I need a customs broker?', a: 'While not always legally required, using a licensed customs broker is highly recommended. They have expertise in regulations, established relationships with customs, and can handle complex situations.' },
    { q: 'How are customs duties calculated?', a: 'Duties are typically calculated as a percentage of the CIF value (Cost + Insurance + Freight) based on the HS code. Some products have specific duties (per unit) instead of ad valorem (percentage).' },
    { q: 'What is a customs inspection?', a: 'Customs may physically examine your goods to verify they match the documents. Inspections can be random or triggered by risk factors. They add 1–5 days to clearance time and may incur additional fees.' }
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
      'Customs-ready document checklist',
      'Reduce clearance holds with correct paperwork preparation',
      'Align product/HS/invoice/packing list consistency',
      'Track clearance milestones and exceptions'
    ],
    links: [
      { label: 'Customs Documentation', to: '/customs-documentation' },
      { label: 'Export Documentation', to: '/export-documentation' },
      { label: 'Shipment Tracking', to: '/shipment-tracking' },
      { label: 'Contact Us', to: '/contact' }
    ]
  }

  return (
    <GuidePageLayout
      title="Customs Clearance Basics: Essential Guide for Importers"
      intro={intro}
      sections={sections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      badge="Customs Guide"
    >
      <AazikoHelpsBlock
        bullets={aazikoHelps.bullets}
        links={aazikoHelps.links}
      />
    </GuidePageLayout>
  )
}

export default CustomsClearanceBasics
