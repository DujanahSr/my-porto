"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, GitBranch, CheckCircle2, ShieldCheck, Cpu, FileCode, GitFork, Server, Activity } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useRef } from "react";
import { Microservices3DTopology } from "@/components/3d/Microservices3DTopology";
import { RegarStoreStressSimulator } from "@/components/simulator/RegarStoreStressSimulator";
import { RowLockingVisualizer } from "@/components/simulator/RowLockingVisualizer";

export interface ProjectBranch {
  name: string;
  role: string;
  desc: string;
  url?: string;
}

export interface Project {
  title: string;
  description: string;
  longDescription?: string;
  features?: string[];
  tags: string[];
  githubUrl?: string;
  githubUrl2?: string;
  demoUrl?: string;
  swaggerUrl?: string;
  branches?: ProjectBranch[];
  testMetric?: string;
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
                  <span className="inline-flex items-center gap-[2.5px] h-3 mr-0.5" aria-hidden="true">
                    <motion.span
                      animate={{ height: ["4px", "12px", "4px"], opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                      className="w-[2px] rounded-full bg-[#22c55e]"
                    />
                    <motion.span
                      animate={{ height: ["11px", "3px", "11px"], opacity: [1, 0.4, 1] }}
                      transition={{ repeat: Infinity, duration: 0.95, ease: "easeInOut", delay: 0.15 }}
                      className="w-[2px] rounded-full bg-[#22c55e]"
                    />
                    <motion.span
                      animate={{ height: ["5px", "13px", "5px"], opacity: [0.6, 1, 0.6] }}
                      transition={{ repeat: Infinity, duration: 1.35, ease: "easeInOut", delay: 0.3 }}
                      className="w-[2px] rounded-full bg-[#22c55e]"
                    />
                  </span>
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
            {project.swaggerUrl && (
              <a
                href={project.swaggerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline magnetic-btn"
                style={{
                  padding: "0.9rem 2.2rem",
                  fontSize: "0.82rem",
                  borderColor: "rgba(56,189,248,0.45)",
                  color: "#38bdf8",
                  background: "rgba(56,189,248,0.08)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.55rem",
                  boxShadow: "0 0 25px rgba(56,189,248,0.15)",
                }}
              >
                <FileCode style={{ width: "16px", height: "16px" }} />
                <span>Swagger API Docs (Live)</span>
                <span className="font-mono text-[0.75rem] text-[#38bdf8] font-bold tracking-tight inline-flex items-center ml-1" aria-hidden="true">
                  <span>›</span>
                  <motion.span
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{ repeat: Infinity, duration: 0.9, times: [0, 0.5, 0.51, 1] }}
                  >_</motion.span>
                </span>
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

          {/* Automated Test Suite & Reliability */}
          {project.testMetric && (
            <Reveal delay={0.28}>
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(12,12,12,0.85) 100%)",
                  border: "1px solid rgba(34,197,94,0.3)",
                  borderRadius: "14px",
                  padding: "1.75rem 2.5rem",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1.5rem",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "10px",
                      background: "rgba(34,197,94,0.15)",
                      border: "1px solid rgba(34,197,94,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#22c55e",
                    }}
                  >
                    <Activity style={{ width: "22px", height: "22px" }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.15em", color: "#22c55e", textTransform: "uppercase" }}>
                      Quality &amp; Test Suite Assurance
                    </p>
                    <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.45rem", fontWeight: 700, color: "#E8DCC8", margin: "0.2rem 0 0" }}>
                      {project.testMetric}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      color: "#22c55e",
                      background: "rgba(34,197,94,0.12)",
                      border: "1px solid rgba(34,197,94,0.35)",
                      padding: "0.3rem 0.75rem",
                      borderRadius: "6px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.45rem",
                      textTransform: "uppercase",
                    }}
                  >
                    <span>✓</span> 94/94 SUITE VERIFIED
                  </span>
                </div>
              </div>
            </Reveal>
          )}

          {/* Interactive 3D Architecture Topology & Load Simulators */}
          {slug === "regarstore" && (
            <>
              <Reveal delay={0.28}>
                <Microservices3DTopology />
              </Reveal>
              <Reveal delay={0.29}>
                <RegarStoreStressSimulator />
              </Reveal>
            </>
          )}

          {slug === "stokkita" && (
            <Reveal delay={0.28}>
              <RowLockingVisualizer />
            </Reveal>
          )}

          {/* Branch & Deployment Infrastructure Breakdown */}
          {project.branches && project.branches.length > 0 && (
            <Reveal delay={0.29}>
              <div
                style={{
                  background: "rgba(12,12,12,0.6)",
                  border: "1px solid rgba(232,220,200,0.08)",
                  borderRadius: "14px",
                  padding: "2.5rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
                  <GitFork style={{ width: "18px", height: "18px", color: "#C9A96E" }} />
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.2em", color: "#C9A96E", textTransform: "uppercase" }}>
                    Arsitektur Branch &amp; Konfigurasi Deployment
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.branches.map((b, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -4, borderColor: "rgba(201,169,110,0.4)" }}
                      style={{
                        padding: "1.5rem",
                        background: "rgba(5,5,5,0.6)",
                        border: "1px solid rgba(232,220,200,0.08)",
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.85rem" }}>
                          <span
                            style={{
                              fontFamily: "'Space Mono', monospace",
                              fontSize: "0.72rem",
                              fontWeight: 700,
                              color: "#C9A96E",
                              background: "rgba(201,169,110,0.12)",
                              border: "1px solid rgba(201,169,110,0.3)",
                              padding: "0.3rem 0.75rem",
                              borderRadius: "6px",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.4rem",
                            }}
                          >
                            <GitBranch style={{ width: "13px", height: "13px" }} />
                            branch: {b.name}
                          </span>
                          <span
                            style={{
                              fontFamily: "'Space Mono', monospace",
                              fontSize: "0.6rem",
                              color: "#8A8078",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                            }}
                          >
                            {b.role}
                          </span>
                        </div>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem", color: "#A89F91", lineHeight: 1.65 }}>
                          {b.desc}
                        </p>
                      </div>
                      {b.url && (
                        <div style={{ marginTop: "1.25rem", paddingTop: "0.85rem", borderTop: "1px solid rgba(232,220,200,0.06)" }}>
                          <a
                            href={b.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontFamily: "'Space Mono', monospace",
                              fontSize: "0.68rem",
                              color: "#C9A96E",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.4rem",
                              textDecoration: "none",
                            }}
                            className="hover:underline"
                          >
                            Buka Branch di GitHub <ArrowRight style={{ width: "12px", height: "12px" }} />
                          </a>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

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
