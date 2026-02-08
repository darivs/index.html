"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CursorEffect() {
  const shipRef = useRef<HTMLDivElement>(null);
  const flameRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const smokePoolRef = useRef<HTMLDivElement[]>([]);
  const smokeIndexRef = useRef(0);
  const planetPositions = useRef<{ label: string; x: number; y: number }[]>([]);
  const lastAngle = useRef(0);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const ship = shipRef.current!;
    const trail = trailRef.current!;
    const flame = flameRef.current!;
    const smokePool = smokePoolRef.current;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };
    const vel = { x: 0, y: 0 };

    function onMove(e: PointerEvent) {
      target.x = e.clientX;
      target.y = e.clientY;
    }

    const onPlanetPositions = (e: Event) => {
      const detail = (e as CustomEvent).detail as
        | { label: string; x: number; y: number }[]
        | undefined;
      if (detail) planetPositions.current = detail;
    };

    const tick = () => {
      const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const dx = center.x - pos.x;
      const dy = center.y - pos.y;
      const dist = Math.hypot(dx, dy) || 1;
      // mild gravitational pull toward hero in center
      const pullStrength = Math.max(0, 1 - dist / 520) * 0.35;
      const gx = (dx / dist) * pullStrength * 18;
      const gy = (dy / dist) * pullStrength * 18;

      vel.x += (target.x - pos.x) * 0.24 + gx;
      vel.y += (target.y - pos.y) * 0.24 + gy;
      vel.x *= 0.62;
      vel.y *= 0.62;
      pos.x += vel.x;
      pos.y += vel.y;

      const angle = Math.atan2(vel.y, vel.x);
      const speed = Math.min(1, Math.hypot(vel.x, vel.y) / 28);

      // point toward nearest planet or center if closer
      let aimX = center.x;
      let aimY = center.y;
      let minDist = Math.hypot(center.x - pos.x, center.y - pos.y);
      planetPositions.current.forEach((p) => {
        const d = Math.hypot(p.x - pos.x, p.y - pos.y);
        if (d < minDist) {
          minDist = d;
          aimX = p.x;
          aimY = p.y;
        }
      });
      const targetAngle = Math.atan2(aimY - pos.y, aimX - pos.x);
      const smoothedAngle = lastAngle.current * 0.8 + targetAngle * 0.2;
      lastAngle.current = smoothedAngle;

      ship.style.transform = `translate(${pos.x - 18}px, ${pos.y - 14}px) rotate(${smoothedAngle}rad) scale(${
        0.86 + speed * 0.2
      })`;
      trail.style.transform = `translate(${pos.x - 6}px, ${pos.y - 6}px)`;
      flame.setAttribute(
        "d",
        `M1 8 C 6 ${10 + speed * 10}, 6 ${-4 - speed * 8}, 1 8`,
      );
      flame.style.opacity = `${0.7 + speed * 0.4}`;
      flame.style.filter = "drop-shadow(0 0 8px rgba(255,204,92,0.7))";

      // exhaust particles (fire/smoke) — brighter for dark scene
      const spawnCount = speed > 0.8 ? 3 : speed > 0.15 ? 2 : 0;
      for (let i = 0; i < spawnCount; i++) {
        const el = smokePool[smokeIndexRef.current];
        smokeIndexRef.current = (smokeIndexRef.current + 1) % smokePool.length;
        if (!el) continue;
        const jitterX = (Math.random() - 0.5) * 18;
        const jitterY = (Math.random() - 0.5) * 18;
        el.style.left = `${pos.x + jitterX}px`;
        el.style.top = `${pos.y + jitterY}px`;
        const hue = 320 + Math.random() * 40; // magenta-ish smoke
        const alpha = 0.35 + Math.random() * 0.25;
        el.style.background = `radial-gradient(circle at 40% 40%, rgba(255,255,255,0.9) 0%, rgba(255,204,92,0.8) 20%, rgba(255,77,216,0.65) 45%, rgba(${hue},80,120,0.35) 70%, rgba(0,0,0,0) 100%)`;
        gsap.killTweensOf(el);
        gsap.fromTo(
          el,
          { opacity: alpha, scale: 0.5 + Math.random() * 0.4 },
          {
            opacity: 0,
            scale: 1.9 + Math.random() * 0.7,
            duration: 0.9 + Math.random() * 0.25,
            ease: "power2.out",
          },
        );
      }
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("planetScreenPositions", onPlanetPositions);
    gsap.ticker.add(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("planetScreenPositions", onPlanetPositions);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <>
      <div
        ref={shipRef}
        className="fixed pointer-events-none z-[9999] mix-blend-screen drop-shadow-[0_0_10px_rgba(57,255,20,0.55)] max-md:hidden"
      >
        <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
          <path
            d="M2 14 L14 6 C15 5 21 5 22 6 L34 14 L22 22 C21 23 15 23 14 22 Z"
            fill="#0b1220"
            stroke="#39ff14"
            strokeWidth="1.8"
          />
          <path d="M12 12 L18 14 L12 16 Z" fill="#39ff14" />
          <path
            ref={flameRef}
            d="M1 8 C 6 10, 6 -4, 1 8"
            fill="#ff4dd8"
            opacity="0.8"
          />
        </svg>
      </div>
      <div
        ref={trailRef}
        className="fixed w-4 h-4 rounded-full pointer-events-none z-[9998] mix-blend-screen bg-[rgba(255,204,92,0.9)] shadow-[0_0_16px_rgba(255,204,92,0.7),0_0_24px_rgba(57,255,20,0.55)] blur-[4px] max-md:hidden"
      />
      <div className="fixed inset-0 pointer-events-none z-[9997] max-md:hidden">
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) smokePoolRef.current[i] = el;
            }}
            className="absolute w-8 h-8 rounded-full opacity-0 blur-[16px] mix-blend-screen"
          />
        ))}
      </div>
    </>
  );
}
