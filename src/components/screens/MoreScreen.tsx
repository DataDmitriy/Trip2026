"use client";

import { Briefcase, Euro, Filter, Bed, Settings, Sun, Moon } from "lucide-react";
import { ScreenHeader } from "../ui";

interface Props {
  go: (id: "baggage" | "budget" | "filters" | "family" | "settings") => void;
  theme: "light" | "dark";
  onTheme: (t: "light" | "dark") => void;
}

export default function MoreScreen({ go, theme, onTheme }: Props) {
  const items = [
    { id: "baggage" as const, Icon: Briefcase, label: "Багаж и документы", sub: "Чек-лист на 16 дней" },
    { id: "budget" as const, Icon: Euro, label: "Бюджет", sub: "€5 210 из €8 400" },
    { id: "filters" as const, Icon: Filter, label: "Детские фильтры", sub: "Возраст, дистанция, сон" },
    { id: "family" as const, Icon: Bed, label: "Семья", sub: "2 + 3 (2, 5, 6 лет)" },
    { id: "settings" as const, Icon: Settings, label: "Настройки", sub: "Тема, устройство, язык" },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <ScreenHeader title="Ещё" subtitle="Trip 2026 · Семейный помощник" large />
      <div className="nsb" style={{ flex: 1, overflowY: "auto", padding: "4px 16px 24px" }}>
        {items.map(it => (
          <div
            key={it.id}
            onClick={() => go(it.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: 14,
              cursor: "pointer",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "var(--coral-soft)",
                color: "var(--coral-text)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <it.Icon size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{it.label}</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{it.sub}</div>
            </div>
            <div style={{ color: "var(--text-secondary)" }}>→</div>
          </div>
        ))}

        <div
          onClick={() => onTheme(theme === "dark" ? "light" : "dark")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: 14,
            cursor: "pointer",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "var(--coral-soft)",
              color: "var(--coral-text)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Тема</div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
              {theme === "dark" ? "Тёмная — переключить на светлую" : "Светлая — переключить на тёмную"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
