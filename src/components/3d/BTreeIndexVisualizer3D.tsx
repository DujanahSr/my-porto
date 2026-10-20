"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { Play, RotateCcw, Database, Cpu, Search, CheckCircle, Zap } from "lucide-react";
import { playClick, playHoverTick } from "@/lib/audio";

interface NodePosition {
  id: string;
  level: number;
  label: string;
  minKey: number;
  maxKey: number;
  x: number;
  y: number;
  z: number;
}

export function BTreeIndexVisualizer3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchKey, setSearchKey] = useState<number>(428);
  const [scanMode, setScanMode] = useState<"btree" | "seqscan">("btree");
  const [isTraversing, setIsTraversing] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<string>("Standby. Masukkan SKU untuk memulai traversal.");
  const [metrics, setMetrics] = useState({
    time: "0.12 ms",
    buffers: "3 blocks (24 KB)",
    algorithm: "Index Scan using idx_inventory_sku on product_inventory",
    status: "READY",
  });

  // Three.js refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const laserBeamRef = useRef<THREE.Line | null>(null);
  const nodeMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const rafId = useRef<number | null>(null);

  // Define B-Tree Node Topology
  const nodes: NodePosition[] = [
    // Level 0: Root Node
    { id: "root", level: 0, label: "ROOT [250 | 500 | 750]", minKey: 0, maxKey: 999, x: 0, y: 3.2, z: 0 },

    // Level 1: Internal Branches
    { id: "branch-1", level: 1, label: "BRANCH A [0..249]", minKey: 0, maxKey: 249, x: -4.5, y: 1.0, z: 0 },
    { id: "branch-2", level: 1, label: "BRANCH B [250..499]", minKey: 250, maxKey: 499, x: -1.5, y: 1.0, z: 0 },
    { id: "branch-3", level: 1, label: "BRANCH C [500..749]", minKey: 500, maxKey: 749, x: 1.5, y: 1.0, z: 0 },
    { id: "branch-4", level: 1, label: "BRANCH D [750..999]", minKey: 750, maxKey: 999, x: 4.5, y: 1.0, z: 0 },

    // Level 2: Leaf Pages (PostgreSQL Disk Blocks)
    { id: "leaf-1", level: 2, label: "PAGE #12 [ctid: (1,4)]", minKey: 0, maxKey: 124, x: -5.4, y: -1.4, z: 0 },
    { id: "leaf-2", level: 2, label: "PAGE #18 [ctid: (2,9)]", minKey: 125, maxKey: 249, x: -3.6, y: -1.4, z: 0 },
    { id: "leaf-3", level: 2, label: "PAGE #44 [ctid: (8,2)]", minKey: 250, maxKey: 374, x: -2.2, y: -1.4, z: 0 },
    { id: "leaf-4", level: 2, label: "PAGE #56 [ctid: (11,7)]", minKey: 375, maxKey: 499, x: -0.8, y: -1.4, z: 0 },
    { id: "leaf-5", level: 2, label: "PAGE #72 [ctid: (19,1)]", minKey: 500, maxKey: 624, x: 0.8, y: -1.4, z: 0 },
    { id: "leaf-6", level: 2, label: "PAGE #81 [ctid: (24,5)]", minKey: 625, maxKey: 749, x: 2.2, y: -1.4, z: 0 },
    { id: "leaf-7", level: 2, label: "PAGE #90 [ctid: (31,3)]", minKey: 750, maxKey: 874, x: 3.6, y: -1.4, z: 0 },
    { id: "leaf-8", level: 2, label: "PAGE #99 [ctid: (38,8)]", minKey: 875, maxKey: 999, x: 5.4, y: -1.4, z: 0 },
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = 380;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 11);
    cameraRef.current = camera;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xc9a96e, 1.4);
    dirLight.position.set(5, 8, 6);
    scene.add(dirLight);

    // 4. Create Node Boxes & Branch Connections
    const nodeMeshes = new Map<string, THREE.Mesh>();
    const boxGeo = new THREE.BoxGeometry(1.4, 0.65, 0.4);

    nodes.forEach((n) => {
      const isRoot = n.level === 0;
      const isLeaf = n.level === 2;

      const mat = new THREE.MeshStandardMaterial({
        color: isRoot ? 0xc9a96e : isLeaf ? 0x22c55e : 0x38bdf8,
        metalness: 0.7,
        roughness: 0.3,
        transparent: true,
        opacity: 0.88,
      });

      const mesh = new THREE.Mesh(boxGeo, mat);
      mesh.position.set(n.x, n.y, n.z);
      scene.add(mesh);
      nodeMeshes.set(n.id, mesh);

      // Edges helper
      const edges = new THREE.EdgesGeometry(boxGeo);
      const lineMat = new THREE.LineBasicMaterial({
        color: isRoot ? 0xffe194 : isLeaf ? 0x86efac : 0x7dd3fc,
        linewidth: 1.5,
      });
      const wireframe = new THREE.LineSegments(edges, lineMat);
      mesh.add(wireframe);
    });

    nodeMeshesRef.current = nodeMeshes;

    // 5. Connecting Lines (B-Tree Hierarchical Arcs)
    const lineMat = new THREE.LineBasicMaterial({ color: 0x4a453e, transparent: true, opacity: 0.45 });
    const connections: [string, string][] = [
      ["root", "branch-1"],
      ["root", "branch-2"],
      ["root", "branch-3"],
      ["root", "branch-4"],
      ["branch-1", "leaf-1"],
      ["branch-1", "leaf-2"],
      ["branch-2", "leaf-3"],
      ["branch-2", "leaf-4"],
      ["branch-3", "leaf-5"],
      ["branch-3", "leaf-6"],
      ["branch-4", "leaf-7"],
      ["branch-4", "leaf-8"],
    ];

    connections.forEach(([fromId, toId]) => {
      const from = nodes.find((n) => n.id === fromId)!;
      const to = nodes.find((n) => n.id === toId)!;
      const points = [new THREE.Vector3(from.x, from.y - 0.35, from.z), new THREE.Vector3(to.x, to.y + 0.35, to.z)];
      const geom = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geom, lineMat);
      scene.add(line);
    });

    // 6. Laser Traversal Path Probe
    const probePoints = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)];
    const probeGeom = new THREE.BufferGeometry().setFromPoints(probePoints);
    const probeMat = new THREE.LineBasicMaterial({
      color: 0xffd700,
      linewidth: 3,
      transparent: true,
      opacity: 0,
    });
    const probeLine = new THREE.Line(probeGeom, probeMat);
    scene.add(probeLine);
    laserBeamRef.current = probeLine;

    // 7. Subtle 3D floating animation loop
    let clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      nodes.forEach((n) => {
        const mesh = nodeMeshes.get(n.id);
        if (mesh) {
          mesh.position.y = n.y + Math.sin(t * 1.5 + n.x) * 0.05;
        }
      });

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

  const runTraversal = () => {
    if (isTraversing) return;
    playClick();
    setIsTraversing(true);

    const targetKey = Math.min(Math.max(searchKey, 0), 999);

    if (scanMode === "seqscan") {
      // Sequential Table Scan Simulation: Highlights all leaf pages one by one (Slow)
      setActiveStep("EXPLAIN ANALYZE: Sequential Scan (Full Table Scan) dimulai...");
      let idx = 0;
      const leafNodes = nodes.filter((n) => n.level === 2);

      const seqInterval = setInterval(() => {
        if (idx < leafNodes.length) {
          const node = leafNodes[idx];
          const mesh = nodeMeshesRef.current.get(node.id);
          if (mesh) {
            (mesh.material as THREE.MeshStandardMaterial).color.setHex(0xef4444);
            mesh.scale.set(1.15, 1.15, 1.15);
            setTimeout(() => {
              (mesh.material as THREE.MeshStandardMaterial).color.setHex(0x22c55e);
              mesh.scale.set(1, 1, 1);
            }, 180);
          }
          setActiveStep(`Seq Scan: Memeriksa blok disk ${node.label} (${idx + 1}/8)...`);
          idx++;
        } else {
          clearInterval(seqInterval);
          setIsTraversing(false);
          setActiveStep(`Seq Scan Selesai: 10,000 row dipindai penuh! Bottleneck terdeteksi.`);
          setMetrics({
            time: "48.20 ms (350x Lebih Lambat)",
            buffers: "1,250 Shared Blocks (10 MB)",
            algorithm: "Seq Scan on product_inventory (Filter: id = " + targetKey + ")",
            status: "WARNING: I/O HEAVY",
          });
        }
      }, 220);
      return;
    }

    // B-Tree Index Traversal: 3-step O(log N) Precision Path
    const targetBranch = nodes.filter((n) => n.level === 1).find((b) => targetKey >= b.minKey && targetKey <= b.maxKey)!;
    const targetLeaf = nodes.filter((n) => n.level === 2).find((l) => targetKey >= l.minKey && targetKey <= l.maxKey)!;

    setActiveStep("Step 1/3: Ingress Root Node Page #0 [Evaluasi branch pointer]...");
    const rootMesh = nodeMeshesRef.current.get("root")!;
    (rootMesh.material as THREE.MeshStandardMaterial).color.setHex(0xffd700);

    setTimeout(() => {
      setActiveStep(`Step 2/3: Lolos ke Internal Node ${targetBranch.label}...`);
      const branchMesh = nodeMeshesRef.current.get(targetBranch.id)!;
      (branchMesh.material as THREE.MeshStandardMaterial).color.setHex(0xffd700);
      branchMesh.scale.set(1.2, 1.2, 1.2);

      setTimeout(() => {
        setActiveStep(`Step 3/3: Landing di Disk Page ${targetLeaf.label}. Row ditemukan!`);
        const leafMesh = nodeMeshesRef.current.get(targetLeaf.id)!;
        (leafMesh.material as THREE.MeshStandardMaterial).color.setHex(0xffd700);
        leafMesh.scale.set(1.25, 1.25, 1.25);

        setMetrics({
          time: "0.14 ms (Sub-Milidetik)",
          buffers: "3 Shared Hit Blocks (24 KB)",
          algorithm: `Index Scan using idx_inventory_sku (id = ${targetKey})`,
          status: "OPTIMIZED (O(log N))",
        });

        setTimeout(() => {
          // Restore node colors
          nodes.forEach((n) => {
            const m = nodeMeshesRef.current.get(n.id);
            if (m) {
              (m.material as THREE.MeshStandardMaterial).color.setHex(
                n.level === 0 ? 0xc9a96e : n.level === 2 ? 0x22c55e : 0x38bdf8
              );
              m.scale.set(1, 1, 1);
            }
          });
          setIsTraversing(false);
        }, 1800);
      }, 550);
    }, 450);
  };

  return (
    <div className="w-full rounded-2xl border border-[#C9A96E]/30 bg-gradient-to-b from-[#12100E] via-[#090807] to-[#0A0A0A] p-6 sm:p-8 shadow-2xl relative overflow-hidden font-mono">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-5 border-b border-white/5 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-[#C9A96E]" />
            <span className="text-[10px] uppercase tracking-widest text-[#C9A96E] font-bold">
              POSTGRESQL B-TREE 3D STORAGE ENGINE
            </span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#E8DCC8] tracking-tight mt-1">
            Visualisasi Traversal Indeks Basis Data (O(log N))
          </h3>
          <p className="font-sans text-xs text-[#8A8078] mt-0.5">
            Demonstrasi cara PostgreSQL menavigasi jutaan baris inventori StokKita dalam 3 hop buffer tanpa full table scan.
          </p>
        </div>

        {/* Algorithm Switcher */}
        <div className="flex items-center gap-2 bg-black/60 p-1 rounded-xl border border-white/10 text-xs">
          <button
            onClick={() => {
              playClick();
              setScanMode("btree");
            }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              scanMode === "btree"
                ? "bg-[#C9A96E] text-black font-bold shadow-md"
                : "text-[#8A8078] hover:text-[#E8DCC8]"
            }`}
          >
            B-TREE SCAN (O(log N))
          </button>
          <button
            onClick={() => {
              playClick();
              setScanMode("seqscan");
            }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              scanMode === "seqscan"
                ? "bg-red-500/80 text-white font-bold shadow-md"
                : "text-[#8A8078] hover:text-[#E8DCC8]"
            }`}
          >
            SEQ SCAN (O(N))
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Viewport */}
      <div className="relative my-4 rounded-xl border border-white/5 bg-black/80 overflow-hidden">
        <div ref={containerRef} className="w-full h-[380px]" />

        {/* Dynamic Traversal Log Overlay */}
        <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-black/80 border border-white/10 backdrop-blur-md text-[10px] text-[#C9A96E] flex items-center gap-2">
          <span className="text-[#C9A96E] text-xs">⌖</span>
          <span>{activeStep}</span>
        </div>

        {/* Level Legend */}
        <div className="absolute bottom-3 right-3 flex items-center gap-3 px-3 py-1.5 rounded-lg bg-black/80 border border-white/10 backdrop-blur-md text-[9px]">
          <span className="flex items-center gap-1 text-[#C9A96E]">
            <span className="w-2 h-2 rounded-xs bg-[#C9A96E]" /> Root (Level 0)
          </span>
          <span className="flex items-center gap-1 text-[#38BDF8]">
            <span className="w-2 h-2 rounded-xs bg-[#38BDF8]" /> Branch (Level 1)
          </span>
          <span className="flex items-center gap-1 text-[#22C55E]">
            <span className="w-2 h-2 rounded-xs bg-[#22C55E]" /> Leaf Disk Pages
          </span>
        </div>
      </div>

      {/* Interactive Controls & Key Picker */}
      <div className="py-4 border-b border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[#8A8078]">CARI PRODUCT_ID:</span>
          <div className="flex items-center gap-1">
            {[104, 428, 715, 930].map((k) => (
              <button
                key={k}
                onClick={() => {
                  playHoverTick();
                  setSearchKey(k);
                }}
                className={`px-2.5 py-1 rounded-lg border transition-all ${
                  searchKey === k
                    ? "border-[#C9A96E] bg-[#C9A96E]/20 text-[#C9A96E] font-bold"
                    : "border-white/5 bg-white/[0.02] text-[#8A8078] hover:text-[#E8DCC8]"
                }`}
              >
                SKU #{k}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input & Action Button */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            max="999"
            value={searchKey}
            onChange={(e) => setSearchKey(Number(e.target.value))}
            className="w-20 px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/10 text-[#E8DCC8] text-xs focus:outline-none focus:border-[#C9A96E]"
          />
          <button
            onClick={runTraversal}
            disabled={isTraversing}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
              scanMode === "btree"
                ? "bg-[#C9A96E] text-black hover:bg-[#E8DCC8]"
                : "bg-red-500 text-white hover:bg-red-400"
            } disabled:opacity-50`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isTraversing ? "MENELUSURI..." : "EKSEKUSI QUERY"}</span>
          </button>
        </div>
      </div>

      {/* EXPLAIN ANALYZE Real-Time Metrics Output */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-black/60 border border-white/5">
          <span className="text-[9px] uppercase tracking-wider text-[#8A8078] block">EXECUTION TIME</span>
          <span className="font-serif text-xl font-bold text-[#C9A96E]">{metrics.time}</span>
        </div>
        <div className="p-3 rounded-xl bg-black/60 border border-white/5">
          <span className="text-[9px] uppercase tracking-wider text-[#8A8078] block">BUFFER CACHE ACCESSED</span>
          <span className="font-serif text-xl font-bold text-[#22C55E]">{metrics.buffers}</span>
        </div>
        <div className="p-3 rounded-xl bg-black/60 border border-white/5">
          <span className="text-[9px] uppercase tracking-wider text-[#8A8078] block">PLANNER ALGORITHM</span>
          <span className="text-[10px] text-[#A89F91] block truncate">{metrics.algorithm}</span>
        </div>
      </div>
    </div>
  );
}
