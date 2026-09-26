"use client";

import { motion, useInView } from "framer-motion";
import { Mail, MapPin, GitBranch, ArrowRight, Phone, Send, CheckCircle2, MessageSquare } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useRef, useState } from "react";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 48 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}>
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

    const encodedMsg = encodeURIComponent(
      `Halo Abu Dujanah Siregar,\n\nNama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`
    );
    
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
      value: "linkedin.com/in/abu-dujanah-siregar-64aa493a2",
      href: "https://www.linkedin.com/in/abu-dujanah-siregar-64aa493a2/"
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
            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.6rem, 7vw, 6.2rem)", fontWeight: 700, lineHeight: 0.95, color: "#E8DCC8" }}>
              {t.contact.title}
            </h1>
          </Reveal>
        </div>

        {/* Main Content */}
        <div className="max-w-350 mx-auto px-6 md:px-10 py-12 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-start">

            {/* LEFT: Luxurious Modern Message Form */}
            <Reveal>
              <div
                style={{
                  background: "rgba(12,12,12,0.85)",
                  border: "1px solid rgba(201,169,110,0.2)",
                  borderRadius: "20px",
                  padding: "2.5rem 2rem",
                  boxShadow: "0 25px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(201,169,110,0.15)",
                }}
              >
                <div style={{ marginBottom: "2rem" }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.15em", color: "#C9A96E", textTransform: "uppercase" }}>
                    Formulir Komunikasi
                  </span>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.8rem", fontWeight: 700, color: "#E8DCC8", marginTop: "0.25rem" }}>
                    Kirimkan Pesan Langsung
                  </h3>
                </div>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div>
                    <label style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", color: "#C9A96E", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                      {t.contact.nameLabel || "Nama Lengkap"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Masukkan nama Anda..."
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-modern"
                    />
                  </div>

                  <div>
                    <label style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", color: "#C9A96E", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                      {t.contact.emailLabel || "Alamat Email"}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="nama@perusahaan.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-modern"
                    />
                  </div>

                  <div>
                    <label style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", color: "#C9A96E", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                      {t.contact.messageLabel || "Pesan atau Detail Tawaran"}
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tuliskan pesan, tawaran kolaborasi, atau pertanyaan teknis Anda..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="input-modern"
                      style={{ resize: "none" }}
                    />
                  </div>

                  <div style={{ paddingTop: "0.5rem" }}>
                    {submitted ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          padding: "1rem 2rem",
                          border: "1px solid rgba(201,169,110,0.5)",
                          background: "rgba(201,169,110,0.12)",
                          borderRadius: "9999px",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.6rem",
                        }}
                      >
                        <CheckCircle2 style={{ width: "18px", height: "18px", color: "#C9A96E" }} />
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.12em", color: "#C9A96E", textTransform: "uppercase" }}>
                          {t.contact.successMsg}
                        </span>
                      </motion.div>
                    ) : (
                      <button
                        type="submit"
                        className="btn-cream magnetic-btn"
                        style={{ width: "100%", justifyContent: "center", padding: "1.1rem" }}
                      >
                        <Send style={{ width: "16px", height: "16px" }} />
                        {t.contact.sendBtn}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </Reveal>

            {/* RIGHT: Direct Contact Info & Channels */}
            <Reveal delay={0.2}>
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.08rem", lineHeight: 1.85, color: "#A89F91", marginBottom: "2.5rem" }}>
                  {t.contact.description}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {contactItems.map((item) => (
                    <motion.div
                      key={item.label}
                      whileHover={{ x: 6, borderColor: "rgba(201,169,110,0.4)" }}
                      transition={{ duration: 0.2 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1.25rem",
                        padding: "1.2rem 1.4rem",
                        background: "rgba(14,14,14,0.7)",
                        border: "1px solid rgba(232,220,200,0.08)",
                        borderRadius: "14px",
                      }}
                    >
                      <div
                        style={{
                          width: "46px",
                          height: "46px",
                          flexShrink: 0,
                          border: "1px solid rgba(201,169,110,0.3)",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#C9A96E",
                          background: "rgba(201,169,110,0.08)",
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
                              fontSize: "0.98rem",
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
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.98rem", color: "#E8DCC8", margin: 0 }}>
                            {item.value}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Instant Messaging Action */}
                <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <a
                    href="https://wa.me/6285187260781"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline magnetic-btn"
                    style={{ padding: "0.85rem 1.6rem", fontSize: "0.78rem" }}
                  >
                    <MessageSquare style={{ width: "15px", height: "15px" }} /> WhatsApp Langsung
                  </a>
                  <a
                    href="mailto:abudujanahsiregar@gmail.com"
                    className="btn-outline magnetic-btn"
                    style={{ padding: "0.85rem 1.6rem", fontSize: "0.78rem" }}
                  >
                    <Mail style={{ width: "15px", height: "15px" }} /> Email Langsung
                  </a>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </div>
    </div>
  );
}
