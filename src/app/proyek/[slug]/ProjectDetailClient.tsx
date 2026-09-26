"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ExternalLink, GitBranch, CheckCircle2, ShieldCheck, Cpu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useRef } from "react";

interface Project {
  title: string;
  description: string;
  longDescription?: string;
  features?: string[];
  tags: string[];
  githubUrl?: string;
  githubUrl2?: string;
  demoUrl?: string;
  imageUrl?: string;
  slug: string;
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function ProjectDetailClient({ slug }: { slug: string }) {
  const { t } = useLanguage();

  // Find project in the current language dictionary
  const project = (t.projects.items as Project[]).find((p) => p.slug === slug);
  if (!project) return notFound();

  return (
    <div style={{ background: "#050505", color: "#E8DCC8", paddingTop: "76px", minHeight: "100vh" }}>
      {/* ── BACK BUTTON ── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.5rem 2rem 1.5rem" }}>
        <Link
          href="/proyek"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "#C9A96E",
            textDecoration: "none",
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.3s ease",
            padding: "0.5rem 1rem",
            borderRadius: "9999px",
            border: "1px solid rgba(201,169,110,0.2)",
            background: "rgba(10,10,10,0.5)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "#C9A96E";
            (e.currentTarget as HTMLElement).style.background = "rgba(201,169,110,0.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,169,110,0.2)";
            (e.currentTarget as HTMLElement).style.background = "rgba(10,10,10,0.5)";
          }}
        >
          <ArrowLeft style={{ width: "15px", height: "15px" }} />
          {t.projects.backBtn || "Kembali ke Semua Proyek"}
        </Link>
      </div>

      {/* ── HERO BANNER ── */}
      <Reveal>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem 3rem" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "21/9",
              borderRadius: "16px",
              overflow: "hidden",
              background: "#0a0a0a",
              border: "1px solid rgba(201,169,110,0.2)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
            }}
          >
            {project.imageUrl ? (
              <Image src={project.imageUrl} alt={project.title} fill style={{ objectFit: "cover" }} priority />
            ) : (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "radial-gradient(circle at center, rgba(201,169,110,0.08), transparent)",
                }}
              >
                <p style={{ fontFamily: "'Space Mono', monospace", color: "rgba(201,169,110,0.5)", letterSpacing: "0.15em", fontSize: "0.9rem", textTransform: "uppercase" }}>
                  Enterprise Architecture Specification
                </p>
              </div>
            )}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.2) 60%)" }} />

            {/* Live production tag if available */}
            {project.demoUrl && (
              <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", zIndex: 10 }}>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    color: "#22c55e",
                    background: "rgba(5,5,5,0.9)",
                    border: "1px solid rgba(34,197,94,0.4)",
                    backdropFilter: "blur(12px)",
                    padding: "0.45rem 1rem",
                    borderRadius: "9999px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    textTransform: "uppercase",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.6)",
                  }}
                >
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  {t.projects.liveBadge || "Production Live"}
                </span>
              </div>
            )}
          </div>
        </div>
      </Reveal>

      {/* ── PROJECT DETAILS ── */}
      <section style={{ maxWidth: "1050px", margin: "0 auto", padding: "0 2rem 10rem" }}>
        <Reveal delay={0.15}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "1.5rem" }}>
            {project.tags.map((tag, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.68rem",
                  letterSpacing: "0.1em",
                  color: "#C9A96E",
                  padding: "0.4rem 0.95rem",
                  border: "1px solid rgba(201,169,110,0.3)",
                  background: "rgba(201,169,110,0.06)",
                  borderRadius: "9999px",
                  textTransform: "uppercase",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2.5rem, 5.5vw, 4.4rem)",
              fontWeight: 700,
              lineHeight: 1.08,
              color: "#E8DCC8",
              marginBottom: "2rem",
            }}
          >
            {project.title}
          </h1>
        </Reveal>

        {/* Action Buttons */}
        <Reveal delay={0.2}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "4rem" }}>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cream magnetic-btn"
                style={{ padding: "0.9rem 2.2rem", fontSize: "0.82rem" }}
              >
                <ExternalLink style={{ width: "16px", height: "16px" }} /> {t.projects.viewDemo || "Kunjungi Live Demo"}
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline magnetic-btn"
                style={{ padding: "0.9rem 2.2rem", fontSize: "0.82rem" }}
              >
                <GitBranch style={{ width: "16px", height: "16px" }} /> {t.projects.viewCode || "Lihat Kode (GitHub)"}
              </a>
            )}
            {project.githubUrl2 && (
              <a
                href={project.githubUrl2}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline magnetic-btn"
                style={{ padding: "0.9rem 2.2rem", fontSize: "0.82rem" }}
              >
                <GitBranch style={{ width: "16px", height: "16px" }} /> {t.projects.viewBackend || "Kode Backend (GitHub)"}
              </a>
            )}
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3.5rem" }}>
          {/* Main Description */}
          <Reveal delay={0.25}>
            <div
              style={{
                background: "rgba(12,12,12,0.6)",
                border: "1px solid rgba(232,220,200,0.08)",
                borderRadius: "14px",
                padding: "2.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.2rem" }}>
                <Cpu style={{ width: "18px", height: "18px", color: "#C9A96E" }} />
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.2em", color: "#C9A96E", textTransform: "uppercase" }}>
                  {t.projects.overview || "Tinjauan Proyek & Arsitektur"}
                </p>
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  textAlign: "justify",
                  fontSize: "1.1rem",
                  color: "#A89F91",
                  lineHeight: 1.9,
                }}
              >
                {project.longDescription || project.description}
              </p>
            </div>
          </Reveal>

          {/* Key Features & Architecture Breakdown */}
          {project.features && project.features.length > 0 && (
            <Reveal delay={0.3}>
              <div
                style={{
                  background: "rgba(12,12,12,0.6)",
                  border: "1px solid rgba(232,220,200,0.08)",
                  borderRadius: "14px",
                  padding: "2.5rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.8rem" }}>
                  <ShieldCheck style={{ width: "18px", height: "18px", color: "#C9A96E" }} />
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.2em", color: "#C9A96E", textTransform: "uppercase" }}>
                    {t.projects.keyFeatures || "Fitur Unggulan & Implementasi Teknis"}
                  </p>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
                  {project.features.map((feature, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "1rem",
                        padding: "1rem",
                        background: "rgba(5,5,5,0.4)",
                        borderRadius: "8px",
                        border: "1px solid rgba(232,220,200,0.04)",
                      }}
                    >
                      <CheckCircle2 style={{ width: "20px", height: "20px", color: "#C9A96E", flexShrink: 0, marginTop: "2px" }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#E8DCC8", lineHeight: 1.6 }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          {/* Bottom Back & Contact CTA */}
          <Reveal delay={0.35}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1.5rem",
                borderTop: "1px solid rgba(232,220,200,0.08)",
                paddingTop: "2.5rem",
              }}
            >
              <Link
                href="/proyek"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "#C9A96E",
                  textDecoration: "none",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                <ArrowLeft style={{ width: "16px", height: "16px" }} />
                {t.projects.backBtn || "Kembali ke Semua Proyek"}
              </Link>
              <Link href="/kontak" className="btn-cream magnetic-btn" style={{ padding: "0.85rem 1.8rem", fontSize: "0.78rem" }}>
                {t.hero.contact}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
