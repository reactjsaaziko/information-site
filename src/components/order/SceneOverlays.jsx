import { motion } from 'framer-motion';

/**
 * Micro-animation overlays for each scene type
 * All overlays are centered on the image
 */

const overlayContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
};

// 1) Inquiry: message bubble pulse + send arrow
export function InquiryOverlay({ reducedMotion }) {
  if (reducedMotion) return null;
  return (
    <div style={overlayContainer}>
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <path d="M10 16C10 12.69 12.69 10 16 10H48C51.31 10 54 12.69 54 16V38C54 41.31 51.31 44 48 44H22L10 54V16Z" fill="rgba(99, 102, 241, 0.3)" stroke="rgba(99, 102, 241, 0.9)" strokeWidth="3"/>
          <circle cx="24" cy="27" r="3" fill="rgba(99, 102, 241, 0.8)"/>
          <circle cx="32" cy="27" r="3" fill="rgba(99, 102, 241, 0.8)"/>
          <circle cx="40" cy="27" r="3" fill="rgba(99, 102, 241, 0.8)"/>
        </svg>
      </motion.div>
      <motion.div
        animate={{ x: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M4 16H28M28 16L20 8M28 16L20 24" stroke="rgba(99, 102, 241, 0.9)" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </motion.div>
    </div>
  );
}

// 2) Quotation: quote card + approved tick
export function QuoteOverlay({ reducedMotion }) {
  if (reducedMotion) return null;
  return (
    <div style={{ ...overlayContainer, position: 'relative' }}>
      <motion.div
        animate={{ y: [4, -4, 4], rotate: [-2, 2, -2] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="72" height="90" viewBox="0 0 72 90" fill="none">
          <rect x="6" y="6" width="60" height="78" rx="6" fill="rgba(139, 92, 246, 0.25)" stroke="rgba(139, 92, 246, 0.8)" strokeWidth="3"/>
          <rect x="16" y="22" width="40" height="6" rx="3" fill="rgba(139, 92, 246, 0.6)"/>
          <rect x="16" y="36" width="32" height="4" rx="2" fill="rgba(139, 92, 246, 0.4)"/>
          <rect x="16" y="46" width="36" height="4" rx="2" fill="rgba(139, 92, 246, 0.4)"/>
          <rect x="16" y="56" width="28" height="4" rx="2" fill="rgba(139, 92, 246, 0.4)"/>
          <rect x="16" y="70" width="20" height="8" rx="4" fill="rgba(139, 92, 246, 0.5)"/>
        </svg>
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: -10, right: -10 }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" fill="rgba(34, 197, 94, 0.3)" stroke="rgba(34, 197, 94, 0.9)" strokeWidth="3"/>
          <path d="M14 24L21 31L34 18" stroke="rgba(34, 197, 94, 1)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </div>
  );
}

// 3) Order Confirm: checkmark document
export function ConfirmOverlay({ reducedMotion }) {
  if (reducedMotion) return null;
  return (
    <div style={overlayContainer}>
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <rect x="12" y="6" width="56" height="68" rx="6" fill="rgba(6, 182, 212, 0.25)" stroke="rgba(6, 182, 212, 0.8)" strokeWidth="3"/>
          <motion.path
            d="M28 40L36 48L52 32"
            stroke="rgba(6, 182, 212, 1)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, times: [0, 0.4, 0.8, 1] }}
          />
        </svg>
      </motion.div>
    </div>
  );
}

// 4) Payment: circular progress + dollar
export function PayOverlay({ reducedMotion }) {
  if (reducedMotion) return null;
  return (
    <div style={{ ...overlayContainer, position: 'relative' }}>
      <motion.svg width="80" height="80" viewBox="0 0 80 80" animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
        <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="6"/>
        <motion.circle
          cx="40" cy="40" r="34"
          fill="none"
          stroke="rgba(16, 185, 129, 0.9)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="214"
          animate={{ strokeDashoffset: [214, 54, 214] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.svg>
      <motion.div
        style={{ position: 'absolute' }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <text x="18" y="26" textAnchor="middle" fill="rgba(16, 185, 129, 1)" fontSize="28" fontWeight="bold">$</text>
        </svg>
      </motion.div>
    </div>
  );
}

// 5) Contract: document + signature
export function ContractOverlay({ reducedMotion }) {
  if (reducedMotion) return null;
  return (
    <div style={overlayContainer}>
      <motion.div animate={{ y: [3, -3, 3] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="72" height="88" viewBox="0 0 72 88" fill="none">
          <rect x="6" y="6" width="60" height="76" rx="6" fill="rgba(20, 184, 166, 0.25)" stroke="rgba(20, 184, 166, 0.8)" strokeWidth="3"/>
          <rect x="16" y="20" width="40" height="5" rx="2" fill="rgba(20, 184, 166, 0.5)"/>
          <rect x="16" y="32" width="32" height="4" rx="2" fill="rgba(20, 184, 166, 0.4)"/>
          <rect x="16" y="42" width="36" height="4" rx="2" fill="rgba(20, 184, 166, 0.4)"/>
          <motion.path
            d="M16 65 Q28 52 36 60 T56 55"
            stroke="rgba(20, 184, 166, 0.9)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, times: [0, 0.4, 0.8, 1] }}
          />
        </svg>
      </motion.div>
    </div>
  );
}

// 6) Manufacturing: gear + box
export function ProductionOverlay({ reducedMotion }) {
  if (reducedMotion) return null;
  return (
    <div style={overlayContainer}>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}>
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="12" fill="rgba(245, 158, 11, 0.4)" stroke="rgba(245, 158, 11, 0.9)" strokeWidth="3"/>
          <path d="M30 6L33 16H27L30 6ZM30 54L27 44H33L30 54ZM6 30L16 27V33L6 30ZM54 30L44 33V27L54 30Z" fill="rgba(245, 158, 11, 0.7)"/>
          <path d="M12 12L20 18L16 22L12 12ZM48 48L40 42L44 38L48 48ZM48 12L44 22L40 18L48 12ZM12 48L16 38L20 42L12 48Z" fill="rgba(245, 158, 11, 0.6)"/>
        </svg>
      </motion.div>
      <motion.div animate={{ scaleY: [1, 0.92, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <path d="M6 18L26 6L46 18V38L26 50L6 38V18Z" fill="rgba(245, 158, 11, 0.25)" stroke="rgba(245, 158, 11, 0.8)" strokeWidth="3"/>
          <path d="M6 18L26 30L46 18" stroke="rgba(245, 158, 11, 0.6)" strokeWidth="2"/>
          <path d="M26 30V50" stroke="rgba(245, 158, 11, 0.6)" strokeWidth="2"/>
        </svg>
      </motion.div>
    </div>
  );
}

// 7) Inspection: scanner + checklist
export function InspectionOverlay({ reducedMotion }) {
  if (reducedMotion) return null;
  return (
    <div style={{ ...overlayContainer, flexDirection: 'column', gap: '12px' }}>
      <motion.div
        animate={{ y: [-16, 16, -16] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div style={{
          width: '100px',
          height: '4px',
          background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.9), transparent)',
          borderRadius: '2px',
          boxShadow: '0 0 16px rgba(59, 130, 246, 0.7)',
        }}/>
      </motion.div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="2" width="16" height="16" rx="3" stroke="rgba(59, 130, 246, 0.7)" strokeWidth="2"/>
              <path d="M5 10L8 13L15 6" stroke="rgba(59, 130, 246, 0.9)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div style={{ width: '40px', height: '6px', background: 'rgba(59, 130, 246, 0.4)', borderRadius: '3px' }}/>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 8) Full Payment: complete ring + checkmark
export function FullPayOverlay({ reducedMotion }) {
  if (reducedMotion) return null;
  return (
    <div style={{ ...overlayContainer, position: 'relative' }}>
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(34, 197, 94, 0.25)" strokeWidth="6"/>
        <motion.circle
          cx="40" cy="40" r="34"
          fill="none"
          stroke="rgba(34, 197, 94, 1)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="214"
          initial={{ strokeDashoffset: 214 }}
          animate={{ strokeDashoffset: [214, 0, 0, 214] }}
          transition={{ duration: 3, repeat: Infinity, times: [0, 0.4, 0.8, 1] }}
        />
      </svg>
      <motion.div
        style={{ position: 'absolute' }}
        animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1.5 }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M10 20L17 27L30 14" stroke="rgba(34, 197, 94, 1)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </div>
  );
}

// 9) Logistic: truck + pin
export function ShippingOverlay({ reducedMotion }) {
  if (reducedMotion) return null;
  return (
    <div style={overlayContainer}>
      <motion.div animate={{ x: [-6, 6, -6] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="72" height="44" viewBox="0 0 72 44" fill="none">
          <rect x="4" y="10" width="38" height="24" rx="4" fill="rgba(239, 68, 68, 0.3)" stroke="rgba(239, 68, 68, 0.8)" strokeWidth="3"/>
          <path d="M42 16H56L66 26V34H42V16Z" fill="rgba(239, 68, 68, 0.25)" stroke="rgba(239, 68, 68, 0.8)" strokeWidth="3"/>
          <rect x="48" y="20" width="12" height="8" rx="2" fill="rgba(239, 68, 68, 0.4)"/>
          <circle cx="18" cy="38" r="6" fill="rgba(239, 68, 68, 0.4)" stroke="rgba(239, 68, 68, 0.9)" strokeWidth="3"/>
          <circle cx="54" cy="38" r="6" fill="rgba(239, 68, 68, 0.4)" stroke="rgba(239, 68, 68, 0.9)" strokeWidth="3"/>
        </svg>
      </motion.div>
      <motion.div animate={{ scale: [1, 1.2, 1], y: [0, -6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="32" height="44" viewBox="0 0 32 44" fill="none">
          <path d="M16 2C8.27 2 2 8.27 2 16C2 26 16 42 16 42C16 42 30 26 30 16C30 8.27 23.73 2 16 2Z" fill="rgba(239, 68, 68, 0.4)" stroke="rgba(239, 68, 68, 1)" strokeWidth="3"/>
          <circle cx="16" cy="16" r="6" fill="rgba(239, 68, 68, 0.8)"/>
        </svg>
      </motion.div>
    </div>
  );
}

// 10) Custom: customs checkpoint
export function CustomOverlay({ reducedMotion }) {
  if (reducedMotion) return null;
  return (
    <div style={{ ...overlayContainer, position: 'relative' }}>
      <motion.div animate={{ rotate: [-4, 4, -4] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <rect x="10" y="20" width="52" height="42" rx="6" fill="rgba(249, 115, 22, 0.25)" stroke="rgba(249, 115, 22, 0.8)" strokeWidth="3"/>
          <rect x="26" y="8" width="20" height="16" rx="4" fill="rgba(249, 115, 22, 0.35)" stroke="rgba(249, 115, 22, 0.7)" strokeWidth="2"/>
          <circle cx="36" cy="42" r="12" fill="none" stroke="rgba(249, 115, 22, 0.7)" strokeWidth="3"/>
          <path d="M36 34V50M28 42H44" stroke="rgba(249, 115, 22, 0.9)" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </motion.div>
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ position: 'absolute', top: -8, right: -8 }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="2" y="2" width="28" height="28" rx="6" fill="rgba(249, 115, 22, 0.5)" stroke="rgba(249, 115, 22, 1)" strokeWidth="2"/>
          <path d="M9 16L14 21L23 11" stroke="white" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </motion.div>
    </div>
  );
}

// 11) Order Receive: package + hands
export function ReceiveOverlay({ reducedMotion }) {
  if (reducedMotion) return null;
  return (
    <div style={{ ...overlayContainer, flexDirection: 'column', gap: '8px' }}>
      <motion.div animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <path d="M8 22L32 8L56 22V46L32 60L8 46V22Z" fill="rgba(132, 204, 22, 0.25)" stroke="rgba(132, 204, 22, 0.8)" strokeWidth="3"/>
          <path d="M8 22L32 36L56 22" stroke="rgba(132, 204, 22, 0.6)" strokeWidth="2"/>
          <path d="M32 36V60" stroke="rgba(132, 204, 22, 0.6)" strokeWidth="2"/>
        </svg>
      </motion.div>
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}>
        <svg width="56" height="28" viewBox="0 0 56 28" fill="none">
          <path d="M4 24C4 24 16 8 28 8C40 8 52 24 52 24" stroke="rgba(132, 204, 22, 0.7)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M10 16L4 24L10 28" stroke="rgba(132, 204, 22, 0.7)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M46 16L52 24L46 28" stroke="rgba(132, 204, 22, 0.7)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </div>
  );
}

// 12) Dispute: warning + resolution
export function DisputeOverlay({ reducedMotion }) {
  if (reducedMotion) return null;
  return (
    <div style={{ ...overlayContainer, position: 'relative' }}>
      <motion.div animate={{ scale: [1, 1.08, 1], rotate: [0, 3, -3, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <path d="M36 6L66 62H6L36 6Z" fill="rgba(236, 72, 153, 0.25)" stroke="rgba(236, 72, 153, 0.8)" strokeWidth="3" strokeLinejoin="round"/>
          <path d="M36 26V42" stroke="rgba(236, 72, 153, 1)" strokeWidth="5" strokeLinecap="round"/>
          <circle cx="36" cy="52" r="4" fill="rgba(236, 72, 153, 1)"/>
        </svg>
      </motion.div>
      <motion.div
        animate={{ opacity: [0, 1, 0], scale: [0.8, 1.1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
        style={{ position: 'absolute', top: -12, right: -12 }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="16" fill="rgba(34, 197, 94, 0.4)" stroke="rgba(34, 197, 94, 1)" strokeWidth="3"/>
          <path d="M12 20L17 25L28 14" stroke="rgba(34, 197, 94, 1)" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </motion.div>
    </div>
  );
}

// Overlay selector
export default function SceneOverlay({ overlayType, reducedMotion }) {
  const overlays = {
    inquiry: InquiryOverlay,
    quote: QuoteOverlay,
    confirm: ConfirmOverlay,
    pay: PayOverlay,
    contract: ContractOverlay,
    production: ProductionOverlay,
    inspection: InspectionOverlay,
    fullpay: FullPayOverlay,
    shipping: ShippingOverlay,
    custom: CustomOverlay,
    receive: ReceiveOverlay,
    dispute: DisputeOverlay,
  };

  const OverlayComponent = overlays[overlayType];
  if (!OverlayComponent) return null;

  return <OverlayComponent reducedMotion={reducedMotion} />;
}
