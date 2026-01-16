import { motion } from 'framer-motion';

/**
 * Collection of animated SVG icons for use in sections
 */

// Animated Shield Icon (Trust)
export function AnimatedShield({ size = 48, color = '#2563EB', className = '' }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      initial="hidden"
      animate="visible"
    >
      {/* Shield outline */}
      <motion.path
        d="M24 4L6 12v12c0 11 8 18 18 22 10-4 18-11 18-22V12L24 4z"
        stroke={color}
        strokeWidth="2"
        fill="none"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { 
            pathLength: 1, 
            opacity: 1,
            transition: { duration: 1, ease: "easeInOut" }
          }
        }}
      />
      {/* Checkmark */}
      <motion.path
        d="M16 24l6 6 10-12"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { 
            pathLength: 1, 
            opacity: 1,
            transition: { duration: 0.5, delay: 0.8 }
          }
        }}
      />
      {/* Glow effect */}
      <motion.circle
        cx="24"
        cy="24"
        r="20"
        fill={color}
        variants={{
          hidden: { opacity: 0, scale: 0.5 },
          visible: { 
            opacity: [0, 0.1, 0],
            scale: [0.5, 1.2, 1.5],
            transition: { duration: 1.5, repeat: Infinity, repeatDelay: 2 }
          }
        }}
      />
    </motion.svg>
  );
}

// Animated Globe Icon (Global Trade)
export function AnimatedGlobe({ size = 48, color = '#2563EB', className = '' }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      {/* Globe circle */}
      <motion.circle
        cx="24"
        cy="24"
        r="20"
        stroke={color}
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />
      {/* Horizontal line */}
      <motion.path
        d="M4 24h40"
        stroke={color}
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />
      {/* Vertical ellipse */}
      <motion.ellipse
        cx="24"
        cy="24"
        rx="10"
        ry="20"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      {/* Rotating arc */}
      <motion.circle
        cx="24"
        cy="24"
        r="16"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="20 80"
        fill="none"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: 'center' }}
      />
      {/* Trade route dots */}
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <motion.circle
          key={i}
          cx={24 + 16 * Math.cos((angle * Math.PI) / 180)}
          cy={24 + 16 * Math.sin((angle * Math.PI) / 180)}
          r="3"
          fill={color}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{ 
            duration: 2, 
            delay: i * 0.3,
            repeat: Infinity,
            repeatDelay: 1
          }}
        />
      ))}
    </motion.svg>
  );
}

// Animated Document Icon
export function AnimatedDocument({ size = 48, color = '#2563EB', className = '' }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      {/* Document body */}
      <motion.path
        d="M12 6h18l10 10v26a2 2 0 01-2 2H12a2 2 0 01-2-2V8a2 2 0 012-2z"
        stroke={color}
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8 }}
      />
      {/* Fold corner */}
      <motion.path
        d="M30 6v10h10"
        stroke={color}
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      />
      {/* Text lines */}
      {[24, 30, 36].map((y, i) => (
        <motion.line
          key={i}
          x1="16"
          y1={y}
          x2={32 - i * 4}
          y2={y}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3, delay: 0.8 + i * 0.15 }}
        />
      ))}
      {/* Checkmark appearing */}
      <motion.path
        d="M32 28l-8 8-4-4"
        stroke="#16A34A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.5 }}
      />
    </motion.svg>
  );
}

// Animated Connection/Network Icon
export function AnimatedNetwork({ size = 48, color = '#2563EB', className = '' }) {
  const nodes = [
    { x: 24, y: 8 },
    { x: 8, y: 24 },
    { x: 40, y: 24 },
    { x: 16, y: 40 },
    { x: 32, y: 40 },
  ];

  const connections = [
    [0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [0, 3], [0, 4]
  ];

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      {/* Connection lines */}
      {connections.map(([from, to], i) => (
        <motion.line
          key={`line-${i}`}
          x1={nodes[from].x}
          y1={nodes[from].y}
          x2={nodes[to].x}
          y2={nodes[to].y}
          stroke={color}
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
        />
      ))}
      
      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.g key={`node-${i}`}>
          {/* Pulse ring */}
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="6"
            fill="none"
            stroke={color}
            strokeWidth="1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{ 
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity
            }}
          />
          {/* Node circle */}
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="5"
            fill={color}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.3, 
              delay: 0.5 + i * 0.1,
              type: "spring"
            }}
          />
        </motion.g>
      ))}

      {/* Data packet animation */}
      <motion.circle
        r="3"
        fill="#22D3EE"
        animate={{
          cx: [nodes[0].x, nodes[2].x, nodes[4].x, nodes[3].x, nodes[1].x, nodes[0].x],
          cy: [nodes[0].y, nodes[2].y, nodes[4].y, nodes[3].y, nodes[1].y, nodes[0].y],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.svg>
  );
}

// Animated Chart/Analytics Icon
export function AnimatedChart({ size = 48, color = '#2563EB', className = '' }) {
  const bars = [
    { x: 8, height: 20 },
    { x: 18, height: 32 },
    { x: 28, height: 24 },
    { x: 38, height: 36 },
  ];

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      {/* Axis */}
      <motion.path
        d="M6 6v36h36"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Bars */}
      {bars.map((bar, i) => (
        <motion.rect
          key={i}
          x={bar.x}
          y={42 - bar.height}
          width="6"
          height={bar.height}
          rx="2"
          fill={color}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 0.8 }}
          transition={{ 
            duration: 0.5, 
            delay: 0.3 + i * 0.15,
            ease: "easeOut"
          }}
          style={{ transformOrigin: 'bottom' }}
        />
      ))}

      {/* Trend line */}
      <motion.path
        d="M11 32 L21 20 L31 26 L41 12"
        stroke="#22D3EE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      />

      {/* Trend dots */}
      {[[11, 32], [21, 20], [31, 26], [41, 12]].map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="4"
          fill="#22D3EE"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2 + i * 0.1, type: "spring" }}
        />
      ))}
    </motion.svg>
  );
}

// Animated Money/Cost Icon
export function AnimatedMoney({ size = 48, color = '#2563EB', className = '' }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      {/* Coin stack */}
      {[0, 6, 12].map((offset, i) => (
        <motion.ellipse
          key={i}
          cx="24"
          cy={32 - offset}
          rx="16"
          ry="6"
          stroke={color}
          strokeWidth="2"
          fill="none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 - i * 0.2 }}
          transition={{ delay: i * 0.2, duration: 0.4 }}
        />
      ))}
      
      {/* Dollar sign */}
      <motion.path
        d="M24 8v4M24 36v4M20 16c0-2.2 1.8-4 4-4s4 1.8 4 4c0 2-1.5 3-4 4-2.5 1-4 2-4 4 0 2.2 1.8 4 4 4s4-1.8 4-4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Floating coins */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={`float-${i}`}
          cx={12 + i * 12}
          cy={10}
          r="4"
          fill={color}
          initial={{ y: 0, opacity: 0 }}
          animate={{ 
            y: [0, -10, 0],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 2,
            delay: i * 0.5,
            repeat: Infinity,
            repeatDelay: 1
          }}
        />
      ))}
    </motion.svg>
  );
}

export default {
  AnimatedShield,
  AnimatedGlobe,
  AnimatedDocument,
  AnimatedNetwork,
  AnimatedChart,
  AnimatedMoney
};
