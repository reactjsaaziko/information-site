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

const AazikoHub = forwardRef(({ showChips = false }, ref) => {
  return (
    <div ref={ref} className="aaziko-hub">
      <div className="aaziko-hub__card">
        <div className="aaziko-hub__glow" />
        <div className="aaziko-hub__content">
          <span className="aaziko-hub__label">Aaziko Bridge</span>
        </div>
      </div>
      
      <div className={`aaziko-hub__chips ${showChips ? 'aaziko-hub__chips--visible' : ''}`}>
        {CAPABILITIES.map((cap, index) => (
          <span 
            key={cap} 
            className="aaziko-hub__chip"
            style={{ '--chip-index': index }}
          >
            {cap}
          </span>
        ))}
      </div>
    </div>
  );
});

AazikoHub.displayName = 'AazikoHub';

export default AazikoHub;
