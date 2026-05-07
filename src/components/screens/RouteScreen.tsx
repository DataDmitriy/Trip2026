"use client";

import { useMemo } from "react";
import { Footprints, Bus, Train, Car, Navigation } from "lucide-react";
import { type City, type Place, cityData } from "@/lib/trip";
import { Card, ScreenHeader, SectionLabel, ctaPrimary } from "../ui";

interface Step {
  kind: "walk" | "bus" | "train" | "car";
  dur: number;
  dist: string;
  label: string;
  color: string;
}

export default function RouteScreen({ place, city, onBack }: { place: Place; city: City; onBack: () => void }) {
  const stay = cityData(city.id).stay;

  const steps = useMemo<Step[]>(() => {
    const dist = place.dist || "";
    if (dist.includes("пешком") || /\d+\s*м\s*·/.test(dist)) {
      const m = dist.match(/(\d+)\s*м/);
      const meters = m ? +m[1] : 500;
      return [
        {
          kind: "walk",
          dur: Math.max(2, Math.round(meters / 80)),
          dist: `${meters} м`,
          label: `Пешком от ${stay.name}`,
          color: "#10B981",
        },
      ];
    }
    if (dist.includes("шаттл")) {
      return [
        { kind: "walk", dur: 2, dist: "120 м", label: "До остановки шаттла", color: "#10B981" },
        { kind: "bus", dur: 8, dist: "прямой", label: "Шаттл → парк", color: "#3B82F6" },
      ];
    }
    if (dist.includes("метро") || dist.match(/M\d/) || dist.includes("RER")) {
      return [
        { kind: "walk", dur: 5, dist: "350 м", label: `Пешком до ${stay.metro}`, color: "#10B981" },
        { kind: "train", dur: 22, dist: "7 ост.", label: `Метро → ${place.name}`, color: "#8B5CF6" },
        { kind: "walk", dur: 4, dist: "280 м", label: `Пешком до ${place.name}`, color: "#10B981" },
      ];
    }
    if (dist.includes("трамвай") || dist.includes("автобус")) {
      return [
        { kind: "walk", dur: 3, dist: "180 м", label: "До остановки", color: "#10B981" },
        { kind: "bus", dur: 8, dist: "4 ост.", label: dist, color: "#3B82F6" },
        { kind: "walk", dur: 2, dist: "120 м", label: `До ${place.name}`, color: "#10B981" },
      ];
    }
    if (dist.includes("машин") || dist.includes("такси")) {
      return [{ kind: "car", dur: 18, dist: dist, label: "На машине", color: "#F59E0B" }];
    }
    return [
      { kind: "walk", dur: 3, dist: "200 м", label: "Пешком до транспорта", color: "#10B981" },
      { kind: "bus", dur: 10, dist: "5 ост.", label: "Общественный транспорт", color: "#3B82F6" },
      { kind: "walk", dur: 3, dist: "180 м", label: `До ${place.name}`, color: "#10B981" },
    ];
  }, [place.id, place.dist, place.name, stay.name, stay.metro]);

  const total = steps.reduce((s, x) => s + x.dur, 0);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      <ScreenHeader title="Как добраться" onBack={onBack} />

      <div style={{ padding: "0 16px 12px" }}>
        <Card style={{ background: "linear-gradient(135deg, var(--coral-soft), var(--surface))" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <div className="mono" style={{ fontSize: 32, fontWeight: 700 }}>{total}</div>
            <div style={{ fontSize: 14, color: "var(--text-secondary)", fontWeight: 500 }}>мин в пути</div>
            <div style={{ flex: 1 }} />
            <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Прибытие ≈ {addMinutes(total)}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
            <div style={{ fontSize: 18 }}>🏠</div>
            <div
              style={{
                flex: 1,
                height: 2,
                background:
                  "repeating-linear-gradient(to right, var(--border-strong) 0, var(--border-strong) 4px, transparent 4px, transparent 8px)",
              }}
            />
            <div style={{ fontSize: 18 }}>{place.emoji}</div>
          </div>
        </Card>
      </div>

      <div className="nsb" style={{ flex: 1, overflowY: "auto", padding: "8px 16px 100px" }}>
        <SectionLabel>Шаги</SectionLabel>

        <div style={{ position: "relative", paddingLeft: 4 }}>
          <StartEnd label="Откуда" name={stay.name} sub={stay.addr} icon="🏠" />
          {steps.map((s, i) => (
            <StepRow key={i} step={s} />
          ))}
          <StartEnd label="Куда" name={place.name} sub={place.addr} icon={place.emoji} highlight />
        </div>

        <div style={{ marginTop: 18 }}>
          <SectionLabel>Семейные нюансы</SectionLabel>
          <Card>
            <Adv text="Стелла (2г) проходит без жалоб ≤ 800 м. Маршрут уложился в лимит." good />
            <Adv text="Пересадок: 0. С 5 единицами ручной клади это критично." good />
            <Adv icon="🌧" text="Прогноз: ясно, +18°. Лёгкая ветровка." />
            <Adv text={`До сна Стеллы ${Math.max(0, 134 - total)} мин — ${total < 90 ? "есть запас" : "впритык"}.`} good={total < 90} />
          </Card>
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
        <button style={{ ...ctaPrimary, width: "100%" }}>
          <Navigation size={18} /> Запустить навигацию
        </button>
      </div>
    </div>
  );
}

function addMinutes(m: number) {
  const d = new Date();
  d.setHours(11, 14, 0);
  d.setMinutes(d.getMinutes() + m);
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function StartEnd({
  label,
  name,
  sub,
  icon,
  highlight,
}: {
  label: string;
  name: string;
  sub: string;
  icon: string;
  highlight?: boolean;
}) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "center", padding: "12px 0" }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: highlight ? "var(--coral-soft)" : "var(--surface)",
          border: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 11,
            color: "var(--text-secondary)",
            textTransform: "uppercase",
            letterSpacing: 0.5,
            fontWeight: 700,
          }}
        >
          {label}
        </div>
        <div style={{ fontSize: 15, fontWeight: 600 }}>{name}</div>
        <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{sub}</div>
      </div>
    </div>
  );
}

function StepRow({ step }: { step: Step }) {
  const Icon = step.kind === "walk" ? Footprints : step.kind === "bus" ? Bus : step.kind === "train" ? Train : Car;
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "center", padding: "4px 0" }}>
      <div style={{ width: 40, display: "flex", justifyContent: "center" }}>
        <div style={{ width: 2, height: 32, background: step.color, borderRadius: 1 }} />
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 12px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 12,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: step.color,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={16} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>{step.label}</div>
          <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{step.dist}</div>
        </div>
        <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: step.color }}>
          {step.dur} мин
        </div>
      </div>
    </div>
  );
}

function Adv({ icon, text, good }: { icon?: string; text: string; good?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 10, padding: "6px 0", alignItems: "flex-start" }}>
      <div style={{ fontSize: 16, width: 22 }}>{good ? "✅" : icon ?? "•"}</div>
      <div style={{ flex: 1, fontSize: 13, lineHeight: 1.4 }}>{text}</div>
    </div>
  );
}
