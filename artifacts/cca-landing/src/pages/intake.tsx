import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Database, UploadCloud, ClipboardList, ArrowLeft, FileText } from "lucide-react";
import { getZohoFormSrc } from "@/lib/zoho";
import ccaLogo from "@assets/cca-horizontal_1781280688863.png";

export default function Intake() {
  const formSrc = useMemo(() => getZohoFormSrc(), []);

  useEffect(() => {
    document.title = "QA / Qualifying Agent Intake | CCA Command Center";
  }, []);

  const notes = [
    {
      icon: ClipboardList,
      title: "Internal QA / qualifying agent intake",
      body: "This form is for the qualifying-agent workflow. Complete it on behalf of the contact you are qualifying.",
    },
    {
      icon: Database,
      title: "Information routes to the CRM",
      body: "Every submission is written to our CRM automatically. Double-check names, emails, and phone numbers before submitting.",
    },
    {
      icon: UploadCloud,
      title: "Test uploads before relying on them",
      body: "Attachments and file uploads must be tested before you depend on this flow in production. Confirm files arrive correctly first.",
    },
  ];

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
          <Link href="/" className="flex items-center gap-3">
            <img src={ccaLogo} alt="Contractor Compliance Authority" className="h-10 w-auto" />
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3 h-3" /> Internal
            </span>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="rounded-full px-5 h-10 font-bold uppercase tracking-wide text-xs text-muted-foreground hover:text-white flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Command Center
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 relative z-10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          {/* Compact header explaining what the form is for */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-5">
              <ClipboardList className="w-3.5 h-3.5" />
              <span>QA / Qualifying Agent Intake</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4 leading-tight">
              Qualifying Agent Intake
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              Use this form to capture and qualify a contact for the compliance review workflow.
              Fill in the fields below on the contact&apos;s behalf, verify the details, and submit.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 items-start">
            {/* Usage notes sidebar */}
            <aside className="lg:sticky lg:top-28 space-y-4">
              {notes.map((note) => (
                <div key={note.title} className="glass-panel rounded-xl border border-white/5 p-5">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <note.icon className="w-4 h-4" />
                    </span>
                    <h2 className="text-sm font-bold text-white leading-tight">{note.title}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{note.body}</p>
                </div>
              ))}
            </aside>

            {/* Form frame */}
            <div className="glass-panel rounded-2xl border border-primary/20 shadow-2xl shadow-black/40 overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-primary/0 via-primary to-primary/0"></div>
              <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <FileText className="w-3.5 h-3.5 text-primary" />
                  <span>Qualifying Agent Form</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-primary">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                  </span>
                  <span className="font-semibold">Routes to CRM</span>
                </div>
              </div>
              <iframe
                title="CCA QA / Qualifying Agent Intake Form"
                aria-label="CCA QA / Qualifying Agent Intake Form"
                src={formSrc}
                className="w-full block border-0 h-[1100px] sm:h-[1000px]"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
