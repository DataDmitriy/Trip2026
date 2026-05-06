"use client";

import { Plane } from "lucide-react";
import { TRIP, type Flight } from "@/lib/trip";
import { Card, ScreenHeader, SectionLabel } from "../ui";

export default function FlightsScreen() {
  const flights = TRIP.flights;
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <ScreenHeader title="Перелёты и трансферы" subtitle="4 рейса · 1 чемодан · 5 ручных кладей" large />
      <div className="nsb" style={{ flex: 1, overflowY: "auto", padding: "0 16px 24px" }}>
        {flights.map((f, i) => (
          <FlightCard key={f.id} flight={f} idx={i + 1} />
        ))}

        <div style={{ marginTop: 16 }}>
          <SectionLabel>Багаж</SectionLabel>
          <Card>
            <Row title="1 × Чемодан 23 кг" sub="В трюм, KLM/Air France" emoji="🧳" />
            <div style={{ height: 1, background: "var(--border)", margin: "12px 0" }} />
            <Row title="5 × Ручная кладь" sub="По одной на каждого пассажира" emoji="🎒" />
          </Card>
        </div>
      </div>
    </div>
  );
}

function Row({ title, sub, emoji }: { title: string; sub: string; emoji: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{sub}</div>
      </div>
      <div style={{ fontSize: 24 }}>{emoji}</div>
    </div>
  );
}

function FlightCard({ flight, idx }: { flight: Flight; idx: number }) {
  return (
    <Card style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div
          style={{
            fontSize: 11,
            color: "var(--text-secondary)",
            textTransform: "uppercase",
            letterSpacing: 0.6,
            fontWeight: 700,
          }}
        >
          Перелёт {idx} · {flight.date}
        </div>
        <div className="mono" style={{ fontSize: 11, color: "var(--text-secondary)" }}>{flight.code}</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10 }}>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              fontFamily: '"Google Sans", sans-serif',
              letterSpacing: "-0.5px",
            }}
          >
            {flight.from}
          </div>
          <div className="mono" style={{ fontSize: 13, color: "var(--text-secondary)" }}>{flight.time}</div>
        </div>
        <div style={{ flex: 1.5, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 600 }}>{flight.dur}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, width: "100%", margin: "4px 0", position: "relative" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--text)" }} />
            <div style={{ flex: 1, height: 1, background: "var(--border-strong)", position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: -8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "var(--coral-text)",
                }}
              >
                <Plane size={16} />
              </div>
            </div>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--text)" }} />
          </div>
          <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{flight.airline}</div>
        </div>
        <div style={{ flex: 1, textAlign: "right" }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              fontFamily: '"Google Sans", sans-serif',
              letterSpacing: "-0.5px",
            }}
          >
            {flight.to}
          </div>
          <div className="mono" style={{ fontSize: 13, color: "var(--text-secondary)" }}>{flight.date}</div>
        </div>
      </div>

      {flight.tip && (
        <div
          style={{
            marginTop: 10,
            padding: "8px 12px",
            background: "var(--coral-soft)",
            borderRadius: 10,
            fontSize: 12,
            display: "flex",
            gap: 8,
            color: "var(--text)",
          }}
        >
          <span>💡</span>
          <span style={{ flex: 1 }}>{flight.tip}</span>
        </div>
      )}
    </Card>
  );
}
