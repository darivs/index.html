"use client";

import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  return (
    <header className="relative min-h-screen grid place-items-center overflow-hidden">
      <nav className="absolute top-6 right-6 z-[3] hidden gap-3 max-md:flex max-md:left-1/2 max-md:-translate-x-1/2 max-md:top-4">
        {[
          { href: "#musik", label: "Musik" },
          { href: "#video", label: "Video" },
          { href: "#links", label: "Links" },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="px-3 py-1 text-sm font-semibold uppercase bg-fg text-bg border-2 border-bg shadow-[4px_4px_0_var(--color-accent-2)] hover:translate-y-[-2px] transition-transform"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="absolute inset-0 z-[1] pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
          <HeroScene />
        </Canvas>
      </div>
      <div className="relative z-[2] text-center p-8 pointer-events-none select-none mix-blend-difference">
        <h1
          className="leading-[0.8]"
          style={{ fontSize: "clamp(3rem, 13vw, 12rem)" }}
        >
          drizz
        </h1>
        <div
          className="mt-6 inline-block bg-fg text-bg px-4 py-3 -rotate-2"
          style={{
            fontSize: "clamp(1rem, 2.6vw, 1.6rem)",
            boxShadow: "6px 6px 0 var(--color-accent)",
          }}
        >
          ouder.space
        </div>
      </div>
    </header>
  );
}
