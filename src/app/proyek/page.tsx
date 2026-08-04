"use client";

import { motion, useInView } from "framer-motion";
import { ExternalLink, GitBranch, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  githubUrl2?: string;
  demoUrl?: string;
  imageUrl?: string;
  slug: string;
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
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

  return (
    <div style={{ background: "#050505", color: "#E8DCC8", paddingTop: "72px", minHeight: "100vh" }}>
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
            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.5rem, 8vw, 7rem)", fontWeight: 700, lineHeight: 0.95, color: "#E8DCC8" }}>
              {t.projects.header.title1}<br />
              <em style={{ color: "#C9A96E", fontStyle: "italic", fontWeight: 300 }}>{t.projects.header.title2}</em>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", textAlign: "justify", hyphens: "auto", WebkitHyphens: "auto", msHyphens: "auto", wordBreak: "break-word", fontSize: "1rem", color: "#6B6560", marginTop: "2rem", maxWidth: "500px", lineHeight: 1.8 }}>
              {t.projects.description}
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── GRID CARDS (Showcase Style) ── */}
      <section className="max-w-350 mx-auto px-6 md:px-10 py-16 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
          {projects.map((project, idx) => (
            <Reveal key={project.slug} delay={idx * 0.1}>
              <div onClick={() => router.push(`/proyek/${project.slug}`)} style={{ textDecoration: "none", display: "block", height: "100%", cursor: "pointer" }}>
                <motion.div
                  whileHover="hover"
                  initial="initial"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    background: "rgba(10,10,10,0.6)",
                    border: "1px solid rgba(232,220,200,0.08)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    cursor: "none",
                  }}
                >
                  {/* Thumbnail Image */}
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", overflow: "hidden", background: "linear-gradient(135deg, #0a0a0a, #1a1a1a)" }}>
                    {project.imageUrl ? (
                      <motion.div variants={{ hover: { scale: 1.05 } }} transition={{ duration: 0.6 }} style={{ width: "100%", height: "100%" }}>
                        <Image src={project.imageUrl} alt={project.title} fill style={{ objectFit: "cover" }} />
                      </motion.div>
                    ) : (
                      <motion.div 
                        variants={{ hover: { scale: 1.05 } }} 
                        transition={{ duration: 0.6 }} 
                        style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(circle at center, rgba(201,169,110,0.1), transparent)" }}
                      >
                        <p style={{ fontFamily: "'Space Mono', monospace", color: "rgba(201,169,110,0.3)", letterSpacing: "0.1em", fontSize: "0.8rem", textTransform: "uppercase" }}>
                          ✦ Image Pending
                        </p>
                      </motion.div>
                    )}
                    {/* Overlay gradient */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,1) 0%, transparent 60%)" }} />
                  </div>

                  {/* Card Content */}
                  <div style={{ padding: "2rem", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                      <h2 style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "1.75rem",
                        fontWeight: 700,
                        color: "#E8DCC8",
                        lineHeight: 1.2,
                        margin: 0,
                      }}>
                        {project.title}
                      </h2>
                      <motion.div variants={{ hover: { x: 5, color: "#C9A96E" }, initial: { x: 0, color: "#4A4A4A" } }} transition={{ duration: 0.3 }}>
                        <ArrowRight style={{ width: "24px", height: "24px" }} />
                      </motion.div>
                    </div>

                    <p style={{
                      fontFamily: "'DM Sans', sans-serif", textAlign: "justify", hyphens: "auto", WebkitHyphens: "auto", msHyphens: "auto", wordBreak: "break-word",
                      fontSize: "0.9rem",
                      color: "#8A8078",
                      lineHeight: 1.6,
                      marginBottom: "2rem",
                      flex: 1,
                    }}>
                      {project.description}
                    </p>

                    {/* Tech & Links */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags?.slice(0, 3).map((tag, i) => (
                          <span key={i} style={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: "0.6rem", letterSpacing: "0.1em",
                            color: "#6B6560",
                            padding: "0.3rem 0.75rem",
                            border: "1px solid rgba(232,220,200,0.1)",
                            borderRadius: "9999px",
                            textTransform: "uppercase",
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* We disable link bubbling so clicking GitHub doesn't trigger Next.js router for the card */}
                      <div style={{ display: "flex", gap: "1rem" }}>
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.githubUrl, '_blank'); }} style={{ color: "#4A4A4A", transition: "color 0.3s", cursor: "none", zIndex: 10, position: "relative" }}>
                            <motion.div whileHover={{ color: "#C9A96E" }}><GitBranch style={{ width: "20px", height: "20px" }} /></motion.div>
                          </a>
                        )}
                        {project.demoUrl && (
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.demoUrl, '_blank'); }} style={{ color: "#4A4A4A", transition: "color 0.3s", cursor: "none", zIndex: 10, position: "relative" }}>
                            <motion.div whileHover={{ color: "#C9A96E" }}><ExternalLink style={{ width: "20px", height: "20px" }} /></motion.div>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
