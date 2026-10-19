"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Maximize2, Minimize2 } from "lucide-react";
import { audioController } from "@/lib/audio";

interface TerminalLine {
  type: "input" | "output" | "error" | "system";
  text: string;
}

export function MiniTerminalREPL() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "system", text: "Abu Dujanah Siregar — Architecture Terminal v2.4.0 (x86_64-pasim-linux)" },
    { type: "system", text: "Ketik 'help' untuk melihat daftar perintah teknis yang tersedia." },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lock body scroll and stop Lenis when terminal is open & listen to Escape key
  useEffect(() => {
    const lenis = (typeof window !== "undefined" ? (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis : null);
    if (isOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    const handleOpen = () => {
      audioController.playMechanicalClick();
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-terminal", handleOpen);

    return () => {
      document.body.style.overflow = "";
      lenis?.start();
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-terminal", handleOpen);
    };
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  const handleCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    audioController.playMechanicalClick();
    const cmd = raw.toLowerCase();
    const newHistory: TerminalLine[] = [...history, { type: "input", text: `root@dujanah-core:~# ${raw}` }];

    switch (cmd) {
      case "help":
        newHistory.push({
          type: "output",
          text: `Daftar Perintah Tersedia:
  help                - Menampilkan pesan bantuan ini
  dujanah --skills    - Status matriks kompetensi Backend & Full-Stack
  dujanah --cv        - Kredensial ringkas (IPK, Beasiswa PUB, Instruktur)
  projects            - Menampilkan repositori & proyek unggulan
  arch                - Spesifikasi arsitektur microservices & database
  curl /api/metrics   - Cetak live JSON telemetri sistem
  clear               - Membersihkan layar konsol terminal
  exit                - Menutup terminal`,
        });
        break;

      case "dujanah --skills":
        newHistory.push({
          type: "output",
          text: `[CORE TECH STACK TELEMETRY]
  ├─ Java 21 & Spring Boot 3  : High-Throughput (Virtual Threads, JPA, Security)
  ├─ Message Broker & Caching : RabbitMQ (Event-Driven) · Redis (Sub-ms Cache)
  ├─ Container & Deploy       : Docker Compose Multi-Container · Traefik
  ├─ Automated Testing        : 94 Automated Tests (JUnit 5, Mockito, MockMvc)
  ├─ Frontend Ecosystem       : React 19 (Vite) · TypeScript · Tailwind CSS · Motion
  └─ Database Relational      : PostgreSQL (Per-Service Schemas) · MySQL 8`,
        });
        break;

      case "dujanah --cv":
        newHistory.push({
          type: "output",
          text: `[CREDENTIALS & BACKGROUND]
  Nama       : Abu Dujanah Siregar
  Peran      : Backend & Full-Stack Developer
  Pendidikan : S1 Teknik Industri (Akselerasi 3 Tahun) — Universitas Nasional PASIM Bandung
  IPK        : 3.75 / 4.00 (Beasiswa Penuh PUB)
  Pengalaman : Instruktur Fundamental Java Backend (Okt 2025 – Jan 2026)
  Fokus      : Enterprise Microservices, REST API & High-Concurrency Systems`,
        });
        break;

      case "projects":
        newHistory.push({
          type: "output",
          text: `[FEATURED ENTERPRISE BUILDS]
  1. RegarStore  : Microservices Java 21, Spring Boot 3, RabbitMQ, Redis
  2. StokKita    : Multi-Tenant POS SaaS, Pessimistic Row-Locking, EOQ & ROP
  3. Eventease   : Ticket Platform, WebSocket STOMP Gate Scanner, Bucket4j Anti-Bot
  4. SIMAKA      : HR & Attendance Management, Spring Security RBAC`,
        });
        break;

      case "arch":
        newHistory.push({
          type: "output",
          text: `[SYSTEM ARCHITECTURE BLUEPRINT]
  Model      : Event-Driven Distributed Microservices
  Gateway    : Spring Cloud Gateway (Non-blocking Netty EventLoop)
  Messaging  : RabbitMQ AMQP 0-9-1 (Asynchronous transactional pipeline)
  Cache      : Redis In-Memory Cluster (<1ms SKU Catalog Queries)
  Locking    : SELECT FOR UPDATE (Pessimistic Row-Locking, Zero Deadlocks)`,
        });
        break;

      case "curl /api/metrics":
        newHistory.push({
          type: "output",
          text: JSON.stringify(
            {
              status: "UP",
              timestamp: new Date().toISOString(),
              virtualThreads: "ENABLED",
              redisCacheHitRatio: "98.4%",
              activeBrokerQueues: 6,
              automatedTestCoverage: "94 passing",
              latencyAvgMs: 38,
            },
            null,
            2
          ),
        });
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "exit":
        setIsOpen(false);
        setInputVal("");
        return;

      default:
        newHistory.push({
          type: "error",
          text: `zsh: command not found: ${raw}. Ketik 'help' untuk daftar perintah.`,
        });
        break;
    }

    setHistory(newHistory);
    setInputVal("");
  };

  return (
    <>
      {/* ── Interactive Terminal Window & Backdrop (Triggered from Navbar Labs Menu or ⌘K) ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Modal Backdrop to prevent interaction with underlying page & lock scroll */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[190] bg-black/60 backdrop-blur-xs"
            />

            {/* Terminal Window: z-[200] ensures it is ALWAYS in front of the 76px navbar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 25 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                // Explicit positioning to guarantee close button is always visible below navbar (90px)
                top: isExpanded ? "90px" : "auto",
                bottom: isExpanded ? "1.5rem" : "5rem",
                left: isExpanded ? "1rem" : "auto",
                right: isExpanded ? "1rem" : "1.5rem",
                maxHeight: "calc(100vh - 110px)",
              }}
              className={`fixed z-[200] rounded-2xl border border-[#C9A96E]/40 bg-[#080808]/98 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.95),0_0_40px_rgba(201,169,110,0.15)] overflow-hidden flex flex-col font-mono text-xs ${
                isExpanded
                  ? "w-[calc(100vw-2rem)] md:w-[calc(100vw-4rem)] md:left-8 md:right-8"
                  : "w-[calc(100vw-2rem)] sm:w-[560px] h-[400px]"
              }`}
            >
              {/* Top Bar with Prominent Close Button */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#141312] border-b border-[#E8DCC8]/10 select-none">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                    onClick={() => setIsOpen(false)}
                    title="Tutup (Esc)"
                  />
                  <span
                    className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                    onClick={() => setIsExpanded(!isExpanded)}
                    title={isExpanded ? "Kecilkan" : "Perbesar"}
                  />
                  <span
                    className="w-3 h-3 rounded-full bg-[#27c93f] inline-block cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                    onClick={() => setIsExpanded(!isExpanded)}
                    title={isExpanded ? "Kecilkan" : "Perbesar"}
                  />
                  <span className="font-mono text-[0.7rem] text-[#A89F91] ml-2 font-medium">
                    dujanah@core-node:~ (zsh)
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[#A89F91]">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-1 hover:text-[#E8DCC8] hover:bg-white/5 rounded transition-colors"
                    title={isExpanded ? "Kecilkan" : "Perbesar"}
                  >
                    {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 text-[#C9A96E] hover:text-white hover:bg-white/10 rounded transition-colors"
                    title="Tutup Terminal (Esc)"
                    aria-label="Tutup Terminal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Terminal Body */}
              <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-2 text-[#E8DCC8]/90">
                {history.map((line, i) => (
                  <div key={i} className="whitespace-pre-wrap leading-relaxed">
                    {line.type === "input" && (
                      <span className="text-[#C9A96E] font-bold">{line.text}</span>
                    )}
                    {line.type === "output" && (
                      <span className="text-[#A89F91]">{line.text}</span>
                    )}
                    {line.type === "system" && (
                      <span className="text-sky-400">{line.text}</span>
                    )}
                    {line.type === "error" && (
                      <span className="text-red-400">{line.text}</span>
                    )}
                  </div>
                ))}

                {/* Current Input Prompt */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCommand(inputVal);
                  }}
                  className="flex items-center gap-2 pt-1"
                >
                  <span className="text-[#C9A96E] font-bold flex-shrink-0">
                    root@dujanah-core:~#
                  </span>
                  <input
                    ref={inputRef}
                    value={inputVal}
                    onChange={(e) => {
                      setInputVal(e.target.value);
                      audioController.playHoverTick();
                    }}
                    className="flex-1 bg-transparent text-[#E8DCC8] focus:outline-none font-mono text-xs caret-[#C9A96E]"
                    autoFocus
                  />
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
