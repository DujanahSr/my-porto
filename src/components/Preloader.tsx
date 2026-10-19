"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

const TELEMETRY_STEPS = [
  "INITIALIZING SPATIAL 3D LIGHT SHAFTS...",
  "CONNECTING DISTRIBUTED KERNEL (JAVA 21 & SPRING BOOT 3)...",
  "ESTABLISHING HIGH-CONCURRENCY ARCHITECTURE...",
  "CALIBRATING OCEANIC DEPTH TELEMETRY (0m SURFACE)...",
  "SYSTEM ARCHITECTURE READY.",
];

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [telemetryIdx, setTelemetryIdx] = useState(0);

  // Mouse tilt for 3D interactive gyroscope
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-22, 22]), { stiffness: 120, damping: 14 });
  const springY = useSpring(useTransform(mouseY, [-0.5, 0.5], [22, -22]), { stiffness: 120, damping: 14 });

  useEffect(() => {
    let currentVal = 0;
    const interval = setInterval(() => {
      // Non-linear acceleration curve for high-end cinematic feel
      const increment = currentVal < 60 ? Math.floor(Math.random() * 12) + 6 : Math.floor(Math.random() * 18) + 10;
      currentVal += increment;

      if (currentVal >= 100) {
        currentVal = 100;
        clearInterval(interval);
        setTimeout(() => setOpen(true), 240);
        setTimeout(() => setVisible(false), 1400);
      }
      setCount(currentVal);

      // Rotate telemetry strings
      const step = Math.min(Math.floor((currentVal / 100) * TELEMETRY_STEPS.length), TELEMETRY_STEPS.length - 1);
      setTelemetryIdx(step);
    }, 55);

    return () => clearInterval(interval);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    mouseX.set(e.clientX / width - 0.5);
    mouseY.set(e.clientY / height - 0.5);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <div
        id="preloader"
        onPointerMove={handlePointerMove}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10000,
          backgroundColor: "#040404",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          perspective: "1200px",
        }}
      >
        {/* Split Curtains with Gold Edge Glaze */}
        <div
          className="preloader-panel left"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "50%",
            backgroundColor: "#050505",
            borderRight: "1px solid rgba(201, 169, 110, 0.3)",
            transform: open ? "translateX(-100%)" : "translateX(0)",
            transition: "transform 1.1s cubic-bezier(0.76, 0, 0.24, 1)",
            zIndex: 2,
          }}
        />
        <div
          className="preloader-panel right"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "50%",
            backgroundColor: "#050505",
            borderLeft: "1px solid rgba(201, 169, 110, 0.3)",
            transform: open ? "translateX(100%)" : "translateX(0)",
            transition: "transform 1.1s cubic-bezier(0.76, 0, 0.24, 1)",
            zIndex: 2,
          }}
        />

        {/* Center 3D Interactive Gyroscope & Kinetic Typography */}
        <motion.div
          animate={{ opacity: open ? 0 : 1, scale: open ? 0.95 : 1 }}
          transition={{ duration: 0.35 }}
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2.2rem",
            textAlign: "center",
            padding: "1.5rem",
          }}
        >
          {/* Interactive 3D Oceanic Compass / Gyroscope Ring */}
          <motion.div
            style={{
              rotateX: springY,
              rotateY: springX,
              transformStyle: "preserve-3d",
            }}
            className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center cursor-pointer"
          >
            {/* Outer Orbital Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-[#C9A96E]/30 border-dashed"
            />

            {/* Middle Counter-Rotating Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              className="absolute inset-2 sm:inset-3 rounded-full border border-[#E8DCC8]/20 border-t-[#C9A96E]/80"
            />

            {/* Inner Gold Gyro Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
              className="absolute inset-5 sm:inset-7 rounded-full border border-[#C9A96E]/50 border-r-transparent border-l-transparent"
            />

            {/* Center Core Aperture */}
            <div className="relative flex flex-col items-center justify-center">
              <span className="font-serif text-[#C9A96E] text-2xl sm:text-3xl font-light">
                ◈
              </span>
            </div>
          </motion.div>

          {/* Name & Title */}
          <div>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)",
                fontWeight: 300,
                letterSpacing: "0.28em",
                color: "#E8DCC8",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              Abu Dujanah
            </h1>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.68rem",
                letterSpacing: "0.22em",
                color: "#C9A96E",
                textTransform: "uppercase",
                marginTop: "0.6rem",
              }}
            >
              Backend &amp; Full-Stack Developer
            </p>
          </div>

          {/* Kinetic Progress Bar & Counter */}
          <div className="w-64 sm:w-80 flex flex-col items-center gap-2">
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#C9A96E] via-[#E8DCC8] to-[#C9A96E]"
                style={{ width: `${count}%` }}
                transition={{ ease: "linear" }}
              />
            </div>

            <div className="w-full flex items-center justify-between text-xs font-mono">
              <span className="text-[#8A8078] text-[10px] tracking-widest uppercase">
                {TELEMETRY_STEPS[telemetryIdx]}
              </span>
              <span className="text-[#C9A96E] font-bold text-sm tracking-wider">
                {String(count).padStart(3, "0")}%
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
