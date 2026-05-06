"use client";

import { CSSProperties, ReactNode } from "react";

export function Card({
  children,
  onClick,
  style,
  accent,
}: {
  children: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
  accent?: string;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "var(--surface)",
        borderRadius: 20,
        padding: 16,
        border: "1px solid var(--border)",
        cursor: onClick ? "pointer" : "default",
        borderTop: accent ? `3px solid ${accent}` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Chip({
  active,
  onClick,
  children,
  color,
}: {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        border: "none",
        cursor: "pointer",
        padding: "8px 14px",
        borderRadius: 100,
        background: active ? color || "#1f1f1f" : "var(--chip-bg)",
        color: active ? "#fff" : "var(--text)",
        fontSize: 13,
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

export function ScreenHeader({
  title,
  subtitle,
  onBack,
  right,
  large,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: ReactNode;
  large?: boolean;
}) {
  return (
    <div style={{ padding: "8px 20px 12px", flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, height: 48 }}>
        {onBack && (
          <button
            onClick={onBack}
            aria-label="Назад"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              marginLeft: -8,
              color: "var(--text)",
              display: "flex",
              fontSize: 22,
            }}
          >
            ←
          </button>
        )}
        {!large && (
          <div
            style={{
              flex: 1,
              fontSize: 20,
              fontWeight: 600,
              color: "var(--text)",
              fontFamily: '"Google Sans", sans-serif',
            }}
          >
            {title}
          </div>
        )}
        {large && <div style={{ flex: 1 }} />}
        <div style={{ display: "flex", gap: 4 }}>{right}</div>
      </div>
      {large && (
        <div style={{ marginTop: 4 }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "var(--text)",
              letterSpacing: "-0.5px",
              fontFamily: '"Google Sans", sans-serif',
              lineHeight: 1.2,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 4 }}>{subtitle}</div>
          )}
        </div>
      )}
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontSize: 12,
        color: "var(--text-secondary)",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        fontWeight: 700,
        marginBottom: 8,
      }}
    >
      {children}
    </div>
  );
}

export const ctaPrimary: CSSProperties = {
  flex: 2,
  background: "var(--coral-btn)",
  color: "#fff",
  border: "none",
  padding: "14px 16px",
  borderRadius: 16,
  cursor: "pointer",
  fontSize: 15,
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  boxShadow: "0 4px 16px rgba(240,107,80,0.35)",
};
export const ctaSecondary: CSSProperties = {
  flex: 1,
  background: "var(--surface)",
  border: "1px solid var(--border-strong)",
  padding: "14px 16px",
  borderRadius: 16,
  cursor: "pointer",
  fontSize: 15,
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  color: "var(--text)",
};

export const iconBtn: CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  width: 40,
  height: 40,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--text)",
};
