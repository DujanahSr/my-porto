"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Download, ArrowRight, Monitor, Server, Database, Wrench, Zap, Users, Target, Milestone, ShieldCheck, Cpu } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface TechItem {
  name: string;
  category: "backend" | "frontend" | "database" | "devops" | "tools";
  badge: string;
  iconSrc: string;
  invertOnDark?: boolean;
}

const allTechItems: TechItem[] = [
  // Backend
  { name: "Java 21", category: "backend", badge: "Core Language", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { name: "Spring Boot 3", category: "backend", badge: "Enterprise Framework", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" },
  { name: "Node.js", category: "backend", badge: "Runtime", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Express.js", category: "backend", badge: "REST API", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", invertOnDark: true },
  { name: "Python", category: "backend", badge: "Flask / Scripts", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "C Language", category: "backend", badge: "Low-Level & Memory", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },

  // Frontend
  { name: "React 19", category: "frontend", badge: "Core UI", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "TypeScript", category: "frontend", badge: "Type Safety", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "JavaScript", category: "frontend", badge: "ES6+ Modern", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "Tailwind CSS", category: "frontend", badge: "Modern Styling", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Bootstrap 5", category: "frontend", badge: "UI Framework", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
  { name: "HTML5 & CSS3", category: "frontend", badge: "Semantic Web", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },

  // Database
  { name: "PostgreSQL", category: "database", badge: "Relational DB", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", category: "database", badge: "Relational DB", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "Redis", category: "database", badge: "In-Memory Cache", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },

  // DevOps & Brokers
  { name: "RabbitMQ", category: "devops", badge: "Message Broker", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rabbitmq/rabbitmq-original.svg" },
  { name: "Docker", category: "devops", badge: "Containerization", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "Nginx", category: "devops", badge: "Reverse Proxy", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg" },
  { name: "GitHub Actions", category: "devops", badge: "CI/CD Pipeline", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg" },
  { name: "Git & GitHub", category: "devops", badge: "Version Control", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", invertOnDark: true },

  // Tools & Testing
  { name: "Postman", category: "tools", badge: "API Testing", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
  { name: "Swagger / OpenAPI", category: "tools", badge: "API Documentation", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg" },
  { name: "Vercel", category: "tools", badge: "Cloud Deployment", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg", invertOnDark: true },
];

interface TechCategory { name: string; icon: string; skills: string[] }
interface TimelineItem { year: string; role: string; org: string; desc: string }
interface ValueItem { title: string; icon: string; desc: string }

const getIcon = (name: string) => {
  switch (name) {
    case "frontend":  return <Monitor style={{ width: "20px", height: "20px" }} />;
    case "backend":   return <Server style={{ width: "20px", height: "20px" }} />;
    case "database":  return <Database style={{ width: "20px", height: "20px" }} />;
    case "tools":     return <Wrench style={{ width: "20px", height: "20px" }} />;
    case "zap":       return <Zap style={{ width: "20px", height: "20px" }} />;
    case "users":     return <Users style={{ width: "20px", height: "20px" }} />;
    case "target":    return <Target style={{ width: "20px", height: "20px" }} />;
    default:          return <Milestone style={{ width: "20px", height: "20px" }} />;
  }
};

export default function Tentang() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filterCategories = [
    { id: "all", label: "All Tech" },
    { id: "backend", label: "Backend & Systems" },
    { id: "frontend", label: "Frontend & UI" },
    { id: "database", label: "Database & Cache" },
    { id: "devops", label: "DevOps & Message Broker" },
    { id: "tools", label: "Testing & Tools" },
  ];

  const filteredItems = activeCategory === "all"
    ? allTechItems
    : allTechItems.filter((i) => i.category === activeCategory);

  return (
    <div style={{ background: "#050505", color: "#E8DCC8", paddingTop: "76px" }}>

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
            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.6rem, 7vw, 6rem)", fontWeight: 700, lineHeight: 1, color: "#E8DCC8" }}>
              {t.about.header.title1}<br />
              <em style={{ color: "#C9A96E", fontStyle: "italic", fontWeight: 300 }}>{t.about.header.title2}</em>
            </h1>
          </Reveal>
        </div>
      </div>

      {/* ── HERO (Photo + Badges) ── */}
      <section className="max-w-350 mx-auto px-6 md:px-10 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 lg:gap-24 items-center">
        <Reveal>
          <div className="relative w-full max-w-70 sm:max-w-[320px] lg:w-75 h-95 sm:h-105 mx-auto lg:mx-0">
            <div style={{ width: "100%", height: "100%", overflow: "hidden", borderRadius: "8px", position: "relative", border: "1px solid rgba(201,169,110,0.25)" }}>
              <Image src="/profile.jpeg" alt="Abu Dujanah Siregar" fill sizes="320px" style={{ objectFit: "cover", objectPosition: "top" }} priority />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,5,0.7) 0%, transparent 60%)" }} />
            </div>
            {/* Decorative gold corners */}
            <div style={{ position: "absolute", top: "-2px", left: "-2px", width: "40px", height: "40px", borderTop: "2px solid #C9A96E", borderLeft: "2px solid #C9A96E" }} />
            <div style={{ position: "absolute", bottom: "-2px", right: "-2px", width: "40px", height: "40px", borderBottom: "2px solid #C9A96E", borderRight: "2px solid #C9A96E" }} />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.8rem, 3.8vw, 3.2rem)", fontWeight: 700, lineHeight: 1.15, color: "#E8DCC8", marginBottom: "1.5rem" }}>
            {t.about.heroStatement}
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "2rem" }}>
            {t.about.quickBadges.map((badge: string, idx: number) => (
              <span key={idx} style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.68rem", letterSpacing: "0.15em",
                color: "#C9A96E", padding: "0.55rem 1.25rem",
                border: "1px solid rgba(201,169,110,0.3)",
                background: "rgba(201,169,110,0.06)",
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
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.8rem)", fontWeight: 700, lineHeight: 1.05, color: "#E8DCC8" }}>
              {t.about.journeyTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              {t.about.journeyText.map((para: string, i: number) => (
                <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", textAlign: "justify", fontSize: "1.05rem", lineHeight: 1.9, color: "#9E948A" }}>
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── EXPANDED TECH ECOSYSTEM ── */}
      <section style={{ background: "#080808", borderTop: "1px solid rgba(232,220,200,0.08)" }} className="py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-350 mx-auto">
          <Reveal>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              {t.about.labels.tech}
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.6rem)", fontWeight: 700, color: "#E8DCC8", marginBottom: "2rem" }}>
              {t.about.techEcosystemTitle}
            </h2>
          </Reveal>

          {/* Category Filter Tabs */}
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2 md:gap-3 mb-12">
              {filterCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.68rem",
                    letterSpacing: "0.1em",
                    padding: "0.55rem 1.25rem",
                    borderRadius: "9999px",
                    border: activeCategory === cat.id ? "1px solid #C9A96E" : "1px solid rgba(232,220,200,0.12)",
                    background: activeCategory === cat.id ? "rgba(201,169,110,0.15)" : "rgba(10,10,10,0.6)",
                    color: activeCategory === cat.id ? "#C9A96E" : "rgba(232,220,200,0.7)",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    transition: "all 0.25s ease",
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Comprehensive Grid of Tech Logos with 3D Hover & Badges */}
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5 mb-16">
            <AnimatePresence>
              {filteredItems.map((tech) => (
                <motion.div
                  layout
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -6, borderColor: "rgba(201,169,110,0.45)", boxShadow: "0 10px 25px rgba(0,0,0,0.6), 0 0 15px rgba(201,169,110,0.15)" }}
                  transition={{ duration: 0.25 }}
                  style={{
                    padding: "1.5rem 1rem",
                    background: "rgba(12,12,12,0.75)",
                    border: "1px solid rgba(232,220,200,0.08)",
                    borderRadius: "12px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.85rem",
                    textAlign: "center",
                  }}
                >
                  <div style={{ width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={tech.iconSrc}
                      alt={tech.name}
                      style={{
                        maxWidth: "46px",
                        maxHeight: "46px",
                        objectFit: "contain",
                        filter: tech.invertOnDark ? "invert(1) opacity(0.9)" : "none",
                      }}
                    />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: 600, color: "#E8DCC8", marginBottom: "0.2rem" }}>
                      {tech.name}
                    </p>
                    <span style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.58rem",
                      letterSpacing: "0.08em",
                      color: "#C9A96E",
                      textTransform: "uppercase",
                    }}>
                      {tech.badge}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Grouped Skills Accordion / Pill Grid */}
          <Reveal delay={0.3}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.about.techCategories.map((cat: TechCategory, idx: number) => (
                <div
                  key={idx}
                  style={{
                    padding: "2rem",
                    background: "rgba(10,10,10,0.5)",
                    border: "1px solid rgba(232,220,200,0.06)",
                    borderRadius: "10px",
                  }}
                  className="hover:border-[rgba(201,169,110,0.3)] transition-colors duration-300"
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", color: "#C9A96E" }}>
                    {getIcon(cat.icon)}
                    <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.35rem", fontWeight: 700, color: "#E8DCC8" }}>
                      {cat.name}
                    </h3>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {cat.skills.map((skill: string, sIdx: number) => (
                      <span
                        key={sIdx}
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "0.65rem",
                          letterSpacing: "0.08em",
                          color: "#9E948A",
                          padding: "0.35rem 0.75rem",
                          border: "1px solid rgba(232,220,200,0.08)",
                          borderRadius: "9999px",
                          background: "rgba(5,5,5,0.4)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section style={{ borderTop: "1px solid rgba(232,220,200,0.08)" }} className="py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-225 mx-auto">
          <Reveal>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              {t.about.labels.timeline}
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.6rem)", fontWeight: 700, color: "#E8DCC8", marginBottom: "4rem" }}>
              {t.about.timelineTitle}
            </h2>
          </Reveal>

          {t.about.timeline.map((item: TimelineItem, i: number) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-4 sm:gap-8 mb-12 pb-12 border-b border-[rgba(232,220,200,0.06)]">
                <div>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", color: "#C9A96E", letterSpacing: "0.05em", fontWeight: 700 }}>
                    {item.year}
                  </p>
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.6rem", fontWeight: 700, color: "#E8DCC8", marginBottom: "0.35rem" }}>
                    {item.role}
                  </h3>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.12em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "0.85rem" }}>
                    {item.org}
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", textAlign: "justify", fontSize: "0.98rem", lineHeight: 1.85, color: "#9E948A" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ background: "#080808", borderTop: "1px solid rgba(232,220,200,0.08)" }} className="py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-350 mx-auto">
          <Reveal>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              {t.about.labels.values}
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.6rem)", fontWeight: 700, color: "#E8DCC8", marginBottom: "4rem" }}>
              {t.about.valuesTitle}
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "2rem" }}>
            {t.about.values.map((val: ValueItem, i: number) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ padding: "2.5rem", border: "1px solid rgba(232,220,200,0.08)", borderRadius: "8px", background: "rgba(10,10,10,0.6)", height: "100%" }} className="hover:border-[rgba(201,169,110,0.35)] transition-colors duration-300">
                  <div style={{ color: "#C9A96E", marginBottom: "1.5rem" }}>{getIcon(val.icon)}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.6rem", fontWeight: 700, color: "#E8DCC8", marginBottom: "0.75rem" }}>
                    {val.title}
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", textAlign: "justify", fontSize: "0.95rem", lineHeight: 1.8, color: "#9E948A" }}>
                    {val.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 md:py-36 px-6 md:px-10 text-center">
        <Reveal>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.2rem, 7vw, 4.8rem)", fontWeight: 700, color: "#E8DCC8", marginBottom: "1.25rem" }}>
            {t.about.ctaTitle}
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", textAlign: "justify", color: "#9E948A", fontSize: "1.05rem", marginBottom: "3rem", maxWidth: "550px", margin: "0 auto 3rem", lineHeight: 1.8 }}>
            {t.about.ctaDesc}
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", flexWrap: "wrap" }}>
            <Link href="/kontak" className="btn-cream magnetic-btn">
              {t.nav.contact} <ArrowRight style={{ width: "14px", height: "14px" }} />
            </Link>
            <Link href="/proyek" className="btn-outline magnetic-btn">
              {t.hero.viewProjects}
            </Link>
          </div>
        </Reveal>
      </section>

    </div>
  );
}
