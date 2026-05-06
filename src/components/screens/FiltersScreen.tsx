"use client";

import { useState } from "react";
import { ScreenHeader, SectionLabel, ctaPrimary } from "../ui";

export default function FiltersScreen({ onBack }: { onBack: () => void }) {
  const [age, setAge] = useState(2);
  const [dist, setDist] = useState(1);
  const [napAware, setNapAware] = useState(true);
  const [openNow, setOpenNow] = useState(true);
  const [kidMenu, setKidMenu] = useState(true);
  const [noTransfers, setNoTransfers] = useState(true);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <ScreenHeader title="Детские фильтры" onBack={onBack} />
      <div className="nsb" style={{ flex: 1, overflowY: "auto", padding: "0 20px 24px" }}>
        <SectionLabel>Возраст самого младшего</SectionLabel>
        <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
          {[2, 3, 5, 6].map(a => (
            <button
              key={a}
              onClick={() => setAge(a)}
              style={{
                flex: 1,
                padding: "12px 0",
                border: `1.5px solid ${age === a ? "var(--coral-text)" : "var(--border-strong)"}`,
                background: age === a ? "var(--coral-soft)" : "var(--surface)",
                color: age === a ? "var(--coral-text)" : "var(--text)",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {a} {a === 2 ? "г" : "лет"}
            </button>
          ))}
        </div>

        <SectionLabel>Максимум пешком до места</SectionLabel>
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            padding: 14,
            marginBottom: 18,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 500 }}>Дистанция</span>
            <span className="mono" style={{ fontSize: 18, fontWeight: 700, color: "var(--coral-text)" }}>
              {dist < 1 ? `${(dist * 1000).toFixed(0)} м` : `${dist.toFixed(1)} км`}
            </span>
          </div>
          <input
            type="range"
            min={0.3}
            max={3}
            step={0.1}
            value={dist}
            onChange={e => setDist(+e.target.value)}
            style={{ width: "100%", accentColor: "var(--coral-text)" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-secondary)", marginTop: 4 }}>
            <span>300 м</span>
            <span>3 км</span>
          </div>
        </div>

        <SectionLabel>Условия</SectionLabel>
        <Toggle label="Учитывать сон Лёвы (13:00–15:00)" sub="Не показывать места дальше 30 мин в это окно" on={napAware} onChange={setNapAware} />
        <Toggle label="Только открытые сейчас" sub="С учётом часов работы" on={openNow} onChange={setOpenNow} />
        <Toggle label="С детским меню или игровой" sub="Только в категории «еда»" on={kidMenu} onChange={setKidMenu} />
        <Toggle label="Без многоступенчатых пересадок" sub="С 5 ручными кладями" on={noTransfers} onChange={setNoTransfers} />

        <button onClick={onBack} style={{ ...ctaPrimary, width: "100%", marginTop: 16 }}>
          Применить фильтры
        </button>
      </div>
    </div>
  );
}

function Toggle({
  label,
  sub,
  on,
  onChange,
}: {
  label: string;
  sub?: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      onClick={() => onChange(!on)}
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        padding: 14,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        marginBottom: 8,
        cursor: "pointer",
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 500 }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>{sub}</div>}
      </div>
      <div
        style={{
          width: 44,
          height: 26,
          borderRadius: 13,
          background: on ? "var(--coral-text)" : "var(--border-strong)",
          position: "relative",
          transition: "background .15s",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 3,
            left: on ? 21 : 3,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#fff",
            transition: "left .15s",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
        />
      </div>
    </div>
  );
}
