"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, GitBranch, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ProjectGrid3DCard } from "@/components/Project3DCard";

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
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
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
              <ProjectGrid3DCard
                key={project.slug}
                project={project}
                index={idx}
                overviewText={t.projects.overview || "Lihat Arsitektur"}
                onCardClick={() => router.push(`/proyek/${project.slug}`)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
