"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, GitBranch, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  );
}

export default function Proyek() {
  const { t } = useLanguage();
  const router = useRouter();
  const projects: Project[] = t.projects.items;
  const [filter, setFilter] = useState<string>("all");

  const filterTabs = [
    { id: "all", label: t.projects.filterAll || "Semua" },
    { id: "microservices", label: "Enterprise & Microservices" },
    { id: "fullstack", label: "Full-Stack" },
    { id: "backend", label: "Backend & Systems" },
    { id: "frontend", label: "Frontend & UI" },
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === "all") return true;
    if (filter === "microservices") {
      return ["regarstore", "stokkita", "simaka"].includes(p.slug);
    }
    if (filter === "fullstack") {
      return ["regarstore", "stokkita", "simaka", "eventease", "regarsport"].includes(p.slug);
    }
    if (filter === "backend") {
      return ["regarstore", "taskflow-api", "loan-management-api", "pegadaian-cli"].includes(p.slug);
    }
    if (filter === "frontend") {
      return ["flybook", "my-quran", "regarsport"].includes(p.slug);
    }
    return true;
  });

  return (
    <div style={{ background: "#050505", color: "#E8DCC8", paddingTop: "76px", minHeight: "100vh" }}>
      {/* ── GHOST HEADER ── */}
      <div style={{ position: "relative", overflow: "hidden", paddingTop: "4rem", paddingBottom: "2rem" }}>
        <div className="ghost-text" style={{ position: "absolute", top: "0", left: "50%", transform: "translateX(-50%)", zIndex: 0 }}>
          {t.projects.header.ghost}
        </div>
        <div className="max-w-350 mx-auto px-6 md:px-10 pt-12 relative z-10">
          <Reveal>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "1rem" }}>
              {t.projects.header.label}
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.6rem, 7.5vw, 6.5rem)", fontWeight: 700, lineHeight: 0.95, color: "#E8DCC8" }}>
              {t.projects.header.title1}<br />
              <em style={{ color: "#C9A96E", fontStyle: "italic", fontWeight: 300 }}>{t.projects.header.title2}</em>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "#9E948A", marginTop: "1.5rem", maxWidth: "600px", lineHeight: 1.8 }}>
              {t.projects.description}
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── FILTER BUTTONS ── */}
      <div className="max-w-350 mx-auto px-6 md:px-10 pt-8 pb-4">
        <Reveal delay={0.15}>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.68rem",
                  letterSpacing: "0.12em",
                  padding: "0.55rem 1.25rem",
                  borderRadius: "9999px",
                  border: filter === tab.id ? "1px solid #C9A96E" : "1px solid rgba(232,220,200,0.1)",
                  background: filter === tab.id ? "rgba(201,169,110,0.15)" : "rgba(10,10,10,0.6)",
                  color: filter === tab.id ? "#C9A96E" : "rgba(232,220,200,0.7)",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  transition: "all 0.25s ease",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ── GRID CARDS SHOWCASE ── */}
      <section className="max-w-350 mx-auto px-6 md:px-10 py-12 md:py-24">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                style={{ height: "100%" }}
              >
                <div
                  onClick={() => router.push(`/proyek/${project.slug}`)}
                  style={{ textDecoration: "none", display: "block", height: "100%", cursor: "pointer" }}
                >
                  <motion.div
                    whileHover={{ y: -6, borderColor: "rgba(201,169,110,0.4)", boxShadow: "0 15px 35px rgba(0,0,0,0.7), 0 0 20px rgba(201,169,110,0.12)" }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      background: "rgba(12,12,12,0.8)",
                      border: "1px solid rgba(232,220,200,0.08)",
                      borderRadius: "16px",
                      overflow: "hidden",
                    }}
                    className="group"
                  >
                    {/* Thumbnail Image */}
                    <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", overflow: "hidden", background: "#0a0a0a" }}>
                      {project.imageUrl ? (
                        <div style={{ position: "relative", width: "100%", height: "100%" }}>
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "cover" }}
                            className="group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                        </div>
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(circle at center, rgba(201,169,110,0.1), transparent)" }}>
                          <p style={{ fontFamily: "'Space Mono', monospace", color: "rgba(201,169,110,0.4)", letterSpacing: "0.1em", fontSize: "0.75rem", textTransform: "uppercase" }}>
                            ✦ System Architecture
                          </p>
                        </div>
                      )}
                      
                      {/* Gradient Overlay */}
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,12,12,0.95) 0%, transparent 60%)" }} />

                      {/* Live Badge */}
                      {project.demoUrl && (
                        <div style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 10 }}>
                          <span style={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: "0.58rem",
                            letterSpacing: "0.12em",
                            color: "#22c55e",
                            background: "rgba(5,5,5,0.85)",
                            border: "1px solid rgba(34,197,94,0.4)",
                            backdropFilter: "blur(8px)",
                            padding: "0.3rem 0.7rem",
                            borderRadius: "9999px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            textTransform: "uppercase",
                          }}>
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                            Live Demo
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.85rem" }}>
                          <h2
                            style={{
                              fontFamily: "'Cormorant Garamond', Georgia, serif",
                              fontSize: "1.65rem",
                              fontWeight: 700,
                              color: "#E8DCC8",
                              lineHeight: 1.2,
                              margin: 0,
                            }}
                            className="group-hover:text-[#C9A96E] transition-colors duration-300"
                          >
                            {project.title}
                          </h2>
                          <div style={{ color: "#8A8078", transition: "transform 0.3s, color 0.3s", flexShrink: 0, marginLeft: "0.5rem" }} className="group-hover:translate-x-1 group-hover:text-[#C9A96E]">
                            <ArrowRight style={{ width: "20px", height: "20px" }} />
                          </div>
                        </div>

                        <p
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.9rem",
                            color: "#9E948A",
                            lineHeight: 1.6,
                            marginBottom: "1.5rem",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {project.description}
                        </p>
                      </div>

                      {/* Tags & Action Icons */}
                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {project.tags?.slice(0, 4).map((tag, i) => (
                            <span
                              key={i}
                              style={{
                                fontFamily: "'Space Mono', monospace",
                                fontSize: "0.58rem",
                                letterSpacing: "0.08em",
                                color: "#8A8078",
                                padding: "0.25rem 0.65rem",
                                border: "1px solid rgba(232,220,200,0.08)",
                                borderRadius: "9999px",
                                textTransform: "uppercase",
                                background: "rgba(5,5,5,0.4)",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(232,220,200,0.06)", paddingTop: "1rem" }}>
                          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", color: "#C9A96E", textTransform: "uppercase" }}>
                            {t.projects.overview || "Lihat Arsitektur"} →
                          </span>

                          <div style={{ display: "flex", gap: "0.85rem", alignItems: "center" }}>
                            {project.githubUrl && (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  window.open(project.githubUrl, "_blank");
                                }}
                                title="GitHub Repository"
                                style={{
                                  background: "transparent",
                                  border: "none",
                                  color: "#8A8078",
                                  cursor: "pointer",
                                  padding: "0.3rem",
                                  transition: "color 0.2s",
                                }}
                                className="hover:text-[#C9A96E]"
                              >
                                <GitBranch style={{ width: "18px", height: "18px" }} />
                              </button>
                            )}
                            {project.demoUrl && (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  window.open(project.demoUrl, "_blank");
                                }}
                                title="Live Demo"
                                style={{
                                  background: "transparent",
                                  border: "none",
                                  color: "#8A8078",
                                  cursor: "pointer",
                                  padding: "0.3rem",
                                  transition: "color 0.2s",
                                }}
                                className="hover:text-[#C9A96E]"
                              >
                                <ExternalLink style={{ width: "18px", height: "18px" }} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
