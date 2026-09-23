import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Reveal } from "@/components/Reveal";
import { ScrollMorphCerts } from "@/components/ui/scroll-morph-certs";
import { ClientOnly } from "@tanstack/react-router";
import { SparklesCore } from "@/components/ui/sparkles";
import { SpecialText } from "@/components/ui/special-text";
import { DotPattern } from "@/components/ui/dot-pattern";




import aiAssociate from "@/assets/ai_associate.png";
import foundationsAssociate from "@/assets/foundations_associate.png";
import cybersecurity from "@/assets/cybersecurity_fundamental.png";
import dataFundamentals from "@/assets/data_fundamentals.png";
import freecodecamp from "@/assets/freecodecamp.png";

const CV_URL = "/vineet_kumar_cv.pdf";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vineet Kumar — Developer" },
      {
        name: "description",
        content:
          "Vineet Kumar, B.Tech CSE student at LPU Punjab. Full-stack developer building secure, intelligent web apps.",
      },
      { property: "og:title", content: "Vineet Kumar — Developer" },
      {
        property: "og:description",
        content:
          "Full-stack developer building secure, intelligent web apps. Projects, skills and certifications.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "Projects", id: "projects" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Certifications", id: "certifications" },
  { label: "Contact", id: "contact" },
];

const SKILLS = [
  "Python",
  "JavaScript",
  "Java",
  "Node.js",
  "Spring Boot",
  "React.js",
  "Express.js",
  "Flask",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "MySQL",
  "MongoDB",
  "Git",
  "GitHub",
  "Linux",
  "Socket.IO",
  "Streamlit",
  "Gemini API",
  "Hugging Face",
  "Scikit-learn",
  "Plotly",
  "REST API",
];

const PROJECTS = [
  {
    number: "01",
    title: "Blog Platform — Full-Stack Web App",
    date: "Jan 2026 – Feb 2026",
    description:
      "Full-stack Blog Platform with Spring Boot, React.js, and MySQL. Secure JWT authentication, CRUD for posts, comments, and likes, Spring Data JPA, RESTful APIs, and a responsive React.js frontend with dynamic blog feeds.",
    tags: ["Java", "Spring Boot", "React.js", "MySQL", "REST API", "Postman"],
  },
  {
    number: "02",
    title: "CypherTalk — Anonymous Chat App",
    date: "Jun 2025 – Jul 2025",
    description:
      "Secure real-time chat app with AES-GCM end-to-end encryption and room-based architecture. Reduced session hijacking risks by 95% with sub-200ms latency. Features emoji reactions and dark/light themes.",
    tags: ["Node.js", "Socket.IO", "AES-GCM", "Express.js", "JavaScript", "Render"],
    metrics: "95% Risk Reduction · 40% Engagement ↑ · <200ms Latency",
  },
  {
    number: "03",
    title: "AI-Powered Food Waste Tracker",
    date: "Mar 2025 – Apr 2025",
    description:
      "AI-powered web app with image-based freshness analysis, real-time Plotly dashboards, and a dual-mode chatbot (80% AI + 20% human-assisted) using Google Gemini API and Hugging Face Transformers.",
    tags: ["Python", "Flask", "MongoDB", "Gemini API", "Streamlit", "Scikit-learn"],
  },
];

const CERTS = [
  {
    name: "Oracle Cloud Infrastructure AI Foundations Associate",
    meta: "Oracle · Sep 2025",
    image: aiAssociate,
    alt: "Oracle University certificate awarding Vineet Kumar the Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate credential, dated 21 September 2025.",
  },
  {
    name: "Oracle Cloud Infrastructure Foundations Associate",
    meta: "Oracle · Sep 2025",
    image: foundationsAssociate,
    alt: "Oracle University certificate awarding Vineet Kumar the Oracle Cloud Infrastructure 2025 Certified Foundations Associate credential, dated 16 September 2025.",
  },
  {
    name: "Cybersecurity Fundamentals",
    meta: "IBM SkillsBuild · Sep 2025",
    image: cybersecurity,
    alt: "IBM SkillsBuild credential for Cybersecurity Fundamentals issued to Vineet Kumar on 10 September 2025.",
  },
  {
    name: "Data Fundamentals",
    meta: "IBM SkillsBuild · Sep 2025",
    image: dataFundamentals,
    alt: "IBM SkillsBuild credential for Data Fundamentals completed by Vineet Kumar on 23 September 2025.",
  },
  {
    name: "Responsive Web Design",
    meta: "freeCodeCamp · Nov 2023",
    image: freecodecamp,
    alt: "freeCodeCamp Responsive Web Design Developer certification awarded to Vineet Kumar on 8 October 2023.",
  },
];


const INFO = [
  ["Name", "Vineet Kumar"],
  ["Degree", "B.Tech CSE"],
  ["University", "LPU, Punjab"],
  ["CGPA", "6.45"],
  ["Email", "offivineetkumar06@gmail.com"],
  ["Phone", "+91 6396471968"],
  ["Location", "Punjab, India"],
];

const CONTACTS = [
  { label: "Email", value: "offivineetkumar06@gmail.com", href: "mailto:offivineetkumar06@gmail.com" },
  { label: "LinkedIn", value: "linkedin.com/in/VineetKumar8", href: "https://linkedin.com/in/VineetKumar8" },
  { label: "GitHub", value: "github.com/vineet1603", href: "https://github.com/vineet1603" },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-10 text-xs uppercase tracking-[0.35em] text-muted-foreground">{children}</p>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled ? "border-border bg-background/85 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-5">
        <a href="#top" className="font-display text-2xl font-bold tracking-tight">
          VK<span className="text-accent">.</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="-mr-2 shrink-0 px-2 py-2 text-sm uppercase tracking-widest text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="flex max-h-[70vh] flex-col gap-1 overflow-y-auto border-t border-border bg-background/95 px-6 pb-6 pt-4 backdrop-blur-md md:hidden"
        >
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={() => setOpen(false)}
              className="py-3 font-display text-2xl"
            >
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Index() {
  const [active, setActive] = useState<number | null>(null);
  const current = active === null ? null : CERTS[active];


  return (
    <div id="top" className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative isolate mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-center overflow-hidden px-6 py-20 sm:min-h-[88vh] sm:py-24">
        <Reveal>

          <h1 className="font-display text-[clamp(3rem,13vw,11rem)] font-semibold leading-[0.9] tracking-tight [overflow-wrap:anywhere]">
            <SpecialText speed={45}>developer</SpecialText>
            <span className="animate-blink text-accent">.</span>
          </h1>

          <div className="relative mt-2 h-24 w-full max-w-2xl">
            <div className="absolute inset-x-0 top-0 h-px w-3/4 bg-gradient-to-r from-accent/80 to-transparent blur-sm" />
            <div className="absolute inset-x-0 top-0 h-px w-3/4 bg-gradient-to-r from-accent to-transparent" />
            <div className="absolute inset-x-0 top-0 h-[3px] w-1/3 bg-gradient-to-r from-foreground/60 to-transparent blur-sm" />
            <ClientOnly>
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1.1}
                particleDensity={900}
                particleColor="#ffffff"
                className="h-full w-full"
              />
            </ClientOnly>
            <div className="pointer-events-none absolute inset-0 bg-background [mask-image:radial-gradient(360px_110px_at_top,transparent_20%,white)]" />
          </div>

        </Reveal>

        <Reveal delay={120}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg">
            i build secure, intelligent web apps. mostly full-stack, mostly solving real problems.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-5 text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground sm:mt-6 sm:text-xs sm:tracking-[0.3em]">
            B.Tech CSE · LPU Punjab · Open to Opportunities
          </p>
        </Reveal>
        <Reveal delay={280}>
          <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="#projects"
              className="rounded-sm border border-border px-7 py-3.5 text-center text-sm tracking-wide transition-colors hover:border-foreground"
            >
              View Projects
            </a>
            <a
              href={CV_URL}
              download="Vineet_Kumar_CV.pdf"
              className="rounded-sm bg-accent px-7 py-3.5 text-center text-sm tracking-wide text-accent-foreground transition-opacity hover:opacity-90"
            >
              Download CV
            </a>
          </div>
        </Reveal>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="relative isolate mx-auto max-w-6xl overflow-hidden border-t border-border px-6 py-24"
      >
        <DotPattern />
        <SectionLabel>about</SectionLabel>
        <div className="grid gap-16 md:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight">
              Passionate Developer &amp; Problem Solver
            </h2>
            <p className="mt-8 max-w-prose leading-relaxed text-muted-foreground">
              I'm a Computer Science Engineering student at Lovely Professional University, Punjab,
              with a deep interest in building secure and intelligent web applications. From crafting
              end-to-end encrypted chat systems to AI-powered food waste trackers, I love turning
              complex problems into elegant, user-friendly solutions. Selected for Smart India
              Hackathon 2025 Grand Finale — representing my university at the national level.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-sm border border-border bg-card p-8">
              <p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Quick Info
              </p>
              <dl className="divide-y divide-border">
                {INFO.map(([k, v]) => (
                  <div
                    key={k}
                    className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-4 py-3"
                  >
                    <dt className="text-sm text-muted-foreground">{k}</dt>
                    <dd className="truncate text-right text-sm">{v}</dd>
                  </div>
                ))}
                <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 py-3">
                  <dt className="text-sm text-muted-foreground">Status</dt>
                  <dd className="flex items-center justify-end gap-2 text-sm">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-success" />
                    Open to Opportunities
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="relative isolate overflow-hidden border-t border-border py-24">
        <DotPattern />
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel>skills</SectionLabel>
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] tracking-tight">
              what i work with
            </h2>
          </Reveal>
        </div>
        <div className="group relative mt-14 overflow-hidden">
          <div className="flex w-max animate-marquee gap-3 pr-3">
            {[...SKILLS, ...SKILLS].map((s, i) => (
              <span
                key={`${s}-${i}`}
                className="whitespace-nowrap rounded-full border border-border px-5 py-2 text-sm text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        className="relative isolate mx-auto max-w-6xl overflow-hidden border-t border-border px-6 py-24"
      >
        <DotPattern />
        <SectionLabel>projects</SectionLabel>
        <Reveal>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] tracking-tight">
            selected work
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.number} delay={i * 110} as="article">
              <div className="flex h-full flex-col rounded-sm border border-border bg-card p-8 transition-colors hover:border-accent/60">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-4xl text-accent">{p.number}</span>
                  <span className="text-xs text-muted-foreground">{p.date}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl leading-snug">{p.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                {p.metrics && (
                  <p className="mt-5 text-xs uppercase tracking-widest text-accent">{p.metrics}</p>
                )}
                <div className="mt-auto flex flex-wrap gap-2 pt-7">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="relative isolate overflow-hidden border-t border-border">
        <DotPattern />
        <div className="mx-auto max-w-6xl px-6 pt-24">
          <SectionLabel>certifications</SectionLabel>
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] tracking-tight">
              credentials
            </h2>
          </Reveal>
        </div>

        <ScrollMorphCerts items={CERTS} onSelect={(i) => setActive(i)} />

        <div className="mx-auto max-w-6xl px-6 pb-24">
        <ul className="divide-y divide-border border-y border-border">


          {CERTS.map((c, i) => (
            <Reveal key={c.name} delay={i * 70} as="li">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-haspopup="dialog"
                className="group flex w-full flex-col gap-1 py-6 text-left transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:flex-row sm:items-baseline sm:justify-between"
              >
                <span className="text-base leading-snug md:text-lg">{c.name}</span>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {c.meta}
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
        </div>

      </section>


      <Dialog open={active !== null} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent
          onKeyDown={(e) => {
            if (active === null) return;
            if (e.key === "ArrowRight") {
              e.preventDefault();
              setActive((active + 1) % CERTS.length);
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              setActive((active - 1 + CERTS.length) % CERTS.length);
            }
          }}
          className="max-w-3xl border-border bg-background"
        >
          {current && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl leading-snug">
                  {current.name}
                </DialogTitle>
                <DialogDescription>
                  {current.meta} — certificate {(active ?? 0) + 1} of {CERTS.length}. Use the left
                  and right arrow keys to move between certificates.
                </DialogDescription>
              </DialogHeader>
              <img
                src={current.image}
                alt={current.alt}
                className="max-h-[70vh] w-full rounded-sm border border-border bg-white object-contain"
              />
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  aria-label="Previous certificate"
                  onClick={() => setActive(((active ?? 0) - 1 + CERTS.length) % CERTS.length)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-border px-4 text-sm transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  Previous
                </button>
                <button
                  type="button"
                  aria-label="Next certificate"
                  onClick={() => setActive(((active ?? 0) + 1) % CERTS.length)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-border px-4 text-sm transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Next
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>


      {/* ACHIEVEMENT */}
      <section className="relative isolate overflow-hidden border-y border-border bg-card/40">
        <DotPattern />
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <Reveal>
            <p className="font-display text-[clamp(1.5rem,3.6vw,2.75rem)] leading-[1.25]">
              “Selected for Smart India Hackathon (SIH) 2025 Grand Finale — represented Lovely
              Professional University at the national level.”
            </p>
            <p className="mt-8 text-xs uppercase tracking-[0.35em] text-accent">Oct 2025</p>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="relative isolate mx-auto max-w-6xl overflow-hidden px-6 py-24"
      >
        <DotPattern />
        <SectionLabel>contact</SectionLabel>
        <Reveal>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] tracking-tight">
            get in touch
          </h2>
          <p className="mt-5 text-muted-foreground">drop a message — i usually reply fast.</p>
        </Reveal>
        <div className="mt-14 border-t border-border">
          {CONTACTS.map((c, i) => (
            <Reveal key={c.label} delay={i * 80}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 border-b border-border py-8 transition-colors hover:border-accent"
              >
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {c.label}
                  </p>
                  <p className="mt-2 truncate font-display text-[clamp(1.25rem,3.5vw,2.25rem)] transition-colors group-hover:text-accent">
                    {c.value}
                  </p>
                </div>
                <ArrowUpRight className="h-7 w-7 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative isolate overflow-hidden border-t border-border px-6 py-12">
        <DotPattern />
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4">
          <p className="font-display text-sm tracking-wide">Vineet Kumar · 2025</p>
          <nav className="flex gap-6 text-xs uppercase tracking-widest text-muted-foreground">
            <a href="#projects" className="hover:text-foreground">
              Projects
            </a>
            <a href="#about" className="hover:text-foreground">
              About
            </a>
            <a href="#contact" className="hover:text-foreground">
              Contact
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
