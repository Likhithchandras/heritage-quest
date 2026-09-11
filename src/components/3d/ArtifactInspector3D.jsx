import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, ZoomIn, ZoomOut, Sparkles, CheckCircle } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';

export const ArtifactInspector3D = ({
  modelType = 'bronze_nataraja',
  hotspots = [],
  onHotspotClick,
  discoveredHotspots = [],
  className = '',
}) => {
  const mountRef = useRef(null);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [rotationSpeed, setRotationSpeed] = useState(0.005);
  const [isRotating, setIsRotating] = useState(true);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const meshGroupRef = useRef(null);
  const { playChime, playBell } = useAudio();

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    currentMount.innerHTML = '';
    currentMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.8);
    scene.add(ambientLight);

    const goldSpotLight = new THREE.SpotLight(0xc5a059, 4.5);
    goldSpotLight.position.set(5, 8, 5);
    goldSpotLight.angle = 0.6;
    goldSpotLight.penumbra = 0.5;
    scene.add(goldSpotLight);

    const terracottaLight = new THREE.PointLight(0xc86d51, 3.2, 20);
    terracottaLight.position.set(-6, -4, 4);
    scene.add(terracottaLight);

    const backRimLight = new THREE.DirectionalLight(0xe4d5b7, 2.0);
    backRimLight.position.set(0, 5, -5);
    scene.add(backRimLight);

    // Mesh Group
    const group = new THREE.Group();
    meshGroupRef.current = group;
    scene.add(group);

    // Materials
    const bronzeMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b5a2b,
      metalness: 0.85,
      roughness: 0.28,
      bumpScale: 0.05,
    });

    const goldTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      metalness: 0.92,
      roughness: 0.18,
    });

    const steatiteMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8cca3,
      roughness: 0.6,
      metalness: 0.1,
    });

    // Build artifact based on modelType
    if (modelType === 'bronze_nataraja') {
      // Pedestal
      const baseGeo = new THREE.CylinderGeometry(2.0, 2.3, 0.4, 32);
      const baseMesh = new THREE.Mesh(baseGeo, bronzeMaterial);
      baseMesh.position.y = -2.2;
      group.add(baseMesh);

      // Lotus ring base
      const lotusGeo = new THREE.TorusGeometry(1.9, 0.15, 16, 40);
      lotusGeo.rotateX(Math.PI / 2);
      const lotusMesh = new THREE.Mesh(lotusGeo, goldTrimMaterial);
      lotusMesh.position.y = -1.95;
      group.add(lotusMesh);

      // Torso & Core
      const torsoGeo = new THREE.CylinderGeometry(0.35, 0.45, 1.6, 20);
      const torso = new THREE.Mesh(torsoGeo, bronzeMaterial);
      torso.position.y = 0.2;
      group.add(torso);

      // Head
      const headGeo = new THREE.SphereGeometry(0.42, 24, 24);
      const head = new THREE.Mesh(headGeo, goldTrimMaterial);
      head.position.y = 1.35;
      group.add(head);

      // Crown / Jata-mukuta
      const crownGeo = new THREE.ConeGeometry(0.32, 0.85, 20);
      const crown = new THREE.Mesh(crownGeo, goldTrimMaterial);
      crown.position.y = 1.9;
      group.add(crown);

      // Cosmic Aureole (Prabha-mandala flame ring)
      const ringGeo = new THREE.TorusGeometry(2.4, 0.08, 16, 64);
      const ring = new THREE.Mesh(ringGeo, goldTrimMaterial);
      ring.position.y = 0.2;
      group.add(ring);

      // Four Arms
      const armGeo = new THREE.CylinderGeometry(0.1, 0.12, 1.4, 12);
      
      // Upper Right (Damaru Drum)
      const armUR = new THREE.Mesh(armGeo, bronzeMaterial);
      armUR.position.set(0.85, 0.9, 0.1);
      armUR.rotation.z = -Math.PI / 3;
      group.add(armUR);

      const drumGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.35, 16);
      const drum = new THREE.Mesh(drumGeo, goldTrimMaterial);
      drum.position.set(1.4, 1.25, 0.2);
      group.add(drum);

      // Upper Left (Agni Flame)
      const armUL = new THREE.Mesh(armGeo, bronzeMaterial);
      armUL.position.set(-0.85, 0.9, 0.1);
      armUL.rotation.z = Math.PI / 3;
      group.add(armUL);

      const flameGeo = new THREE.ConeGeometry(0.2, 0.4, 16);
      const flame = new THREE.Mesh(flameGeo, goldTrimMaterial);
      flame.position.set(-1.4, 1.25, 0.2);
      group.add(flame);

      // Trampled Dwarf (Apasmara)
      const dwarfGeo = new THREE.BoxGeometry(1.2, 0.35, 0.6);
      const dwarf = new THREE.Mesh(dwarfGeo, bronzeMaterial);
      dwarf.position.set(0, -1.8, 0);
      group.add(dwarf);

    } else {
      // Default Steatite Seal or Stone Relic
      const tabletGeo = new THREE.BoxGeometry(3.0, 3.0, 0.4);
      const tablet = new THREE.Mesh(tabletGeo, steatiteMaterial);
      group.add(tablet);

      const sealBossGeo = new THREE.CylinderGeometry(0.6, 0.8, 0.4, 24);
      const sealBoss = new THREE.Mesh(sealBossGeo, bronzeMaterial);
      sealBoss.position.z = -0.35;
      sealBoss.rotation.x = Math.PI / 2;
      group.add(sealBoss);

      const unicornHump = new THREE.TorusGeometry(0.8, 0.15, 16, 32);
      const hump = new THREE.Mesh(unicornHump, goldTrimMaterial);
      hump.position.set(0, 0.2, 0.25);
      group.add(hump);
    }

    // Subtle floating animation loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (meshGroupRef.current) {
        if (isRotating) {
          meshGroupRef.current.rotation.y += rotationSpeed;
        }
        meshGroupRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Mouse Drag interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      setIsRotating(false);
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging || !meshGroupRef.current) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      meshGroupRef.current.rotation.y += deltaX * 0.008;
      meshGroupRef.current.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Resize handler
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElem.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.innerHTML = '';
      }
      renderer.dispose();
    };
  }, [modelType, isRotating, rotationSpeed]);

  const handleHotspotClick = (hs) => {
    setActiveHotspot(hs);
    playBell(750);
    if (onHotspotClick) {
      onHotspotClick(hs);
    }
  };

  return (
    <div className={`relative w-full h-[420px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#EADCC9]/30 to-[#FAF7F2] border border-[#C5A059]/30 select-none ${className}`}>
      
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Hotspots Overlay */}
      {hotspots.map((hs) => {
        const isDiscovered = discoveredHotspots.includes(hs.id);
        const isActive = activeHotspot?.id === hs.id;

        return (
          <div
            key={hs.id}
            style={{ top: `${hs.y}%`, left: `${hs.x}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <button
              onClick={() => handleHotspotClick(hs)}
              className={`relative group flex items-center justify-center w-8 h-8 rounded-full shadow-lg transition-all duration-300 focus:outline-none ${
                isDiscovered
                  ? 'bg-[#5E7A68] text-white ring-4 ring-[#5E7A68]/30'
                  : isActive
                  ? 'bg-[#C86D51] text-white ring-4 ring-[#C86D51]/40 scale-110'
                  : 'bg-[#C5A059] text-[#1C1917] hover:scale-110 ring-4 ring-[#C5A059]/30 animate-pulse'
              }`}
            >
              {isDiscovered ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}

              {/* Ping Ring for undiscovered */}
              {!isDiscovered && (
                <span className="absolute -inset-1 rounded-full bg-[#C5A059] opacity-40 animate-ping" />
              )}
            </button>
          </div>
        );
      })}

      {/* Active Hotspot Info Card */}
      {activeHotspot && (
        <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-30 bg-[#FFFDF9]/95 backdrop-blur-md border border-[#C5A059]/40 p-4 rounded-2xl shadow-xl transition-all">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#C86D51]">
              Micro-Detail Clue
            </span>
            <span className="text-xs font-semibold text-[#5E7A68]">
              {discoveredHotspots.includes(activeHotspot.id) ? 'Discovered ✓' : 'Click to inspect'}
            </span>
          </div>
          <h4 className="font-serif-title font-bold text-base text-[#1C1917] mb-1">
            {activeHotspot.title}
          </h4>
          <p className="text-xs text-[#57534E] leading-relaxed mb-2">
            {activeHotspot.clue}
          </p>
          <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#EADCC9] text-xs text-[#1C1917]">
            <span className="font-semibold text-[#C5A059]">Hint: </span>
            {activeHotspot.hint}
          </div>
        </div>
      )}

      {/* Control Buttons */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <button
          onClick={() => setIsRotating(!isRotating)}
          className={`p-2.5 rounded-full backdrop-blur-md border transition-all shadow-sm ${
            isRotating
              ? 'bg-[#C5A059] text-[#1C1917] border-[#C5A059]'
              : 'bg-white/80 text-[#57534E] border-[#C5A059]/30 hover:bg-white'
          }`}
          title={isRotating ? 'Pause auto-rotation' : 'Auto-rotate'}
        >
          <RotateCw className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom helper pill */}
      <div className="absolute top-4 left-4 z-20 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#C5A059]/20 text-[11px] font-medium text-[#57534E]">
        Drag to rotate in 360° • Click glowing hotspots
      </div>
    </div>
  );
};

export default ArtifactInspector3D;
