"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Zap, Skull, RotateCcw, Activity, Server, Cpu, Database, CheckCircle, AlertTriangle, Terminal } from "lucide-react";
import { playClick, playHoverTick } from "@/lib/audio";

type ServiceTarget = "payment" | "catalog" | "rabbitmq";
type CircuitState = "CLOSED" | "OPEN" | "HALF-OPEN";

export function ChaosEngineeringSandbox() {
  const [rps, setRps] = useState<number>(25000);
  const [killedService, setKilledService] = useState<ServiceTarget | null>(null);
  const [circuitState, setCircuitState] = useState<CircuitState>("CLOSED");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [failureRate, setFailureRate] = useState<number>(0);
  const [fallbackCount, setFallbackCount] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM NORMAL] All 6 Microservices healthy. Resilience4j Circuit Breakers: CLOSED.",
  ]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  // Inject Chaos: Kill a service or simulate latency
  const injectChaos = (target: ServiceTarget) => {
    playClick(true);
    setKilledService(target);
    setIsSimulating(true);

    const targetName =
      target === "payment"
        ? "Payment Processing Service"
        : target === "catalog"
        ? "Product Catalog DB"
        : "RabbitMQ Message Broker";

    setLogs((prev) => [
      ...prev,
      `[CHAOS INJECTED] KILL_CONTAINER issued to ${targetName}.`,
      `[CIRCUIT BREAKER] Failure rate spiking. Threshold (50%) exceeded!`,
      `[CIRCUIT STATE] Resilience4j transitioned: CLOSED ➔ OPEN.`,
      `[FALLBACK ROUTE] Graceful degradation activated: Routing traffic to fallback cache & offline buffer.`,
      `[SYSTEM STABILITY] 0 Cascading outages detected. Java 21 Virtual Threads unblocked.`,
    ]);

    setCircuitState("OPEN");
    setFailureRate(74);

    // Increment fallbacks
    const timer = setInterval(() => {
      setFallbackCount((c) => c + Math.floor(Math.random() * 80) + 40);
    }, 150);

    // Auto Half-open recovery probing after 4 seconds
    setTimeout(() => {
      clearInterval(timer);
      setCircuitState("HALF-OPEN");
      setFailureRate(18);
      setLogs((prev) => [
        ...prev,
        `[HEALTH CHECK] Probing service recovery. Circuit state: HALF-OPEN (Testing 10 sample requests).`,
      ]);
    }, 4500);
  };

  const healCluster = () => {
    playClick();
    setKilledService(null);
    setCircuitState("CLOSED");
    setFailureRate(0);
    setIsSimulating(false);
    setLogs((prev) => [
      ...prev,
      `[CLUSTER HEALED] All services revived. Circuit Breakers reset to CLOSED (Healthy).`,
    ]);
  };

  const formatNum = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <div className="w-full rounded-2xl border border-[#C9A96E]/30 bg-gradient-to-b from-[#13110E] via-[#080808] to-[#0A0A0A] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Background Amber Alert Glow */}
      <div className="absolute top-0 right-1/3 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-[#C9A96E] text-xs">◈</span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#C9A96E] font-bold">
              Chaos Engineering Sandbox // Netflix Simian Army Caliber
            </span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#E8DCC8]">
            Simulasi Kegagalan Ekstrem &amp; Resilience4j Circuit Breaker
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#A89F91] mt-1 max-w-2xl">
            Uji ketahanan arsitektur microservices. Bunuh salah satu service live di bawah beban hingga 100.000 RPS, dan lihat bagaimana Circuit Breaker mengisolasi kegagalan tanpa pernah meruntuhkan seluruh sistem (*Zero Cascading Failures*).
          </p>
        </div>

        {/* Heal Button */}
        <button
          onClick={healCluster}
          disabled={!killedService}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-[#E8DCC8] hover:border-[#22C55E] hover:text-[#22C55E] transition-all disabled:opacity-30 disabled:pointer-events-none font-mono text-xs tracking-wider uppercase shadow-lg"
        >
          <RotateCcw className="w-4 h-4" />
          <span>PULIHKAN CLUSTER</span>
        </button>
      </div>

      {/* Traffic RPS Slider & Circuit Status */}
      <div className="py-6 border-b border-white/5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Slider Controls */}
        <div className="md:col-span-7 space-y-2 font-mono">
          <div className="flex justify-between text-xs">
            <span className="text-[#8A8078]">SIMULASI BEBAN TRAFFIC:</span>
            <span className="text-[#C9A96E] font-bold">{formatNum(rps)} RPS (Req/Sec)</span>
          </div>
          <input
            type="range"
            min="5000"
            max="100000"
            step="5000"
            value={rps}
            onChange={(e) => setRps(Number(e.target.value))}
            className="w-full accent-[#C9A96E] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#8A8078]">
            <span>5.000 RPS</span>
            <span>50.000 RPS</span>
            <span>100.000 RPS (Enterprise Scale)</span>
          </div>
        </div>

        {/* Circuit Breaker State Indicator */}
        <div className="md:col-span-5 p-3.5 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#8A8078] block">
              CIRCUIT BREAKER STATE
            </span>
            <span
              className={`font-serif text-xl font-bold ${
                circuitState === "CLOSED"
                  ? "text-[#22C55E]"
                  : circuitState === "OPEN"
                  ? "text-red-400"
                  : "text-amber-400"
              }`}
            >
              {circuitState}
            </span>
          </div>
          <span
            className={`font-mono text-[9px] px-2 py-1 rounded font-bold uppercase ${
              circuitState === "CLOSED"
                ? "bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30"
                : circuitState === "OPEN"
                ? "bg-red-500/20 text-red-400 border border-red-500/40"
                : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
            }`}
          >
            {circuitState === "CLOSED" ? "ALL TRAFFIC PASSING" : "ISOLATING OUTAGE"}
          </span>
        </div>
      </div>

      {/* Target Services to Kill */}
      <div className="py-6">
        <h4 className="font-mono text-[10px] tracking-widest uppercase text-[#8A8078] mb-4">
          PILIH CONTAINER / SERVICE UNTUK DIMATIKAN LIVE:
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              id: "payment" as ServiceTarget,
              name: "Payment Processing Service",
              tech: "Midtrans Webhook & REST",
              impact: "Simulasi gateway timeout saat checkout massal.",
            },
            {
              id: "catalog" as ServiceTarget,
              name: "Product Catalog Database",
              tech: "MySQL 8.0 Primary Node",
              impact: "Simulasi query lockup & disk I/O failure.",
            },
            {
              id: "rabbitmq" as ServiceTarget,
              name: "RabbitMQ Message Broker",
              tech: "AMQP 0-9-1 Cluster",
              impact: "Simulasi antrean pesan notifikasi macet.",
            },
          ].map((srv) => (
            <div
              key={srv.id}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                killedService === srv.id
                  ? "bg-red-950/25 border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.25)]"
                  : "bg-black/50 border-white/5 hover:border-white/20"
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-[#8A8078] text-[10px]">{srv.tech}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                      killedService === srv.id
                        ? "bg-red-500/20 text-red-400"
                        : "bg-[#22C55E]/15 text-[#22C55E]"
                    }`}
                  >
                    {killedService === srv.id ? "DEAD" : "HEALTHY"}
                  </span>
                </div>
                <h5 className="font-serif text-lg font-bold text-[#E8DCC8]">{srv.name}</h5>
                <p className="font-sans text-xs text-[#A89F91] mt-1">{srv.impact}</p>
              </div>

              <button
                onClick={() => injectChaos(srv.id)}
                disabled={killedService === srv.id}
                className={`mt-4 w-full py-2 rounded-lg font-mono text-[10px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all ${
                  killedService === srv.id
                    ? "bg-red-500/30 text-red-200 cursor-not-allowed"
                    : "bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-300 text-[#A89F91]"
                }`}
              >
                <Skull className="w-3.5 h-3.5 text-red-400" />
                <span>{killedService === srv.id ? "SERVICE DIMATIKAN" : "BUNUH SERVICE INI"}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Resilience Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-b border-white/5 font-mono text-xs">
        <div className="p-3 rounded-lg bg-black/60 border border-white/5">
          <span className="text-[#8A8078] text-[9px] uppercase block">CASCADING CRASHES</span>
          <span className="font-serif text-2xl font-bold text-[#22C55E]">0 OUTAGES</span>
          <span className="text-[#8A8078] text-[9px] block">Blast Radius Terisolasi</span>
        </div>

        <div className="p-3 rounded-lg bg-black/60 border border-white/5">
          <span className="text-[#8A8078] text-[9px] uppercase block">FALLBACK DEGRADATION</span>
          <span className="font-serif text-2xl font-bold text-[#C9A96E]">
            {formatNum(fallbackCount)}
          </span>
          <span className="text-[#C9A96E] text-[9px] block">Requests Handled Safely</span>
        </div>

        <div className="p-3 rounded-lg bg-black/60 border border-white/5">
          <span className="text-[#8A8078] text-[9px] uppercase block">SYSTEM AVAILABILITY</span>
          <span className="font-serif text-2xl font-bold text-[#38BDF8]">99.98%</span>
          <span className="text-[#38BDF8] text-[9px] block">SLA Terpenuhi</span>
        </div>

        <div className="p-3 rounded-lg bg-black/60 border border-white/5">
          <span className="text-[#8A8078] text-[9px] uppercase block">JVM VIRTUAL THREADS</span>
          <span className="font-serif text-2xl font-bold text-[#E8DCC8]">UNBLOCKED</span>
          <span className="text-[#8A8078] text-[9px] block">0 OS Thread Starvation</span>
        </div>
      </div>

      {/* Live Chaos Event Log Console */}
      <div className="mt-4 rounded-xl border border-white/10 bg-[#050505] p-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span className="text-[10px] text-[#8A8078] uppercase tracking-wider">
              RESILIENCE4J KERNEL AUDIT TRAIL
            </span>
          </div>
          <span className="text-[9px] text-[#C9A96E]">AUTO-ISOLATION ENGINE</span>
        </div>

        <div ref={logRef} className="h-24 overflow-y-auto space-y-1 text-[11px] scrollbar-thin">
          {logs.map((log, i) => (
            <p
              key={i}
              className={
                log.includes("CHAOS") || log.includes("KILL")
                  ? "text-red-400 font-bold"
                  : log.includes("CIRCUIT")
                  ? "text-amber-300"
                  : log.includes("FALLBACK") || log.includes("HEALED")
                  ? "text-[#22C55E]"
                  : "text-[#A89F91]"
              }
            >
              {log}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
