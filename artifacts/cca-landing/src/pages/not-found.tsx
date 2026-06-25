import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPinOff } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import ccaLogo from "@assets/cca-horizontal_1781280688863.png";

export default function NotFound() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground overflow-hidden selection:bg-primary/30">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="app-bg absolute inset-0"></div>
        <div className="bg-grid-pattern grid-fade absolute inset-0 opacity-40"></div>
        <div className="animate-aurora-1 absolute -top-40 right-0 h-[700px] w-[700px] translate-x-1/4 rounded-full bg-[#2d7dff]/15 blur-[130px]"></div>
        <div className="animate-aurora-2 absolute -bottom-48 -left-32 h-[600px] w-[600px] rounded-full bg-primary/12 blur-[120px]"></div>
        <div className="bg-noise absolute inset-0 opacity-[0.035] mix-blend-overlay"></div>
        <div className="bg-vignette absolute inset-0"></div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <img src={ccaLogo} alt="Contractor Compliance Authority" className="h-10 w-auto" />
          </Link>
        </div>
      </header>

      <main className="flex-1 relative z-10 flex items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.3 : 0.6, ease: "easeOut" }}
          className="container mx-auto max-w-xl text-center"
        >
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
            <MapPinOff className="h-12 w-12 text-primary" />
          </div>

          <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">404</div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Page not found
          </h1>

          <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-md mx-auto">
            The page you requested is not part of the CCA command center. Return home to explore
            compliance services or schedule your review.
          </p>

          <Link href="/">
            <Button
              size="lg"
              className="glossy-pill rounded-full h-14 px-8 text-sm font-bold uppercase tracking-wider inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
