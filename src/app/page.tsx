"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useRef } from "react";

// ─── Scroll Reveal Wrapper ────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Selected Works Data ──────────────────────────────────────────────────────
const selectedWorks = [
  { index: "01", name: "RegarSport",    year: "2025", tags: ["React", "Spring Boot", "REST API"], href: "/proyek" },
  { index: "02", name: "EventEase",     year: "2024", tags: ["Java", "Spring Boot", "MySQL"],    href: "/proyek" },
  { index: "03", name: "My-Qur'an",    year: "2024", tags: ["HTML", "CSS", "REST API"],          href: "/proyek" },
];

export default function Home() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  // Parallax: image moves up slower than scroll
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <div style={{ background: "#050505", color: "#E8DCC8" }}>

      {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{ position: "relative", height: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}
      >
        {/* Background Image with Parallax */}
        <motion.div style={{ y: imgY, position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/ocean-hero.jpg"
            alt="Deep Ocean"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          {/* Dark Overlays */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.5) 50%, rgba(5,5,5,0.1) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(5,5,5,0.3)" }} />
        </motion.div>

        {/* Hero Text */}
        <motion.div
          style={{ y: textY, position: "relative", zIndex: 1, width: "100%", padding: "0 2.5rem 6rem" }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "1.5rem" }}
            >
              {"//"} {t.home.hero.role}
            </motion.p>

            {/* Name — Ultra Large */}
            <div style={{ overflow: "hidden", marginBottom: "0.25rem" }}>
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 1.0, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(2.5rem, 12vw, 9rem)",
                  fontWeight: 700,
                  lineHeight: 0.95,
                  color: "#E8DCC8",
                  letterSpacing: "-0.01em",
                }}
              >
                Abu Dujanah
              </motion.h1>
            </div>
            <div style={{ overflow: "hidden", marginBottom: "2.5rem" }}>
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 1.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(2.5rem, 12vw, 9rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  lineHeight: 0.95,
                  color: "#C9A96E",
                  letterSpacing: "-0.01em",
                }}
              >
                Siregar
              </motion.h1>
            </div>

            {/* Subtitle + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}
            >
              <Link href="/proyek" className="btn-cream magnetic-btn">
                {t.hero.viewProjects} <ArrowRight style={{ width: "14px", height: "14px" }} />
              </Link>
              <Link href="/kontak" className="btn-outline magnetic-btn">
                {t.hero.contact}
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{
            position: "absolute", bottom: "2.5rem", right: "2.5rem", zIndex: 1,
            display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
          }}
        >
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#6B6560", writingMode: "vertical-rl" }}>{t.home.hero.scroll}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowDown style={{ width: "14px", height: "14px", color: "#C9A96E" }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── 2. STATEMENT ─────────────────────────────────────────────────────── */}
      <section style={{ padding: "10rem 2.5rem", overflow: "hidden" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "3rem" }}>
              {t.home.statement.label}
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start md:items-end">
            <Reveal>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2.5rem, 8vw, 6rem)",
                fontWeight: 700,
                lineHeight: 1,
                color: "#E8DCC8",
              }}>
                {t.home.statement.title1}<br />
                <em style={{ color: "#C9A96E", fontStyle: "italic", fontWeight: 300 }}>{t.home.statement.title2}</em><br />
                {t.home.statement.title3}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", textAlign: "justify", hyphens: "auto", WebkitHyphens: "auto", msHyphens: "auto", wordBreak: "break-word", fontSize: "1.1rem", lineHeight: 1.8, color: "#8A8078", maxWidth: "460px" }}>
                {t.hero.description}
              </p>
              <div style={{ marginTop: "2.5rem" }}>
                <hr className="cream" style={{ marginBottom: "1.5rem" }} />
                <div className="flex flex-wrap gap-8 md:gap-12">
                  {t.home.statement.stats.map((stat: {num: string, label: string}) => (
                    <div key={stat.label}>
                      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2.5rem", fontWeight: 700, color: "#C9A96E", lineHeight: 1 }}>{stat.num}</p>
                      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#6B6560", textTransform: "uppercase", marginTop: "0.25rem" }}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 3. SELECTED WORKS ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-32 px-6 md:px-10" style={{ borderTop: "1px solid rgba(232,220,200,0.08)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6">
            <Reveal>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                {t.home.works.label}
              </p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 700, color: "#E8DCC8", lineHeight: 1 }}>
                {t.home.works.title}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <Link href="/proyek" className="btn-outline" style={{ whiteSpace: "nowrap" }}>
                {t.home.works.allWorks} <ArrowRight style={{ width: "12px", height: "12px" }} />
              </Link>
            </Reveal>
          </div>

          {/* Works List */}
          <div>
            {selectedWorks.map((work, i) => (
              <Reveal key={work.index} delay={i * 0.1}>
                <Link href={work.href} style={{ textDecoration: "none", display: "block" }}>
                  <div
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "2rem 0",
                      borderBottom: "1px solid rgba(232,220,200,0.08)",
                      cursor: "none",
                      transition: "all 0.4s ease",
                    }}
                    className="group"
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.paddingLeft = "1.5rem";
                      (e.currentTarget as HTMLDivElement).style.borderBottomColor = "rgba(201,169,110,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.paddingLeft = "0";
                      (e.currentTarget as HTMLDivElement).style.borderBottomColor = "rgba(232,220,200,0.08)";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "baseline", gap: "2rem" }}>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#4A4A4A", letterSpacing: "0.1em" }}>[{work.index}]</span>
                      <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.8rem, 3vw, 3rem)", fontWeight: 700, color: "#E8DCC8", lineHeight: 1, transition: "color 0.3s" }}>
                        {work.name}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                      <div className="hidden lg:flex gap-2">
                        {work.tags.map((tag) => (
                          <span key={tag} style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", color: "#6B6560", padding: "0.3rem 0.75rem", border: "1px solid rgba(232,220,200,0.1)", borderRadius: "9999px" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#C9A96E" }}>{"//"} {work.year}</span>
                      <ArrowRight style={{ width: "18px", height: "18px", color: "#C9A96E", opacity: 0.5, transition: "opacity 0.3s, transform 0.3s" }} />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. ABOUT SNIPPET ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-10" style={{ background: "#080808" }}>
        <div className="max-w-350 mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <Reveal>
            <div style={{ position: "relative" }}>
              {/* Photo */}
              <div style={{ position: "relative", width: "100%", aspectRatio: "4/5", overflow: "hidden", borderRadius: "4px" }}>
                <Image src="/profile.jpeg" alt="Abu Dujanah Siregar" fill sizes="50vw" style={{ objectFit: "cover", objectPosition: "top" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,0.8) 0%, transparent 50%)" }} />
              </div>

            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              {t.home.about.label}
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 700, lineHeight: 1.1, color: "#E8DCC8", marginBottom: "2rem" }}>
              {t.home.about.title1}<br />
              <em style={{ color: "#C9A96E", fontStyle: "italic", fontWeight: 300 }}>{t.home.about.title2}</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", textAlign: "justify", hyphens: "auto", WebkitHyphens: "auto", msHyphens: "auto", wordBreak: "break-word", fontSize: "1.05rem", lineHeight: 1.8, color: "#8A8078", marginBottom: "3rem" }}>
              {t.about.journeyText[0]}
            </p>
            <Link href="/tentang" className="btn-cream magnetic-btn">
              {t.nav.about} <ArrowRight style={{ width: "14px", height: "14px" }} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── 5. CTA SECTION ───────────────────────────────────────────────────── */}
      <section className="py-24 md:py-40 px-6 md:px-10 text-center overflow-hidden relative">
        {/* Background glow */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "300px", background: "radial-gradient(ellipse, rgba(201,169,110,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
          <Reveal>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "2rem" }}>
              04 — Contact
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.5rem, 8vw, 6rem)", fontWeight: 700, lineHeight: 1, color: "#E8DCC8", marginBottom: "1.5rem" }}>
              {t.home.about.cta.split(' ').slice(0, 2).join(' ')}<br />
              <em style={{ color: "#C9A96E", fontStyle: "italic", fontWeight: 300 }}>{t.home.about.cta.split(' ').slice(2).join(' ')}</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", textAlign: "justify", hyphens: "auto", WebkitHyphens: "auto", msHyphens: "auto", wordBreak: "break-word", fontSize: "1rem", color: "#8A8078", marginBottom: "3rem", lineHeight: 1.8 }}>
              {t.hero.description}
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/kontak" className="btn-cream magnetic-btn">
                {t.hero.contact} <ArrowRight style={{ width: "14px", height: "14px" }} />
              </Link>
              <a href="/cv-abu-dujanah.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline magnetic-btn">
                {t.hero.cvBtn}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
