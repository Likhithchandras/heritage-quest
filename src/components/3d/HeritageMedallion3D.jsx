import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, RefreshCw, Eye } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

export default function HeritageMedallion3D({ imageSrc = '/assets/heritage_medallion.jpg' }) {
  const mountRef = useRef(null);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.8;

    // WebGL Renderer with antialias and alpha
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const coinTexture = textureLoader.load(imageSrc, () => {
      renderer.render(scene, camera);
    });
    coinTexture.colorSpace = THREE.SRGBColorSpace;

    // Materials
    const goldSideMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.25,
      bumpScale: 0.05
    });

    const goldFaceMaterial = new THREE.MeshStandardMaterial({
      map: coinTexture,
      metalness: 0.75,
      roughness: 0.3,
    });

    // Cylinder Geometry with 3 groups of materials: [sides, top_face, bottom_face]
    const geometry = new THREE.CylinderGeometry(1.6, 1.6, 0.18, 64);
    const materials = [goldSideMaterial, goldFaceMaterial, goldFaceMaterial];
    const coinMesh = new THREE.Mesh(geometry, materials);
    coinMesh.rotation.x = Math.PI / 2; // Face front
    coinMesh.castShadow = true;
    coinMesh.receiveShadow = true;

    // Parent group for smooth rotation
    const coinGroup = new THREE.Group();
    coinGroup.add(coinMesh);
    scene.add(coinGroup);

    // Sparkle particles ring around the coin
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 45;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 2.0 + Math.random() * 0.5;
      posArray[i] = Math.cos(angle) * radius;
      posArray[i + 1] = Math.sin(angle) * radius;
      posArray[i + 2] = (Math.random() - 0.5) * 0.6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.06,
      color: 0xfde047,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfffaed, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff0c2, 3.5);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0xf59e0b, 2.5, 10);
    fillLight.position.set(-4, -2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffffff, 2.0, 8);
    rimLight.position.set(0, 4, -3);
    scene.add(rimLight);

    // Drag Interaction State
    let isUserDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0.2;
    let targetRotationY = 0;
    let autoSpinSpeed = 0.008;

    const onPointerDown = (e) => {
      isUserDragging = true;
      setIsDragging(true);
      previousMousePosition = {
        x: e.clientX || (e.touches && e.touches[0].clientX) || 0,
        y: e.clientY || (e.touches && e.touches[0].clientY) || 0,
      };
    };

    const onPointerMove = (e) => {
      if (!isUserDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      targetRotationY += deltaX * 0.012;
      targetRotationX += deltaY * 0.012;

      // Limit pitch to prevent upside down flip
      targetRotationX = Math.max(-1.2, Math.min(1.2, targetRotationX));

      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isUserDragging = false;
      setIsDragging(false);
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onPointerDown);
    dom.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    dom.addEventListener('touchstart', onPointerDown, { passive: true });
    dom.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Auto rotation when not dragging
      if (isAutoRotate && !isUserDragging) {
        targetRotationY += autoSpinSpeed;
      }

      // Smooth damping interpolation (Lerp)
      coinGroup.rotation.y += (targetRotationY - coinGroup.rotation.y) * 0.1;
      coinGroup.rotation.x += (targetRotationX - coinGroup.rotation.x) * 0.1;

      // Gentle floating bob
      coinGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08;

      // Rotate sparkles
      particles.rotation.z = elapsedTime * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || 320;
      const newHeight = container.clientHeight || 320;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchend', onPointerUp);
      dom.removeEventListener('mousedown', onPointerDown);
      dom.removeEventListener('mousemove', onPointerMove);
      dom.removeEventListener('touchstart', onPointerDown);
      dom.removeEventListener('touchmove', onPointerMove);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      goldSideMaterial.dispose();
      goldFaceMaterial.dispose();
      renderer.dispose();
    };
  }, [imageSrc, isAutoRotate]);

  return (
    <div className="relative flex flex-col items-center justify-center select-none group">
      {/* 3D Canvas Container */}
      <div
        ref={mountRef}
        className={`w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 cursor-grab ${
          isDragging ? 'cursor-grabbing scale-105' : 'hover:scale-102'
        } transition-transform duration-200`}
        title="Click and drag to rotate the ancient golden seal in 3D"
      />

      {/* Floating 3D Badge Overlay */}
      <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-amber-950/80 backdrop-blur-md border border-amber-500/40 text-[11px] font-extrabold text-amber-300 flex items-center space-x-1 shadow-lg pointer-events-none">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
        <span>3D Golden Seal</span>
      </div>

      {/* Interactive Controls Bar */}
      <div className="mt-2 flex items-center space-x-2 bg-stone-950/70 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-amber-500/30 text-xs">
        <span className="text-[11px] text-stone-400 font-medium hidden sm:inline">
          🖐️ Drag to inspect 360°
        </span>
        <button
          type="button"
          onClick={() => {
            soundEffects.playClick();
            setIsAutoRotate(!isAutoRotate);
          }}
          className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all flex items-center space-x-1 ${
            isAutoRotate
              ? 'bg-amber-500 text-stone-950 shadow'
              : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
          }`}
        >
          <RotateCw className={`w-3 h-3 ${isAutoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
          <span>{isAutoRotate ? 'Auto Spin: ON' : 'Auto Spin: OFF'}</span>
        </button>
      </div>
    </div>
  );
}
