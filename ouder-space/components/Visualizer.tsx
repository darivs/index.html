"use client";

import { useRef, useEffect } from "react";

export default function Visualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let t = 0;
    let raf: number;

    function resize() {
      canvas!.width = canvas!.clientWidth;
      canvas!.height = canvas!.clientHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function noiseWave(x: number, seed: number) {
      return (
        Math.sin(x * 0.02 + seed) +
        Math.sin(x * 0.013 + seed * 1.3) * 0.6
      );
    }

    function draw() {
      t += 0.03;
      const w = canvas!.width;
      const h = canvas!.height;
      ctx!.fillStyle = "#050505";
      ctx!.fillRect(0, 0, w, h);

      const bars = 120;
      for (let i = 0; i < bars; i++) {
        const x = (i / bars) * w;
        const barH = (noiseWave(i, t) + 2) * (h * 0.18);
        const y = h * 0.6 - barH / 2;
        const hue = (t * 40 + i * 3) % 360;
        ctx!.fillStyle = `hsl(${hue}, 90%, 60%)`;
        ctx!.fillRect(x, y, w / bars - 2, barH);
      }
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      className="relative h-[260px] overflow-hidden"
      style={{
        border: "3px solid var(--color-fg)",
        background:
          "radial-gradient(circle at 20% 20%, #111, #050505 60%)",
        boxShadow: "10px 10px 0 var(--color-accent-3)",
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
