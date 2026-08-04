"use client";

import { motion, useInView } from "framer-motion";
import { Mail, MapPin, GitBranch, Link2, ArrowRight, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useRef, useState } from "react";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export default function Kontak() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  const contactItems = [
    { icon: <Mail style={{ width: "16px", height: "16px" }} />, label: t.contact.labels.email, value: "abudujanahsiregar@gmail.com", href: "mailto:abudujanahsiregar@gmail.com" },
    { icon: <Phone style={{ width: "16px", height: "16px" }} />, label: t.contact.labels.phone, value: "085187260781", href: "https://wa.me/6285187260781" },
    { icon: <MapPin style={{ width: "16px", height: "16px" }} />, label: t.contact.labels.location, value: t.contact.locationDesc || "Bandung, Indonesia", href: null },
    { icon: <GitBranch style={{ width: "16px", height: "16px" }} />, label: t.contact.labels.github, value: "github.com/DujanahSr", href: "https://github.com/DujanahSr" },
    { icon: <Link2 style={{ width: "16px", height: "16px" }} />, label: t.contact.labels.linkedin, value: "Abu Dujanah Siregar", href: "#" },
  ];

  return (
    <div style={{ background: "#050505", color: "#E8DCC8", paddingTop: "72px", minHeight: "100vh" }}>

      {/* ── GHOST HEADER ── */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div className="ghost-text" style={{ position: "absolute", top: "0.5rem", left: "50%", transform: "translateX(-50%)", zIndex: 0 }}>
          {t.contact.header.ghost}
        </div>

        {/* Page Header */}
        <div className="max-w-350 mx-auto px-6 md:px-10 pt-20 relative z-10">
          <Reveal>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "1rem" }}>
              {t.contact.header.label}
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.5rem, 8vw, 7rem)", fontWeight: 700, lineHeight: 0.95, color: "#E8DCC8" }}>
              {t.contact.title}
            </h1>
          </Reveal>
        </div>

        {/* Main Content */}
        <div className="max-w-350 mx-auto px-6 md:px-10 py-16 md:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">

            {/* LEFT: Form */}
            <Reveal>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                <div>
                  <input
                    type="text"
                    required
                    placeholder={t.contact.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-underline"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder={t.contact.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-underline"
                  />
                </div>
                <div>
                  <textarea
                    required
                    rows={5}
                    placeholder={t.contact.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-underline"
                    style={{ resize: "none" }}
                  />
                </div>
                <div>
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ padding: "1rem 2rem", border: "1px solid rgba(201,169,110,0.3)", borderRadius: "9999px", textAlign: "center" }}
                    >
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.15em", color: "#C9A96E", textTransform: "uppercase" }}>
                        {t.contact.successMsg}
                      </span>
                    </motion.div>
                  ) : (
                    <button type="submit" className="btn-cream magnetic-btn">
                      {t.contact.sendBtn} <ArrowRight style={{ width: "14px", height: "14px" }} />
                    </button>
                  )}
                </div>
              </form>
            </Reveal>

            {/* RIGHT: Contact Info */}
            <Reveal delay={0.2}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", textAlign: "justify", hyphens: "auto", WebkitHyphens: "auto", msHyphens: "auto", wordBreak: "break-word", fontSize: "1.05rem", lineHeight: 1.9, color: "#8A8078", marginBottom: "3rem" }}>
                {t.contact.description}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {contactItems.map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                    {/* Circular icon */}
                    <div style={{
                      width: "44px", height: "44px", flexShrink: 0,
                      border: "1px solid rgba(201,169,110,0.2)",
                      borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#C9A96E",
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#4A4A4A", textTransform: "uppercase", marginBottom: "0.2rem" }}>
                        {item.label}
                      </p>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", textAlign: "justify", hyphens: "auto", WebkitHyphens: "auto", msHyphens: "auto", wordBreak: "break-word", fontSize: "0.95rem", color: "#E8DCC8", textDecoration: "none", cursor: "none", transition: "color 0.3s" }}>
                          {item.value}
                        </a>
                      ) : (
                        <p style={{ fontFamily: "'DM Sans', sans-serif", textAlign: "justify", hyphens: "auto", WebkitHyphens: "auto", msHyphens: "auto", wordBreak: "break-word", fontSize: "0.95rem", color: "#8A8078" }}>{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>


            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
