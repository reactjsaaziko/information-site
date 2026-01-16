// Shipment Tracking Milestones Guide - SEO Guide Page (Cluster B)
import { CheckCircle, AlertTriangle, MapPin, Clock, Bell, Eye, Ship, Truck } from 'lucide-react'
import GuidePageLayout from '../../components/GuidePageLayout'
import AazikoHelpsBlock from '../../components/AazikoHelpsBlock'

const ShipmentTrackingMilestones = () => {
  const intro = `Understanding shipment tracking milestones helps you anticipate what happens next and when. International shipments pass through multiple checkpoints from factory to final delivery. Each milestone represents a critical stage where delays can occur or issues may arise. This guide explains the key tracking milestones for sea and air freight, what each status means, common delay causes, and how to respond when milestones slip. Better milestone understanding leads to better planning and fewer surprises.`

  const sections = [
    {
      heading: 'Sea Freight Tracking Milestones',
      content: (
        <>
          <p>Sea freight shipments typically pass through these key milestones:</p>
          <ol className="seo-steps">
            <li><strong>Booking Confirmed:</strong> Space reserved on vessel, booking number issued</li>
            <li><strong>Container Picked Up:</strong> Empty container collected from depot</li>
            <li><strong>Gate In (Origin):</strong> Loaded container arrives at origin port terminal</li>
            <li><strong>Vessel Departed:</strong> Ship leaves origin port with your cargo</li>
            <li><strong>Transshipment (if any):</strong> Container transferred to connecting vessel</li>
            <li><strong>Vessel Arrived:</strong> Ship reaches destination port</li>
          </ol>
        </>
      )
    },
    {
      heading: 'Sea Freight Milestones (Continued)',
      content: (
        <>
          <ol className="seo-steps" start={7}>
            <li><strong>Customs Clearance:</strong> Documents submitted, duties paid, release obtained</li>
            <li><strong>Gate Out (Destination):</strong> Container released from port terminal</li>
            <li><strong>Delivered:</strong> Container arrives at final destination</li>
            <li><strong>Empty Return:</strong> Container returned to depot (for FCL shipments)</li>
          </ol>
        </>
      )
    },
    {
      heading: 'Air Freight Tracking Milestones',
      content: (
        <>
          <p>Air freight moves faster with these typical milestones:</p>
          <ol className="seo-steps">
            <li><strong>Shipment Booked:</strong> Space confirmed on flight, AWB issued</li>
            <li><strong>Received at Origin:</strong> Cargo handed over to airline/handler</li>
            <li><strong>Departed:</strong> Flight takes off from origin airport</li>
            <li><strong>In Transit:</strong> Cargo moving (may include connections)</li>
            <li><strong>Arrived:</strong> Flight lands at destination airport</li>
            <li><strong>Customs Clearance:</strong> Documents processed, duties paid</li>
            <li><strong>Released:</strong> Cargo cleared for pickup/delivery</li>
            <li><strong>Delivered:</strong> Cargo reaches final destination</li>
          </ol>
        </>
      )
    },
    {
      heading: 'Common Delay Causes by Milestone',
      content: (
        <>
          <div className="seo-warning-box">
            <p><AlertTriangle size={18} style={{display: 'inline', marginRight: '8px'}} />
            Knowing where delays typically occur helps you plan contingencies:</p>
          </div>
          <div className="seo-grid-2">
            <div className="seo-card">
              <h3>Origin Delays</h3>
              <ul className="seo-checklist">
                <li><AlertTriangle size={16} color="#f59e0b" /> Late cargo handover</li>
                <li><AlertTriangle size={16} color="#f59e0b" /> Document errors</li>
                <li><AlertTriangle size={16} color="#f59e0b" /> Port congestion</li>
                <li><AlertTriangle size={16} color="#f59e0b" /> Vessel schedule changes</li>
              </ul>
            </div>
            <div className="seo-card">
              <h3>Destination Delays</h3>
              <ul className="seo-checklist">
                <li><AlertTriangle size={16} color="#f59e0b" /> Customs inspection</li>
                <li><AlertTriangle size={16} color="#f59e0b" /> Missing documents</li>
                <li><AlertTriangle size={16} color="#f59e0b" /> Duty payment delays</li>
                <li><AlertTriangle size={16} color="#f59e0b" /> Terminal congestion</li>
              </ul>
            </div>
          </div>
        </>
      )
    },
    {
      heading: 'What to Do When Milestones Slip',
      content: (
        <>
          <p>Follow this action plan when tracking shows delays:</p>
          <ol className="seo-steps">
            <li><strong>Identify the stuck milestone:</strong> Determine exactly where the shipment is held</li>
            <li><strong>Contact your forwarder:</strong> Get specific reason for delay and estimated resolution</li>
            <li><strong>Check document status:</strong> Verify all paperwork is complete and correct</li>
            <li><strong>Communicate with buyer/seller:</strong> Share updated timeline and any required actions</li>
            <li><strong>Escalate if needed:</strong> Involve customs broker or support team for complex issues</li>
          </ol>
        </>
      )
    },
    {
      heading: 'Milestone Tracking Best Practices',
      content: (
        <>
          <p>Optimize your tracking process with these practices:</p>
          <ul className="seo-checklist">
            <li><CheckCircle size={18} /> <strong>Set up alerts:</strong> Configure notifications for key milestones</li>
            <li><CheckCircle size={18} /> <strong>Track proactively:</strong> Check status daily during critical phases</li>
            <li><CheckCircle size={18} /> <strong>Document everything:</strong> Keep records of all milestone timestamps</li>
            <li><CheckCircle size={18} /> <strong>Know your contacts:</strong> Have forwarder and broker contacts ready</li>
            <li><CheckCircle size={18} /> <strong>Plan for delays:</strong> Build buffer time into your delivery commitments</li>
          </ul>
        </>
      )
    }
  ]

  const faqs = [
    { q: 'How often is sea freight tracking updated?', a: 'Sea freight tracking typically updates at major milestones: port gate-in, vessel departure, transshipment, arrival, and customs clearance. Updates may be 1–3 days apart during ocean transit.' },
    { q: 'What does "in transit" mean for tracking?', a: 'In transit means the cargo is moving between origin and destination. For sea freight, this is the ocean voyage. For air freight, this includes flight time and any connections.' },
    { q: 'Why is my shipment stuck at customs?', a: 'Common reasons include: missing documents, incorrect HS code, random inspection selection, duty payment pending, or compliance issues. Contact your customs broker for specific details.' },
    { q: 'How long should customs clearance take?', a: 'Normal customs clearance takes 1–3 days for sea freight and 1–2 days for air freight. Inspections or document issues can extend this to 5–10 days or more.' },
    { q: 'What is transshipment and does it cause delays?', a: 'Transshipment is when cargo transfers between vessels at an intermediate port. It adds 2–5 days to transit time and introduces risk of delays if connections are missed.' }
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
      'Clear milestone view of what happens next and when',
      'Detect delays early and reduce uncertainty',
      'Better communication structure between parties',
      'Escalation support when milestones slip'
    ],
    links: [
      { label: 'Shipment Tracking', to: '/shipment-tracking' },
      { label: 'How We Work', to: '/how-we-work' },
      { label: 'Dispute Resolution', to: '/dispute-resolution' },
      { label: 'Contact Us', to: '/contact' }
    ]
  }

  return (
    <GuidePageLayout
      title="Shipment Tracking Milestones: Understanding Your Cargo Journey"
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

export default ShipmentTrackingMilestones
