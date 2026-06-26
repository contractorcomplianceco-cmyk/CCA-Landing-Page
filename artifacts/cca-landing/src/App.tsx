import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Shield, ChevronRight, CheckCircle2, Zap, Globe, FileText,
  Users, Building2, TrendingUp, Award, Clock,
  Menu, X, ArrowRight, Star, Phone, Mail,
  AlertTriangle, BarChart3, Layers, Settings, BookOpen,
} from "lucide-react";
import { ZohoIntakeEmbed } from "./components/ZohoIntakeEmbed";

/* ─── Constants ─────────────────────────────────────────────────── */
const TEAL = "#0A8F8F";
const TEAL_HOVER = "#0DA8A8";
const NAVY = "#1A2B4A";
const NAVY_DEEP = "#0F1E35";
/* ─── Helpers ────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GridBg({ className = "" }: { className?: string }) {
  return <div className={`pointer-events-none absolute inset-0 grid-bg ${className}`} />;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest mb-6"
      style={{ borderColor: `${TEAL}44`, color: TEAL, background: `${TEAL}12` }}>
      <Zap className="h-3 w-3" />
      {children}
    </span>
  );
}

/* ─── Nav ────────────────────────────────────────────────────────── */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Platform", href: "#platform" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ background: scrolled ? "rgba(15,30,53,0.97)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? `1px solid rgba(255,255,255,0.07)` : "none" }}
    >
      <div className="mx-auto max-w-7xl px-6 flex h-16 sm:h-20 items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <img src="/assets/cca-logo-transparent.png" alt="Contractor Compliance Authority" className="h-12 sm:h-14 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.label} href={l.href}
              className="text-sm font-medium transition-colors hover:text-white"
              style={{ color: "rgba(255,255,255,0.65)" }}>
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact"
          className="hidden md:inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition-all"
          style={{ background: TEAL, color: "#fff" }}
          onMouseOver={e => (e.currentTarget.style.background = TEAL_HOVER)}
          onMouseOut={e => (e.currentTarget.style.background = TEAL)}>
          Schedule Review
          <ChevronRight className="h-4 w-4" />
        </a>
        <button className="md:hidden p-2 text-white" onClick={() => setOpen(o => !o)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t overflow-hidden" style={{ background: NAVY_DEEP, borderColor: "rgba(255,255,255,0.08)" }}>
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map(l => (
                <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                  className="text-sm font-medium py-1" style={{ color: "rgba(255,255,255,0.8)" }}>
                  {l.label}
                </a>
              ))}
              <a href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold"
                style={{ background: TEAL, color: "#fff" }}
                onClick={() => setOpen(false)}>
                Schedule Review
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─── Hero Zoho Intake ────────────────────────────────────────────── */
function HeroForm() {
  return (
    <div className="rounded-2xl border overflow-hidden shadow-2xl"
      style={{ background: "rgba(15,30,53,0.88)", borderColor: "rgba(10,143,143,0.35)", backdropFilter: "blur(20px)" }}>
      <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(10,143,143,0.08)" }}>
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4" style={{ color: TEAL }} strokeWidth={1.5} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: TEAL }}>Start Your Compliance Review</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#22c55e" }}>
          <span className="relative flex h-2 w-2">
            <span className="pulse-ring absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#22c55e" }} />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "#22c55e" }} />
          </span>
          Secure intake
        </div>
      </div>
      <ZohoIntakeEmbed heightClass="h-[720px] sm:h-[680px]" />
    </div>
  );
}

/* ─── Dashboard Mockup ───────────────────────────────────────────── */
function DashboardMockup() {
  const alerts = [
    { state: "Florida", issue: "GC License — Expires in 14 days", color: "#ef4444", badge: "URGENT" },
    { state: "Texas", issue: "DOT Authority — Review Required", color: "#eab308", badge: "WATCH" },
    { state: "Georgia", issue: "SOS Annual Report — Due Jul 1", color: "#eab308", badge: "WATCH" },
    { state: "California", issue: "OSHA 300A — Filed & Current", color: "#22c55e", badge: "OK" },
    { state: "North Carolina", issue: "Entity Standing — Active", color: "#22c55e", badge: "OK" },
    { state: "New York", issue: "Workers Comp — Renewal Open", color: "#eab308", badge: "WATCH" },
  ];
  const domains = [
    { label: "Licensing", score: 72, color: "#eab308" },
    { label: "DOT / FMCSA", score: 88, color: "#22c55e" },
    { label: "OSHA", score: 91, color: "#22c55e" },
    { label: "DOR / Tax", score: 55, color: "#ef4444" },
    { label: "SOS / Entity", score: 67, color: "#eab308" },
    { label: "Gov't Contracting", score: 82, color: "#22c55e" },
  ];
  return (
    <div className="relative w-full">
      {/* Glow halo */}
      <div className="absolute -inset-4 rounded-3xl opacity-25 blur-2xl pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${TEAL} 0%, transparent 70%)` }} />
      <div className="relative rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "rgba(10,18,36,0.97)", border: `1px solid ${TEAL}55` }}>
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b"
          style={{ background: "rgba(10,143,143,0.12)", borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="flex gap-1.5">
            {["#ef4444","#eab308","#22c55e"].map(c => <div key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />)}
          </div>
          <span className="ml-2 text-xs font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>CCA ComplianceConnect™</span>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#22c55e" }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "#22c55e" }} />
            </span>
            <span className="text-xs font-semibold" style={{ color: "#22c55e" }}>Live Monitoring</span>
          </div>
        </div>
        {/* KPI bar */}
        <div className="grid grid-cols-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          {[
            { label: "Overall Score", value: "74", sub: "/ 100", color: "#eab308" },
            { label: "Active Alerts", value: "3", sub: "need action", color: "#ef4444" },
            { label: "States Monitored", value: "12", sub: "jurisdictions", color: TEAL },
          ].map(k => (
            <div key={k.label} className="px-4 py-3.5 border-r last:border-r-0 text-center" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-2xl font-black" style={{ color: k.color }}>{k.value}</span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{k.sub}</span>
              </div>
              <div className="text-xs mt-0.5 font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>{k.label}</div>
            </div>
          ))}
        </div>
        {/* Main body */}
        <div className="grid grid-cols-5">
          {/* Domain scores */}
          <div className="col-span-2 border-r p-4 space-y-2.5" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>Risk by Domain</div>
            {domains.map(d => (
              <div key={d.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{d.label}</span>
                  <span className="text-xs font-bold" style={{ color: d.color }}>{d.score}</span>
                </div>
                <div className="h-1.5 w-full rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                  <div className="h-full rounded-full" style={{ width: `${d.score}%`, background: d.color }} />
                </div>
              </div>
            ))}
          </div>
          {/* Alert feed */}
          <div className="col-span-3 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>Monitoring Feed</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: `${TEAL}20`, color: TEAL }}>6 states</span>
            </div>
            <div className="space-y-1.5">
              {alerts.map(a => (
                <div key={a.state} className="flex items-start gap-2.5 rounded-lg px-3 py-2"
                  style={{ background: `${a.color}0C`, border: `1px solid ${a.color}20` }}>
                  <div className="mt-1 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: a.color }} />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-white">{a.state}</div>
                    <div className="text-xs truncate" style={{ color: "rgba(255,255,255,0.5)" }}>{a.issue}</div>
                  </div>
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded shrink-0" style={{ background: `${a.color}20`, color: a.color }}>{a.badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Action footer */}
        <div className="px-4 py-3 border-t flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(10,143,143,0.07)" }}>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Powered by Rose OS · Updated just now</span>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold" style={{ color: TEAL }}>Full-Spectrum · All 50 States →</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-16" style={{ background: NAVY_DEEP }}>
      {/* Full-bleed contractor photo background */}
      <div className="absolute inset-0 pointer-events-none">
        <img src="/assets/hero-contractor.jpg" alt="" className="h-full w-full object-cover object-center" style={{ opacity: 0.22 }} />
        {/* Heavy navy overlay on left for copy legibility, lighter on right to let photo breathe */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${NAVY_DEEP} 0%, rgba(15,30,53,0.6) 35%, rgba(15,30,53,0.25) 60%, rgba(15,30,53,0.55) 100%)` }} />
        {/* Top + bottom vignette */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${NAVY_DEEP} 0%, transparent 15%, transparent 85%, ${NAVY_DEEP} 100%)` }} />
      </div>
      {/* Right-side teal glow — frames the dashboard card */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-[0.08]"
        style={{ background: `radial-gradient(ellipse at 80% 50%, ${TEAL} 0%, transparent 65%)` }} />
      <GridBg />

      <div className="relative mx-auto max-w-7xl px-6 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left — copy + form */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Pill>Full-Spectrum Compliance · All 50 States</Pill>
              <h1 className="text-5xl sm:text-6xl font-extrabold leading-[1.08] tracking-tight text-white mb-6">
                Powered by AI.<br />
                <span style={{ color: TEAL }}>Reviewed by Humans.</span>
              </h1>
              <p className="text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.72)" }}>
                Uncover hidden compliance risk across all 50 states — licensing, DOT, OSHA, DOR, SOS, and government contracting. Clear next steps. Expert execution. Zero guesswork.
              </p>
              <div className="grid grid-cols-4 gap-3 mb-8">
                {[
                  { value: "10,000+", label: "Contractors" },
                  { value: "98%", label: "Success Rate" },
                  { value: "15+", label: "Years" },
                  { value: "50", label: "States" },
                ].map(s => (
                  <div key={s.label} className="text-center rounded-xl py-3 px-1"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="text-lg font-extrabold text-white">{s.value}</div>
                    <div className="text-xs mt-0.5 font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
              <HeroForm />
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-5 flex items-center gap-4">
              <a href="#ebook"
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                style={{ color: TEAL }}
                onMouseOver={e => (e.currentTarget.style.color = TEAL_HOVER)}
                onMouseOut={e => (e.currentTarget.style.color = TEAL)}>
                <BookOpen className="h-3.5 w-3.5" />
                Free Compliance Risk Guide
              </a>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
              <a href="#services"
                className="text-sm font-medium transition-colors"
                style={{ color: "rgba(255,255,255,0.45)" }}
                onMouseOver={e => (e.currentTarget.style.color = "#fff")}
                onMouseOut={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}>
                Explore services ↓
              </a>
            </motion.div>
          </div>

          {/* Right — dashboard mockup, vertically centered */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.25 }}
            className="flex flex-col justify-center"
          >
            <DashboardMockup />
            <p className="mt-3 text-center text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
              CCA ComplianceConnect™ — live compliance intelligence portal
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── E-book Strip ───────────────────────────────────────────────── */
function EbookStrip() {
  return (
    <section id="ebook" className="py-14 border-y" style={{ background: `${TEAL}0E`, borderColor: `${TEAL}25` }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-start gap-5 max-w-xl">
            <div className="shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ background: `${TEAL}22`, border: `1px solid ${TEAL}44` }}>
              <BookOpen className="h-7 w-7" style={{ color: TEAL }} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: TEAL }}>Free Resource</p>
              <h3 className="text-xl font-bold text-white mb-1">Contractor Compliance Risk Guide</h3>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                The essential playbook for contractors — covering licensing, DOT, OSHA, DOR, SOS, and government contracting risk across all 50 states.
              </p>
            </div>
          </div>
          <div className="w-full md:w-auto md:min-w-[360px]">
            <a href="#contact"
              className="inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-bold transition-all"
              style={{ background: TEAL, color: "#fff" }}
              onMouseOver={e => (e.currentTarget.style.background = TEAL_HOVER)}
              onMouseOut={e => (e.currentTarget.style.background = TEAL)}>
              Get the Guide
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-2 text-center md:text-left text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              Request your copy via our secure intake form below.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Services ───────────────────────────────────────────────────── */
function Services() {
  const services = [
    {
      icon: Shield,
      title: "Compliance Risk Audit",
      desc: "A structured full-spectrum review of your licensing, entity standing, DOT authority, OSHA records, and tax compliance — with a risk score and clear action plan.",
    },
    {
      icon: Globe,
      title: "Multi-State Operations",
      desc: "Roadmaps for entering new states with confidence: foreign registration, registered agent setup, license reciprocity analysis, and nexus management.",
    },
    {
      icon: TrendingUp,
      title: "Continuous Monitoring",
      desc: "Real-time tracking of license expirations, SOS standing, DOT authority, OSHA recordkeeping, and DOR status — across every state you operate in.",
    },
    {
      icon: FileText,
      title: "Government Contracting",
      desc: "SAM.gov registration, prevailing wage compliance, SBA program eligibility, and MBE/WBE/VOBE certification support to help you win and keep federal work.",
    },
    {
      icon: Building2,
      title: "Entity & SOS Compliance",
      desc: "Annual report filing, registered agent management, good-standing certificates, and administrative dissolution prevention across all active states.",
    },
    {
      icon: Layers,
      title: "ISNetworld & Avetta",
      desc: "TRIR/DART rate management, prequalification grade maintenance, COI tracking, and documentation audits to protect your access to GC bid lists.",
    },
  ];

  return (
    <section id="services" className="py-24" style={{ background: NAVY_DEEP }}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center mb-16">
          <Pill>Core Capabilities</Pill>
          <h2 className="text-4xl font-extrabold text-white mb-4">Full-Spectrum Compliance Infrastructure</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
            Expert guidance across every compliance domain — powered by AI intelligence, executed by specialists.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07}>
              <div className="group h-full rounded-2xl p-7 transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseOver={e => (e.currentTarget.style.borderColor = `${TEAL}55`)}
                onMouseOut={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: `${TEAL}18`, border: `1px solid ${TEAL}33` }}>
                  <s.icon className="h-6 w-6" style={{ color: TEAL }} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.58)" }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Product Cards ──────────────────────────────────────────────── */
function Products() {
  const products = [
    {
      icon: Building2,
      name: "CCA BuildConnect™",
      tagline: "GC Verification Network",
      desc: "Connects general contractors with pre-verified, compliance-ready subcontractors. Real-time license, insurance, and standing checks before boots hit the ground.",
      href: "https://www.contractor-compliance-authority.com/buildconnect",
      badge: "For GCs & Primes",
      badgeColor: "#6366f1",
    },
    {
      icon: Users,
      name: "ContractorConnect™",
      tagline: "Contractor Intelligence Portal",
      desc: "Your personal compliance dashboard — track licenses, monitor deadlines, manage multi-state filings, and stay ahead of renewals across every jurisdiction you operate in.",
      href: "https://www.contractor-compliance-authority.com/contractorconnect",
      badge: "For Contractors",
      badgeColor: TEAL,
      featured: true,
    },
    {
      icon: Shield,
      name: "CCA ComplianceConnect™",
      tagline: "Client Command Center",
      desc: "The full-service client portal where CCA manages your compliance posture — tasks, documents, deadlines, and action items all organized in one place.",
      href: "https://intro.ccacontact.com",
      badge: "Managed Service",
      badgeColor: "#22c55e",
    },
  ];

  return (
    <section className="py-24" style={{ background: NAVY }}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center mb-16">
          <Pill>The CCA Platform</Pill>
          <h2 className="text-4xl font-extrabold text-white mb-4">Three Products. One Compliance Ecosystem.</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
            Whether you need a self-service portal, a managed compliance team, or a GC verification network — CCA has the product built for your role.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <div className="relative h-full flex flex-col rounded-2xl p-7 transition-all hover:-translate-y-1 hover:shadow-2xl"
                style={{
                  background: p.featured ? `linear-gradient(135deg, ${TEAL}18 0%, rgba(255,255,255,0.03) 100%)` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${p.featured ? `${TEAL}55` : "rgba(255,255,255,0.08)"}`,
                }}
                onMouseOver={e => (e.currentTarget.style.borderColor = `${p.featured ? TEAL : TEAL}88`)}
                onMouseOut={e => (e.currentTarget.style.borderColor = p.featured ? `${TEAL}55` : "rgba(255,255,255,0.08)")}>
                {p.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: TEAL, color: "#fff" }}>Most Popular</span>
                  </div>
                )}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: `${p.badgeColor}18`, border: `1px solid ${p.badgeColor}33` }}>
                    <p.icon className="h-6 w-6" strokeWidth={1.5} style={{ color: p.badgeColor }} />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: `${p.badgeColor}18`, color: p.badgeColor, border: `1px solid ${p.badgeColor}33` }}>
                    {p.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{p.name}</h3>
                <p className="text-xs font-semibold mb-4" style={{ color: p.badgeColor }}>{p.tagline}</p>
                <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: "rgba(255,255,255,0.58)" }}>{p.desc}</p>
                <a href={p.href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold transition-all border"
                  style={{ borderColor: `${p.badgeColor}44`, color: p.badgeColor, background: `${p.badgeColor}0D` }}
                  onMouseOver={e => { e.currentTarget.style.background = `${p.badgeColor}22`; }}
                  onMouseOut={e => { e.currentTarget.style.background = `${p.badgeColor}0D`; }}>
                  Learn More <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CCA Difference ─────────────────────────────────────────────── */
function Difference() {
  const rows = [
    {
      them: "Fills out forms and submits applications.",
      us: "Strategic Compliance Planning — We build a full-spectrum plan that protects your business and supports long-term growth.",
    },
    {
      them: "Sends documents and waits for the board.",
      us: "Document Readiness & Gap Review — We identify what's missing, organize it correctly, and resolve it before it becomes a problem.",
    },
    {
      them: "Tracks application status and that's it.",
      us: "Ongoing Compliance Monitoring — We watch your licensing, DOT, OSHA, DOR, and SOS standing continuously — not just at renewal.",
    },
    {
      them: "Transaction-focused and reactive.",
      us: "Risk Management & Execution — We reduce exposure across every compliance domain and execute on your behalf.",
    },
    {
      them: "Helps with the license — and stops there.",
      us: "Full-Spectrum Partner — From licensing to government contracting, ISNetworld, and multi-state expansion, we cover it all.",
    },
  ];
  return (
    <section className="py-24" style={{ background: NAVY_DEEP }}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center mb-16">
          <Pill>Why It Matters</Pill>
          <h2 className="text-4xl font-extrabold text-white mb-4">The CCA Difference</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
            We go beyond paperwork. We build <strong className="text-white">compliance confidence</strong> across your entire operation.
          </p>
        </Reveal>

        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          {/* Header */}
          <div className="grid grid-cols-2 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            <div className="py-4 px-6 text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.03)" }}>
              A Generic Compliance Service
            </div>
            <div className="py-4 px-6 text-xs font-bold uppercase tracking-widest" style={{ color: TEAL, background: `${TEAL}0D`, borderLeft: `1px solid rgba(255,255,255,0.1)` }}>
              Contractor Compliance Authority
            </div>
          </div>
          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-2 border-b last:border-b-0" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              <div className="py-5 px-6 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", background: "rgba(255,255,255,0.02)" }}>
                <AlertTriangle className="inline h-3.5 w-3.5 mr-2 mb-0.5 opacity-50" strokeWidth={1.5} />
                {r.them}
              </div>
              <div className="py-5 px-6 text-sm leading-relaxed font-medium text-white border-l" style={{ background: `${TEAL}08`, borderColor: "rgba(255,255,255,0.07)" }}>
                <CheckCircle2 className="inline h-3.5 w-3.5 mr-2 mb-0.5" style={{ color: TEAL }} strokeWidth={1.5} />
                {r.us}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Platform Ecosystem ─────────────────────────────────────────── */
function Platform() {
  const nodes = [
    { label: "Rose OS", desc: "AI Knowledge Engine", icon: Zap },
    { label: "CCA BuildConnect™", desc: "GC Verification Network", icon: Building2 },
    { label: "ContractorConnect™", desc: "Contractor Portal", icon: Users },
    { label: "Compliance Risk System", desc: "Audit & Risk Scoring", icon: BarChart3 },
    { label: "ComplianceConnect™", desc: "Client Command Center", icon: Shield },
    { label: "Research Hub", desc: "Intelligence & Briefings", icon: Star },
  ];

  return (
    <section id="platform" className="py-24" style={{ background: NAVY }}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center mb-16">
          <Pill>Built on One Platform</Pill>
          <h2 className="text-4xl font-extrabold text-white mb-4">One Connected CCA Technology Ecosystem</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
            Every part of your compliance journey runs on a single, integrated system — from intake to audit readiness to verification.
          </p>
        </Reveal>

        {/* Hub + spokes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center max-w-5xl mx-auto">
          {/* Left column */}
          <div className="space-y-4">
            {nodes.slice(0, 3).map((n, i) => (
              <Reveal key={n.label} delay={i * 0.08}>
                <EcosystemNode node={n} side="left" />
              </Reveal>
            ))}
          </div>

          {/* Center hub */}
          <Reveal delay={0.1} className="flex justify-center">
            <div className="relative flex flex-col items-center justify-center">
              <div className="absolute h-64 w-64 rounded-full opacity-20"
                style={{ background: `radial-gradient(circle, ${TEAL} 0%, transparent 70%)` }} />
              <div className="relative h-48 w-48 rounded-full border-2 flex flex-col items-center justify-center text-center"
                style={{ background: "rgba(10,143,143,0.12)", borderColor: TEAL }}>
                <img src="/assets/cca-crest_1781280688863-D6B9WBGm.png" alt="CCA" className="h-16 w-16 mb-2 object-contain" />
                <div className="text-sm font-bold text-white">CCA Core</div>
                <div className="text-xs mt-1" style={{ color: TEAL }}>Powered by AI</div>
              </div>
              {/* Connector lines */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 192 192" fill="none">
                  <circle cx="96" cy="96" r="90" stroke={`${TEAL}22`} strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="96" cy="96" r="70" stroke={`${TEAL}15`} strokeWidth="1" />
                </svg>
              </div>
            </div>
          </Reveal>

          {/* Right column */}
          <div className="space-y-4">
            {nodes.slice(3).map((n, i) => (
              <Reveal key={n.label} delay={(i + 3) * 0.08}>
                <EcosystemNode node={n} side="right" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EcosystemNode({ node, side }: { node: { label: string; desc: string; icon: React.ElementType }; side: "left" | "right" }) {
  return (
    <div className={`flex items-center gap-3 rounded-xl p-4 border transition-all hover:-translate-y-0.5 ${side === "right" ? "flex-row-reverse text-right" : ""}`}
      style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
      onMouseOver={e => (e.currentTarget.style.borderColor = `${TEAL}55`)}
      onMouseOut={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}>
      <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-lg"
        style={{ background: `${TEAL}18`, border: `1px solid ${TEAL}33` }}>
        <node.icon className="h-4 w-4" style={{ color: TEAL }} strokeWidth={1.5} />
      </div>
      <div>
        <div className="text-sm font-bold text-white">{node.label}</div>
        <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{node.desc}</div>
      </div>
    </div>
  );
}

/* ─── Process ────────────────────────────────────────────────────── */
function Process() {
  const steps = [
    { n: "01", title: "Goal Assessment", desc: "Define your compliance objectives — whether it's a new license, multi-state expansion, entity cleanup, DOT authority, or full-spectrum risk reduction." },
    { n: "02", title: "AI-Assisted Discovery", desc: "Rose OS scans your licenses, entity standing, DOT records, OSHA history, and tax status across every state you operate in to surface hidden exposure." },
    { n: "03", title: "Action Roadmap", desc: "You receive a structured, prioritized compliance roadmap — specific steps, owners, deadlines, and risk scores — not a generic checklist." },
    { n: "04", title: "Expert Execution", desc: "Our compliance specialists handle applications, renewals, filings, and monitoring on your behalf through the CCA ComplianceConnect™ portal." },
  ];
  return (
    <section id="process" className="py-24" style={{ background: NAVY_DEEP }}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center mb-16">
          <Pill>Execution Protocol</Pill>
          <h2 className="text-4xl font-extrabold text-white mb-4">Clear Next Steps Instead of Guesswork</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
            From first audit to ongoing monitoring — a structured process that keeps you ahead of every deadline.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="relative h-full rounded-2xl p-7 border transition-all hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="text-5xl font-black mb-5 leading-none" style={{ color: `${TEAL}30` }}>{s.n}</div>
                <h3 className="text-base font-bold text-white mb-3">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{s.desc}</p>
                {i < 3 && (
                  <ArrowRight className="absolute -right-3 top-1/2 -translate-y-1/2 h-5 w-5 hidden lg:block"
                    style={{ color: `${TEAL}60` }} strokeWidth={1.5} />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Risk Score ─────────────────────────────────────────────────── */
function RiskScore() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const categories = [
    { label: "Licensing & Registrations", score: 92 },
    { label: "Entity & SOS Filings", score: 74 },
    { label: "Insurance & Bonding", score: 68 },
    { label: "OSHA Recordkeeping", score: 81 },
    { label: "DOT & Operating Authority", score: 77 },
    { label: "Tax & DOR Compliance", score: 55 },
  ];
  const overallScore = 79;

  return (
    <section ref={ref} className="py-24" style={{ background: NAVY }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <Pill>Compliance Intelligence</Pill>
            <h2 className="text-4xl font-extrabold text-white mb-6">Know Your Compliance Risk Score</h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
              The CCA Compliance Risk Audit™ generates a proprietary score across every domain we monitor — giving you a precise picture of where you stand and what needs to change.
            </p>
            <div className="space-y-2">
              {[
                "Full-spectrum audit across 6+ compliance domains",
                "State-specific risk mapping across all active jurisdictions",
                "Prioritized action plan with assigned severity levels",
                "Ongoing score monitoring through ComplianceConnect™",
              ].map(item => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0" style={{ color: TEAL }} strokeWidth={1.5} />
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.72)" }}>{item}</span>
                </div>
              ))}
            </div>
            <a href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-bold transition-all"
              style={{ background: TEAL, color: "#fff" }}
              onMouseOver={e => (e.currentTarget.style.background = TEAL_HOVER)}
              onMouseOut={e => (e.currentTarget.style.background = TEAL)}>
              Request a Compliance Risk Audit™
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>

          {/* Score card */}
          <Reveal delay={0.15}>
            <div className="rounded-2xl border p-8" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.1)" }}>
              <div className="flex items-center gap-6 mb-8">
                <div className="relative h-24 w-24 shrink-0">
                  <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke={TEAL} strokeWidth="8"
                      strokeDasharray={`${inView ? overallScore * 2.64 : 0} 264`}
                      strokeLinecap="round"
                      style={{ transition: "stroke-dasharray 1.5s cubic-bezier(.4,0,.2,1)" }} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-white">{overallScore}</span>
                    <span className="text-xs font-semibold" style={{ color: TEAL }}>/ 100</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Overall Score</div>
                  <div className="text-2xl font-extrabold text-white">Compliance Readiness</div>
                  <div className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>Based on your current posture</div>
                </div>
              </div>

              <div className="space-y-4">
                {categories.map((c) => {
                  const color = c.score >= 80 ? "#22c55e" : c.score >= 65 ? "#eab308" : "#ef4444";
                  return (
                    <div key={c.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>{c.label}</span>
                        <span className="text-xs font-bold" style={{ color }}>{c.score}</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                        <div className="h-full rounded-full score-bar-fill"
                          style={{ width: inView ? `${c.score}%` : "0%", background: color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Audience ───────────────────────────────────────────────────── */
function Audience() {
  const items = [
    { icon: Building2, label: "General Contractors", desc: "Managing multi-trade, multi-state operations across federal and private sectors." },
    { icon: Settings, label: "Specialty Trades", desc: "Electrical, plumbing, HVAC, mechanical, and structural contractors needing state-specific licensing." },
    { icon: Globe, label: "Multi-State Operators", desc: "Firms expanding into new markets who need entity registration, license analysis, and DOT authority." },
    { icon: Shield, label: "Compliance Directors", desc: "Legal and compliance teams needing a centralized intelligence platform and audit documentation." },
  ];
  return (
    <section className="py-24" style={{ background: NAVY_DEEP }}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center mb-16">
          <Pill>Built For</Pill>
          <h2 className="text-4xl font-extrabold text-white mb-4">Built for Serious Contractors</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
            We partner with contractors across all major trades and operational scales — from growing regionals to enterprise multi-state operators.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <Reveal key={item.label}>
              <div className="h-full rounded-2xl p-7 border text-center transition-all hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{ background: `${TEAL}18`, border: `1px solid ${TEAL}33` }}>
                  <item.icon className="h-6 w-6" style={{ color: TEAL }} strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-bold text-white mb-3">{item.label}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Advantage ──────────────────────────────────────────────────── */
function Advantage() {
  const items = [
    { icon: Award, title: "Decades of Expertise", desc: "Navigating the nuances of local, state, and federal compliance across licensing, DOT, OSHA, DOR, and government contracting." },
    { icon: Globe, title: "All 50 States", desc: "Comprehensive coverage for foreign registration, complex out-of-state board approvals, and multi-jurisdictional monitoring." },
    { icon: Clock, title: "Deadline Mastery", desc: "Proactive tracking of renewals, annual reports, bonds, insurance expirations, and filing deadlines — so you never miss one." },
  ];
  return (
    <section className="py-24" style={{ background: NAVY }}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4">The CCA Advantage</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ background: `${TEAL}18`, border: `1px solid ${TEAL}33` }}>
                  <item.icon className="h-7 w-7" style={{ color: TEAL }} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.58)" }}>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact Form ───────────────────────────────────────────────── */
function ContactForm() {
  return (
    <section id="contact" className="py-24" style={{ background: NAVY_DEEP }}>
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="text-center mb-12">
          <Pill>Get Started</Pill>
          <h2 className="text-4xl font-extrabold text-white mb-4">Schedule Your Compliance Review</h2>
          <p className="text-lg" style={{ color: "rgba(255,255,255,0.6)" }}>
            Provide your details below and a CCA compliance specialist will follow up within one business day.
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-xs font-medium flex-wrap" style={{ color: "rgba(255,255,255,0.45)" }}>
            {["Secure & confidential", "No obligation", "Response within 1 business day"].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" style={{ color: TEAL }} strokeWidth={1.5} />
                {t}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <div className="rounded-2xl border overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.1)" }}>
            <div className="flex items-center gap-3 px-8 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: `${TEAL}22`, border: `1px solid ${TEAL}44` }}>
                <Shield className="h-4 w-4" style={{ color: TEAL }} strokeWidth={1.5} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: TEAL }}>Compliance Review Request</span>
              <div className="ml-auto flex items-center gap-1.5 text-xs" style={{ color: TEAL }}>
                <span className="relative flex h-2 w-2">
                  <span className="pulse-ring absolute inline-flex h-full w-full rounded-full" style={{ background: TEAL }} />
                  <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: TEAL }} />
                </span>
                Secure intake
              </div>
            </div>
            <ZohoIntakeEmbed heightClass="h-[1100px] sm:h-[1000px]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t" style={{ background: NAVY_DEEP, borderColor: "rgba(255,255,255,0.07)" }}>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <img src="/assets/cca-logo-transparent.png" alt="Contractor Compliance Authority" className="h-14 w-auto mb-4" />
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              Powered by AI. Reviewed and executed by humans. The compliance command center for contractors operating across all 50 states.
            </p>
          </div>
          {/* Platform */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>Platform</p>
            <ul className="space-y-2">
              {[
                { label: "Services", href: "#services" },
                { label: "Execution Protocol", href: "#process" },
                { label: "Technology Ecosystem", href: "#platform" },
                { label: "CCA ComplianceConnect™", href: "https://intro.ccacontact.com" },
              ].map(l => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>Contact</p>
            <ul className="space-y-3">
              <li>
                <a href="tel:813-761-0212" className="flex items-center gap-2 text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }}>
                  <Phone className="h-4 w-4" style={{ color: TEAL }} strokeWidth={1.5} />
                  813-761-0212
                </a>
              </li>
              <li>
                <a href="mailto:info@contractor-compliance-authority.com" className="flex items-center gap-2 text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }}>
                  <Mail className="h-4 w-4" style={{ color: TEAL }} strokeWidth={1.5} />
                  info@contractor-compliance-authority.com
                </a>
              </li>
              <li>
                <a href="https://www.contractor-compliance-authority.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }}>
                  <Globe className="h-4 w-4" style={{ color: TEAL }} strokeWidth={1.5} />
                  contractor-compliance-authority.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            © 2026 Contractor Compliance Authority · Compliance Authority Group, Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="https://www.contractor-compliance-authority.com/privacy-policy" target="_blank" rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.35)" }}>
              Privacy Policy
            </a>
            <a href="https://www.contractor-compliance-authority.com/terms-and-conditions" target="_blank" rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.35)" }}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── App ────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <EbookStrip />
      <Services />
      <Products />
      <Difference />
      <Platform />
      <Process />
      <RiskScore />
      <Audience />
      <Advantage />
      <ContactForm />
      <Footer />
    </>
  );
}
