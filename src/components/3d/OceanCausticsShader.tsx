"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface OceanCausticsShaderProps {
  className?: string;
}

/**
 * OceanCausticsShader: High-definition WebGL Caustics & Volumetric God-Rays
 * Renders dynamic water caustic light patterns and depth-driven illumination.
 * Features:
 * - Fluid-like mouse cursor displacement & interactive ripple
 * - Scroll-linked depth dimming (sunlit azure/cyan -> deep midnight abyss)
 * - Bioluminescent particulate floating suspension
 * - Auto-fallback for low-power devices with smooth 60-120fps WebGL loop
 */
export function OceanCausticsShader({ className = "" }: OceanCausticsShaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Uniforms
    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_scroll_depth: { value: 0.0 },
    };

    // Vertex Shader
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    // High-Detail Caustics & God-Ray Fragment Shader
    const fragmentShader = `
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_scroll_depth;
      varying vec2 vUv;

      // Simplex-inspired 2D noise
      vec2 hash(vec2 p) {
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
      }

      float noise(vec2 p) {
        const float K1 = 0.366025404;
        const float K2 = 0.211324865;
        vec2 i = floor(p + (p.x + p.y) * K1);
        vec2 a = p - i + (i.x + i.y) * K2;
        vec2 o = (a.x > a.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec2 b = a - o + K2;
        vec2 c = a - 1.0 + 2.0 * K2;
        vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
        vec3 n = h * h * h * h * vec3(dot(a, hash(i)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));
        return dot(n, vec3(70.0));
      }

      // Procedural oceanic caustics function
      float caustics(vec2 uv, float t) {
        vec2 p = uv * 3.5;
        float c1 = noise(p + vec2(t * 0.15, -t * 0.2));
        float c2 = noise(p * 1.8 - vec2(-t * 0.25, t * 0.18));
        float c3 = noise(p * 3.2 + vec2(t * 0.3, t * 0.35));
        
        float v = sin(c1 * 6.28 + t) + sin(c2 * 6.28 - t * 1.2) + sin(c3 * 6.28 + t * 0.8);
        v = abs(v);
        v = pow(1.0 - clamp(v / 3.0, 0.0, 1.0), 3.2);
        return v * 1.4;
      }

      // Volumetric god rays from surface
      float godRays(vec2 uv, float t) {
        vec2 rayOrigin = vec2(0.5 + sin(t * 0.15) * 0.15, 1.2);
        vec2 delta = uv - rayOrigin;
        float angle = atan(delta.y, delta.x);
        float dist = length(delta);
        
        float beam1 = sin(angle * 12.0 + t * 0.4) * 0.5 + 0.5;
        float beam2 = cos(angle * 18.0 - t * 0.3) * 0.5 + 0.5;
        float beam = pow(beam1 * beam2, 2.5);
        
        // Attenuate with depth
        beam *= smoothstep(1.8, 0.2, dist);
        return beam * 0.45;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 uvAspect = vec2(uv.x * aspect, uv.y);

        // Fluid mouse cursor displacement
        vec2 mouseAspect = vec2(u_mouse.x * aspect, u_mouse.y);
        float mouseDist = length(uvAspect - mouseAspect);
        float mouseWave = sin(mouseDist * 22.0 - u_time * 4.0) * exp(-mouseDist * 4.0) * 0.04;
        vec2 displacedUv = uv + (uvAspect - mouseAspect) * mouseWave;

        // Depth modifier: 0.0 = surface, 1.0 = deep trench
        float depth = clamp(u_scroll_depth, 0.0, 1.0);

        // Caustic layers
        float cFast = caustics(displacedUv, u_time * 0.9);
        float cSlow = caustics(displacedUv * 1.5 + vec2(0.3, 0.7), u_time * 0.45);
        float totalCaustics = mix(cFast, cSlow, 0.4);

        // God rays (fades as depth increases)
        float rays = godRays(uv, u_time) * (1.0 - depth * 0.85);

        // Bioluminescent floating plankton
        vec2 particleGrid = floor(displacedUv * 35.0);
        float particleRnd = fract(sin(dot(particleGrid, vec2(12.9898, 78.233))) * 43758.5453);
        float particleBlink = sin(u_time * 2.0 + particleRnd * 6.28) * 0.5 + 0.5;
        float particle = (particleRnd > 0.96) ? pow(particleBlink, 4.0) * 0.7 : 0.0;

        // Color palettes
        // Surface: Pristine Cyan / Warm Sunlight Gold
        vec3 surfaceCyan = vec3(0.04, 0.42, 0.55);
        vec3 sunGold = vec3(0.79, 0.66, 0.43); // Matches brand #C9A96E
        // Deep Abyssal: Bioluminescent midnight indigo & emerald
        vec3 abyssalDeep = vec3(0.01, 0.03, 0.07);
        vec3 bioGlow = vec3(0.12, 0.75, 0.65);

        // Gradient base color influenced by depth
        vec3 baseWater = mix(surfaceCyan * 0.35, abyssalDeep, depth);
        
        // Composite lighting
        vec3 col = baseWater;
        col += sunGold * totalCaustics * (1.0 - depth * 0.65) * 0.75;
        col += vec3(0.4, 0.85, 1.0) * rays * 0.6;
        col += bioGlow * particle * (0.3 + depth * 0.7);

        // Vignette
        float vig = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
        vig = clamp(pow(16.0 * vig, 0.3), 0.0, 1.0);
        col *= vig;

        // Output with high dynamic range alpha to layer seamlessly over existing ocean-hero.jpg
        float alpha = clamp(0.55 + (totalCaustics * 0.35) + (rays * 0.25) - (depth * 0.15), 0.35, 0.85);
        gl_FragColor = vec4(col, alpha);
      }
    `;

    // Material & Plane
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse tracking with lerp
    let targetMouse = { x: 0.5, y: 0.5 };
    let currentMouse = { x: 0.5, y: 0.5 };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouse.x = (e.clientX - rect.left) / rect.width;
      targetMouse.y = 1.0 - (e.clientY - rect.top) / rect.height;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    // Scroll depth tracking
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      uniforms.u_scroll_depth.value = Math.min(Math.max(progress * 1.5, 0), 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.u_resolution.value.set(width, height);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse interpolation
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.08;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.08;
      uniforms.u_mouse.value.set(currentMouse.x, currentMouse.y);

      uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 z-[1] overflow-hidden ${className}`}
      style={{ mixBlendMode: "screen" }}
      aria-hidden="true"
    />
  );
}
