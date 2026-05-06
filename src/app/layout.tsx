import type { Metadata, Viewport } from "next";
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";

export const metadata: Metadata = {
  title: "Trip Helper · Семейная поездка 2026",
  description:
    "Помощник по семейному путешествию Будапешт → Париж → Биллунн → Амстердам с интерактивной картой и AI-советами.",
  manifest: "/manifest.webmanifest",
  applicationName: "Trip Helper",
  appleWebApp: { capable: true, title: "Trip Helper", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFF8F1" },
    { media: "(prefers-color-scheme: dark)", color: "#14110F" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@500;600;700&family=Google+Sans+Text:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
