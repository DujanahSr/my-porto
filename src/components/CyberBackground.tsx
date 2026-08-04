/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function CyberBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 -z-50 bg-[#020617]" />;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#020617]">
      {/* Grid Pattern with Fade out mask */}
      <div className="absolute inset-0 bg-grid-pattern mask-[radial-gradient(ellipse_at_center,black_40%,transparent_80%)] opacity-30" />
      
      {/* Animated Glowing Orbs */}
      <motion.div 
        animate={{
          x: [0, 150, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-900/30 rounded-full blur-[120px]"
      />
      
      <motion.div 
        animate={{
          x: [0, -150, 100, 0],
          y: [0, 150, -100, 0],
          scale: [1, 1.5, 1, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-emerald-900/20 rounded-full blur-[100px]"
      />

      <motion.div 
        animate={{
          x: [0, 100, -100, 0],
          y: [0, 50, -50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-20%] left-[30%] w-[60vw] h-[40vw] bg-blue-900/20 rounded-full blur-[140px]"
      />
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
    </div>
  );
}
