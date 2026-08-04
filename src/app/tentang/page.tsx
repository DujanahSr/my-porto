"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Download, ArrowRight, Monitor, Server, Database, Wrench, Zap, Users, Target, Milestone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

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

interface TechCategory { name: string; icon: string; skills: string[] }
interface TimelineItem { year: string; role: string; org: string; desc: string }
interface ValueItem { title: string; icon: string; desc: string }

const getIcon = (name: string) => {
  switch (name) {
    case "frontend":  return <Monitor />;
    case "backend":   return <Server />;
    case "database":  return <Database />;
    case "tools":     return <Wrench />;
    case "zap":       return <Zap />;
    case "users":     return <Users />;
    case "target":    return <Target />;
    default:          return <Milestone />;
  }
};

export default function Tentang() {
  const { t } = useLanguage();

  return (
    <div style={{ background: "#050505", color: "#E8DCC8", paddingTop: "72px" }}>

      {/* ── GHOST HEADER ── */}
      <div style={{ position: "relative", overflow: "hidden", paddingTop: "4rem", paddingBottom: "2rem" }}>
        <div className="ghost-text" style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: 0, whiteSpace: "nowrap" }}>
          {t.about.header.ghost}
        </div>
        <div className="max-w-350 mx-auto px-6 md:px-10 pt-12 relative z-10">
          <Reveal>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "1rem" }}>
              {t.about.header.label}
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.5rem, 8vw, 6rem)", fontWeight: 700, lineHeight: 1, color: "#E8DCC8" }}>
              {t.about.header.title1}<br />
              <em style={{ color: "#C9A96E", fontStyle: "italic", fontWeight: 300 }}>{t.about.header.title2}</em>
            </h1>
          </Reveal>
        </div>
      </div>

      {/* ── HERO (Photo + Badges) ── */}
      <section className="max-w-350 mx-auto px-6 md:px-10 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 lg:gap-24 items-center">
        <Reveal>
          <div className="relative w-full max-w-70 sm:max-w-[320px] lg:w-70 h-87.5 sm:h-100 mx-auto lg:mx-0">
            <div style={{ width: "100%", height: "100%", overflow: "hidden", borderRadius: "4px", position: "relative" }}>
              <Image src="/profile.jpeg" alt="Abu Dujanah Siregar" fill sizes="280px" style={{ objectFit: "cover", objectPosition: "top" }} priority />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,5,0.5) 0%, transparent 60%)" }} />
            </div>
            {/* Decorative gold corner */}
            <div style={{ position: "absolute", top: "-1px", left: "-1px", width: "40px", height: "40px", borderTop: "2px solid #C9A96E", borderLeft: "2px solid #C9A96E" }} />
            <div style={{ position: "absolute", bottom: "-1px", right: "-1px", width: "40px", height: "40px", borderBottom: "2px solid #C9A96E", borderRight: "2px solid #C9A96E" }} />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1, color: "#E8DCC8", marginBottom: "1.5rem" }}>
            {t.about.heroStatement}
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "2rem" }}>
            {t.about.quickBadges.map((badge: string, idx: number) => (
              <span key={idx} style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.65rem", letterSpacing: "0.15em",
                color: "#C9A96E", padding: "0.5rem 1.25rem",
                border: "1px solid rgba(201,169,110,0.3)",
                borderRadius: "9999px", textTransform: "uppercase",
              }}>
                {badge}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── JOURNEY ── */}
      <section style={{ borderTop: "1px solid rgba(232,220,200,0.08)", padding: "6rem 0" }}>
        <div className="max-w-350 mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 items-start">
          <Reveal>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "1rem" }}>
              {t.about.labels.journey}
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 700, lineHeight: 1, color: "#E8DCC8" }}>
              {t.about.journeyTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              {t.about.journeyText.map((para: string, i: number) => (
                <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", textAlign: "justify", hyphens: "auto", WebkitHyphens: "auto", msHyphens: "auto", wordBreak: "break-word", fontSize: "1.05rem", lineHeight: 1.9, color: "#8A8078" }}>
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TECH ECOSYSTEM ── */}
      <section style={{ background: "#080808", borderTop: "1px solid rgba(232,220,200,0.08)" }} className="py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-350 mx-auto">
          <Reveal>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              {t.about.labels.tech}
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 3vw, 3.5rem)", fontWeight: 700, color: "#E8DCC8", marginBottom: "3rem" }}>
              {t.about.techEcosystemTitle}
            </h2>
          </Reveal>

          {/* Core Tech Icons Showcase */}
          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-10 mb-16 justify-center lg:justify-start items-center">
              {[
                { name: "Java", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
                { name: "Spring Boot", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" },
                { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
                { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
                { name: "Tailwind CSS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
                { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
                { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
                { name: "GitHub", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
              ].map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.15, filter: "brightness(1.2) drop-shadow(0 0 15px rgba(201,169,110,0.2))" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  title={tech.name}
                  style={{ cursor: "none" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={tech.src} alt={tech.name} style={{ width: "55px", height: "55px", objectFit: "contain", filter: tech.name === "GitHub" ? "invert(1) opacity(0.85)" : "none" }} />
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* Pill Grid — Secondary skills flat */}
          <Reveal delay={0.4}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              {t.about.techCategories.flatMap((cat: TechCategory) => cat.skills).map((skill: string, i: number) => (
                <motion.span
                  key={i}
                  whileHover={{ borderColor: "#C9A96E", color: "#C9A96E" }}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.7rem", letterSpacing: "0.1em",
                    color: "#6B6560",
                    padding: "0.6rem 1.25rem",
                    border: "1px solid rgba(232,220,200,0.1)",
                    borderRadius: "9999px",
                    textTransform: "uppercase",
                    cursor: "none",
                    transition: "border-color 0.3s, color 0.3s",
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section style={{ borderTop: "1px solid rgba(232,220,200,0.08)" }} className="py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-225 mx-auto">
          <Reveal>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              {t.about.labels.timeline}
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 3vw, 3.5rem)", fontWeight: 700, color: "#E8DCC8", marginBottom: "4rem" }}>
              {t.about.timelineTitle}
            </h2>
          </Reveal>

          {t.about.timeline.map((item: TimelineItem, i: number) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-4 sm:gap-8 mb-12 pb-12 border-b border-[rgba(232,220,200,0.06)]">
                <div>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#C9A96E", letterSpacing: "0.05em" }}>{item.year}</p>
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.5rem", fontWeight: 700, color: "#E8DCC8", marginBottom: "0.25rem" }}>{item.role}</h3>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "0.75rem" }}>{item.org}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", textAlign: "justify", hyphens: "auto", WebkitHyphens: "auto", msHyphens: "auto", wordBreak: "break-word", fontSize: "0.95rem", lineHeight: 1.8, color: "#6B6560" }}>{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ background: "#080808", borderTop: "1px solid rgba(232,220,200,0.08)" }} className="py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-350 mx-auto">
          <Reveal>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              {t.about.labels.values}
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 3vw, 3.5rem)", fontWeight: 700, color: "#E8DCC8", marginBottom: "4rem" }}>
              {t.about.valuesTitle}
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {t.about.values.map((val: ValueItem, i: number) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ padding: "2.5rem", border: "1px solid rgba(232,220,200,0.08)", borderRadius: "4px", transition: "border-color 0.3s" }}>
                  <div style={{ color: "#C9A96E", marginBottom: "1.5rem" }}>{getIcon(val.icon)}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.5rem", fontWeight: 700, color: "#E8DCC8", marginBottom: "0.75rem" }}>{val.title}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", textAlign: "justify", hyphens: "auto", WebkitHyphens: "auto", msHyphens: "auto", wordBreak: "break-word", fontSize: "0.9rem", lineHeight: 1.8, color: "#6B6560" }}>{val.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-32 px-6 md:px-10 text-center">
        <Reveal>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 8vw, 5rem)", fontWeight: 700, color: "#E8DCC8", marginBottom: "1rem" }}>
            {t.about.ctaTitle}
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", textAlign: "justify", hyphens: "auto", WebkitHyphens: "auto", msHyphens: "auto", wordBreak: "break-word", color: "#6B6560", fontSize: "1rem", marginBottom: "3rem", maxWidth: "500px", margin: "0 auto 3rem" }}>
            {t.about.ctaDesc}
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <a href="/cv-abu-dujanah.pdf" target="_blank" rel="noopener noreferrer" className="btn-cream magnetic-btn">
              <Download style={{ width: "14px", height: "14px" }} /> {t.about.cvBtn}
            </a>
            <Link href="/kontak" className="btn-outline magnetic-btn">
              {t.nav.contact} <ArrowRight style={{ width: "14px", height: "14px" }} />
            </Link>
          </div>
        </Reveal>
      </section>

    </div>
  );
}
