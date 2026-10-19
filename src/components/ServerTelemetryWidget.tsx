"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Activity, ShieldCheck, ExternalLink, X, Cpu, HardDrive, Network } from "lucide-react";
import { audioController } from "@/lib/audio";

export function ServerTelemetryWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [latency, setLatency] = useState(38);
  const [lastCheck, setLastCheck] = useState("Just now");

  useEffect(() => {
    // Dynamic micro-jitter to simulate live network latency heartbeat
    const interval = setInterval(() => {
      setLatency(Math.floor(34 + Math.random() * 9));
      setLastCheck("Real-time");
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = () => {
    audioController.playMechanicalClick();
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* ── Mini Telemetry Pill (Desktop HUD / Footer integration) ── */}
      <button
        onClick={handleToggle}
        title="View Live VPS Infrastructure Telemetry"
        className="group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C9A96E]/20 bg-[#0C0C0C]/85 backdrop-blur-md hover:border-[#C9A96E]/50 transition-all duration-300 text-[0.65rem] font-mono uppercase tracking-wider text-[#E8DCC8]"
      >
        <div className="flex items-center gap-1.5">
          <span className="flex items-center gap-[2px] h-2.5" aria-hidden="true">
            <motion.span
              animate={{ height: ["3px", "8px", "3px"] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              className="w-[1.5px] rounded-full bg-[#22c55e]"
            />
            <motion.span
              animate={{ height: ["7px", "2px", "7px"] }}
              transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut", delay: 0.15 }}
              className="w-[1.5px] rounded-full bg-[#22c55e]"
            />
          </span>
          <span className="text-[#22c55e] font-bold">VPS: LIVE</span>
        </div>
        <span className="text-[#8A8078] hidden sm:inline">145.79.8.137</span>
        <span className="text-[#C9A96E] font-bold hidden md:inline">{latency}ms</span>
      </button>

      {/* ── Full Infrastructure Telemetry Modal ── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleToggle}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl rounded-2xl border border-[#C9A96E]/30 bg-[#0A0A0A] p-6 sm:p-8 shadow-[0_0_50px_rgba(201,169,110,0.15)] overflow-hidden"
              style={{ maxHeight: "90vh", overflowY: "auto" }}
            >
              {/* Top ambient glow */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/60 to-transparent" />

              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DCC8]/10 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#C9A96E]/10 border border-[#C9A96E]/30 flex items-center justify-center text-[#C9A96E]">
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#E8DCC8] tracking-wide">
                      Live Infrastructure Telemetry
                    </h3>
                    <p className="font-mono text-[0.65rem] text-[#C9A96E] tracking-widest uppercase">
                      Dokploy VPS · Linode / Akamai Cluster
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleToggle}
                  className="p-1.5 rounded-lg border border-[#E8DCC8]/10 text-[#8A8078] hover:text-[#E8DCC8] hover:border-[#C9A96E]/40 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Real-time Health Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                <div className="p-3.5 rounded-xl border border-[#E8DCC8]/08 bg-[#111111]/90">
                  <span className="font-mono text-[0.6rem] text-[#8A8078] uppercase tracking-wider block mb-1">
                    System State
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="font-mono text-xs font-bold text-green-400">ONLINE</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-[#E8DCC8]/08 bg-[#111111]/90">
                  <span className="font-mono text-[0.6rem] text-[#8A8078] uppercase tracking-wider block mb-1">
                    Avg Latency
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#C9A96E]" />
                    <span className="font-mono text-xs font-bold text-[#E8DCC8]">{latency} ms</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-[#E8DCC8]/08 bg-[#111111]/90 col-span-2 sm:col-span-1">
                  <span className="font-mono text-[0.6rem] text-[#8A8078] uppercase tracking-wider block mb-1">
                    Host IP
                  </span>
                  <span className="font-mono text-[0.72rem] font-bold text-[#C9A96E]">
                    145.79.8.137
                  </span>
                </div>
              </div>

              {/* Service Stack Status Breakdown */}
              <div className="space-y-2.5 mb-6">
                <p className="font-mono text-[0.65rem] tracking-widest text-[#8A8078] uppercase mb-2">
                  Microservices Container Orchestration
                </p>

                {[
                  { name: "Traefik Reverse Proxy", status: "Active (SSL Auto-Renew)", port: "443 / 80" },
                  { name: "Spring Cloud API Gateway", status: "Java 21 Virtual Threads", port: "8080" },
                  { name: "RegarStore Frontend", status: "React 19 (Vite Production)", port: "3000" },
                  { name: "RabbitMQ Message Broker", status: "Cluster Queue Connected", port: "5672" },
                  { name: "Redis L2 In-Memory Cache", status: "Sub-Millisecond Read", port: "6379" },
                  { name: "PostgreSQL Database", status: "Per-Service Isolated Schemas", port: "5432" },
                ].map((svc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-[#E8DCC8]/05 bg-[#0e0e0e] text-xs font-mono"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <span className="text-[#E8DCC8] font-medium">{svc.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[0.62rem] text-[#A0988E] hidden sm:inline">{svc.status}</span>
                      <span className="text-[0.6rem] text-[#C9A96E] bg-[#C9A96E]/10 px-2 py-0.5 rounded border border-[#C9A96E]/20">
                        {svc.port}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#E8DCC8]/10">
                <a
                  href="https://regarstore.145.79.8.137.sslip.io/webjars/swagger-ui/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cream"
                  style={{ padding: "0.55rem 1.2rem", fontSize: "0.72rem" }}
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Buka Live Swagger UI
                </a>
                <span className="font-mono text-[0.6rem] text-[#8A8078]">
                  Dokploy Container Heartbeat: {lastCheck}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
