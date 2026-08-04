"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X } from "lucide-react";
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
    setScrolled(latest > 60);
    if (latest > previous && latest > 200) {
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
        variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: -80, opacity: 0 } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          borderBottom: scrolled ? "1px solid rgba(232,220,200,0.08)" : "1px solid transparent",
          backgroundColor: scrolled ? "rgba(5,5,5,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          transition: "background-color 0.5s ease, border-color 0.5s ease",
        }}
      >
        <div style={{
          maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem",
          height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>

          {/* Logo */}
          <Link href="/" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.5rem", fontWeight: 700, color: "#E8DCC8", letterSpacing: "0.05em", textDecoration: "none" }}>
            Dujanah<span style={{ color: "#C9A96E" }}>.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: pathname === link.path ? "#C9A96E" : "#6B6560",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                  position: "relative",
                  paddingBottom: "3px",
                }}
              >
                {link.name}
                {pathname === link.path && (
                  <motion.span
                    layoutId="nav-underline"
                    style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "1px", background: "#C9A96E" }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right: Lang + Mobile Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  padding: "0.4rem 0.9rem",
                  border: "1px solid rgba(232,220,200,0.15)",
                  borderRadius: "9999px",
                  background: "transparent",
                  color: "#6B6560",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  cursor: "none",
                }}
              >
                <Globe style={{ width: "11px", height: "11px", color: "#C9A96E" }} />
                {lang.toUpperCase()}
              </button>
              {langOpen && (
                <div style={{
                  position: "absolute", top: "calc(100% + 8px)", right: 0,
                  background: "#0D0D0D", border: "1px solid rgba(232,220,200,0.1)",
                  borderRadius: "8px", overflow: "hidden", minWidth: "120px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
                }}>
                  {["en", "id"].map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l as "en" | "id"); setLangOpen(false); }}
                      style={{
                        display: "block", width: "100%", textAlign: "left",
                        padding: "0.75rem 1.25rem",
                        background: "transparent",
                        color: lang === l ? "#C9A96E" : "#6B6560",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "0.7rem",
                        letterSpacing: "0.1em",
                        cursor: "none", border: "none",
                        transition: "color 0.2s",
                      }}
                    >
                      {l === "en" ? "English" : "Indonesia"}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden items-center justify-center"
              style={{
                background: "transparent",
                border: "1px solid rgba(232,220,200,0.15)",
                borderRadius: "50%", padding: "0.45rem",
                color: "#E8DCC8", cursor: "none",
              }}
            >
              {mobileMenuOpen ? <X style={{ width: "16px", height: "16px" }} /> : <Menu style={{ width: "16px", height: "16px" }} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed", inset: 0, zIndex: 99,
            background: "rgba(5, 5, 5, 0.95)",
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
            display: "flex", flexDirection: "column",
            alignItems: "flex-start", justifyContent: "center",
            padding: "4rem 2.5rem",
          }}
        >
          {links.map((link, i) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "flex", alignItems: "center", gap: "1.5rem",
                  textDecoration: "none",
                  marginBottom: "1.5rem",
                }}
              >
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.85rem",
                  color: pathname === link.path ? "#C9A96E" : "#4A4A4A",
                  transition: "color 0.3s"
                }}>
                  0{i + 1}
                </span>
                <span style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "2.2rem",
                  fontWeight: 500,
                  color: pathname === link.path ? "#C9A96E" : "#E8DCC8",
                  transition: "color 0.3s"
                }}>
                  {link.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
}
