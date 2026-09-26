"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const pathname = usePathname();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const { lang, setLang, t } = useLanguage();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    setScrolled(latest > 50);
    if (latest > previous && latest > 220) {
      setHidden(true);
      setLangOpen(false);
      setMobileMenuOpen(false);
    } else {
      setHidden(false);
    }
  });

  const links = [
    { name: t.nav.home,         path: "/" },
    { name: t.nav.about,        path: "/tentang" },
    { name: t.nav.projects,     path: "/proyek" },
    { name: t.nav.certificates, path: "/sertifikat" },
    { name: t.nav.contact,      path: "/kontak" },
  ];

  return (
    <>
      <motion.nav
        variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: -90, opacity: 0 } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          borderBottom: scrolled ? "1px solid rgba(201,169,110,0.15)" : "1px solid rgba(232,220,200,0.04)",
          background: scrolled
            ? "rgba(5, 5, 5, 0.94)"
            : "linear-gradient(to bottom, rgba(5, 5, 5, 0.88) 0%, rgba(5, 5, 5, 0.5) 60%, transparent 100%)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
          boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.6)" : "none",
          transition: "background 0.5s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.5s ease, box-shadow 0.5s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 2rem",
            height: "76px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1.65rem",
              fontWeight: 700,
              color: "#E8DCC8",
              letterSpacing: "0.06em",
              textDecoration: "none",
              textShadow: "0 2px 8px rgba(0,0,0,0.8)",
              display: "inline-flex",
              alignItems: "baseline",
            }}
          >
            Dujanah<span style={{ color: "#C9A96E", fontSize: "1.8rem", marginLeft: "2px" }}>.</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-9">
            {links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className="group"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.74rem",
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: isActive ? "#C9A96E" : "rgba(232, 220, 200, 0.78)",
                    textDecoration: "none",
                    position: "relative",
                    padding: "0.4rem 0.2rem",
                    transition: "color 0.3s ease, text-shadow 0.3s ease",
                    textShadow: isActive
                      ? "0 0 12px rgba(201,169,110,0.4), 0 2px 6px rgba(0,0,0,0.9)"
                      : "0 1px 4px rgba(0,0,0,0.95)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "rgba(232, 220, 200, 0.78)";
                  }}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      style={{
                        position: "absolute",
                        bottom: -2,
                        left: 0,
                        width: "100%",
                        height: "2px",
                        background: "linear-gradient(90deg, #C9A96E, #E8DCC8)",
                        boxShadow: "0 0 8px rgba(201,169,110,0.7)",
                        borderRadius: "2px",
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action: Language Selector & Mobile Menu Button */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                aria-label="Toggle language"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.42rem 0.95rem",
                  border: "1px solid rgba(201,169,110,0.3)",
                  borderRadius: "9999px",
                  background: "rgba(10, 10, 10, 0.6)",
                  backdropFilter: "blur(10px)",
                  color: "#E8DCC8",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.68rem",
                  letterSpacing: "0.12em",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#C9A96E";
                  (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,169,110,0.3)";
                  (e.currentTarget as HTMLElement).style.color = "#E8DCC8";
                }}
              >
                <Globe style={{ width: "12px", height: "12px", color: "#C9A96E" }} />
                <span>{lang.toUpperCase()}</span>
                <ChevronDown style={{ width: "10px", height: "10px", color: "#C9A96E", opacity: 0.8 }} />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: "absolute",
                      top: "calc(100% + 10px)",
                      right: 0,
                      background: "rgba(15, 15, 15, 0.96)",
                      border: "1px solid rgba(201,169,110,0.25)",
                      borderRadius: "10px",
                      overflow: "hidden",
                      minWidth: "140px",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.85), 0 0 15px rgba(201,169,110,0.1)",
                      backdropFilter: "blur(16px)",
                      zIndex: 110,
                    }}
                  >
                    {[
                      { code: "id", label: "Bahasa Indonesia", flag: "ID" },
                      { code: "en", label: "English (US)", flag: "EN" },
                    ].map((item) => (
                      <button
                        key={item.code}
                        onClick={() => {
                          setLang(item.code as "en" | "id");
                          setLangOpen(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0.8rem 1.1rem",
                          background: lang === item.code ? "rgba(201,169,110,0.12)" : "transparent",
                          color: lang === item.code ? "#C9A96E" : "rgba(232, 220, 200, 0.85)",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.82rem",
                          fontWeight: lang === item.code ? 600 : 400,
                          cursor: "pointer",
                          border: "none",
                          borderBottom: "1px solid rgba(232,220,200,0.04)",
                          transition: "all 0.2s ease",
                          textAlign: "left",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "rgba(201,169,110,0.18)";
                          (e.currentTarget as HTMLElement).style.color = "#C9A96E";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background =
                            lang === item.code ? "rgba(201,169,110,0.12)" : "transparent";
                          (e.currentTarget as HTMLElement).style.color =
                            lang === item.code ? "#C9A96E" : "rgba(232, 220, 200, 0.85)";
                        }}
                      >
                        <span>{item.label}</span>
                        <span
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: "0.6rem",
                            padding: "0.15rem 0.4rem",
                            borderRadius: "4px",
                            background: "rgba(201,169,110,0.15)",
                            color: "#C9A96E",
                          }}
                        >
                          {item.flag}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden items-center justify-center"
              aria-label="Toggle mobile menu"
              style={{
                background: "rgba(15, 15, 15, 0.7)",
                border: "1px solid rgba(201,169,110,0.3)",
                borderRadius: "50%",
                padding: "0.55rem",
                color: "#E8DCC8",
                cursor: "pointer",
                boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
              }}
            >
              {mobileMenuOpen ? <X style={{ width: "18px", height: "18px", color: "#C9A96E" }} /> : <Menu style={{ width: "18px", height: "18px", color: "#E8DCC8" }} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99,
              background: "rgba(5, 5, 5, 0.97)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "5rem 2.5rem",
            }}
          >
            {links.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                    textDecoration: "none",
                    marginBottom: "2rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.85rem",
                      color: pathname === link.path ? "#C9A96E" : "#6B6560",
                      transition: "color 0.3s",
                    }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "2.4rem",
                      fontWeight: 600,
                      color: pathname === link.path ? "#C9A96E" : "#E8DCC8",
                      textShadow: pathname === link.path ? "0 0 15px rgba(201,169,110,0.5)" : "none",
                      transition: "color 0.3s",
                    }}
                  >
                    {link.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
