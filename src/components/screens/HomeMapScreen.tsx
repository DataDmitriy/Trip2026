"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Search, Filter, Navigation } from "lucide-react";
import { TRIP, type City } from "@/lib/trip";

const EuropeMap = dynamic(() => import("../EuropeMap"), { ssr: false });

interface Props {
  onCity: (c: City) => void;
  dark?: boolean;
}

export default function HomeMapScreen({ onCity, dark }: Props) {
  const [activeCity, setActiveCity] = useState<City | null>(null);
  const cities = TRIP.cities;
  // For demo: today is 12 May 2026 → Disneyland day
  const today = cities[1];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 12,
          right: 12,
          zIndex: 10,
          display: "flex",
          gap: 10,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 48,
            borderRadius: 24,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            gap: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <Search size={20} color="var(--text-secondary)" />
          <span style={{ flex: 1, fontSize: 15, color: "var(--text-secondary)" }}>Куда сейчас?</span>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "var(--coral-text)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            А
          </div>
        </div>
      </div>

      <div style={{ flex: 1, position: "relative" }}>
        <EuropeMap
          cities={cities}
          activeId={activeCity?.id ?? null}
          onCity={c => {
            setActiveCity(c);
            onCity(c);
          }}
          dark={dark}
        />

        <div style={{ position: "absolute", top: 70, right: 12, zIndex: 9 }}>
          <button
            onClick={() => onCity(today)}
            style={{
              background: "var(--coral-btn)",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              padding: "8px 14px",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              fontWeight: 600,
              boxShadow: "0 4px 16px rgba(240,107,80,0.4)",
            }}
          >
            📍 Сейчас: {today.name.split(" ")[0]}
          </button>
        </div>

        <div
          style={{
            position: "absolute",
            right: 14,
            bottom: 220,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            zIndex: 9,
          }}
        >
          <FAB><Filter size={20} /></FAB>
          <FAB><Navigation size={20} /></FAB>
        </div>
      </div>

      <div
        style={{
          flexShrink: 0,
          background: "var(--bg)",
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          boxShadow: "0 -2px 24px rgba(0,0,0,0.1)",
          padding: "8px 0 12px",
          zIndex: 5,
        }}
      >
        <div
          style={{
            width: 36,
            height: 4,
            background: "var(--border-strong)",
            borderRadius: 2,
            margin: "0 auto 12px",
          }}
        />
        <div
          style={{
            padding: "0 20px 8px",
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 600, fontFamily: '"Google Sans", sans-serif' }}>Этапы маршрута</div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>16 дней · 4 страны</div>
        </div>
        <div
          className="nsb"
          style={{ display: "flex", gap: 12, padding: "4px 20px", overflowX: "auto" }}
        >
          {cities.map((c, i) => {
            const isActive = activeCity?.id === c.id;
            const isToday = today.id === c.id;
            return (
              <div
                key={c.id}
                onClick={() => onCity(c)}
                style={{
                  flexShrink: 0,
                  width: 168,
                  background: isActive ? c.color : "var(--surface)",
                  color: isActive ? "#fff" : "var(--text)",
                  border: `1px solid ${isActive ? c.color : "var(--border)"}`,
                  borderTop: `3px solid ${c.color}`,
                  borderRadius: 16,
                  padding: 14,
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      opacity: 0.8,
                      letterSpacing: 0.4,
                      textTransform: "uppercase",
                    }}
                  >
                    Этап {i + 1}
                  </div>
                  {isToday && (
                    <div
                      style={{
                        background: "#fff",
                        color: c.color,
                        fontSize: 9,
                        fontWeight: 700,
                        padding: "2px 6px",
                        borderRadius: 4,
                      }}
                    >
                      СЕЙЧАС
                    </div>
                  )}
                </div>
                <div style={{ fontSize: 18, fontWeight: 600, fontFamily: '"Google Sans", sans-serif' }}>{c.name}</div>
                <div style={{ fontSize: 12, opacity: 0.85, marginTop: 2 }}>{c.country}</div>
                <div className="mono" style={{ fontSize: 12, marginTop: 8, opacity: 0.85 }}>{c.dates}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FAB({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text)",
      }}
    >
      {children}
    </button>
  );
}
