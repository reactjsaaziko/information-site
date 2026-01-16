import { forwardRef } from 'react';

const CAPABILITIES = [
  'Documentation',
  'Inspections',
  'Invoices',
  'Insurance',
  'Customs',
  'Logistics',
  'Financing',
];

const AazikoBridge = forwardRef(({ visible = false, chipsVisible = false }, ref) => {
  return (
    <div 
      ref={ref} 
      className={`aaziko-bridge-pro ${visible ? 'aaziko-bridge-pro--visible' : ''}`}
    >
      <div className="aaziko-bridge-pro__card">
        <div className="aaziko-bridge-pro__glow" />
        <div className="aaziko-bridge-pro__content">
          <div className="aaziko-bridge-pro__icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path 
                d="M12 2L2 7L12 12L22 7L12 2Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M2 17L12 22L22 17" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M2 12L12 17L22 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="aaziko-bridge-pro__title">Aaziko Bridge</span>
        </div>
      </div>
      
      <div className={`aaziko-bridge-pro__chips ${chipsVisible ? 'aaziko-bridge-pro__chips--visible' : ''}`}>
        {CAPABILITIES.map((cap, index) => (
          <span 
            key={cap} 
            className="aaziko-bridge-pro__chip"
            style={{ 
              transitionDelay: chipsVisible ? `${index * 0.1}s` : '0s'
            }}
          >
            {cap}
          </span>
        ))}
      </div>
    </div>
  );
});

AazikoBridge.displayName = 'AazikoBridge';

export default AazikoBridge;
