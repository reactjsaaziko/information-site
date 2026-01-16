import { forwardRef, useState } from 'react';

const CAPABILITIES = [
  { name: 'Documentation', tooltip: 'Guided paperwork & templates' },
  { name: 'Inspections', tooltip: 'Quality checks before shipment' },
  { name: 'Invoices', tooltip: 'Clear trade documentation' },
  { name: 'Insurance', tooltip: 'Protection against risk' },
  { name: 'Customs', tooltip: 'Compliance & clearance support' },
  { name: 'Logistics', tooltip: 'Shipment coordination & tracking' },
  { name: 'Financing', tooltip: 'Support for trade cashflow' },
];

const AazikoBridge2D = forwardRef(({ visible = false, chipsVisible = false }, ref) => {
  const [hoveredChip, setHoveredChip] = useState(null);

  return (
    <div 
      ref={ref} 
      className={`aaziko-bridge-2d ${visible ? 'aaziko-bridge-2d--visible ' : ''}`}
    >
      <div className="aaziko-bridge-2d__card ">
        {/* Solution badge */}
        <span className="aaziko-bridge-2d__badge ">Solution</span>
        
        <div className="aaziko-bridge-2d__content">
          <div className="aaziko-bridge-2d__icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path 
                d="M12 2L2 7L12 12L22 7L12 2Z" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M2 17L12 22L22 17" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M2 12L12 17L22 12" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="aaziko-bridge-2d__text">
            <span className="aaziko-bridge-2d__title">Aaziko Bridge</span>
            <span className="aaziko-bridge-2d__desc">We handle compliance, protection & delivery end-to-end.</span>
            <span className="aaziko-bridge-2d__solution">Verified suppliers • Protected payments • Shipment visibility</span>
          </div>
        </div>
      </div>
      
      <div className={`aaziko-bridge-2d__chips ${chipsVisible ? 'aaziko-bridge-2d__chips--visible' : ''}`}>
        {CAPABILITIES.map((cap, index) => (
          <div 
            key={cap.name}
            className="aaziko-bridge-2d__chip-wrapper"
            onMouseEnter={() => setHoveredChip(index)}
            onMouseLeave={() => setHoveredChip(null)}
          >
            {/* Tooltip */}
            <div className={`aaziko-bridge-2d__tooltip ${hoveredChip === index ? 'aaziko-bridge-2d__tooltip--visible' : ''}`}>
              {cap.tooltip}
            </div>
            
            <span 
              className="aaziko-bridge-2d__chip"
              style={{ transitionDelay: chipsVisible ? `${index * 0.06}s` : '0s' }}
            >
              <span className="aaziko-bridge-2d__chip-dot" />
              {cap.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

AazikoBridge2D.displayName = 'AazikoBridge2D';

export default AazikoBridge2D;
