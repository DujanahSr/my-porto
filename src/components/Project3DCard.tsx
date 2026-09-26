"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, GitBranch } from "lucide-react";

// ─── 1. FEATURED PROJECT CARD (For Homepage Horizontal Showcase) ───────────────
export interface FeaturedWork {
  index: string;
  name: string;
  titleFull: string;
  year: string;
  tags: string[];
  href: string;
  demoUrl?: string;
  githubUrl?: string;
  image: string;
  highlight: string;
}

export function FeaturedProject3DCard({
  work,
  index,
  overviewText = "Detail Proyek",
}: {
  work: FeaturedWork;
  index: number;
  overviewText?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  // Spring physics for smooth tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 280, damping: 24 });
  const mouseYSpring = useSpring(y, { stiffness: 280, damping: 24 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setSpotlightPos({ x: mouseX, y: mouseY });

    // Normalized from -0.5 to 0.5
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 65, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.9,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ perspective: 1200 }}
      className="w-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative rounded-2xl overflow-hidden border border-[#E8DCC8]/10 bg-[#0C0C0C]/85 transition-shadow duration-500 ease-out hover:border-[#C9A96E]/40"
      >
        {/* Dynamic Cursor Spotlight Overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.35s ease",
            background: `radial-gradient(650px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(201,169,110,0.16), transparent 75%)`,
          }}
        />

        {/* Ambient Top Rim Highlight */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 5%, rgba(201,169,110,0.45) 50%, transparent 95%)",
            opacity: isHovered ? 1 : 0.4,
            transition: "opacity 0.4s ease",
            zIndex: 2,
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] items-stretch">
          {/* Left Column: Project Specs */}
          <div
            style={{
              padding: "2.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              transform: "translateZ(25px)",
              transformStyle: "preserve-3d",
              zIndex: 3,
            }}
          >
            <div>
              {/* Header: Index & Badges */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1.25rem",
                  transform: "translateZ(35px)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.72rem",
                    color: "#C9A96E",
                    letterSpacing: "0.15em",
                  }}
                >
                  [{work.index}] · {work.year}
                </span>

                {work.demoUrl && (
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.58rem",
                      letterSpacing: "0.12em",
                      color: "#22c55e",
                      background: "rgba(34,197,94,0.12)",
                      border: "1px solid rgba(34,197,94,0.35)",
                      padding: "0.22rem 0.65rem",
                      borderRadius: "9999px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      textTransform: "uppercase",
                      boxShadow: "0 0 12px rgba(34,197,94,0.2)",
                    }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    Live Demo
                  </span>
                )}
              </div>

              {/* Project Title */}
              <Link href={work.href} style={{ textDecoration: "none" }}>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "clamp(2rem, 3.6vw, 3rem)",
                    fontWeight: 700,
                    color: "#E8DCC8",
                    lineHeight: 1.1,
                    marginBottom: "0.6rem",
                    transition: "color 0.3s ease",
                    transform: "translateZ(30px)",
                  }}
                  className="group-hover:text-[#C9A96E]"
                >
                  {work.name}
                </h3>
              </Link>

              {/* Subtitle / Role */}
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.95rem",
                  color: "#B4AAA0",
                  lineHeight: 1.6,
                  marginBottom: "1rem",
                  transform: "translateZ(20px)",
                }}
              >
                {work.titleFull}
              </p>

              {/* Key Architecture Highlight */}
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  color: "#C9A96E",
                  marginBottom: "1.75rem",
                  lineHeight: 1.55,
                  transform: "translateZ(22px)",
                }}
              >
                {work.highlight}
              </p>
            </div>

            <div>
              {/* Tech Tags */}
              <div
                className="flex flex-wrap gap-2 mb-6"
                style={{ transform: "translateZ(26px)" }}
              >
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.62rem",
                      letterSpacing: "0.08em",
                      color: "#A0988E",
                      padding: "0.3rem 0.75rem",
                      border: "1px solid rgba(232,220,200,0.1)",
                      borderRadius: "9999px",
                      textTransform: "uppercase",
                      background: "rgba(5,5,5,0.6)",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                  transform: "translateZ(32px)",
                }}
              >
                <Link
                  href={work.href}
                  className="btn-cream magnetic-btn"
                  style={{ padding: "0.75rem 1.6rem", fontSize: "0.75rem" }}
                >
                  {overviewText} <ArrowRight style={{ width: "12px", height: "12px" }} />
                </Link>
                {work.demoUrl && (
                  <a
                    href={work.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline magnetic-btn"
                    style={{
                      padding: "0.75rem 1.4rem",
                      fontSize: "0.75rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.45rem",
                    }}
                  >
                    <ExternalLink style={{ width: "13px", height: "13px" }} /> Live Demo
                  </a>
                )}
                {work.githubUrl && (
                  <a
                    href={work.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#8A8078",
                      transition: "color 0.2s",
                      padding: "0.5rem",
                    }}
                    className="hover:text-[#C9A96E]"
                    title="GitHub Repository"
                  >
                    <GitBranch style={{ width: "18px", height: "18px" }} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Parallax Image Preview */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              minHeight: "320px",
              overflow: "hidden",
              background: "#050505",
              transform: "translateZ(20px)",
            }}
          >
            <Link href={work.href} className="block w-full h-full relative">
              <motion.div
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: "relative", width: "100%", height: "100%", minHeight: "320px" }}
              >
                <Image
                  src={work.image}
                  alt={work.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                  priority={index < 2}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 60%, transparent 100%)",
                  }}
                />
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── 2. PROJECT GRID CARD (For /proyek Grid Showcase) ──────────────────────────
export interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  slug: string;
}

export function ProjectGrid3DCard({
  project,
  index,
  overviewText = "Lihat Arsitektur",
  onCardClick,
}: {
  project: ProjectItem;
  index: number;
  overviewText?: string;
  onCardClick?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 280, damping: 24 });
  const mouseYSpring = useSpring(y, { stiffness: 280, damping: 24 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["9deg", "-9deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-9deg", "9deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setSpotlightPos({ x: mouseX, y: mouseY });

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 55, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.85,
        delay: (index % 6) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ perspective: 1200, height: "100%" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onCardClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
        }}
        className="group relative rounded-2xl overflow-hidden border border-[#E8DCC8]/10 bg-[#0C0C0C]/85 transition-all duration-500 ease-out hover:border-[#C9A96E]/45 hover:shadow-[0_25px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(201,169,110,0.15)]"
      >
        {/* Dynamic Cursor Spotlight Overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.35s ease",
            background: `radial-gradient(450px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(201,169,110,0.18), transparent 75%)`,
          }}
        />

        {/* Ambient Top Edge Light */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 5%, rgba(201,169,110,0.45) 50%, transparent 95%)",
            opacity: isHovered ? 1 : 0.35,
            transition: "opacity 0.35s ease",
            zIndex: 2,
          }}
        />

        {/* Top Thumbnail Image */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16/10",
            overflow: "hidden",
            background: "#0a0a0a",
            transform: "translateZ(20px)",
          }}
        >
          {project.imageUrl ? (
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
                className="group-hover:scale-106 transition-transform duration-600 ease-out"
              />
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "radial-gradient(circle at center, rgba(201,169,110,0.12), transparent)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  color: "rgba(201,169,110,0.45)",
                  letterSpacing: "0.12em",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                }}
              >
                Enterprise Architecture
              </p>
            </div>
          )}

          {/* Vignette Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(12,12,12,0.95) 0%, rgba(12,12,12,0.2) 60%, transparent 100%)",
            }}
          />

          {/* Live Badge Floating Above */}
          {project.demoUrl && (
            <div
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                zIndex: 10,
                transform: "translateZ(38px)",
              }}
            >
              <span
                style={{
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
                  boxShadow: "0 0 15px rgba(34,197,94,0.25)",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Live Demo
              </span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div
          style={{
            padding: "1.75rem",
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "space-between",
            transform: "translateZ(26px)",
            transformStyle: "preserve-3d",
            zIndex: 3,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "0.85rem",
                transform: "translateZ(30px)",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.65rem",
                  fontWeight: 700,
                  color: "#E8DCC8",
                  lineHeight: 1.2,
                  margin: 0,
                  transition: "color 0.3s ease",
                }}
                className="group-hover:text-[#C9A96E]"
              >
                {project.title}
              </h2>
              <div
                style={{
                  color: "#8A8078",
                  transition: "transform 0.3s, color 0.3s",
                  flexShrink: 0,
                  marginLeft: "0.5rem",
                }}
                className="group-hover:translate-x-1.5 group-hover:text-[#C9A96E]"
              >
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
                transform: "translateZ(20px)",
              }}
            >
              {project.description}
            </p>
          </div>

          <div>
            {/* Tech Tags */}
            <div
              className="flex flex-wrap gap-1.5 mb-5"
              style={{ transform: "translateZ(24px)" }}
            >
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
                    background: "rgba(5,5,5,0.5)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Bottom Footer Actions */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid rgba(232,220,200,0.06)",
                paddingTop: "1rem",
                transform: "translateZ(28px)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.68rem",
                  color: "#C9A96E",
                  textTransform: "uppercase",
                }}
              >
                {overviewText} →
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
    </motion.div>
  );
}
