"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  X,
  Send,
  Sparkles,
  ArrowRight,
  Layers,
  Cpu,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";
import { playClick, playHoverTick } from "@/lib/audio";

interface QAPair {
  question: string;
  category: string;
  summary: string;
  response: string;
  actionText?: string;
  actionTarget?: string;
}

const KNOWLEDGE_BASE: QAPair[] = [
  {
    question: "Mengapa memilih Java 21 Virtual Threads daripada WebFlux?",
    category: "Konkurensi & Loom",
    summary: "Kemudahan debugging imperatif + throughput 28.000+ RPS tanpa overhead memori.",
    response: `**Keputusan Arsitektur Abu Dujanah Siregar:**

1. **Eliminasi Callback Hell Reactive**: Spring WebFlux (Project Reactor) memaksakan paradigma non-blocking yang memecah stack trace dan menyulitkan observabilitas saat error terjadi di production.
2. **Virtual Threads (Project Loom)**: Menghadirkan eksekusi imperatif murni (kode lurus & mudah dibaca), namun thread dijalankan sebagai *lightweight user-mode fiber* oleh JVM (~1 KB per thread vs ~1 MB pada platform thread Tomcat biasa).
3. **Hasil Benchmark RegarStore**: Mendukung 10.000+ koneksi konkuren simultan dengan latensi P99 hanya **12ms** tanpa membebani thread pool OS carrier.`,
    actionText: "Buka Timeline Arsitektur Virtual Threads",
    actionTarget: "projects",
  },
  {
    question: "Bagaimana cara StokKita mencegah race condition & overselling inventori?",
    category: "Integritas Transaksi",
    summary: "Pessimistic Row-Locking (SELECT FOR UPDATE) + Redis Atomic Decr.",
    response: `**Strategi Transaksi ACID StokKita:**

1. **Pessimistic Row-Locking (@Lock)**: Pada saat checkout, query dijalankan dengan klausul \`SELECT ... FOR UPDATE\` di level PostgreSQL. Baris stok produk dikunci secara eksklusif sehingga transaksi lain wajib antri hingga transaksi pertama commit.
2. **Kombinasi Redis Caching**: Sebelum query database dieksekusi, Redis memeriksa cache stok dengan operasi atomic \`DECR\`. Jika stok nol di memory, request ditolak seketika (sub-1ms) tanpa menyentuh database relational.
3. **Hasil**: **0.00% Deadlock & Zero Overselling** bahkan saat ratusan user menekan tombol checkout dalam milidetik yang sama.`,
    actionText: "Lihat Visualisasi Row-Locking Live",
    actionTarget: "projects",
  },
  {
    question: "Bagaimana arsitektur 6 microservices di RegarStore saling berkomunikasi?",
    category: "Distributed Architecture",
    summary: "Spring Cloud Gateway + RabbitMQ Asinkron dengan Dead Letter Queue (DLQ).",
    response: `**Topologi Sistem Terdistribusi RegarStore:**

1. **API Gateway (Port 8080)**: Menangani reverse proxy, SSL termination, JWT validation, dan rate limiting.
2. **Asynchronous Order Ingestion (RabbitMQ)**: Transaksi pesanan tidak memanggil payment gateway secara sinkron. Order diterbitkan ke RabbitMQ exchange, dan client menerima response \`HTTP 202 Accepted\` seketika.
3. **Dead Letter Queue (DLQ)**: Jika webhook payment gateway pihak ketiga mengalami timeout, event dialihkan ke DLQ untuk retry otomatis dengan *exponential backoff* tanpa ada pesanan yang hilang.`,
    actionText: "Jalankan Chaos Engineering Sandbox",
    actionTarget: "projects",
  },
  {
    question: "Ceritakan latar belakang pendidikan, IPK, dan Beasiswa PUB Abu Dujanah.",
    category: "Kredensial & Edukasi",
    summary: "S1 Teknik Industri UNAS PASIM Bandung (Akselerasi 3 Tahun, IPK 3.75, Beasiswa Penuh PUB).",
    response: `**Riwayat Akademik & Kepemimpinan:**

1. **Universitas Nasional PASIM Bandung**: Menempuh program akselerasi Sarjana Teknik Industri (S1) lulus dalam 3 tahun (2023 – 2026) dengan **IPK 3.75 / 4.00**.
2. **Beasiswa Penuh Yayasan PUB**: Diterima melalui seleksi kompetitif Beasiswa Penuh Pemberdayaan Umat Berkelanjutan (PUB) oleh Yayasan Pendidikan Wiranata atas dasar prestasi akademik dan karakter.
3. **Instruktur Praktikum Java**: Dipercaya menjadi asisten laboratorium komputer untuk membimbing mahasiswa dalam pemrograman berorientasi objek (Java OOP), algoritma, dan desain basis data.`,
    actionText: "Periksa Dossier & Sertifikat Kriptografi",
    actionTarget: "about",
  },
];

export function ArchitecturalCoPilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeQA, setActiveQA] = useState<QAPair | null>(KNOWLEDGE_BASE[0]);
  const [userQuery, setUserQuery] = useState("");
  const [messages, setMessages] = useState<{ role: "assistant" | "user"; text: string; action?: { text: string; target: string } }[]>([
    {
      role: "assistant",
      text: "Halo! Saya **Dujanah AI Twin v3.0**, kembaran arsitektur virtual Abu Dujanah Siregar. Tanyakan keputusan rekayasa, konkurensi Java 21, arsitektur microservices RegarStore, atau latar belakang akademik saya.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Listen to open-copilot custom event & ESC key
  useEffect(() => {
    const handleOpen = () => {
      playClick(true);
      setIsOpen(true);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("open-copilot", handleOpen);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("open-copilot", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    const lenis = (typeof window !== "undefined" ? (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis : null);
    if (isOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [isOpen]);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const selectQuickPrompt = (qa: QAPair) => {
    playClick();
    setActiveQA(qa);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: qa.question },
    ]);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: qa.response,
          action: qa.actionText && qa.actionTarget ? { text: qa.actionText, target: qa.actionTarget } : undefined,
        },
      ]);
    }, 450);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = userQuery.trim();
    if (!query) return;

    playClick();
    setMessages((prev) => [...prev, { role: "user", text: query }]);
    setUserQuery("");
    setIsTyping(true);

    // Search knowledge base
    const lower = query.toLowerCase();
    const matched = KNOWLEDGE_BASE.find((k) =>
      lower.includes("virtual") || lower.includes("loom") || lower.includes("thread") || lower.includes("webflux")
        ? k.category.includes("Loom")
        : lower.includes("race") || lower.includes("stok") || lower.includes("lock")
        ? k.category.includes("Integritas")
        : lower.includes("microservice") || lower.includes("regar") || lower.includes("rabbit")
        ? k.category.includes("Distributed")
        : lower.includes("pasim") || lower.includes("kuliah") || lower.includes("ipk") || lower.includes("pub") || lower.includes("pendidikan")
        ? k.category.includes("Kredensial")
        : false
    );

    setTimeout(() => {
      setIsTyping(false);
      if (matched) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: matched.response,
            action: matched.actionText && matched.actionTarget ? { text: matched.actionText, target: matched.actionTarget } : undefined,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: `Terima kasih atas pertanyaannya mengenai "${query}". Abu Dujanah Siregar berfokus pada **Java 21 Spring Boot 3, Distributed Microservices, dan high-throughput database design**. Silakan pilih topik arsitektur terpopuler di bawah ini untuk melihat ulasan teknis mendalam:`,
          },
        ]);
      }
    }, 550);
  };

  const scrollToTarget = (targetId: string) => {
    playClick();
    setIsOpen(false);
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[230] bg-black/75 backdrop-blur-md"
          />

          {/* Co-Pilot Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 30 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-20 bottom-6 sm:inset-x-auto sm:right-8 sm:top-24 sm:bottom-8 sm:w-[560px] z-[240] rounded-2xl border border-[#C9A96E]/40 bg-[#090807]/98 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_50px_rgba(201,169,110,0.15)] flex flex-col font-sans overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#12100E] border-b border-[#C9A96E]/20 text-[#E8DCC8]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#C9A96E]/15 border border-[#C9A96E]/40 flex items-center justify-center text-[#C9A96E]">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif font-bold text-base text-[#E8DCC8]">
                      Dujanah AI Twin
                    </span>
                    <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-[#C9A96E]/20 text-[#C9A96E] font-bold">
                      CO-PILOT v3.0
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#8A8078] block">
                    Virtual Architectural Twin · Offline-Ready
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-[#8A8078] hover:text-[#E8DCC8] rounded-lg hover:bg-white/5 transition-colors"
                title="Tutup AI Twin (ESC)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Prompts Selector Bar */}
            <div className="p-3 bg-black/40 border-b border-white/5 space-y-1.5">
              <span className="font-mono text-[9px] text-[#C9A96E] uppercase tracking-wider block font-bold">
                PERTANYAAN ARSITEKTUR CEPAT (KLIK UNTUK JAWABAN):
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {KNOWLEDGE_BASE.map((qa, i) => (
                  <button
                    key={i}
                    onClick={() => selectQuickPrompt(qa)}
                    onMouseEnter={() => playHoverTick()}
                    className="flex-shrink-0 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:border-[#C9A96E]/50 hover:bg-[#C9A96E]/10 text-left font-mono text-[10px] text-[#A89F91] hover:text-[#E8DCC8] transition-all"
                  >
                    <span>{qa.category}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat History Stream */}
            <div
              ref={chatScrollRef}
              className="flex-1 p-5 overflow-y-auto space-y-4 text-xs leading-relaxed"
            >
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    m.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[90%] p-4 rounded-2xl ${
                      m.role === "user"
                        ? "bg-[#C9A96E]/20 text-[#E8DCC8] border border-[#C9A96E]/40 font-mono text-[11px]"
                        : "bg-black/60 text-[#D8CDC0] border border-white/10"
                    }`}
                  >
                    <div className="whitespace-pre-wrap space-y-2">
                      {m.text}
                    </div>

                    {/* Actionable Deep-link button */}
                    {m.action && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <button
                          onClick={() => scrollToTarget(m.action!.target)}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#C9A96E]/15 border border-[#C9A96E]/40 text-[#C9A96E] hover:bg-[#C9A96E] hover:text-black font-mono text-[10px] font-bold transition-all"
                        >
                          <span>{m.action.text}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 p-3 text-[#A89F91] font-mono text-[10px]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A96E] animate-spin" />
                  <span>Dujanah AI sedang menganalisis arsitektur...</span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleCustomSubmit}
              className="p-3 bg-[#100E0C] border-t border-white/10 flex items-center gap-2"
            >
              <input
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="Tanyakan arsitektur (cth: 'Virtual Threads', 'Row-locking')..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-[#E8DCC8] placeholder-[#6B6560] focus:outline-none focus:border-[#C9A96E]"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-[#C9A96E] text-black font-bold hover:bg-[#E8DCC8] transition-colors"
                title="Kirim Pertanyaan"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
