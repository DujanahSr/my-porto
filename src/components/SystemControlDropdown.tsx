"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Eye,
  Terminal,
  Command,
  ChevronDown,
  Volume2,
  VolumeX,
  Sparkles,
  Layers,
  X,
  Bot,
  ShieldCheck,
  Database,
  Boxes,
} from "lucide-react";
import { audioController, playClick, playHoverTick } from "@/lib/audio";

export function SystemControlDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync sound state from audioController
  useEffect(() => {
    setSoundEnabled(audioController.getSoundState());
    return audioController.subscribe((enabled) => setSoundEnabled(enabled));
  }, []);

  // Close dropdown on outside click or ESC
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const triggerAction = (eventName: string) => {
    playClick(true);
    setIsOpen(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(eventName));
    }
  };

  const navigateToPlaygroundTab = (tab: "microservices" | "database" | "evolution", subView?: string) => {
    playClick(true);
    setIsOpen(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("switch-architecture-tab", { detail: { tab, subView } }));
      setTimeout(() => {
        const el = document.getElementById("architecture-playground");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    }
  };

  const handleToggleSound = () => {
    const next = audioController.toggleSound();
    setSoundEnabled(next);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* ── Main Unified Dropdown Pill in Navbar ── */}
      <button
        onClick={() => {
          playClick();
          setIsOpen(!isOpen);
        }}
        aria-label="Buka Menu Fitur Interaktif & DevTools"
        title="Buka Pusat Kendali Fitur (Kapal Selam 3D, X-Ray, Terminal, ⌘K)"
        className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-xl transition-all duration-300 font-mono text-[11px] shadow-sm select-none ${
          isOpen
            ? "bg-[#C9A96E]/20 text-[#E8DCC8] border-[#C9A96E] shadow-[0_0_15px_rgba(201,169,110,0.25)]"
            : "bg-[#0A0A0A]/70 text-[#C9A96E] border-[#C9A96E]/25 hover:border-[#C9A96E] hover:text-[#FFFFFF]"
        }`}
      >
        <span className="text-[#C9A96E] text-xs group-hover:rotate-45 transition-transform duration-300">
          ◈
        </span>
        <span className="tracking-wider uppercase font-semibold">
          FITUR &amp; LABS
        </span>
        <ChevronDown
          className={`w-3 h-3 text-[#C9A96E] transition-transform duration-300 ${
            isOpen ? "rotate-180" : "opacity-75"
          }`}
        />
      </button>

      {/* ── Dropdown Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full mt-2.5 w-[330px] sm:w-[360px] rounded-2xl border border-[#C9A96E]/30 bg-[#090807]/95 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(201,169,110,0.12)] p-3 z-[220] select-none font-mono"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-2.5 py-1.5 mb-2 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="text-[#C9A96E] text-[11px]">◈</span>
                <span className="text-[10px] text-[#A89F91] tracking-widest uppercase font-bold">
                  PUSAT KENDALI FITUR // DEV LABS
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#6B6560] hover:text-[#E8DCC8] p-0.5"
                title="Tutup Menu"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* FEATURED: AI Architectural Co-Pilot (Poin 13) */}
            <div className="mb-2">
              <button
                onClick={() => triggerAction("open-copilot")}
                onMouseEnter={() => playHoverTick()}
                className="w-full flex items-start gap-3 p-2.5 rounded-xl text-left bg-gradient-to-r from-emerald-950/40 via-[#C9A96E]/10 to-transparent border border-emerald-500/50 hover:border-emerald-400 transition-all group shadow-md"
              >
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform mt-0.5">
                  <Bot className="w-4 h-4 animate-pulse" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-[#E8DCC8] group-hover:text-emerald-300 transition-colors">
                      Dujanah AI Twin (Co-Pilot)
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                      AI TWIN
                    </span>
                  </div>
                  <p className="font-sans text-[11px] text-[#A89F91] leading-tight mt-0.5 line-clamp-1">
                    Tanya keputusan arsitektur, Virtual Threads &amp; integritas StokKita.
                  </p>
                </div>
              </button>
            </div>

            {/* Section 1: Spasial 3D & Jeroan Arsitektur */}
            <div className="space-y-1">
              <span className="text-[9px] text-[#6B6560] uppercase tracking-wider px-2 block font-semibold">
                MODE SPASIAL &amp; ARSITEKTUR
              </span>

              {/* 1. Submersible 3D Dive */}
              <button
                onClick={() => triggerAction("open-submersible")}
                onMouseEnter={() => playHoverTick()}
                className="w-full flex items-start gap-3 p-2.5 rounded-xl text-left hover:bg-[#C9A96E]/10 border border-transparent hover:border-[#C9A96E]/30 transition-all group"
              >
                <div className="p-2 rounded-lg bg-[#C9A96E]/10 text-[#C9A96E] group-hover:scale-110 transition-transform mt-0.5">
                  <Compass className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-[#E8DCC8] group-hover:text-[#C9A96E] transition-colors">
                      Ekspedisi Kapal Selam 3D
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#C9A96E]/15 text-[#C9A96E] font-bold">
                      3D HUD
                    </span>
                  </div>
                  <p className="font-sans text-[11px] text-[#8A8078] leading-tight mt-0.5 line-clamp-1">
                    Kokpit sonar, tekanan kedalaman 0–4200m &amp; waypoint navigasi.
                  </p>
                </div>
              </button>

              {/* 2. X-Ray Blueprint Mode */}
              <button
                onClick={() => triggerAction("toggle-xray-mode")}
                onMouseEnter={() => playHoverTick()}
                className="w-full flex items-start gap-3 p-2.5 rounded-xl text-left hover:bg-[#C9A96E]/10 border border-transparent hover:border-[#C9A96E]/30 transition-all group"
              >
                <div className="p-2 rounded-lg bg-[#C9A96E]/10 text-[#C9A96E] group-hover:scale-110 transition-transform mt-0.5">
                  <Eye className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-[#E8DCC8] group-hover:text-[#C9A96E] transition-colors">
                      X-Ray PCB Blueprint
                    </span>
                    <kbd className="text-[9px] px-1.5 py-0.5 rounded bg-black/60 text-[#A89F91] border border-white/10 font-bold">
                      X
                    </kbd>
                  </div>
                  <p className="font-sans text-[11px] text-[#8A8078] leading-tight mt-0.5 line-clamp-1">
                    Cetak biru sirkuit emas, JVM ZGC Heap &amp; port microservices.
                  </p>
                </div>
              </button>

              {/* 3. 3D CAD Exploded View */}
              <button
                onClick={() => navigateToPlaygroundTab("microservices", "cad")}
                onMouseEnter={() => playHoverTick()}
                className="w-full flex items-start gap-3 p-2.5 rounded-xl text-left hover:bg-[#C9A96E]/10 border border-transparent hover:border-[#C9A96E]/30 transition-all group"
              >
                <div className="p-2 rounded-lg bg-[#C9A96E]/10 text-[#C9A96E] group-hover:scale-110 transition-transform mt-0.5">
                  <Boxes className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-[#E8DCC8] group-hover:text-[#C9A96E] transition-colors">
                      3D CAD Exploded View
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#C9A96E]/15 text-[#C9A96E] font-bold">
                      3D MESH
                    </span>
                  </div>
                  <p className="font-sans text-[11px] text-[#8A8078] leading-tight mt-0.5 line-clamp-1">
                    Bongkar pasang jeroan monolith ke 6 kontainer microservices.
                  </p>
                </div>
              </button>

              {/* 4. 3D B-Tree Storage Engine */}
              <button
                onClick={() => navigateToPlaygroundTab("database", "btree")}
                onMouseEnter={() => playHoverTick()}
                className="w-full flex items-start gap-3 p-2.5 rounded-xl text-left hover:bg-[#C9A96E]/10 border border-transparent hover:border-[#C9A96E]/30 transition-all group"
              >
                <div className="p-2 rounded-lg bg-[#C9A96E]/10 text-[#C9A96E] group-hover:scale-110 transition-transform mt-0.5">
                  <Database className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-[#E8DCC8] group-hover:text-[#C9A96E] transition-colors">
                      3D B-Tree DB Storage Engine
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#C9A96E]/15 text-[#C9A96E] font-bold">
                      O(log N)
                    </span>
                  </div>
                  <p className="font-sans text-[11px] text-[#8A8078] leading-tight mt-0.5 line-clamp-1">
                    Navigasi PostgreSQL B-Tree traversal buffer vs sequential scan.
                  </p>
                </div>
              </button>
            </div>

            {/* Section 2: Developer Tools */}
            <div className="space-y-1 pt-2 border-t border-white/5">
              <span className="text-[9px] text-[#6B6560] uppercase tracking-wider px-2 block font-semibold">
                DEVELOPER TOOLS
              </span>

              {/* 3. Interactive CLI Terminal */}
              <button
                onClick={() => triggerAction("open-terminal")}
                onMouseEnter={() => playHoverTick()}
                className="w-full flex items-start gap-3 p-2.5 rounded-xl text-left hover:bg-[#C9A96E]/10 border border-transparent hover:border-[#C9A96E]/30 transition-all group"
              >
                <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 group-hover:scale-110 transition-transform mt-0.5">
                  <Terminal className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-[#E8DCC8] group-hover:text-[#C9A96E] transition-colors">
                      CLI Terminal Shell
                    </span>
                    <span className="text-[9px] text-sky-400 font-bold">›_ REPL</span>
                  </div>
                  <p className="font-sans text-[11px] text-[#8A8078] leading-tight mt-0.5 line-clamp-1">
                    Shell interaktif untuk cek skills, CV, dan perintah teknis backend.
                  </p>
                </div>
              </button>

              {/* 4. Command Palette */}
              <button
                onClick={() => triggerAction("open-command-palette")}
                onMouseEnter={() => playHoverTick()}
                className="w-full flex items-start gap-3 p-2.5 rounded-xl text-left hover:bg-[#C9A96E]/10 border border-transparent hover:border-[#C9A96E]/30 transition-all group"
              >
                <div className="p-2 rounded-lg bg-white/5 text-[#E8DCC8] group-hover:scale-110 transition-transform mt-0.5">
                  <Command className="w-4 h-4 text-[#C9A96E]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-[#E8DCC8] group-hover:text-[#C9A96E] transition-colors">
                      Command Palette
                    </span>
                    <kbd className="text-[9px] px-1.5 py-0.5 rounded bg-black/60 text-[#A89F91] border border-white/10 font-bold">
                      ⌘K
                    </kbd>
                  </div>
                  <p className="font-sans text-[11px] text-[#8A8078] leading-tight mt-0.5 line-clamp-1">
                    Pencarian kilat ke proyek, sertifikat, dan aksi cepat.
                  </p>
                </div>
              </button>
            </div>

            {/* Footer: Audio SFX Quick Toggle */}
            <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between px-2 text-[10px]">
              <span className="text-[#8A8078]">EFEK SUARA (SFX):</span>
              <button
                onClick={handleToggleSound}
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded border transition-colors ${
                  soundEnabled
                    ? "bg-[#C9A96E]/15 border-[#C9A96E]/40 text-[#C9A96E]"
                    : "bg-white/5 border-white/10 text-[#6B6560]"
                }`}
              >
                {soundEnabled ? (
                  <>
                    <Volume2 className="w-3 h-3 text-[#C9A96E]" />
                    <span className="font-bold">ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3 h-3 text-[#6B6560]" />
                    <span>MUTED</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
