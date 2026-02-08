import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "drys — ouder.space",
  description: "kink of rap. ouder.space",
  openGraph: {
    title: "drys — ouder.space",
    description: "kink of rap. ouder.space",
    type: "website",
    url: "https://ouder.space",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="has-custom-cursor">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
