import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Phone, Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import ccaLogo from "@assets/cca-horizontal_1781280688863.png";

export default function ThankYou() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.title = "Thank You | Contractor Compliance Authority";
    // The base GA tag in index.html already fires a page_view on this full-page
    // load (the Zoho success redirect is a top-level navigation), so we do not
    // fire a second page_view here — that would double-count.
    // Only count a conversion when arriving from a genuine form submission,
    // signalled by the success marker added to the Zoho redirect URL.
    const params = new URLSearchParams(window.location.search);
    const fromSubmission = params.has("submitted") || params.get("src") === "zoho-success";
    if (fromSubmission && typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", {
        event_category: "form",
        event_label: "Compliance Review Request",
      });
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground overflow-hidden selection:bg-primary/30">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="app-bg absolute inset-0"></div>
        <div className="bg-grid-pattern grid-fade absolute inset-0 opacity-40"></div>
        <div className="animate-aurora-1 absolute -top-40 right-0 h-[700px] w-[700px] translate-x-1/4 rounded-full bg-[#2d7dff]/15 blur-[130px]"></div>
        <div className="animate-aurora-2 absolute -bottom-48 -left-32 h-[600px] w-[600px] rounded-full bg-primary/12 blur-[120px]"></div>
        <div className="bg-noise absolute inset-0 opacity-[0.035] mix-blend-overlay"></div>
        <div className="bg-vignette absolute inset-0"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <img src={ccaLogo} alt="Contractor Compliance Authority" className="h-10 w-auto" />
          </Link>
          <Link href="/">
            <Button variant="ghost" className="rounded-full px-6 h-10 font-bold uppercase tracking-wide text-xs text-muted-foreground hover:text-white">
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 relative z-10 flex items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.3 : 0.6, ease: "easeOut" }}
          className="container mx-auto max-w-2xl text-center"
        >
          <motion.div
            initial={reduceMotion ? { scale: 1, opacity: 0 } : { scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: reduceMotion ? 0.3 : 0.7, delay: reduceMotion ? 0 : 0.15, ease: "easeOut" }}
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-primary/30 bg-primary/10"
          >
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </motion.div>

          <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Request Received</div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Thank you.<br />
            <span className="text-gradient-blue">We&apos;re on it.</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
            Your compliance review request has been received. A member of our team will reach out
            shortly to confirm details and begin your comprehensive licensing and compliance assessment.
          </p>

          <div className="glass-panel rounded-2xl p-6 sm:p-8 mb-10 text-left">
            <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-5">What happens next</h2>
            <ul className="space-y-4">
              {[
                "We confirm your details and current licensing footprint.",
                "Our specialists run a 50-state compliance and risk review.",
                "You receive clear next steps and a managed execution plan.",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground text-sm leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/">
              <Button
                size="lg"
                className="glossy-pill rounded-full h-14 px-8 text-sm font-bold uppercase tracking-wider flex items-center gap-2 w-full sm:w-auto"
              >
                Return to Home <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="tel:813-761-0212" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" /> 813-761-0212
            </a>
            <a
              href="mailto:info@contractor-compliance-authority.com"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" /> info@contractor-compliance-authority.com
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
