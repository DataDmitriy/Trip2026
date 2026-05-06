"use client";

import { useState } from "react";
import { Plane, Car, Train, Footprints, Bed, Moon, Search } from "lucide-react";
import { allDays, type CityId, type DayItem, type DayItemKind } from "@/lib/trip";
import { ScreenHeader, iconBtn } from "../ui";

interface KindMeta {
  color: string;
  icon: React.ReactNode;
  label: string;
}

const meta: Record<DayItemKind, KindMeta> = {
  flight: { color: "#3B82F6", icon: <Plane size={16} />, label: "Перелёт" },
  taxi: { color: "#F59E0B", icon: <Car size={16} />, label: "Такси" },
  transit: { color: "#8B5CF6", icon: <Train size={16} />, label: "Транспорт" },
  walk: { color: "#10B981", icon: <Footprints size={16} />, label: "Прогулка" },
  rest: { color: "#737373", icon: <Bed size={16} />, label: "Жильё" },
  nap: { color: "#6366F1", icon: <Moon size={16} />, label: "Сон Лёвы" },
  food: { color: "#10B981", icon: <span>🍽</span>, label: "Еда" },
  place: { color: "#F06B50", icon: <span>📍</span>, label: "Место" },
};

interface Props {
  onPlace: (placeId: string, cityId: CityId) => void;
}

export default function DaysScreen({ onPlace }: Props) {
  const days = allDays();
  const [active, setActive] = useState(6);
  const day = days[active];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <ScreenHeader
        title="Дневник по дням"
        subtitle="6 мая → 22 мая · 16 дней"
        large
        right={<button style={iconBtn} aria-label="Поиск"><Search size={22} /></button>}
      />

      <div className="nsb" style={{ overflowX: "auto", padding: "4px 16px 12px" }}>
        <div style={{ display: "flex", gap: 8 }}>
          {days.map((d, i) => {
            const on = i === active;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  flexShrink: 0,
                  background: on ? d.cityColor : "var(--surface)",
                  color: on ? "#fff" : "var(--text)",
                  border: `1px solid ${on ? d.cityColor : "var(--border)"}`,
                  borderTop: `3px solid ${d.cityColor}`,
                  borderRadius: 14,
                  padding: "8px 12px",
                  cursor: "pointer",
                  minWidth: 92,
                  textAlign: "left",
                }}
              >
                <div style={{ fontSize: 10, opacity: 0.85, fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase" }}>
                  День {i + 1}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{d.date.split(",")[0]}</div>
                <div style={{ fontSize: 11, opacity: 0.85, marginTop: 1 }}>{d.cityName}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="nsb" style={{ flex: 1, overflowY: "auto", padding: "0 16px 24px" }}>
        {day && (
          <>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "4px 0 14px" }}>
              <div style={{ fontSize: 22, fontWeight: 600, fontFamily: '"Google Sans", sans-serif' }}>{day.date}</div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>· {day.label}</div>
            </div>

            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: 38,
                  top: 14,
                  bottom: 14,
                  width: 1.5,
                  background: "var(--border-strong)",
                }}
              />
              {day.items.map((it, i) => (
                <ScheduleItem key={i} item={it} onPlace={() => it.placeId && onPlace(it.placeId, day.cityId)} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ScheduleItem({ item, onPlace }: { item: DayItem; onPlace: () => void }) {
  const m = meta[item.kind];
  const isNap = item.kind === "nap";
  return (
    <div style={{ display: "flex", gap: 14, padding: "8px 0", alignItems: "flex-start" }}>
      <div
        className="mono"
        style={{ width: 52, fontSize: 13, fontWeight: 600, paddingTop: 8 }}
      >
        {item.time}
      </div>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          flexShrink: 0,
          background: m.color,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
          fontSize: 14,
        }}
      >
        {m.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          onClick={item.placeId ? onPlace : undefined}
          style={{
            background: isNap ? "linear-gradient(135deg, #EEF0FF, #E5E9FF)" : "var(--surface)",
            border: `1px solid ${isNap ? "#6366F133" : "var(--border)"}`,
            borderRadius: 14,
            padding: "10px 14px",
            cursor: item.placeId ? "pointer" : "default",
            color: isNap ? "#1F1714" : undefined,
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 600, color: m.color, textTransform: "uppercase", letterSpacing: 0.4 }}>
            {m.label}
          </div>
          <div style={{ fontSize: 14, marginTop: 2 }}>{item.text}</div>
          {isNap && (
            <div style={{ fontSize: 11, color: "#6366F1", marginTop: 4, fontWeight: 500 }}>
              ⛔ Без транзита, без шоппинга — только дома
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
