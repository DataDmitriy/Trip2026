"use client";

import { Map as MapIcon, Calendar, MessageCircle, Plane, MoreHorizontal } from "lucide-react";

export type Tab = "map" | "days" | "chat" | "flights" | "more";

const items: Array<{ id: Tab; icon: typeof MapIcon; label: string }> = [
  { id: "map", icon: MapIcon, label: "Карта" },
  { id: "days", icon: Calendar, label: "По дням" },
  { id: "chat", icon: MessageCircle, label: "AI помощник" },
  { id: "flights", icon: Plane, label: "Перелёты" },
  { id: "more", icon: MoreHorizontal, label: "Ещё" },
];

export default function BottomNav({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <div
      style={{
        flexShrink: 0,
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        paddingBottom: 6,
        paddingTop: 4,
        display: "flex",
      }}
    >
      {items.map(it => {
        const on = active === it.id;
        const Icon = it.icon;
        return (
          <button
            key={it.id}
            onClick={() => onChange(it.id)}
            style={{
              flex: 1,
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              padding: "6px 0",
              color: on ? "var(--coral-text)" : "var(--text-secondary)",
            }}
          >
            <div
              style={{
                padding: "4px 18px",
                borderRadius: 16,
                background: on ? "var(--coral-soft)" : "transparent",
                transition: "background .15s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon size={22} strokeWidth={2} />
            </div>
            <span style={{ fontSize: 11, fontWeight: on ? 600 : 500 }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}
