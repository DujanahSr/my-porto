"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, ArrowDown, ExternalLink, GitBranch, Layers, ShieldCheck, Cpu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useRef } from "react";
import { FeaturedProject3DCard } from "@/components/Project3DCard";
import { OceanDepthMeter } from "@/components/OceanDepthMeter";

// ─── Scroll Reveal Component ──────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
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
    demoUrl: "https://stokkita-app-red.vercel.app",
    githubUrl: "https://github.com/DujanahSr",
    image: "/stokkita.png",
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

  // Parallax transforms
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);

  return (
    <div style={{ background: "#050505", color: "#E8DCC8", position: "relative" }}>
      {/* ── Oceanic Depth Telemetry HUD ── */}
      <OceanDepthMeter />

      {/* ── 1. HERO SECTION ─────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}
      >
        {/* Parallax Ocean Hero Background */}
        <motion.div style={{ y: imgY, opacity: opacityHero, position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/ocean-hero.jpg"
            alt="Deep Ocean Atmosphere"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          {/* Subtle multi-layer cinematic vignette & atmospheric gradients */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.65) 45%, rgba(5,5,5,0.25) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 30%, transparent 25%, rgba(5,5,5,0.65) 90%)" }} />
        </motion.div>

        {/* Hero Text Content */}
        <motion.div
          style={{ y: textY, position: "relative", zIndex: 1, width: "100%", padding: "0 1.5rem 4.5rem sm:padding-0 2rem 5rem" }}
          className="px-6 sm:px-10"
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            {/* Clean Professional Role Label (No AI slop, no //, no skill dumping) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{ marginBottom: "1rem" }}
            >
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.72rem",
                  letterSpacing: "0.22em",
                  color: "#C9A96E",
                  textTransform: "uppercase",
                  display: "inline-block",
                }}
              >
                {t.home.hero.role}
              </span>
            </motion.div>

            {/* Name — Ultra Large Editorial Typography */}
            <div style={{ overflow: "hidden", marginBottom: "0.15rem" }}>
              <motion.h1
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.75, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(3.2rem, 11vw, 8.8rem)",
                  fontWeight: 700,
                  lineHeight: 0.92,
                  color: "#E8DCC8",
                  letterSpacing: "-0.01em",
                  textShadow: "0 4px 24px rgba(0,0,0,0.85)",
                }}
              >
                Abu Dujanah
              </motion.h1>
            </div>
            <div style={{ overflow: "hidden", marginBottom: "2rem" }}>
              <motion.h1
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(3.2rem, 11vw, 8.8rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  lineHeight: 0.92,
                  color: "#C9A96E",
                  letterSpacing: "-0.01em",
                  textShadow: "0 0 35px rgba(201,169,110,0.35)",
                }}
              >
                Siregar
              </motion.h1>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.8 }}
              style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}
            >
              <Link href="/proyek" className="btn-cream magnetic-btn">
                {t.hero.viewProjects} <ArrowRight style={{ width: "15px", height: "15px" }} />
              </Link>
              <Link href="/kontak" className="btn-outline magnetic-btn">
                {t.hero.contact}
              </Link>
              <Link href="/tentang" className="btn-outline magnetic-btn hidden sm:inline-flex" style={{ borderColor: "rgba(201,169,110,0.25)" }}>
                {t.nav.about}
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll & Depth Telemetry Origin Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{
            position: "absolute",
            bottom: "2.5rem",
            right: "2.5rem",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.55rem",
          }}
        >
          {/* Depth Telemetry Origin Tag */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A96E] animate-ping" />
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                color: "#C9A96E",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              0m
            </span>
          </div>

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
                  color: "#A89F91",
                  maxWidth: "520px",
                  textAlign: "justify",
                  marginBottom: "2.5rem",
                }}
              >
                {t.hero.description}
              </p>

              {/* Stats Grid */}
              <div
                style={{
                  borderTop: "1px solid rgba(201,169,110,0.2)",
                  paddingTop: "2rem",
                }}
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                  {t.home.statement.stats.map((stat: { num: string; label: string }, idx: number) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -4, borderColor: "rgba(201,169,110,0.4)" }}
                      transition={{ duration: 0.2 }}
                      style={{
                        padding: "1.2rem 1rem",
                        background: "rgba(14,14,14,0.7)",
                        border: "1px solid rgba(232,220,200,0.08)",
                        borderRadius: "10px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                      }}
                    >
                      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2.5rem", fontWeight: 700, color: "#C9A96E", lineHeight: 1 }}>
                        {stat.num}
                      </p>
                      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.12em", color: "#8A8078", textTransform: "uppercase", marginTop: "0.45rem" }}>
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

          {/* Interactive 3D Project Showcase Cards */}
          <div className="flex flex-col gap-10">
            {selectedWorks.map((work, i) => (
              <FeaturedProject3DCard
                key={work.index}
                work={work}
                index={i}
                overviewText={t.projects.overview || "Detail Proyek"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. ARCHITECTURAL STRENGTHS ───────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 md:px-10" style={{ borderTop: "1px solid rgba(232,220,200,0.06)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "0.8rem" }}>
              03 — Arsitektur Sistem
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", fontWeight: 700, color: "#E8DCC8", marginBottom: "3rem" }}>
              Direkayasa untuk Beban Tinggi &amp; Keamanan Mutlak
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
                <motion.div
                  whileHover={{
                    y: -6,
                    borderColor: "rgba(201,169,110,0.45)",
                    boxShadow: "0 20px 45px rgba(0,0,0,0.8), 0 0 25px rgba(201,169,110,0.14)",
                  }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    padding: "2.5rem",
                    background: "linear-gradient(145deg, rgba(16,14,12,0.85) 0%, rgba(8,8,8,0.92) 100%)",
                    border: "1px solid rgba(232,220,200,0.08)",
                    borderRadius: "16px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  className="group"
                >
                  {/* Subtle top edge glow */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "1px",
                      background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)",
                    }}
                  />
                  <div>
                    <div style={{ color: "#C9A96E", marginBottom: "1.5rem" }} className="group-hover:scale-110 transition-transform duration-300 origin-left">
                      {feature.icon}
                    </div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.6rem", fontWeight: 700, color: "#E8DCC8", marginBottom: "0.8rem" }}>
                      {feature.title}
                    </h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", lineHeight: 1.7, color: "#8A8078" }}>
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
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
