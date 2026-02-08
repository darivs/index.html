"use client";

const videos = [
  {
    title: "Playlists",
    src: "https://www.youtube.com/embed/videoseries?list=PLZUy7YsVL9XrOKIh0zb62LF8A3BnQUwps",
  },
  {
    title: "Clip Drop",
    src: "https://www.youtube.com/embed/0q6Yj8s-4Ng",
  },
  {
    title: "Live Cut",
    src: "https://www.youtube.com/embed/8O9C5Z4HHe0",
  },
];

export default function Video() {
  return (
    <section id="video" className="py-24 relative section-shell">
      <div className="w-[min(1200px,90vw)] mx-auto relative z-[1]">
        <span className="section-title">Video</span>
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
          {videos.map((v) => (
            <div key={v.title} className="card">
              <h3 className="mb-3">{v.title}</h3>
              <iframe
                src={v.src}
                allowFullScreen
                className="w-full border-none min-h-[180px]"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
