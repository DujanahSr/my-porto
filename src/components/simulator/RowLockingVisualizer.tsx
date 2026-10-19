"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, AlertTriangle, ShieldCheck, Lock, Unlock, Database, ArrowRight } from "lucide-react";
import { playClick, playHoverTick } from "@/lib/audio";

export function RowLockingVisualizer() {
  const [stage, setStage] = useState<number>(0); // 0 = idle, 1 = read, 2 = concurrent write, 3 = finished
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const startSimulation = () => {
    if (isRunning) return;
    playClick();
    setIsRunning(true);
    setStage(1);

    setTimeout(() => {
      setStage(2);
      setTimeout(() => {
        setStage(3);
        setIsRunning(false);
        playClick();
      }, 1800);
    }, 1800);
  };

  const reset = () => {
    playClick();
    setStage(0);
    setIsRunning(false);
  };

  return (
    <div className="w-full rounded-2xl border border-[#c9a96e]/30 bg-gradient-to-b from-[#11100e] via-[#080808] to-[#0c0c0b] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-[#38bdf8] text-xs">◈</span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#38bdf8] font-bold">
              Database Concurrency Engine // StokKita POS Visualizer
            </span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#e8dcc8]">
            Race Condition vs. Pessimistic Row-Locking (SELECT FOR UPDATE)
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#a89f91] mt-1 max-w-2xl">
            Simulasi visual interaktif: Dua pelanggan membeli 1 unit barang terakhir secara bersamaan. Bandingkan apa yang terjadi tanpa locking vs dengan locking tingkat baris database.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={reset}
            disabled={isRunning || stage === 0}
            className="p-2.5 rounded-xl border border-white/10 bg-white/5 text-[#a89f91] hover:text-[#e8dcc8] hover:bg-white/10 transition-colors disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Reset visualizer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={startSimulation}
            disabled={isRunning}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-lg ${
              isRunning
                ? "bg-[#38bdf8]/40 text-black cursor-wait"
                : "bg-gradient-to-r from-[#38bdf8] to-[#e8dcc8] text-black hover:shadow-[#38bdf8]/25 hover:scale-[1.02]"
            }`}
          >
            <Play className={`w-4 h-4 ${isRunning ? "animate-spin" : ""}`} />
            <span>{isRunning ? "MEMPROSES TRANSAKSI..." : "SIMULASI DUA PEMBELI"}</span>
          </button>
        </div>
      </div>

      {/* Item Card Banner */}
      <div className="py-4 border-b border-white/5 flex items-center justify-between flex-wrap gap-4 text-xs font-mono">
        <div className="flex items-center gap-3">
          <Database className="w-4 h-4 text-[#c9a96e]" />
          <span className="text-[#8a8078]">TARGET SKU:</span>
          <span className="text-[#e8dcc8] font-bold">MacBook Pro M3 Max (ID: 409)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#8a8078]">STOK AWAL GUDANG:</span>
          <span className="px-2.5 py-0.5 rounded bg-[#c9a96e]/20 border border-[#c9a96e]/40 text-[#c9a96e] font-bold">
            1 UNIT SAJA
          </span>
        </div>
      </div>

      {/* Two Column Split Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        {/* ══════════ LEFT: TANPA LOCKING (RACE CONDITION) ══════════ */}
        <div className="rounded-xl border border-red-500/30 bg-red-950/10 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-red-500/20 pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <h4 className="font-serif text-lg font-bold text-red-200">
                1. Tanpa Locking (Standard SELECT)
              </h4>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
              VULNERABLE
            </span>
          </div>

          <p className="font-mono text-[11px] text-[#a89f91]">
            <code className="text-red-300 font-bold">SELECT stock FROM items WHERE id = 409;</code>
          </p>

          {/* Timeline Steps */}
          <div className="space-y-2.5 font-mono text-xs">
            {/* Step 1 */}
            <div className={`p-2.5 rounded-lg border transition-all ${
              stage >= 1 ? "bg-black/60 border-white/10" : "bg-black/20 border-white/5 opacity-40"
            }`}>
              <div className="flex justify-between text-[10px] text-[#8a8078] mb-1">
                <span>T1: User A &amp; User B Baca Bersamaan</span>
              </div>
              <p className="text-[#e8dcc8]">User A baca stok: <span className="text-emerald-400 font-bold">1</span></p>
              <p className="text-[#e8dcc8]">User B baca stok: <span className="text-emerald-400 font-bold">1</span> (Overlap!)</p>
            </div>

            {/* Step 2 */}
            <div className={`p-2.5 rounded-lg border transition-all ${
              stage >= 2 ? "bg-black/60 border-white/10" : "bg-black/20 border-white/5 opacity-40"
            }`}>
              <div className="flex justify-between text-[10px] text-[#8a8078] mb-1">
                <span>T2: Eksekusi Update Tanpa Lock</span>
              </div>
              <p className="text-[#e8dcc8]">User A kurangi stok: 1 - 1 = 0 (Sukses)</p>
              <p className="text-[#e8dcc8]">User B kurangi stok: 0 - 1 = -1 (Sukses)</p>
            </div>

            {/* Step 3: Result */}
            <div className={`p-3 rounded-lg border transition-all ${
              stage >= 3
                ? "bg-red-950/40 border-red-500/60 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                : "bg-black/20 border-white/5 opacity-40"
            }`}>
              <span className="text-[10px] text-red-400 font-bold uppercase block mb-1">
                HASIL AKHIR DATABASE:
              </span>
              <p className="font-serif text-xl font-bold text-red-300">
                Stok Minus (-1) · OVERSOLD!
              </p>
              <p className="text-[11px] text-red-200/70 font-sans mt-1">
                Kedua user mendapat notifikasi berhasil bayar, tapi gudang hanya punya 1 barang. Perusahaan rugi dan komplain pelanggan meledak.
              </p>
            </div>
          </div>
        </div>

        {/* ══════════ RIGHT: DENGAN PESSIMISTIC LOCK (SELECT FOR UPDATE) ══════════ */}
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/10 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h4 className="font-serif text-lg font-bold text-emerald-200">
                2. Dengan Pessimistic Lock (SELECT FOR UPDATE)
              </h4>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              ACID GUARANTEED
            </span>
          </div>

          <p className="font-mono text-[11px] text-[#a89f91]">
            <code className="text-emerald-300 font-bold">SELECT stock FROM items WHERE id = 409 FOR UPDATE;</code>
          </p>

          {/* Timeline Steps */}
          <div className="space-y-2.5 font-mono text-xs">
            {/* Step 1 */}
            <div className={`p-2.5 rounded-lg border transition-all ${
              stage >= 1 ? "bg-black/60 border-white/10" : "bg-black/20 border-white/5 opacity-40"
            }`}>
              <div className="flex justify-between text-[10px] text-[#8a8078] mb-1">
                <span>T1: User A Mengunci Baris (Row-Lock)</span>
                <span className="text-amber-400 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> LOCKED
                </span>
              </div>
              <p className="text-[#e8dcc8]">User A kunci baris 409 &amp; baca stok: <span className="text-emerald-400 font-bold">1</span></p>
              <p className="text-amber-300">User B mencoba akses ➔ <span className="underline">DITAHAN DI ANTREAN KUNCI</span></p>
            </div>

            {/* Step 2 */}
            <div className={`p-2.5 rounded-lg border transition-all ${
              stage >= 2 ? "bg-black/60 border-white/10" : "bg-black/20 border-white/5 opacity-40"
            }`}>
              <div className="flex justify-between text-[10px] text-[#8a8078] mb-1">
                <span>T2: User A Commit &amp; Lepas Kunci</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <Unlock className="w-3 h-3" /> UNLOCKED
                </span>
              </div>
              <p className="text-[#e8dcc8]">User A kurangi stok: 1 - 1 = 0 ➔ COMMIT;</p>
              <p className="text-[#e8dcc8]">User B gilirannya membaca stok terbaru: <span className="text-amber-400 font-bold">0</span></p>
            </div>

            {/* Step 3: Result */}
            <div className={`p-3 rounded-lg border transition-all ${
              stage >= 3
                ? "bg-emerald-950/40 border-emerald-500/60 shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                : "bg-black/20 border-white/5 opacity-40"
            }`}>
              <span className="text-[10px] text-emerald-400 font-bold uppercase block mb-1">
                HASIL AKHIR DATABASE:
              </span>
              <p className="font-serif text-xl font-bold text-emerald-300">
                Stok 0 (Akurat) · User B Ditolak Elegan
              </p>
              <p className="text-[11px] text-emerald-200/70 font-sans mt-1">
                User A sukses bayar. User B menerima pesan ramah &quot;Maaf, stok baru saja habis dibeli pelanggan lain&quot;. Integritas data 100% terjaga.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
