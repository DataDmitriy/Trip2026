"use client";

import { ArrowLeft, Star, MapPin, Sparkles, Navigation } from "lucide-react";
import { type City, type Place, type PlaceTag, cityData } from "@/lib/trip";
import { Card, SectionLabel, ctaPrimary, ctaSecondary, iconBtn } from "../ui";

const colorMap: Record<PlaceTag, string> = {
  wow: "#F06B50",
  kids: "#3B82F6",
  science: "#8B5CF6",
  food: "#10B981",
};

interface Props {
  place: Place;
  city: City;
  onBack: () => void;
  onRoute: () => void;
  onChat: () => void;
}

export default function PlaceScreen({ place, city, onBack, onRoute, onChat }: Props) {
  const col = colorMap[place.tag] ?? "#737373";

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      <div
        style={{
          height: 240,
          position: "relative",
          background: `linear-gradient(135deg, ${col}33 0%, ${col}11 60%, var(--bg) 100%)`,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 100,
          }}
        >
          {place.emoji}
        </div>
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            right: 8,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={onBack}
            style={{ ...iconBtn, background: "rgba(255,255,255,0.92)" }}
            aria-label="Назад"
          >
            <ArrowLeft size={22} />
          </button>
          <button
            style={{ ...iconBtn, background: "rgba(255,255,255,0.92)" }}
            aria-label="В избранное"
          >
            <Star size={20} />
          </button>
        </div>
      </div>

      <div className="nsb" style={{ flex: 1, overflowY: "auto", padding: "16px 20px 100px" }}>
        <div style={{ fontSize: 12, color: col, textTransform: "uppercase", letterSpacing: 0.6, fontWeight: 700 }}>
          {city.name}
        </div>
        <div
          style={{
            fontSize: 26,
            fontWeight: 600,
            fontFamily: '"Google Sans", sans-serif',
            marginTop: 4,
            letterSpacing: "-0.4px",
            lineHeight: 1.15,
          }}
        >
          {place.name}
        </div>
        <div style={{ fontSize: 15, color: "var(--text-secondary)", marginTop: 6, lineHeight: 1.5 }}>
          {place.subtitle}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 16 }}>
          <Stat icon="⏱" label="Время" value={place.dur} />
          <Stat icon="👶" label="Возраст" value={place.age} />
          <Stat icon="💶" label="Цена" value={place.price} />
        </div>

        <Card style={{ marginTop: 16, padding: 14 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "var(--coral-soft)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--coral-text)",
              }}
            >
              <MapPin size={20} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{place.addr}</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Открыто: {place.open}</div>
            </div>
          </div>
        </Card>

        <div style={{ marginTop: 18 }}>
          <SectionLabel>Что сказать детям</SectionLabel>
          <Card style={{ background: "linear-gradient(135deg, #FFF1ED, #FFE6DF)", border: "1px solid #F06B5044" }}>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ fontSize: 32 }}>🧒</div>
              <div style={{ flex: 1, fontSize: 15, color: "#2A1610", lineHeight: 1.5 }}>
                «{place.kid}»
              </div>
            </div>
          </Card>
        </div>

        <div style={{ marginTop: 18 }}>
          <SectionLabel>Лайфхак для семьи</SectionLabel>
          <Card style={{ borderLeft: "3px solid #F59E0B" }}>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ fontSize: 20 }}>💡</div>
              <div style={{ flex: 1, fontSize: 14, lineHeight: 1.5 }}>{place.tip}</div>
            </div>
          </Card>
        </div>

        <div style={{ marginTop: 18 }}>
          <SectionLabel>Рядом</SectionLabel>
          <div className="nsb" style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
            {cityData(city.id)
              .places.filter(p => p.id !== place.id)
              .slice(0, 4)
              .map(p => (
                <div
                  key={p.id}
                  style={{
                    flexShrink: 0,
                    width: 130,
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 14,
                    padding: 12,
                  }}
                >
                  <div style={{ fontSize: 24 }}>{p.emoji}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{p.dist}</div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 16,
          background: "linear-gradient(to top, var(--bg) 60%, transparent)",
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onChat} style={ctaSecondary}>
            <Sparkles size={18} /> Спросить
          </button>
          <button onClick={onRoute} style={ctaPrimary}>
            <Navigation size={18} /> Как добраться
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: "10px 12px",
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: "var(--text-secondary)",
          textTransform: "uppercase",
          letterSpacing: 0.4,
          fontWeight: 600,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>
        {icon} {value}
      </div>
    </div>
  );
}
