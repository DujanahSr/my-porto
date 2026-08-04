"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ExternalLink, GitBranch, CheckCircle2 } from "lucide-react";
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
  
  // Find project
  const project = (t.projects.items as Project[]).find((p) => p.slug === slug);
  if (!project) return notFound();

  return (
    <div style={{ background: "#050505", color: "#E8DCC8", paddingTop: "72px", minHeight: "100vh" }}>
      {/* ── BACK BUTTON ── */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem 2.5rem 1rem" }}>
        <Link href="/proyek" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#C9A96E", textDecoration: "none", fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "none", transition: "color 0.3s" }}>
          <ArrowLeft style={{ width: "16px", height: "16px" }} />
          Kembali ke Semua Proyek
        </Link>
      </div>

      {/* ── HERO IMAGE ── */}
      <Reveal>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem 4rem" }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "21/9", borderRadius: "16px", overflow: "hidden", background: "linear-gradient(135deg, #0a0a0a, #1a1a1a)", border: "1px solid rgba(232,220,200,0.08)" }}>
            {project.imageUrl ? (
              <Image src={project.imageUrl} alt={project.title} fill style={{ objectFit: "cover" }} priority />
            ) : (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(circle at center, rgba(201,169,110,0.05), transparent)" }}>
                <p style={{ fontFamily: "'Space Mono', monospace", color: "rgba(201,169,110,0.4)", letterSpacing: "0.15em", fontSize: "1rem", textTransform: "uppercase" }}>
                  ✦ Image Pending / Placeholder
                </p>
              </div>
            )}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,5,0.8) 0%, transparent 40%)" }} />
          </div>
        </div>
      </Reveal>

      {/* ── PROJECT DETAILS ── */}
      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 2.5rem 10rem" }}>
        <Reveal delay={0.2}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 700, lineHeight: 1.1, color: "#E8DCC8", marginBottom: "1.5rem" }}>
            {project.title}
          </h1>
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "3rem" }}>
            {project.tags.map((tag, i) => (
              <span key={i} style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", color: "#6B6560", padding: "0.4rem 1rem", border: "1px solid rgba(232,220,200,0.1)", borderRadius: "9999px", textTransform: "uppercase" }}>
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem" }}>
          {/* Main Description */}
          <Reveal delay={0.3}>
            <div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.2em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "1rem" }}>
                Tinjauan Proyek
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", textAlign: "justify", hyphens: "auto", WebkitHyphens: "auto", msHyphens: "auto", wordBreak: "break-word", fontSize: "1.1rem", color: "#8A8078", lineHeight: 1.9, marginBottom: "2rem" }}>
                {project.longDescription || project.description}
              </p>
            </div>
          </Reveal>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <Reveal delay={0.4}>
              <div style={{ background: "rgba(10,10,10,0.5)", border: "1px solid rgba(232,220,200,0.05)", borderRadius: "12px", padding: "2.5rem" }}>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.2em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                  Fitur Unggulan
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
                  {project.features.map((feature, idx) => (
                    <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                      <CheckCircle2 style={{ width: "20px", height: "20px", color: "#C9A96E", flexShrink: 0, marginTop: "2px" }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", textAlign: "justify", hyphens: "auto", WebkitHyphens: "auto", msHyphens: "auto", wordBreak: "break-word", fontSize: "0.95rem", color: "#E8DCC8", lineHeight: 1.6 }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          {/* Action Links */}
          <Reveal delay={0.5}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginTop: "2rem" }}>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-cream magnetic-btn" style={{ padding: "1rem 2rem", fontSize: "0.8rem" }}>
                  <GitBranch style={{ width: "16px", height: "16px" }} /> Lihat Kode (GitHub)
                </a>
              )}
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-cream magnetic-btn" style={{ padding: "1rem 2rem", fontSize: "0.8rem", background: "transparent", color: "#E8DCC8", border: "1px solid rgba(232,220,200,0.2)" }}>
                  <ExternalLink style={{ width: "16px", height: "16px" }} /> Kunjungi Live Demo
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
