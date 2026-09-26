"use client";

import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { ArrowRight, ArrowDown, ExternalLink, GitBranch, Layers, ShieldCheck, Cpu, Terminal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useRef, useState, useEffect } from "react";

// ─── Scroll Reveal Wrapper ────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Oceanic Depth HUD Widget ─────────────────────────────────────────────────
function OceanDepthHUD() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      setDepth(Math.round(latest * 1500));
    });
  }, [smoothProgress]);

  const getZoneLabel = (d: number) => {
    if (d < 350) return "Sunlight Zone // Surface Architecture";
    if (d < 750) return "Twilight Zone // Distributed Microservices";
    if (d < 1200) return "Midnight Zone // High-Concurrency Engines";
    return "The Abyss // Kernel & Low-Level Algorithms";
  };

  return (
    <div
      className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3 pointer-events-none select-none"
      style={{ opacity: depth > 30 ? 1 : 0, transition: "opacity 0.5s ease" }}
    >
      <div
        style={{
          background: "rgba(10, 10, 10, 0.82)",
          border: "1px solid rgba(201, 169, 110, 0.2)",
          backdropFilter: "blur(12px)",
          borderRadius: "12px",
          padding: "1rem 1.25rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "0.35rem",
          boxShadow: "0 10px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(201,169,110,0.2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A96E] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9A96E]"></span>
          </span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#C9A96E", textTransform: "uppercase" }}>
            SONAR DEPTH
          </span>
        </div>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.4rem", fontWeight: 700, color: "#E8DCC8", lineHeight: 1 }}>
          {String(depth).padStart(4, "0")}<span style={{ fontSize: "0.75rem", color: "#C9A96E", marginLeft: "2px" }}>M</span>
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#8A8078", maxWidth: "160px", textAlign: "right", lineHeight: 1.3 }}>
          {getZoneLabel(depth)}
        </p>
      </div>

      {/* Depth Gauge Progress Line */}
      <div style={{ width: "2px", height: "100px", background: "rgba(232, 220, 200, 0.1)", borderRadius: "2px", position: "relative", overflow: "hidden", marginRight: "1rem" }}>
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100%",
            background: "linear-gradient(to bottom, #C9A96E, #E8DCC8)",
            scaleY: scrollYProgress,
            transformOrigin: "top",
          }}
        />
      </div>
    </div>
  );
}

// ─── Selected Works Data ──────────────────────────────────────────────────────
const selectedWorks = [
  {
    index: "01",
    name: "RegarStore",
    titleFull: "Enterprise Distributed E-Commerce Microservices",
    year: "2026",
    tags: ["Java 21", "Spring Boot 3", "RabbitMQ", "Redis", "React 19"],
    href: "/proyek/regarstore",
    demoUrl: "https://regarstore-ecommerce-virid.vercel.app/",
    githubUrl: "https://github.com/DujanahSr/regarstore-ecommerce.git",
    image: "/regarstore.png",
    highlight: "Java Virtual Threads · Event-Driven RabbitMQ · Redis Caching · Midtrans Snap",
  },
  {
    index: "02",
    name: "StokKita",
    titleFull: "Enterprise Multi-Tenant POS & Warehouse SaaS",
    year: "2025",
    tags: ["TypeScript", "Node.js", "Express", "React 18", "Docker"],
    href: "/proyek/stokkita",
    demoUrl: "",
    githubUrl: "https://github.com/DujanahSr",
    image: "/reactFundamental.png",
    highlight: "Pessimistic Row-Locking · Inventory Algorithms (EOQ & ROP) · CI/CD",
  },
  {
    index: "03",
    name: "SIMAKA Enterprise",
    titleFull: "Enterprise HR & Attendance Management",
    year: "2025",
    tags: ["Java 21", "Spring Boot", "MySQL", "Tailwind CSS"],
    href: "/proyek/simaka",
    demoUrl: "",
    githubUrl: "https://github.com/DujanahSr/pr.git",
    image: "/simaka.png",
    highlight: "Strict Spring Security RBAC · Multi-Status Validation · Geolocation",
  },
  {
    index: "04",
    name: "Eventease",
    titleFull: "Event Ticketing & E-Commerce Platform",
    year: "2025",
    tags: ["Java 21", "Spring Boot 3", "Midtrans", "OpenPDF"],
    href: "/proyek/eventease",
    demoUrl: "",
    githubUrl: "https://github.com/DujanahSr/eventease",
    image: "/javaFundamental.png",
    highlight: "Automated QR E-Ticket Generator · Cloudinary Media · Command Center",
  },
];

export default function Home() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  // Parallax calculations
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  return (
    <div style={{ background: "#050505", color: "#E8DCC8", position: "relative" }}>
      {/* Oceanic Depth HUD */}
      <OceanDepthHUD />

      {/* ── 1. HERO SECTION ─────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}
      >
        {/* Parallax Ocean Hero Image */}
        <motion.div style={{ y: imgY, opacity: opacityHero, position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/ocean-hero.jpg"
            alt="Deep Ocean Abyss"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          {/* Subtle multi-layer cinematic vignette & atmospheric gradients */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.65) 45%, rgba(5,5,5,0.2) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 30%, transparent 20%, rgba(5,5,5,0.7) 90%)" }} />
        </motion.div>

        {/* Hero Text Content */}
        <motion.div
          style={{ y: textY, position: "relative", zIndex: 1, width: "100%", padding: "0 2rem 5rem" }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            {/* Tagline / Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}
            >
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.68rem",
                letterSpacing: "0.25em",
                color: "#C9A96E",
                textTransform: "uppercase",
                background: "rgba(201,169,110,0.1)",
                border: "1px solid rgba(201,169,110,0.3)",
                padding: "0.3rem 0.85rem",
                borderRadius: "9999px",
              }}>
                {"//"} {t.home.hero.role}
              </span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#A89F91" }} className="hidden sm:inline">
                {t.home.hero.subRole}
              </span>
            </motion.div>

            {/* Name — Ultra Large Editorial Typography */}
            <div style={{ overflow: "hidden", marginBottom: "0.15rem" }}>
              <motion.h1
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(3rem, 11vw, 8.5rem)",
                  fontWeight: 700,
                  lineHeight: 0.92,
                  color: "#E8DCC8",
                  letterSpacing: "-0.01em",
                  textShadow: "0 4px 20px rgba(0,0,0,0.8)",
                }}
              >
                Abu Dujanah
              </motion.h1>
            </div>
            <div style={{ overflow: "hidden", marginBottom: "2rem" }}>
              <motion.h1
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ delay: 1.05, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(3rem, 11vw, 8.5rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  lineHeight: 0.92,
                  color: "#C9A96E",
                  letterSpacing: "-0.01em",
                  textShadow: "0 0 30px rgba(201,169,110,0.3)",
                }}
              >
                Siregar
              </motion.h1>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}
            >
              <Link href="/proyek" className="btn-cream magnetic-btn">
                {t.hero.viewProjects} <ArrowRight style={{ width: "15px", height: "15px" }} />
              </Link>
              <Link href="/kontak" className="btn-outline magnetic-btn">
                {t.hero.contact}
              </Link>
              <Link href="/tentang" className="btn-outline magnetic-btn hidden sm:inline-flex" style={{ borderColor: "rgba(201,169,110,0.2)" }}>
                {t.nav.about}
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          style={{
            position: "absolute",
            bottom: "2.5rem",
            right: "2.5rem",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.6rem",
          }}
        >
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.22em", color: "#A89F91", writingMode: "vertical-rl" }}>
            {t.home.hero.scroll}
          </span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
            <ArrowDown style={{ width: "14px", height: "14px", color: "#C9A96E" }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── 2. STATEMENT & CORE STATS ─────────────────────────────────────────── */}
      <section style={{ padding: "8rem 2rem", position: "relative", borderTop: "1px solid rgba(232,220,200,0.06)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "2.5rem" }}>
              {t.home.statement.label}
            </p>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-end">
            <Reveal>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)",
                  fontWeight: 700,
                  lineHeight: 1.02,
                  color: "#E8DCC8",
                }}
              >
                {t.home.statement.title1}<br />
                <em style={{ color: "#C9A96E", fontStyle: "italic", fontWeight: 300 }}>{t.home.statement.title2}</em><br />
                {t.home.statement.title3}
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1.08rem",
                  lineHeight: 1.85,
                  color: "#9E948A",
                  maxWidth: "520px",
                  textAlign: "justify",
                  marginBottom: "2.5rem",
                }}
              >
                {t.hero.description}
              </p>

              {/* Stats Box */}
              <div
                style={{
                  borderTop: "1px solid rgba(201,169,110,0.2)",
                  paddingTop: "2rem",
                }}
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {t.home.statement.stats.map((stat: { num: string; label: string }, idx: number) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        padding: "1rem",
                        background: "rgba(12,12,12,0.6)",
                        border: "1px solid rgba(232,220,200,0.06)",
                        borderRadius: "8px",
                      }}
                    >
                      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2.6rem", fontWeight: 700, color: "#C9A96E", lineHeight: 1 }}>
                        {stat.num}
                      </p>
                      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.12em", color: "#8A8078", textTransform: "uppercase", marginTop: "0.4rem" }}>
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 3. SELECTED ENTERPRISE WORKS ─────────────────────────────────────── */}
      <section className="py-20 md:py-32 px-6 md:px-10" style={{ borderTop: "1px solid rgba(232,220,200,0.06)", background: "#070707" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 md:mb-20 gap-6">
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
                <span className="h-1.5 w-1.5 rounded-full bg-[#C9A96E]" />
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "#C9A96E", textTransform: "uppercase" }}>
                  {t.home.works.label}
                </p>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.4rem, 5vw, 4.2rem)", fontWeight: 700, color: "#E8DCC8", lineHeight: 1 }}>
                {t.home.works.title}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <Link href="/proyek" className="btn-outline" style={{ whiteSpace: "nowrap" }}>
                {t.home.works.allWorks} <ArrowRight style={{ width: "13px", height: "13px" }} />
              </Link>
            </Reveal>
          </div>

          {/* Interactive Project Showcase Cards */}
          <div className="flex flex-col gap-8">
            {selectedWorks.map((work, i) => (
              <Reveal key={work.index} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.01, borderColor: "rgba(201,169,110,0.4)" }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: "rgba(10, 10, 10, 0.75)",
                    border: "1px solid rgba(232, 220, 200, 0.08)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                  className="group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] items-center">
                    {/* Left: Project Specs */}
                    <div style={{ padding: "2.5rem 2.5rem 2.5rem 2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", color: "#C9A96E", letterSpacing: "0.15em" }}>
                            [{work.index}] // {work.year}
                          </span>
                          {work.demoUrl && (
                            <span style={{
                              fontFamily: "'Space Mono', monospace",
                              fontSize: "0.58rem",
                              letterSpacing: "0.12em",
                              color: "#22c55e",
                              background: "rgba(34,197,94,0.1)",
                              border: "1px solid rgba(34,197,94,0.3)",
                              padding: "0.2rem 0.6rem",
                              borderRadius: "9999px",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.35rem",
                              textTransform: "uppercase",
                            }}>
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                              Production Live
                            </span>
                          )}
                        </div>

                        <Link href={work.href} style={{ textDecoration: "none" }}>
                          <h3
                            style={{
                              fontFamily: "'Cormorant Garamond', Georgia, serif",
                              fontSize: "clamp(2rem, 3.5vw, 3rem)",
                              fontWeight: 700,
                              color: "#E8DCC8",
                              lineHeight: 1.1,
                              marginBottom: "0.5rem",
                              transition: "color 0.3s ease",
                            }}
                            className="group-hover:text-[#C9A96E]"
                          >
                            {work.name}
                          </h3>
                        </Link>

                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#A89F91", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                          {work.titleFull}
                        </p>

                        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", color: "#C9A96E", marginBottom: "1.5rem", lineHeight: 1.5 }}>
                          ✦ {work.highlight}
                        </p>
                      </div>

                      <div>
                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {work.tags.map((tag) => (
                            <span
                              key={tag}
                              style={{
                                fontFamily: "'Space Mono', monospace",
                                fontSize: "0.62rem",
                                letterSpacing: "0.1em",
                                color: "#8A8078",
                                padding: "0.3rem 0.75rem",
                                border: "1px solid rgba(232,220,200,0.1)",
                                borderRadius: "9999px",
                                textTransform: "uppercase",
                                background: "rgba(5,5,5,0.4)",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Direct CTA Links */}
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                          <Link href={work.href} className="btn-cream magnetic-btn" style={{ padding: "0.75rem 1.6rem", fontSize: "0.75rem" }}>
                            {t.projects.overview || "Detail Proyek"} <ArrowRight style={{ width: "12px", height: "12px" }} />
                          </Link>
                          {work.demoUrl && (
                            <a
                              href={work.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-outline magnetic-btn"
                              style={{ padding: "0.75rem 1.4rem", fontSize: "0.75rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
                            >
                              <ExternalLink style={{ width: "13px", height: "13px" }} /> Live Demo
                            </a>
                          )}
                          {work.githubUrl && (
                            <a
                              href={work.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "#8A8078", transition: "color 0.2s", padding: "0.5rem" }}
                              className="hover:text-[#C9A96E]"
                              title="GitHub Repository"
                            >
                              <GitBranch style={{ width: "18px", height: "18px" }} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Project Image Thumbnail */}
                    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "280px", overflow: "hidden", background: "#050505" }}>
                      <Link href={work.href}>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6 }}
                          style={{ position: "relative", width: "100%", height: "100%", minHeight: "280px" }}
                        >
                          <Image
                            src={work.image}
                            alt={work.name}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            style={{ objectFit: "cover" }}
                          />
                          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 50%)" }} />
                        </motion.div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. ARCHITECTURAL STRENGTHS (SEMACAM PENYELAMAN TEKNIS) ───────────── */}
      <section className="py-20 md:py-28 px-6 md:px-10" style={{ borderTop: "1px solid rgba(232,220,200,0.06)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "0.8rem" }}>
              03 — KEKUATAN ARSITEKTUR // DEPTH: 800M
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", fontWeight: 700, color: "#E8DCC8", marginBottom: "3rem" }}>
              Direkayasa untuk Beban Tinggi & Keamanan Mutlak
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Layers style={{ width: "24px", height: "24px" }} />,
                title: "Distributed Microservices",
                desc: "Arsitektur multi-service (API Gateway, Auth, Catalog, Order, Payment, Notification) berbasis Java 21 Virtual Threads & Spring Cloud untuk efisiensi konkurensi skala masif.",
              },
              {
                icon: <Cpu style={{ width: "24px", height: "24px" }} />,
                title: "Event-Driven & In-Memory Cache",
                desc: "Message broker asinkron RabbitMQ untuk pipeline checkout dan notifikasi tanpa blocking, dipadukan Redis caching untuk query katalog dengan latensi sub-milidetik.",
              },
              {
                icon: <ShieldCheck style={{ width: "24px", height: "24px" }} />,
                title: "Enterprise RBAC & Anti-Race Condition",
                desc: "Autentikasi berlapis Spring Security, JWT HttpOnly Cookies, mitigasi race condition inventori dengan pessimistic row-locking (SELECT FOR UPDATE), dan webhook idempotensi.",
              },
            ].map((feature, idx) => (
              <Reveal key={idx} delay={idx * 0.15}>
                <div
                  style={{
                    padding: "2.5rem",
                    background: "rgba(10,10,10,0.6)",
                    border: "1px solid rgba(232,220,200,0.08)",
                    borderRadius: "12px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  className="hover:border-[rgba(201,169,110,0.4)] transition-all duration-300"
                >
                  <div>
                    <div style={{ color: "#C9A96E", marginBottom: "1.5rem" }}>{feature.icon}</div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.6rem", fontWeight: 700, color: "#E8DCC8", marginBottom: "0.8rem" }}>
                      {feature.title}
                    </h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", lineHeight: 1.7, color: "#8A8078" }}>
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. ABOUT PREVIEW ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-10" style={{ background: "#080808", borderTop: "1px solid rgba(232,220,200,0.06)" }}>
        <div className="max-w-350 mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <Reveal>
            <div style={{ position: "relative" }}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "4/5", overflow: "hidden", borderRadius: "8px", border: "1px solid rgba(201,169,110,0.2)" }}>
                <Image src="/profile.jpeg" alt="Abu Dujanah Siregar" fill sizes="50vw" style={{ objectFit: "cover", objectPosition: "top" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 50%)" }} />
              </div>
              <div style={{ position: "absolute", top: "-2px", left: "-2px", width: "30px", height: "30px", borderTop: "2px solid #C9A96E", borderLeft: "2px solid #C9A96E" }} />
              <div style={{ position: "absolute", bottom: "-2px", right: "-2px", width: "30px", height: "30px", borderBottom: "2px solid #C9A96E", borderRight: "2px solid #C9A96E" }} />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "1.2rem" }}>
              {t.home.about.label}
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 700, lineHeight: 1.1, color: "#E8DCC8", marginBottom: "1.5rem" }}>
              {t.home.about.title1}<br />
              <em style={{ color: "#C9A96E", fontStyle: "italic", fontWeight: 300 }}>{t.home.about.title2}</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", textAlign: "justify", fontSize: "1.05rem", lineHeight: 1.85, color: "#9E948A", marginBottom: "2.5rem" }}>
              {t.about.journeyText[0]}
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/tentang" className="btn-cream magnetic-btn">
                {t.nav.about} <ArrowRight style={{ width: "14px", height: "14px" }} />
              </Link>
              <Link href="/sertifikat" className="btn-outline magnetic-btn">
                {t.nav.certificates}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 6. CTA SECTION ───────────────────────────────────────────────────── */}
      <section className="py-28 md:py-40 px-6 md:px-10 text-center overflow-hidden relative" style={{ borderTop: "1px solid rgba(232,220,200,0.06)" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "700px", height: "350px", background: "radial-gradient(ellipse, rgba(201,169,110,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "850px", margin: "0 auto", position: "relative" }}>
          <Reveal>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              04 — Hubungi Saya
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.5rem, 7vw, 5.5rem)", fontWeight: 700, lineHeight: 1.05, color: "#E8DCC8", marginBottom: "1.5rem" }}>
              {t.home.about.cta}
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "#9E948A", marginBottom: "3rem", lineHeight: 1.8, maxWidth: "600px", margin: "0 auto 3rem" }}>
              {t.about.ctaDesc}
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", flexWrap: "wrap" }}>
              <Link href="/kontak" className="btn-cream magnetic-btn">
                {t.hero.contact} <ArrowRight style={{ width: "14px", height: "14px" }} />
              </Link>
              <Link href="/proyek" className="btn-outline magnetic-btn">
                {t.hero.viewProjects}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
