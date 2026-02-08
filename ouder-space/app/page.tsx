"use client";

import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
import Musik from "@/components/Musik";
import Video from "@/components/Video";
import Links from "@/components/Links";
const CursorEffect = dynamic(() => import("@/components/CursorEffect"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <CursorEffect />
      <Hero />
      <Musik />
      <Video />
      <Links />
    </>
  );
}
