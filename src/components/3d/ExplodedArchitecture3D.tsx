"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { Layers, Zap, RotateCcw, Cpu, Radio, Network, ArrowRight } from "lucide-react";
import { playClick, playHoverTick } from "@/lib/audio";

interface ServiceUnit {
  id: string;
  name: string;
  port: string;
  role: string;
  color: number;
  basePos: [number, number, number];
  explodedPos: [number, number, number];
}

export function ExplodedArchitecture3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [explosionProgress, setExplosionProgress] = useState<number>(0.75); // 0 to 1
  const [isSimulatingTraffic, setIsSimulatingTraffic] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<string>("order-service");

  // Three.js refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const serviceMeshesRef = useRef<Map<string, THREE.Group>>(new Map());
  const busLinesRef = useRef<THREE.Line[]>([]);
  const packetParticlesRef = useRef<THREE.Points | null>(null);
  const rafId = useRef<number | null>(null);

  const services: ServiceUnit[] = [
    {
      id: "api-gateway",
      name: "API Gateway",
      port: "8080",
      role: "SSL, JWT, Reverse Proxy & Rate Limiting",
      color: 0xc9a96e, // Gold
      basePos: [0, 0, 1.2],
      explodedPos: [0, 0, 4.2],
    },
    {
      id: "auth-service",
      name: "Auth Service",
      port: "8083",
      role: "Stateless JWT Token & RBAC Claims",
      color: 0x38bdf8, // Sky Cyan
      basePos: [0, 1.2, 0],
      explodedPos: [0, 3.2, 0],
    },
    {
      id: "catalog-service",
      name: "Catalog Service",
      port: "8081",
      role: "Product SKU & Redis Cache-Aside",
      color: 0x22c55e, // Emerald
      basePos: [-1.2, 0, 0],
      explodedPos: [-3.8, 0, 0],
    },
    {
      id: "order-service",
      name: "Order Service Core",
      port: "8082",
      role: "Virtual Threads Ingestion & State Machine",
      color: 0xf59e0b, // Amber
      basePos: [0, 0, 0],
      explodedPos: [0, 0, 0],
    },
    {
      id: "payment-service",
      name: "Payment Settlement",
      port: "8084",
      role: "ACID Isolation & Webhook Idempotency",
      color: 0xec4899, // Pink
      basePos: [1.2, 0, 0],
      explodedPos: [3.8, 0, 0],
    },
    {
      id: "notification-service",
      name: "Notification Worker",
      port: "8085",
      role: "RabbitMQ Consumer & Async WebPush",
      color: 0xa855f7, // Purple
      basePos: [0, 0, -1.2],
      explodedPos: [0, 0, -4.2],
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = 400;

    // 1. Scene & Isometric Perspective Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(7.5, 5.5, 8.5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Ambient & Studio Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xc9a96e, 2, 20);
    goldLight.position.set(4, 6, 4);
    scene.add(goldLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 1.5, 20);
    cyanLight.position.set(-4, -2, -4);
    scene.add(cyanLight);

    // 4. Create Service Modules (Sleek Obsidian Server Bricks with Gold Insets)
    const serviceMeshes = new Map<string, THREE.Group>();
    const boxGeo = new THREE.BoxGeometry(1.6, 1.1, 1.6);

    services.forEach((s) => {
      const group = new THREE.Group();

      // Main server block
      const mat = new THREE.MeshStandardMaterial({
        color: 0x11100e,
        metalness: 0.85,
        roughness: 0.25,
      });
      const mesh = new THREE.Mesh(boxGeo, mat);
      group.add(mesh);

      // Gold/Color hairline chamfer edge
      const edges = new THREE.EdgesGeometry(boxGeo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: s.color,
        linewidth: 1.5,
      });
      const edgeLines = new THREE.LineSegments(edges, edgeMat);
      group.add(edgeLines);

      // Status indicator LED dot
      const ledGeo = new THREE.SphereGeometry(0.08, 12, 12);
      const ledMat = new THREE.MeshBasicMaterial({ color: s.color });
      const ledMesh = new THREE.Mesh(ledGeo, ledMat);
      ledMesh.position.set(0.65, 0.4, 0.82);
      group.add(ledMesh);

      // Initial position
      group.position.set(
        s.basePos[0] + (s.explodedPos[0] - s.basePos[0]) * explosionProgress,
        s.basePos[1] + (s.explodedPos[1] - s.basePos[1]) * explosionProgress,
        s.basePos[2] + (s.explodedPos[2] - s.basePos[2]) * explosionProgress
      );

      scene.add(group);
      serviceMeshes.set(s.id, group);
    });

    serviceMeshesRef.current = serviceMeshes;

    // 5. RabbitMQ AMQP Bus Conduit Lines (Core to others)
    const busLines: THREE.Line[] = [];
    const busLineMat = new THREE.LineBasicMaterial({
      color: 0xc9a96e,
      transparent: true,
      opacity: 0.4,
    });

    const coreService = services.find((s) => s.id === "order-service")!;
    services.forEach((s) => {
      if (s.id !== "order-service") {
        const geom = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(...coreService.basePos),
          new THREE.Vector3(...s.basePos),
        ]);
        const line = new THREE.Line(geom, busLineMat);
        scene.add(line);
        busLines.push(line);
      }
    });

    busLinesRef.current = busLines;

    // 6. Data Packets Particles traveling along conduits
    const packetCount = 48;
    const packetGeo = new THREE.BufferGeometry();
    const packetPositions = new Float32Array(packetCount * 3);
    for (let i = 0; i < packetCount * 3; i++) {
      packetPositions[i] = (Math.random() - 0.5) * 4;
    }
    packetGeo.setAttribute("position", new THREE.BufferAttribute(packetPositions, 3));

    const packetMat = new THREE.PointsMaterial({
      color: 0xffe194,
      size: 0.12,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const packetPoints = new THREE.Points(packetGeo, packetMat);
    scene.add(packetPoints);
    packetParticlesRef.current = packetPoints;

    // 7. Subtle 3D Orbit & Floating Animation
    let angle = 0;
    const animate = () => {
      angle += 0.003;
      camera.position.x = Math.sin(angle) * 9.5;
      camera.position.z = Math.cos(angle) * 9.5;
      camera.lookAt(0, 0, 0);

      // Pulse packet points
      if (packetParticlesRef.current) {
        packetParticlesRef.current.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
      rafId.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      cameraRef.current.aspect = w / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      renderer.dispose();
    };
  }, []);

  // Sync 3D positions whenever explosion slider changes
  useEffect(() => {
    services.forEach((s) => {
      const group = serviceMeshesRef.current.get(s.id);
      if (group) {
        group.position.set(
          s.basePos[0] + (s.explodedPos[0] - s.basePos[0]) * explosionProgress,
          s.basePos[1] + (s.explodedPos[1] - s.basePos[1]) * explosionProgress,
          s.basePos[2] + (s.explodedPos[2] - s.basePos[2]) * explosionProgress
        );
      }
    });

    // Update bus lines
    const coreMesh = serviceMeshesRef.current.get("order-service");
    if (coreMesh && busLinesRef.current.length > 0) {
      let lineIdx = 0;
      services.forEach((s) => {
        if (s.id !== "order-service") {
          const sMesh = serviceMeshesRef.current.get(s.id);
          const line = busLinesRef.current[lineIdx];
          if (sMesh && line) {
            const positions = new Float32Array([
              coreMesh.position.x,
              coreMesh.position.y,
              coreMesh.position.z,
              sMesh.position.x,
              sMesh.position.y,
              sMesh.position.z,
            ]);
            line.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
            line.geometry.attributes.position.needsUpdate = true;
            (line.material as THREE.LineBasicMaterial).opacity = 0.2 + explosionProgress * 0.6;
          }
          lineIdx++;
        }
      });
    }
  }, [explosionProgress]);

  const triggerBurst = () => {
    playClick();
    setIsSimulatingTraffic(true);
    setTimeout(() => setIsSimulatingTraffic(false), 2400);
  };

  const currentInfo = services.find((s) => s.id === selectedService) || services[0];

  return (
    <div className="w-full rounded-2xl border border-[#C9A96E]/30 bg-gradient-to-b from-[#12100E] via-[#090807] to-[#0A0A0A] p-6 sm:p-8 shadow-2xl relative overflow-hidden font-mono">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-5 border-b border-white/5 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#C9A96E]" />
            <span className="text-[10px] uppercase tracking-widest text-[#C9A96E] font-bold">
              CAD EXPLODED-VIEW ARCHITECTURE
            </span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#E8DCC8] tracking-tight mt-1">
            Bongkar Pasang Jeroan Monolith ke Microservices
          </h3>
          <p className="font-sans text-xs text-[#8A8078] mt-0.5">
            Inspeksi spasial 3D dekomposisi sistem RegarStore dari satu blok monolitik menjadi 6 kontainer terdistribusi.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playClick();
              setExplosionProgress(0);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
              explosionProgress === 0
                ? "bg-[#C9A96E] text-black font-bold"
                : "bg-white/5 text-[#8A8078] hover:text-[#E8DCC8]"
            }`}
          >
            MONOLITH (0%)
          </button>
          <button
            onClick={() => {
              playClick();
              setExplosionProgress(1);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
              explosionProgress === 1
                ? "bg-[#C9A96E] text-black font-bold"
                : "bg-white/5 text-[#8A8078] hover:text-[#E8DCC8]"
            }`}
          >
            EXPLODED (100%)
          </button>
        </div>
      </div>

      {/* 3D Viewport with HUD Overlay */}
      <div className="relative my-4 rounded-xl border border-white/5 bg-black/80 overflow-hidden">
        <div ref={containerRef} className="w-full h-[400px]" />

        {/* Active Isolation Status Badge */}
        <div className="absolute top-3 left-3 px-3.5 py-2 rounded-xl bg-black/85 border border-white/10 backdrop-blur-md text-xs space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[#C9A96E] text-[10px] font-bold">
              {explosionProgress > 0.5 ? "◈" : "◇"}
            </span>
            <span className="text-[#E8DCC8] font-bold">
              {explosionProgress === 0
                ? "STATUS: MONOLITH TIGHTLY-COUPLED"
                : explosionProgress === 1
                ? "STATUS: FULLY DECOUPLED MESH"
                : "STATUS: PARTIALLY ISOLATED"}
            </span>
          </div>
          <span className="text-[10px] text-[#8A8078] block">
            Separation Distance: {Math.round(explosionProgress * 100)}%
          </span>
        </div>

        {/* Traffic Simulation Burst Trigger */}
        <div className="absolute top-3 right-3">
          <button
            onClick={triggerBurst}
            disabled={isSimulatingTraffic}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#C9A96E]/20 border border-[#C9A96E]/40 text-[#C9A96E] hover:bg-[#C9A96E] hover:text-black text-xs font-bold transition-all shadow-md"
          >
            <Zap className={`w-3.5 h-3.5 ${isSimulatingTraffic ? "animate-bounce text-yellow-400" : ""}`} />
            <span>{isSimulatingTraffic ? "INGRESS AKTIF..." : "SIMULASI TRAFFIC"}</span>
          </button>
        </div>

        {/* Selected Service Spec Card */}
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-md p-3.5 rounded-xl bg-black/90 border border-white/10 backdrop-blur-md text-xs space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span className="font-bold text-[#E8DCC8]">{currentInfo.name}</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-[#C9A96E] font-bold">
              PORT {currentInfo.port}
            </span>
          </div>
          <p className="text-[11px] font-sans text-[#A89F91]">{currentInfo.role}</p>
        </div>
      </div>

      {/* Explosion Distance Slider */}
      <div className="py-4 border-b border-white/5 space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-[#8A8078]">SLIDER SEPARASI KONTUR (EXPLODED DISTANCE):</span>
          <span className="text-[#C9A96E] font-bold">{Math.round(explosionProgress * 100)}% DECOUPLED</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={explosionProgress}
          onChange={(e) => setExplosionProgress(parseFloat(e.target.value))}
          className="w-full accent-[#C9A96E] cursor-pointer"
        />
      </div>

      {/* Service Selector Chips */}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-[#8A8078] text-[10px] uppercase mr-2">PILIH UNIT LAYANAN:</span>
        {services.map((s) => (
          <button
            key={s.id}
            onClick={() => {
              playHoverTick();
              setSelectedService(s.id);
            }}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              selectedService === s.id
                ? "border-[#C9A96E] bg-[#C9A96E]/20 text-[#C9A96E] font-bold"
                : "border-white/5 bg-white/[0.02] text-[#8A8078] hover:text-[#E8DCC8]"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
}
