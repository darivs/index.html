"use client";

import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
const CursorEffect = dynamic(() => import("@/components/CursorEffect"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <CursorEffect />
      <Hero />
    </>
  );
}
