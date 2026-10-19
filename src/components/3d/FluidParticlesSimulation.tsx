"use client";

import React, { useEffect, useRef } from "react";

interface FluidParticlesSimulationProps {
  className?: string;
  particleCount?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  alpha: number;
  baseAlpha: number;
  life: number;
  maxLife: number;
  hueOffset: number;
}

export function FluidParticlesSimulation({
  className = "",
  particleCount = 65,
}: FluidParticlesSimulationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Fluid Grid Setup (Lightweight Navier-Stokes grid approximation)
    const gridSize = 32;
    const cols = Math.ceil(width / gridSize);
    const rows = Math.ceil(height / gridSize);
    const velocityGrid = new Float32Array(cols * rows * 2); // [vx, vy, vx, vy, ...]

    // Mouse Interaction Tracking
    let mouseX = -1000;
    let mouseY = -1000;
    let prevMouseX = -1000;
    let prevMouseY = -1000;
    let mouseSpeed = 0;
    let isMouseActive = false;

    // Initialize Bioluminescent Oceanic Particles
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.15, // Subtle upward buoyancy
        baseRadius: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.4 + 0.2,
        baseAlpha: Math.random() * 0.4 + 0.2,
        life: Math.random() * 200 + 100,
        maxLife: Math.random() * 200 + 100,
        hueOffset: Math.random() * 15 - 7,
      });
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      if (prevMouseX > -900) {
        const dx = currentX - prevMouseX;
        const dy = currentY - prevMouseY;
        mouseSpeed = Math.sqrt(dx * dx + dy * dy);

        // Inject velocity into nearest grid cells (Fluid Impetus)
        const cellX = Math.floor(currentX / gridSize);
        const cellY = Math.floor(currentY / gridSize);

        for (let ox = -2; ox <= 2; ox++) {
          for (let oy = -2; oy <= 2; oy++) {
            const gx = cellX + ox;
            const gy = cellY + oy;
            if (gx >= 0 && gx < cols && gy >= 0 && gy < rows) {
              const idx = (gy * cols + gx) * 2;
              const dist = Math.sqrt(ox * ox + oy * oy) + 1;
              const factor = (1 / dist) * 0.45;
              velocityGrid[idx] += dx * factor;
              velocityGrid[idx + 1] += dy * factor;
            }
          }
        }
      }

      prevMouseX = currentX;
      prevMouseY = currentY;
      mouseX = currentX;
      mouseY = currentY;
      isMouseActive = true;
    };

    const handleMouseLeave = () => {
      prevMouseX = -1000;
      prevMouseY = -1000;
      isMouseActive = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    // Animation Loop (60-120 FPS capped, zero GC thrashing)
    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // 1. Decay and diffuse fluid velocity grid
      for (let i = 0; i < velocityGrid.length; i += 2) {
        velocityGrid[i] *= 0.94; // Viscous dampening X
        velocityGrid[i + 1] *= 0.94; // Viscous dampening Y
      }

      // 2. Update and draw particles along fluid streamlines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Sample local fluid velocity from grid
        const cellX = Math.floor(p.x / gridSize);
        const cellY = Math.floor(p.y / gridSize);

        if (cellX >= 0 && cellX < cols && cellY >= 0 && cellY < rows) {
          const idx = (cellY * cols + cellX) * 2;
          const fluidVx = velocityGrid[idx] || 0;
          const fluidVy = velocityGrid[idx + 1] || 0;

          // Advect particle with fluid momentum
          p.vx += fluidVx * 0.12;
          p.vy += fluidVy * 0.12;
        }

        // Ambient oceanic drift (gentle harmonic sine wave)
        p.vx += Math.sin(time + p.y * 0.005) * 0.04;
        p.vy -= 0.06; // Buoyancy floating gently upwards

        // Velocity damping
        p.vx *= 0.93;
        p.vy *= 0.93;

        // Apply movement
        p.x += p.vx;
        p.y += p.vy;

        // Screen boundary wrap
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.y > height + 10) p.y = -10;

        // Particle lifetime & subtle breathing glow
        p.life--;
        if (p.life <= 0) {
          p.life = p.maxLife;
        }
        const pulse = Math.sin((p.life / p.maxLife) * Math.PI);
        const currentAlpha = p.baseAlpha * pulse;

        // Draw Bioluminescent Gold Oceanic Dot
        const currentRadius = p.baseRadius * (1 + pulse * 0.25);

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 169, 110, ${currentAlpha})`;
        ctx.fill();

        // Subtle outer glow halo for larger particles
        if (p.baseRadius > 1.4) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentRadius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(232, 220, 200, ${currentAlpha * 0.25})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-[4] ${className}`}
      style={{ opacity: 0.85 }}
    />
  );
}
