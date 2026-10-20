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
  Volume2,
  VolumeX,
  Code2,
  Copy,
  Check,
  Activity,
  Server,
  Database,
  Radio,
  FileCode,
  RotateCcw,
} from "lucide-react";
import { playClick, playHoverTick } from "@/lib/audio";

interface QAPair {
  id: string;
  category: "Java & Loom" | "ACID & Locks" | "Microservices" | "Kredensial & PUB" | "DevOps & Dokploy" | "Karir";
  question: string;
  summary: string;
  response: string;
  actionText?: string;
  actionType?: "scroll" | "tab" | "event";
  actionPayload?: string;
  codeSnippetId?: string;
}

const CODE_SNIPPETS = {
  inventoryLock: {
    title: "StokKitaInventoryService.java",
    lang: "java",
    badge: "PostgreSQL Row-Locking (ACID)",
    code: `@Service
@RequiredArgsConstructor
public class InventoryLockService {

    private final InventoryRepository inventoryRepository;
    private final StringRedisTemplate redisTemplate;
    private static final String CACHE_KEY = "stock:sku:";

    /**
     * Mitigasi Race Condition & Overselling inventori via
     * Double-Check: In-Memory Redis DECR + DB Pessimistic Row Lock
     */
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public StockReservationResult reserveStock(Long productId, int quantity) {
        // 1. FAST-FAIL: Atomic in-memory pre-check via Redis
        Long remainingCache = redisTemplate.opsForValue()
            .decrement(CACHE_KEY + productId, quantity);

        if (remainingCache != null && remainingCache < 0) {
            // Revert atomic counter and abort immediately (sub-1ms response)
            redisTemplate.opsForValue().increment(CACHE_KEY + productId, quantity);
            throw new InsufficientStockException("Out of stock in Redis pre-check");
        }

        // 2. RELIABILITY: Pessimistic Row-Locking at Database level
        // Generates: SELECT * FROM product_inventory WHERE id = ? FOR UPDATE
        ProductInventory item = inventoryRepository.findByProductIdWithPessimisticLock(productId)
            .orElseThrow(() -> new EntityNotFoundException("Product ID not found: " + productId));

        if (item.getAvailableStock() < quantity) {
            throw new InsufficientStockException("Insufficient database stock");
        }

        item.deductStock(quantity);
        inventoryRepository.save(item);

        return new StockReservationResult(item.getAvailableStock(), Status.RESERVED);
    }
}`,
    notes: "Diterapkan di StokKita untuk menjamin 0.00% deadlock dan zero overselling saat flash sale dengan ratusan transaksi konkuren simultan.",
  },
  rabbitPublisher: {
    title: "OrderEventPublisher.java",
    lang: "java",
    badge: "RabbitMQ Event-Driven + DLQ",
    code: `@Service
@RequiredArgsConstructor
@Slf4j
public class OrderEventPublisher {

    private final RabbitTemplate rabbitTemplate;
    public static final String EXCHANGE_ORDER = "regarstore.order.exchange";
    public static final String ROUTING_KEY_CREATED = "order.event.created";

    /**
     * Menerbitkan event asinkron dengan Correlation ID untuk idempotensi
     * dan fallback Dead Letter Exchange (DLX) jika consumer gagal.
     */
    public void publishOrderCreated(OrderCreatedPayload payload) {
        log.info("Ingress event order: ID={}, amount={}", payload.orderId(), payload.totalAmount());

        rabbitTemplate.convertAndSend(
            EXCHANGE_ORDER,
            ROUTING_KEY_CREATED,
            payload,
            message -> {
                MessageProperties props = message.getMessageProperties();
                props.setCorrelationId(payload.orderId().toString());
                props.setHeader("x-retry-limit", 3);
                props.setHeader("x-timestamp", System.currentTimeMillis());
                return message;
            }
        );
    }
}`,
    notes: "Mencegah order checkout macet saat payment gateway pihak ketiga timeout. Event dialihkan ke Dead Letter Queue untuk retry bertahap.",
  },
  virtualThreads: {
    title: "VirtualThreadConfig.java",
    lang: "java",
    badge: "Java 21 Project Loom Concurrency",
    code: `@Configuration
public class VirtualThreadConfig {

    /**
     * Konfigurasi Tomcat Embedded & Spring Task Executor
     * agar setiap incoming HTTP request dieksekusi di atas Virtual Thread JVM
     */
    @Bean(TaskExecutionAutoConfiguration.APPLICATION_TASK_EXECUTOR_BEAN_NAME)
    public AsyncTaskExecutor applicationTaskExecutor() {
        return new TaskExecutorAdapter(
            Executors.newVirtualThreadPerTaskExecutor()
        );
    }

    @Bean
    public TomcatProtocolHandlerCustomizer<?> tomcatVirtualThreadsCustomizer() {
        return protocolHandler -> protocolHandler.setExecutor(
            Executors.newVirtualThreadPerTaskExecutor()
        );
    }
}`,
    notes: "Menghasilkan throughput 28.500+ RPS dengan P99 latensi 12ms tanpa perlu reactive callback hell (Spring WebFlux).",
  },
};

const KNOWLEDGE_BASE: QAPair[] = [
  {
    id: "virtual-threads",
    category: "Java & Loom",
    question: "Mengapa memilih Java 21 Virtual Threads daripada Reactive WebFlux?",
    summary: "Imperative programming yang mudah didebug + throughput 28.000+ RPS tanpa overhead memori.",
    response: `**Keputusan Arsitektur Abu Dujanah Siregar:**

1. **Eliminasi Callback Hell Reactive**: Spring WebFlux (Project Reactor) memaksakan paradigma non-blocking yang memecah stack trace, menyulitkan tracing \`ThreadLocal\` (misalnya security context), dan mempersulit observabilitas saat error terjadi di production.
2. **Virtual Threads (Project Loom)**: Menghadirkan eksekusi imperatif murni (kode lurus, mudah dibaca, dan mudah di-unit test), namun thread dijalankan sebagai *lightweight user-mode fiber* oleh JVM (~1 KB per thread vs ~1 MB pada platform thread Tomcat biasa).
3. **Hasil Benchmark RegarStore**: Mendukung 10.000+ koneksi konkuren simultan dengan latensi P99 hanya **12ms** tanpa membebani thread pool OS carrier.`,
    actionText: "Periksa Kode VirtualThreadConfig.java",
    actionType: "tab",
    actionPayload: "code:virtualThreads",
    codeSnippetId: "virtualThreads",
  },
  {
    id: "stokkita-locking",
    category: "ACID & Locks",
    question: "Bagaimana cara StokKita mencegah race condition & overselling inventori?",
    summary: "Pessimistic Row-Locking (SELECT FOR UPDATE) + Redis Atomic Decr Fast-Fail.",
    response: `**Strategi Transaksi ACID StokKita:**

1. **Redis Atomic Fast-Fail**: Sebelum request menyentuh PostgreSQL relational, Redis mengecek stok dengan operasi atomik \`DECR\`. Jika stok habis di memori, request langsung ditolak (latensi < 1ms) untuk melindungi database relasional.
2. **Pessimistic Row-Locking (@Lock)**: Di level repository PostgreSQL, query dijalankan dengan klausul \`SELECT ... FOR UPDATE\` (LockModeType.PESSIMISTIC_WRITE). Baris stok produk dikunci secara eksklusif sehingga transaksi konkuren lain wajib mengantri secara teratur hingga transaksi pertama commit.
3. **Hasil Terukur**: **0.00% Deadlock & Zero Overselling** bahkan saat simulasi ratusan pengguna menekan tombol checkout dalam milidetik yang sama.`,
    actionText: "Periksa Kode InventoryLockService.java",
    actionType: "tab",
    actionPayload: "code:inventoryLock",
    codeSnippetId: "inventoryLock",
  },
  {
    id: "regarstore-microservices",
    category: "Microservices",
    question: "Bagaimana arsitektur 6 microservices di RegarStore saling berkomunikasi?",
    summary: "Spring Cloud Gateway + RabbitMQ Asinkron dengan Dead Letter Queue (DLQ).",
    response: `**Topologi Sistem Terdistribusi RegarStore:**

1. **API Gateway (Port 8080)**: Mengatur reverse proxy, SSL termination, validasi stateless JWT, dan rate-limiting token bucket.
2. **Asynchronous Order Ingestion (RabbitMQ)**: Transaksi pesanan tidak memanggil service eksternal secara sinkron. Order diterbitkan ke RabbitMQ exchange, dan client menerima response \`HTTP 202 Accepted\` seketika.
3. **Dead Letter Queue (DLQ)**: Jika webhook payment gateway pihak ketiga mengalami timeout atau server down, message otomatis dialihkan ke antrean DLQ untuk retry bertahap dengan *exponential backoff* tanpa ada data pesanan yang hilang.`,
    actionText: "Jalankan Chaos Engineering Sandbox",
    actionType: "scroll",
    actionPayload: "architecture-playground",
    codeSnippetId: "rabbitPublisher",
  },
  {
    id: "pendidikan-pub",
    category: "Kredensial & PUB",
    question: "Ceritakan latar belakang pendidikan, IPK, dan Beasiswa PUB Abu Dujanah.",
    summary: "S1 Teknik Industri UNAS PASIM Bandung (Akselerasi 3 Tahun, IPK 3.75, Beasiswa Penuh PUB).",
    response: `**Riwayat Akademik & Kepemimpinan:**

1. **Universitas Nasional PASIM Bandung**: Menempuh program akselerasi Sarjana Teknik Industri (S1) lulus dalam 3 tahun (2023 – 2026) dengan **IPK 3.75 / 4.00**.
2. **Beasiswa Penuh Yayasan PUB**: Diterima melalui seleksi kompetitif Beasiswa Penuh Pemberdayaan Umat Berkelanjutan (PUB) oleh Yayasan Pendidikan Wiranata atas dasar prestasi akademik dan karakter integritas.
3. **Instruktur Praktikum Java**: Dipercaya menjadi asisten laboratorium komputer untuk membimbing mahasiswa dalam pemrograman berorientasi objek (Java OOP), algoritma, dan desain basis data relational.`,
    actionText: "Periksa 3D Cryptographic Dossier",
    actionType: "scroll",
    actionPayload: "dossier",
  },
  {
    id: "dokploy-devops",
    category: "DevOps & Dokploy",
    question: "Bagaimana strategi deployment dan CI/CD yang Anda gunakan di VPS?",
    summary: "Dokploy PaaS self-hosted + Docker Compose multi-stage + Traefik Auto-SSL.",
    response: `**Infrastruktur & Pipeline Deployment:**

1. **Dokploy PaaS**: Mengelola container Docker secara self-hosted di VPS Linux dengan overhead minimal dibandingkan Kubernetes untuk efisiensi resource.
2. **Traefik Reverse Proxy**: Otomatisasi penerbitan sertifikat Let's Encrypt SSL, load-balancing internal, dan perutean domain dinamis.
3. **Multi-Stage Docker Builds**: Mengisolasi build stage Maven/JDK 21 ke JRE slim runtime (Alpine/Distroless), memperkecil image footprint dari ~800MB menjadi ~180MB untuk cold-start super cepat.`,
    actionText: "Aktifkan X-Ray Jeroan Arsitektur",
    actionType: "event",
    actionPayload: "toggle-xray-mode",
  },
  {
    id: "kesiapan-karir",
    category: "Karir",
    question: "Apakah Abu Dujanah siap bekerja dan peran apa yang dicari?",
    summary: "Tersedia untuk peran Backend Developer / Full-Stack Engineer (Remote / Onsite).",
    response: `**Ketersediaan & Minat Profesional:**

- **Target Posisi**: Backend Developer (Java / Spring Boot), Full-Stack Engineer (Java + React/Next.js), atau Cloud/DevOps Associate.
- **Kesiapan Kerja**: Siap segera (Available immediately), fleksibel untuk remote, hybrid, maupun onsite (Bandung / Jakarta).
- **Nilai Tambah**: Disiplin tinggi tempaan Pesantren & PUB, akselerasi lulus 3 tahun, terbukti menguasai sistem konkurensi tinggi ber-ACID compliance, dan kemampuan problem-solving sistemik.`,
    actionText: "Hubungi Abu Dujanah Siregar",
    actionType: "scroll",
    actionPayload: "kontak",
  },
];

export function ArchitecturalCoPilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "code" | "telemetry">("chat");
  const [selectedCodeId, setSelectedCodeId] = useState<keyof typeof CODE_SNIPPETS>("inventoryLock");
  const [copiedCode, setCopiedCode] = useState(false);

  // Audio Voice Synthesis
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Chat conversation state
  const [messages, setMessages] = useState<
    {
      role: "assistant" | "user";
      text: string;
      action?: { text: string; type: "scroll" | "tab" | "event"; payload: string };
    }[]
  >([
    {
      role: "assistant",
      text: "Halo! Saya **Dujanah AI Twin v4.0**, kembaran arsitektur virtual Abu Dujanah Siregar. Tanyakan keputusan rekayasa sistem, konkurensi Java 21, arsitektur microservices RegarStore, atau latar belakang akademik saya.",
    },
  ]);
  const [userQuery, setUserQuery] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

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
    const lenis =
      typeof window !== "undefined"
        ? (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis
        : null;
    if (isOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
      // Cancel speech if closed
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isOpen]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  // Voice synthesis utterance trigger
  const speakText = (text: string) => {
    if (!voiceEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    // Clean markdown symbols for cleaner speech
    const clean = text
      .replace(/[*#`_]/g, "")
      .replace(/\[.*?\]\(.*?\)/g, "")
      .slice(0, 320); // reasonable bite size

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = "id-ID";
    utterance.rate = 1.05;
    utterance.pitch = 0.95;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Streaming simulated response
  const streamResponse = (
    fullText: string,
    action?: { text: string; type: "scroll" | "tab" | "event"; payload: string }
  ) => {
    setIsStreaming(true);
    speakText(fullText);

    // Initial empty assistant message
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: "",
        action,
      },
    ]);

    let charIndex = 0;
    const chunkSize = 4;
    const interval = setInterval(() => {
      charIndex += chunkSize;
      const currentSlice = fullText.slice(0, charIndex);

      setMessages((prev) => {
        const copy = [...prev];
        const lastIdx = copy.length - 1;
        if (copy[lastIdx] && copy[lastIdx].role === "assistant") {
          copy[lastIdx] = {
            ...copy[lastIdx],
            text: currentSlice,
            action: charIndex >= fullText.length ? action : undefined,
          };
        }
        return copy;
      });

      if (charIndex >= fullText.length) {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, 18);
  };

  const handleSelectQA = (qa: QAPair) => {
    if (isStreaming) return;
    playClick();

    setMessages((prev) => [...prev, { role: "user", text: qa.question }]);

    setTimeout(() => {
      streamResponse(
        qa.response,
        qa.actionText && qa.actionType && qa.actionPayload
          ? { text: qa.actionText, type: qa.actionType, payload: qa.actionPayload }
          : undefined
      );
    }, 150);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = userQuery.trim();
    if (!query || isStreaming) return;

    playClick();
    setMessages((prev) => [...prev, { role: "user", text: query }]);
    setUserQuery("");

    // Semantic intent search
    const lower = query.toLowerCase();
    const matched = KNOWLEDGE_BASE.find((k) => {
      if (lower.includes("virtual") || lower.includes("loom") || lower.includes("thread") || lower.includes("webflux")) {
        return k.id === "virtual-threads";
      }
      if (lower.includes("race") || lower.includes("stok") || lower.includes("lock") || lower.includes("acid")) {
        return k.id === "stokkita-locking";
      }
      if (lower.includes("microservice") || lower.includes("regar") || lower.includes("rabbit") || lower.includes("dlq")) {
        return k.id === "regarstore-microservices";
      }
      if (lower.includes("pasim") || lower.includes("kuliah") || lower.includes("ipk") || lower.includes("pub") || lower.includes("pendidikan")) {
        return k.id === "pendidikan-pub";
      }
      if (lower.includes("docker") || lower.includes("dokploy") || lower.includes("deploy") || lower.includes("traefik")) {
        return k.id === "dokploy-devops";
      }
      if (lower.includes("kerja") || lower.includes("karir") || lower.includes("hire") || lower.includes("gaji") || lower.includes("kontak")) {
        return k.id === "kesiapan-karir";
      }
      return false;
    });

    setTimeout(() => {
      if (matched) {
        streamResponse(
          matched.response,
          matched.actionText && matched.actionType && matched.actionPayload
            ? { text: matched.actionText, type: matched.actionType, payload: matched.actionPayload }
            : undefined
        );
      } else {
        const fallbackText = `Terima kasih atas pertanyaannya mengenai "${query}". 

Sebagai Backend & Full-Stack Developer spesialis **Java 21 Spring Boot 3 & React 19**, Abu Dujanah Siregar fokus pada:
- **Konkurensi Skala Tinggi**: Virtual Threads (Loom) & Event-Driven RabbitMQ.
- **Integritas Transaksi**: Pessimistic Locking PostgreSQL & Redis Caching.
- **DevOps Mandiri**: Dokploy, Docker Compose, & Reverse Proxy Traefik.

Silakan pilih topik di bawah ini untuk melihat implementasi arsitektur atau kode sumber spesifik:`;
        streamResponse(fallbackText);
      }
    }, 200);
  };

  const handleAction = (action: { type: "scroll" | "tab" | "event"; payload: string }) => {
    playClick();
    if (action.type === "tab") {
      const parts = action.payload.split(":");
      if (parts[0] === "code" && parts[1]) {
        setSelectedCodeId(parts[1] as keyof typeof CODE_SNIPPETS);
        setActiveTab("code");
      }
    } else if (action.type === "scroll") {
      setIsOpen(false);
      setTimeout(() => {
        const el = document.getElementById(action.payload);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 250);
    } else if (action.type === "event") {
      window.dispatchEvent(new CustomEvent(action.payload));
      setIsOpen(false);
    }
  };

  const copyCodeToClipboard = () => {
    playClick();
    navigator.clipboard.writeText(CODE_SNIPPETS[selectedCodeId].code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const categories = ["Semua", "Java & Loom", "ACID & Locks", "Microservices", "Kredensial & PUB", "DevOps & Dokploy", "Karir"];

  const filteredQA =
    selectedCategory === "Semua"
      ? KNOWLEDGE_BASE
      : KNOWLEDGE_BASE.filter((q) => q.category === selectedCategory);

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
            className="fixed inset-0 z-[230] bg-black/80 backdrop-blur-md"
          />

          {/* AI Twin Executive Workstation Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[700px] sm:max-h-[88vh] sm:h-[620px] z-[240] rounded-2xl border border-[#C9A96E]/40 bg-[#0A0A09]/98 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_50px_rgba(201,169,110,0.18)] flex flex-col font-sans overflow-hidden"
          >
            {/* Top Bar: Telemetry Header & Voice Controls */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#12110E] border-b border-[#C9A96E]/20 text-[#E8DCC8]">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-[#C9A96E]/20 to-black border border-[#C9A96E]/40 flex items-center justify-center text-[#C9A96E]">
                  <Bot className="w-4 h-4" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-base text-[#E8DCC8]">
                      Dujanah AI Twin
                    </span>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#C9A96E]/20 text-[#C9A96E] font-bold border border-[#C9A96E]/30">
                      NEURAL v4.0
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[9.5px] text-[#8A8078]">
                    <span className="flex items-center gap-1.5 text-[#C9A96E]">
                      <span className="font-mono text-[8px] px-1 py-0.2 rounded bg-[#C9A96E]/15 border border-[#C9A96E]/30 text-[#C9A96E] font-bold">SYS:OK</span>
                      <span>12ms</span>
                    </span>
                    <span>·</span>
                    <span>SPRING &amp; REACT CO-PILOT</span>
                  </div>
                </div>
              </div>

              {/* Header Right Tools */}
              <div className="flex items-center gap-2">
                {/* Voice Synthesis Toggle */}
                <button
                  onClick={() => {
                    playClick();
                    setVoiceEnabled(!voiceEnabled);
                    if (voiceEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
                      window.speechSynthesis.cancel();
                      setIsSpeaking(false);
                    }
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-mono text-[9.5px] transition-all ${
                    voiceEnabled
                      ? "bg-[#22C55E]/15 border-[#22C55E]/40 text-[#22C55E]"
                      : "bg-white/[0.03] border-white/10 text-[#8A8078] hover:text-[#E8DCC8]"
                  }`}
                  title="Aktifkan / Matikan Suara AI"
                >
                  {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{voiceEnabled ? "VOICE: ON" : "VOICE: OFF"}</span>
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-[#8A8078] hover:text-[#E8DCC8] rounded-lg hover:bg-white/5 transition-colors"
                  title="Tutup Co-Pilot (ESC)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Studio Navigation Tabs */}
            <div className="flex items-center border-b border-white/5 px-4 bg-black/40 text-xs font-mono">
              <button
                onClick={() => {
                  playClick();
                  setActiveTab("chat");
                }}
                className={`py-2.5 px-3 border-b-2 font-medium flex items-center gap-2 transition-colors ${
                  activeTab === "chat"
                    ? "border-[#C9A96E] text-[#C9A96E]"
                    : "border-transparent text-[#8A8078] hover:text-[#E8DCC8]"
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>ARCHITECT CHAT</span>
              </button>

              <button
                onClick={() => {
                  playClick();
                  setActiveTab("code");
                }}
                className={`py-2.5 px-3 border-b-2 font-medium flex items-center gap-2 transition-colors ${
                  activeTab === "code"
                    ? "border-[#C9A96E] text-[#C9A96E]"
                    : "border-transparent text-[#8A8078] hover:text-[#E8DCC8]"
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>CODE INSPECTOR</span>
              </button>

              <button
                onClick={() => {
                  playClick();
                  setActiveTab("telemetry");
                }}
                className={`py-2.5 px-3 border-b-2 font-medium flex items-center gap-2 transition-colors ${
                  activeTab === "telemetry"
                    ? "border-[#C9A96E] text-[#C9A96E]"
                    : "border-transparent text-[#8A8078] hover:text-[#E8DCC8]"
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>LIVE TELEMETRY</span>
              </button>
            </div>

            {/* TAB 1: ARCHITECT CHAT */}
            {activeTab === "chat" && (
              <div className="flex-1 flex flex-col min-h-0">
                {/* Category Filter & Quick Questions */}
                <div className="p-3 bg-black/60 border-b border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-[#C9A96E] uppercase tracking-wider font-bold">
                      PERTANYAAN ARSITEKTUR REKOMENDASI:
                    </span>
                    {isSpeaking && (
                      <span className="flex items-center gap-1 font-mono text-[9px] text-[#C9A96E]">
                        <span>◈</span> Speaking...
                      </span>
                    )}
                  </div>

                  {/* Horizontal Scroll of Questions */}
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {filteredQA.map((qa) => (
                      <button
                        key={qa.id}
                        onClick={() => handleSelectQA(qa)}
                        onMouseEnter={() => playHoverTick()}
                        disabled={isStreaming}
                        className="flex-shrink-0 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.02] hover:border-[#C9A96E]/50 hover:bg-[#C9A96E]/10 text-left font-mono text-[10px] text-[#A89F91] hover:text-[#E8DCC8] transition-all disabled:opacity-50"
                      >
                        <span className="text-[#C9A96E] mr-1">◈</span>
                        <span>{qa.category}: {qa.question.slice(0, 32)}...</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conversation History */}
                <div
                  ref={chatScrollRef}
                  className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 text-xs leading-relaxed"
                >
                  {messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col ${
                        m.role === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`max-w-[92%] p-4 rounded-2xl ${
                          m.role === "user"
                            ? "bg-[#C9A96E]/20 text-[#E8DCC8] border border-[#C9A96E]/40 font-mono text-[11px]"
                            : "bg-[#11100E] text-[#D8CDC0] border border-white/10 shadow-lg"
                        }`}
                      >
                        <div className="whitespace-pre-wrap space-y-2 font-sans">
                          {m.text}
                          {isStreaming && idx === messages.length - 1 && m.role === "assistant" && (
                            <span className="inline-block w-2 h-3.5 bg-[#C9A96E] ml-1 opacity-90" />
                          )}
                        </div>

                        {/* Interactive Deep-link action button */}
                        {m.action && !isStreaming && (
                          <div className="mt-3.5 pt-3 border-t border-white/10">
                            <button
                              onClick={() => handleAction(m.action!)}
                              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#C9A96E]/15 border border-[#C9A96E]/40 text-[#C9A96E] hover:bg-[#C9A96E] hover:text-black font-mono text-[10.5px] font-bold transition-all shadow-sm"
                            >
                              <span>{m.action.text}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isStreaming && (
                    <div className="flex items-center gap-2 text-[#8A8078] font-mono text-[10px] pl-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
                      <span>Synthesizing architectural knowledge...</span>
                    </div>
                  )}
                </div>

                {/* Input Bar */}
                <form
                  onSubmit={handleCustomSubmit}
                  className="p-3 bg-[#11100E] border-t border-white/10 flex items-center gap-2"
                >
                  <input
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    placeholder="Tanyakan topik rekayasa (cth: 'Virtual Threads', 'Row-locking', 'Kesiapan kerja')..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-[#E8DCC8] placeholder-[#6B6560] focus:outline-none focus:border-[#C9A96E] font-sans"
                  />
                  <button
                    type="submit"
                    disabled={isStreaming}
                    className="p-2.5 rounded-xl bg-[#C9A96E] text-black font-bold hover:bg-[#E8DCC8] transition-colors disabled:opacity-50"
                    title="Kirim Pertanyaan"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* TAB 2: CODE & ARCHITECTURE INSPECTOR */}
            {activeTab === "code" && (
              <div className="flex-1 flex flex-col min-h-0 bg-[#0C0B0A] text-xs">
                {/* File Switcher Selector */}
                <div className="p-3 border-b border-white/10 flex items-center justify-between bg-black/50">
                  <div className="flex items-center gap-2">
                    {(Object.keys(CODE_SNIPPETS) as Array<keyof typeof CODE_SNIPPETS>).map((key) => (
                      <button
                        key={key}
                        onClick={() => {
                          playClick();
                          setSelectedCodeId(key);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[10.5px] transition-all ${
                          selectedCodeId === key
                            ? "bg-[#C9A96E] text-black font-bold"
                            : "bg-white/[0.04] text-[#8A8078] hover:text-[#E8DCC8]"
                        }`}
                      >
                        <FileCode className="w-3.5 h-3.5" />
                        <span>{CODE_SNIPPETS[key].title}</span>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={copyCodeToClipboard}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#C9A96E] border border-[#C9A96E]/30 font-mono text-[10px] transition-all"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? "TERSALIN" : "SALIN KODE"}</span>
                  </button>
                </div>

                {/* Code Viewer */}
                <div className="flex-1 p-4 overflow-y-auto font-mono text-[11px] leading-relaxed bg-[#070706]">
                  <div className="mb-3 px-3 py-2 rounded-lg bg-[#C9A96E]/10 border border-[#C9A96E]/30 flex items-center justify-between text-[#C9A96E]">
                    <span className="font-bold">{CODE_SNIPPETS[selectedCodeId].badge}</span>
                    <span className="text-[10px] text-[#A89F91]">Java 21 · Spring Boot 3</span>
                  </div>

                  <pre className="text-[#E8DCC8] overflow-x-auto p-4 rounded-xl bg-black/60 border border-white/5">
                    <code>{CODE_SNIPPETS[selectedCodeId].code}</code>
                  </pre>

                  <div className="mt-4 p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-[#A89F91]">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#C9A96E] block mb-1 font-bold">
                      RATIONALE ARSITEKTUR:
                    </span>
                    <p className="font-sans text-xs text-[#E8DCC8]">
                      {CODE_SNIPPETS[selectedCodeId].notes}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: LIVE TELEMETRY & SYSTEM MATRIX */}
            {activeTab === "telemetry" && (
              <div className="flex-1 p-5 overflow-y-auto space-y-4 font-mono text-xs bg-[#090807]">
                <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-[#C9A96E] font-bold">SIMULATED PRODUCTION MESH STATUS</span>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30">
                      HEALTH: 100% HEALTHY
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex justify-between items-center">
                      <span className="text-[#8A8078]">api-gateway (Port 8080)</span>
                      <span className="text-[#22C55E] font-bold">200 OK · 4ms</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex justify-between items-center">
                      <span className="text-[#8A8078]">order-service (Port 8082)</span>
                      <span className="text-[#22C55E] font-bold">200 OK · 12ms</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex justify-between items-center">
                      <span className="text-[#8A8078]">catalog-service (Port 8081)</span>
                      <span className="text-[#22C55E] font-bold">200 OK · 6ms</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex justify-between items-center">
                      <span className="text-[#8A8078]">payment-service (Port 8084)</span>
                      <span className="text-[#22C55E] font-bold">200 OK · 18ms</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex justify-between items-center">
                      <span className="text-[#8A8078]">rabbitmq-broker (Port 5672)</span>
                      <span className="text-[#38BDF8] font-bold">CONNECTED · 0 DLQ</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex justify-between items-center">
                      <span className="text-[#8A8078]">redis-cache (Port 6379)</span>
                      <span className="text-[#38BDF8] font-bold">HIT 99.2% · sub-1ms</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-2">
                  <span className="text-[#C9A96E] font-bold block">TRANSACTION CONCURRENCY GUARANTEES</span>
                  <div className="space-y-1.5 text-[#A89F91] text-[11px] font-sans">
                    <p>• <strong>Isolation Level:</strong> PostgreSQL <code className="text-[#C9A96E]">READ COMMITTED</code> + Row-Locking <code className="text-[#C9A96E]">FOR UPDATE</code></p>
                    <p>• <strong>Idempotensi Order:</strong> Correlation ID matching via RabbitMQ message header properties</p>
                    <p>• <strong>Throughput Target:</strong> 28.500+ RPS sustained via Virtual Threads Project Loom</p>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      window.dispatchEvent(new CustomEvent("toggle-xray-mode"));
                    }}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#C9A96E]/20 border border-[#C9A96E]/50 text-[#C9A96E] hover:bg-[#C9A96E] hover:text-black font-mono text-[10.5px] font-bold transition-all"
                  >
                    <span>LUNCURKAN FULLSCREEN X-RAY PCB MODE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
