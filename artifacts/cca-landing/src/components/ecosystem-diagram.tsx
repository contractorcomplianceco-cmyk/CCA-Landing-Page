import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef } from "react";

type Node = {
  label: string;
  x: number;
  y: number;
  halfWidth: number;
  dotX: number;
  ringDot: { x: number; y: number };
};

const NODES: Node[] = [
  { label: "Rose OS", x: 600, y: 150, halfWidth: 78, dotX: -56, ringDot: { x: 600, y: 172 } },
  { label: "CCA BuildConnect", x: 912, y: 248, halfWidth: 104, dotX: -82, ringDot: { x: 888, y: 262 } },
  { label: "Tara OS", x: 980, y: 470, halfWidth: 72, dotX: -50, ringDot: { x: 956, y: 470 } },
  { label: "CCA Audit Risk System", x: 820, y: 640, halfWidth: 118, dotX: -96, ringDot: { x: 802, y: 618 } },
  { label: "Company Brain", x: 380, y: 640, halfWidth: 92, dotX: -70, ringDot: { x: 398, y: 618 } },
  { label: "CCA Client Portal", x: 220, y: 470, halfWidth: 100, dotX: -78, ringDot: { x: 244, y: 470 } },
  { label: "Future Learning Hub", x: 288, y: 248, halfWidth: 104, dotX: -82, ringDot: { x: 312, y: 262 } },
];

export function EcosystemDiagram({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.12, delayChildren: 0.15 },
    },
  };

  const nodeVariants: Variants = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: reduceMotion ? 0.3 : 0.6, ease: "easeOut" },
    },
  };

  return (
    <svg
      ref={ref}
      viewBox="0 0 1200 800"
      className={className}
      role="img"
      aria-label="One connected CCA technology ecosystem: a central CCA core linked to Rose OS, CCA BuildConnect, Tara OS, CCA Audit Risk System, Company Brain, CCA Client Portal, and Future Learning Hub."
      fontFamily="Inter, system-ui, sans-serif"
    >
      <defs>
        <radialGradient id="eco-bg" cx="50%" cy="45%" r="70%">
          <stop offset="0" stopColor="#0A2236" />
          <stop offset="0.6" stopColor="#071822" />
          <stop offset="1" stopColor="#050F18" />
        </radialGradient>
        <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#1F6FEB" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#1F6FEB" stopOpacity="0.25" />
          <stop offset="1" stopColor="#1F6FEB" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="chip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0E2A40" />
          <stop offset="1" stopColor="#0A1F2F" />
        </linearGradient>
      </defs>

      <rect width="1200" height="800" rx="24" fill="url(#eco-bg)" />

      {/* orbit rings */}
      <g stroke="#1F6FEB" fill="none">
        <circle cx="600" cy="400" r="150" strokeOpacity="0.18" />
        <circle cx="600" cy="400" r="250" strokeOpacity="0.13" />
        <circle cx="600" cy="400" r="350" strokeOpacity="0.08" />
      </g>

      {/* slow-rotating decorative orbit accent */}
      <motion.circle
        cx="600"
        cy="400"
        r="300"
        fill="none"
        stroke="#1F6FEB"
        strokeOpacity="0.16"
        strokeWidth="1.5"
        strokeDasharray="2 26"
        strokeLinecap="round"
        style={{ transformOrigin: "600px 400px" }}
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      />

      {/* connection lines from core to nodes */}
      <g stroke="#1F6FEB" strokeOpacity="0.28" strokeWidth="1.5">
        {NODES.map((n) => (
          <line key={n.label} x1="600" y1="400" x2={n.x} y2={n.y} />
        ))}
      </g>

      {/* core */}
      <circle cx="600" cy="400" r="120" fill="url(#core-glow)" />
      <circle cx="600" cy="400" r="74" fill="#0A1F2F" stroke="#1F6FEB" strokeOpacity="0.6" strokeWidth="2" />
      <g
        transform="translate(600 372)"
        stroke="#60A5FA"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="-9" y="-9" width="18" height="14" rx="3" />
        <line x1="0" y1="5" x2="0" y2="16" />
        <line x1="0" y1="16" x2="-22" y2="16" />
        <line x1="0" y1="16" x2="22" y2="16" />
        <line x1="-22" y1="16" x2="-22" y2="24" />
        <line x1="22" y1="16" x2="22" y2="24" />
        <rect x="-31" y="24" width="18" height="13" rx="3" />
        <rect x="13" y="24" width="18" height="13" rx="3" />
      </g>
      <text x="600" y="430" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="700" letterSpacing="1">
        CCA
      </text>
      <text x="600" y="450" textAnchor="middle" fill="#8FB6D9" fontSize="10" fontWeight="600" letterSpacing="3">
        ECOSYSTEM
      </text>

      {/* satellite nodes (staggered) */}
      <motion.g variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
        {NODES.map((n) => (
          <motion.g
            key={n.label}
            variants={nodeVariants}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <circle cx={n.ringDot.x} cy={n.ringDot.y} r="3" fill="#60A5FA" />
            <g transform={`translate(${n.x} ${n.y})`}>
              <rect
                x={-n.halfWidth}
                y="-22"
                width={n.halfWidth * 2}
                height="44"
                rx="22"
                fill="url(#chip)"
                stroke="#1F6FEB"
                strokeOpacity="0.35"
              />
              <circle cx={n.dotX} cy="0" r="4" fill="#60A5FA" />
              <text x={n.dotX + 12} y="5" fill="#E8F1FB" fontSize="15" fontWeight="600">
                {n.label}
              </text>
            </g>
          </motion.g>
        ))}
      </motion.g>
    </svg>
  );
}
