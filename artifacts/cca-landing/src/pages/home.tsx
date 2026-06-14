import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CountUp } from "@/components/count-up";
import { RiskGauge } from "@/components/risk-gauge";
import ccaLogo from "@assets/cca-horizontal_1781280688863.png";
import ccaCrest from "@assets/cca-crest_1781280688863.png";
import heroCityHorizon from "@assets/generated_images/hero-city-horizon.png";
import particleField from "@assets/generated_images/bg-particle-field.png";
import { EcosystemDiagram } from "@/components/ecosystem-diagram";
import { SiteHeader } from "@/components/site-header";
import { HeroPanel } from "@/components/hero-panel";
import { Shield, ShieldCheck, Map, ClipboardCheck, Users, CheckCircle2, FileText, Scale, ArrowRight, ArrowUpRight, Activity, X, Award } from "lucide-react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";
import { getZohoFormSrc } from "@/lib/zoho";

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? { opacity: 0, y: 0 } : { opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : reduceMotion ? { opacity: 0, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: reduceMotion ? 0.3 : 0.6, ease: "easeOut", delay: reduceMotion ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}

function ScoreBar({ label, value, delay = 0 }: { label: string; value: number; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const color = value >= 80 ? "bg-primary" : value >= 65 ? "bg-yellow-500" : "bg-destructive";
  return (
    <div ref={ref}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-white">{label}</span>
        <span className="text-sm font-mono font-bold text-muted-foreground">{value}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1.1, ease: "easeOut", delay }}
        />
      </div>
    </div>
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const heroParallaxY = useTransform(scrollY, [0, 600], [0, -80]);

  const scrollToForm = () => {
    const el = document.getElementById("schedule");
    if (el) el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  const formSrc = useMemo(() => getZohoFormSrc(), []);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground overflow-hidden selection:bg-primary/30">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Layered gradient base */}
        <div className="app-bg absolute inset-0"></div>
        {/* Masked perspective grid */}
        <div className="bg-grid-pattern grid-fade absolute inset-0 opacity-40"></div>
        {/* Animated aurora glows */}
        <div className="animate-aurora-1 absolute -top-40 right-0 h-[700px] w-[700px] translate-x-1/4 rounded-full bg-[#2d7dff]/15 blur-[130px]"></div>
        <div className="animate-aurora-2 absolute -bottom-48 -left-32 h-[600px] w-[600px] rounded-full bg-primary/12 blur-[120px]"></div>
        <div className="animate-aurora-3 absolute top-1/3 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#1F6FEB]/10 blur-[140px]"></div>
        {/* Film grain */}
        <div className="bg-noise absolute inset-0 opacity-[0.035] mix-blend-overlay"></div>
        {/* Edge vignette */}
        <div className="bg-vignette absolute inset-0"></div>
      </div>

      {/* Header */}
      <SiteHeader onScheduleClick={scrollToForm} />

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="relative px-4 pt-32 pb-32 sm:px-6 lg:px-8 overflow-hidden min-h-[90vh] flex items-center">
          {/* Cinematic full-bleed hero background with parallax */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 -top-24 -bottom-24 z-0"
            style={reduceMotion ? undefined : { y: heroParallaxY }}
          >
            <img src={heroCityHorizon} alt="" className="h-full w-full object-cover opacity-40" />
          </motion.div>

          {/* Drifting particle / glow overlay */}
          <motion.img
            src={particleField}
            aria-hidden="true"
            alt=""
            className="absolute -inset-10 z-0 object-cover opacity-[0.15] mix-blend-screen pointer-events-none"
            animate={reduceMotion ? undefined : { x: [0, 20, 0], y: [0, -15, 0] }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Legibility scrim */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/70 via-background/55 to-background pointer-events-none"></div>

          <div className="absolute inset-0 z-0 bg-dot-pattern opacity-20 mask-image-radial-gradient"></div>
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-2xl"
              >
                <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-8">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Compliance Command Center</span>
                </motion.div>
                
                <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                  Powered by AI.<br />
                  <span className="text-gradient-blue">Reviewed by humans.</span>
                </motion.h1>
                
                <motion.p variants={itemVariants} className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
                  Uncover hidden licensing and compliance risk across all 50 states. We provide clear next steps, organized compliance, and risk-managed execution.
                </motion.p>
                
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    onClick={scrollToForm} 
                    className="glossy-pill rounded-full h-14 px-8 text-sm font-bold uppercase tracking-wider flex items-center gap-2"
                    data-testid="button-hero-cta"
                  >
                    Schedule Compliance Review <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="lg"
                    onClick={() => {
                      document.getElementById("services")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
                    }}
                    className="h-14 px-8 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-white flex items-center gap-2"
                  >
                    Explore Platform <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </motion.div>

                {/* Credibility strip */}
                <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/5 pt-6">
                  {[
                    { icon: ShieldCheck, label: "Licensed Specialists" },
                    { icon: Map, label: "50-State Coverage" },
                    { icon: CheckCircle2, label: "98% Approval Rate" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <item.icon className="h-4 w-4 text-primary" />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Hero Visual - Live Intelligence Panel */}
              <HeroPanel />
            </div>
          </div>
        </section>

        {/* Stats Band */}
        <section className="relative border-y border-white/5 bg-background/40 py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Users, value: 10000, suffix: "+", label: "Contractors Helped" },
                { icon: CheckCircle2, value: 98, suffix: "%", label: "Approval Success Rate" },
                { icon: Award, value: 15, suffix: "+", label: "Years of Experience" },
                { icon: Map, value: 50, suffix: "", label: "States Supported" },
              ].map((stat, i) => (
                <Reveal key={i} delay={i * 0.1} className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold text-white">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    {stat.label}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose CCA / Services */}
        <section id="services" className="py-32 px-4 sm:px-6 lg:px-8 relative border-t border-white/5">
          <div className="container mx-auto max-w-6xl relative z-10">
            <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Core Capabilities</div>
                <h2 className="text-4xl font-bold text-white mb-4">Unmatched Compliance Infrastructure</h2>
                <p className="text-muted-foreground text-lg">Expert guidance across every phase of licensing and compliance, powered by data and executed by specialists.</p>
              </div>
            </Reveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: ClipboardCheck,
                  title: "Licensing & Renewals",
                  desc: "Application prep, document review, and state board follow-up so your license is always active."
                },
                {
                  icon: Shield,
                  title: "Compliance Risk Audit",
                  desc: "Structured review of licenses, entity, qualifiers, and documentation to prevent delays or fines."
                },
                {
                  icon: Map,
                  title: "Multi-State Expansion",
                  desc: "Roadmaps for new states, foreign registration, registered agent setup, and filing guidance."
                },
                {
                  icon: Users,
                  title: "Qualifier Support",
                  desc: "Placement, changes, and documentation for all qualifying parties across state boards."
                }
              ].map((svc, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="h-full">
                    <Card className="glass-panel border-white/5 hover:border-primary/40 transition-all duration-300 group h-full">
                      <CardContent className="p-10">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                          <svc.icon className="h-7 w-7 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">{svc.title}</h3>
                        <p className="text-muted-foreground leading-relaxed text-lg">{svc.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* The CCA Difference */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 relative border-t border-white/5">
          <div className="container mx-auto max-w-6xl relative z-10">
            <Reveal className="text-center mb-16">
              <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Why It Matters</div>
              <h2 className="text-4xl font-bold text-white mb-4">The CCA Difference</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">We go beyond license processing. We build <span className="text-gradient-blue font-semibold">compliance confidence</span>.</p>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
              {/* VS badge */}
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 h-14 w-14 items-center justify-center rounded-full bg-background border border-primary/40 text-sm font-bold text-white shadow-lg shadow-black/40">
                VS
              </div>

              {/* Normal company */}
              <Reveal>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-8">
                  <div className="mb-8 text-sm font-bold uppercase tracking-widest text-muted-foreground">A Normal License Processing Company</div>
                  <ul className="space-y-5">
                    {[
                      "Fills out forms and submits applications.",
                      "Sends documents to the board.",
                      "Tracks the status of the application.",
                      "Waits for board approval.",
                      "Transaction-focused and reactive.",
                      "Helps with the license — and that's where it ends.",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10">
                          <X className="h-3 w-3 text-muted-foreground" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* CCA */}
              <Reveal delay={0.15}>
                <div className="h-full rounded-2xl glass-panel border-primary/30 p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"></div>
                  <div className="mb-8 text-sm font-bold uppercase tracking-widest text-gradient-blue">Contractor Compliance Authority</div>
                  <ul className="space-y-5">
                    {[
                      { t: "Strategic Compliance Planning", d: "We build a plan that supports long-term success." },
                      { t: "Document Readiness & Gap Review", d: "We identify what's missing and organize it the right way." },
                      { t: "Ongoing Compliance Support", d: "We help you stay compliant after approval." },
                      { t: "Risk Management & Operational Support", d: "We reduce risk and strengthen operations." },
                      { t: "Partner Approach", d: "We become an extension of your team." },
                      { t: "Focused On Your Future", d: "We help you build a scalable, compliant business." },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 border border-primary/30">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                        </span>
                        <span>
                          <span className="block font-semibold text-white">{item.t}</span>
                          <span className="text-sm text-muted-foreground">{item.d}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* One connected technology ecosystem */}
            <Reveal className="mt-24 text-center">
              <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Built On One Platform</div>
              <h3 className="text-3xl font-bold text-white mb-4">One Connected CCA Technology Ecosystem</h3>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">Every part of your compliance journey runs on a single, integrated system — from intake to audit readiness.</p>
              <EcosystemDiagram className="w-full max-w-4xl mx-auto h-auto" />
            </Reveal>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-32 px-4 sm:px-6 lg:px-8 relative bg-background/50 border-y border-white/5">
          <div className="container mx-auto max-w-6xl relative z-10">
            <Reveal className="text-center mb-20">
              <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Execution Protocol</div>
              <h2 className="text-4xl font-bold text-white mb-4">Clear Next Steps Instead of Guesswork</h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Goal Assessment", desc: "Define objectives: new license, renewal, expansion, or entity cleanup." },
                { step: "02", title: "Data Review", desc: "AI-assisted scan of licenses, deadlines, and board requirements." },
                { step: "03", title: "Action Roadmap", desc: "Structured steps and priorities to achieve 100% compliance." },
                { step: "04", title: "Execution", desc: "Expert human assistance for applications, renewals, and monitoring." }
              ].map((step, i) => (
                <Reveal key={i} delay={i * 0.1} className="relative group">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10">
                    <div className="h-full bg-primary w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
                  </div>
                  <div className="pt-8">
                    <div className="text-5xl font-light text-white/20 mb-6 font-mono tracking-tighter group-hover:text-primary/40 transition-colors">{step.step}</div>
                    <h4 className="text-xl font-bold text-white mb-3">{step.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Risk Snapshot */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="container mx-auto max-w-6xl relative z-10">
            <Reveal className="text-center mb-16">
              <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Compliance Intelligence</div>
              <h2 className="text-4xl font-bold text-white mb-4">Know Your Compliance Risk Score</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Our proprietary systems and expert team monitor the details that matter — so you can focus on building your business.</p>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              <Reveal className="lg:col-span-2">
                <div className="glass-panel rounded-2xl p-10 flex flex-col items-center">
                  <RiskGauge
                    score={87}
                    label="Compliance Readiness"
                    caption="A live composite across licensing, filings, insurance, and document health."
                  />
                </div>
              </Reveal>

              <Reveal delay={0.15} className="lg:col-span-3">
                <div className="glass-panel rounded-2xl p-8 sm:p-10">
                  <div className="mb-8 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Category Scorecard</h3>
                    <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Reviewed Areas</span>
                  </div>
                  <div className="space-y-6">
                    {[
                      { label: "Licensing & Registrations", value: 92 },
                      { label: "Entity Filings", value: 74 },
                      { label: "Insurance & Bonding", value: 68 },
                      { label: "Document Readiness", value: 81 },
                      { label: "Operational Gaps", value: 55 },
                    ].map((cat, i) => (
                      <ScoreBar key={i} label={cat.label} value={cat.value} delay={i * 0.08} />
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Core Benefits & Who We Serve */}
        <section id="about" className="py-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.04] hidden lg:block">
            <img src={ccaCrest} alt="" className="w-[520px] h-auto" />
          </div>
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Target Audience</div>
                <h3 className="text-3xl font-bold text-white mb-6">Built for Serious Contractors</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                  We partner with contractors across all major trades—General, Electrical, Plumbing, HVAC, Mechanical, and Specialty—as well as growing firms looking to expand their footprint across state lines.
                </p>
                <div className="space-y-4">
                  {["General Contractors", "Specialty Trades (HVAC, Electrical, Plumbing)", "Firms expanding multi-state", "Compliance Directors & Legal Teams"].map((item, i) => (
                    <div key={i} className="flex items-center p-4 rounded-lg bg-white/5 border border-white/5 hover:border-primary/30 transition-colors">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-4 shrink-0" />
                      <span className="text-white font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
              
              <Reveal delay={0.15} className="glass-panel p-10 rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
                <h3 className="text-2xl font-bold text-white mb-8 relative z-10">The CCA Advantage</h3>
                <div className="space-y-8 relative z-10">
                  <div className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                      <Scale className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-2">Decades of Expertise</h4>
                      <p className="text-muted-foreground leading-relaxed">Navigating the nuances of local, state, and federal compliance requirements with precision.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                      <Map className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-2">50-State Coverage</h4>
                      <p className="text-muted-foreground leading-relaxed">Comprehensive guidance for foreign registration and complex out-of-state board approvals.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-2">Deadline Mastery</h4>
                      <p className="text-muted-foreground leading-relaxed">Proactive tracking of renewals, bonds, and insurance expirations so you never miss a beat.</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="schedule" className="py-32 px-4 sm:px-6 lg:px-8 relative border-t border-white/5">
          <div className="absolute inset-0 bg-primary/5"></div>
          <div className="container mx-auto max-w-4xl relative z-10">
            <Reveal className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                <Activity className="w-3.5 h-3.5" />
                <span>Initialize</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">Schedule Your Compliance Review</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Provide your details below to initialize a comprehensive review of your current licensing and compliance standing.</p>
            </Reveal>

            {/* Public-appropriate trust signals */}
            <Reveal className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-10" delay={0.1}>
              {[
                { icon: Shield, label: "Secure & confidential" },
                { icon: CheckCircle2, label: "No obligation" },
                { icon: Activity, label: "Response within 1 business day" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <item.icon className="w-4 h-4 text-primary" />
                  <span>{item.label}</span>
                </div>
              ))}
            </Reveal>

            {/* Clean form frame — subtle bordered panel, top accent bar, no heavy white box */}
            <Reveal delay={0.15}>
              <div className="glass-panel rounded-2xl border border-primary/20 shadow-2xl shadow-black/40 overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-primary/0 via-primary to-primary/0"></div>
                <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    <FileText className="w-3.5 h-3.5 text-primary" />
                    <span>Compliance Review Request</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-primary">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                    </span>
                    <span className="font-semibold">Secure intake</span>
                  </div>
                </div>
                <iframe
                  title="CCA Short Lead Intake Form"
                  aria-label="CCA Short Lead Intake Form"
                  src={formSrc}
                  className="w-full block border-0 h-[1100px] sm:h-[1000px]"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background py-16 border-t border-white/10 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <img src={ccaLogo} alt="Contractor Compliance Authority" className="h-10 w-auto mb-6 opacity-90" />
              <p className="text-muted-foreground max-w-xs mb-8">
                Powered by AI. Reviewed and executed by humans. The command center for contractor compliance across all 50 states.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Platform</h4>
              <ul className="space-y-4">
                <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors text-sm">Services</a></li>
                <li><a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors text-sm">Execution Protocol</a></li>
                <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors text-sm">The Advantage</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="text-muted-foreground text-sm">813-761-0212</li>
                <li>
                  <a href="mailto:info@contractor-compliance-authority.com" className="text-muted-foreground hover:text-primary transition-colors text-sm block truncate">
                    info@contractor-compliance-authority.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Contractor Compliance Authority. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
