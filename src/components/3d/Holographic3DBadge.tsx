"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, RefreshCw, Sparkles, Terminal, Code2, QrCode, Award } from "lucide-react";
import { playClick, playHoverTick } from "@/lib/audio";

export function Holographic3DBadge() {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt physics motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for fluid 120fps motion inertia
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [14, -14]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), {
    stiffness: 180,
    damping: 22,
  });

  // Glare / Holo sheen highlight coordinates
  const glareX = useTransform(x, [-0.5, 0.5], [10, 90]);
  const glareY = useTransform(y, [-0.5, 0.5], [10, 90]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  const toggleFlip = () => {
    playClick();
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-2 select-none perspective-[1200px]">
      {/* ── Realistic Woven Lanyard Strap with Metal Clip ── */}
      <div className="flex flex-col items-center mb-[-6px] z-20 pointer-events-none">
        {/* Woven Fabric Strap extending upwards */}
        <div className="w-6 h-8 bg-gradient-to-b from-transparent via-[#181614] to-[#121110] border-x border-[#C9A96E]/20 shadow-inner" />
        {/* Precision Metal Lanyard Swivel Clip */}
        <div className="w-8 h-3.5 rounded-t-sm bg-gradient-to-r from-[#8A7445] via-[#E5C98E] to-[#8A7445] shadow-[0_2px_8px_rgba(0,0,0,0.8)] border border-[#C9A96E]/50" />
        {/* Oval clip hook entering the badge punch hole */}
        <div className="w-3 h-3 rounded-full border-2 border-[#C9A96E] bg-black/80 -mt-1 shadow-sm" />
      </div>

      {/* ── 3D Tilting Card Container ── */}
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onHoverStart={() => playHoverTick()}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-[340px] h-[520px] rounded-[24px] cursor-grab active:cursor-grabbing"
      >
        {/* Animated Inner Flipping Shell */}
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative w-full h-full"
        >
          {/* ════════════════ FRONT SIDE ════════════════ */}
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            className="absolute inset-0 rounded-[24px] overflow-hidden p-6 flex flex-col justify-between border border-[#C9A96E]/40 bg-gradient-to-br from-[#141210] via-[#080808] to-[#161411] shadow-[0_30px_70px_rgba(0,0,0,0.9),0_0_35px_rgba(201,169,110,0.12)]"
          >
            {/* Holographic Foil Iridescent Glare */}
            <motion.div
              style={{
                background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(201,169,110,0.28) 0%, rgba(56,189,248,0.12) 35%, rgba(217,70,239,0.08) 60%, transparent 80%)`,
                mixBlendMode: "color-dodge",
              }}
              className="absolute inset-0 pointer-events-none z-10 opacity-70 transition-opacity duration-300"
            />

            {/* Subtle Engineering Grid Mesh */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#C9A96E 1px, transparent 1px)`,
                backgroundSize: "18px 18px",
              }}
            />

            {/* 1. Top Section: Punch Slot & Credential Header */}
            <div className="relative z-10 space-y-2.5">
              {/* Lanyard Slot Punch Cutout */}
              <div className="flex justify-center">
                <div className="w-12 h-2.5 rounded-full bg-black/90 border border-[#C9A96E]/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)]" />
              </div>

              <div className="flex items-center justify-between border-b border-[#C9A96E]/20 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[#C9A96E] text-xs">◈</span>
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#C9A96E] font-bold">
                    DEV-PASS // ID-2026
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/30">
                  <ShieldCheck className="w-3 h-3 text-[#22C55E]" />
                  <span className="font-mono text-[8px] tracking-wider text-[#E8DCC8] uppercase font-semibold">
                    AUTHENTICATED
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Middle Section: Smart IC Chip & High-Definition Portrait */}
            <div className="relative z-10 my-auto flex flex-col items-center text-center">
              {/* Sub-row: Microchip + QR Code */}
              <div className="w-full flex items-center justify-between px-2 mb-3">
                {/* Gold Security IC Chip */}
                <div className="relative w-11 h-8 rounded bg-gradient-to-tr from-[#8E733D] via-[#FFE194] to-[#B08D46] p-0.5 shadow-md border border-[#C9A96E]/60">
                  <div className="w-full h-full grid grid-cols-3 grid-rows-2 gap-[1.5px] opacity-75">
                    <div className="border border-[#61491C] rounded-xs" />
                    <div className="border border-[#61491C] rounded-xs" />
                    <div className="border border-[#61491C] rounded-xs" />
                    <div className="border border-[#61491C] rounded-xs" />
                    <div className="border border-[#61491C] rounded-xs" />
                    <div className="border border-[#61491C] rounded-xs" />
                  </div>
                </div>

                {/* Encrypted Micro QR */}
                <div className="w-8 h-8 rounded-lg bg-black/60 border border-[#C9A96E]/30 flex items-center justify-center text-[#C9A96E]/80">
                  <QrCode className="w-4 h-4" />
                </div>
              </div>

              {/* Portrait Frame */}
              <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-[#C9A96E] p-0.5 bg-black/60 shadow-[0_0_25px_rgba(201,169,110,0.3)]">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src="/profile.jpeg"
                    alt="Abu Dujanah Siregar"
                    fill
                    sizes="120px"
                    className="object-cover object-top filter grayscale contrast-115 brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-transparent" />
                </div>
              </div>

              {/* Name & Official Titles */}
              <div className="mt-3.5 space-y-1">
                <h3 className="font-serif text-2xl font-bold tracking-wide text-[#E8DCC8] leading-tight drop-shadow-sm">
                  Abu Dujanah Siregar
                </h3>
                <p className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-[#C9A96E] font-bold">
                  Backend &amp; Full-Stack Developer
                </p>
                <div className="pt-0.5">
                  <p className="font-sans text-xs text-[#E8DCC8] font-medium">
                    Universitas Nasional PASIM Bandung
                  </p>
                  <p className="font-sans text-[11px] text-[#A89F91]">
                    Akselerasi 3 Tahun · Penerima Beasiswa Penuh PUB
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Bottom Section: Stack Specialization & Authentic Barcode */}
            <div className="relative z-10 pt-3 border-t border-[#C9A96E]/20 flex items-center justify-between">
              <div>
                <span className="font-mono text-[8px] uppercase tracking-widest text-[#7A7266] block">
                  FOCUS
                </span>
                <span className="font-mono text-[10px] tracking-wider text-[#C9A96E] font-bold">
                  JAVA 21 · SPRING BOOT 3
                </span>
              </div>

              {/* Barcode */}
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-[2px] h-5 px-1.5 py-0.5 bg-black/60 rounded border border-white/5">
                  {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9].map((w, i) => (
                    <span
                      key={i}
                      style={{ width: `${(w % 3) + 1}px` }}
                      className="h-full bg-[#C9A96E]/80"
                    />
                  ))}
                </div>
                <span className="font-mono text-[7px] text-[#6B6560] tracking-widest mt-0.5">
                  PASIM-PUB-2023
                </span>
              </div>
            </div>
          </div>

          {/* ════════════════ BACK SIDE ════════════════ */}
          <div
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            className="absolute inset-0 rounded-[24px] overflow-hidden p-6 flex flex-col justify-between border border-[#C9A96E]/40 bg-gradient-to-br from-[#161411] via-[#080808] to-[#141210] shadow-[0_30px_70px_rgba(0,0,0,0.9),0_0_35px_rgba(201,169,110,0.12)]"
          >
            {/* Hologram Foil */}
            <motion.div
              style={{
                background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(201,169,110,0.28) 0%, rgba(56,189,248,0.12) 35%, transparent 70%)`,
                mixBlendMode: "color-dodge",
              }}
              className="absolute inset-0 pointer-events-none z-10 opacity-70"
            />

            {/* Back Header */}
            <div className="relative z-10 space-y-2">
              <div className="flex justify-center">
                <div className="w-12 h-2.5 rounded-full bg-black/90 border border-[#C9A96E]/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)]" />
              </div>

              <div className="flex items-center justify-between border-b border-[#C9A96E]/20 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span className="font-mono text-[9px] tracking-widest uppercase text-[#C9A96E] font-bold">
                    CREDENTIALS SPEC SHEET
                  </span>
                </div>
                <span className="font-mono text-[8px] text-[#C9A96E] font-bold bg-[#C9A96E]/15 px-2 py-0.5 rounded-full border border-[#C9A96E]/30">
                  IPK 3.75 / 4.00
                </span>
              </div>
            </div>

            {/* Spec Sheet Rows */}
            <div className="relative z-10 my-auto space-y-2.5 font-mono text-[10px]">
              <div className="p-2.5 rounded-xl bg-black/60 border border-white/5 space-y-0.5">
                <span className="text-[#8A8078] text-[8px] uppercase tracking-wider block font-semibold">
                  PENDIDIKAN &amp; AKADEMIK
                </span>
                <p className="text-[#E8DCC8] font-bold text-[11px]">
                  S1 Teknik Industri (Akselerasi 3 Tahun)
                </p>
                <p className="text-[#C9A96E] text-[9.5px]">
                  Universitas Nasional PASIM Bandung · Beasiswa PUB
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-black/60 border border-white/5 space-y-0.5">
                <span className="text-[#8A8078] text-[8px] uppercase tracking-wider block font-semibold">
                  PERAN INSTRUKTUR &amp; CODE RELIABILITY
                </span>
                <div className="text-[#E8DCC8] font-medium text-[10.5px]">
                  Instruktur Pemrograman Java Backend Lab
                </div>
                <p className="text-[#8A8078] text-[9px]">
                  94 Automated Tests (JUnit 5 &amp; Mockito) · ACID Compliance
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-black/60 border border-white/5 space-y-0.5">
                <span className="text-[#8A8078] text-[8px] uppercase tracking-wider block font-semibold">
                  CORE TECH ECOSYSTEM
                </span>
                <p className="text-[#A89F91] text-[9.5px] leading-relaxed">
                  Java 21 (Virtual Threads) · Spring Boot 3 · PostgreSQL · RabbitMQ · Redis · Docker
                </p>
              </div>
            </div>

            {/* Back Footer */}
            <div className="relative z-10 pt-3 border-t border-[#C9A96E]/20 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
                <span className="font-serif italic text-xs text-[#C9A96E]">
                  Abu Dujanah Siregar
                </span>
              </div>
              <span className="font-mono text-[8px] text-[#7A7266] uppercase tracking-wider">
                VERIFIED CREDENTIALS
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Interactive 3D Flip Button */}
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={toggleFlip}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#141210] border border-[#C9A96E]/30 text-[#E8DCC8] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all text-xs font-mono tracking-wider shadow-lg"
          aria-label="Putar kartu identitas 360 derajat"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#C9A96E] transition-transform duration-500 ${isFlipped ? "rotate-180" : ""}`} />
          <span>{isFlipped ? "LIHAT SISI DEPAN" : "PUTAR KARTU 360°"}</span>
        </button>
      </div>
    </div>
  );
}
