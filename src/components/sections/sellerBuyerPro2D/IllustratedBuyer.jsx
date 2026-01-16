// Premium Vector-3D Buyer Avatar - Relaxed stance, slight head tilt, friendly
export default function IllustratedBuyer() {
  return (
    <svg viewBox="0 0 200 440" className="avatar-svg avatar-svg--buyer">
      <defs>
        {/* Skin with key light from top-left */}
        <linearGradient id="buyer-skin-main" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8e0d0" />
          <stop offset="35%" stopColor="#e8c8b4" />
          <stop offset="100%" stopColor="#d4b098" />
        </linearGradient>
        <radialGradient id="buyer-face-light" cx="25%" cy="20%" r="70%">
          <stop offset="0%" stopColor="#fff8f2" />
          <stop offset="40%" stopColor="#f8e0d0" />
          <stop offset="100%" stopColor="#e0c0a8" />
        </radialGradient>
        
        {/* Dark hair with highlights */}
        <linearGradient id="buyer-hair-main" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#252525" />
          <stop offset="40%" stopColor="#151515" />
          <stop offset="100%" stopColor="#080808" />
        </linearGradient>
        <linearGradient id="buyer-hair-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#404040" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
        
        {/* Gray blazer with folds */}
        <linearGradient id="buyer-blazer-main" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5d6575" />
          <stop offset="25%" stopColor="#4a5260" />
          <stop offset="75%" stopColor="#3a4250" />
          <stop offset="100%" stopColor="#2e3640" />
        </linearGradient>
        <linearGradient id="buyer-blazer-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7a8595" />
          <stop offset="100%" stopColor="#4a5260" />
        </linearGradient>
        <linearGradient id="buyer-blazer-shadow" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3a4250" />
          <stop offset="100%" stopColor="#252a32" />
        </linearGradient>
        
        {/* Light blue shirt */}
        <linearGradient id="buyer-shirt" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e8f4fc" />
          <stop offset="100%" stopColor="#d4e8f4" />
        </linearGradient>
        
        {/* Pants */}
        <linearGradient id="buyer-pants" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3a4250" />
          <stop offset="100%" stopColor="#252a32" />
        </linearGradient>
        
        {/* Rim light (right edge cyan glow) */}
        <linearGradient id="buyer-rim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="80%" stopColor="rgba(77,184,184,0.15)" />
          <stop offset="100%" stopColor="rgba(77,184,184,0.35)" />
        </linearGradient>
      </defs>
      
      {/* Ground shadow */}
      <ellipse cx="100" cy="418" rx="38" ry="5" fill="rgba(0,0,0,0.18)" />
      
      {/* === LEGS (relaxed stance) === */}
      {/* Left leg */}
      <path d="M72 305 L69 400 Q69 408 77 408 L91 408 Q97 408 97 400 L98 305" fill="url(#buyer-pants)" />
      {/* Right leg - slightly apart */}
      <path d="M102 305 L103 400 Q103 408 109 408 L123 408 Q129 408 129 400 L128 305" fill="url(#buyer-pants)" />
      {/* Leg shadow between */}
      <path d="M97 305 L98 375 L102 375 L103 305" fill="rgba(0,0,0,0.1)" />
      
      {/* Shoes - brown oxford */}
      <ellipse cx="84" cy="410" rx="17" ry="5" fill="#3a2820" />
      <ellipse cx="116" cy="410" rx="17" ry="5" fill="#3a2820" />
      <ellipse cx="82" cy="408" rx="6" ry="2.5" fill="#4a3830" />
      <ellipse cx="114" cy="408" rx="6" ry="2.5" fill="#4a3830" />
      
      {/* === TORSO (relaxed shoulders) === */}
      <path d="M48 168 Q40 190 42 235 L46 305 L98 308 L100 305 L102 308 L154 305 L158 235 Q160 190 152 168 Q128 152 100 152 Q72 152 48 168" fill="url(#buyer-blazer-main)" />
      
      {/* Blazer highlight (key light left) */}
      <path d="M48 168 Q40 190 42 235 L46 268 Q60 258 64 212 Q66 182 58 168 Q52 162 48 168" fill="url(#buyer-blazer-highlight)" opacity="0.45" />
      
      {/* Blazer shadow (right side depth) */}
      <path d="M152 168 Q160 190 158 235 L154 268 Q143 263 140 218 Q138 185 146 168 Q150 162 152 168" fill="url(#buyer-blazer-shadow)" opacity="0.35" />
      
      {/* Clothing fold lines */}
      <path d="M72 198 Q77 218 74 248" stroke="rgba(0,0,0,0.07)" strokeWidth="1.5" fill="none" />
      <path d="M128 195 Q123 215 126 242" stroke="rgba(0,0,0,0.05)" strokeWidth="1.5" fill="none" />
      
      {/* Lapels */}
      <path d="M78 162 L58 192 L60 262 L86 215 Z" fill="#2e3640" />
      <path d="M122 162 L142 192 L140 262 L114 215 Z" fill="#2e3640" />
      
      {/* Shirt - open collar */}
      <path d="M82 162 L100 192 L118 162" fill="url(#buyer-shirt)" />
      
      {/* === ARMS (relaxed, natural) === */}
      {/* Left arm */}
      <path d="M42 172 Q24 205 30 265 Q28 285 42 288 L56 286 Q62 284 60 273 L58 225 Q58 195 50 172" fill="url(#buyer-blazer-main)" />
      {/* Arm highlight */}
      <path d="M44 175 Q32 200 36 245" stroke="rgba(255,255,255,0.07)" strokeWidth="4" fill="none" />
      
      {/* Right arm - slightly bent */}
      <path d="M158 172 Q176 205 170 270 Q169 288 156 290 L142 288 Q136 286 138 275 L140 225 Q140 195 150 172" fill="url(#buyer-blazer-main)" />
      {/* Rim light on right arm */}
      <path d="M170 180 Q178 210 173 268" stroke="rgba(77,184,184,0.2)" strokeWidth="2" fill="none" />
      
      {/* Hands */}
      <ellipse cx="46" cy="294" rx="11" ry="13" fill="url(#buyer-skin-main)" />
      <ellipse cx="154" cy="296" rx="11" ry="13" fill="url(#buyer-skin-main)" />
      {/* Finger hints */}
      <path d="M40 300 Q38 308 41 312" stroke="#d4b098" strokeWidth="1.2" fill="none" />
      <path d="M46 302 Q44 310 47 314" stroke="#d4b098" strokeWidth="1.2" fill="none" />
      
      {/* === NECK (softer) === */}
      <path d="M86 128 Q84 145 88 155 L112 155 Q116 145 114 128" fill="url(#buyer-skin-main)" />
      {/* Neck shadow */}
      <ellipse cx="100" cy="152" rx="14" ry="4" fill="rgba(0,0,0,0.07)" />
      
      {/* === HEAD (slight tilt for friendly look) === */}
      <ellipse cx="100" cy="82" rx="38" ry="44" fill="url(#buyer-face-light)" transform="rotate(3 100 82)" />
      
      {/* Ears */}
      <ellipse cx="60" cy="85" rx="6" ry="11" fill="url(#buyer-skin-main)" />
      <ellipse cx="140" cy="85" rx="6" ry="11" fill="url(#buyer-skin-main)" />
      <ellipse cx="61" cy="85" rx="3" ry="6" fill="#d4b098" />
      <ellipse cx="139" cy="85" rx="3" ry="6" fill="#d4b098" />
      
      {/* === HAIR (styled, natural volume) === */}
      <path d="M60 62 Q55 22 100 15 Q145 22 140 62 Q137 38 100 34 Q63 38 60 62" fill="url(#buyer-hair-main)" />
      {/* Hair volume sides */}
      <path d="M62 52 Q72 30 95 28 Q82 48 65 58 Z" fill="url(#buyer-hair-highlight)" />
      <path d="M138 52 Q128 30 105 28 Q118 48 135 58 Z" fill="url(#buyer-hair-highlight)" />
      {/* Hair highlight */}
      <ellipse cx="88" cy="35" rx="12" ry="5" fill="rgba(255,255,255,0.06)" transform="rotate(-10 88 35)" />
      {/* Side hair */}
      <path d="M58 58 Q54 78 56 98 Q62 102 64 85 Q62 68 60 58" fill="url(#buyer-hair-main)" />
      <path d="M142 58 Q146 78 144 98 Q138 102 136 85 Q138 68 140 58" fill="url(#buyer-hair-main)" />
      
      {/* Shadow under hair */}
      <path d="M65 52 Q100 60 135 52" stroke="rgba(0,0,0,0.05)" strokeWidth="5" fill="none" />
      
      {/* === FACE FEATURES === */}
      {/* Eyebrows - relaxed, friendly */}
      <path d="M68 60 Q80 56 92 61" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M108 60 Q120 55 132 60" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      
      {/* Eyes - slightly wider for friendly look */}
      <ellipse cx="80" cy="74" rx="8.5" ry="6" fill="#fff" />
      <ellipse cx="120" cy="74" rx="8.5" ry="6" fill="#fff" />
      <circle cx="81" cy="74" r="4.5" fill="#1a1a1a" />
      <circle cx="121" cy="74" r="4.5" fill="#1a1a1a" />
      <circle cx="82" cy="73" r="1.5" fill="#fff" />
      <circle cx="122" cy="73" r="1.5" fill="#fff" />
      
      {/* Nose */}
      <path d="M100 76 L100 92 Q99 96 95 96" stroke="#c9a080" strokeWidth="2" fill="none" strokeLinecap="round" />
      
      {/* Mouth - friendly smile */}
      <path d="M86 108 Q100 117 114 108" stroke="#b07860" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Slight smile line */}
      <path d="M88 110 Q100 114 112 110" fill="rgba(176,120,96,0.15)" />
      
      {/* Shadow under chin */}
      <ellipse cx="100" cy="125" rx="22" ry="6" fill="rgba(0,0,0,0.05)" />
      
      {/* Face highlight (key light) */}
      <ellipse cx="75" cy="65" rx="10" ry="14" fill="rgba(255,255,255,0.07)" />
      
      {/* Rim light on face edge */}
      <path d="M135 55 Q145 75 140 105" stroke="rgba(77,184,184,0.12)" strokeWidth="2" fill="none" />
      
      {/* Rim light on body */}
      <path d="M152 168 Q163 200 158 278" stroke="rgba(77,184,184,0.15)" strokeWidth="2.5" fill="none" />
    </svg>
  );
}
