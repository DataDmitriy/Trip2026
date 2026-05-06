import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { TRIP, type CityId, cityById, placeById } from "@/lib/trip";

export const runtime = "nodejs";

interface IncomingMessage {
  role: "user" | "assistant";
  content: string;
}

interface Body {
  messages: IncomingMessage[];
  context?: { cityId?: CityId; placeId?: string };
}

const SYSTEM = buildSystem();

function buildSystem(): string {
  const lines: string[] = [];
  lines.push(
    `Ты — личный AI-помощник одной семьи в путешествии по Европе с 6 по 22 мая 2026 года.`,
    `Состав семьи: 2 взрослых + 3 детей (Лёва 2 года, Софья 5 лет, Артём 6 лет).`,
    `Ключевые ограничения: без коляски (пешком ≤ 800 м), обязательный сон Лёвы 13:00–15:00 (возврат в апартаменты к 12:45), 5 ручных кладей + 1 чемодан, без многоступенчатых пересадок.`,
    `Сегодня 7 мая 2026 — первый полноценный день путешествия. Семья прилетела вчера 6 мая в Будапешт, заселилась в Adina Apartment Hotel. 7 мая ушло на восстановление от джетлага, прогулку по центру и ужин в тематическом «магическом» ресторане в стиле Гарри Поттера — детям очень понравилось.`,
    ``,
    `Отвечай кратко (3–6 строк), на русском, дружелюбно. Учитывай возраст детей и режим сна. Если предлагаешь места — давай конкретно из списка маршрута. Не выдумывай адреса и часы.`,
    ``,
    `=== МАРШРУТ ===`,
  );
  TRIP.cities.forEach((c, i) => {
    lines.push(`${i + 1}. ${c.name} (${c.country}) — ${c.dates}`);
  });
  lines.push(``, `=== ПЕРЕЛЁТЫ ===`);
  TRIP.flights.forEach(f => {
    lines.push(`- ${f.date}: ${f.code} ${f.airline} ${f.from}→${f.to} ${f.time} (${f.dur}). ${f.tip}`);
  });
  lines.push(``, `=== МЕСТА И РАСПИСАНИЕ ПО ГОРОДАМ ===`);
  (["budapest", "paris", "billund", "amsterdam"] as const).forEach(id => {
    const c = cityById(id)!;
    const data = TRIP[id];
    lines.push(``, `--- ${c.name} (${c.dates}) ---`);
    lines.push(`Жильё: ${data.stay.name}, ${data.stay.addr} (${data.stay.metro}).`);
    lines.push(`Места:`);
    data.places.forEach(p => {
      lines.push(
        `  • [${p.id}] ${p.emoji} ${p.name} — ${p.subtitle} | ${p.dist} | возраст ${p.age} | ${p.dur} | ${p.price} | адрес: ${p.addr} | часы: ${p.open} | лайфхак: ${p.tip}`
      );
    });
    lines.push(`Дни:`);
    data.days.forEach(d => {
      const items = d.items.map(it => `${it.time} ${it.kind} — ${it.text}`).join("; ");
      lines.push(`  ${d.date} (${d.label}): ${items}`);
    });
  });
  lines.push(
    ``,
    `=== БЮДЖЕТ ===`,
    `Всего €${TRIP.budget.total}, потрачено €${TRIP.budget.spent}. Категории:`,
    ...TRIP.budget.cats.map(c => `  • ${c.name}: €${c.spent}/${c.plan}`),
  );
  return lines.join("\n");
}

function contextNote(cityId?: CityId, placeId?: string): string | null {
  if (!cityId) return null;
  const c = cityById(cityId);
  if (!c) return null;
  if (placeId) {
    const p = placeById(cityId, placeId);
    if (p) {
      return `Пользователь сейчас смотрит карточку места «${p.name}» в городе ${c.name}. ${p.subtitle}`;
    }
  }
  return `Пользователь сейчас на экране города ${c.name} (${c.dates}).`;
}

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Невалидный JSON" }, { status: 400 });
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json({ error: "Пустой messages" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Не настроен ANTHROPIC_API_KEY. Добавьте его в .env.local или в переменные окружения Vercel.",
      },
      { status: 503 },
    );
  }

  const note = contextNote(body.context?.cityId, body.context?.placeId);
  const systemBlocks = [
    { type: "text" as const, text: SYSTEM, cache_control: { type: "ephemeral" as const } },
    ...(note ? [{ type: "text" as const, text: note }] : []),
  ];

  const client = new Anthropic({ apiKey });
  try {
    const resp = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 600,
      system: systemBlocks,
      messages: body.messages.map(m => ({ role: m.role, content: m.content })),
    });
    const reply = resp.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map(b => b.text)
      .join("\n")
      .trim();
    return NextResponse.json({ reply });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Ошибка Anthropic API" }, { status: 502 });
  }
}
