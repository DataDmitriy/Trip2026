"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import type { City, Place, Stay } from "@/lib/trip";

interface Props {
  city: City;
  places: Place[];
  stay: Stay;
  focusId?: string | null;
  onPlace: (p: Place) => void;
  dark?: boolean;
}

export default function CityMap({ city, places, stay, focusId, onPlace, dark }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      ref.current.innerHTML = `<div style="display:flex;height:100%;align-items:center;justify-content:center;color:var(--text-secondary);font-size:13px">Нет Mapbox токена</div>`;
      return;
    }
    mapboxgl.accessToken = token;
    const center: [number, number] = [stay.lng ?? city.lng, stay.lat ?? city.lat];
    const map = new mapboxgl.Map({
      container: ref.current,
      style: dark ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v11",
      center,
      zoom: 12.5,
      attributionControl: false,
    });
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [city.id, dark]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    markersRef.current.forEach(m => m.remove());
    const fresh: mapboxgl.Marker[] = [];

    if (stay.lng != null && stay.lat != null) {
      const el = document.createElement("div");
      el.style.cssText = `
        width:34px;height:34px;border-radius:10px;background:#FFE9DF;border:2px solid #F06B50;
        display:flex;align-items:center;justify-content:center;font-size:18px;
        box-shadow:0 2px 8px rgba(0,0,0,0.15);
      `;
      el.textContent = "🏠";
      fresh.push(new mapboxgl.Marker({ element: el }).setLngLat([stay.lng, stay.lat]).addTo(map));
    }

    const colorMap: Record<string, string> = {
      wow: "#F06B50",
      kids: "#3B82F6",
      science: "#8B5CF6",
      food: "#10B981",
    };

    places.forEach(p => {
      if (p.lng == null || p.lat == null) return;
      const el = document.createElement("button");
      const isFocus = focusId === p.id;
      el.style.cssText = `
        width:38px;height:38px;border-radius:50%;background:${colorMap[p.tag] ?? "#737373"};
        border:3px solid ${isFocus ? "#1F1714" : "#fff"};color:#fff;cursor:pointer;
        display:flex;align-items:center;justify-content:center;font-size:18px;
        box-shadow:0 2px 8px rgba(0,0,0,0.2);transform:scale(${isFocus ? 1.15 : 1});
        transition:transform .15s;
      `;
      el.textContent = p.emoji;
      el.setAttribute("aria-label", p.name);
      el.onclick = ev => {
        ev.stopPropagation();
        onPlace(p);
      };
      fresh.push(new mapboxgl.Marker({ element: el }).setLngLat([p.lng, p.lat]).addTo(map));
    });

    markersRef.current = fresh;
  }, [places, focusId, stay.lng, stay.lat, onPlace]);

  return <div ref={ref} style={{ position: "absolute", inset: 0 }} />;
}
