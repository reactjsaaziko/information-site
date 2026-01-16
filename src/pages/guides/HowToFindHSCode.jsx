// How to Find HS Code - SEO Guide Page
import { CheckCircle, AlertTriangle, Search, Tag } from 'lucide-react'
import GuidePageLayout from '../../components/GuidePageLayout'
import AazikoHelpsBlock from '../../components/AazikoHelpsBlock'

const HowToFindHSCode = () => {
  const intro = `The HS Code (Harmonized System Code) is a standardized numerical code used worldwide to classify traded products. Getting the correct HS code is critical—it determines customs duties, required permits, and documentation. Using the wrong code can result in overpaying duties, customs delays, or penalties. This guide explains how to find the right HS code for your products, common classification mistakes, and resources for verification.`

  const sections = [
    {
      heading: 'What is an HS Code?',
      content: (
        <>
          <p>The Harmonized System is an international product classification system used by customs authorities worldwide:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>First 6 digits:</strong> Internationally standardized (same worldwide)</li>
            <li><CheckCircle size={18} /> <strong>Digits 7-8:</strong> Country-specific subdivisions for detailed classification</li>
            <li><CheckCircle size={18} /> <strong>Digits 9-10:</strong> Additional national subdivisions (some countries)</li>
          </ul>
          <div className="seo-info-box">
            <p><Tag size={18} style={{display: 'inline', marginRight: '8px'}} />
            Example: HS Code 6109.10.00 = T-shirts, singlets (6109) + of cotton (10) + knitted or crocheted (00)</p>
          </div>
        </>
      )
    },
    {
      heading: 'Step-by-Step: Finding Your HS Code',
      content: (
        <>
          <ol className="seo-steps">
            <li><strong>Identify Product Category:</strong> Start with the broad category (textiles, machinery, food, etc.)</li>
            <li><strong>Determine Material/Composition:</strong> What is the product made of? (cotton, steel, plastic, etc.)</li>
            <li><strong>Note the Function/Use:</strong> What is the product's primary purpose?</li>
            <li><strong>Check Product Form:</strong> Is it raw material, semi-finished, or finished product?</li>
            <li><strong>Search HS Database:</strong> Use official customs databases to find matching codes</li>
            <li><strong>Verify with Customs:</strong> For complex products, get a binding ruling from customs</li>
          </ol>
        </>
      )
    },
    {
      heading: 'HS Code Lookup Resources',
      content: (
        <>
          <p>Use these official resources to find and verify HS codes:</p>
          <div className="seo-grid-2">
            <div className="seo-card">
              <h3>WCO HS Database</h3>
              <p>World Customs Organization's official HS nomenclature. The authoritative source for 6-digit codes used globally.</p>
            </div>
            <div className="seo-card">
              <h3>National Customs Portals</h3>
              <p>Each country's customs website has searchable tariff databases with country-specific 8-10 digit codes.</p>
            </div>
            <div className="seo-card">
              <h3>Trade Data Portals</h3>
              <p>UN Comtrade, ITC Trade Map provide HS code lookups with trade statistics.</p>
            </div>
            <div className="seo-card">
              <h3>Customs Broker Assistance</h3>
              <p>Licensed customs brokers can help classify complex products and obtain binding rulings.</p>
            </div>
          </div>
        </>
      )
    },
    {
      heading: 'HS Code Structure Explained',
      content: (
        <>
          <p>Understanding the HS code structure helps you navigate classification:</p>
          <div className="seo-grid-3">
            <div className="seo-card">
              <h3>Chapters (01-99)</h3>
              <p>Broad product categories like animals, textiles, machinery, etc.</p>
            </div>
            <div className="seo-card">
              <h3>Headings (4 digits)</h3>
              <p>More specific product groups within each chapter</p>
            </div>
            <div className="seo-card">
              <h3>Subheadings (6 digits)</h3>
              <p>Detailed product descriptions for international use</p>
            </div>
          </div>
          <p style={{marginTop: '20px'}}><strong>Key HS Chapters for Common Products:</strong></p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>Chapters 61-62:</strong> Apparel and clothing</li>
            <li><CheckCircle size={18} /> <strong>Chapter 84:</strong> Machinery and mechanical appliances</li>
            <li><CheckCircle size={18} /> <strong>Chapter 85:</strong> Electrical machinery and equipment</li>
            <li><CheckCircle size={18} /> <strong>Chapters 72-73:</strong> Iron and steel products</li>
            <li><CheckCircle size={18} /> <strong>Chapter 39:</strong> Plastics and plastic articles</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Common HS Code Mistakes',
      content: (
        <>
          <div className="seo-warning-box">
            <p><AlertTriangle size={18} style={{display: 'inline', marginRight: '8px'}} />
            Incorrect HS codes can result in duty disputes, penalties, and shipment delays. Always verify before shipping.</p>
          </div>
          <ul className="seo-checklist">
            <li><AlertTriangle size={18} color="#f59e0b" /> Classifying by use instead of material composition</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Using supplier's HS code without verification</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Ignoring country-specific 8-digit requirements</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Not updating codes when product specifications change</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Choosing codes based on lower duty rates (tariff shopping)</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Getting a Binding HS Code Ruling',
      content: (
        <>
          <p>For complex or high-value products, consider obtaining an official classification ruling:</p>
          <ol className="seo-steps">
            <li><strong>Prepare Product Information:</strong> Detailed specs, composition, photos, samples if needed</li>
            <li><strong>Submit Application:</strong> File with your country's customs authority</li>
            <li><strong>Await Decision:</strong> Typically 30-90 days for ruling</li>
            <li><strong>Use Ruling Reference:</strong> Quote the ruling number on all shipments</li>
          </ol>
          <div className="seo-info-box">
            <p><Search size={18} style={{display: 'inline', marginRight: '8px'}} />
            Binding rulings provide legal certainty and protect against reclassification disputes for 3-6 years depending on country.</p>
          </div>
        </>
      )
    }
  ]

  const faqs = [
    { q: 'What happens if I use the wrong HS code?', a: 'Using an incorrect HS code can result in: paying wrong duty amounts (over or under), customs delays for reclassification, penalties for misclassification, and potential seizure of goods in severe cases.' },
    { q: 'Are HS codes the same in every country?', a: 'The first 6 digits are internationally standardized. However, countries add 2-4 more digits for national subdivisions, and duty rates vary by country even for the same HS code.' },
    { q: 'Can I use my supplier\'s HS code?', a: 'You can use it as a starting point, but always verify. Export HS codes may differ from import codes, and your country may have different classification interpretations.' },
    { q: 'How often do HS codes change?', a: 'The WCO updates the HS system every 5 years (last update: 2022). Countries may also update national subdivisions more frequently. Always check current codes before shipping.' },
    { q: 'Who is responsible for correct HS code classification?', a: 'The importer is ultimately responsible for correct classification in most countries. However, suppliers should provide accurate product information to enable proper classification.' }
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
      'Verified suppliers provide accurate HS codes for all products in their listings',
      'Our export documentation includes pre-verified HS classifications',
      'Customs documentation support helps resolve classification questions',
      'Get expert guidance on product classification through our support team'
    ],
    links: [
      { label: 'Customs Documentation', to: '/customs-documentation' },
      { label: 'Export Documentation', to: '/export-documentation' },
      { label: 'Contact Us', to: '/contact' }
    ]
  }

  return (
    <GuidePageLayout
      title="How to Find HS Code: Complete Guide to Product Classification"
      intro={intro}
      sections={sections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      badge="Classification Guide"
      badgeIcon={<Search size={16} />}
    >
      <AazikoHelpsBlock
        bullets={aazikoHelps.bullets}
        links={aazikoHelps.links}
      />
    </GuidePageLayout>
  )
}

export default HowToFindHSCode
