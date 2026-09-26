"use client";

import Link from "next/link";
import { GitBranch, ExternalLink, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  const navLinks = [
    { name: t.nav.home,         href: "/" },
    { name: t.nav.about,        href: "/tentang" },
    { name: t.nav.projects,     href: "/proyek" },
    { name: t.nav.certificates, href: "/sertifikat" },
    { name: t.nav.contact,      href: "/kontak" },
  ];

  return (
    <footer style={{ background: "#050505", borderTop: "1px solid rgba(232,220,200,0.08)" }} className="px-6 md:px-10 py-16 md:py-20">
      <div className="max-w-350 mx-auto">
        {/* Top: Logo + Links */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start flex-wrap gap-12 mb-16 text-center md:text-left">
          {/* Logo */}
          <div>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", fontWeight: 700, color: "#E8DCC8", lineHeight: 1 }}>
              Dujanah<span style={{ color: "#C9A96E" }}>.</span>
            </p>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#4A4A4A", textTransform: "uppercase", marginTop: "0.75rem" }}>
              {t.footer.slogan}
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 400,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#6B6560",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 items-center justify-center">
            {[
              { href: "https://github.com/DujanahSr", icon: <GitBranch style={{ width: "18px", height: "18px" }} />, label: "GitHub" },
              { href: "https://www.linkedin.com/in/abu-dujanah-siregar-64aa493a2/", icon: <ExternalLink style={{ width: "18px", height: "18px" }} />, label: "LinkedIn" },
              { href: "mailto:abudujanahsiregar@gmail.com", icon: <Mail style={{ width: "18px", height: "18px" }} />, label: "Email" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "40px", height: "40px",
                  border: "1px solid rgba(232,220,200,0.15)",
                  borderRadius: "50%",
                  color: "#A89F91",
                  textDecoration: "none",
                  transition: "border-color 0.3s, color 0.3s, transform 0.2s",
                  cursor: "pointer",
                }}
                className="hover:border-[#C9A96E] hover:text-[#C9A96E] hover:scale-105"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(232,220,200,0.12), transparent)", marginBottom: "2rem" }} />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", color: "#3A3A3A" }}>
            © {new Date().getFullYear()} Abu Dujanah Siregar. {t.footer.rights}
          </p>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", color: "#3A3A3A" }}>
            Built with Next.js &amp; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
