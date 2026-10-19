"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Cpu,
  Layers,
  Terminal,
  Activity,
  X,
  Minimize2,
  Maximize2,
  Network,
  Database,
  Radio,
} from "lucide-react";
import { playClick, playHoverTick } from "@/lib/audio";

interface MicroserviceNode {
  port: number;
  name: string;
  type: string;
  threads: number;
  latency: string;
  status: "ONLINE" | "STANDBY";
}

const SERVICE_REGISTRY: MicroserviceNode[] = [
  { port: 8080, name: "API Gateway (Spring Cloud)", type: "Netty Reactive", threads: 18, latency: "1.2ms", status: "ONLINE" },
  { port: 8081, name: "Auth Service (JWT/RSA)", type: "Virtual Threads", threads: 45, latency: "3.4ms", status: "ONLINE" },
  { port: 8082, name: "Catalog Service (Postgres)", type: "HikariCP + Redis", threads: 120, latency: "0.8ms", status: "ONLINE" },
  { port: 8083, name: "Order Core (RabbitMQ)", type: "Event Sourcing", threads: 210, latency: "4.1ms", status: "ONLINE" },
  { port: 8084, name: "Payment Service (Resilience4j)", type: "Circuit Breaker", threads: 64, latency: "8.5ms", status: "ONLINE" },
  { port: 8085, name: "Notification Broker (SSE)", type: "Non-blocking Push", threads: 85, latency: "1.9ms", status: "ONLINE" },
];

export function XRayBlueprintMode() {
  const [isActive, setIsActive] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [fps, setFps] = useState<number>(60);
  const [domCount, setDomCount] = useState<number>(0);
  const [heapMb, setHeapMb] = useState<number>(614);
  const [activeTab, setActiveTab] = useState<"jvm" | "network" | "render">("jvm");

  // Toggle on custom event or 'X' keypress
  useEffect(() => {
    const handleToggleEvent = () => {
      playClick(true);
      setIsActive((prev) => !prev);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      if (e.key === "x" || e.key === "X") {
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          handleToggleEvent();
        }
      } else if (e.key === "Escape" && isActive) {
        setIsActive(false);
      }
    };

    window.addEventListener("toggle-xray-mode", handleToggleEvent);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("toggle-xray-mode", handleToggleEvent);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive]);

  // Synchronize CSS class on <html>
  useEffect(() => {
    if (isActive) {
      document.documentElement.classList.add("xray-active");
    } else {
      document.documentElement.classList.remove("xray-active");
    }
  }, [isActive]);

  // Real-time FPS & DOM node calculation
  useEffect(() => {
    if (!isActive) return;

    // Count DOM nodes
    setDomCount(document.querySelectorAll("*").length);

    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measureFps = (now: number) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measureFps);
    };

    animId = requestAnimationFrame(measureFps);

    // Subtle heap jitter simulation
    const heapInterval = setInterval(() => {
      setHeapMb((prev) => {
        const delta = Math.floor(Math.random() * 14) - 6;
        const next = prev + delta;
        return next > 950 ? 580 : next < 450 ? 620 : next;
      });
    }, 1200);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(heapInterval);
    };
  }, [isActive]);

  return (
    <>
      {/* ── Visual Overlays when X-Ray is Active ── */}
      {isActive && (
        <>
          <div className="xray-scanline" />
          <div className="xray-beam" />
        </>
      )}

      {/* ── Persistent Floating X-Ray Trigger (Bottom Left HUD) ── */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:block">
        <button
          onClick={() => {
            playClick(true);
            setIsActive(!isActive);
          }}
          title="Toggle X-Ray / PCB Schematic Blueprint Mode (Shortcut: X)"
          className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-xl transition-all duration-300 font-mono text-[11px] shadow-2xl ${
            isActive
              ? "bg-[#C9A96E] text-black border-[#C9A96E] shadow-[0_0_20px_rgba(201,169,110,0.5)] font-bold"
              : "bg-[#090807]/90 text-[#C9A96E] border-[#C9A96E]/30 hover:border-[#C9A96E] hover:text-[#E8DCC8]"
          }`}
        >
          {isActive ? (
            <EyeOff className="w-3.5 h-3.5" />
          ) : (
            <Eye className="w-3.5 h-3.5 animate-pulse" />
          )}
          <span className="tracking-wider uppercase">
            {isActive ? "X-RAY ON" : "X-RAY BLUEPRINT"}
          </span>
          <kbd className="px-1.5 py-0.2 rounded bg-black/40 text-[9px] text-[#E8DCC8] border border-white/10">
            X
          </kbd>
        </button>
      </div>

      {/* ── Interactive X-Ray Telemetry HUD Window ── */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-24 right-4 sm:right-8 z-[210] w-[calc(100vw-2rem)] sm:w-[420px] rounded-2xl border border-[#C9A96E]/40 bg-[#06080A]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(201,169,110,0.15)] overflow-hidden font-mono text-xs select-none"
          >
            {/* Top Drag/Status Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0D1117] border-b border-[#C9A96E]/20 text-[#C9A96E]">
              <div className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 animate-pulse text-[#22C55E]" />
                <span className="font-bold tracking-widest text-[10px] uppercase">
                  X-RAY SCHEMATIC // ARCH-TELEMETRY
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 text-[#8A8078] hover:text-[#E8DCC8] transition-colors"
                  title={isMinimized ? "Maximize" : "Minimize"}
                >
                  {isMinimized ? (
                    <Maximize2 className="w-3.5 h-3.5" />
                  ) : (
                    <Minimize2 className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setIsActive(false);
                  }}
                  className="p-1 text-[#8A8078] hover:text-red-400 transition-colors"
                  title="Close X-Ray Mode (ESC)"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Collapsible Content */}
            {!isMinimized && (
              <div className="p-4 space-y-4">
                {/* Mode Description & Navigation Tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-black/60 rounded-lg border border-white/5">
                  {[
                    { id: "jvm", label: "JVM ZGC Core", icon: Cpu },
                    { id: "network", label: "Ports Matrix", icon: Network },
                    { id: "render", label: "Browser GPU", icon: Activity },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          playHoverTick();
                          setActiveTab(tab.id as any);
                        }}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded text-[10px] uppercase tracking-wider transition-all ${
                          activeTab === tab.id
                            ? "bg-[#C9A96E]/20 text-[#C9A96E] font-bold border border-[#C9A96E]/40"
                            : "text-[#8A8078] hover:text-[#E8DCC8]"
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab 1: JVM & Virtual Threads Telemetry */}
                {activeTab === "jvm" && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-black/50 border border-white/5 space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#8A8078]">JVM HEAP ALLOCATION</span>
                        <span className="text-[#C9A96E] font-bold">
                          {heapMb} MB / 2048 MB ({( (heapMb / 2048) * 100 ).toFixed(1)}%)
                        </span>
                      </div>
                      {/* Dynamic Memory Bar */}
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#C9A96E] via-amber-400 to-emerald-400 transition-all duration-700"
                          style={{ width: `${(heapMb / 2048) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[9px] text-[#6B6560]">
                        <span>Young Gen: ~180MB</span>
                        <span>Old Gen: ~434MB</span>
                        <span>Metaspace: 64MB</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                        <span className="text-[#8A8078] block text-[9px]">GARBAGE COLLECTOR</span>
                        <span className="text-[#22C55E] font-bold text-xs">Generational ZGC</span>
                        <span className="text-[#6B6560] block text-[9px] mt-0.5">Pause: &lt; 0.4ms</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                        <span className="text-[#8A8078] block text-[9px]">PROJECT LOOM</span>
                        <span className="text-[#C9A96E] font-bold text-xs">542 Virtual Threads</span>
                        <span className="text-[#6B6560] block text-[9px] mt-0.5">16 Carrier Cores</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Microservices Port Matrix */}
                {activeTab === "network" && (
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {SERVICE_REGISTRY.map((srv) => (
                      <div
                        key={srv.port}
                        className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/5 text-[10px]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded bg-[#C9A96E]/15 text-[#C9A96E] font-bold">
                            :{srv.port}
                          </span>
                          <div>
                            <span className="text-[#E8DCC8] block font-semibold">{srv.name}</span>
                            <span className="text-[#6B6560] text-[9px]">{srv.type}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[#22C55E] font-bold block">{srv.latency}</span>
                          <span className="text-[#6B6560] text-[9px]">{srv.threads} th</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tab 3: Client Browser & Render Pipeline */}
                {activeTab === "render" && (
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                      <span className="text-[#8A8078] block text-[9px]">DISPLAY REFRESH</span>
                      <span className="text-[#22C55E] font-bold text-base">{fps} FPS</span>
                      <span className="text-[#6B6560] block text-[9px]">Hardware Accelerated</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                      <span className="text-[#8A8078] block text-[9px]">ACTIVE DOM NODES</span>
                      <span className="text-[#C9A96E] font-bold text-base">{domCount}</span>
                      <span className="text-[#6B6560] block text-[9px]">Optimized Virtual DOM</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 col-span-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[#8A8078] text-[9px]">GPU SHADER PIPELINE</span>
                        <span className="text-[#22C55E] text-[9px] font-bold">ACTIVE (GLSL 3.0)</span>
                      </div>
                      <p className="text-[#A89F91] text-[10px] leading-relaxed">
                        Directional Volumetric Rays, Oceanic Surface Caustics &amp; Microservices 3D Canvas running at sub-5ms draw pass.
                      </p>
                    </div>
                  </div>
                )}

                {/* Footer Status Bar */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-[#6B6560]">
                  <span>SCHEMA: ARCH-V2-PROD</span>
                  <span className="text-[#C9A96E]">PRESS [X] OR [ESC] TO EXIT</span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
