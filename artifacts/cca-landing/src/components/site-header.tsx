import { useState, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu, ArrowRight, ShieldCheck } from "lucide-react";
import ccaLogo from "@assets/cca-horizontal_1781280688863.png";

const NAV_ITEMS = [
  { label: "Services", href: "#services", id: "services" },
  { label: "Process", href: "#how-it-works", id: "how-it-works" },
  { label: "Platform", href: "#about", id: "about" },
] as const;

export function SiteHeader({ onScheduleClick }: { onScheduleClick: () => void }) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    setMobileOpen(false);
  };

  const handleSchedule = () => {
    setMobileOpen(false);
    onScheduleClick();
  };

  return (
    <motion.header
      initial={reduceMotion ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full"
    >
      {/* Top hairline accent — command-center signature line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-background/85 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            : "border-b border-white/5 bg-background/40 backdrop-blur-md"
        }`}
      >
        <div
          className={`container mx-auto flex items-center justify-between px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Brand */}
          <a
            href="/"
            className="group flex items-center gap-2"
            aria-label="Contractor Compliance Authority — home"
            data-testid="link-header-home"
          >
            <img
              src={ccaLogo}
              alt="Contractor Compliance Authority"
              className={`w-auto transition-all duration-300 ${scrolled ? "h-8" : "h-10"}`}
            />
          </a>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  aria-current={isActive ? "true" : undefined}
                  className="relative px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors"
                  data-testid={`link-nav-${item.id}`}
                >
                  <span className={isActive ? "text-white" : "text-muted-foreground hover:text-white"}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-primary to-[#60A5FA]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 border-r border-white/10 pr-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground lg:flex">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <span>Licensed &amp; Compliant</span>
            </div>

            <Button
              onClick={handleSchedule}
              className="glossy-pill group hidden h-10 rounded-full px-5 text-xs font-bold uppercase tracking-wide sm:inline-flex"
              data-testid="button-header-cta"
            >
              Schedule Review
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 md:hidden"
                  aria-label="Open menu"
                  data-testid="button-mobile-menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] border-l border-white/10 bg-background/95 backdrop-blur-xl"
              >
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="flex h-full flex-col">
                  <img
                    src={ccaLogo}
                    alt="Contractor Compliance Authority"
                    className="mb-10 mt-2 h-9 w-auto"
                  />
                  <nav className="flex flex-col gap-1" aria-label="Mobile">
                    {NAV_ITEMS.map((item) => (
                      <a
                        key={item.id}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-white/5 hover:text-white"
                        data-testid={`link-mobile-${item.id}`}
                      >
                        {item.label}
                        <ArrowUpRightIcon />
                      </a>
                    ))}
                  </nav>
                  <div className="mt-auto space-y-4 pb-2">
                    <div className="flex items-center gap-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                      <span>Licensed &amp; Compliant</span>
                    </div>
                    <SheetClose asChild>
                      <Button
                        onClick={handleSchedule}
                        className="glossy-pill h-12 w-full rounded-full text-xs font-bold uppercase tracking-wide"
                        data-testid="button-mobile-cta"
                      >
                        Schedule Review
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-muted-foreground/50"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}
