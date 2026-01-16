import { forwardRef } from 'react';

const IllustratedCharacter = forwardRef(({ type = 'seller' }, ref) => {
  const isSeller = type === 'seller';
  
  return (
    <div ref={ref} className="illustrated-character">
      <svg viewBox="0 0 200 380" className="character-svg">
        <defs>
          {/* Skin gradients */}
          <linearGradient id={`skin-${type}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isSeller ? "#f5d0c5" : "#e8c4a8"} />
            <stop offset="100%" stopColor={isSeller ? "#e0b5a0" : "#d4a882"} />
          </linearGradient>
          <radialGradient id={`face-highlight-${type}`} cx="30%" cy="25%" r="60%">
            <stop offset="0%" stopColor={isSeller ? "#fce8e0" : "#f5dcc8"} />
            <stop offset="100%" stopColor={isSeller ? "#f5d0c5" : "#e8c4a8"} />
          </radialGradient>
          
          {/* Hair */}
          <linearGradient id={`hair-${type}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isSeller ? "#3d2814" : "#1a1a1a"} />
            <stop offset="100%" stopColor={isSeller ? "#2a1a0d" : "#0d0d0d"} />
          </linearGradient>
          
          {/* Clothing */}
          <linearGradient id={`suit-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
            {isSeller ? (
              <>
                <stop offset="0%" stopColor="#1e3a5f" />
                <stop offset="50%" stopColor="#152a45" />
                <stop offset="100%" stopColor="#0d1c30" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#4a5568" />
                <stop offset="50%" stopColor="#374151" />
                <stop offset="100%" stopColor="#1f2937" />
              </>
            )}
          </linearGradient>
          
          <linearGradient id={`shirt-${type}`} x1="0%" y1="0%" x2="0%" y2="100%">
            {isSeller ? (
              <>
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f0f0f0" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#e0f2fe" />
                <stop offset="100%" stopColor="#bae6fd" />
              </>
            )}
          </linearGradient>
        </defs>
        
        {/* Hair back */}
        {isSeller ? (
          <ellipse cx="100" cy="58" rx="44" ry="48" fill={`url(#hair-${type})`} />
        ) : (
          <path d="M45 55 Q45 15 100 10 Q155 15 155 55 L158 135 Q140 145 100 145 Q60 145 42 135 Z" fill={`url(#hair-${type})`} />
        )}
        
        {/* Ears */}
        <ellipse cx="52" cy="78" rx="8" ry="12" fill={`url(#skin-${type})`} />
        <ellipse cx="148" cy="78" rx="8" ry="12" fill={`url(#skin-${type})`} />
        
        {/* Neck */}
        <rect x="82" y="115" width="36" height="32" fill={`url(#skin-${type})`} />
        
        {/* Face */}
        <ellipse cx="100" cy="78" rx="42" ry="48" fill={`url(#face-highlight-${type})`} />
        
        {/* Hair front */}
        {isSeller ? (
          <>
            <path d="M58 60 Q62 28 100 22 Q138 28 142 60 Q138 42 100 40 Q62 42 58 60" fill={`url(#hair-${type})`} />
            <path d="M60 55 Q68 38 82 36 L78 52 Q66 54 60 55" fill={`url(#hair-${type})`} />
          </>
        ) : (
          <>
            <path d="M55 58 Q60 22 100 16 Q140 22 145 58 Q140 38 100 35 Q60 38 55 58" fill={`url(#hair-${type})`} />
            <path d="M58 52 Q70 32 88 38 Q82 55 65 58 Z" fill={`url(#hair-${type})`} />
            <path d="M142 52 Q130 32 112 38 Q118 55 135 58 Z" fill={`url(#hair-${type})`} />
            <path d="M48 65 Q44 90 46 125 Q54 132 58 115 Q55 85 52 65" fill={`url(#hair-${type})`} />
            <path d="M152 65 Q156 90 154 125 Q146 132 142 115 Q145 85 148 65" fill={`url(#hair-${type})`} />
          </>
        )}
        
        {/* Eyebrows */}
        <path d={isSeller ? "M68 58 Q80 53 90 58" : "M66 58 Q78 52 88 57"} stroke={isSeller ? "#2d1810" : "#1a1a1a"} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d={isSeller ? "M110 58 Q120 53 132 58" : "M112 57 Q122 52 134 58"} stroke={isSeller ? "#2d1810" : "#1a1a1a"} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        
        {/* Eyes */}
        <ellipse cx="80" cy="72" rx="10" ry="7" fill="#fff" />
        <ellipse cx="120" cy="72" rx="10" ry="7" fill="#fff" />
        <circle cx="81" cy="72" r="5" fill={isSeller ? "#3d2314" : "#1a1a1a"} />
        <circle cx="121" cy="72" r="5" fill={isSeller ? "#3d2314" : "#1a1a1a"} />
        <circle cx="82" cy="71" r="2" fill="#fff" />
        <circle cx="122" cy="71" r="2" fill="#fff" />
        
        {/* Nose */}
        <path d="M100 75 L100 92 Q100 96 96 96" stroke={isSeller ? "#d4a08a" : "#c49468"} strokeWidth="2" fill="none" strokeLinecap="round" />
        
        {/* Mouth */}
        <path d="M85 108 Q100 115 115 108" stroke={isSeller ? "#c4877a" : "#b07860"} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M88 108 Q100 112 112 108" fill={isSeller ? "#e8a090" : "#d49080"} />
        
        {/* Shirt/Blouse */}
        <path d="M78 142 L100 165 L122 142" fill={`url(#shirt-${type})`} />
        
        {/* Tie (seller only) */}
        {isSeller && (
          <path d="M94 145 L100 155 L106 145 L108 220 L100 232 L92 220 Z" fill="#b91c1c" />
        )}
        
        {/* Suit/Blazer */}
        <path d={`M42 148 Q36 160 36 195 L36 320 Q36 332 52 332 L82 332 L82 175 Q82 155 100 148 Q118 155 118 175 L118 332 L148 332 Q164 332 164 320 L164 195 Q164 160 158 148 Q135 132 100 132 Q65 132 42 148 Z`} fill={`url(#suit-${type})`} />
        
        {/* Lapels */}
        <path d="M78 142 L58 168 L58 230 L82 180 Z" fill={isSeller ? "#152a45" : "#2d3748"} />
        <path d="M122 142 L142 168 L142 230 L118 180 Z" fill={isSeller ? "#152a45" : "#2d3748"} />
        
        {/* Arms */}
        <path d="M36 158 Q18 185 24 265 Q26 282 40 282 L52 282 Q60 282 60 270 L60 200 Q60 175 48 158" fill={`url(#suit-${type})`} />
        <path d="M164 158 Q182 185 176 265 Q174 282 160 282 L148 282 Q140 282 140 270 L140 200 Q140 175 152 158" fill={`url(#suit-${type})`} />
        
        {/* Hands */}
        <ellipse cx="40" cy="290" rx="15" ry="18" fill={`url(#skin-${type})`} />
        <ellipse cx="160" cy="290" rx="15" ry="18" fill={`url(#skin-${type})`} />
        
        {/* Fingers hint */}
        <path d="M30 296 Q28 308 32 312 M38 298 Q36 312 40 316 M48 296 Q50 308 48 312" stroke={isSeller ? "#d4a08a" : "#c49468"} strokeWidth="1.5" fill="none" />
        
        {/* Pants/Skirt */}
        {isSeller ? (
          <>
            <rect x="52" y="328" width="42" height="52" rx="4" fill="#0d1c30" />
            <rect x="106" y="328" width="42" height="52" rx="4" fill="#0d1c30" />
          </>
        ) : (
          <path d="M48 328 L42 380 L158 380 L152 328 Z" fill="#1f2937" />
        )}
      </svg>
    </div>
  );
});

IllustratedCharacter.displayName = 'IllustratedCharacter';

export default IllustratedCharacter;
