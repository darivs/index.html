# index.html — landing page für drys

https://ouder.space

## Kontext

Darius (Musiker "drys") hat die Domain **ouder.space**, die aktuell auf Linktree weiterleitet. Ziel ist eine eigene, krasse künstlerische One-Pager Landing Page, die alle Plattformen zusammenführt und sofort flasht. Brutalistisch, chaotisch, experimentell — mit generativen Visuals, 3D-Effekten und vollem Animations-Stack.

## Entscheidungen aus Interview

| Thema          | Entscheidung                                                    |
| -------------- | --------------------------------------------------------------- |
| Tech Stack     | Next.js, (React), pnpm                                          |
| Stil           | Brutalistisch: raw, chaotisch, experimentell-frei               |
| Animationen    | Alles: Scroll-basiert + Cursor-interaktiv + Ambient             |
| Audio          | Eingebettete Spotify/SC-Player + dekorativer Ambient-Visualizer |
| Seitenstruktur | One-Pager mit Sektionen                                         |
| Assets         | Komplett generativ/programmatisch (Canvas, WebGL, SVG)          |
| Anim-Libraries | GSAP + Three.js (React Three Fiber)                             |
| Farben         | Bunt & wild + dunkle Neon-Akzente                               |
| Mobile         | Gleichwertig wichtig (responsive)                               |
| Performance    | Wow zuerst, Fallbacks zweitrangig                               |
| Sprache        | Nur Deutsch                                                     |
| Hosting        | Docker auf eigenem Server                                       |
| Deployment     | Next.js Static Export oder Node.js in Docker                    |

## Sektionen des One-Pagers

1. **Hero** — Fullscreen 3D-Scene (R3F), riesige Typografie "DRYS", generative Partikel/Shapes, chaotisches Layout, Cursor-reaktive Elemente
2. **Musik** — Spotify & SoundCloud Embeds, dekorativer Ambient-Visualizer (Fake-Frequenzbänder/Wellen als Canvas/WebGL-Animation), Release-Artworks generativ
3. **Video** — YouTube Embeds aus den Playlists (https://www.youtube.com/@hidarious/playlists), brutalistisches Grid/Overlap-Layout
4. **Links** — Social Links (Spotify, SoundCloud, YouTube, Instagram), bold Buttons/Typografie, chaotische Positionierung

## Technische Architektur

### Projektstruktur

```
ouder-space/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root Layout, Fonts, Meta
│   ├── page.tsx            # One-Pager Hauptseite
│   └── globals.css         # Globale Styles
├── components/
│   ├── Hero.tsx            # Hero Section mit R3F Canvas
│   ├── HeroScene.tsx       # Three.js 3D Scene (Partikel, Geometrien)
│   ├── Musik.tsx           # Musik-Sektion mit Embeds
│   ├── Visualizer.tsx      # Dekorativer Ambient-Visualizer (Canvas)
│   ├── Video.tsx           # Video-Sektion mit YT Embeds
│   ├── Links.tsx           # Social Links Sektion
│   ├── CursorEffect.tsx    # Custom Cursor / Cursor-Trail
│   └── ScrollAnimations.tsx # GSAP ScrollTrigger Wrapper
├── lib/
│   └── animations.ts       # GSAP Animation Utilities
├── public/
│   └── fonts/              # Custom Fonts
├── Dockerfile
├── docker-compose.yml
├── next.config.js
├── tailwind.config.ts
└── package.json
```

### Dependencies

- `next` — Framework
- `react`, `react-dom`
- `@react-three/fiber` + `@react-three/drei` — 3D WebGL
- `gsap` (mit ScrollTrigger Plugin) — Animationen
- `tailwindcss` — Styling-Basis (brutalistisch überschrieben)

### Hero Section (Three.js / R3F)

- Fullscreen `<Canvas>` mit generativer 3D-Szene
- Geometrische Shapes (Torus, Icosahedron etc.) die morphen und rotieren
- Partikel-System als Hintergrund
- Riesiger "DRYS" Text (3D oder HTML-Overlay mit mix-blend-mode)
- Cursor-Position beeinflusst Kamera/Objekte (onPointerMove)
- Kräftige, wechselnde Farben

### Scroll-Animationen (GSAP)

- ScrollTrigger für jede Sektion
- Elemente fliegen rein, skalieren, rotieren beim Scrollen
- Parallax-Ebenen mit verschiedenen Scroll-Geschwindigkeiten
- Pinning für besondere Sektionen

### Cursor-Effekte

- Custom Cursor der die Standard-Maus ersetzt
- Cursor-Trail mit Farbverlauf
- Hover-States auf interaktiven Elementen (Vergrößerung, Farbwechsel)

### Dekorativer Visualizer

- Canvas 2D oder WebGL Shader
- Animierte Frequenzbalken / Wellen die sich organisch bewegen
- Reagiert NICHT auf echtes Audio — rein visuell mit Perlin Noise / Sine-Waves
- Farblich an die Seiten-Palette angepasst

### Brutalistisches Design

- **Typografie**: Riesig, overlapping, mixed fonts (Mono + Display), broken baseline
- **Layout**: Bewusst gebrochenes Grid, Elemente überlappen, unerwartete Positionierungen
- **Farben**: Bunt & wild — clashing Farben, Neon-Akzente auf dunklem Grund
- **Borders/Shapes**: Dicke Outlines, harte Kanten, kein border-radius
- **Anti-Patterns**: Rotierte Texte, ungleiche Abstände, raw HTML-Ästhetik

### Mobile Responsiveness

- Alle Sektionen responsive
- 3D-Scene mit reduzierter Komplexität auf Mobile (weniger Partikel, kleinere Geometrien)
- Touch-Events statt Cursor-Effekte auf Mobile
- Embeds (Spotify, YouTube) responsive eingebettet

### Docker Deployment

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN pnpm ci
COPY . .
RUN pnpm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

## Implementierungs-Reihenfolge

1. **Next.js Projekt aufsetzen** — Create app, installiere Dependencies, Tailwind Config, Docker Setup
2. **Globales Styling & Fonts** — Brutalistisches Base-Styling, Custom Fonts, CSS Variablen für Farbpalette
3. **Hero Section** — R3F Canvas, 3D Scene, "DRYS" Typografie, Cursor-Reaktivität
4. **Cursor-Effekte** — Custom Cursor Component, Trail-Effekt
5. **Scroll-Animationen Setup** — GSAP ScrollTrigger Registrierung, Basis-Wrapper
6. **Musik Section** — Spotify/SoundCloud Embeds, brutalistisches Layout
7. **Dekorativer Visualizer** — Canvas-basierte Fake-Audio-Visualisierung
8. **Video Section** — YouTube Embeds, chaotisches Grid
9. **Links Section** — Social Links, wilde Positionierung
10. **Mobile Optimierung** — Responsive Anpassungen, Touch-Events, Performance-Tuning
11. **Docker & Deployment** — Dockerfile finalisieren, docker-compose, testen

## Verifikation

- `pnpm run dev` — Lokale Entwicklung, alle Sektionen prüfen
- `pnpm run build` — Build muss fehlerfrei durchlaufen
- `docker build` + `docker run` — Container muss starten und auf Port 3000 erreichbar sein
- Browser-Test: Chrome, Firefox, Safari (Desktop + Mobile)
- Lighthouse Check für grobe Performance-Einschätzung (Wow > Performance, aber kein totaler Absturz)

## Offene Links / Embeds

- Spotify: https://open.spotify.com/intl-de/artist/7glFOI0MVEjpFq3jHS3QuR
- SoundCloud: soundcloud.com/bauchtasche
- YouTube: https://www.youtube.com/@hidarious
- Instagram: instagram.com/icqunummer
