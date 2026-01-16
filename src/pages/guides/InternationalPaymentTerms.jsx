// International Payment Terms Guide - SEO Guide Page (Cluster C)
import { CheckCircle, AlertTriangle, DollarSign, Shield, Clock, FileText, Scale, Lock } from 'lucide-react'
import GuidePageLayout from '../../components/GuidePageLayout'
import AazikoHelpsBlock from '../../components/AazikoHelpsBlock'

const InternationalPaymentTerms = () => {
  const intro = `Payment terms in international trade determine when and how money changes hands between buyer and seller. Choosing the right payment terms balances risk for both parties and depends on factors like relationship history, order value, and market norms. This guide explains common payment terms from advance payment to open account, helps you understand the risk profile of each option, and provides practical guidance on negotiating terms that work for your trade relationships.`

  const sections = [
    {
      heading: 'Common Payment Terms Explained',
      content: (
        <>
          <p>Here are the most common payment terms in international trade:</p>
          <div className="seo-grid-2">
            <div className="seo-card">
              <h3><DollarSign size={20} />Advance Payment (T/T in Advance)</h3>
              <p>Buyer pays full amount before production or shipment. Lowest risk for seller, highest risk for buyer.</p>
            </div>
            <div className="seo-card">
              <h3><Scale size={20} />Partial Advance + Balance</h3>
              <p>Common split: 30% advance, 70% before shipment. Balances risk between parties.</p>
            </div>
            <div className="seo-card">
              <h3><Shield size={20} />Letter of Credit (L/C)</h3>
              <p>Bank guarantees payment upon document presentation. Secure for both parties but involves bank fees.</p>
            </div>
            <div className="seo-card">
              <h3><FileText size={20} />Documents Against Payment (D/P)</h3>
              <p>Buyer pays when documents arrive at their bank. Goods shipped before payment received.</p>
            </div>
          </div>
        </>
      )
    },
    {
      heading: 'More Payment Terms',
      content: (
        <>
          <div className="seo-grid-2">
            <div className="seo-card">
              <h3><Clock size={20} />Documents Against Acceptance (D/A)</h3>
              <p>Buyer accepts draft for future payment (e.g., 30/60/90 days). Higher risk for seller.</p>
            </div>
            <div className="seo-card">
              <h3><Lock size={20} />Open Account</h3>
              <p>Goods shipped, buyer pays later (net 30/60/90). Highest risk for seller, used with trusted buyers.</p>
            </div>
          </div>
        </>
      )
    },
    {
      heading: 'Risk Comparison by Payment Term',
      content: (
        <>
          <p>Understand the risk profile for each payment method:</p>
          <ol className="seo-steps">
            <li><strong>Advance Payment:</strong> Seller risk: None | Buyer risk: High</li>
            <li><strong>Letter of Credit:</strong> Seller risk: Low | Buyer risk: Low (bank-backed)</li>
            <li><strong>D/P (Documents Against Payment):</strong> Seller risk: Medium | Buyer risk: Low</li>
            <li><strong>D/A (Documents Against Acceptance):</strong> Seller risk: High | Buyer risk: Low</li>
            <li><strong>Open Account:</strong> Seller risk: Very High | Buyer risk: None</li>
          </ol>
        </>
      )
    },
    {
      heading: 'Choosing Payment Terms by Situation',
      content: (
        <>
          <p>Match payment terms to your trade relationship:</p>
          <div className="seo-grid-2">
            <div className="seo-card">
              <h3>First Order / New Supplier</h3>
              <ul className="seo-checklist">
                <li><CheckCircle size={16} /> Use advance payment or L/C</li>
                <li><CheckCircle size={16} /> Start with smaller order value</li>
                <li><CheckCircle size={16} /> Request samples first</li>
                <li><CheckCircle size={16} /> Verify supplier credentials</li>
              </ul>
            </div>
            <div className="seo-card">
              <h3>Established Relationship</h3>
              <ul className="seo-checklist">
                <li><CheckCircle size={16} /> Consider D/P or partial advance</li>
                <li><CheckCircle size={16} /> Negotiate better terms over time</li>
                <li><CheckCircle size={16} /> Build credit history gradually</li>
                <li><CheckCircle size={16} /> Document payment track record</li>
              </ul>
            </div>
          </div>
        </>
      )
    },
    {
      heading: 'Payment Terms Negotiation Checklist',
      content: (
        <>
          <p>Consider these factors when negotiating payment terms:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>Order value:</strong> Higher value = more security needed</li>
            <li><CheckCircle size={18} /> <strong>Relationship history:</strong> Track record of successful orders</li>
            <li><CheckCircle size={18} /> <strong>Market norms:</strong> Standard terms in your industry/region</li>
            <li><CheckCircle size={18} /> <strong>Cash flow needs:</strong> Your working capital requirements</li>
            <li><CheckCircle size={18} /> <strong>Production timeline:</strong> When funds are needed for manufacturing</li>
            <li><CheckCircle size={18} /> <strong>Inspection milestones:</strong> Link payments to quality checkpoints</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Common Payment Mistakes to Avoid',
      content: (
        <>
          <div className="seo-warning-box">
            <p><AlertTriangle size={18} style={{display: 'inline', marginRight: '8px'}} />
            These mistakes lead to payment disputes and losses:</p>
          </div>
          <ul className="seo-checklist">
            <li><AlertTriangle size={18} color="#f59e0b" /> Paying 100% advance to unknown suppliers</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Not documenting payment terms in writing</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Ignoring L/C document requirements</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Releasing payment before inspection</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Not verifying bank details before transfer</li>
            <li><AlertTriangle size={18} color="#f59e0b" /> Unclear currency and exchange rate terms</li>
          </ul>
        </>
      )
    }
  ]

  const faqs = [
    { q: 'What is the safest payment term for buyers?', a: 'Letter of Credit (L/C) is safest for buyers as payment only releases when seller provides compliant documents. For smaller orders, paying balance after inspection but before shipment offers good protection.' },
    { q: 'What is T/T payment?', a: 'T/T (Telegraphic Transfer) is a bank wire transfer. It can be used for advance payment, balance payment, or any stage. T/T itself doesn\'t specify timing—the terms (e.g., "30% T/T advance") define when payment is made.' },
    { q: 'How do I protect myself with advance payment?', a: 'Verify supplier thoroughly, start with small orders, use escrow services if available, get samples first, and document everything in writing. Consider milestone payments tied to production stages.' },
    { q: 'What are typical payment terms for first orders?', a: 'Common first-order terms: 30% advance + 70% before shipment, or 100% L/C at sight. As trust builds, terms often shift to more favorable arrangements for the buyer.' },
    { q: 'Should I use PayPal for international trade?', a: 'PayPal works for small orders and samples but has high fees and transaction limits. For bulk orders, bank transfers (T/T) or L/C are more appropriate and cost-effective.' }
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
      'Pick payment terms based on risk and relationship stage',
      'Clarify payment expectations inside RFQ and quotations',
      'Checklist to avoid common payment misunderstandings',
      'Finance coordination support path'
    ],
    links: [
      { label: 'Trade Finance', to: '/finance' },
      { label: 'Order Finance', to: '/trade-solutions/order-finance' },
      { label: 'Submit RFQ', to: '/rfq' },
      { label: 'Contact Us', to: '/contact' }
    ]
  }

  return (
    <GuidePageLayout
      title="International Payment Terms: Complete Guide for Trade"
      intro={intro}
      sections={sections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      badge="Finance Guide"
    >
      <AazikoHelpsBlock
        bullets={aazikoHelps.bullets}
        links={aazikoHelps.links}
      />
    </GuidePageLayout>
  )
}

export default InternationalPaymentTerms
