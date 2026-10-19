"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface OceanCausticsShaderProps {
  className?: string;
}

/**
 * OceanCausticsShader: 3D Volumetric God-Rays & Marine Particulate System
 * Enhances the original ocean-hero.jpg with:
 * - Dynamic volumetric golden sun shafts aligned with the original photo's sunbeams (origin top-right)
 * - Interactive 3D marine snow / bioluminescent particles with mouse parallax depth
 * - Gentle underwater fluid refraction (organic, subtle, zero artificial white netting)
 * - Preserves 100% of the cinematic deep-sea atmosphere of the original image
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

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 2. Volumetric God-Rays & Ambient Shimmer Plane Shader
    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      u_mouse: { value: new THREE.Vector2(0.7, 0.8) }, // Default sun origin bias (top-right)
      u_scroll_depth: { value: 0.0 },
    };

    const rayVertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `;

    // Shader specifically calibrated for the angle and warmth of ocean-hero.jpg
    const rayFragmentShader = `
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_scroll_depth;
      varying vec2 vUv;

      // Soft procedural noise for ray turbulence
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float smoothNoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      // Volumetric light shafts emanating from top-right towards seabed
      float godRayShafts(vec2 uv, vec2 sunPos, float t) {
        vec2 delta = uv - sunPos;
        float angle = atan(delta.y, delta.x);
        float dist = length(delta);

        // Multiple overlapping soft ray frequencies
        float ray1 = sin(angle * 14.0 + t * 0.35 + smoothNoise(uv * 3.0 + t * 0.1) * 2.0) * 0.5 + 0.5;
        float ray2 = cos(angle * 22.0 - t * 0.25) * 0.5 + 0.5;
        float ray3 = sin(angle * 32.0 + t * 0.5) * 0.5 + 0.5;
        
        float combined = pow(ray1 * 0.6 + ray2 * 0.3 + ray3 * 0.1, 3.2);

        // Falloff along the beam path towards bottom-left
        float beamFalloff = smoothstep(1.9, 0.1, dist);
        return combined * beamFalloff;
      }

      // Soft, warm underwater luminescence (strictly low-contrast shimmer, no harsh white web)
      float ambientWaterBreath(vec2 uv, float t) {
        float n = smoothNoise(uv * 2.5 + vec2(t * 0.08, -t * 0.05));
        return sin(n * 6.28 + t * 0.5) * 0.5 + 0.5;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        float aspect = u_resolution.x / u_resolution.y;

        // Dynamic sun source in top-right matching ocean-hero.jpg, shifting subtly with mouse
        vec2 sunOrigin = vec2(0.72 + (u_mouse.x - 0.5) * 0.12, 1.08 + (u_mouse.y - 0.5) * 0.08);

        // Calculate volumetric light shafts
        float rays = godRayShafts(uv, sunOrigin, u_time);
        float waterBreath = ambientWaterBreath(uv, u_time);

        // Depth dimming (scroll-linked)
        float depth = clamp(u_scroll_depth, 0.0, 1.0);

        // Golden amber sunlight colors matching the brand & photo lighting
        vec3 sunColor = vec3(0.85, 0.72, 0.48);       // Warm #C9A96E gold tone
        vec3 deepBlueGlow = vec3(0.12, 0.35, 0.48);    // Soft oceanic ambient cyan

        // Combine subtle illumination
        vec3 finalColor = sunColor * rays * 0.65;
        finalColor += deepBlueGlow * waterBreath * 0.15;

        // Vignette to softly keep the edges dark and moody
        float vignette = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
        vignette = clamp(pow(16.0 * vignette, 0.25), 0.0, 1.0);
        finalColor *= vignette * (1.0 - depth * 0.7);

        // Low, luxurious alpha: acts as a living atmospheric shimmer without hiding the photo
        float alpha = clamp((rays * 0.35 + waterBreath * 0.08) * (1.0 - depth * 0.6), 0.0, 0.45);

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    const rayMaterial = new THREE.ShaderMaterial({
      vertexShader: rayVertexShader,
      fragmentShader: rayFragmentShader,
      uniforms,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const quadGeom = new THREE.PlaneGeometry(2, 2);
    const rayMesh = new THREE.Mesh(quadGeom, rayMaterial);
    scene.add(rayMesh);

    // 3. 3D Floating Marine Snow & Bioluminescent Particles (Spatial 3D / 8D Depth)
    const particleCount = 120;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 8; // X spread
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6; // Y spread
      positions[i * 3 + 2] = Math.random() * 4 - 2;     // Z depth (multi-plane parallax)
      speeds[i] = 0.002 + Math.random() * 0.005;
      particleScales[i] = 0.5 + Math.random() * 1.5;
    }

    particleGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Particle texture canvas for soft circular glowing specs
    const createParticleTexture = () => {
      const c = document.createElement("canvas");
      c.width = 32;
      c.height = 32;
      const ctx = c.getContext("2d");
      if (!ctx) return new THREE.Texture();
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, "rgba(232, 220, 200, 1.0)");
      grad.addColorStop(0.35, "rgba(201, 169, 110, 0.6)");
      grad.addColorStop(0.8, "rgba(201, 169, 110, 0.1)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
      const texture = new THREE.CanvasTexture(c);
      return texture;
    };

    const particleMat = new THREE.PointsMaterial({
      size: 0.16,
      map: createParticleTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.55,
      color: 0xc9a96e,
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // 4. Mouse Tracking with Parallax Inertia
    let targetMouse = { x: 0.7, y: 0.8 };
    let currentMouse = { x: 0.7, y: 0.8 };

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

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      uniforms.u_resolution.value.set(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // 5. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.05;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.05;
      uniforms.u_mouse.value.set(currentMouse.x, currentMouse.y);
      uniforms.u_time.value = elapsedTime;

      // 3D Parallax tilt of the particle system
      particles.rotation.y = (currentMouse.x - 0.5) * 0.25;
      particles.rotation.x = -(currentMouse.y - 0.5) * 0.2;

      // Animate marine snow particles drifting gently upward & oscillating
      const posAttr = particleGeom.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        // Vertical upward drift
        posArray[i * 3 + 1] += speeds[i];
        // Gentle horizontal current sway
        posArray[i * 3 + 0] += Math.sin(elapsedTime * 0.8 + i) * 0.0015;

        // Reset if float out of top bound
        if (posArray[i * 3 + 1] > 3.0) {
          posArray[i * 3 + 1] = -3.0;
          posArray[i * 3 + 0] = (Math.random() - 0.5) * 8;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      quadGeom.dispose();
      rayMaterial.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 z-[1] overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
