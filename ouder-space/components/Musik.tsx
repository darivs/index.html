"use client";

import Visualizer from "./Visualizer";

export default function Musik() {
  return (
    <section id="musik" className="py-24 relative section-shell">
      <div className="w-[min(1200px,90vw)] mx-auto relative z-[1]">
        <span className="section-title">Musik</span>
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
          <div className="card">
            <h3 className="mb-3">Spotify</h3>
            <iframe
              src="https://open.spotify.com/embed/artist/7glFOI0MVEjpFq3jHS3QuR?utm_source=generator&theme=0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              className="w-full border-none min-h-[180px]"
              loading="lazy"
            />
          </div>
          <div className="card">
            <h3 className="mb-3">SoundCloud</h3>
            <iframe
              scrolling="no"
              src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/bauchtasche&color=%23ff5500&inverse=false&auto_play=false&show_user=true"
              className="w-full border-none min-h-[180px]"
              loading="lazy"
            />
          </div>
          <div className="card">
            <h3 className="mb-3">Ambient Visualizer</h3>
            <Visualizer />
          </div>
        </div>
      </div>
    </section>
  );
}
