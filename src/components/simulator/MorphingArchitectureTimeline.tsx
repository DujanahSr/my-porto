"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Server,
  Database,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Flame,
} from "lucide-react";
import { playClick, playHoverTick } from "@/lib/audio";

interface ArchitecturePhase {
  id: number;
  year: string;
  badge: string;
  title: string;
  subtitle: string;
  throughput: string;
  throughputPercent: number;
  p99Latency: string;
  latencyPercent: number;
  availability: string;
  threadModel: string;
  databaseTopology: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  nodes: {
    name: string;
    role: string;
    status: "bottleneck" | "decoupled" | "high-performance";
  }[];
}

const PHASES: ArchitecturePhase[] = [
  {
    id: 1,
    year: "2024",
    badge: "FASE 1 — MONOLITH",
    title: "Monolithic Architecture & Single DB Bottleneck",
    subtitle: "Pondasi Awal — Tomcat Thread Pool & Synchronous Blocking I/O",
    throughput: "450 RPS",
    throughputPercent: 15,
    p99Latency: "850 ms",
    latencyPercent: 85,
    availability: "94.2%",
    threadModel: "Tomcat Platform Threads (Max 200)",
    databaseTopology: "Single MySQL Instance (No Replicas)",
    description:
      "Seluruh domain (Auth, Katalog, Pesanan, Notifikasi) berjalan dalam 1 file WAR/JAR monolitik. Lonjakan traffic saat flash sale menghabiskan 200 worker threads, dan lock contention pada satu tabel pesanan membekukan seluruh aplikasi.",
    strengths: [
      "Deployment sederhana (single artifact)",
      "Kemudahan debugging lokal di awal pengembangan",
    ],
    weaknesses: [
      "Single Point of Failure (SPOF) di level database",
      "Thread pool exhaustion saat request eksternal lambat",
      "Cascading failure jika modul pelaporan memakan CPU",
    ],
    nodes: [
      { name: "Monolith Core", role: "Auth + Catalog + Orders + Payment", status: "bottleneck" },
      { name: "Shared DB", role: "Single MySQL Instance (Lock Contention)", status: "bottleneck" },
    ],
  },
  {
    id: 2,
    year: "2025",
    badge: "FASE 2 — DECOUPLED",
    title: "Service Decoupling & RabbitMQ Message Broker",
    subtitle: "Pemisahan Domain & Pipeline Antrian Asinkron",
    throughput: "4,800 RPS",
    throughputPercent: 55,
    p99Latency: "160 ms",
    latencyPercent: 35,
    availability: "99.1%",
    threadModel: "Decoupled Platform Thread Pools + Workers",
    databaseTopology: "Master-Slave MySQL + Redis Caching",
    description:
      "Modul autentikasi dan katalog dipisahkan dari alur checkout. RabbitMQ diimplementasikan untuk menyangga spike pesanan secara asinkron dengan Dead Letter Queue (DLQ), mencegah kegagalan beruntun pada database master.",
    strengths: [
      "Zero lost orders selama surge traffic berkat RabbitMQ buffer",
      "Katalog responsif sub-50ms berkat Redis cache layer",
      "Webhook payment diproses asinkron di latar belakang",
    ],
    weaknesses: [
      "Platform threads masih mengonsumsi memori ~1MB per thread",
      "Kompleksitas konsistensi data antar service terdistribusi",
    ],
    nodes: [
      { name: "API Gateway", role: "Reverse Proxy & Routing", status: "decoupled" },
      { name: "Auth & Catalog", role: "Independent Services", status: "decoupled" },
      { name: "RabbitMQ Broker", role: "Order Queue & DLQ Buffer", status: "decoupled" },
      { name: "Order Worker", role: "Async DB Ingestion", status: "decoupled" },
    ],
  },
  {
    id: 3,
    year: "2026",
    badge: "FASE 3 — PRODUCTION CORE",
    title: "Distributed Microservices & Java 21 Virtual Threads",
    subtitle: "Puncak Arsitektur Skala Besar — Zero Deadlock & High Resilience",
    throughput: "28,500+ RPS",
    throughputPercent: 100,
    p99Latency: "12 ms",
    latencyPercent: 8,
    availability: "99.99%",
    threadModel: "Java 21 Project Loom (Virtual Threads, ~1KB/th)",
    databaseTopology: "Isolated Schema per Service + Redis + Dokploy",
    description:
      "Arsitektur terdistribusi 6 microservices mandiri dengan Java 21 Virtual Threads. Dilengkapi Pessimistic Row-Locking (SELECT FOR UPDATE) untuk integritas stok atomik tanpa race condition, serta Resilience4j Circuit Breakers untuk isolasi kegagalan seketika.",
    strengths: [
      "Virtual Threads menangani 10,000+ konkurensi dengan footprint RAM minimal",
      "Zero deadlocks & zero overselling saat flash sale ribuan user",
      "Resilience4j mengisolasi gangguan pihak ketiga dalam 10ms",
      "CI/CD otomatis dan observability zero-downtime via Dokploy",
    ],
    weaknesses: [
      "Membutuhkan disiplin distributed tracing & strict idempotency keys",
    ],
    nodes: [
      { name: "Spring Cloud Gateway", role: "Non-blocking Routing & Rate Limiting", status: "high-performance" },
      { name: "Auth Service", role: "RSA-256 JWT & Spring Security", status: "high-performance" },
      { name: "Catalog Service", role: "Redis Read-Through + PostgreSQL", status: "high-performance" },
      { name: "Order Core", role: "Pessimistic Row-Locking (ACID)", status: "high-performance" },
      { name: "Payment Service", role: "Resilience4j Circuit Breaker", status: "high-performance" },
      { name: "Notification Broker", role: "SSE & WebPush Workers", status: "high-performance" },
    ],
  },
];

export function MorphingArchitectureTimeline() {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(2); // Default to Phase 3 (Current Peak)
  const currentPhase = PHASES[currentPhaseIndex];

  const handleSelectPhase = (index: number) => {
    playClick();
    setCurrentPhaseIndex(index);
  };

  return (
    <div className="w-full rounded-2xl border border-[#C9A96E]/30 bg-gradient-to-b from-[#100E0B] via-[#080808] to-[#0A0A0A] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Background Ambient Radial Glow */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[#C9A96E] text-xs">◈</span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#C9A96E] font-bold">
              Engineering Evolution Timeline // RegarStore Core
            </span>
          </div>
          <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#E8DCC8]">
            Evolusi Arsitektur: Monolith Menuju Microservices
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#A89F91] mt-1 max-w-2xl">
            Perjalanan rekayasa sistem nyata oleh Abu Dujanah Siregar: Dari keterbatasan thread Tomcat hingga arsitektur terdistribusi Java 21 Virtual Threads berlatensi 12ms.
          </p>
        </div>

        {/* Phase Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C9A96E]/40 bg-[#C9A96E]/10 font-mono text-xs font-bold text-[#E8DCC8] self-start sm:self-auto shadow-[0_0_15px_rgba(201,169,110,0.15)]">
          <Activity className="w-3.5 h-3.5 text-[#C9A96E]" />
          <span>{currentPhase.badge}</span>
        </div>
      </div>

      {/* ── Interactive 3-Stage Evolution Slider & Pills ── */}
      <div className="py-8 relative z-10 space-y-6">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {PHASES.map((phase, idx) => (
            <button
              key={phase.id}
              onClick={() => handleSelectPhase(idx)}
              onMouseEnter={() => playHoverTick()}
              className={`flex-1 min-w-[200px] p-4 rounded-xl border text-left transition-all duration-300 relative ${
                currentPhaseIndex === idx
                  ? "bg-[#C9A96E]/15 border-[#C9A96E] shadow-[0_0_25px_rgba(201,169,110,0.2)]"
                  : "bg-white/5 border-white/5 hover:border-white/20 text-[#8A8078]"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className={currentPhaseIndex === idx ? "text-[#C9A96E] font-bold" : "text-[#8A8078]"}>
                  {phase.year}
                </span>
                <span className="text-[10px] uppercase tracking-wider">
                  FASE 0{phase.id}
                </span>
              </div>
              <p className="font-serif font-bold text-base text-[#E8DCC8] line-clamp-1">
                {phase.id === 1 ? "Monolith Bottleneck" : phase.id === 2 ? "Decoupled + RabbitMQ" : "Distributed 6-Services"}
              </p>
              <p className="text-[11px] font-sans text-[#A89F91] line-clamp-1 mt-0.5">
                {phase.throughput} · {phase.p99Latency}
              </p>

              {currentPhaseIndex === idx && (
                <motion.div
                  layoutId="active-timeline-indicator"
                  className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#C9A96E] rotate-45 border border-black shadow"
                />
              )}
            </button>
          ))}
        </div>

        {/* Range Slider for Scrubbing */}
        <div className="px-2 pt-2">
          <input
            type="range"
            min={0}
            max={2}
            step={1}
            value={currentPhaseIndex}
            onChange={(e) => handleSelectPhase(Number(e.target.value))}
            aria-label="Pilih Fase Evolusi Arsitektur"
            className="w-full accent-[#C9A96E] cursor-pointer h-2 bg-white/10 rounded-lg appearance-none"
          />
        </div>
      </div>

      {/* ── Dynamic Content Showcase ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPhase.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 pt-4"
        >
          {/* Left Column: Architectural Topology Visualizer */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl bg-black/60 border border-white/10 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                <span className="font-mono text-xs text-[#8A8078] uppercase tracking-wider">
                  TOPOLOGI NODES LIVE
                </span>
                <span className="font-mono text-xs text-[#C9A96E]">
                  {currentPhase.nodes.length} Active Architecture Nodes
                </span>
              </div>

              {/* Node Schematic Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentPhase.nodes.map((node, i) => (
                  <div
                    key={i}
                    className={`p-3.5 rounded-xl border font-mono transition-all ${
                      node.status === "bottleneck"
                        ? "bg-red-950/20 border-red-500/30 text-red-200"
                        : node.status === "decoupled"
                        ? "bg-amber-950/20 border-amber-500/30 text-amber-200"
                        : "bg-[#C9A96E]/10 border-[#C9A96E]/40 text-[#E8DCC8]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs">{node.name}</span>
                      {node.status === "bottleneck" ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                      ) : node.status === "decoupled" ? (
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                      )}
                    </div>
                    <span className="text-[10px] text-[#A89F91] block">
                      {node.role}
                    </span>
                  </div>
                ))}
              </div>

              {/* Context Explanation */}
              <div className="mt-5 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <h4 className="font-serif font-bold text-lg text-[#E8DCC8] mb-1">
                  {currentPhase.title}
                </h4>
                <p className="font-sans text-xs leading-relaxed text-[#A89F91]">
                  {currentPhase.description}
                </p>
              </div>
            </div>

            {/* Pros and Cons Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-950/15 border border-emerald-500/20">
                <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                  ✓ Keunggulan &amp; Pencapaian
                </span>
                <ul className="space-y-1.5 font-sans text-xs text-[#C8D6C8]">
                  {currentPhase.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/15 border border-amber-500/20">
                <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                  ⚠ Limitasi / Tantangan Rekayasa
                </span>
                <ul className="space-y-1.5 font-sans text-xs text-[#E8DAC8]">
                  {currentPhase.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">•</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Key Performance Telemetry Benchmarks */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-black/70 border border-[#C9A96E]/20 space-y-6">
              <span className="font-mono text-xs text-[#C9A96E] font-bold uppercase tracking-wider block border-b border-white/5 pb-2">
                BENCHMARK METRICS // STRESS TEST DATA
              </span>

              {/* Throughput Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline font-mono text-xs">
                  <span className="text-[#8A8078]">THROUGHPUT PEAK</span>
                  <span className="text-base font-bold text-[#E8DCC8]">
                    {currentPhase.throughput}
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${currentPhase.throughputPercent}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-amber-600 via-[#C9A96E] to-[#22C55E]"
                  />
                </div>
              </div>

              {/* Latency Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline font-mono text-xs">
                  <span className="text-[#8A8078]">P99 LATENCY (LOWER IS BETTER)</span>
                  <span className={`text-base font-bold ${currentPhase.id === 3 ? "text-[#22C55E]" : "text-amber-400"}`}>
                    {currentPhase.p99Latency}
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${currentPhase.latencyPercent}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`h-full ${
                      currentPhase.id === 1
                        ? "bg-red-500"
                        : currentPhase.id === 2
                        ? "bg-amber-500"
                        : "bg-[#22C55E]"
                    }`}
                  />
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs border-t border-white/10">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[#6B6560] block text-[10px]">AVAILABILITY</span>
                  <span className="text-[#E8DCC8] font-bold text-sm">{currentPhase.availability}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[#6B6560] block text-[10px]">CONCURRENCY ENGINE</span>
                  <span className="text-[#C9A96E] font-bold text-[11px] block truncate">
                    {currentPhase.id === 3 ? "Loom Virtual" : "Platform Workers"}
                  </span>
                </div>
              </div>

              {/* Bottom Architectural Takeaway */}
              <div className="p-3.5 rounded-xl bg-[#C9A96E]/10 border border-[#C9A96E]/30 font-mono text-[11px] text-[#E8DCC8] leading-relaxed">
                <span className="text-[#C9A96E] font-bold block mb-1">
                  💡 REKAYASA SISTEM ABU DUJANAH:
                </span>
                {currentPhase.id === 1 &&
                  "Monolith cocok untuk MVP, namun memicu deadlock dan latency tinggi ketika volume pesanan meningkat."}
                {currentPhase.id === 2 &&
                  "RabbitMQ menjadi pahlawan stabilitas awal, mengubah alur checkout menjadi asinkron dan tahan lonjakan."}
                {currentPhase.id === 3 &&
                  "Java 21 Virtual Threads & Pessimistic Row Locking menghadirkan kombinasi emas: konkurensi 28k+ RPS tanpa race condition."}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
