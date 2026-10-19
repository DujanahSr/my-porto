"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Cpu, Server, ShieldCheck, Zap, Activity, Info } from "lucide-react";
import { playClick, playHoverTick } from "@/lib/audio";

interface ServiceNode {
  id: string;
  name: string;
  role: string;
  port: number;
  tech: string;
  concurrency: string;
  dbOrBroker: string;
  status: "HEALTHY" | "OPTIMAL";
  pos: [number, number, number];
  color: number;
}

const SERVICES: ServiceNode[] = [
  {
    id: "gateway",
    name: "Spring Cloud Gateway",
    role: "API Gateway & Edge Reverse Proxy",
    port: 8080,
    tech: "Spring Cloud Gateway · WebFlux",
    concurrency: "Reactive Netty EventLoop (Non-blocking I/O)",
    dbOrBroker: "Redis Token Bucket Rate Limiter",
    status: "OPTIMAL",
    pos: [0, 2.2, 0],
    color: 0xc9a96e, // Gold
  },
  {
    id: "auth",
    name: "Auth & Identity Service",
    role: "Enterprise RBAC & Security Guard",
    port: 8081,
    tech: "Spring Security 6 · OAuth2 / JWT",
    concurrency: "Java 21 Virtual Threads",
    dbOrBroker: "PostgreSQL · Redis Blacklist",
    status: "HEALTHY",
    pos: [-2.6, 0.8, -0.6],
    color: 0x38bdf8, // Sky Blue
  },
  {
    id: "catalog",
    name: "Product Catalog Service",
    role: "High-Read Inventory & Search",
    port: 8082,
    tech: "Spring Boot 3 · JPA / Hibernate",
    concurrency: "Virtual Threads + Redis In-Memory Cache",
    dbOrBroker: "Redis (<1ms read) + MySQL 8",
    status: "OPTIMAL",
    pos: [2.6, 0.8, -0.6],
    color: 0x22c55e, // Emerald Green
  },
  {
    id: "order",
    name: "Order & Checkout Engine",
    role: "ACID Transaction & Lock Manager",
    port: 8083,
    tech: "Java 21 Loom · Spring Boot 3",
    concurrency: "Pessimistic Row-Locking (SELECT FOR UPDATE)",
    dbOrBroker: "PostgreSQL ACID Cluster",
    status: "OPTIMAL",
    pos: [-1.8, -1.8, 0.5],
    color: 0xf59e0b, // Amber
  },
  {
    id: "payment",
    name: "Payment Processing Service",
    role: "Midtrans Webhook & Idempotency",
    port: 8084,
    tech: "Spring Boot 3 · REST API Client",
    concurrency: "Virtual Threads + Exponential Backoff Retry",
    dbOrBroker: "Idempotency Ledger Table",
    status: "HEALTHY",
    pos: [0, -2.4, -0.5],
    color: 0xa855f7, // Purple
  },
  {
    id: "notification",
    name: "Async Notification Worker",
    role: "AMQP Message Consumer & Dispatch",
    port: 8085,
    tech: "RabbitMQ AMQP 0-9-1 Consumer",
    concurrency: "Multi-channel Concurrent Listeners",
    dbOrBroker: "RabbitMQ Exchanges + Dead Letter Queue (DLQ)",
    status: "OPTIMAL",
    pos: [1.8, -1.8, 0.5],
    color: 0xec4899, // Pink
  },
];

// Node connectivity edges (Source -> Target)
const EDGES: [number, number][] = [
  [0, 1], // Gateway -> Auth
  [0, 2], // Gateway -> Catalog
  [0, 3], // Gateway -> Order
  [3, 4], // Order -> Payment
  [3, 5], // Order -> Notification
  [1, 3], // Auth -> Order
  [2, 3], // Catalog -> Order
];

export function Microservices3DTopology() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<ServiceNode>(SERVICES[0]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xc9a96e, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Root cluster group that can orbit
    const clusterGroup = new THREE.Group();
    scene.add(clusterGroup);

    // 3. Create 3D Nodes
    const nodeMeshes: THREE.Mesh[] = [];

    SERVICES.forEach((srv) => {
      // Outer wireframe dodecahedron
      const geomOuter = new THREE.DodecahedronGeometry(0.55, 1);
      const matOuter = new THREE.MeshStandardMaterial({
        color: srv.color,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
        emissive: srv.color,
        emissiveIntensity: 0.3,
      });
      const meshOuter = new THREE.Mesh(geomOuter, matOuter);
      meshOuter.position.set(...srv.pos);

      // Inner glowing core
      const geomInner = new THREE.SphereGeometry(0.28, 16, 16);
      const matInner = new THREE.MeshStandardMaterial({
        color: srv.color,
        roughness: 0.2,
        metalness: 0.8,
        emissive: srv.color,
        emissiveIntensity: 0.8,
      });
      const meshInner = new THREE.Mesh(geomInner, matInner);
      meshOuter.add(meshInner);

      meshOuter.userData = { service: srv };
      clusterGroup.add(meshOuter);
      nodeMeshes.push(meshOuter);
    });

    // 4. Create Fiber-Optic Conduits & Flow Packets
    const packets: { mesh: THREE.Mesh; start: THREE.Vector3; end: THREE.Vector3; progress: number; speed: number }[] = [];

    EDGES.forEach(([srcIdx, tgtIdx]) => {
      const srcPos = new THREE.Vector3(...SERVICES[srcIdx].pos);
      const tgtPos = new THREE.Vector3(...SERVICES[tgtIdx].pos);

      // Conduit line geometry
      const points = [srcPos, tgtPos];
      const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xc9a96e,
        transparent: true,
        opacity: 0.35,
      });
      const line = new THREE.Line(lineGeom, lineMat);
      clusterGroup.add(line);

      // Moving light packet
      const packetGeom = new THREE.SphereGeometry(0.065, 8, 8);
      const packetMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const packetMesh = new THREE.Mesh(packetGeom, packetMat);
      clusterGroup.add(packetMesh);

      packets.push({
        mesh: packetMesh,
        start: srcPos,
        end: tgtPos,
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.006,
      });
    });

    // 5. Interactive Raycaster for Hover & Selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        if (hit.userData && hit.userData.service) {
          playClick();
          setSelectedService(hit.userData.service);
        }
      }
    };

    container.addEventListener("pointerdown", handlePointerDown);

    // Drag Orbit Controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      clusterGroup.rotation.y += deltaX * 0.008;
      clusterGroup.rotation.x += deltaY * 0.008;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // 6. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Gentle continuous ambient drift when not dragging
      if (!isDragging) {
        clusterGroup.rotation.y += 0.003;
      }

      // Rotate nodes around their own local axes
      nodeMeshes.forEach((mesh) => {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.015;
      });

      // Move packets along edges
      packets.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1.0) p.progress = 0.0;
        p.mesh.position.lerpVectors(p.start, p.end, p.progress);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      resizeObserver.disconnect();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#c9a96e]/30 bg-gradient-to-b from-[#0e0d0b] via-[#060606] to-[#0a0a0a] shadow-2xl p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[#c9a96e] text-xs">◈</span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#c9a96e] font-bold">
              3D Live Topology // RegarStore Cluster
            </span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#e8dcc8]">
            Peta Topologi Microservices 3D Interaktif
          </h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs font-mono text-[#a89f91]">
          <Info className="w-3.5 h-3.5 text-[#c9a96e]" />
          <span>Klik node atau drag untuk memutar 3D</span>
        </div>
      </div>

      {/* Grid: 3D Canvas on Left/Top, HUD Inspector on Right/Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* 3D Canvas Viewport */}
        <div
          ref={mountRef}
          className="lg:col-span-8 h-[360px] sm:h-[440px] relative rounded-xl bg-radial from-[#151412] to-[#050505] cursor-grab active:cursor-grabbing border border-white/5 overflow-hidden"
        >
          {/* Coordinate watermark */}
          <div className="absolute top-3 left-3 font-mono text-[9px] text-[#c9a96e]/60 tracking-wider">
            CLUSTER: DOKPLOY LINODE SG // MESH PROTOCOL: HTTP/2 &amp; AMQP
          </div>
          <div className="absolute bottom-3 right-3 font-mono text-[9px] text-[#8a8078] tracking-widest">
            3D WEBGL NODE GRAPH
          </div>
        </div>

        {/* Selected Node Telemetry HUD */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full bg-[#0d0c0a] border border-[#c9a96e]/30 rounded-xl p-5 space-y-4 shadow-xl">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#c9a96e]/20 pb-2.5">
              <span className="font-mono text-[10px] tracking-widest uppercase text-[#8a8078]">
                NODE INSPECTION
              </span>
              <span className="font-mono text-[10px] text-[#22c55e] font-bold px-2 py-0.5 rounded bg-[#22c55e]/10 border border-[#22c55e]/30">
                {selectedService.status}
              </span>
            </div>

            <div>
              <h4 className="font-serif text-xl font-bold text-[#e8dcc8]">
                {selectedService.name}
              </h4>
              <p className="font-mono text-xs text-[#c9a96e] mt-0.5 font-semibold">
                {selectedService.role}
              </p>
            </div>

            <div className="space-y-2 font-mono text-xs pt-1">
              <div className="p-2 rounded bg-black/60 border border-white/5">
                <span className="text-[9px] text-[#8a8078] uppercase block">
                  NETWORK PORT &amp; PROTOCOL
                </span>
                <span className="text-[#e8dcc8] font-bold">
                  Port :{selectedService.port} · HTTP/REST &amp; Internal
                </span>
              </div>

              <div className="p-2 rounded bg-black/60 border border-white/5">
                <span className="text-[9px] text-[#8a8078] uppercase block">
                  RUNTIME &amp; FRAMEWORK
                </span>
                <span className="text-[#e8dcc8] font-bold">
                  {selectedService.tech}
                </span>
              </div>

              <div className="p-2 rounded bg-black/60 border border-white/5">
                <span className="text-[9px] text-[#8a8078] uppercase block">
                  CONCURRENCY MODEL
                </span>
                <span className="text-[#c9a96e] font-bold">
                  {selectedService.concurrency}
                </span>
              </div>

              <div className="p-2 rounded bg-black/60 border border-white/5">
                <span className="text-[9px] text-[#8a8078] uppercase block">
                  DATA STORAGE &amp; MESSAGE BROKER
                </span>
                <span className="text-[#e8dcc8]">
                  {selectedService.dbOrBroker}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Node Switcher Buttons */}
          <div className="pt-2 border-t border-white/10">
            <span className="font-mono text-[9px] text-[#8a8078] uppercase tracking-wider block mb-2">
              PILIH SERVICE LAIN:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    playClick();
                    setSelectedService(s);
                  }}
                  className={`font-mono text-[10px] px-2 py-1 rounded transition-all ${
                    selectedService.id === s.id
                      ? "bg-[#c9a96e] text-black font-bold shadow-md"
                      : "bg-white/5 text-[#a89f91] hover:bg-white/10 hover:text-[#e8dcc8]"
                  }`}
                >
                  {s.id.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
