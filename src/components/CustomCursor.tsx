"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Position references for smooth interpolation
  const mousePos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      const isTouchDevice =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(hover: none) and (pointer: coarse)").matches;
      setIsTouch(isTouchDevice);
    };

    checkTouch();

    const updateCursorClass = (active: boolean) => {
      const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (active && isFinePointer) {
        document.documentElement.classList.add("has-custom-cursor");
        document.body.classList.add("has-custom-cursor");
      } else {
        document.documentElement.classList.remove("has-custom-cursor");
        document.body.classList.remove("has-custom-cursor");
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) {
        setIsVisible(true);
        ringPos.current = { x: e.clientX, y: e.clientY };
      }
      updateCursorClass(true);

      // Instant update for the central gold dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseLeave = () => {
      setIsVisible(false);
      updateCursorClass(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
      updateCursorClass(true);
    };

    // Dynamic hover detection for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], .magnetic-btn, .interactive, .group'
      );
      setIsHovered(!!interactive);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    // Silky smooth trailing physics loop using RAF
    const animateRing = () => {
      const lerpFactor = 0.16;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animateRing);
    };

    rafId.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);

      updateCursorClass(false);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  // Don't render on mobile / touch-only devices
  if (isTouch) return null;

  return (
    <>
      {/* ── Outer Trailing Halo / Ring ── */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99998,
          width: isHovered ? "64px" : isClicked ? "32px" : "40px",
          height: isHovered ? "64px" : isClicked ? "32px" : "40px",
          borderRadius: "50%",
          border: isHovered
            ? "1.5px solid rgba(201, 169, 110, 0.9)"
            : "1.2px solid rgba(201, 169, 110, 0.55)",
          backgroundColor: isHovered
            ? "rgba(201, 169, 110, 0.1)"
            : "rgba(201, 169, 110, 0.02)",
          boxShadow: isHovered
            ? "0 0 25px rgba(201, 169, 110, 0.45), inset 0 0 15px rgba(201, 169, 110, 0.15)"
            : "0 0 16px rgba(201, 169, 110, 0.25)",
          opacity: isVisible ? 1 : 0,
          transition:
            "width 0.28s cubic-bezier(0.16, 1, 0.3, 1), height 0.28s cubic-bezier(0.16, 1, 0.3, 1), border 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease, opacity 0.3s ease",
          willChange: "transform, width, height, opacity",
          backdropFilter: isHovered ? "blur(1px)" : "none",
        }}
      />

      {/* ── Inner Pinpoint Golden Core ── */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99999,
          width: isHovered ? "6px" : isClicked ? "10px" : "8px",
          height: isHovered ? "6px" : isClicked ? "10px" : "8px",
          borderRadius: "50%",
          backgroundColor: "#C9A96E",
          boxShadow:
            "0 0 12px rgba(201, 169, 110, 0.9), 0 0 24px rgba(201, 169, 110, 0.5)",
          opacity: isVisible ? 1 : 0,
          transition:
            "width 0.2s ease, height 0.2s ease, background-color 0.2s ease, opacity 0.25s ease",
          willChange: "transform, width, height, opacity",
        }}
      />
    </>
  );
}
