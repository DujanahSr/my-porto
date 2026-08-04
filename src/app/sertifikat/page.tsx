"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ZoomIn, FileText } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useRef, useState } from "react";

interface Certificate {
  title: string;
  issuer: string;
  year?: string;
  fileUrl?: string;
  description?: string;
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Lightbox Modal for PDF Viewer
function Lightbox({ cert, onClose }: { cert: Certificate; onClose: () => void }) {
  const { t } = useLanguage();
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(5,5,5,0.95)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "2rem",
          cursor: "none",
        }}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            maxWidth: "900px",
            width: "100%",
            border: "1px solid rgba(201,169,110,0.2)",
            borderRadius: "8px",
            overflow: "hidden",
            background: "#0D0D0D",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: "1rem", right: "1rem", zIndex: 10,
              background: "rgba(5,5,5,0.8)", border: "1px solid rgba(232,220,200,0.15)",
              borderRadius: "50%", padding: "0.5rem", color: "#E8DCC8",
              cursor: "pointer", display: "flex",
            }}
          >
            <X style={{ width: "16px", height: "16px" }} />
          </button>

          {/* Document Viewer */}
          {cert.fileUrl ? (
            <div style={{ position: "relative", width: "100%", height: "65vh", background: "#e5e5e5" }}>
              <iframe 
                src={`${cert.fileUrl}#toolbar=0&navpanes=0`} 
                style={{ width: "100%", height: "100%", border: "none" }} 
                title={cert.title} 
              />
            </div>
          ) : (
            <div style={{ padding: "4rem", textAlign: "center" }}>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", color: "#C9A96E", textTransform: "uppercase" }}>{t.certificates.fallback?.certTitle || "Sertifikat"}</p>
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", fontWeight: 700, color: "#E8DCC8", margin: "1rem 0 0.5rem" }}>{cert.title}</h3>
            </div>
          )}

          {/* Info bar */}
          <div style={{ padding: "1.5rem", borderTop: "1px solid rgba(232,220,200,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: "#E8DCC8" }}>{cert.title}</h3>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", color: "#6B6560", textTransform: "uppercase", marginTop: "0.25rem" }}>{cert.issuer}</p>
            </div>
            {cert.year && (
              <div style={{ textAlign: "right" }}>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#6B6560", textTransform: "uppercase" }}>TAHUN</p>
                <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.5rem", fontWeight: 700, color: "#C9A96E", lineHeight: 1 }}>{cert.year}</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Sertifikat() {
  const { t } = useLanguage();
  const certificates: Certificate[] = t.certificates.items;
  const [selected, setSelected] = useState<Certificate | null>(null);

  return (
    <div style={{ background: "#050505", color: "#E8DCC8", paddingTop: "72px", minHeight: "100vh" }}>

      {/* Lightbox */}
      {selected && <Lightbox cert={selected} onClose={() => setSelected(null)} />}

      {/* ── GHOST HEADER ── */}
      <div style={{ position: "relative", overflow: "hidden", paddingTop: "4rem" }}>
        <div className="ghost-text" style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: 0 }}>
          {t.certificates.header.ghost}
        </div>
        <div className="max-w-350 mx-auto px-6 md:px-10 py-12 md:py-24 relative z-10">
          <Reveal>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "1rem" }}>
              {t.certificates.header.label}
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.5rem, 8vw, 7rem)", fontWeight: 700, lineHeight: 0.95, color: "#E8DCC8" }}>
              {t.certificates.title}<br />
              <em style={{ color: "#C9A96E", fontStyle: "italic", fontWeight: 300, fontSize: "0.7em" }}>{t.certificates.description}</em>
            </h1>
          </Reveal>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
            {certificates.map((cert, idx) => (
              <Reveal key={idx} delay={idx * 0.05}>
                <motion.div
                  whileHover={{ y: -6, borderColor: "rgba(201,169,110,0.4)", boxShadow: "0 10px 30px -10px rgba(201,169,110,0.1)" }}
                  onClick={() => setSelected(cert)}
                  style={{
                    border: "1px solid rgba(232,220,200,0.08)",
                    borderRadius: "8px",
                    overflow: "hidden",
                    background: "rgba(10,10,10,0.6)",
                    cursor: "pointer",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                    position: "relative",
                  }}
                >
                  {/* Thumbnail Placeholder for PDF */}
                  <div style={{ position: "relative", aspectRatio: "4/3", background: "linear-gradient(135deg, #0a0a0a, #111)", overflow: "hidden" }}>
                    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                      <div style={{ width: "64px", height: "64px", border: "1px solid rgba(201,169,110,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(201,169,110,0.05)" }}>
                        <FileText style={{ color: "#C9A96E", width: "24px", height: "24px" }} />
                      </div>
                      <div style={{ textAlign: "center" }}>
                         <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#6B6560", textTransform: "uppercase", marginBottom: "0.2rem" }}>Format</p>
                         <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", letterSpacing: "0.1em", color: "#C9A96E", textTransform: "uppercase" }}>DOCUMENT .PDF</p>
                      </div>
                    </div>
                    {/* Hover overlay */}
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "rgba(5,5,5,0.7)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      opacity: 0, transition: "opacity 0.3s",
                    }}
                      className="cert-overlay"
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#C9A96E", fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        <ZoomIn style={{ width: "18px", height: "18px" }} /> {t.certificates.viewCertificate || "Buka Dokumen"}
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: "1.5rem" }}>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.2rem", fontWeight: 700, color: "#E8DCC8", marginBottom: "0.5rem", lineHeight: 1.3 }}>
                      {cert.title}
                    </h3>
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", color: "#6B6560", textTransform: "uppercase", marginBottom: "1rem" }}>
                      {cert.issuer}
                    </p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", textAlign: "justify", hyphens: "auto", WebkitHyphens: "auto", msHyphens: "auto", wordBreak: "break-word", fontSize: "0.85rem", color: "#8A8078", lineHeight: 1.6 }}>
                      {cert.description}
                    </p>
                    {cert.year && (
                      <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", borderTop: "1px solid rgba(232,220,200,0.05)", paddingTop: "1rem" }}>
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: "#4A4A4A", textTransform: "uppercase" }}>Diterbitkan</span>
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#C9A96E" }}>{cert.year}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .cert-overlay { opacity: 0 !important; }
        div:hover > .cert-overlay,
        div:hover .cert-overlay { opacity: 1 !important; }
      `}</style>
    </div>
  );
}
