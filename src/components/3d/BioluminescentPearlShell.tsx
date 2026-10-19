"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, ShieldCheck, X } from "lucide-react";
import { audioController } from "@/lib/audio";

export function BioluminescentPearlShell() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);

  // Mouse tilt spring physics for 3D realism
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), { stiffness: 150, damping: 15 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!shellRef.current) return;
    const rect = shellRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
    setIsOpen(false);
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
    setIsOpen(true);
    audioController.playHoverTick();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioController.playMechanicalClick(true);
    setShowModal(true);
  };

  return (
    <>
      {/* ── Seabed Anchor Container ── */}
      <div
        ref={shellRef}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        onClick={handleClick}
        style={{ perspective: "800px" }}
        className="relative group cursor-pointer select-none"
      >
        {/* Soft Ambient Caustic Halo on Seabed */}
        <motion.div
          animate={{
            scale: isOpen ? [1.1, 1.35, 1.2] : [0.95, 1.05, 0.95],
            opacity: isOpen ? [0.65, 0.9, 0.7] : [0.25, 0.4, 0.25],
          }}
          transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
          className="absolute -inset-8 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(201,169,110,0.35) 0%, rgba(201,169,110,0.1) 45%, transparent 75%)",
            filter: "blur(18px)",
          }}
        />

        {/* 3D Shell Assembly */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-20 h-16 sm:w-24 sm:h-20 flex items-center justify-center"
        >
          {/* Bottom Shell (Base nestled on seabed rocks) */}
          <div
            className="absolute bottom-0 w-full h-[65%] rounded-b-full rounded-t-xl overflow-hidden border border-[#C9A96E]/50 shadow-[0_15px_30px_rgba(0,0,0,0.9),inset_0_2px_8px_rgba(201,169,110,0.3)]"
            style={{
              background: "radial-gradient(ellipse at 50% 90%, #2a241b 0%, #12100d 65%, #050505 100%)",
            }}
          >
            {/* Shell Fan Ridges */}
            <div className="absolute inset-0 opacity-40">
              <svg viewBox="0 0 100 65" className="w-full h-full fill-none stroke-[#C9A96E]/60" strokeWidth="1">
                <path d="M 50 65 L 10 15" />
                <path d="M 50 65 L 28 10" />
                <path d="M 50 65 L 50 8" />
                <path d="M 50 65 L 72 10" />
                <path d="M 50 65 L 90 15" />
              </svg>
            </div>
          </div>

          {/* Glowing Luminous Pearl (Inside Core) */}
          <motion.div
            animate={{
              scale: isOpen ? [1.0, 1.15, 1.05] : [0.85, 0.95, 0.85],
              boxShadow: isOpen
                ? [
                    "0 0 15px rgba(255,230,170,0.8), 0 0 35px rgba(201,169,110,0.6)",
                    "0 0 25px rgba(255,240,200,0.95), 0 0 50px rgba(201,169,110,0.85)",
                    "0 0 18px rgba(255,230,170,0.8), 0 0 38px rgba(201,169,110,0.65)",
                  ]
                : "0 0 10px rgba(201,169,110,0.4)",
            }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="absolute z-10 bottom-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle at 35% 30%, #ffffff 0%, #ffeec2 25%, #d4af37 60%, #856a28 100%)",
            }}
          >
            {/* Specular Glimmer Point */}
            <span className="absolute top-1 left-2 w-1.5 h-1.5 rounded-full bg-white opacity-90 filter blur-[0.5px]" />
          </motion.div>

          {/* Floating Stardust Particles (Spawning when open) */}
          <AnimatePresence>
            {isOpen && (
              <>
                {[
                  { x: -14, y: -24, delay: 0 },
                  { x: 10, y: -32, delay: 0.15 },
                  { x: -4, y: -42, delay: 0.3 },
                ].map((pt, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, y: 0, x: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.2, 0.2],
                      y: pt.y,
                      x: pt.x,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 1.8, delay: pt.delay }}
                    className="absolute z-20 w-1.5 h-1.5 rounded-full bg-[#FFE8A3] shadow-[0_0_8px_#FFD700]"
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Top Shell (Hinged Lid that opens smoothly) */}
          <motion.div
            animate={{
              rotateX: isOpen ? -42 : -6,
              y: isOpen ? -8 : 0,
            }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{
              transformOrigin: "bottom center",
              transformStyle: "preserve-3d",
            }}
            className="absolute top-0 w-full h-[65%] rounded-t-full rounded-b-xl overflow-hidden border border-[#C9A96E]/60 shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
          >
            {/* Outer shell material with iridescent dark pearl texture */}
            <div
              className="w-full h-full relative"
              style={{
                background: "radial-gradient(ellipse at 50% 10%, #3a3224 0%, #181510 60%, #060504 100%)",
              }}
            >
              {/* Gold shell crest lines */}
              <svg viewBox="0 0 100 65" className="w-full h-full fill-none stroke-[#C9A96E]/50" strokeWidth="1">
                <path d="M 50 0 L 10 50" />
                <path d="M 50 0 L 28 55" />
                <path d="M 50 0 L 50 58" />
                <path d="M 50 0 L 72 55" />
                <path d="M 50 0 L 90 50" />
              </svg>
              {/* Gilded lip highlight */}
              <div className="absolute bottom-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent opacity-80" />
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Tooltip Hint */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 6 }}
          transition={{ duration: 0.2 }}
          className="absolute -top-7 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap"
        >
          <span className="font-mono text-[9px] text-[#C9A96E] bg-black/80 px-2 py-0.5 rounded border border-[#C9A96E]/30 tracking-wider shadow-lg">
            ◈ MUTIARA DASAR LAUT // KLIK
          </span>
        </motion.div>
      </div>

      {/* ── Interactive Easter Egg Modal on Click ── */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md rounded-2xl border border-[#C9A96E]/40 bg-[#0C0B0A] p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(201,169,110,0.2)] text-center font-mono overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-[#A89F91] hover:text-[#E8DCC8] p-1 rounded-full hover:bg-white/5 transition-colors"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Glowing Icon */}
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-tr from-[#947844] via-[#FFE5A3] to-[#B89552] flex items-center justify-center shadow-[0_0_20px_rgba(201,169,110,0.5)]">
                <Sparkles className="w-6 h-6 text-black" />
              </div>

              <span className="text-[10px] uppercase tracking-widest text-[#C9A96E] font-bold block mb-1">
                SECRET EASTER EGG // OCEANIC CORE
              </span>

              <h3 className="font-serif text-2xl font-bold text-[#E8DCC8] mb-3">
                Mutiara Rekayasa Sistem
              </h3>

              <p className="text-xs text-[#A89F91] font-sans leading-relaxed mb-5">
                &ldquo;Di kedalaman laut yang paling tenang dan gelap, sistem terbaik dirancang bukan untuk tampil bising, melainkan untuk tetap teguh dan tidak pernah gagal di bawah tekanan ekstrem.&rdquo;
              </p>

              <div className="p-3 rounded-xl bg-black/60 border border-[#C9A96E]/20 text-left text-[11px] space-y-1.5 mb-5">
                <div className="flex items-center justify-between text-[#E8DCC8]">
                  <span>DATA INTEGRITY</span>
                  <span className="text-[#22C55E] font-bold">100% ACID VERIFIED</span>
                </div>
                <div className="flex items-center justify-between text-[#E8DCC8]">
                  <span>CONCURRENCY ENGINE</span>
                  <span className="text-[#C9A96E] font-bold">JAVA 21 VIRTUAL THREADS</span>
                </div>
                <div className="flex items-center justify-between text-[#E8DCC8]">
                  <span>AUTOMATED TESTS</span>
                  <span className="text-[#38BDF8] font-bold">94 SUITE TESTS PASSING</span>
                </div>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#C9A96E] to-[#E8DCC8] text-black font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(201,169,110,0.3)] transition-all"
              >
                LANJUTKAN EKSPLORASI
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
