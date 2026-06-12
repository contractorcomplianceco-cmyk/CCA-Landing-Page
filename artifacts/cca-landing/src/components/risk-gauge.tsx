import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { CountUp } from "./count-up";

interface RiskGaugeProps {
  score?: number;
  label?: string;
  caption?: string;
}

export function RiskGauge({
  score = 87,
  label = "Compliance Readiness",
  caption = "Live composite of licensing, filing, and document health.",
}: RiskGaugeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();

  const safeScore = Math.max(0, Math.min(score, 100));
  const r = 80;
  const circ = Math.PI * r;
  const progress = safeScore / 100;
  const needleAngle = safeScore * 1.8 - 90;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <svg
        viewBox="0 0 200 124"
        className="w-full max-w-[320px]"
        role="img"
        aria-label={`${label}: ${safeScore} out of 100`}
      >
        <title>{`${label}: ${safeScore} out of 100`}</title>
        <defs>
          <linearGradient id="gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#1F6FEB" />
          </linearGradient>
        </defs>

        {/* Track */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="14"
          strokeLinecap="round"
        />

        {/* Progress arc */}
        <motion.path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#gauge-grad)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: inView || reduceMotion ? circ * (1 - progress) : circ }}
          transition={{ duration: reduceMotion ? 0 : 1.6, ease: "easeOut" }}
        />

        {/* Needle */}
        <motion.g
          style={{ transformOrigin: "100px 100px" }}
          initial={{ rotate: -90 }}
          animate={{ rotate: inView || reduceMotion ? needleAngle : -90 }}
          transition={{ duration: reduceMotion ? 0 : 1.6, ease: "easeOut" }}
        >
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="34"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </motion.g>
        <circle cx="100" cy="100" r="7" fill="#0A1F2F" stroke="#1F6FEB" strokeWidth="3" />
      </svg>

      <div className="-mt-6 text-center">
        <div className="text-5xl font-bold text-gradient-blue leading-none">
          <CountUp end={score} duration={1.6} />
        </div>
        <div className="mt-2 text-xs font-bold uppercase tracking-widest text-primary">
          {label}
        </div>
        <p className="mt-3 max-w-[260px] text-sm text-muted-foreground">{caption}</p>
      </div>
    </div>
  );
}
