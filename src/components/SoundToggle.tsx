"use client";

import React, { useEffect, useState } from "react";
import { audioController } from "@/lib/audio";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export function SoundToggle({ className = "" }: { className?: string }) {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setEnabled(audioController.getSoundState());
    const unsub = audioController.subscribe((val) => setEnabled(val));
    return () => unsub();
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => audioController.toggleSound()}
      title={enabled ? "Mute Atmospheric Soundscape" : "Enable Atmospheric Ocean & Haptic Soundscape"}
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C9A96E]/20 bg-[#0A0A0A]/80 backdrop-blur-md text-[#C9A96E] hover:border-[#C9A96E]/60 transition-all duration-300 text-xs font-mono uppercase tracking-wider ${className}`}
      style={{
        boxShadow: enabled ? "0 0 15px rgba(201,169,110,0.25)" : "none",
      }}
    >
      {enabled ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#C9A96E]" />
          <span className="hidden sm:inline text-[0.62rem]">SOUND: ON</span>
          <span className="flex items-center gap-[2px] h-3 ml-0.5" aria-hidden="true">
            <motion.span
              animate={{ height: ["3px", "10px", "3px"] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
              className="w-[1.5px] rounded-full bg-[#C9A96E]"
            />
            <motion.span
              animate={{ height: ["9px", "2px", "9px"] }}
              transition={{ repeat: Infinity, duration: 0.85, ease: "easeInOut", delay: 0.1 }}
              className="w-[1.5px] rounded-full bg-[#C9A96E]"
            />
            <motion.span
              animate={{ height: ["4px", "11px", "4px"] }}
              transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut", delay: 0.25 }}
              className="w-[1.5px] rounded-full bg-[#C9A96E]"
            />
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-[#8A8078]" />
          <span className="hidden sm:inline text-[0.62rem] text-[#8A8078]">SOUND: OFF</span>
        </>
      )}
    </button>
  );
}
