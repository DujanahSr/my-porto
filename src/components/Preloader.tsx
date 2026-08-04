"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Count up animation
    let val = 0;
    const interval = setInterval(() => {
      val += Math.floor(Math.random() * 15) + 5;
      if (val >= 100) {
        val = 100;
        clearInterval(interval);
        // Start split open
        setTimeout(() => setOpen(true), 200);
        // Hide after transition
        setTimeout(() => setVisible(false), 1600);
      }
      setCount(val);
    }, 60);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <div
        id="preloader"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10000,
          backgroundColor: "#050505",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Split Panels */}
        <div
          className="preloader-panel left"
          style={{
            transform: open ? "translateX(-100%)" : "translateX(0)",
            transition: "transform 1.2s cubic-bezier(0.76,0,0.24,1)",
          }}
        />
        <div
          className="preloader-panel right"
          style={{
            transform: open ? "translateX(100%)" : "translateX(0)",
            transition: "transform 1.2s cubic-bezier(0.76,0,0.24,1)",
          }}
        />

        {/* Center Content */}
        <motion.div
          animate={{ opacity: open ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
            textAlign: "center",
          }}
        >
          {/* Name */}
          <div
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2rem, 6vw, 4rem)",
              fontWeight: 300,
              letterSpacing: "0.4em",
              color: "#E8DCC8",
              textTransform: "uppercase",
            }}
          >
            Abu Dujanah
          </div>

          {/* Gold line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: count / 100 }}
            transition={{ ease: "linear" }}
            style={{
              width: "200px",
              height: "1px",
              background: "linear-gradient(to right, transparent, #C9A96E, transparent)",
              transformOrigin: "left",
            }}
          />

          {/* Counter */}
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              color: "#6B6B6B",
            }}
          >
            {count}%
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
