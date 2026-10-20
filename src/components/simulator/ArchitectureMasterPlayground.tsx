"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Database,
  GitBranch,
  Activity,
  Cpu,
  ShieldAlert,
  Server,
  Zap,
} from "lucide-react";
import { playClick, playHoverTick } from "@/lib/audio";
import { ExplodedArchitecture3D } from "@/components/3d/ExplodedArchitecture3D";
import { ChaosEngineeringSandbox } from "@/components/simulator/ChaosEngineeringSandbox";
import { BTreeIndexVisualizer3D } from "@/components/3d/BTreeIndexVisualizer3D";
import { RowLockingVisualizer } from "@/components/simulator/RowLockingVisualizer";
import { MorphingArchitectureTimeline } from "@/components/simulator/MorphingArchitectureTimeline";

export type ArchitectureTab = "microservices" | "database" | "evolution";

export function ArchitectureMasterPlayground() {
  const [activeTab, setActiveTab] = useState<ArchitectureTab>("microservices");
  const [microservicesSubView, setMicroservicesSubView] = useState<"cad" | "chaos">("cad");
  const [databaseSubView, setDatabaseSubView] = useState<"btree" | "locking">("btree");

  // Listen to external event triggers (e.g. from navbar dropdown or AI Twin)
  useEffect(() => {
    const handleSwitch = (e: Event) => {
      const customEvent = e as CustomEvent<{ tab: ArchitectureTab; subView?: string }>;
      if (customEvent.detail?.tab) {
        setActiveTab(customEvent.detail.tab);
        if (customEvent.detail.tab === "microservices" && customEvent.detail.subView) {
          setMicroservicesSubView(customEvent.detail.subView as "cad" | "chaos");
        } else if (customEvent.detail.tab === "database" && customEvent.detail.subView) {
          setDatabaseSubView(customEvent.detail.subView as "btree" | "locking");
        }
      }
    };

    window.addEventListener("switch-architecture-tab", handleSwitch);
    return () => {
      window.removeEventListener("switch-architecture-tab", handleSwitch);
    };
  }, []);

  const selectTab = (tab: ArchitectureTab) => {
    playClick();
    setActiveTab(tab);
  };

  return (
    <div
      id="architecture-playground"
      className="w-full rounded-3xl border border-[#C9A96E]/30 bg-gradient-to-b from-[#110F0D] via-[#090807] to-[#0A0A09] p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_50px_rgba(201,169,110,0.12)] relative overflow-hidden"
    >
      {/* Top Ambient Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/50 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Console Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-[#C9A96E] uppercase tracking-widest font-bold">
            <span className="text-[#C9A96E] text-xs">◈</span>
            <span>ARCHITECTURE LABS // LIVE REASONING PLAYGROUND</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#E8DCC8] tracking-tight mt-1">
            Laboratorium Arsitektur Sistem Terdistribusi &amp; ACID
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#A89F91] mt-0.5 max-w-2xl">
            Eksplorasi interaktif keputusan rekayasa Abu Dujanah Siregar: dari pembongkaran microservices 3D, pengujian beban 100k RPS, hingga struktur penyimpanan database internal.
          </p>
        </div>

        {/* Global Status Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 font-mono text-[10.5px]">
          <span className="text-[#8A8078]">SUBSYSTEM:</span>
          <span className="text-[#C9A96E] font-bold uppercase">
            {activeTab === "microservices"
              ? "DISTRIBUTED MESH"
              : activeTab === "database"
              ? "POSTGRESQL & REDIS"
              : "HISTORICAL METRICS"}
          </span>
        </div>
      </div>

      {/* Main Segmented Control Tabs */}
      <div className="py-5 border-b border-white/5 flex flex-wrap gap-2 sm:gap-3">
        {/* Tab 1 */}
        <button
          onClick={() => selectTab("microservices")}
          onMouseEnter={() => playHoverTick()}
          className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs transition-all duration-200 select-none ${
            activeTab === "microservices"
              ? "bg-[#C9A96E] text-black font-bold shadow-[0_0_20px_rgba(201,169,110,0.3)]"
              : "bg-white/[0.03] text-[#A89F91] border border-white/5 hover:border-[#C9A96E]/40 hover:text-[#E8DCC8]"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>1. MICROSERVICES &amp; CHAOS</span>
        </button>

        {/* Tab 2 */}
        <button
          onClick={() => selectTab("database")}
          onMouseEnter={() => playHoverTick()}
          className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs transition-all duration-200 select-none ${
            activeTab === "database"
              ? "bg-[#C9A96E] text-black font-bold shadow-[0_0_20px_rgba(201,169,110,0.3)]"
              : "bg-white/[0.03] text-[#A89F91] border border-white/5 hover:border-[#C9A96E]/40 hover:text-[#E8DCC8]"
          }`}
        >
          <Database className="w-4 h-4" />
          <span>2. DATABASE ACID &amp; B-TREE</span>
        </button>

        {/* Tab 3 */}
        <button
          onClick={() => selectTab("evolution")}
          onMouseEnter={() => playHoverTick()}
          className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs transition-all duration-200 select-none ${
            activeTab === "evolution"
              ? "bg-[#C9A96E] text-black font-bold shadow-[0_0_20px_rgba(201,169,110,0.3)]"
              : "bg-white/[0.03] text-[#A89F91] border border-white/5 hover:border-[#C9A96E]/40 hover:text-[#E8DCC8]"
          }`}
        >
          <GitBranch className="w-4 h-4" />
          <span>3. EVOLUSI ARSITEKTUR</span>
        </button>
      </div>

      {/* Tab Content Display Area */}
      <div className="pt-6">
        <AnimatePresence mode="wait">
          {/* ════════ TAB 1: MICROSERVICES & CHAOS ════════ */}
          {activeTab === "microservices" && (
            <motion.div
              key="microservices"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Sub-view Switcher */}
              <div className="flex items-center justify-between pb-2 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[#8A8078] text-[11px]">MODE PERSPEKTIF:</span>
                  <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/10">
                    <button
                      onClick={() => {
                        playClick();
                        setMicroservicesSubView("cad");
                      }}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        microservicesSubView === "cad"
                          ? "bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/40 font-bold"
                          : "text-[#8A8078] hover:text-[#E8DCC8]"
                      }`}
                    >
                      3D CAD EXPLODED VIEW
                    </button>
                    <button
                      onClick={() => {
                        playClick();
                        setMicroservicesSubView("chaos");
                      }}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        microservicesSubView === "chaos"
                          ? "bg-red-500/20 text-red-300 border border-red-500/40 font-bold"
                          : "text-[#8A8078] hover:text-[#E8DCC8]"
                      }`}
                    >
                      CHAOS ENGINEERING (100K RPS)
                    </button>
                  </div>
                </div>

                <span className="hidden sm:inline text-[10px] text-[#A89F91]">
                  RegarStore Distributed Ecosystem · RabbitMQ + Virtual Threads
                </span>
              </div>

              {/* View Components */}
              {microservicesSubView === "cad" ? (
                <ExplodedArchitecture3D />
              ) : (
                <ChaosEngineeringSandbox />
              )}
            </motion.div>
          )}

          {/* ════════ TAB 2: DATABASE ACID & B-TREE ════════ */}
          {activeTab === "database" && (
            <motion.div
              key="database"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Sub-view Switcher */}
              <div className="flex items-center justify-between pb-2 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[#8A8078] text-[11px]">ENGINE BASIS DATA:</span>
                  <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/10">
                    <button
                      onClick={() => {
                        playClick();
                        setDatabaseSubView("btree");
                      }}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        databaseSubView === "btree"
                          ? "bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/40 font-bold"
                          : "text-[#8A8078] hover:text-[#E8DCC8]"
                      }`}
                    >
                      3D B-TREE INDEX TRAVERSAL
                    </button>
                    <button
                      onClick={() => {
                        playClick();
                        setDatabaseSubView("locking");
                      }}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        databaseSubView === "locking"
                          ? "bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40 font-bold"
                          : "text-[#8A8078] hover:text-[#E8DCC8]"
                      }`}
                    >
                      STOKKITA PESSIMISTIC ROW-LOCKING
                    </button>
                  </div>
                </div>

                <span className="hidden sm:inline text-[10px] text-[#A89F91]">
                  PostgreSQL ACID Compliance · 0.00% Deadlock Guarantee
                </span>
              </div>

              {/* View Components */}
              {databaseSubView === "btree" ? (
                <BTreeIndexVisualizer3D />
              ) : (
                <RowLockingVisualizer />
              )}
            </motion.div>
          )}

          {/* ════════ TAB 3: ARCHITECTURAL EVOLUTION ════════ */}
          {activeTab === "evolution" && (
            <motion.div
              key="evolution"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <MorphingArchitectureTimeline />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
