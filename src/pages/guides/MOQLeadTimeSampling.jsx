// MOQ, Lead Time & Sampling Guide - SEO Guide Page
import { CheckCircle, AlertTriangle, Clock, Package, Layers } from 'lucide-react'
import GuidePageLayout from '../../components/GuidePageLayout'
import AazikoHelpsBlock from '../../components/AazikoHelpsBlock'

const MOQLeadTimeSampling = () => {
  const intro = `Understanding MOQ (Minimum Order Quantity), lead time, and sampling processes is essential for successful international sourcing. These factors directly impact your costs, inventory planning, and supplier relationships. This guide explains how MOQ works, what affects lead times, and how to navigate the sampling process effectively. Learn to negotiate better terms and plan your orders for optimal results.`

  const sections = [
    {
      heading: 'Understanding MOQ (Minimum Order Quantity)',
      content: (
        <>
          <p>MOQ is the smallest quantity a supplier will accept for a single order:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>Why MOQ Exists:</strong> Covers setup costs, material minimums, and production efficiency</li>
            <li><CheckCircle size={18} /> <strong>Typical Ranges:</strong> 100-500 units for trading companies, 500-5000+ for manufacturers</li>
            <li><CheckCircle size={18} /> <strong>Factors Affecting MOQ:</strong> Product complexity, customization, material costs</li>
          </ul>
          <div className="seo-grid-2">
            <div className="seo-card">
              <h3>Low MOQ Suppliers</h3>
              <p><strong>Pros:</strong> Lower risk, test market, less capital</p>
              <p><strong>Cons:</strong> Higher unit price, limited customization</p>
              <p><strong>Best for:</strong> New products, small businesses, market testing</p>
            </div>
            <div className="seo-card">
              <h3>High MOQ Suppliers</h3>
              <p><strong>Pros:</strong> Lower unit price, full customization</p>
              <p><strong>Cons:</strong> Higher investment, inventory risk</p>
              <p><strong>Best for:</strong> Established products, volume buyers</p>
            </div>
          </div>
        </>
      )
    },
    {
      heading: 'How to Negotiate MOQ',
      content: (
        <>
          <ol className="seo-steps">
            <li><strong>Start with Samples:</strong> Build relationship before discussing bulk orders</li>
            <li><strong>Show Growth Potential:</strong> Share your business plan and reorder projections</li>
            <li><strong>Accept Higher Price:</strong> Offer to pay premium for lower initial quantity</li>
            <li><strong>Combine Products:</strong> Order multiple SKUs to meet total value threshold</li>
            <li><strong>Offer Advance Payment:</strong> Better payment terms can offset lower quantity</li>
            <li><strong>Consider Stock Products:</strong> Standard items often have lower MOQ than custom</li>
          </ol>
          <div className="seo-info-box">
            <p><Package size={18} style={{display: 'inline', marginRight: '8px'}} />
            Tip: Many suppliers have flexible MOQ for repeat customers. First order MOQ is often negotiable if you commit to larger future orders.</p>
          </div>
        </>
      )
    },
    {
      heading: 'Understanding Lead Time',
      content: (
        <>
          <p>Lead time is the total time from order confirmation to goods ready for shipment:</p>
          <div className="seo-grid-3">
            <div className="seo-card">
              <h3>Production Time</h3>
              <p>Actual manufacturing time. Varies by product complexity and quantity.</p>
              <p><strong>Typical:</strong> 15-45 days</p>
            </div>
            <div className="seo-card">
              <h3>Material Procurement</h3>
              <p>Time to source raw materials, especially for custom specs.</p>
              <p><strong>Typical:</strong> 5-15 days</p>
            </div>
            <div className="seo-card">
              <h3>Quality & Packing</h3>
              <p>Final QC, packing, and preparation for shipment.</p>
              <p><strong>Typical:</strong> 3-7 days</p>
            </div>
          </div>
          <p style={{marginTop: '20px'}}><strong>Total Lead Time Examples:</strong></p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>Simple products (stock):</strong> 7-15 days</li>
            <li><CheckCircle size={18} /> <strong>Standard manufacturing:</strong> 20-35 days</li>
            <li><CheckCircle size={18} /> <strong>Custom/complex products:</strong> 45-60+ days</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Factors Affecting Lead Time',
      content: (
        <>
          <p>Plan for these variables when estimating delivery dates:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>Order Quantity:</strong> Larger orders take longer to produce</li>
            <li><CheckCircle size={18} /> <strong>Customization Level:</strong> Custom molds, colors, or specs add time</li>
            <li><CheckCircle size={18} /> <strong>Season/Holidays:</strong> Chinese New Year, peak seasons cause delays</li>
            <li><CheckCircle size={18} /> <strong>Material Availability:</strong> Special materials may have longer procurement</li>
            <li><CheckCircle size={18} /> <strong>Factory Capacity:</strong> Busy periods extend lead times</li>
            <li><CheckCircle size={18} /> <strong>Quality Issues:</strong> Rework adds unexpected delays</li>
          </ul>
          <div className="seo-warning-box">
            <p><AlertTriangle size={18} style={{display: 'inline', marginRight: '8px'}} />
            Always add buffer time (1-2 weeks) to quoted lead times for unexpected delays.</p>
          </div>
        </>
      )
    },
    {
      heading: 'The Sampling Process',
      content: (
        <>
          <p>Samples are essential for quality verification before bulk orders:</p>
          <div className="seo-grid-2">
            <div className="seo-card">
              <h3>Types of Samples</h3>
              <ul>
                <li><strong>Stock Sample:</strong> Existing product from inventory</li>
                <li><strong>Custom Sample:</strong> Made to your specifications</li>
                <li><strong>Pre-Production Sample:</strong> Final approval before bulk</li>
                <li><strong>Golden Sample:</strong> Reference standard for production</li>
              </ul>
            </div>
            <div className="seo-card">
              <h3>Sample Costs</h3>
              <ul>
                <li><strong>Stock samples:</strong> Often free or low cost</li>
                <li><strong>Custom samples:</strong> $50-500+ depending on complexity</li>
                <li><strong>Shipping:</strong> Usually buyer pays (express courier)</li>
                <li><strong>Refund policy:</strong> Some refund sample cost on bulk order</li>
              </ul>
            </div>
          </div>
        </>
      )
    },
    {
      heading: 'Sample Evaluation Checklist',
      content: (
        <>
          <p>Thoroughly evaluate samples before approving bulk production:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>Visual Inspection:</strong> Color, finish, appearance match expectations</li>
            <li><CheckCircle size={18} /> <strong>Dimensions:</strong> Measure against specifications</li>
            <li><CheckCircle size={18} /> <strong>Material Quality:</strong> Weight, texture, durability</li>
            <li><CheckCircle size={18} /> <strong>Functionality:</strong> Test all features and functions</li>
            <li><CheckCircle size={18} /> <strong>Packaging:</strong> Review proposed packing if included</li>
            <li><CheckCircle size={18} /> <strong>Labeling:</strong> Check compliance with your market requirements</li>
          </ul>
          <div className="seo-info-box">
            <p><Layers size={18} style={{display: 'inline', marginRight: '8px'}} />
            Document all feedback clearly. Keep approved samples as reference standards for production QC.</p>
          </div>
        </>
      )
    },
    {
      heading: 'Common Mistakes to Avoid',
      content: (
        <>
          <div className="seo-warning-box">
            <p><AlertTriangle size={18} style={{display: 'inline', marginRight: '8px'}} />
            These mistakes lead to quality issues, delays, and cost overruns.</p>
          </div>
          <ul className="seo-checklist">
            <li><AlertTriangle size={18} color="#f59e0b" /> Ordering bulk without sample approval</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Assuming quoted lead time includes shipping</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Not accounting for holiday periods</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Choosing supplier based only on lowest MOQ</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Rushing sample approval to meet deadlines</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Not keeping approved samples for reference</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Planning Your Order Timeline',
      content: (
        <>
          <p>Work backwards from your required delivery date:</p>
          <ol className="seo-steps">
            <li><strong>Target Delivery Date:</strong> When you need goods in your warehouse</li>
            <li><strong>Subtract Shipping Time:</strong> Sea freight 4-8 weeks, air 1-2 weeks</li>
            <li><strong>Subtract Customs Clearance:</strong> 3-7 days typically</li>
            <li><strong>Subtract Production Lead Time:</strong> As quoted by supplier + buffer</li>
            <li><strong>Subtract Sample Time:</strong> 2-4 weeks for sampling process</li>
            <li><strong>Result:</strong> Latest date to start sourcing</li>
          </ol>
          <div className="seo-info-box">
            <p><Clock size={18} style={{display: 'inline', marginRight: '8px'}} />
            Example: For December delivery, start sourcing in July-August for sea freight orders.</p>
          </div>
        </>
      )
    }
  ]

  const faqs = [
    { q: 'Can I negotiate MOQ with suppliers?', a: 'Yes, MOQ is often negotiable. Strategies include: accepting higher unit price, combining multiple products, showing growth potential, offering better payment terms, or starting with stock products.' },
    { q: 'What is a typical lead time for manufacturing?', a: 'Lead time varies by product: Simple items 15-25 days, standard products 25-40 days, custom/complex items 45-60+ days. Always add buffer time for unexpected delays.' },
    { q: 'Do I have to pay for samples?', a: 'Stock samples are often free or low cost. Custom samples typically cost $50-500+ depending on complexity. Shipping is usually paid by buyer. Some suppliers refund sample cost on bulk orders.' },
    { q: 'How many samples should I order?', a: 'Order 2-3 samples minimum: one for evaluation, one as reference standard, one for testing. For products requiring certification testing, order additional samples.' },
    { q: 'What if the sample is approved but bulk production differs?', a: 'This is why pre-shipment inspection is important. Keep approved samples as reference. Include sample matching as a contract term. Inspection compares bulk production against approved samples.' }
  ]

  const relatedLinks = [
    { label: 'Export Import Guides Hub', to: '/guides' },
    { label: 'Submit RFQ', to: '/rfq' },
    { label: 'Find Verified Suppliers', to: '/verified-suppliers' },
    { label: 'Export Documentation', to: '/export-documentation' },
    { label: 'Contact Support', to: '/contact' }
  ]

  const aazikoHelps = {
    bullets: [
      'Supplier profiles display MOQ, lead times, and sampling policies upfront',
      'Our RFQ system lets you specify quantity requirements and get accurate quotes',
      'Order milestones track production progress against agreed timelines',
      'Connect with verified suppliers who meet your volume and timeline needs'
    ],
    links: [
      { label: 'How We Work', to: '/how-we-work' },
      { label: 'Submit RFQ', to: '/rfq' },
      { label: 'Verified Suppliers', to: '/verified-suppliers' }
    ]
  }

  return (
    <GuidePageLayout
      title="MOQ, Lead Time & Sampling: Essential Guide for Importers"
      intro={intro}
      sections={sections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      badge="Sourcing Guide"
      badgeIcon={<Clock size={16} />}
    >
      <AazikoHelpsBlock
        bullets={aazikoHelps.bullets}
        links={aazikoHelps.links}
      />
    </GuidePageLayout>
  )
}

export default MOQLeadTimeSampling
