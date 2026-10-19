"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, RefreshCw, Sparkles, Terminal, Code2 } from "lucide-react";
import { playClick, playHoverTick } from "@/lib/audio";

export function Holographic3DBadge() {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt physics motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for fluid 120fps motion inertia
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [16, -16]), {
    stiffness: 180,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-16, 16]), {
    stiffness: 180,
    damping: 20,
  });

  // Glare / Holo sheen highlight coordinates
  const glareX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(y, [-0.5, 0.5], [0, 100]);

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
    <div className="relative flex flex-col items-center justify-center p-4 select-none perspective-[1200px]">
      {/* Lanyard Top Attachment & Woven Strap */}
      <div className="flex flex-col items-center mb-[-8px] z-20 pointer-events-none">
        <div className="w-10 h-3 rounded-full bg-gradient-to-r from-[#201d18] via-[#c9a96e] to-[#201d18] shadow-md border border-[#c9a96e]/40" />
        <div className="w-3.5 h-6 bg-gradient-to-b from-[#8a7650] via-[#c9a96e] to-[#403522] rounded-sm shadow-inner" />
        <div className="w-8 h-2 rounded-full bg-[#111] border border-[#c9a96e]/50 -mt-1 shadow-lg" />
      </div>

      {/* 3D Tilting Card Container */}
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
        className="relative w-[320px] sm:w-[350px] h-[510px] rounded-[22px] cursor-grab active:cursor-grabbing"
      >
        {/* Animated Inner Flipping Shell */}
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative w-full h-full"
        >
          {/* ════════════════ FRONT SIDE ════════════════ */}
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            className="absolute inset-0 rounded-[22px] overflow-hidden p-6 flex flex-col justify-between border border-[#c9a96e]/40 bg-gradient-to-br from-[#121110] via-[#090909] to-[#151310] shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(201,169,110,0.15)]"
          >
            {/* Iridescent Hologram Foil Shader Overlay */}
            <motion.div
              style={{
                background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(201,169,110,0.3) 0%, rgba(56,189,248,0.15) 30%, rgba(217,70,239,0.1) 55%, transparent 75%)`,
                mixBlendMode: "color-dodge",
              }}
              className="absolute inset-0 pointer-events-none z-10 opacity-70 transition-opacity duration-300"
            />

            {/* Subtle Metallic Grid Texture */}
            <div
              className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#c9a96e 1px, transparent 1px)`,
                backgroundSize: "16px 16px",
              }}
            />

            {/* Header: Editorial Geometric Pass Seal (Bebas dari AI-slop pulsating green dot) */}
            <div className="relative z-10 flex items-center justify-between border-b border-[#c9a96e]/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[#c9a96e] text-xs">◈</span>
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#c9a96e] font-bold">
                  DEV-PASS // ID-2026
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#c9a96e]/10 border border-[#c9a96e]/30">
                <ShieldCheck className="w-3 h-3 text-[#c9a96e]" />
                <span className="font-mono text-[8px] tracking-wider text-[#e8dcc8] uppercase font-semibold">
                  AUTHENTICATED
                </span>
              </div>
            </div>

            {/* Middle: Golden Microchip & Portrait */}
            <div className="relative z-10 my-auto flex flex-col items-center">
              {/* Gold Security IC Chip */}
              <div className="relative w-12 h-9 mb-4 rounded-md bg-gradient-to-tr from-[#947844] via-[#ffd580] to-[#b89552] p-0.5 shadow-md border border-[#c9a96e]">
                <div className="w-full h-full grid grid-cols-3 grid-rows-2 gap-[2px] opacity-80">
                  <div className="border border-[#735926] rounded-xs" />
                  <div className="border border-[#735926] rounded-xs" />
                  <div className="border border-[#735926] rounded-xs" />
                  <div className="border border-[#735926] rounded-xs" />
                  <div className="border border-[#735926] rounded-xs" />
                  <div className="border border-[#735926] rounded-xs" />
                </div>
              </div>

              {/* Holographic Portrait Avatar */}
              <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-[#c9a96e]/60 shadow-[0_0_20px_rgba(201,169,110,0.3)]">
                <Image
                  src="/profile.jpeg"
                  alt="Abu Dujanah Siregar"
                  fill
                  sizes="120px"
                  className="object-cover object-top filter grayscale contrast-125 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-[#c9a96e]/10 mix-blend-color" />
              </div>

              {/* Verified Accurate Identity Information */}
              <div className="text-center mt-3">
                <h3 className="font-serif text-[1.45rem] font-bold tracking-wide text-[#e8dcc8] leading-tight drop-shadow-sm">
                  Abu Dujanah Siregar
                </h3>
                <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#c9a96e] mt-1 font-semibold">
                  Backend &amp; Full-Stack Developer
                </p>
                <p className="font-sans text-[11px] text-[#a89f91] mt-0.5">
                  Universitas Nasional PASIM Bandung · Beasiswa PUB
                </p>
              </div>
            </div>

            {/* Bottom: Barcode & Stack Specialization */}
            <div className="relative z-10 pt-3 border-t border-[#c9a96e]/20 flex items-center justify-between">
              <div>
                <span className="font-mono text-[8px] uppercase tracking-widest text-[#7a7266] block">
                  FOCUS
                </span>
                <span className="font-mono text-[10px] tracking-wider text-[#c9a96e] font-bold">
                  JAVA 21 · SPRING BOOT 3
                </span>
              </div>

              {/* Barcode */}
              <div className="flex items-center gap-[2px] h-6 px-2 py-0.5 bg-black/60 rounded border border-white/5">
                {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9].map((w, i) => (
                  <span
                    key={i}
                    style={{ width: `${(w % 3) + 1}px` }}
                    className="h-full bg-[#c9a96e]/70"
                  />
                ))}
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
            className="absolute inset-0 rounded-[22px] overflow-hidden p-6 flex flex-col justify-between border border-[#c9a96e]/40 bg-gradient-to-br from-[#151310] via-[#090909] to-[#121110] shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(201,169,110,0.15)]"
          >
            {/* Hologram Foil */}
            <motion.div
              style={{
                background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(201,169,110,0.3) 0%, rgba(56,189,248,0.15) 40%, transparent 70%)`,
                mixBlendMode: "color-dodge",
              }}
              className="absolute inset-0 pointer-events-none z-10 opacity-70"
            />

            {/* Back Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-[#c9a96e]/20 pb-3">
              <div className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-[#c9a96e]" />
                <span className="font-mono text-[9px] tracking-widest uppercase text-[#c9a96e] font-bold">
                  DEVELOPER CREDENTIALS
                </span>
              </div>
              <span className="font-mono text-[8px] text-[#c9a96e] font-semibold bg-[#c9a96e]/10 px-2 py-0.5 rounded border border-[#c9a96e]/30">
                IPK 3.75 / 4.00
              </span>
            </div>

            {/* Core Verified Spec Sheet (Bebas dari data fiktif / VPS sementara) */}
            <div className="relative z-10 my-auto space-y-3 font-mono text-[10px]">
              <div className="p-2.5 rounded-lg bg-black/60 border border-white/5 space-y-1">
                <span className="text-[#8a8078] text-[8px] uppercase tracking-wider block">
                  PENDIDIKAN &amp; AKADEMIK
                </span>
                <p className="text-[#e8dcc8] font-bold">
                  S1 Teknik Industri (Akselerasi 3 Tahun)
                </p>
                <p className="text-[#c9a96e] text-[9px]">
                  Universitas Nasional PASIM Bandung · Beasiswa PUB
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-black/60 border border-white/5 space-y-1">
                <span className="text-[#8a8078] text-[8px] uppercase tracking-wider block">
                  PENGALAMAN INSTRUKTUR &amp; CODE RELIABILITY
                </span>
                <div className="text-[#e8dcc8]">
                  Instruktur Fundamental Java Backend (14+ Sesi)
                </div>
                <p className="text-[#8a8078] text-[9px]">
                  94 Automated Tests (JUnit 5 &amp; Mockito) · ACID Transactions
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-black/60 border border-white/5">
                <span className="text-[#8a8078] text-[8px] uppercase tracking-wider block mb-0.5">
                  CORE TECH STACK
                </span>
                <p className="text-[#a89f91] text-[9px] leading-tight">
                  Java 21 · Spring Boot 3 · React 19 · PostgreSQL · RabbitMQ · Redis · Docker
                </p>
              </div>
            </div>

            {/* Back Footer: Golden Foil Signature Seal */}
            <div className="relative z-10 pt-3 border-t border-[#c9a96e]/20 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#c9a96e]" />
                <span className="font-serif italic text-xs text-[#c9a96e]">
                  Abu Dujanah Siregar
                </span>
              </div>
              <span className="font-mono text-[8px] text-[#7a7266] uppercase">
                VERIFIED DEVELOPER
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Interactive 3D Flip Button */}
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={toggleFlip}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151310] border border-[#c9a96e]/30 text-[#e8dcc8] hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors text-xs font-mono tracking-wider shadow-lg"
          aria-label="Flip engineer credential badge"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#c9a96e] transition-transform duration-500 ${isFlipped ? "rotate-180" : ""}`} />
          <span>{isFlipped ? "LIHAT SISI DEPAN" : "PUTAR KARTU 360°"}</span>
        </button>
      </div>
    </div>
  );
}
