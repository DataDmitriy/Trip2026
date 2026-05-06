"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Search, MoreHorizontal, Sparkles } from "lucide-react";
import { type City, type Place, type PlaceTag, cityData } from "@/lib/trip";
import { Card, Chip, ScreenHeader, iconBtn } from "../ui";
import type { ChatContext } from "./ChatScreen";

const CityMap = dynamic(() => import("../CityMap"), { ssr: false });

const colorMap: Record<PlaceTag, string> = {
  wow: "#F06B50",
  kids: "#3B82F6",
  science: "#8B5CF6",
  food: "#10B981",
};

interface Props {
  city: City;
  onBack: () => void;
  onPlace: (p: Place, c: City) => void;
  onChat: (ctx: ChatContext) => void;
  dark?: boolean;
}

export default function CityScreen({ city, onBack, onPlace, onChat, dark }: Props) {
  const data = cityData(city.id);
  const [filter, setFilter] = useState<"all" | PlaceTag>("all");
  const [focusId, setFocusId] = useState<string | null>(null);
  const filtered = filter === "all" ? data.places : data.places.filter(p => p.tag === filter);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <ScreenHeader
        title={city.name}
        subtitle={`${city.country} · ${city.dates}`}
        onBack={onBack}
        large
        right={
          <>
            <button style={iconBtn} aria-label="Поиск"><Search size={22} /></button>
            <button style={iconBtn} aria-label="Меню"><MoreHorizontal size={22} /></button>
          </>
        }
      />

      <div
        style={{
          height: 220,
          position: "relative",
          overflow: "hidden",
          borderRadius: 24,
          margin: "0 16px",
        }}
      >
        <CityMap
          city={city}
          places={filtered}
          stay={data.stay}
          focusId={focusId}
          onPlace={p => setFocusId(p.id)}
          dark={dark}
        />
        {focusId && (
          <button
            onClick={() => {
              const p = data.places.find(x => x.id === focusId);
              if (p) onPlace(p, city);
            }}
            style={{
              position: "absolute",
              bottom: 12,
              left: 12,
              right: 12,
              background: "var(--coral-btn)",
              color: "#fff",
              border: "none",
              padding: "12px 16px",
              borderRadius: 14,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 4px 16px rgba(240,107,80,0.35)",
            }}
          >
            <span>Открыть {data.places.find(p => p.id === focusId)?.name}</span>
            <span>→</span>
          </button>
        )}
      </div>

      <div className="nsb" style={{ display: "flex", gap: 8, padding: "14px 20px 8px", overflowX: "auto" }}>
        <Chip active={filter === "all"} onClick={() => setFilter("all")}>Всё ({data.places.length})</Chip>
        <Chip active={filter === "wow"} onClick={() => setFilter("wow")} color={colorMap.wow}>🤩 Главное</Chip>
        <Chip active={filter === "kids"} onClick={() => setFilter("kids")} color={colorMap.kids}>🧸 Для детей</Chip>
        <Chip active={filter === "science"} onClick={() => setFilter("science")} color={colorMap.science}>🔬 Наука</Chip>
        <Chip active={filter === "food"} onClick={() => setFilter("food")} color={colorMap.food}>🍽 Еда</Chip>
      </div>

      <div className="nsb" style={{ flex: 1, overflowY: "auto", padding: "4px 16px 24px" }}>
        <Card style={{ marginBottom: 12 }} accent="#F06B50">
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "var(--coral-soft)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
              }}
            >
              🏠
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-secondary)",
                  textTransform: "uppercase",
                  letterSpacing: 0.4,
                  fontWeight: 600,
                }}
              >
                Жильё
              </div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{data.stay.name}</div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                {data.stay.addr} · {data.stay.metro}
              </div>
            </div>
          </div>
        </Card>

        {filtered.map(p => (
          <PlaceListItem key={p.id} place={p} onClick={() => onPlace(p, city)} />
        ))}

        <button
          onClick={() => onChat({ city })}
          style={{
            width: "100%",
            marginTop: 8,
            background: "var(--surface)",
            border: "1px dashed var(--border-strong)",
            borderRadius: 16,
            padding: 14,
            display: "flex",
            gap: 12,
            alignItems: "center",
            cursor: "pointer",
            textAlign: "left",
            color: "var(--text)",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "var(--coral-text)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Sparkles size={18} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Спросить помощника</div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
              «Куда пойти прямо сейчас в {city.name}?»
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

function PlaceListItem({ place, onClick }: { place: Place; onClick: () => void }) {
  const col = colorMap[place.tag] ?? "#737373";
  return (
    <Card onClick={onClick} style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", gap: 14 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: `${col}22`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            flexShrink: 0,
          }}
        >
          {place.emoji}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ fontSize: 16, fontWeight: 600 }}>{place.name}</div>
            {place.tag === "wow" && (
              <span
                style={{
                  background: "#F06B5022",
                  color: "#C84F38",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "2px 6px",
                  borderRadius: 4,
                  letterSpacing: 0.4,
                }}
              >
                MUST
              </span>
            )}
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 2 }}>{place.subtitle}</div>
          <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
            <Meta icon="📍" text={place.dist} />
            <Meta icon="⏱" text={place.dur} />
            <Meta icon="👶" text={place.age} />
          </div>
        </div>
      </div>
    </Card>
  );
}

function Meta({ icon, text }: { icon: string; text: string }) {
  return (
    <div style={{ fontSize: 11, color: "var(--text-secondary)", display: "inline-flex", alignItems: "center", gap: 4 }}>
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  );
}
