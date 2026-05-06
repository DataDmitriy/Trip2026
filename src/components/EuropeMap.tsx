"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import type { City } from "@/lib/trip";

interface Props {
  cities: City[];
  activeId?: string | null;
  onCity: (c: City) => void;
  dark?: boolean;
}

const BOUNDS: [[number, number], [number, number]] = [
  [-1.5, 45.5], // sw
  [22, 57.5], // ne
];

export default function EuropeMap({ cities, activeId, onCity, dark }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      ref.current.innerHTML = `
        <div style="display:flex;height:100%;align-items:center;justify-content:center;padding:24px;text-align:center;color:var(--text-secondary);font-size:13px;line-height:1.5">
          Карта недоступна — добавьте <code style="font-family:monospace">NEXT_PUBLIC_MAPBOX_TOKEN</code> в .env.local
        </div>`;
      return;
    }
    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container: ref.current,
      style: dark ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v11",
      bounds: BOUNDS,
      fitBoundsOptions: { padding: 40 },
      attributionControl: false,
      cooperativeGestures: false,
    });
    map.on("load", () => {
      // dashed route line connecting cities in order
      const coords = cities.map(c => [c.lng, c.lat]);
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: { type: "LineString", coordinates: coords },
          properties: {},
        },
      });
      map.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        paint: {
          "line-color": "#C84F38",
          "line-width": 2,
          "line-dasharray": [2, 2],
          "line-opacity": 0.7,
        },
      });
    });
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [dark, cities]);

  // Pin markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    markersRef.current.forEach(m => m.remove());
    markersRef.current = cities.map((c, i) => {
      const el = document.createElement("button");
      el.style.cssText = `
        width:36px;height:36px;border-radius:50%;border:3px solid #fff;
        background:${c.color};color:#fff;font-weight:700;font-size:14px;
        cursor:pointer;display:flex;align-items:center;justify-content:center;
        box-shadow:0 4px 12px rgba(0,0,0,0.25);
        transform:scale(${activeId === c.id ? 1.15 : 1});transition:transform .15s;
      `;
      el.textContent = String(i + 1);
      el.setAttribute("aria-label", c.name);
      el.onclick = ev => {
        ev.stopPropagation();
        onCity(c);
      };
      return new mapboxgl.Marker({ element: el }).setLngLat([c.lng, c.lat]).addTo(map);
    });
  }, [cities, activeId, onCity]);

  return <div ref={ref} style={{ position: "absolute", inset: 0 }} />;
}
