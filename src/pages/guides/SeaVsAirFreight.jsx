// Sea vs Air Freight Guide - SEO Guide Page (Cluster B)
import { CheckCircle, AlertTriangle, Ship, Plane, Clock, DollarSign, Package, Scale } from 'lucide-react'
import GuidePageLayout from '../../components/GuidePageLayout'
import AazikoHelpsBlock from '../../components/AazikoHelpsBlock'

const SeaVsAirFreight = () => {
  const intro = `Choosing between sea freight and air freight is one of the most important decisions in international trade. The right choice depends on your shipment size, urgency, budget, and product type. Sea freight offers significant cost savings for bulk shipments but takes longer, while air freight provides speed at a premium price. This guide breaks down the key differences, helps you understand when to use each mode, and provides a practical decision framework for your shipping needs.`

  const sections = [
    {
      heading: 'Sea Freight vs Air Freight: Quick Comparison',
      content: (
        <>
          <p>Here's a side-by-side comparison of the two main shipping modes:</p>
          <div className="seo-grid-2">
            <div className="seo-card">
              <h3><Ship size={20} style={{display: 'inline', marginRight: '8px'}} />Sea Freight</h3>
              <ul className="seo-checklist">
                <li><CheckCircle size={16} /> Cost: $500–$2,000 per CBM (varies by route)</li>
                <li><CheckCircle size={16} /> Transit: 4–8 weeks typical</li>
                <li><CheckCircle size={16} /> Best for: Bulk, heavy, non-urgent goods</li>
                <li><CheckCircle size={16} /> Min shipment: 1 CBM or LCL consolidation</li>
              </ul>
            </div>
            <div className="seo-card">
              <h3><Plane size={20} style={{display: 'inline', marginRight: '8px'}} />Air Freight</h3>
              <ul className="seo-checklist">
                <li><CheckCircle size={16} /> Cost: $4–$8 per kg (varies by route)</li>
                <li><CheckCircle size={16} /> Transit: 3–10 days typical</li>
                <li><CheckCircle size={16} /> Best for: Urgent, high-value, perishable goods</li>
                <li><CheckCircle size={16} /> Min shipment: 45 kg or courier for smaller</li>
              </ul>
            </div>
          </div>
        </>
      )
    },
    {
      heading: 'When to Choose Sea Freight',
      content: (
        <>
          <p>Sea freight is the preferred choice for most bulk international shipments. Consider sea freight when:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>Large volume shipments:</strong> Orders over 2 CBM or 500 kg</li>
            <li><CheckCircle size={18} /> <strong>Cost is priority:</strong> Budget-conscious shipments where time is flexible</li>
            <li><CheckCircle size={18} /> <strong>Heavy or bulky goods:</strong> Machinery, furniture, building materials</li>
            <li><CheckCircle size={18} /> <strong>Non-perishable products:</strong> Items that can withstand 4–8 week transit</li>
            <li><CheckCircle size={18} /> <strong>Regular scheduled orders:</strong> Predictable demand with advance planning</li>
          </ul>
          <div className="seo-info-box">
            <p><Scale size={18} style={{display: 'inline', marginRight: '8px'}} />
            Rule of thumb: If your shipment is over 500 kg and not time-sensitive, sea freight typically saves 60–80% compared to air.</p>
          </div>
        </>
      )
    },
    {
      heading: 'When to Choose Air Freight',
      content: (
        <>
          <p>Air freight makes sense when speed or product requirements demand it:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>Urgent orders:</strong> Deadline-driven shipments, stockouts, emergency supplies</li>
            <li><CheckCircle size={18} /> <strong>High-value goods:</strong> Electronics, jewelry, pharmaceuticals where inventory cost matters</li>
            <li><CheckCircle size={18} /> <strong>Perishable items:</strong> Fresh food, flowers, temperature-sensitive products</li>
            <li><CheckCircle size={18} /> <strong>Small shipments:</strong> Samples, spare parts, documents under 100 kg</li>
            <li><CheckCircle size={18} /> <strong>Seasonal demand:</strong> Fashion, holiday goods with tight market windows</li>
          </ul>
          <div className="seo-warning-box">
            <p><AlertTriangle size={18} style={{display: 'inline', marginRight: '8px'}} />
            Air freight costs can be 5–10x higher than sea freight. Always calculate total landed cost before deciding.</p>
          </div>
        </>
      )
    },
    {
      heading: 'Cost Calculation Checklist',
      content: (
        <>
          <p>Use this checklist to compare total costs accurately:</p>
          <ol className="seo-steps">
            <li><strong>Calculate chargeable weight:</strong> For air, compare actual weight vs volumetric (L×W×H/6000)</li>
            <li><strong>Get freight quotes:</strong> Request quotes from multiple forwarders for both modes</li>
            <li><strong>Add origin charges:</strong> Pickup, handling, documentation at origin</li>
            <li><strong>Include destination charges:</strong> Customs clearance, handling, delivery</li>
            <li><strong>Factor inventory cost:</strong> Cost of capital tied up during longer sea transit</li>
            <li><strong>Consider insurance:</strong> Higher value goods may need different coverage</li>
          </ol>
        </>
      )
    },
    {
      heading: 'Transit Time Planning',
      content: (
        <>
          <p>Plan your shipment timeline with these typical milestones:</p>
          <div className="seo-grid-2">
            <div className="seo-card">
              <h3>Sea Freight Timeline</h3>
              <ul className="seo-checklist">
                <li><Clock size={16} /> Booking to loading: 3–5 days</li>
                <li><Clock size={16} /> Port to port transit: 14–45 days</li>
                <li><Clock size={16} /> Customs clearance: 2–5 days</li>
                <li><Clock size={16} /> Last-mile delivery: 1–3 days</li>
              </ul>
            </div>
            <div className="seo-card">
              <h3>Air Freight Timeline</h3>
              <ul className="seo-checklist">
                <li><Clock size={16} /> Booking to departure: 1–2 days</li>
                <li><Clock size={16} /> Flight time: 1–3 days</li>
                <li><Clock size={16} /> Customs clearance: 1–2 days</li>
                <li><Clock size={16} /> Last-mile delivery: 1–2 days</li>
              </ul>
            </div>
          </div>
        </>
      )
    },
    {
      heading: 'Decision Framework',
      content: (
        <>
          <p>Use this framework to make your shipping mode decision:</p>
          <div className="seo-grid-3">
            <div className="seo-card">
              <h3><DollarSign size={20} />Cost Priority</h3>
              <p>Choose sea freight. Accept longer transit for significant savings.</p>
            </div>
            <div className="seo-card">
              <h3><Clock size={20} />Speed Priority</h3>
              <p>Choose air freight. Pay premium for fast delivery.</p>
            </div>
            <div className="seo-card">
              <h3><Package size={20} />Balanced</h3>
              <p>Consider sea-air combo or express sea services.</p>
            </div>
          </div>
        </>
      )
    }
  ]

  const faqs = [
    { q: 'What is the cost difference between sea and air freight?', a: 'Sea freight typically costs 60–80% less than air freight for the same shipment. However, the exact difference depends on route, weight, volume, and current market rates. Always get quotes for both to compare.' },
    { q: 'How do I calculate volumetric weight for air freight?', a: 'Volumetric weight = Length × Width × Height (in cm) ÷ 6000. Airlines charge based on whichever is higher: actual weight or volumetric weight. This is important for light but bulky items.' },
    { q: 'Can I combine sea and air freight?', a: 'Yes, sea-air services exist where goods travel by sea to a hub port, then by air to the final destination. This offers a middle ground on cost and speed for certain routes.' },
    { q: 'What documents are different for sea vs air freight?', a: 'Sea freight uses Bill of Lading (B/L) while air freight uses Airway Bill (AWB). Other documents like commercial invoice, packing list, and certificates are similar for both modes.' },
    { q: 'How do I track sea freight shipments?', a: 'Sea freight tracking is done via container number through shipping line websites. Updates are less frequent than air freight—typically at major port milestones rather than real-time.' }
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
      'Choose the right mode based on cost, speed, and risk',
      'Understand key transit milestones before booking',
      'Reduce quote mismatch by capturing shipment requirements in RFQ',
      'Improve visibility with shipment milestones and status updates'
    ],
    links: [
      { label: 'Logistics', to: '/logistics' },
      { label: 'Shipment Tracking', to: '/shipment-tracking' },
      { label: 'Submit RFQ', to: '/rfq' },
      { label: 'Contact Us', to: '/contact' }
    ]
  }

  return (
    <GuidePageLayout
      title="Sea vs Air Freight: How to Choose the Right Shipping Mode"
      intro={intro}
      sections={sections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      badge="Logistics Guide"
    >
      <AazikoHelpsBlock
        bullets={aazikoHelps.bullets}
        links={aazikoHelps.links}
      />
    </GuidePageLayout>
  )
}

export default SeaVsAirFreight
