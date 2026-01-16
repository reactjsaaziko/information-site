// Premium Vector-3D Seller Avatar - Confident stance, human proportions
export default function IllustratedSeller() {
  return (
    <svg viewBox="0 0 200 440" className="avatar-svg avatar-svg--seller">
      <defs>
        {/* Skin with key light from top-left */}
        <linearGradient id="seller-skin-main" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fce4d8" />
          <stop offset="35%" stopColor="#f0d0bc" />
          <stop offset="100%" stopColor="#dbb8a0" />
        </linearGradient>
        <radialGradient id="seller-face-light" cx="25%" cy="20%" r="70%">
          <stop offset="0%" stopColor="#fff5f0" />
          <stop offset="40%" stopColor="#fce4d8" />
          <stop offset="100%" stopColor="#e8c8b0" />
        </radialGradient>
        
        {/* Hair with highlights */}
        <linearGradient id="seller-hair-main" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#4a3525" />
          <stop offset="40%" stopColor="#2d1f14" />
          <stop offset="100%" stopColor="#1a0f08" />
        </linearGradient>
        <linearGradient id="seller-hair-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6b4a35" />
          <stop offset="100%" stopColor="#3d2818" />
        </linearGradient>
        
        {/* Navy suit with folds */}
        <linearGradient id="seller-suit-main" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2d4f72" />
          <stop offset="25%" stopColor="#1e3a55" />
          <stop offset="75%" stopColor="#152d45" />
          <stop offset="100%" stopColor="#0f2035" />
        </linearGradient>
        <linearGradient id="seller-suit-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3d6a90" />
          <stop offset="100%" stopColor="#1e3a55" />
        </linearGradient>
        <linearGradient id="seller-suit-shadow" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#152d45" />
          <stop offset="100%" stopColor="#0a1825" />
        </linearGradient>
        
        {/* Shirt */}
        <linearGradient id="seller-shirt" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f0f0f0" />
        </linearGradient>
        
        {/* Rim light (right edge cyan glow) */}
        <linearGradient id="seller-rim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="80%" stopColor="rgba(91,155,213,0.15)" />
          <stop offset="100%" stopColor="rgba(91,155,213,0.35)" />
        </linearGradient>
      </defs>
      
      {/* Ground shadow */}
      <ellipse cx="100" cy="418" rx="38" ry="5" fill="rgba(0,0,0,0.18)" />
      
      {/* === LEGS (longer, slight asymmetry) === */}
      {/* Left leg - slightly forward */}
      <path d="M72 305 L68 400 Q68 408 76 408 L90 408 Q96 408 96 400 L97 305" fill="url(#seller-suit-main)" />
      {/* Right leg */}
      <path d="M103 305 L104 400 Q104 408 110 408 L124 408 Q130 408 130 400 L127 305" fill="url(#seller-suit-main)" />
      {/* Leg shadow between */}
      <path d="M96 305 L97 380 L103 380 L104 305" fill="rgba(0,0,0,0.12)" />
      
      {/* Shoes */}
      <ellipse cx="83" cy="410" rx="17" ry="5" fill="#1a1a1a" />
      <ellipse cx="117" cy="410" rx="17" ry="5" fill="#1a1a1a" />
      <ellipse cx="81" cy="408" rx="6" ry="2.5" fill="#2a2a2a" />
      <ellipse cx="115" cy="408" rx="6" ry="2.5" fill="#2a2a2a" />
      
      {/* === TORSO (shoulders not level - confident) === */}
      <path d="M46 168 Q38 190 40 235 L44 305 L97 308 L100 305 L103 308 L156 305 L160 235 Q162 190 154 168 Q130 152 100 152 Q70 152 46 168" fill="url(#seller-suit-main)" />
      
      {/* Suit highlight (key light left) */}
      <path d="M46 168 Q38 190 40 235 L44 270 Q58 260 62 210 Q64 180 56 168 Q50 162 46 168" fill="url(#seller-suit-highlight)" opacity="0.5" />
      
      {/* Suit shadow (right side depth) */}
      <path d="M154 168 Q162 190 160 235 L156 270 Q145 265 142 220 Q140 185 148 168 Q152 162 154 168" fill="url(#seller-suit-shadow)" opacity="0.4" />
      
      {/* Clothing fold lines */}
      <path d="M70 200 Q75 220 72 250" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" fill="none" />
      <path d="M130 195 Q125 215 128 245" stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" fill="none" />
      
      {/* Lapels */}
      <path d="M76 162 L56 192 L58 265 L84 215 Z" fill="#152d45" />
      <path d="M124 162 L144 192 L142 265 L116 215 Z" fill="#152d45" />
      
      {/* Shirt V */}
      <path d="M80 162 L100 195 L120 162" fill="url(#seller-shirt)" />
      
      {/* Tie */}
      <path d="M95 166 L100 178 L105 166 L107 255 L100 268 L93 255 Z" fill="#8b2942" />
      <path d="M96 172 L100 178 L104 172" fill="#a33350" />
      
      {/* === ARMS (one slightly bent - confident) === */}
      {/* Left arm - slightly bent at elbow */}
      <path d="M40 172 Q22 205 28 260 Q24 285 38 290 L52 288 Q58 286 56 275 L54 225 Q54 195 48 172" fill="url(#seller-suit-main)" />
      {/* Arm highlight */}
      <path d="M42 175 Q30 200 34 240" stroke="rgba(255,255,255,0.08)" strokeWidth="4" fill="none" />
      
      {/* Right arm - relaxed */}
      <path d="M160 172 Q178 205 172 275 Q171 290 158 292 L144 290 Q138 288 140 277 L142 225 Q142 195 152 172" fill="url(#seller-suit-main)" />
      {/* Rim light on right arm */}
      <path d="M172 180 Q180 210 175 270" stroke="rgba(91,155,213,0.2)" strokeWidth="2" fill="none" />
      
      {/* Hands */}
      <ellipse cx="44" cy="296" rx="11" ry="13" fill="url(#seller-skin-main)" />
      <ellipse cx="156" cy="298" rx="11" ry="13" fill="url(#seller-skin-main)" />
      {/* Finger hints */}
      <path d="M38 302 Q36 310 39 314" stroke="#dbb8a0" strokeWidth="1.2" fill="none" />
      <path d="M44 304 Q42 312 45 316" stroke="#dbb8a0" strokeWidth="1.2" fill="none" />
      
      {/* === NECK (softer, natural) === */}
      <path d="M86 128 Q84 145 88 155 L112 155 Q116 145 114 128" fill="url(#seller-skin-main)" />
      {/* Neck shadow */}
      <ellipse cx="100" cy="152" rx="14" ry="4" fill="rgba(0,0,0,0.08)" />
      
      {/* === HEAD (slightly smaller, natural tilt) === */}
      <ellipse cx="100" cy="82" rx="38" ry="44" fill="url(#seller-face-light)" transform="rotate(-2 100 82)" />
      
      {/* Ears */}
      <ellipse cx="60" cy="85" rx="6" ry="11" fill="url(#seller-skin-main)" />
      <ellipse cx="140" cy="85" rx="6" ry="11" fill="url(#seller-skin-main)" />
      <ellipse cx="61" cy="85" rx="3" ry="6" fill="#dbb8a0" />
      <ellipse cx="139" cy="85" rx="3" ry="6" fill="#dbb8a0" />
      
      {/* === HAIR (natural shape, not helmet) === */}
      <path d="M62 68 Q58 30 100 22 Q142 30 138 68 Q135 42 100 38 Q65 42 62 68" fill="url(#seller-hair-main)" />
      {/* Hair volume left */}
      <path d="M62 55 Q68 35 88 32 Q78 50 65 60 Z" fill="url(#seller-hair-highlight)" />
      {/* Hair highlight */}
      <ellipse cx="85" cy="38" rx="10" ry="5" fill="rgba(255,255,255,0.08)" transform="rotate(-15 85 38)" />
      {/* Side hair texture */}
      <path d="M62 60 Q58 75 60 90" stroke="#2d1f14" strokeWidth="2" fill="none" opacity="0.5" />
      
      {/* Shadow under hair */}
      <path d="M65 55 Q100 62 135 55" stroke="rgba(0,0,0,0.06)" strokeWidth="6" fill="none" />
      
      {/* === FACE FEATURES === */}
      {/* Eyebrows - slight asymmetry */}
      <path d="M70 60 Q82 55 92 60" stroke="#2d1f14" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M108 59 Q118 54 130 59" stroke="#2d1f14" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      
      {/* Eyes */}
      <ellipse cx="81" cy="74" rx="8" ry="5.5" fill="#fff" />
      <ellipse cx="119" cy="74" rx="8" ry="5.5" fill="#fff" />
      <circle cx="82" cy="74" r="4" fill="#2d1810" />
      <circle cx="120" cy="74" r="4" fill="#2d1810" />
      <circle cx="83" cy="73" r="1.5" fill="#fff" />
      <circle cx="121" cy="73" r="1.5" fill="#fff" />
      
      {/* Nose */}
      <path d="M100 76 L100 92 Q99 96 95 96" stroke="#d4a088" strokeWidth="2" fill="none" strokeLinecap="round" />
      
      {/* Mouth - slight confident smile */}
      <path d="M88 108 Q100 115 112 108" stroke="#c4877a" strokeWidth="2" fill="none" strokeLinecap="round" />
      
      {/* Shadow under chin */}
      <ellipse cx="100" cy="125" rx="22" ry="6" fill="rgba(0,0,0,0.06)" />
      
      {/* Face highlight (key light) */}
      <ellipse cx="75" cy="65" rx="10" ry="14" fill="rgba(255,255,255,0.08)" />
      
      {/* Rim light on face edge */}
      <path d="M135 55 Q145 75 140 105" stroke="rgba(91,155,213,0.12)" strokeWidth="2" fill="none" />
      
      {/* Rim light on body */}
      <path d="M154 168 Q165 200 160 280" stroke="rgba(91,155,213,0.15)" strokeWidth="2.5" fill="none" />
    </svg>
  );
}
