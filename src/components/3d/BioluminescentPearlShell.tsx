"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { audioController } from "@/lib/audio";

export function BioluminescentPearlShell() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);

  // Micro spring tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 180, damping: 20 });

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
      {/* ── Nestled in Seabed Rocks Anchor ── */}
      <div
        ref={shellRef}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        onClick={handleClick}
        style={{ perspective: "600px" }}
        className="relative group cursor-pointer select-none"
      >
        {/* Soft Organic Caustic Bleed onto Surrounding Seabed */}
        <motion.div
          animate={{
            scale: isOpen ? [1.1, 1.4, 1.2] : [0.9, 1.05, 0.9],
            opacity: isOpen ? [0.55, 0.8, 0.6] : [0.15, 0.28, 0.15],
          }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
          className="absolute -inset-6 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 60%, rgba(201,169,110,0.3) 0%, rgba(201,169,110,0.08) 50%, transparent 75%)",
            filter: "blur(14px)",
          }}
        />

        {/* Realistic Organic Clam / Nautilus Form (Zero Wireframes / Zero Hanging Lamp Look) */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-14 h-10 sm:w-16 sm:h-11 flex items-center justify-center"
        >
          {/* Bedding Shadow (Anchors shell onto the rock floor) */}
          <div
            className="absolute -bottom-1.5 inset-x-1 h-3 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)",
              filter: "blur(3px)",
            }}
          />

          {/* Lower Valve (Organic Basalt / Deep Reef Rock Texture) */}
          <div
            className="absolute bottom-0 w-full h-[70%] rounded-b-[20px] rounded-t-[6px] overflow-hidden shadow-2xl"
            style={{
              background: "radial-gradient(circle at 50% 85%, #241f17 0%, #15120d 50%, #080706 100%)",
              boxShadow: "inset 0 1px 3px rgba(201,169,110,0.2), 0 6px 12px rgba(0,0,0,0.85)",
            }}
          >
            {/* Subtle natural growth concentric rings (pure CSS gradient, no vector stroke lines) */}
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage: "radial-gradient(ellipse at 50% 100%, transparent 35%, rgba(201,169,110,0.35) 42%, transparent 48%, rgba(201,169,110,0.2) 65%, transparent 72%)",
              }}
            />
          </div>

          {/* Bioluminescent Deep-Sea Golden Pearl */}
          <motion.div
            animate={{
              scale: isOpen ? [1.0, 1.15, 1.05] : [0.85, 0.95, 0.85],
              boxShadow: isOpen
                ? [
                    "0 0 12px rgba(255,235,180,0.9), 0 0 28px rgba(201,169,110,0.7)",
                    "0 0 20px rgba(255,245,210,1.0), 0 0 40px rgba(201,169,110,0.85)",
                    "0 0 14px rgba(255,235,180,0.9), 0 0 30px rgba(201,169,110,0.7)",
                  ]
                : "0 0 8px rgba(201,169,110,0.4)",
            }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="absolute z-10 bottom-1.5 w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle at 35% 30%, #ffffff 0%, #fff0c7 30%, #d4af37 65%, #6e541b 100%)",
            }}
          >
            <span className="absolute top-0.5 left-1 w-1 h-1 rounded-full bg-white opacity-90 filter blur-[0.4px]" />
          </motion.div>

          {/* Micro Plankton Luminescence Particles */}
          <AnimatePresence>
            {isOpen && (
              <>
                {[
                  { x: -8, y: -18, delay: 0 },
                  { x: 6, y: -24, delay: 0.12 },
                  { x: -2, y: -30, delay: 0.24 },
                ].map((pt, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, y: 0, x: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.4, 1.0, 0.2],
                      y: pt.y,
                      x: pt.x,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 1.6, delay: pt.delay }}
                    className="absolute z-20 w-1 h-1 rounded-full bg-[#FFE8A3] shadow-[0_0_6px_#FFD700]"
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Upper Valve (Organic Shell Lid, hinged naturally) */}
          <motion.div
            animate={{
              rotateX: isOpen ? -38 : -4,
              y: isOpen ? -6 : 0,
            }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              transformOrigin: "bottom center",
              transformStyle: "preserve-3d",
            }}
            className="absolute top-0 w-full h-[70%] rounded-t-[20px] rounded-b-[6px] overflow-hidden"
          >
            <div
              className="w-full h-full relative"
              style={{
                background: "radial-gradient(circle at 50% 15%, #2a2318 0%, #17130e 55%, #070605 100%)",
                boxShadow: "inset 0 -1px 3px rgba(201,169,110,0.25), 0 4px 10px rgba(0,0,0,0.85)",
              }}
            >
              {/* Organic growth ridges without any sharp vector wireframe */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: "radial-gradient(ellipse at 50% 0%, transparent 35%, rgba(201,169,110,0.3) 42%, transparent 48%, rgba(201,169,110,0.2) 65%, transparent 72%)",
                }}
              />
              {/* Soft organic rim highlight */}
              <div className="absolute bottom-0 inset-x-2 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/50 to-transparent" />
            </div>
          </motion.div>
        </motion.div>

        {/* Discreet Micro Tooltip Hint (Only on hover, small & unobtrusive) */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 4 }}
          transition={{ duration: 0.18 }}
          className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap"
        >
          <span className="font-mono text-[8px] text-[#C9A96E] bg-black/85 px-1.5 py-0.5 rounded border border-[#C9A96E]/20 tracking-wider shadow-md">
            ◈ MUTIARA DASAR LAUT
          </span>
        </motion.div>
      </div>

      {/* ── Interactive Modal on Click ── */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md rounded-2xl border border-[#C9A96E]/40 bg-[#0C0B0A] p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(201,169,110,0.2)] text-center font-mono overflow-hidden"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-[#A89F91] hover:text-[#E8DCC8] p-1 rounded-full hover:bg-white/5 transition-colors"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-11 h-11 mx-auto mb-3.5 rounded-full bg-gradient-to-tr from-[#947844] via-[#FFE5A3] to-[#B89552] flex items-center justify-center shadow-[0_0_18px_rgba(201,169,110,0.45)]">
                <Sparkles className="w-5 h-5 text-black" />
              </div>

              <span className="text-[9px] uppercase tracking-widest text-[#C9A96E] font-bold block mb-1">
                SECRET EASTER EGG // OCEANIC CORE
              </span>

              <h3 className="font-serif text-2xl font-bold text-[#E8DCC8] mb-2.5">
                Mutiara Rekayasa Sistem
              </h3>

              <p className="text-xs text-[#A89F91] font-sans leading-relaxed mb-4">
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
