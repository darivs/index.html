"use client";
/* eslint-disable react-hooks/immutability */

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { socialLinks } from "@/lib/links";

function makeLogoTexture(label: string, color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#0a0a0f";
  ctx.fillRect(0, 0, 256, 256);

  // Outer ring
  ctx.strokeStyle = color;
  ctx.lineWidth = 18;
  ctx.beginPath();
  ctx.arc(128, 128, 95, 0, Math.PI * 2);
  ctx.stroke();

  // Inner glow
  const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 110);
  grad.addColorStop(0, `${color}44`);
  grad.addColorStop(1, "#00000000");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(128, 128, 110, 0, Math.PI * 2);
  ctx.fill();

  // Label text
  ctx.fillStyle = "#f8f6ef";
  ctx.font = "bold 64px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const short = label
    .replace(/[^A-Za-z0-9]/g, "")
    .slice(0, 2)
    .toUpperCase();
  ctx.fillText(short, 128, 134);

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

function TorusKnotMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const matRef = useRef<THREE.MeshStandardMaterial>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.3;
    meshRef.current.rotation.y = t * 0.42;
    matRef.current.color.setHSL((t * 0.05) % 1, 0.9, 0.6);
    matRef.current.emissiveIntensity = 0.4 + Math.sin(t) * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.2, 0.38, 200, 32]} />
      <meshStandardMaterial
        ref={matRef}
        color="#39ff14"
        metalness={0.2}
        roughness={0.3}
        emissive="#111111"
        wireframe
      />
    </mesh>
  );
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const count = 1200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const seeded = (n: number) => {
      const x = Math.sin(n * 321.123) * 9876.543;
      return x - Math.floor(x);
    };
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (seeded(i) - 0.5) * 16;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.color.setHSL((t * 0.08) % 1, 1, 0.6);
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        color="#ff4dd8"
        size={0.03}
        sizeAttenuation
        transparent={false}
      />
    </Points>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useFrame(({ pointer }) => {
    target.current.x = pointer.x * 1.2;
    target.current.y = pointer.y * 1.2;
    camera.position.x += (target.current.x - camera.position.x) * 0.04;
    camera.position.y += (target.current.y - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function PlanetSwarm() {
  const groupRef = useRef<THREE.Group>(null!);
  const ringGroupRefs = useRef<(THREE.Group | null)[]>(
    new Array(socialLinks.length).fill(null),
  );
  const [hovered, setHovered] = useState<number | null>(null);
  const [isPortrait, setIsPortrait] = useState(false);
  const pausedOffset = useRef<number[]>(new Array(socialLinks.length).fill(0));
  const pauseStartedAt = useRef<(number | null)[]>(
    new Array(socialLinks.length).fill(null),
  );
  const lastAngles = useRef<number[]>(new Array(socialLinks.length).fill(0));
  const lastTimes = useRef<number[]>(new Array(socialLinks.length).fill(0));
  const screenPos = useMemo(() => new THREE.Vector3(), []);
  const { camera, size } = useThree();

  useEffect(() => {
    const media = window.matchMedia("(orientation: portrait)");
    const update = () => {
      // treat narrow screens as portrait even if orientation API fails
      setIsPortrait(media.matches || window.innerWidth <= 768);
    };

    update();
    media.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const loader = useMemo(() => new THREE.TextureLoader(), []);

  const logoTextures = useMemo(() => {
    const urls: Record<string, string> = {
      Spotify:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/3840px-Spotify_icon.svg.png",
      SoundCloud:
        "https://images.vexels.com/media/users/3/137412/isolated/svg/1802b9d8ce3c819eebe90a86bbb61077.svg",
      YouTube:
        "https://upload.wikimedia.org/wikipedia/commons/a/a0/YouTube_social_red_circle_%282017%29.svg",
      Instagram:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Instagram-Logo-Round-Color.png/500px-Instagram-Logo-Round-Color.png",
      GitHub: "/github.svg",
    };

    loader.setCrossOrigin("anonymous");
    return socialLinks.map((link) => {
      const url = urls[link.label];
      if (url) {
        return loader.load(url);
      }
      return makeLogoTexture(link.label, link.color);
    });
  }, [loader]);

  const planets = useMemo(() => {
    const seeded = (n: number) => {
      const x = Math.sin(n * 9993.17) * 43758.5453;
      return x - Math.floor(x);
    };

    return socialLinks.map((link, idx) => {
      const baseAngle = (idx / socialLinks.length) * Math.PI * 2;
      const radius = 3.8 + seeded(idx) * 0.7;
      const speed = 0.18 + idx * 0.045; // back to steady orbit
      const bobAmp = 0.2;
      const bobSpeed = 0.9;
      const radialJitterAmp = 0.04;
      const radialJitterSpeed = 0.7;
      const spinPhase = seeded(idx + 120) * Math.PI * 2;
      const spinYSpeed = 0.9 + seeded(idx + 200) * 1.1;
      const spinXSpeed = 0.8 + seeded(idx + 300) * 1.0;
      const spinXAmplitude = 0.18 + seeded(idx + 400) * 0.2;
      const ringBaseTilt = Math.PI / 2.8 + (seeded(idx + 500) - 0.5) * 0.45;
      const ringSpinSpeed = 0.7 + seeded(idx + 600) * 1.8;
      const ringWobbleSpeed = 0.6 + seeded(idx + 700) * 1.4;
      const ringWobbleAmp = 0.04 + seeded(idx + 800) * 0.16;
      const ringPhase = seeded(idx + 900) * Math.PI * 2;
      return {
        link,
        baseAngle,
        radius,
        speed,
        bobAmp,
        bobSpeed,
        radialJitterAmp,
        radialJitterSpeed,
        spinPhase,
        spinYSpeed,
        spinXSpeed,
        spinXAmplitude,
        ringBaseTilt,
        ringSpinSpeed,
        ringWobbleSpeed,
        ringWobbleAmp,
        ringPhase,
      };
    });
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const group = groupRef.current;
    if (!group) return;

    const screenPositions: { label: string; x: number; y: number }[] = [];

    planets.forEach((planet, idx) => {
      const orbitRadius = isPortrait ? planet.radius * 0.55 : planet.radius;

      const mesh = group.children[idx] as THREE.Mesh;
      const scale = isPortrait ? 0.5 : 1;
      mesh.renderOrder = hovered === idx ? 999 : idx;
      mesh.traverse((child) => {
        child.renderOrder = hovered === idx ? 999 : idx;
        if ((child as THREE.Mesh).material && !(child as any).isSprite) {
          const mat = (child as THREE.Mesh).material as THREE.Material;
          mat.depthTest = hovered === idx ? false : true;
          mat.depthWrite = hovered === idx ? false : true;
        }
      });

      if (hovered === idx) {
        // freeze orbit while hovered
        if (pauseStartedAt.current[idx] === null) {
          pauseStartedAt.current[idx] = t;
        }
        const frozenTime = lastTimes.current[idx];
        const angle = lastAngles.current[idx];
        const jitter =
          1 +
          planet.radialJitterAmp *
            Math.sin(frozenTime * planet.radialJitterSpeed + idx);
        const wiggle = Math.sin(frozenTime * 0.6 + idx) * 0.18;
        const x = isPortrait
          ? wiggle
          : Math.cos(angle) * orbitRadius * jitter + wiggle;
        const y = isPortrait
          ? Math.cos(angle) * orbitRadius * jitter + wiggle
          : Math.sin(frozenTime * planet.bobSpeed + idx) * planet.bobAmp;
        const z = isPortrait
          ? Math.sin(angle) * orbitRadius * jitter
          : Math.sin(angle) * orbitRadius * jitter;

        mesh.position.set(x, y, z);
        mesh.rotation.y = t * planet.spinYSpeed + planet.spinPhase;
        mesh.rotation.x =
          Math.sin(t * planet.spinXSpeed + planet.spinPhase) *
          planet.spinXAmplitude;
        const ringGroup = ringGroupRefs.current[idx];
        if (ringGroup) {
          ringGroup.rotation.x =
            planet.ringBaseTilt +
            Math.sin(t * planet.ringWobbleSpeed + planet.ringPhase) *
              planet.ringWobbleAmp;
          ringGroup.rotation.z = t * planet.ringSpinSpeed + planet.ringPhase;
        }
        mesh.scale.setScalar(1.2 * scale);
        screenPos.set(x, y, z).project(camera);
        screenPositions.push({
          label: planet.link.label,
          x: (screenPos.x * 0.5 + 0.5) * size.width,
          y: (-screenPos.y * 0.5 + 0.5) * size.height,
        });
        return;
      }

      // resume orbit smoothly from last frozen angle
      if (pauseStartedAt.current[idx] !== null) {
        pausedOffset.current[idx] += t - pauseStartedAt.current[idx]!;
        pauseStartedAt.current[idx] = null;
      }
      const effectiveTime = t - pausedOffset.current[idx];
      const angle = planet.baseAngle + effectiveTime * planet.speed;
      const jitter =
        1 +
        planet.radialJitterAmp *
          Math.sin(effectiveTime * planet.radialJitterSpeed + idx);
      const wiggle = Math.sin(effectiveTime * 0.6 + idx) * 0.18;

      const x = isPortrait
        ? wiggle
        : Math.cos(angle) * orbitRadius * jitter + wiggle;
      const y = isPortrait
        ? Math.cos(angle) * orbitRadius * jitter + wiggle
        : Math.sin(effectiveTime * planet.bobSpeed + idx) * planet.bobAmp;
      const z = isPortrait
        ? Math.sin(angle) * orbitRadius * jitter
        : Math.sin(angle) * orbitRadius * jitter;

      mesh.position.set(x, y, z);
      mesh.rotation.y = t * planet.spinYSpeed + planet.spinPhase;
      mesh.rotation.x =
        Math.sin(t * planet.spinXSpeed + planet.spinPhase) *
        planet.spinXAmplitude;
      const ringGroup = ringGroupRefs.current[idx];
      if (ringGroup) {
        ringGroup.rotation.x =
          planet.ringBaseTilt +
          Math.sin(t * planet.ringWobbleSpeed + planet.ringPhase) *
            planet.ringWobbleAmp;
        ringGroup.rotation.z = t * planet.ringSpinSpeed + planet.ringPhase;
      }
      mesh.scale.setScalar(hovered === idx ? 1.2 * scale : 1 * scale);
      lastAngles.current[idx] = angle;
      lastTimes.current[idx] = effectiveTime;
      screenPos.set(x, y, z).project(camera);
      screenPositions.push({
        label: planet.link.label,
        x: (screenPos.x * 0.5 + 0.5) * size.width,
        y: (-screenPos.y * 0.5 + 0.5) * size.height,
      });
    });

    window.dispatchEvent(
      new CustomEvent("planetScreenPositions", { detail: screenPositions }),
    );
  });

  return (
    <group ref={groupRef}>
      {planets.map(({ link, ringBaseTilt }, idx) => (
        <mesh
          key={link.label}
          onClick={() => window.open(link.href, "_blank", "noreferrer")}
          onPointerOver={() => setHovered(idx)}
          onPointerOut={() => setHovered((h) => (h === idx ? null : h))}
          castShadow
        >
          <>
            {/* invisible hit target so clicks/hover still work */}
            <sphereGeometry args={[0.26, 16, 16]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />

            {/* 2D logo sprite, always facing camera */}
            {logoTextures[idx] && (
              <sprite scale={[0.6, 0.6, 0.6]}>
                <spriteMaterial
                  map={logoTextures[idx] as THREE.Texture}
                  depthTest={false}
                  depthWrite={false}
                />
              </sprite>
            )}

            {/* halo for glow */}
            <mesh scale={0.9}>
              <sphereGeometry args={[0.26, 16, 16]} />
              <meshBasicMaterial
                color={link.color}
                transparent
                opacity={0.14}
                depthWrite={false}
                side={THREE.BackSide}
              />
            </mesh>
            <group
              ref={(el) => {
                ringGroupRefs.current[idx] = el;
              }}
              rotation={[ringBaseTilt, 0, 0]}
            >
              <mesh scale={1.8}>
                <ringGeometry args={[0.26, 0.32, 48]} />
                <meshBasicMaterial
                  color={link.color}
                  transparent
                  opacity={0.42}
                  side={THREE.DoubleSide}
                />
              </mesh>
              {hovered === idx && (
                <mesh scale={2.1}>
                  <ringGeometry args={[0.32, 0.34, 64]} />
                  <meshBasicMaterial
                    color="#f8f6ef"
                    transparent
                    opacity={0.12}
                    side={THREE.DoubleSide}
                  />
                </mesh>
              )}
            </group>
          </>
        </mesh>
      ))}
    </group>
  );
}

export default function HeroScene() {
  return (
    <>
      <color attach="background" args={["#050507"]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 4, 4]} color="#ff00ff" intensity={1.6} />
      <TorusKnotMesh />
      <PlanetSwarm />
      <ParticleField />
      <CameraRig />
    </>
  );
}
