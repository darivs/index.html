"use client";

import { socialLinks } from "@/lib/links";

export default function Links() {
  return (
    <section id="links" className="py-24 relative section-shell">
      <div className="w-[min(1200px,90vw)] mx-auto relative z-[1]">
        <span className="section-title">Links</span>
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              className="link-btn"
              href={link.href}
              target="_blank"
              rel="noopener"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
