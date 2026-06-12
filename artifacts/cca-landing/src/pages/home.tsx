import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ccaLogo from "@assets/cca-horizontal_1781280688863.png";
import ccaIcon from "@assets/cca-icon_1781280688863.png";
import { Shield, Map, ClipboardCheck, Users, CheckCircle2, FileText, Scale, ArrowRight, ArrowUpRight, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const scrollToForm = () => {
    const el = document.getElementById("schedule");
    if (el) el.scrollIntoView({ behavior: "smooth" });
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

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground overflow-hidden selection:bg-primary/30">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <img src={ccaLogo} alt="Contractor Compliance Authority" className="h-10 w-auto" />
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-6 text-sm uppercase tracking-wider font-semibold text-muted-foreground">
              <a href="#services" className="hover:text-white transition-colors">Services</a>
              <a href="#how-it-works" className="hover:text-white transition-colors">Process</a>
              <a href="#about" className="hover:text-white transition-colors">Platform</a>
            </nav>
            <Button onClick={scrollToForm} className="glossy-pill rounded-full px-6 h-10 font-bold uppercase tracking-wide text-xs" data-testid="button-header-cta">
              Schedule Review
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="relative px-4 pt-32 pb-32 sm:px-6 lg:px-8 overflow-hidden min-h-[90vh] flex items-center">
          <div className="absolute inset-0 bg-dot-pattern opacity-20 mask-image-radial-gradient"></div>
          
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
                      document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="h-14 px-8 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-white flex items-center gap-2"
                  >
                    Explore Platform <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              </motion.div>

              {/* Hero Visual - Intelligence Panel Mockup */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
                  
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <img src={ccaIcon} alt="" className="w-8 h-8 opacity-80" />
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">System Status</div>
                        <div className="text-white font-medium flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                          Monitoring Active
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Coverage</div>
                      <div className="text-primary font-mono font-bold text-lg">50 STATES</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { state: "California", status: "Healthy", type: "Active", color: "bg-primary" },
                      { state: "Texas", status: "Review Required", type: "Expiring soon", color: "bg-yellow-500" },
                      { state: "Florida", status: "At Risk", type: "Missing Docs", color: "bg-destructive" },
                    ].map((item, i) => (
                      <div key={i} className="bg-background/50 rounded-lg p-4 border border-white/5 flex items-center justify-between hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-2 h-2 rounded-full ${item.color} shadow-[0_0_10px_currentColor]`}></div>
                          <div>
                            <div className="text-white font-medium">{item.state}</div>
                            <div className="text-xs text-muted-foreground">{item.type}</div>
                          </div>
                        </div>
                        <div className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-white/80 border border-white/10">
                          {item.status}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Total Licenses</div>
                      <div className="text-3xl font-light text-white">142</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Action Items</div>
                      <div className="text-3xl font-light text-gradient-blue">7</div>
                    </div>
                  </div>
                </div>
                
                {/* Floating decor */}
                <div className="absolute -bottom-6 -right-6 glass-panel rounded-lg p-4 w-48 animate-pulse" style={{ animationDuration: '4s' }}>
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-primary" />
                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Risk Level</div>
                      <div className="text-sm font-bold text-white">Optimized</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose CCA / Services */}
        <section id="services" className="py-32 px-4 sm:px-6 lg:px-8 relative border-t border-white/5">
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Core Capabilities</div>
                <h2 className="text-4xl font-bold text-white mb-4">Unmatched Compliance Infrastructure</h2>
                <p className="text-muted-foreground text-lg">Expert guidance across every phase of licensing and compliance, powered by data and executed by specialists.</p>
              </div>
            </div>
            
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
                <Card key={i} className="glass-panel border-white/5 hover:border-primary/40 transition-all duration-300 group">
                  <CardContent className="p-10">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                      <svc.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{svc.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">{svc.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-32 px-4 sm:px-6 lg:px-8 relative bg-background/50 border-y border-white/5">
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center mb-20">
              <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Execution Protocol</div>
              <h2 className="text-4xl font-bold text-white mb-4">Clear Next Steps Instead of Guesswork</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Goal Assessment", desc: "Define objectives: new license, renewal, expansion, or entity cleanup." },
                { step: "02", title: "Data Review", desc: "AI-assisted scan of licenses, deadlines, and board requirements." },
                { step: "03", title: "Action Roadmap", desc: "Structured steps and priorities to achieve 100% compliance." },
                { step: "04", title: "Execution", desc: "Expert human assistance for applications, renewals, and monitoring." }
              ].map((step, i) => (
                <div key={i} className="relative group">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10">
                    <div className="h-full bg-primary w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
                  </div>
                  <div className="pt-8">
                    <div className="text-5xl font-light text-white/20 mb-6 font-mono tracking-tighter group-hover:text-primary/40 transition-colors">{step.step}</div>
                    <h4 className="text-xl font-bold text-white mb-3">{step.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Benefits & Who We Serve */}
        <section id="about" className="py-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Target Audience</div>
                <h3 className="text-3xl font-bold text-white mb-6">Built for Serious Contractors</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                  We partner with contractors across all major trades—General, Electrical, Plumbing, HVAC, Mechanical, and Specialty—as well as growing firms looking to expand their footprint across state lines.
                </p>
                <div className="space-y-4">
                  {["General Contractors", "Specialty Trades (HVAC, Electrical, Plumbing)", "Firms expanding multi-state", "Compliance Directors & Legal Teams"].map((item, i) => (
                    <div key={i} className="flex items-center p-4 rounded-lg bg-white/5 border border-white/5">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-4 shrink-0" />
                      <span className="text-white font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="glass-panel p-10 rounded-2xl relative overflow-hidden">
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
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="schedule" className="py-32 px-4 sm:px-6 lg:px-8 relative border-t border-white/5">
          <div className="absolute inset-0 bg-primary/5"></div>
          <div className="container mx-auto max-w-4xl relative z-10">
            <div className="text-center mb-16">
              <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Initialize</div>
              <h2 className="text-4xl font-bold text-white mb-6">Schedule Your Compliance Review</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Provide your details below to initialize a comprehensive review of your current licensing and compliance standing.</p>
            </div>

            <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl shadow-black p-2 sm:p-4 border-primary/30">
              <div className="bg-white rounded-xl overflow-hidden relative">
                {/* Ensure iframe renders properly with plenty of height */}
                <iframe
                  title="Schedule My Compliance Review"
                  src="https://zfrmz.com/jk9ZDmCyeTP0DAEGem2r"
                  className="w-full block border-0 h-[1100px] sm:h-[1000px] bg-white"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>
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
