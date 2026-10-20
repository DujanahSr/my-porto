"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from "lucide-react";
import { audioController } from "@/lib/audio";

interface TerminalLine {
  type: "input" | "output" | "error" | "system";
  text: string;
}

const AVAILABLE_COMMANDS = [
  "help",
  "neofetch",
  "skills",
  "cv",
  "projects",
  "arch",
  "metrics",
  "clear",
  "exit",
];

const QUICK_CHIPS = [
  { label: "help", cmd: "help" },
  { label: "neofetch", cmd: "neofetch" },
  { label: "skills", cmd: "skills" },
  { label: "cv", cmd: "cv" },
  { label: "projects", cmd: "projects" },
  { label: "arch", cmd: "arch" },
  { label: "metrics", cmd: "metrics" },
  { label: "clear", cmd: "clear" },
];

export function MiniTerminalREPL() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "system", text: "Abu Dujanah Siregar — Architecture Terminal v2.5.0 (x86_64-pasim-linux)" },
    { type: "system", text: "Ketik 'help' atau klik tombol pintasan di bawah untuk navigasi." },
  ]);

  // Command history buffer for ArrowUp / ArrowDown navigation
  const [cmdHistoryList, setCmdHistoryList] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

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

    // Save to cmd history list
    setCmdHistoryList((prev) => [...prev, raw]);
    setHistoryIndex(-1);

    switch (cmd) {
      case "help":
        newHistory.push({
          type: "output",
          text: `PERINTAH TERSEDIA:
  help              Ringkasan perintah sistem
  neofetch          Spesifikasi sistem & profil
  skills            Matriks stack Java & Distributed
  cv                Kredensial, IPK & sertifikasi
  projects          Katalog sistem produksi terpilih
  arch              Cetak blueprint arsitektur
  metrics           Telemetri real-time sistem
  clear             Bersihkan layar konsol
  exit              Tutup sesi terminal`,
        });
        break;

      case "neofetch":
      case "whoami":
      case "uname -a":
        newHistory.push({
          type: "output",
          text: `       ___       root@dujanah-core
      /   \\      -----------------
     / /_\\ \\     OS: Pasim Linux x86_64 (Kernel 6.11-lts)
    /  ___  \\    Host: Abu Dujanah Siregar [Backend Engineer]
   /_/     \\_\\   Uptime: 3 Tahun Akselerasi (UNAS PASIM Bandung)
                 IPK: 3.75 / 4.00 (Beasiswa Penuh PUB Yayasan Wiranata)
                 Peran: Instruktur Fundamental Algoritma Java Backend
                 Runtime: OpenJDK 21 LTS (Virtual Threads Enabled)
                 Framework: Spring Boot 3.x · Spring Cloud Netty Gateway
                 Broker: RabbitMQ AMQP 0-9-1 (Transactional Pipelines)
                 RDBMS: PostgreSQL (ACID) · MySQL 8.0 (Row-Locking)
                 Status: P99 < 38ms · 94 Automated Tests PASSED`,
        });
        break;

      case "skills":
      case "dujanah --skills":
        newHistory.push({
          type: "output",
          text: `[CORE TECH STACK TELEMETRY]
  ├─ Java 21 & Spring Boot 3  : High-Throughput (Virtual Threads, JPA, Security)
  ├─ Message Broker & Caching : RabbitMQ (Event-Driven) · Redis (Sub-ms Cache)
  ├─ Container & Deploy       : Docker Compose Multi-Container · Traefik
  ├─ Automated Testing        : 94 Automated Tests (JUnit 5, Mockito, MockMvc)
  ├─ Frontend Ecosystem       : React 19 · Next.js · TypeScript · Tailwind CSS
  └─ Database Relational      : PostgreSQL (Per-Service Schemas) · MySQL 8`,
        });
        break;

      case "cv":
      case "dujanah --cv":
      case "cat cv.txt":
        newHistory.push({
          type: "output",
          text: `[CREDENTIALS & BACKGROUND]
  Nama       : Abu Dujanah Siregar
  Peran      : Backend & Full-Stack Developer
  Pendidikan : S1 Teknik Industri (Akselerasi 3 Tahun)
               Universitas Nasional PASIM Bandung
  IPK        : 3.75 / 4.00 (Beasiswa Penuh PUB Yayasan Wiranata)
  Pengalaman : Instruktur Algoritma & Pemrograman Java (Okt 2025 – Jan 2026)
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

      case "metrics":
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Arrow Up: navigate backward in command history
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistoryList.length === 0) return;
      const nextIdx = historyIndex === -1 ? cmdHistoryList.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(cmdHistoryList[nextIdx]);
      return;
    }

    // Arrow Down: navigate forward in command history
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= cmdHistoryList.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistoryList[nextIdx]);
      }
      return;
    }

    // Tab: autocompletion
    if (e.key === "Tab") {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      if (!current) return;
      const matched = AVAILABLE_COMMANDS.find((cmd) => cmd.startsWith(current));
      if (matched) {
        setInputVal(matched);
        audioController.playHoverTick();
      }
    }
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
                top: isExpanded ? "90px" : "auto",
                bottom: isExpanded ? "1.5rem" : "5rem",
                left: isExpanded ? "1rem" : "auto",
                right: isExpanded ? "1rem" : "1.5rem",
                maxHeight: "calc(100vh - 110px)",
              }}
              className={`fixed z-[200] rounded-2xl border border-[#C9A96E]/40 bg-[#080808]/98 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.95),0_0_40px_rgba(201,169,110,0.15)] overflow-hidden flex flex-col font-mono text-xs ${
                isExpanded
                  ? "w-[calc(100vw-2rem)] md:w-[calc(100vw-4rem)] md:left-8 md:right-8"
                  : "w-[calc(100vw-2rem)] sm:w-[620px] h-[450px]"
              }`}
            >
              {/* Top Bar with Prominent Window Controls */}
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
                  <span className="font-mono text-[0.7rem] text-[#A89F91] ml-2 font-medium flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-[#C9A96E]" />
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

              {/* Quick Command Chips (Clickable shortcuts) */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0D0C0B] border-b border-[#E8DCC8]/5 overflow-x-auto no-scrollbar select-none">
                <span className="text-[10px] text-[#A89F91]/70 tracking-wider flex-shrink-0 mr-1">
                  PINTASAN:
                </span>
                {QUICK_CHIPS.map((chip) => (
                  <button
                    key={chip.cmd}
                    onClick={() => handleCommand(chip.cmd)}
                    className="px-2 py-0.5 rounded text-[10px] bg-white/[0.04] border border-[#C9A96E]/20 text-[#E8DCC8]/80 hover:bg-[#C9A96E]/15 hover:border-[#C9A96E]/60 hover:text-[#C9A96E] transition-all flex-shrink-0 cursor-pointer"
                  >
                    {chip.label}
                  </button>
                ))}
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
                    onKeyDown={handleKeyDown}
                    placeholder="Ketik perintah (Tab untuk autocompletion)..."
                    className="flex-1 bg-transparent text-[#E8DCC8] placeholder-[#A89F91]/30 focus:outline-none font-mono text-xs caret-[#C9A96E]"
                    autoFocus
                  />
                  <button
                    type="submit"
                    title="Jalankan perintah"
                    className="p-1 text-[#C9A96E]/60 hover:text-[#C9A96E] transition-colors"
                  >
                    <CornerDownLeft className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
