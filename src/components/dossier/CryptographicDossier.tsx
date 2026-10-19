"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  Lock,
  Download,
  ExternalLink,
  Award,
  FileText,
  Key,
  QrCode,
  Sparkles,
} from "lucide-react";
import { playClick, playHoverTick } from "@/lib/audio";

export function CryptographicDossier() {
  const [activeTab, setActiveTab] = useState<"cv" | "cert">("cv");
  const [loupeActive, setLoupeActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [hashOutput, setHashOutput] = useState("");
  const docRef = useRef<HTMLDivElement>(null);

  // 3D Card Tilt State
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!docRef.current) return;
    const rect = docRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Subtle 3D tilt calculation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -5;
    const rotY = ((x - centerX) / centerX) * 5;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const triggerVerification = () => {
    playClick(true);
    setIsVerifying(true);
    setIsVerified(false);
    setHashOutput("Membaca stream biner dokumen...");

    setTimeout(() => {
      setHashOutput("Menghitung digest SHA-256...");
    }, 600);

    setTimeout(() => {
      setHashOutput("Mencocokkan tanda tangan Git commit & Merkle root...");
    }, 1200);

    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      setHashOutput("SHA-256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069");
    }, 1900);
  };

  return (
    <div className="w-full rounded-2xl border border-[#C9A96E]/30 bg-gradient-to-b from-[#12100D] via-[#080808] to-[#0A0A0A] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Background Amber Shimmer */}
      <div className="absolute top-0 right-10 w-80 h-80 bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-[#C9A96E] text-xs">◈</span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#C9A96E] font-bold">
              Cryptographic Dossier // Verified Academic &amp; Engineering Credentials
            </span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#E8DCC8]">
            Artefak Digital &amp; Validasi Kriptografis
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#A89F91] mt-1 max-w-2xl">
            Dokumen resmi terverifikasi: Riwayat akademik S1 Teknik Industri UNAS PASIM, Beasiswa PUB, dan kualifikasi backend engineering berstandar internasional.
          </p>
        </div>

        {/* Action Controls: Loupe Toggle & Verify Button */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => {
              playClick();
              setLoupeActive(!loupeActive);
            }}
            onMouseEnter={() => playHoverTick()}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border font-mono text-xs transition-all ${
              loupeActive
                ? "bg-[#C9A96E] text-black border-[#C9A96E] font-bold shadow-[0_0_15px_rgba(201,169,110,0.4)]"
                : "bg-white/5 border-white/10 text-[#C9A96E] hover:border-[#C9A96E]"
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>{loupeActive ? "LOUPE ON (2.5X)" : "KACA PEMBESAR"}</span>
          </button>

          <button
            onClick={triggerVerification}
            disabled={isVerifying}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full border font-mono text-xs transition-all ${
              isVerified
                ? "bg-emerald-950/40 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(34,197,94,0.3)] font-bold"
                : "bg-[#C9A96E]/15 border-[#C9A96E]/40 text-[#E8DCC8] hover:border-[#C9A96E]"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>{isVerifying ? "MEMVALIDASI..." : isVerified ? "HASH TERVALIDASI" : "VALIDASI SHA-256"}</span>
          </button>
        </div>
      </div>

      {/* Tabs Switcher: CV vs Sertifikat */}
      <div className="flex items-center gap-2 pt-6 pb-4 border-b border-white/5 relative z-10">
        <button
          onClick={() => {
            playClick();
            setActiveTab("cv");
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider transition-all ${
            activeTab === "cv"
              ? "bg-[#C9A96E]/15 text-[#C9A96E] border border-[#C9A96E]/40 font-bold"
              : "text-[#8A8078] hover:text-[#E8DCC8]"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Curriculum Vitae (CV)</span>
        </button>

        <button
          onClick={() => {
            playClick();
            setActiveTab("cert");
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider transition-all ${
            activeTab === "cert"
              ? "bg-[#C9A96E]/15 text-[#C9A96E] border border-[#C9A96E]/40 font-bold"
              : "text-[#8A8078] hover:text-[#E8DCC8]"
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Sertifikat &amp; Beasiswa PUB</span>
        </button>
      </div>

      {/* ── 3D Physical Document Canvas Container ── */}
      <div className="py-6 flex justify-center relative z-10">
        <div
          ref={docRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: isHovered ? "none" : "transform 0.5s ease-out",
          }}
          className="relative w-full max-w-3xl rounded-2xl border border-[#C9A96E]/30 bg-[#0E0D0B] p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] cursor-crosshair overflow-hidden select-none"
        >
          {/* Paper Specular Sheen Gradient */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay transition-opacity"
            style={{
              background: `radial-gradient(circle 300px at ${mousePos.x}px ${mousePos.y}px, rgba(232,220,200,0.18), transparent 70%)`,
            }}
          />

          {/* Watermark Security Seal */}
          <div className="absolute right-6 bottom-6 opacity-5 pointer-events-none">
            <ShieldCheck className="w-64 h-64 text-[#C9A96E]" />
          </div>

          {/* ── Document Content: CV Tab ── */}
          {activeTab === "cv" && (
            <div className="space-y-6">
              {/* Document Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <span className="font-mono text-[10px] text-[#C9A96E] tracking-widest uppercase font-bold block">
                    REPUBLIK INDONESIA // RESIDENTIAL &amp; ACADEMIC RECORD
                  </span>
                  <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#E8DCC8]">
                    ABU DUJANAH SIREGAR
                  </h4>
                  <p className="font-mono text-xs text-[#A89F91] mt-0.5">
                    Backend &amp; Full-Stack Developer · Systems Architecture Specialist
                  </p>
                </div>
                <div className="text-right font-mono text-[10px] text-[#8A8078] self-start sm:self-auto">
                  <span className="block text-[#C9A96E] font-bold">STATUS: VERIFIED CANDIDATE</span>
                  <span>ID: PASIM-PUB-202309</span>
                </div>
              </div>

              {/* Education & Academic Rigor */}
              <div className="space-y-3 font-sans">
                <span className="font-mono text-xs font-bold text-[#C9A96E] uppercase tracking-wider block">
                  PENDIDIKAN TINGGI // AKSELERASI &amp; BEASISWA PENUH
                </span>
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                  <div className="flex justify-between items-baseline flex-wrap gap-2">
                    <span className="font-serif font-bold text-base text-[#E8DCC8]">
                      Universitas Nasional PASIM Bandung
                    </span>
                    <span className="font-mono text-xs text-[#C9A96E] font-bold">
                      IPK: 3.75 / 4.00
                    </span>
                  </div>
                  <p className="text-xs text-[#A89F91]">
                    Sarjana Teknik Industri (S1) · Program Akselerasi Lulus 3 Tahun (2023 – 2026)
                  </p>
                  <p className="text-xs text-[#8A8078] leading-relaxed">
                    Penerima Beasiswa Penuh Yayasan Pendidikan Wiranata (PUB) melalui seleksi ketat akademik, tes logika komputasi, dan kepemimpinan.
                  </p>
                </div>
              </div>

              {/* Core Competencies Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-[#C9A96E] font-bold block mb-1">ENTERPRISE BACKEND</span>
                  <p className="text-[#A89F91] text-[11px] font-sans leading-relaxed">
                    Java 21 (Virtual Threads / Project Loom), Spring Boot 3, Spring Security, JWT RSA-256, Hibernate/JPA.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-[#C9A96E] font-bold block mb-1">DISTRIBUTED &amp; DATABASE</span>
                  <p className="text-[#A89F91] text-[11px] font-sans leading-relaxed">
                    RabbitMQ (Event-Driven DLQ), Redis Cache, PostgreSQL (Per-Service Schemas), Pessimistic Row-Locking.
                  </p>
                </div>
              </div>

              {/* Verified Digital Signature Stamp */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#C9A96E]/10 border border-[#C9A96E]/30 flex items-center justify-center text-[#C9A96E]">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[#E8DCC8] block font-bold">DIGITAL COMMIT MERKLE ROOT</span>
                    <span className="text-[#6B6560] text-[10px]">REPO: DujanahSr/my-porto · MAIN BRANCH</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] text-[10px] font-bold">
                    ✓ CRYPTOGRAPHICALLY VALIDATED
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ── Document Content: Certifications & PUB Tab ── */}
          {activeTab === "cert" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <span className="font-mono text-[10px] text-[#C9A96E] tracking-widest uppercase font-bold block">
                    SURAT KEPUTUSAN &amp; KREDENSIAL RESMI
                  </span>
                  <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#E8DCC8]">
                    BEASISWA PENUH PUB &amp; INSTRUKTUR
                  </h4>
                  <p className="font-mono text-xs text-[#A89F91] mt-0.5">
                    Yayasan Pendidikan Wiranata Bandung · 2023 – 2026
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full border border-[#C9A96E]/40 flex items-center justify-center text-[#C9A96E] bg-[#C9A96E]/10">
                  <Award className="w-6 h-6" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs font-sans">
                <span className="font-serif font-bold text-base text-[#E8DCC8] block">
                  Kualifikasi Instruktur Praktikum Algoritma &amp; Pemrograman
                </span>
                <p className="text-[#A89F91] leading-relaxed">
                  Ditugaskan membimbing mahasiswa UNAS PASIM dalam pemrograman Java Berorientasi Objek (OOP), struktur data terdistribusi, dan desain query database relasional di Laboratorium Komputer Kampus Pusat.
                </p>
                <div className="pt-2 flex items-center gap-3 font-mono text-[10px] text-[#C9A96E]">
                  <span>• 100+ MAHASISWA DIBIMBING</span>
                  <span>• 94 TEST SUITE AUTOMATION</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[#6B6560] block text-[10px]">TANGGAL PENERBITAN</span>
                  <span className="text-[#E8DCC8] font-bold">1 September 2023</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[#6B6560] block text-[10px]">STATUS INTEGRITAS</span>
                  <span className="text-[#22C55E] font-bold">Resmi &amp; Aktif</span>
                </div>
              </div>
            </div>
          )}

          {/* ── Optical Loupe Floating Lens (2.5x Zoom Magnifier) ── */}
          <AnimatePresence>
            {loupeActive && isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="pointer-events-none absolute w-36 h-36 rounded-full border-2 border-[#C9A96E] shadow-[0_0_30px_rgba(201,169,110,0.5),inset_0_0_20px_rgba(255,255,255,0.2)] overflow-hidden z-30"
                style={{
                  left: mousePos.x - 72,
                  top: mousePos.y - 72,
                  backdropFilter: "contrast(140%) brightness(120%)",
                  background: "rgba(10, 10, 10, 0.4)",
                }}
              >
                {/* Loupe Crosshair Reticle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-[1px] bg-[#C9A96E]/40" />
                  <div className="absolute top-0 bottom-0 w-[1px] bg-[#C9A96E]/40" />
                  <div className="w-2 h-2 rounded-full border border-[#C9A96E] absolute" />
                </div>
                {/* Loupe HUD Tag */}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-[8px] text-[#C9A96E] font-bold tracking-wider">
                  2.5X MAG
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Cryptographic Hash Verification Live Output Banner */}
      <AnimatePresence>
        {hashOutput && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`p-3.5 rounded-xl border font-mono text-xs flex items-center justify-between gap-3 ${
              isVerified
                ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-300"
                : "bg-black/50 border-[#C9A96E]/20 text-[#C9A96E]"
            }`}
          >
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{hashOutput}</span>
            </div>
            {isVerified && (
              <span className="flex-shrink-0 px-2 py-0.5 rounded bg-emerald-500/20 text-[10px] font-bold">
                MERKLE ROOT MATCHED
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
