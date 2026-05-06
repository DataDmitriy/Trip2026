"use client";

import { TRIP } from "@/lib/trip";
import { Card, ScreenHeader, SectionLabel } from "../ui";

export default function BudgetScreen({ onBack }: { onBack: () => void }) {
  const b = TRIP.budget;
  const pct = Math.round((b.spent / b.total) * 100);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <ScreenHeader title="Бюджет" subtitle="Семейная поездка · май 2026" large onBack={onBack} />
      <div className="nsb" style={{ flex: 1, overflowY: "auto", padding: "0 16px 24px" }}>
        <Card style={{ marginBottom: 14, padding: 20 }}>
          <div
            style={{
              fontSize: 11,
              color: "var(--text-secondary)",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              fontWeight: 700,
            }}
          >
            Потрачено / план
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 6 }}>
            <div className="mono" style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-1px" }}>
              {b.currency}
              {b.spent.toLocaleString("ru")}
            </div>
            <div className="mono" style={{ fontSize: 16, color: "var(--text-secondary)" }}>
              / {b.currency}
              {b.total.toLocaleString("ru")}
            </div>
          </div>
          <div
            style={{
              height: 10,
              background: "var(--border)",
              borderRadius: 5,
              overflow: "hidden",
              marginTop: 14,
              display: "flex",
            }}
          >
            {b.cats.map((c, i) => (
              <div key={i} style={{ width: `${(c.spent / b.total) * 100}%`, background: c.color }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 12, color: "var(--text-secondary)" }}>
            <span>{pct}% потрачено</span>
            <span>
              {b.currency}
              {(b.total - b.spent).toLocaleString("ru")} осталось
            </span>
          </div>
        </Card>

        <SectionLabel>Категории</SectionLabel>
        {b.cats.map(c => (
          <Card key={c.name} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 10, height: 38, borderRadius: 5, background: c.color }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</div>
                  <div className="mono" style={{ fontSize: 13, fontWeight: 600 }}>
                    {c.spent === c.plan ? "✓ " : ""}
                    {b.currency}
                    {c.spent}
                    <span style={{ color: "var(--text-secondary)", fontWeight: 400 }}> / {c.plan}</span>
                  </div>
                </div>
                <div style={{ height: 4, background: "var(--border)", borderRadius: 2, marginTop: 6 }}>
                  <div style={{ width: `${(c.spent / c.plan) * 100}%`, height: "100%", background: c.color, borderRadius: 2 }} />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
