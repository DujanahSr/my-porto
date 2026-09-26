"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function OceanDepthMeter() {
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();

  // Smooth physics spring for depth number interpolation (0 to 2800m)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const [currentDepth, setCurrentDepth] = useState(0);

  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      const depth = Math.round(latest * 2800);
      setCurrentDepth(depth);
    });
  }, [smoothProgress]);

  // Translate gauge marker along the vertical 100px track
  const gaugeY = useTransform(smoothProgress, [0, 1], [0, 100]);

  // Determine current oceanic zone based on depth
  const getZoneInfo = (depth: number) => {
    if (depth < 350) {
      return {
        name: t.home?.depthMeter?.surface || "Permukaan",
        code: "SURFACE",
        color: "#C9A96E",
      };
    } else if (depth < 1000) {
      return {
        name: t.home?.depthMeter?.meso || "Zona Fotik",
        code: "PHOTIC",
        color: "#E8DCC8",
      };
    } else if (depth < 1900) {
      return {
        name: t.home?.depthMeter?.bathy || "Zona Batipelagik",
        code: "BATHY",
        color: "#38bdf8",
      };
    } else {
      return {
        name: t.home?.depthMeter?.abyss || "Palung Abisal",
        code: "ABYSS",
        color: "#a855f7",
      };
    }
  };

  const zone = getZoneInfo(currentDepth);

  return (
    <>
      {/* ── DESKTOP HUD: Sleek Right-Edge Deep Exploration Telemetry ── */}
      <motion.div
        initial={{ opacity: 0, x: 25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          right: "1.75rem",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 40,
          pointerEvents: "auto",
        }}
        className="hidden md:flex flex-col items-center select-none"
      >
        <div
          style={{
            background: "rgba(10, 10, 10, 0.72)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(232, 220, 200, 0.1)",
            boxShadow:
              "0 15px 35px rgba(0,0,0,0.6), inset 0 1px 0 rgba(201,169,110,0.2)",
            borderRadius: "9999px",
            padding: "1.1rem 0.65rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.85rem",
            transition: "border-color 0.3s ease",
          }}
          className="hover:border-[#C9A96E]/40"
        >
          {/* Active Sonar Radar Ping */}
          <div
            title={t.home?.depthMeter?.status || "Telemetri Sonar Aktif"}
            style={{
              position: "relative",
              width: "12px",
              height: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                backgroundColor: "#C9A96E",
                opacity: 0.4,
              }}
              className="animate-ping"
            />
            <span
              style={{
                position: "relative",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#C9A96E",
                boxShadow: "0 0 8px #C9A96E",
              }}
            />
          </div>

          {/* Vertical Depth Meter Gauge Track */}
          <div
            style={{
              position: "relative",
              width: "2px",
              height: "100px",
              backgroundColor: "rgba(232, 220, 200, 0.12)",
              borderRadius: "9999px",
            }}
          >
            {/* Filled Progress Beam */}
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: gaugeY,
                background: "linear-gradient(to bottom, #C9A96E, #E8DCC8)",
                borderRadius: "9999px",
                boxShadow: "0 0 8px rgba(201,169,110,0.6)",
              }}
            />

            {/* Glowing Golden Depth Bead */}
            <motion.div
              style={{
                position: "absolute",
                left: "50%",
                top: gaugeY,
                transform: "translate(-50%, -50%)",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#E8DCC8",
                border: "1.5px solid #C9A96E",
                boxShadow: "0 0 10px #C9A96E",
              }}
            />
          </div>

          {/* Numerical Depth Display (Rotated Vertical for Architectural Feel) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.52rem",
                letterSpacing: "0.18em",
                color: "#8A8078",
                textTransform: "uppercase",
              }}
            >
              DEPTH
            </span>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#C9A96E",
                textShadow: "0 0 10px rgba(201,169,110,0.45)",
                whiteSpace: "nowrap",
              }}
            >
              -{currentDepth}m
            </span>
          </div>

          {/* Current Oceanic Layer Code */}
          <div
            style={{
              padding: "0.2rem 0.45rem",
              borderRadius: "4px",
              backgroundColor: "rgba(201,169,110,0.1)",
              border: "1px solid rgba(201,169,110,0.2)",
            }}
          >
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.5rem",
                letterSpacing: "0.15em",
                color: zone.color,
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              {zone.code}
            </span>
          </div>
        </div>
      </motion.div>

      {/* ── MOBILE HUD: Compact Floating Telemetry Pill at Bottom-Right ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          zIndex: 40,
          pointerEvents: "none",
        }}
        className="flex md:hidden items-center gap-2 select-none"
      >
        <div
          style={{
            background: "rgba(10, 10, 10, 0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(201, 169, 110, 0.3)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.7)",
            borderRadius: "9999px",
            padding: "0.35rem 0.75rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.62rem",
              letterSpacing: "0.1em",
              color: "#C9A96E",
              fontWeight: 700,
            }}
          >
            -{currentDepth}m
          </span>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.08em",
              color: "#A89F91",
              textTransform: "uppercase",
            }}
          >
            · {zone.name}
          </span>
        </div>
      </motion.div>
    </>
  );
}
