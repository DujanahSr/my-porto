"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Minus, Maximize2, Minimize2 } from "lucide-react";
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

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
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
  vps                 - Status telemetri Dokploy VPS (145.79.8.137)
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
  ├─ Container & Deploy       : Docker Compose · Dokploy VPS · Traefik Reverse Proxy
  ├─ Automated Testing        : 94 Automated Tests (JUnit 5, Mockito, MockMvc)
  ├─ Frontend Ecosystem       : React 19 (Vite) · TypeScript · Tailwind CSS · Motion
  └─ Database Relational      : PostgreSQL (Per-Service Schemas) · MySQL`,
        });
        break;

      case "dujanah --cv":
        newHistory.push({
          type: "output",
          text: `[CREDENTIALS & BACKGROUND]
  Nama       : Abu Dujanah Siregar
  Pendidikan : S1 Teknik Industri (Akselerasi 3 Tahun) — Universitas Nasional PASIM Bandung
  IPK        : 3.75 / 4.00 (Beasiswa Penuh PUB)
  Peran      : Instruktur Fundamental Java Backend (Okt 2025 – Jan 2026)
  Fokus      : Enterprise Distributed Microservices & High-Concurrency Systems`,
        });
        break;

      case "projects":
        newHistory.push({
          type: "output",
          text: `[FEATURED ENTERPRISE BUILDS]
  1. RegarStore  : Microservices Java 21, Spring Boot 3, Dokploy VPS, Swagger UI
  2. StokKita    : Multi-Tenant POS SaaS, Pessimistic Row-Locking, EOQ & ROP
  3. Eventease   : Ticket Platform, WebSocket STOMP Gate Scanner, Bucket4j Anti-Bot
  4. SIMAKA      : HR & Attendance Management, Spring Security RBAC`,
        });
        break;

      case "vps":
        newHistory.push({
          type: "output",
          text: `[DOKPLOY VPS TELEMETRY]
  Host       : 145.79.8.137 (Linode / Akamai Cluster)
  Status     : 200 OK — ALL CONTAINERS HEALTHY
  Stack      : Traefik (SSL) · Spring Gateway · React 19 · RabbitMQ · Redis · Postgres
  Swagger UI : https://regarstore.145.79.8.137.sslip.io/webjars/swagger-ui/index.html`,
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
      {/* ── Floating Launcher Button (Bottom Right) ── */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            audioController.playMechanicalClick();
            setIsOpen(!isOpen);
          }}
          title="Buka Terminal Arsitektur (Interactive REPL)"
          className="group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-[#C9A96E]/30 bg-[#0A0A0A]/90 backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.7)] text-[#C9A96E] hover:border-[#C9A96E] transition-all duration-300"
        >
          <div className="p-1 rounded bg-[#C9A96E]/10">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <span className="font-mono text-xs font-bold tracking-wider uppercase hidden sm:inline">
            CLI Terminal
          </span>
          <span className="font-mono text-[0.65rem] text-[#38bdf8] font-bold">›_</span>
        </button>
      </div>

      {/* ── Interactive Terminal Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed z-50 rounded-2xl border border-[#C9A96E]/30 bg-[#080808]/96 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(201,169,110,0.12)] overflow-hidden flex flex-col font-mono text-xs ${
              isExpanded
                ? "inset-4 md:inset-10"
                : "bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[580px] h-[400px]"
            }`}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#111111] border-b border-[#E8DCC8]/10 select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block cursor-pointer opacity-80 hover:opacity-100" onClick={() => setIsOpen(false)} />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block cursor-pointer opacity-80 hover:opacity-100" onClick={() => setIsExpanded(!isExpanded)} />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block cursor-pointer opacity-80 hover:opacity-100" onClick={() => setIsExpanded(!isExpanded)} />
                <span className="font-mono text-[0.68rem] text-[#8A8078] ml-2">
                  dujanah@core-node:~ (zsh)
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[#8A8078]">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1 hover:text-[#E8DCC8] rounded"
                  title={isExpanded ? "Restore" : "Maximize"}
                >
                  {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:text-[#E8DCC8] rounded"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
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
        )}
      </AnimatePresence>
    </>
  );
}
