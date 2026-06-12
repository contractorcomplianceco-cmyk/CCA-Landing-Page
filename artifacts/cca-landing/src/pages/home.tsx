import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useCreateLead } from "@workspace/api-client-react";
import ccaLogo from "@/assets/cca-logo.png";
import { Shield, Map, ClipboardCheck, Users, CheckCircle2, ChevronRight, FileText, Scale } from "lucide-react";
import { motion } from "framer-motion";

const STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  company: z.string().min(1, "Company is required"),
  service: z.string().min(1, "Service is required"),
  state: z.string().min(1, "State is required"),
});

export default function Home() {
  const { toast } = useToast();
  const createLead = useCreateLead();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      state: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createLead.mutate(
      { data: values },
      {
        onSuccess: () => {
          toast({
            title: "Thank you!",
            description: "We will contact you shortly.",
          });
          form.reset();
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Submission Failed",
            description: "Please try again or contact us directly.",
          });
        },
      }
    );
  }

  const scrollToForm = () => {
    const el = document.getElementById("schedule");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#071822]/90 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img src={ccaLogo} alt="CCA Logo" className="h-10 w-auto" />
            <span className="hidden sm:inline-block font-semibold tracking-wide text-white">Contractor Compliance Authority</span>
          </div>
          <Button onClick={scrollToForm} className="bg-primary hover:bg-accent text-white font-medium" data-testid="button-header-cta">
            Schedule Review
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-4 pt-24 pb-32 sm:px-6 lg:px-8 bg-gradient-to-b from-[#071822] to-background">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80')] opacity-5 mix-blend-overlay bg-cover bg-center"></div>
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                Contractor Licensing & Compliance Support You Can Trust
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Get clear next steps, organized compliance, and risk-managed licensing — without the guesswork.
              </p>
              <Button 
                size="lg" 
                onClick={scrollToForm} 
                className="bg-primary hover:bg-accent text-white text-lg h-14 px-8 rounded-md shadow-lg shadow-primary/20 transition-all hover:scale-105"
                data-testid="button-hero-cta"
              >
                Schedule My Compliance Review
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Why Choose CCA */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Why Contractors Choose CCA</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Expert guidance across every phase of licensing and compliance.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <Card key={i} className="bg-card border-white/5 hover:border-primary/50 transition-colors duration-300">
                  <CardContent className="p-8">
                    <svc.icon className="h-12 w-12 text-primary mb-6" />
                    <h3 className="text-xl font-semibold text-white mb-3">{svc.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{svc.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#071822]">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
              <p className="text-primary font-medium text-lg">Clear Next Steps Instead of Guesswork</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Tell Us Your Goal", desc: "New license, renewal, expansion, qualifier update, entity cleanup, or compliance concern." },
                { step: "02", title: "We Review Your File", desc: "We check licenses, deadlines, documents, and boards to identify gaps." },
                { step: "03", title: "You Get a Roadmap", desc: "Structured steps and priorities to achieve full compliance." },
                { step: "04", title: "We Help Execute", desc: "Optional assistance for applications, renewals, monitoring, and filings." }
              ].map((step, i) => (
                <div key={i} className="relative">
                  <div className="text-5xl font-bold text-white/5 mb-4">{step.step}</div>
                  <h4 className="text-lg font-semibold text-white mb-2">{step.title}</h4>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Benefits & Who We Serve */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background border-y border-white/5">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Who We Serve</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We partner with contractors across all major trades—General, Electrical, Plumbing, HVAC, Mechanical, and Specialty—as well as growing firms looking to expand their footprint across state lines.
                </p>
                <ul className="space-y-3">
                  {["General Contractors", "Specialty Trades (HVAC, Electrical, Plumbing)", "Firms expanding multi-state", "Compliance Directors & Legal Teams"].map((item, i) => (
                    <li key={i} className="flex items-center text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-card p-8 rounded-xl border border-white/5">
                <h3 className="text-2xl font-bold text-white mb-6">Proven Credibility</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <Scale className="h-8 w-8 text-primary shrink-0" />
                    <div>
                      <h4 className="text-white font-medium mb-1">Decades of Expertise</h4>
                      <p className="text-sm text-muted-foreground">Navigating the nuances of local, state, and federal compliance requirements.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Map className="h-8 w-8 text-primary shrink-0" />
                    <div>
                      <h4 className="text-white font-medium mb-1">50-State Coverage</h4>
                      <p className="text-sm text-muted-foreground">Comprehensive guidance for foreign registration and out-of-state board approvals.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <FileText className="h-8 w-8 text-primary shrink-0" />
                    <div>
                      <h4 className="text-white font-medium mb-1">Deadline Mastery</h4>
                      <p className="text-sm text-muted-foreground">Proactive tracking of renewals, bonds, and insurance expirations.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="schedule" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-[#071822]">
          <div className="container mx-auto max-w-2xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Schedule My Compliance Review</h2>
              <p className="text-muted-foreground">Fill out the form below and our team will get in touch to discuss your compliance needs.</p>
            </div>

            <Card className="bg-card/50 backdrop-blur border-white/10">
              <CardContent className="p-6 sm:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" className="bg-background/50 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" className="bg-background/50 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Phone Number</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="(555) 123-4567" className="bg-background/50 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Company Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Acme Construction" className="bg-background/50 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Service Needed</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-background/50 border-white/10 text-white focus:ring-primary">
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-[#0A1F2F] border-white/10 text-white">
                                <SelectItem value="License & Renewal Support">License & Renewal Support</SelectItem>
                                <SelectItem value="Compliance Risk Audit">Compliance Risk Audit</SelectItem>
                                <SelectItem value="Multi-State Expansion">Multi-State Expansion</SelectItem>
                                <SelectItem value="Qualifier Support">Qualifier Support</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">State</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-background/50 border-white/10 text-white focus:ring-primary">
                                  <SelectValue placeholder="Select state" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-[#0A1F2F] border-white/10 text-white max-h-60">
                                {STATES.map((state) => (
                                  <SelectItem key={state} value={state}>{state}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-accent text-white h-12 text-lg mt-4" 
                      disabled={createLead.isPending}
                      data-testid="button-submit-lead"
                    >
                      {createLead.isPending ? "Submitting..." : "Submit Request"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#071822] py-12 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <img src={ccaLogo} alt="CCA Logo" className="h-10 w-auto mb-4 opacity-80" />
              <p className="text-sm text-muted-foreground">© 2026 Contractor Compliance Authority</p>
            </div>
            
            <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-2 text-sm text-muted-foreground">
              <p>813-761-0212</p>
              <a href="mailto:info@contractor-compliance-authority.com" className="hover:text-primary transition-colors">info@contractor-compliance-authority.com</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
