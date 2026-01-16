// RFQ Template Guide - SEO Guide Page
import { CheckCircle, AlertTriangle, FileText, ClipboardList } from 'lucide-react'
import GuidePageLayout from '../../components/GuidePageLayout'
import AazikoHelpsBlock from '../../components/AazikoHelpsBlock'

const RFQTemplate = () => {
  const intro = `A well-structured Request for Quotation (RFQ) is the foundation of successful sourcing. Clear, detailed RFQs help suppliers provide accurate quotes, reduce back-and-forth communication, and speed up the procurement process. This guide provides a comprehensive RFQ template with all essential fields, best practices for writing effective RFQs, and common mistakes to avoid when requesting quotes from suppliers.`

  const sections = [
    {
      heading: 'What is an RFQ?',
      content: (
        <>
          <p>A Request for Quotation (RFQ) is a formal document sent to suppliers requesting pricing and terms for specific products or services:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>Purpose:</strong> Obtain comparable quotes from multiple suppliers</li>
            <li><CheckCircle size={18} /> <strong>Content:</strong> Product specifications, quantity, delivery requirements, terms</li>
            <li><CheckCircle size={18} /> <strong>Outcome:</strong> Suppliers respond with detailed quotations</li>
          </ul>
          <div className="seo-info-box">
            <p><FileText size={18} style={{display: 'inline', marginRight: '8px'}} />
            A detailed RFQ saves time by reducing clarification requests and ensures you receive accurate, comparable quotes.</p>
          </div>
        </>
      )
    },
    {
      heading: 'Essential RFQ Template Fields',
      content: (
        <>
          <p>Include these sections in every RFQ for complete information:</p>
          <div className="seo-grid-2">
            <div className="seo-card">
              <h3>1. Company Information</h3>
              <ul>
                <li>Company name and address</li>
                <li>Contact person and email</li>
                <li>Phone number</li>
                <li>Business type (importer, retailer, etc.)</li>
              </ul>
            </div>
            <div className="seo-card">
              <h3>2. Product Specifications</h3>
              <ul>
                <li>Product name and description</li>
                <li>Material/composition</li>
                <li>Dimensions and weight</li>
                <li>Color, finish, features</li>
                <li>Reference images or samples</li>
              </ul>
            </div>
            <div className="seo-card">
              <h3>3. Quantity & Pricing</h3>
              <ul>
                <li>Order quantity</li>
                <li>Preferred Incoterm (FOB, CIF, etc.)</li>
                <li>Target price (if any)</li>
                <li>Price validity period</li>
              </ul>
            </div>
            <div className="seo-card">
              <h3>4. Delivery Requirements</h3>
              <ul>
                <li>Destination port/address</li>
                <li>Required delivery date</li>
                <li>Shipping method preference</li>
                <li>Packing requirements</li>
              </ul>
            </div>
          </div>
        </>
      )
    },
    {
      heading: 'RFQ Template Example',
      content: (
        <>
          <div className="seo-card rfq-template-card">
            <h3>Sample RFQ Format</h3>
            <div className="rfq-subject">
              <strong>Subject:</strong> RFQ - [Product Name] - [Quantity] Units
            </div>
            
            <div className="rfq-section">
              <h4>1. Buyer Information</h4>
              <ul>
                <li><span>Company:</span> [Your Company Name]</li>
                <li><span>Contact:</span> [Name, Email, Phone]</li>
                <li><span>Location:</span> [City, Country]</li>
              </ul>
            </div>

            <div className="rfq-section">
              <h4>2. Product Requirements</h4>
              <ul>
                <li><span>Product:</span> [Detailed description]</li>
                <li><span>Material:</span> [Specifications]</li>
                <li><span>Size:</span> [Dimensions]</li>
                <li><span>Color:</span> [Options needed]</li>
                <li><span>Certifications:</span> [CE, FDA, etc. if required]</li>
              </ul>
            </div>

            <div className="rfq-section">
              <h4>3. Order Details</h4>
              <ul>
                <li><span>Quantity:</span> [Number of units]</li>
                <li><span>Incoterm:</span> [FOB/CIF/DDP + Port]</li>
                <li><span>Delivery:</span> [Required date]</li>
                <li><span>Destination:</span> [Port/Address]</li>
              </ul>
            </div>

            <div className="rfq-section">
              <h4>4. Quote Requirements</h4>
              <p>Please provide: Unit price, MOQ, Lead time, Payment terms, Packing details</p>
            </div>

            <div className="rfq-section">
              <h4>5. Response Deadline</h4>
              <p>Please respond by: [Date]</p>
            </div>
          </div>
        </>
      )
    },
    {
      heading: 'Best Practices for Writing RFQs',
      content: (
        <>
          <ol className="seo-steps">
            <li><strong>Be Specific:</strong> Vague descriptions lead to inaccurate quotes. Include exact specifications.</li>
            <li><strong>Include Visuals:</strong> Attach reference images, drawings, or sample photos when possible.</li>
            <li><strong>State Quantities Clearly:</strong> Mention if you need pricing for multiple quantity tiers.</li>
            <li><strong>Specify Incoterm:</strong> This affects pricing significantly—always mention your preferred term.</li>
            <li><strong>Set Deadlines:</strong> Give suppliers a clear response deadline (typically 3-7 days).</li>
            <li><strong>List Must-Haves:</strong> Clearly separate mandatory requirements from nice-to-haves.</li>
          </ol>
        </>
      )
    },
    {
      heading: 'Information to Request from Suppliers',
      content: (
        <>
          <p>Ask suppliers to include these details in their quotation:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>Unit Price:</strong> Per piece/kg/set with currency</li>
            <li><CheckCircle size={18} /> <strong>MOQ:</strong> Minimum Order Quantity</li>
            <li><CheckCircle size={18} /> <strong>Lead Time:</strong> Production time after order confirmation</li>
            <li><CheckCircle size={18} /> <strong>Payment Terms:</strong> Advance %, balance timing, methods accepted</li>
            <li><CheckCircle size={18} /> <strong>Packing Details:</strong> Inner/outer packing, carton dimensions, CBM</li>
            <li><CheckCircle size={18} /> <strong>Certifications:</strong> Available product/factory certifications</li>
            <li><CheckCircle size={18} /> <strong>Sample Availability:</strong> Sample cost and lead time</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Common RFQ Mistakes to Avoid',
      content: (
        <>
          <div className="seo-warning-box">
            <p><AlertTriangle size={18} style={{display: 'inline', marginRight: '8px'}} />
            Poor RFQs result in inaccurate quotes, wasted time, and sourcing delays.</p>
          </div>
          <ul className="seo-checklist">
            <li><AlertTriangle size={18} color="#f59e0b" /> Vague product descriptions ("I need bags")</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Missing quantity information</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> No Incoterm specified</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Unrealistic delivery expectations</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Not mentioning certification requirements</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Sending to too many suppliers (quality over quantity)</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Evaluating Supplier Responses',
      content: (
        <>
          <p>Compare quotes systematically using these criteria:</p>
          <div className="seo-grid-3">
            <div className="seo-card">
              <h3>Price Analysis</h3>
              <p>Compare total landed cost, not just unit price. Factor in shipping, duties, and payment terms.</p>
            </div>
            <div className="seo-card">
              <h3>Capability Check</h3>
              <p>Can they meet your quantity, quality, and timeline requirements?</p>
            </div>
            <div className="seo-card">
              <h3>Communication Quality</h3>
              <p>Response time, clarity, and professionalism indicate future working relationship.</p>
            </div>
          </div>
          <div className="seo-info-box">
            <p><ClipboardList size={18} style={{display: 'inline', marginRight: '8px'}} />
            Create a comparison spreadsheet to evaluate quotes objectively across all criteria.</p>
          </div>
        </>
      )
    }
  ]

  const faqs = [
    { q: 'How many suppliers should I send an RFQ to?', a: 'Send to 3-5 qualified suppliers for best results. Too few limits options; too many becomes unmanageable. Focus on pre-qualified suppliers who match your requirements.' },
    { q: 'How long should I wait for RFQ responses?', a: 'Standard response time is 3-7 business days. Complex products may need longer. Set a clear deadline in your RFQ and follow up if needed.' },
    { q: 'Should I share my target price in the RFQ?', a: 'Optional. Sharing a realistic target price can filter out unsuitable suppliers quickly. However, it may also anchor negotiations. Consider your strategy.' },
    { q: 'What if supplier quotes vary significantly?', a: 'Large price variations often indicate different quality levels, specifications interpretation, or cost structures. Clarify specifications and request detailed breakdowns.' },
    { q: 'How do I handle suppliers who don\'t meet my requirements?', a: 'Politely decline with brief feedback. Maintaining professional relationships is valuable—requirements may change, or they may improve their offerings.' }
  ]

  const relatedLinks = [
    { label: 'Export Import Guides Hub', to: '/guides' },
    { label: 'Submit RFQ on Aaziko', to: '/rfq' },
    { label: 'Find Verified Suppliers', to: '/verified-suppliers' },
    { label: 'Export Documentation', to: '/export-documentation' },
    { label: 'Contact Support', to: '/contact' }
  ]

  const aazikoHelps = {
    bullets: [
      'Our RFQ form guides you through all essential fields for complete requests',
      'Submit once and receive quotes from multiple verified suppliers',
      'Compare responses side-by-side with standardized quote formats',
      'Our process ensures you connect with suppliers who match your requirements'
    ],
    links: [
      { label: 'Submit RFQ', to: '/rfq' },
      { label: 'Verified Suppliers', to: '/verified-suppliers' },
      { label: 'How We Work', to: '/how-we-work' }
    ]
  }

  return (
    <GuidePageLayout
      title="RFQ Template: How to Write Effective Request for Quotation"
      intro={intro}
      sections={sections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      badge="Sourcing Guide"
      badgeIcon={<ClipboardList size={16} />}
    >
      <AazikoHelpsBlock
        bullets={aazikoHelps.bullets}
        links={aazikoHelps.links}
      />
    </GuidePageLayout>
  )
}

export default RFQTemplate
