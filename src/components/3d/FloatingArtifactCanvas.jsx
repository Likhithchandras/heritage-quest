import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function FloatingArtifactCanvas({ type = 'gold_coin', className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 400;
    const height = mount.clientHeight || 400;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Group for object & particles
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Create 3D Artifact Mesh based on type
    let artifactMesh;

    if (type === 'gold_coin') {
      // Ancient Coin Geometry with bevel
      const geometry = new THREE.CylinderGeometry(1.4, 1.4, 0.18, 48);
      const material = new THREE.MeshStandardMaterial({
        color: 0xD4AF37,
        metalness: 0.85,
        roughness: 0.25,
      });
      artifactMesh = new THREE.Mesh(geometry, material);
      artifactMesh.rotation.x = Math.PI / 3.5;

      // Outer decorative rim
      const torusGeo = new THREE.TorusGeometry(1.42, 0.06, 16, 64);
      const torusMat = new THREE.MeshStandardMaterial({ color: 0xB8860B, metalness: 0.9, roughness: 0.2 });
      const rim = new THREE.Mesh(torusGeo, torusMat);
      rim.rotation.x = Math.PI / 2;
      artifactMesh.add(rim);

    } else if (type === 'temple_shikhara') {
      // Stepped Temple Finial Geometry
      const group = new THREE.Group();
      for (let i = 0; i < 5; i++) {
        const radius = 1.4 - i * 0.24;
        const tier = new THREE.Mesh(
          new THREE.BoxGeometry(radius * 1.5, 0.25, radius * 1.5),
          new THREE.MeshStandardMaterial({ color: 0xC86D51, roughness: 0.7, metalness: 0.1 })
        );
        tier.position.y = i * 0.3 - 0.6;
        group.add(tier);
      }
      const amalaka = new THREE.Mesh(
        new THREE.SphereGeometry(0.35, 24, 24),
        new THREE.MeshStandardMaterial({ color: 0xD4AF37, metalness: 0.8, roughness: 0.3 })
      );
      amalaka.position.y = 0.9;
      group.add(amalaka);
      artifactMesh = group;

    } else {
      // Sacred Panchaloha Vessel / Artifact
      const geometry = new THREE.DodecahedronGeometry(1.3, 1);
      const material = new THREE.MeshStandardMaterial({
        color: 0xC5A059,
        metalness: 0.75,
        roughness: 0.3,
        wireframe: false
      });
      artifactMesh = new THREE.Mesh(geometry, material);
    }

    mainGroup.add(artifactMesh);

    // Ambient floating golden dust particles
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 45;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 6;
      posArray[i + 1] = (Math.random() - 0.5) * 6;
      posArray[i + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xE5C16F,
      transparent: true,
      opacity: 0.6
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Warm Architectural Lighting
    const ambientLight = new THREE.AmbientLight(0xFFFBF0, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xFFD700, 2.5);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xC86D51, 2, 8);
    rimLight.position.set(-3, -2, -2);
    scene.add(rimLight);

    // Mouse Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / height) * 2 - 1);
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animation Loop
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth floating motion
      artifactMesh.position.y = Math.sin(elapsedTime * 1.2) * 0.12;

      // Base slow rotation
      artifactMesh.rotation.y += 0.008;

      // Mouse interactive tilt interpolation
      targetRotationY = mouseX * 0.6;
      targetRotationX = -mouseY * 0.4;
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;

      // Particle subtle swirl
      particleSystem.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mount) return;
      const newW = mount.clientWidth;
      const newH = mount.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [type]);

  return <div ref={mountRef} className={`w-full h-full relative cursor-grab active:cursor-grabbing ${className}`} />;
}
