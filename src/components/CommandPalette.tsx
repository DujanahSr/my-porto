"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, FileText, Code2, Globe, Volume2, ExternalLink, Compass } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { audioController } from "@/lib/audio";

interface CommandItem {
  id: string;
  category: "Navigasi" | "Proyek" | "Aksi Cepat";
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { lang, setLang } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);

  // Global shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) {
            audioController.playMechanicalClick();
          }
          return !prev;
        });
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-home",
      category: "Navigasi",
      title: lang === "id" ? "Beranda (Home)" : "Home",
      subtitle: "Halaman Utama Portofolio",
      icon: <Compass className="w-4 h-4" />,
      action: () => router.push("/"),
    },
    {
      id: "nav-projects",
      category: "Navigasi",
      title: lang === "id" ? "Semua Proyek" : "All Projects",
      subtitle: "Katalog Sistem Terdistribusi & Full-Stack",
      icon: <Code2 className="w-4 h-4" />,
      action: () => router.push("/proyek"),
    },
    {
      id: "nav-about",
      category: "Navigasi",
      title: lang === "id" ? "Tentang Abu Dujanah" : "About Abu Dujanah",
      subtitle: "Profil, Ekosistem Teknologi & Riwayat",
      icon: <FileText className="w-4 h-4" />,
      action: () => router.push("/tentang"),
    },
    {
      id: "nav-certs",
      category: "Navigasi",
      title: lang === "id" ? "Sertifikasi & Kredensial" : "Certificates & Credentials",
      subtitle: "Bukti Pelatihan & Pengalaman Instruktur",
      icon: <FileText className="w-4 h-4" />,
      action: () => router.push("/sertifikat"),
    },
    {
      id: "nav-contact",
      category: "Navigasi",
      title: lang === "id" ? "Kontak & Diskusi" : "Contact & Inquiry",
      subtitle: "Kirim Pesan atau Tawaran Kolaborasi",
      icon: <ArrowRight className="w-4 h-4" />,
      action: () => router.push("/kontak"),
    },

    // Projects
    {
      id: "proj-regarstore",
      category: "Proyek",
      title: "RegarStore — Microservices Java 21",
      subtitle: "Virtual Threads, RabbitMQ, Redis, 94 Automated Tests",
      icon: <Code2 className="w-4 h-4 text-[#C9A96E]" />,
      action: () => router.push("/proyek/regarstore"),
    },
    {
      id: "proj-stokkita",
      category: "Proyek",
      title: "StokKita — Multi-Tenant POS SaaS",
      subtitle: "Pessimistic Row-Locking, EOQ & Dynamic ROP",
      icon: <Code2 className="w-4 h-4 text-[#C9A96E]" />,
      action: () => router.push("/proyek/stokkita"),
    },
    {
      id: "proj-eventease",
      category: "Proyek",
      title: "Eventease — Event Ticketing Platform",
      subtitle: "WebSocket STOMP Gate Scanner, Bucket4j Anti-Bot",
      icon: <Code2 className="w-4 h-4 text-[#C9A96E]" />,
      action: () => router.push("/proyek/eventease"),
    },
    {
      id: "proj-simaka",
      category: "Proyek",
      title: "SIMAKA Enterprise — HR & Attendance",
      subtitle: "Spring Security RBAC, Geolocation Audit",
      icon: <Code2 className="w-4 h-4 text-[#C9A96E]" />,
      action: () => router.push("/proyek/simaka"),
    },

    // Quick Actions
    {
      id: "act-swagger",
      category: "Aksi Cepat",
      title: "Buka Live Swagger UI (Dokploy VPS)",
      subtitle: "Dokumentasi Interaktif API RegarStore",
      icon: <ExternalLink className="w-4 h-4 text-sky-400" />,
      action: () => window.open("https://regarstore.145.79.8.137.sslip.io/webjars/swagger-ui/index.html", "_blank"),
    },
    {
      id: "act-github",
      category: "Aksi Cepat",
      title: "Buka GitHub Profile",
      subtitle: "github.com/DujanahSr",
      icon: <ExternalLink className="w-4 h-4" />,
      action: () => window.open("https://github.com/DujanahSr", "_blank"),
    },
    {
      id: "act-lang",
      category: "Aksi Cepat",
      title: lang === "id" ? "Ganti ke Bahasa Inggris (Switch to English)" : "Ganti ke Bahasa Indonesia",
      subtitle: `Aktif saat ini: ${lang.toUpperCase()}`,
      icon: <Globe className="w-4 h-4" />,
      action: () => setLang(lang === "id" ? "en" : "id"),
    },
    {
      id: "act-sound",
      category: "Aksi Cepat",
      title: "Toggle Audio Ambience & Soundscape",
      subtitle: "Aktifkan/Nonaktifkan Web Audio Synthesizer",
      icon: <Volume2 className="w-4 h-4" />,
      action: () => audioController.toggleSound(),
    },
  ];

  const filtered = commands.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: CommandItem) => {
    audioController.playMechanicalClick();
    item.action();
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      audioController.playHoverTick();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      audioController.playHoverTick();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      handleSelect(filtered[selectedIndex]);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Spotlight Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl rounded-2xl border border-[#C9A96E]/30 bg-[#0C0C0C]/95 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(201,169,110,0.15)] overflow-hidden"
            >
              {/* Top ambient glow line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/60 to-transparent" />

              {/* Input Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E8DCC8]/10">
                <Search className="w-5 h-5 text-[#C9A96E]" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Ketik perintah atau navigasi (misal: 'regarstore', 'swagger', 'cv')..."
                  className="w-full bg-transparent text-[#E8DCC8] placeholder-[#736A62] text-sm focus:outline-none font-sans"
                />
                <span className="font-mono text-[0.62rem] text-[#8A8078] bg-[#1a1a1a] px-2 py-0.5 rounded border border-[#E8DCC8]/10 uppercase tracking-wider">
                  ESC to close
                </span>
              </div>

              {/* List */}
              <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
                {filtered.length === 0 ? (
                  <div className="p-8 text-center text-[#8A8078] font-mono text-xs">
                    Tidak ditemukan perintah yang cocok dengan &quot;{query}&quot;
                  </div>
                ) : (
                  filtered.map((item, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => {
                          setSelectedIndex(idx);
                          audioController.playHoverTick();
                        }}
                        className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-150 ${
                          isSelected
                            ? "bg-[#C9A96E]/15 border border-[#C9A96E]/40 text-[#E8DCC8]"
                            : "border border-transparent text-[#A89F91] hover:text-[#E8DCC8]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              isSelected ? "bg-[#C9A96E]/20 text-[#C9A96E]" : "bg-[#181818] text-[#8A8078]"
                            }`}
                          >
                            {item.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm text-[#E8DCC8]">{item.title}</span>
                              <span className="font-mono text-[0.58rem] text-[#C9A96E] uppercase tracking-wider bg-[#C9A96E]/10 px-1.5 py-0.2 rounded">
                                {item.category}
                              </span>
                            </div>
                            {item.subtitle && (
                              <p className="font-mono text-[0.68rem] text-[#8A8078]">{item.subtitle}</p>
                            )}
                          </div>
                        </div>

                        {isSelected && (
                          <div className="flex items-center gap-1 text-[#C9A96E] font-mono text-[0.65rem]">
                            <span>PILIH</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer hint */}
              <div className="flex items-center justify-between px-5 py-2.5 bg-[#080808] border-t border-[#E8DCC8]/06 text-[0.62rem] font-mono text-[#8A8078]">
                <div className="flex items-center gap-3">
                  <span>↑↓ Navigasi</span>
                  <span>↵ Pilih</span>
                </div>
                <span>Command Palette · Abu Dujanah Siregar</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
