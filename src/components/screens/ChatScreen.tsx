"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Sparkles, Send, MoreHorizontal } from "lucide-react";
import type { City, Place } from "@/lib/trip";
import { ScreenHeader, iconBtn } from "../ui";

export interface ChatContext {
  city?: City;
  place?: Place;
}

interface Props {
  initialContext: ChatContext | null;
  theme?: "light" | "dark";
}

interface Msg {
  role: "user" | "assistant";
  text: string;
}

export default function ChatScreen({ initialContext }: Props) {
  const seed = useMemo<Msg[]>(() => {
    if (initialContext?.place) {
      return [
        {
          role: "assistant",
          text: `Открыта карточка «${initialContext.place.name}». Чем помочь? Например: «Чем заменить если идёт дождь?» или «Как уложиться до сна?»`,
        },
      ];
    }
    if (initialContext?.city) {
      return [
        {
          role: "assistant",
          text: `Я знаю расписание на ${initialContext.city.name}. Спросите: «Куда пойти сейчас?», «Где покормить детей быстро?» или «Что закрыто на этой неделе?»`,
        },
      ];
    }
    return [
      {
        role: "assistant",
        text: "Здравствуйте! Я ваш помощник по поездке. Знаю всё про маршрут Будапешт → Париж → Биллунн → Амстердам.",
      },
    ];
  }, [initialContext?.place?.id, initialContext?.city?.id]);

  const [msgs, setMsgs] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMsgs(seed), [seed]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, thinking]);

  const prompts = initialContext?.city
    ? [
        `Что делать в ${initialContext.city.name} прямо сейчас?`,
        "Какое место ближе всего?",
        "Чем заменить, если дождь?",
        "Как уложиться до 12:45?",
      ]
    : [
        "🗺 Что делать сейчас?",
        "👶 Где быстрее всего покормить детей?",
        "⏰ Хватит ли времени до сна Лёвы?",
        "✈️ Что я знаю про следующий перелёт?",
      ];

  async function send(text: string) {
    if (!text.trim() || thinking) return;
    const next: Msg[] = [...msgs, { role: "user", text }];
    setMsgs(next);
    setInput("");
    setThinking(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map(m => ({ role: m.role, content: m.text })),
          context: {
            cityId: initialContext?.city?.id,
            placeId: initialContext?.place?.id,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "ошибка");
      setMsgs(m => [...m, { role: "assistant", text: data.reply ?? "..." }]);
    } catch (e: any) {
      setMsgs(m => [
        ...m,
        {
          role: "assistant",
          text: `Не получилось ответить: ${e?.message ?? e}. Если AI не настроен — добавьте ANTHROPIC_API_KEY в .env.local.`,
        },
      ]);
    } finally {
      setThinking(false);
    }
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <ScreenHeader
        title="AI помощник"
        subtitle="Знает ваш маршрут, режим и детей"
        large
        right={<button style={iconBtn} aria-label="Меню"><MoreHorizontal size={22} /></button>}
      />

      <div ref={scrollRef} className="nsb" style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
        {msgs.map((m, i) => (
          <ChatBubble key={i} msg={m} />
        ))}
        {thinking && <ChatBubble msg={{ role: "assistant", text: "" }} thinking />}

        {msgs.length === 1 && !thinking && (
          <div style={{ marginTop: 14 }}>
            <div
              style={{
                fontSize: 12,
                color: "var(--text-secondary)",
                textTransform: "uppercase",
                letterSpacing: 0.4,
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              Начните с
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {prompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => send(p)}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 16,
                    padding: "12px 16px",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: 14,
                    color: "var(--text)",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: "8px 12px 12px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 8,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 24,
            padding: "6px 6px 6px 16px",
          }}
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send(input)}
            placeholder="Спросите что угодно про поездку..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: 15,
              color: "var(--text)",
              padding: "10px 0",
            }}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || thinking}
            aria-label="Отправить"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: input.trim() && !thinking ? "var(--coral-btn)" : "var(--border-strong)",
              border: "none",
              cursor: input.trim() && !thinking ? "pointer" : "default",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ msg, thinking }: { msg: Msg; thinking?: boolean }) {
  const isAi = msg.role === "assistant";
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        marginTop: 14,
        alignItems: "flex-start",
        justifyContent: isAi ? "flex-start" : "flex-end",
      }}
    >
      {isAi && (
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "var(--coral-text)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Sparkles size={16} />
        </div>
      )}
      <div
        style={{
          background: isAi ? "var(--surface)" : "var(--coral-text)",
          color: isAi ? "var(--text)" : "#fff",
          border: isAi ? "1px solid var(--border)" : "none",
          borderRadius: isAi ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
          padding: "10px 14px",
          fontSize: 14,
          lineHeight: 1.5,
          maxWidth: "78%",
          whiteSpace: "pre-wrap",
        }}
      >
        {thinking ? (
          <div style={{ display: "flex", gap: 4 }}>
            {[0, 1, 2].map(i => (
              <span
                key={i}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--text-secondary)",
                  animation: `thinking-bounce 1.2s ${i * 0.15}s infinite`,
                }}
              />
            ))}
          </div>
        ) : (
          msg.text
        )}
      </div>
    </div>
  );
}
