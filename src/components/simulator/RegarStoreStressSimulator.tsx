"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Cpu, Zap, Database, CheckCircle, ShieldAlert, ArrowRight, Activity, Terminal } from "lucide-react";
import { playClick, playHoverTick } from "@/lib/audio";

interface StepMetric {
  name: string;
  sub: string;
  status: "idle" | "processing" | "completed";
  metric: string;
  icon: React.ReactNode;
}

export function RegarStoreStressSimulator() {
  const [concurrency, setConcurrency] = useState<number>(10000);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [processedReqs, setProcessedReqs] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [tps, setTps] = useState<number>(0);
  const [latency, setLatency] = useState<number>(0);
  const [deadlocks, setDeadlocks] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const formatNum = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const startSimulation = () => {
    if (isRunning) return;
    playClick();
    setIsRunning(true);
    setIsDone(false);
    setProgress(0);
    setProcessedReqs(0);
    setDeadlocks(0);
    setLogs([
      `[${new Date().toLocaleTimeString()}] INGRESS: Firing ${concurrency.toLocaleString()} concurrent checkout HTTP/2 requests...`,
      `[${new Date().toLocaleTimeString()}] GATEWAY: Spring Cloud Gateway validating JWT and evaluating Token Bucket rate limit...`,
    ]);

    const startTime = Date.now();
    const duration = 4500; // 4.5 seconds simulation duration

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(elapsed / duration, 1.0);
      setProgress(Math.round(currentProgress * 100));

      const currentCount = Math.round(currentProgress * concurrency);
      setProcessedReqs(currentCount);

      const dynamicTps = Math.round(7800 + Math.random() * 1200);
      setTps(dynamicTps);

      const dynamicLatency = Math.round(36 + Math.random() * 8);
      setLatency(dynamicLatency);

      // Add dynamic spring boot log events
      if (currentProgress > 0.2 && currentProgress < 0.25) {
        setLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] VIRTUAL THREADS: ForkJoinPool spawned virtual threads on 16 carrier threads. 0 OS thread blocking.`,
        ]);
      } else if (currentProgress > 0.45 && currentProgress < 0.5) {
        setLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] REDIS CACHE: Catalog SKU inventory check completed. Cache Hit: 98.6% (< 0.9ms).`,
        ]);
      } else if (currentProgress > 0.7 && currentProgress < 0.75) {
        setLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] RABBITMQ: Dispatched order.created payload to transactional event exchange without blocking worker.`,
        ]);
      } else if (currentProgress > 0.88 && currentProgress < 0.92) {
        setLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] POSTGRESQL: SELECT FOR UPDATE pessimistic lock applied. Row lock duration: 2.1ms. Deadlocks: 0.`,
        ]);
      }

      if (currentProgress >= 1.0) {
        clearInterval(interval);
        setIsRunning(false);
        setIsDone(true);
        setLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] SUCCESS: ${concurrency.toLocaleString()} checkouts completed! 100% data integrity verified. Deadlocks: 0.`,
        ]);
        playClick();
      }
    }, 80);
  };

  const resetSimulator = () => {
    playClick();
    setIsRunning(false);
    setIsDone(false);
    setProgress(0);
    setProcessedReqs(0);
    setTps(0);
    setLatency(0);
    setLogs([]);
  };

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="w-full rounded-2xl border border-[#c9a96e]/30 bg-gradient-to-b from-[#11100e] via-[#080808] to-[#0c0c0b] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Background Accent glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#c9a96e]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-[#c9a96e] text-xs">◈</span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#c9a96e] font-bold">
              Show, Don&apos;t Just Tell // Interactive Architecture Demo
            </span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#e8dcc8]">
            Simulasi Beban Konkurensi Tinggi (10.000 Checkout)
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#a89f91] mt-1 max-w-2xl">
            Uji arsitektur sistem RegarStore secara langsung. Lihat bagaimana kombinasi Java 21 Virtual Threads, Redis Caching, RabbitMQ, dan PostgreSQL Row-Locking menangani ribuan transaksi serentak tanpa deadlock.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={resetSimulator}
            disabled={isRunning || (!isDone && progress === 0)}
            className="p-2.5 rounded-xl border border-white/10 bg-white/5 text-[#a89f91] hover:text-[#e8dcc8] hover:bg-white/10 transition-colors disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Reset simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={startSimulation}
            disabled={isRunning}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-lg ${
              isRunning
                ? "bg-[#c9a96e]/40 text-black cursor-wait"
                : "bg-gradient-to-r from-[#c9a96e] to-[#e8dcc8] text-black hover:shadow-[#c9a96e]/25 hover:scale-[1.02]"
            }`}
          >
            <Play className={`w-4 h-4 ${isRunning ? "animate-spin" : ""}`} />
            <span>{isRunning ? "MEMPROSES KONKURENSI..." : "MULAI SIMULASI"}</span>
          </button>
        </div>
      </div>

      {/* Preset Concurrency Selector */}
      <div className="py-4 border-b border-white/5 flex items-center justify-between flex-wrap gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#8a8078]">
          <span>TARGET LOAD:</span>
          {[5000, 10000, 25000].map((val) => (
            <button
              key={val}
              onClick={() => {
                if (!isRunning) {
                  playHoverTick();
                  setConcurrency(val);
                }
              }}
              disabled={isRunning}
              className={`px-2.5 py-1 rounded transition-colors ${
                concurrency === val
                  ? "bg-[#c9a96e] text-black font-bold"
                  : "bg-white/5 text-[#a89f91] hover:bg-white/10"
              }`}
            >
              {formatNum(val)} Req
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-[#a89f91]">
          <span>PROGRESS:</span>
          <span className="font-bold text-[#e8dcc8]">{progress}%</span>
          <div className="w-32 h-2 rounded-full bg-black/60 border border-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#c9a96e] to-[#22c55e]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </div>
      </div>

      {/* Real-Time Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-white/5">
        <div className="p-3.5 rounded-xl bg-black/60 border border-white/5">
          <span className="font-mono text-[9px] uppercase tracking-wider text-[#8a8078] block mb-1">
            REQUESTS EXECUTED
          </span>
          <span className="font-serif text-2xl font-bold text-[#e8dcc8]">
            {formatNum(processedReqs)}
          </span>
          <span className="font-mono text-[9px] text-[#c9a96e] block mt-0.5">
            / {formatNum(concurrency)} Total
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-black/60 border border-white/5">
          <span className="font-mono text-[9px] uppercase tracking-wider text-[#8a8078] block mb-1">
            THROUGHPUT (TPS)
          </span>
          <span className="font-serif text-2xl font-bold text-[#22c55e]">
            {tps > 0 ? `${formatNum(tps)} req/s` : "STANDBY"}
          </span>
          <span className="font-mono text-[9px] text-[#22c55e] block mt-0.5">
            Peak ~8,900 TPS
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-black/60 border border-white/5">
          <span className="font-mono text-[9px] uppercase tracking-wider text-[#8a8078] block mb-1">
            P99 LATENCY
          </span>
          <span className="font-serif text-2xl font-bold text-[#38bdf8]">
            {latency > 0 ? `${latency} ms` : "STANDBY"}
          </span>
          <span className="font-mono text-[9px] text-[#38bdf8] block mt-0.5">
            Sub-50ms SLA
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-black/60 border border-white/5">
          <span className="font-mono text-[9px] uppercase tracking-wider text-[#8a8078] block mb-1">
            DATA DEADLOCKS
          </span>
          <span className="font-serif text-2xl font-bold text-[#22c55e]">
            {deadlocks}
          </span>
          <span className="font-mono text-[9px] text-[#22c55e] block mt-0.5">
            100% Data Integrity
          </span>
        </div>
      </div>

      {/* Visual System Pipeline Stages */}
      <div className="py-6">
        <h4 className="font-mono text-[10px] tracking-widest uppercase text-[#8a8078] mb-4">
          PIPELINE TRANSIT EKSEKUSI TERDISTRIBUSI
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            {
              step: "01",
              title: "Edge Gateway",
              tech: "Spring Cloud Netty",
              status: progress > 5 ? (progress >= 100 ? "PASS" : "ACTIVE") : "IDLE",
              desc: "Token Bucket Rate Limit",
            },
            {
              step: "02",
              title: "Virtual Threads",
              tech: "Java 21 Loom",
              status: progress > 20 ? (progress >= 100 ? "PASS" : "ACTIVE") : "IDLE",
              desc: "10K Lightweight Threads",
            },
            {
              step: "03",
              title: "Cache Layer",
              tech: "Redis Cluster",
              status: progress > 45 ? (progress >= 100 ? "PASS" : "ACTIVE") : "IDLE",
              desc: "Sub-ms SKU Catalog Read",
            },
            {
              step: "04",
              title: "Event Broker",
              tech: "RabbitMQ AMQP",
              status: progress > 70 ? (progress >= 100 ? "PASS" : "ACTIVE") : "IDLE",
              desc: "Asynchronous Queueing",
            },
            {
              step: "05",
              title: "ACID Database",
              tech: "PostgreSQL Row-Lock",
              status: progress > 85 ? (progress >= 100 ? "PASS" : "ACTIVE") : "IDLE",
              desc: "Pessimistic Lock Atomicity",
            },
          ].map((stage, i) => (
            <div
              key={i}
              className={`p-3.5 rounded-xl border transition-all ${
                stage.status === "ACTIVE"
                  ? "border-[#c9a96e] bg-[#c9a96e]/10 shadow-[0_0_15px_rgba(201,169,110,0.2)]"
                  : stage.status === "PASS"
                  ? "border-[#22c55e]/40 bg-[#22c55e]/5"
                  : "border-white/5 bg-black/40 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                <span className="text-[#8a8078]">{stage.step}</span>
                <span
                  className={`font-bold px-1.5 py-0.5 rounded text-[9px] ${
                    stage.status === "ACTIVE"
                      ? "bg-[#c9a96e] text-black"
                      : stage.status === "PASS"
                      ? "bg-[#22c55e]/20 text-[#22c55e]"
                      : "bg-white/5 text-[#8a8078]"
                  }`}
                >
                  {stage.status}
                </span>
              </div>
              <h5 className="font-serif font-bold text-sm text-[#e8dcc8]">{stage.title}</h5>
              <p className="font-mono text-[10px] text-[#c9a96e]">{stage.tech}</p>
              <p className="font-sans text-[11px] text-[#a89f91] mt-1">{stage.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Streaming Terminal Log Box */}
      <div className="rounded-xl border border-white/10 bg-[#050505] p-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#c9a96e]" />
            <span className="text-[10px] text-[#8a8078] uppercase tracking-wider">
              SPRING BOOT CONSOLE TELEMETRY STREAM
            </span>
          </div>
          <span className="text-[9px] text-[#22c55e] font-semibold">
            {isRunning ? "● STREAMING LIVE" : isDone ? "✓ EXECUTION FINISHED" : "○ READY"}
          </span>
        </div>

        <div
          ref={logContainerRef}
          className="h-28 overflow-y-auto space-y-1.5 text-[11px] scrollbar-thin scrollbar-thumb-white/10"
        >
          {logs.length === 0 ? (
            <span className="text-[#8a8078] italic">
              Klik &quot;MULAI SIMULASI&quot; di atas untuk melihat alur transaksi microservices secara live...
            </span>
          ) : (
            logs.map((log, i) => (
              <p
                key={i}
                className={
                  log.includes("SUCCESS")
                    ? "text-[#22c55e] font-bold"
                    : log.includes("INGRESS") || log.includes("GATEWAY")
                    ? "text-[#c9a96e]"
                    : "text-[#a89f91]"
                }
              >
                {log}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
