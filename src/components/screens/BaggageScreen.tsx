"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { TRIP, type BaggageGroup } from "@/lib/trip";
import { Card, ScreenHeader, SectionLabel } from "../ui";

const STORE_KEY = "trip-baggage";

export default function BaggageScreen({ onBack }: { onBack: () => void }) {
  const [groups, setGroups] = useState<BaggageGroup[]>(TRIP.baggage);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      try {
        setGroups(JSON.parse(raw));
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORE_KEY, JSON.stringify(groups));
  }, [groups]);

  const toggle = (gi: number, ii: number) => {
    setGroups(g =>
      g.map((gr, i) =>
        i !== gi ? gr : { ...gr, items: gr.items.map((it, j) => (j !== ii ? it : { ...it, done: !it.done })) }
      )
    );
  };

  const totalDone = groups.reduce((s, g) => s + g.items.filter(i => i.done).length, 0);
  const total = groups.reduce((s, g) => s + g.items.length, 0);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <ScreenHeader title="Багаж и документы" subtitle={`${totalDone} из ${total} собрано`} large onBack={onBack} />
      <div className="nsb" style={{ flex: 1, overflowY: "auto", padding: "0 16px 24px" }}>
        <Card style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: `conic-gradient(var(--coral-text) ${(totalDone / total) * 360}deg, var(--border) 0)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="mono"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "var(--surface)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                {Math.round((totalDone / total) * 100)}%
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>До вылета 6 дней</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Не забудьте проверить срок паспортов</div>
            </div>
          </div>
        </Card>

        {groups.map((g, gi) => (
          <div key={g.id} style={{ marginBottom: 16 }}>
            <SectionLabel>{g.label}</SectionLabel>
            <Card style={{ padding: 6 }}>
              {g.items.map((it, ii) => (
                <div
                  key={ii}
                  onClick={() => toggle(gi, ii)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: 10,
                    cursor: "pointer",
                    borderBottom: ii < g.items.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      background: it.done ? "var(--coral-text)" : "transparent",
                      border: `2px solid ${it.done ? "var(--coral-text)" : "var(--border-strong)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    {it.done && <Check size={14} />}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      fontSize: 14,
                      textDecoration: it.done ? "line-through" : "none",
                      opacity: it.done ? 0.5 : 1,
                    }}
                  >
                    {it.t}
                  </div>
                </div>
              ))}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
