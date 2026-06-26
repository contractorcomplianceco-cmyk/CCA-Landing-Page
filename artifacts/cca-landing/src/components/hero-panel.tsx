import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { CountUp } from "@/components/count-up";
import { Shield } from "lucide-react";
import ccaIcon from "@assets/cca-icon_1781280688863.png";

const ROWS = [
  { state: "California", type: "Active", status: "Healthy", color: "bg-primary" },
  { state: "Texas", type: "Expiring soon", status: "Review Required", color: "bg-yellow-500" },
  { state: "Florida", type: "Missing Docs", status: "At Risk", color: "bg-destructive" },
] as const;

export function HeroPanel() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), {
    stiffness: 150,
    damping: 18,
  });

  const cacheRect = () => {
    if (ref.current) rectRef.current = ref.current.getBoundingClientRect();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduceMotion) return;
    const rect = rectRef.current;
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.95, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2 }}
      className="relative hidden lg:block"
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={ref}
        onMouseEnter={cacheRect}
        onMouseMove={handleMouseMove}
        onMouseLeave={reset}
        style={reduceMotion ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="glass-panel relative overflow-hidden rounded-2xl p-6"
      >
        {/* Sweeping scan line — command-center signature */}
        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-primary/12 to-transparent"
            animate={{ y: ["-30%", "560%"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Top accent rail */}
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

        {/* Header */}
        <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <img src={ccaIcon} alt="" className="h-8 w-8 opacity-80" />
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                System Status
              </div>
              <div className="flex items-center gap-2 font-medium text-white">
                <span className="relative flex h-2 w-2">
                  {!reduceMotion && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  )}
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Monitoring Active
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Coverage
            </div>
            <div className="font-mono text-lg font-bold text-primary">50 STATES</div>
          </div>
        </div>

        {/* State rows */}
        <div className="space-y-4">
          {ROWS.map((item, i) => (
            <motion.div
              key={item.state}
              initial={reduceMotion ? false : { opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.5 + i * 0.12, ease: "easeOut" }}
              className="flex items-center justify-between rounded-lg border border-white/5 bg-background/50 p-4 transition-colors hover:border-primary/30"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`h-2 w-2 rounded-full ${item.color} shadow-[0_0_10px_currentColor]`}
                />
                <div>
                  <div className="font-medium text-white">{item.state}</div>
                  <div className="text-xs text-muted-foreground">{item.type}</div>
                </div>
              </div>
              <div className="rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-xs text-white/80">
                {item.status}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Totals */}
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
          <div>
            <div className="mb-1 text-xs uppercase tracking-widest text-muted-foreground">
              Total Licenses
            </div>
            <div className="text-3xl font-light text-white">
              <CountUp end={142} duration={2.4} />
            </div>
          </div>
          <div>
            <div className="mb-1 text-xs uppercase tracking-widest text-muted-foreground">
              Action Items
            </div>
            <div className="text-3xl font-light text-gradient-blue">
              <CountUp end={7} duration={2.4} />
            </div>
          </div>
        </div>

        {/* Live sync footer */}
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Live · Synced just now
          </span>
          <span className="font-mono">CCA-OS v4.2</span>
        </div>
      </motion.div>

      {/* Floating risk badge */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay: 1 }}
        className="glass-panel absolute -bottom-6 -right-6 w-48 rounded-lg p-4"
      >
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6 text-primary" />
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Risk Level
            </div>
            <div className="text-sm font-bold text-white">Optimized</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
