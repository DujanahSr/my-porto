"use client";

import { motion, useInView } from "framer-motion";
import { Mail, MapPin, GitBranch, ArrowRight, Phone, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useRef, useState } from "react";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}>
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

    // Construct a prefilled WhatsApp or mailto dispatch
    const encodedMsg = encodeURIComponent(
      `Halo Abu Dujanah Siregar,\n\nNama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`
    );
    
    // Automatically trigger mailto link
    const mailtoUrl = `mailto:abudujanahsiregar@gmail.com?subject=Inquiry from Portfolio - ${encodeURIComponent(formData.name)}&body=${encodedMsg}`;
    window.open(mailtoUrl, "_blank");

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 4000);
  };

  const contactItems = [
    {
      icon: <Mail style={{ width: "18px", height: "18px" }} />,
      label: t.contact.labels.email,
      value: "abudujanahsiregar@gmail.com",
      href: "mailto:abudujanahsiregar@gmail.com"
    },
    {
      icon: <Phone style={{ width: "18px", height: "18px" }} />,
      label: t.contact.labels.phone,
      value: "+62 851-8726-0781 (WhatsApp)",
      href: "https://wa.me/6285187260781"
    },
    {
      icon: <MapPin style={{ width: "18px", height: "18px" }} />,
      label: t.contact.labels.location,
      value: t.contact.locationDesc || "Bandung, Jawa Barat, Indonesia",
      href: null
    },
    {
      icon: <GitBranch style={{ width: "18px", height: "18px" }} />,
      label: t.contact.labels.github,
      value: "github.com/DujanahSr",
      href: "https://github.com/DujanahSr"
    },
    {
      icon: (
        <svg style={{ width: "18px", height: "18px" }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      label: t.contact.labels.linkedin,
      value: "linkedin.com/in/abudujanahsiregar",
      href: "https://www.linkedin.com/in/abudujanahsiregar"
    },
  ];

  return (
    <div style={{ background: "#050505", color: "#E8DCC8", paddingTop: "76px", minHeight: "100vh" }}>

      {/* ── GHOST HEADER ── */}
      <div style={{ position: "relative", overflow: "hidden", paddingTop: "4rem", paddingBottom: "2rem" }}>
        <div className="ghost-text" style={{ position: "absolute", top: "0", left: "50%", transform: "translateX(-50%)", zIndex: 0 }}>
          {t.contact.header.ghost}
        </div>

        {/* Page Header */}
        <div className="max-w-350 mx-auto px-6 md:px-10 pt-12 relative z-10">
          <Reveal>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "1rem" }}>
              {t.contact.header.label}
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.6rem, 7.5vw, 6.5rem)", fontWeight: 700, lineHeight: 0.95, color: "#E8DCC8" }}>
              {t.contact.title}
            </h1>
          </Reveal>
        </div>

        {/* Main Content */}
        <div className="max-w-350 mx-auto px-6 md:px-10 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* LEFT: Interactive Message Form */}
            <Reveal>
              <div
                style={{
                  background: "rgba(12,12,12,0.7)",
                  border: "1px solid rgba(232,220,200,0.08)",
                  borderRadius: "16px",
                  padding: "2.5rem md:padding-3rem",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
                }}
              >
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                  <div>
                    <label style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", color: "#C9A96E", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                      {t.contact.nameLabel || "Nama"}
                    </label>
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
                    <label style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", color: "#C9A96E", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                      {t.contact.emailLabel || "Email"}
                    </label>
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
                    <label style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", color: "#C9A96E", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                      {t.contact.messageLabel || "Pesan"}
                    </label>
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

                  <div style={{ paddingTop: "1rem" }}>
                    {submitted ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          padding: "1rem 2rem",
                          border: "1px solid rgba(201,169,110,0.5)",
                          background: "rgba(201,169,110,0.1)",
                          borderRadius: "9999px",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <CheckCircle2 style={{ width: "16px", height: "16px", color: "#C9A96E" }} />
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.15em", color: "#C9A96E", textTransform: "uppercase" }}>
                          {t.contact.successMsg}
                        </span>
                      </motion.div>
                    ) : (
                      <button
                        type="submit"
                        className="btn-cream magnetic-btn"
                        style={{ width: "100%", justifyContent: "center" }}
                      >
                        {t.contact.sendBtn} <ArrowRight style={{ width: "15px", height: "15px" }} />
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </Reveal>

            {/* RIGHT: Direct Contact Info & Channels */}
            <Reveal delay={0.2}>
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.08rem", lineHeight: 1.85, color: "#9E948A", marginBottom: "3rem" }}>
                  {t.contact.description}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                  {contactItems.map((item) => (
                    <motion.div
                      key={item.label}
                      whileHover={{ x: 6 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1.25rem",
                        padding: "1.25rem 1.5rem",
                        background: "rgba(12,12,12,0.6)",
                        border: "1px solid rgba(232,220,200,0.06)",
                        borderRadius: "12px",
                      }}
                      className="hover:border-[rgba(201,169,110,0.35)] transition-colors duration-300"
                    >
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          flexShrink: 0,
                          border: "1px solid rgba(201,169,110,0.3)",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#C9A96E",
                          background: "rgba(201,169,110,0.06)",
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.15em", color: "#8A8078", textTransform: "uppercase", marginBottom: "0.2rem" }}>
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "1rem",
                              fontWeight: 500,
                              color: "#E8DCC8",
                              textDecoration: "none",
                              transition: "color 0.2s",
                            }}
                            className="hover:text-[#C9A96E]"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#E8DCC8", margin: 0 }}>
                            {item.value}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </div>
    </div>
  );
}
