"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { Volume2, VolumeX, Radio, Sparkles, Activity } from "lucide-react";
import { audioController, playClick } from "@/lib/audio";

export function AudioReactiveSonarSphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [peakLevel, setPeakLevel] = useState(0);

  // Three.js refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sphereMeshRef = useRef<THREE.LineSegments | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const originalPositionsRef = useRef<Float32Array | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Listen to audio controller enabled state
    const unsubscribe = audioController.subscribe((enabled) => {
      setIsAudioActive(enabled);
    });
    setIsAudioActive(audioController.getSoundState());

    if (!containerRef.current) return;
    const container = containerRef.current;
    const size = 160;

    // 1. Three.js Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
    camera.position.set(0, 0, 4.2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Geodesic Icosahedron Wireframe Sphere
    const geom = new THREE.IcosahedronGeometry(1.2, 2);
    const edges = new THREE.WireframeGeometry(geom);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0xc9a96e,
      transparent: true,
      opacity: 0.65,
    });
    const wireMesh = new THREE.LineSegments(edges, wireMat);
    scene.add(wireMesh);
    sphereMeshRef.current = wireMesh;

    // 3. Glowing Particle Vertices
    const vertexCount = geom.attributes.position.count;
    const origPos = new Float32Array(geom.attributes.position.array);
    originalPositionsRef.current = origPos;

    const partMat = new THREE.PointsMaterial({
      color: 0xffe194,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const partPoints = new THREE.Points(geom, partMat);
    scene.add(partPoints);
    particlesRef.current = partPoints;

    // 4. Animation loop querying live Web Audio API frequency data
    const freqData = new Uint8Array(32);
    let rot = 0;

    const animate = () => {
      rot += 0.008;
      if (wireMesh) {
        wireMesh.rotation.x = rot * 0.7;
        wireMesh.rotation.y = rot;
      }
      if (partPoints) {
        partPoints.rotation.x = rot * 0.7;
        partPoints.rotation.y = rot;
      }

      // Query real frequency data from audio controller
      const liveFreq = audioController.getFrequencyData();
      let sum = 0;
      for (let i = 0; i < Math.min(liveFreq.length, 32); i++) {
        freqData[i] = liveFreq[i];
        sum += liveFreq[i];
      }
      const avg = sum / (32 * 255);
      setPeakLevel(Math.round(avg * 100));

      // Deform sphere vertices based on frequency intensity
      if (particlesRef.current && originalPositionsRef.current) {
        const positions = particlesRef.current.geometry.attributes.position;
        const orig = originalPositionsRef.current;
        const boost = avg > 0.01 ? 1 + avg * 0.65 : 1 + Math.sin(rot * 3) * 0.03;

        for (let i = 0; i < positions.count; i++) {
          const ix = i * 3;
          positions.setXYZ(
            i,
            orig[ix] * boost,
            orig[ix + 1] * boost,
            orig[ix + 2] * boost
          );
        }
        positions.needsUpdate = true;
      }

      renderer.render(scene, camera);
      rafId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      unsubscribe();
      if (rafId.current) cancelAnimationFrame(rafId.current);
      renderer.dispose();
    };
  }, []);

  const toggleSound = () => {
    audioController.toggleSound();
    setIsAudioActive(audioController.getSoundState());
  };

  const pingSonar = () => {
    playClick(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none font-mono">
      <div
        className={`rounded-2xl border border-[#C9A96E]/30 bg-[#0C0B0A]/90 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.85)] p-3 transition-all duration-300 ${
          isMinimized ? "w-14 h-14 overflow-hidden flex items-center justify-center p-0" : "w-52"
        }`}
      >
        {isMinimized ? (
          <button
            onClick={() => setIsMinimized(false)}
            className="w-full h-full flex items-center justify-center text-[#C9A96E] hover:scale-110 transition-transform"
            title="Buka 3D Sonar Resonator"
          >
            <Radio className="w-5 h-5 animate-pulse" />
          </button>
        ) : (
          <div className="flex flex-col items-center">
            {/* Header with Minimize & Sound Toggle */}
            <div className="w-full flex items-center justify-between pb-2 border-b border-white/10 text-[9.5px]">
              <div className="flex items-center gap-1.5 text-[#C9A96E]">
                <Radio className="w-3.5 h-3.5" />
                <span className="font-bold tracking-wider uppercase">3D SONAR HUD</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={toggleSound}
                  className={`p-1 rounded hover:bg-white/10 transition-colors ${
                    isAudioActive ? "text-[#22C55E]" : "text-[#8A8078]"
                  }`}
                  title={isAudioActive ? "Mute Audio" : "Unmute Audio"}
                >
                  {isAudioActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 rounded text-[#8A8078] hover:text-[#E8DCC8]"
                  title="Minimize"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* 3D Sonar Canvas Viewport */}
            <div
              ref={containerRef}
              className="relative w-40 h-40 flex items-center justify-center cursor-pointer my-1"
              onClick={pingSonar}
              title="Klik bola 3D untuk trigger Sonar Acoustic Ping"
            />

            {/* Live Frequency Level Meter */}
            <div className="w-full space-y-1.5 pt-1">
              <div className="flex justify-between text-[9px] text-[#8A8078]">
                <span>AUDIO FREQUENCY:</span>
                <span className="text-[#C9A96E] font-bold">
                  {isAudioActive ? `${peakLevel} dB` : "MUTED"}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-black/60 border border-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#C9A96E] via-[#E8DCC8] to-[#22C55E] transition-all duration-100"
                  style={{ width: `${isAudioActive ? Math.min(peakLevel * 2, 100) : 0}%` }}
                />
              </div>

              {/* Ping Button */}
              <button
                onClick={pingSonar}
                className="w-full mt-2 py-1 rounded-lg bg-[#C9A96E]/15 border border-[#C9A96E]/30 text-[#C9A96E] hover:bg-[#C9A96E] hover:text-black text-[9.5px] font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-3 h-3" />
                <span>PING SONAR 3D</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
