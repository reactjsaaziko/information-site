// Incoterms Explained - SEO Guide Page
import { CheckCircle, AlertTriangle, Scale } from 'lucide-react'
import GuidePageLayout from '../../components/GuidePageLayout'
import AazikoHelpsBlock from '../../components/AazikoHelpsBlock'

const IncotermsExplained = () => {
  const intro = `Incoterms (International Commercial Terms) define who pays for what in international trade—shipping costs, insurance, customs duties, and risk transfer points. Understanding Incoterms is essential for accurate pricing, clear contracts, and avoiding disputes. This guide explains the most commonly used Incoterms 2020, when to use each one, and how they affect your total landed cost.`

  const sections = [
    {
      heading: 'What Are Incoterms?',
      content: (
        <>
          <p>Incoterms are standardized trade terms published by the International Chamber of Commerce (ICC). They define:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>Cost Responsibility:</strong> Who pays for freight, insurance, customs, and handling</li>
            <li><CheckCircle size={18} /> <strong>Risk Transfer Point:</strong> When responsibility for goods passes from seller to buyer</li>
            <li><CheckCircle size={18} /> <strong>Document Obligations:</strong> Who arranges shipping, insurance, and export/import clearance</li>
          </ul>
          <div className="seo-info-box">
            <p><Scale size={18} style={{display: 'inline', marginRight: '8px'}} />
            Incoterms 2020 is the current version. Always specify the version (e.g., "FOB Shanghai Incoterms 2020") in contracts.</p>
          </div>
        </>
      )
    },
    {
      heading: 'Most Common Incoterms Explained',
      content: (
        <>
          <div className="seo-grid-2">
            <div className="seo-card">
              <h3>EXW (Ex Works)</h3>
              <p><strong>Seller delivers:</strong> At their premises (factory/warehouse)</p>
              <p><strong>Buyer handles:</strong> All transport, export clearance, freight, insurance, import clearance</p>
              <p><strong>Best for:</strong> Experienced buyers who want full control</p>
            </div>
            <div className="seo-card">
              <h3>FOB (Free On Board)</h3>
              <p><strong>Seller delivers:</strong> Goods loaded on vessel at origin port</p>
              <p><strong>Buyer handles:</strong> Freight, insurance, import clearance</p>
              <p><strong>Best for:</strong> Sea freight when buyer has freight contracts</p>
            </div>
            <div className="seo-card">
              <h3>CIF (Cost, Insurance, Freight)</h3>
              <p><strong>Seller delivers:</strong> Goods to destination port, pays freight + insurance</p>
              <p><strong>Buyer handles:</strong> Import clearance, local delivery</p>
              <p><strong>Best for:</strong> Buyers wanting simpler pricing</p>
            </div>
            <div className="seo-card">
              <h3>DDP (Delivered Duty Paid)</h3>
              <p><strong>Seller delivers:</strong> To buyer's door, all costs and duties paid</p>
              <p><strong>Buyer handles:</strong> Nothing except unloading</p>
              <p><strong>Best for:</strong> Buyers wanting all-inclusive pricing</p>
            </div>
          </div>
        </>
      )
    },
    {
      heading: 'Complete Incoterms 2020 List',
      content: (
        <>
          <p><strong>Any Mode of Transport:</strong></p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>EXW:</strong> Ex Works – Minimum seller obligation</li>
            <li><CheckCircle size={18} /> <strong>FCA:</strong> Free Carrier – Delivered to carrier at named place</li>
            <li><CheckCircle size={18} /> <strong>CPT:</strong> Carriage Paid To – Seller pays freight to destination</li>
            <li><CheckCircle size={18} /> <strong>CIP:</strong> Carriage and Insurance Paid – CPT plus insurance</li>
            <li><CheckCircle size={18} /> <strong>DAP:</strong> Delivered at Place – Delivered ready for unloading</li>
            <li><CheckCircle size={18} /> <strong>DPU:</strong> Delivered at Place Unloaded – Delivered and unloaded</li>
            <li><CheckCircle size={18} /> <strong>DDP:</strong> Delivered Duty Paid – Maximum seller obligation</li>
          </ul>
          <p style={{marginTop: '20px'}}><strong>Sea and Inland Waterway Only:</strong></p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>FAS:</strong> Free Alongside Ship – Delivered alongside vessel</li>
            <li><CheckCircle size={18} /> <strong>FOB:</strong> Free On Board – Loaded on vessel</li>
            <li><CheckCircle size={18} /> <strong>CFR:</strong> Cost and Freight – Seller pays freight</li>
            <li><CheckCircle size={18} /> <strong>CIF:</strong> Cost, Insurance, Freight – Seller pays freight + insurance</li>
          </ul>
        </>
      )
    },
    {
      heading: 'How to Choose the Right Incoterm',
      content: (
        <>
          <ol className="seo-steps">
            <li><strong>Assess Your Experience:</strong> New importers often prefer CIF/DDP for simplicity; experienced buyers use FOB for cost control</li>
            <li><strong>Consider Freight Rates:</strong> If you have better freight contracts, use FOB/EXW to leverage them</li>
            <li><strong>Evaluate Risk Tolerance:</strong> DDP shifts most risk to seller; EXW puts risk on buyer</li>
            <li><strong>Check Insurance Needs:</strong> CIF/CIP include basic insurance; you may need additional coverage</li>
            <li><strong>Factor in Customs Complexity:</strong> DDP requires seller to handle import clearance in your country</li>
          </ol>
        </>
      )
    },
    {
      heading: 'Common Incoterm Mistakes',
      content: (
        <>
          <div className="seo-warning-box">
            <p><AlertTriangle size={18} style={{display: 'inline', marginRight: '8px'}} />
            Using the wrong Incoterm can result in unexpected costs, insurance gaps, or delivery disputes.</p>
          </div>
          <ul className="seo-checklist">
            <li><AlertTriangle size={18} color="#f59e0b" /> Using FOB/CIF for air freight (they're for sea only)</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Assuming CIF insurance is comprehensive (it's minimum coverage)</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Not specifying the exact delivery location</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Forgetting to mention Incoterms version (2020)</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Confusing risk transfer with cost responsibility</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Incoterms Cost Comparison',
      content: (
        <>
          <p>Understanding what's included in each Incoterm helps compare quotes accurately:</p>
          <div className="seo-grid-3">
            <div className="seo-card">
              <h3>EXW Price Includes</h3>
              <p>Product cost only. Buyer adds: local transport, export clearance, freight, insurance, import duties, delivery</p>
            </div>
            <div className="seo-card">
              <h3>FOB Price Includes</h3>
              <p>Product + local transport + export clearance + loading. Buyer adds: freight, insurance, import duties, delivery</p>
            </div>
            <div className="seo-card">
              <h3>CIF Price Includes</h3>
              <p>Product + export + freight + basic insurance. Buyer adds: import duties, local delivery</p>
            </div>
          </div>
        </>
      )
    }
  ]

  const faqs = [
    { q: 'What is the difference between FOB and CIF?', a: 'FOB (Free On Board) means the seller delivers goods loaded on the vessel at origin port—buyer pays freight and insurance. CIF (Cost, Insurance, Freight) means seller pays freight and insurance to destination port. Risk transfers at origin port in both cases.' },
    { q: 'Which Incoterm is best for first-time importers?', a: 'CIF or DDP are often recommended for first-time importers as they include more services in the price, making cost calculation simpler. As you gain experience, FOB offers more control and potentially lower costs.' },
    { q: 'Does CIF insurance cover full cargo value?', a: 'No. CIF requires only minimum insurance coverage (110% of invoice value, Institute Cargo Clauses C). For comprehensive coverage, request CIP or arrange additional insurance separately.' },
    { q: 'Can I use FOB for air freight?', a: 'No. FOB is specifically for sea freight. For air freight, use FCA (Free Carrier) which serves a similar purpose—seller delivers to the carrier at origin.' },
    { q: 'Who pays customs duties under DDP?', a: 'Under DDP (Delivered Duty Paid), the seller pays all costs including import customs duties and taxes. This is the maximum obligation for sellers.' }
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
      'Every quote clearly states the Incoterm so you know exactly what\'s included',
      'Our RFQ system lets you specify your preferred Incoterm upfront',
      'Order milestones show cost breakdowns based on your chosen shipping terms',
      'Compare quotes easily with standardized pricing across all suppliers'
    ],
    links: [
      { label: 'Submit RFQ', to: '/rfq' },
      { label: 'How We Work', to: '/how-we-work' },
      { label: 'Quote & Order Milestones', to: '/quote-order-milestones' }
    ]
  }

  return (
    <GuidePageLayout
      title="Incoterms Explained: FOB, CIF, DDP & More for International Trade"
      intro={intro}
      sections={sections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      badge="Trade Terms"
      badgeIcon={<Scale size={16} />}
    >
      <AazikoHelpsBlock
        bullets={aazikoHelps.bullets}
        links={aazikoHelps.links}
      />
    </GuidePageLayout>
  )
}

export default IncotermsExplained
