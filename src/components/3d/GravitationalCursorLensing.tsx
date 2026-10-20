"use client";

import React, { useEffect, useRef } from "react";

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

export function GravitationalCursorLensing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const isRunningRef = useRef<boolean>(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const addRipple = (e: MouseEvent) => {
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: Math.min(window.innerWidth * 0.18, 160),
        alpha: 0.85,
        speed: 3.8,
      });

      if (!isRunningRef.current) {
        isRunningRef.current = true;
        renderLoop();
      }
    };

    window.addEventListener("click", addRipple);

    const renderLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (ripplesRef.current.length === 0) {
        isRunningRef.current = false;
        return;
      }

      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += r.speed;
        r.alpha *= 0.94;

        if (r.alpha < 0.01 || r.radius >= r.maxRadius) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        // 1. Primary Gold Refraction Shockwave
        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.lineWidth = Math.max(1, (1 - r.radius / r.maxRadius) * 4);
        ctx.strokeStyle = `rgba(201, 169, 110, ${r.alpha * 0.7})`;
        ctx.shadowColor = "rgba(201, 169, 110, 0.9)";
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.restore();

        // 2. Chromatic Dispersion Cyan Outermost Ring
        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, Math.max(1, r.radius - 2.5), 0, Math.PI * 2);
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = `rgba(56, 189, 248, ${r.alpha * 0.35})`;
        ctx.stroke();
        ctx.restore();

        // 3. Inner Compressive Core Pulse
        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, Math.max(1, r.radius * 0.45), 0, Math.PI * 2);
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = `rgba(232, 220, 200, ${r.alpha * 0.2})`;
        ctx.stroke();
        ctx.restore();
      }

      rafId.current = requestAnimationFrame(renderLoop);
    };

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", addRipple);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99990] select-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
