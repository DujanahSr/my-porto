"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Navigation, Gauge, Shield, X, Radio, ArrowDown, ChevronRight } from "lucide-react";
import { audioController, playClick, playHoverTick } from "@/lib/audio";

interface DiveWaypoint {
  depth: number;
  label: string;
  zone: string;
  sectionId: string;
  pressure: string;
  description: string;
}

const WAYPOINTS: DiveWaypoint[] = [
  {
    depth: 0,
    label: "Permukaan (Sunlit Surface)",
    zone: "ZONA EPIPELAGIK",
    sectionId: "hero",
    pressure: "1.0 ATM (14.7 PSI)",
    description: "Pancaran sinar matahari volumetrik keemasan & partikel laut 3D.",
  },
  {
    depth: 850,
    label: "Server Vault (Filosofi & Identitas)",
    zone: "ZONA MESOPELAGIK",
    sectionId: "about",
    pressure: "86.0 ATM (1,264 PSI)",
    description: "Pondasi kedisiplinan rekayasa, UNAS PASIM Bandung, dan Beasiswa PUB.",
  },
  {
    depth: 2400,
    label: "Distributed Trench (Karya Terpilih)",
    zone: "ZONA BATIPELAGIK",
    sectionId: "projects",
    pressure: "241.0 ATM (3,542 PSI)",
    description: "Katalog sistem terdistribusi: RegarStore, StokKita, dan Eventease.",
  },
  {
    depth: 4200,
    label: "Abyssal Reactor (ACID Core & Hubungi)",
    zone: "PALUNG HADAL / ABISAL",
    sectionId: "contact",
    pressure: "421.0 ATM (6,188 PSI)",
    description: "Pessimistic row-locking, Zero Deadlocks, dan kanal kolaborasi profesional.",
  },
];

export function SubmersibleDiveMode() {
  const [isActive, setIsActive] = useState(false);
  const [activeWaypoint, setActiveWaypoint] = useState(0);
  const [currentDepth, setCurrentDepth] = useState(0);
  const [radarAngle, setRadarAngle] = useState(0);

  // Radar sweep animation
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setRadarAngle((prev) => (prev + 3) % 360);
    }, 25);
    return () => clearInterval(interval);
  }, [isActive]);

  // Lock body scroll and listen for ESC key & open-submersible event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isActive) {
        setIsActive(false);
      }
    };
    const handleOpen = () => {
      playClick(true);
      setIsActive(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-submersible", handleOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-submersible", handleOpen);
    };
  }, [isActive]);

  // Navigate to Waypoint with cinematic smooth descent
  const diveTo = (idx: number) => {
    playClick();
    setActiveWaypoint(idx);
    const target = WAYPOINTS[idx];

    // Smooth numerical depth counter interpolation
    const startDepth = currentDepth;
    const endDepth = target.depth;
    const startTime = performance.now();
    const duration = 1200;

    const animateDepth = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCurrentDepth(Math.round(startDepth + (endDepth - startDepth) * ease));

      if (progress < 1) {
        requestAnimationFrame(animateDepth);
      }
    };
    requestAnimationFrame(animateDepth);

    // Scroll page smoothly to target
    if (target.sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(target.sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // Fallback proportional scroll
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const targetScroll = (target.depth / 4200) * maxScroll;
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* ── Fullscreen Cockpit HUD Expedition Overlay (Triggered from Navbar Labs Menu or ⌘K) ── */}
      <AnimatePresence>
        {isActive && (
          <div className="fixed inset-0 z-[220] pointer-events-none select-none flex flex-col justify-between p-4 sm:p-8">
            {/* Cockpit Vignette & Periscope Scope Overlay (Softened so page content remains visible) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-radial from-transparent via-[#050505]/15 to-[#020202]/60 pointer-events-none"
            />

            {/* Top Cockpit Header & Flight Telemetry */}
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              className="relative z-10 flex items-center justify-between pointer-events-auto"
            >
              {/* Sonar Ping & Sub Status */}
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-black/80 border border-[#C9A96E]/30 backdrop-blur-xl shadow-2xl">
                <div className="relative w-7 h-7 rounded-full border border-[#C9A96E]/40 flex items-center justify-center overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#C9A96E]/40 to-transparent"
                    style={{ transform: `rotate(${radarAngle}deg)` }}
                  />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
                </div>
                <div className="font-mono text-[10px]">
                  <span className="text-[#C9A96E] font-bold block tracking-wider">
                    DEEP-SEA SUBMERSIBLE // DSV-DUJANAH
                  </span>
                  <span className="text-[#A89F91]">
                    HULL INTEGRITY: 100% · SONAR ACTIVE
                  </span>
                </div>
              </div>

              {/* Exit Cockpit Button */}
              <button
                onClick={() => {
                  playClick();
                  setIsActive(false);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#141210] border border-[#C9A96E]/40 text-[#E8DCC8] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors font-mono text-xs tracking-wider shadow-2xl"
              >
                <span>KELUAR KOKPIT (ESC)</span>
                <X className="w-4 h-4 text-[#C9A96E]" />
              </button>
            </motion.div>

            {/* Middle Navigational Crosshair */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-64 h-64 rounded-full border border-[#C9A96E] relative">
                <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#C9A96E]" />
                <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#C9A96E]" />
              </div>
            </div>

            {/* Bottom Cockpit Nav Console & Waypoints */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 pointer-events-auto"
            >
              {/* Hydrostatic Telemetry Console */}
              <div className="md:col-span-4 p-4 rounded-xl bg-black/85 border border-[#C9A96E]/30 backdrop-blur-xl shadow-2xl font-mono text-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                    <span className="text-[#8A8078] text-[9px] uppercase tracking-wider">
                      HYDROSTATIC TELEMETRY
                    </span>
                    <span className="text-[#22C55E] text-[9px] font-bold">
                      {WAYPOINTS[activeWaypoint].zone}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-bold text-[#E8DCC8]">
                      -{currentDepth}m
                    </span>
                    <span className="text-[#C9A96E] text-[10px]">DEPTH</span>
                  </div>
                  <p className="text-[#A89F91] text-[11px] mt-1">
                    PRESSURE: {WAYPOINTS[activeWaypoint].pressure}
                  </p>
                  <p className="text-[#8A8078] text-[10px] mt-1 italic">
                    {WAYPOINTS[activeWaypoint].description}
                  </p>
                </div>
              </div>

              {/* Waypoint Selector Buttons */}
              <div className="md:col-span-8 p-3 rounded-xl bg-black/85 border border-[#C9A96E]/30 backdrop-blur-xl shadow-2xl flex items-center justify-between flex-wrap gap-2">
                {WAYPOINTS.map((wp, idx) => (
                  <button
                    key={idx}
                    onClick={() => diveTo(idx)}
                    onMouseEnter={() => playHoverTick()}
                    className={`flex-1 min-w-[130px] p-2.5 rounded-lg border font-mono text-left transition-all ${
                      activeWaypoint === idx
                        ? "bg-[#C9A96E]/15 border-[#C9A96E] text-[#E8DCC8] shadow-[0_0_15px_rgba(201,169,110,0.25)]"
                        : "bg-white/5 border-white/5 text-[#8A8078] hover:bg-white/10 hover:text-[#E8DCC8]"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[9px] mb-1">
                      <span className="text-[#C9A96E] font-bold">WP-0{idx + 1}</span>
                      <span>-{wp.depth}m</span>
                    </div>
                    <p className="font-serif font-bold text-xs text-[#E8DCC8] line-clamp-1">
                      {wp.label}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
