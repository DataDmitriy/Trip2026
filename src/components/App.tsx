"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  TRIP,
  type City,
  type CityId,
  type Place,
  cityData,
  placeById,
} from "@/lib/trip";
import { ScreenHeader, iconBtn } from "./ui";
import HomeMapScreen from "./screens/HomeMapScreen";
import CityScreen from "./screens/CityScreen";
import PlaceScreen from "./screens/PlaceScreen";
import DaysScreen from "./screens/DaysScreen";
import ChatScreen, { type ChatContext } from "./screens/ChatScreen";
import FlightsScreen from "./screens/FlightsScreen";
import RouteScreen from "./screens/RouteScreen";
import MoreScreen from "./screens/MoreScreen";
import BaggageScreen from "./screens/BaggageScreen";
import BudgetScreen from "./screens/BudgetScreen";
import FiltersScreen from "./screens/FiltersScreen";
import BottomNav, { type Tab } from "./BottomNav";

type StackEntry =
  | { kind: "city"; city: City }
  | { kind: "place"; place: Place; city: City }
  | { kind: "route"; place: Place; city: City }
  | { kind: "filters" }
  | { kind: "baggage" }
  | { kind: "budget" };

export default function App() {
  const [tab, setTab] = useState<Tab>("map");
  const [stack, setStack] = useState<StackEntry[]>([]);
  const [chatCtx, setChatCtx] = useState<ChatContext | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("trip-theme") as "light" | "dark" | null;
    const initial = stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    if (typeof window !== "undefined") localStorage.setItem("trip-theme", theme);
  }, [theme]);

  // Register service worker for PWA install on Pixel.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return;
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);

  const push = (e: StackEntry) => setStack(s => [...s, e]);
  const pop = () => setStack(s => s.slice(0, -1));

  const openCity = (c: City) => push({ kind: "city", city: c });
  const openPlace = (p: Place, c: City) => push({ kind: "place", place: p, city: c });
  const openRoute = (p: Place, c: City) => push({ kind: "route", place: p, city: c });

  const openChat = (ctx: ChatContext | null) => {
    setChatCtx(ctx);
    setStack([]);
    setTab("chat");
  };

  const top = stack[stack.length - 1];

  // If a stack entry is open, it overlays the tab content.
  let body: React.ReactNode;
  if (top?.kind === "city") {
    body = (
      <CityScreen
        city={top.city}
        onBack={pop}
        onPlace={openPlace}
        onChat={ctx => openChat(ctx)}
        dark={theme === "dark"}
      />
    );
  } else if (top?.kind === "place") {
    body = (
      <PlaceScreen
        place={top.place}
        city={top.city}
        onBack={pop}
        onRoute={() => openRoute(top.place, top.city)}
        onChat={() => openChat({ city: top.city, place: top.place })}
      />
    );
  } else if (top?.kind === "route") {
    body = <RouteScreen place={top.place} city={top.city} onBack={pop} />;
  } else if (top?.kind === "filters") {
    body = <FiltersScreen onBack={pop} />;
  } else if (top?.kind === "baggage") {
    body = <BaggageScreen onBack={pop} />;
  } else if (top?.kind === "budget") {
    body = <BudgetScreen onBack={pop} />;
  } else if (tab === "map") {
    body = <HomeMapScreen onCity={openCity} dark={theme === "dark"} />;
  } else if (tab === "days") {
    body = (
      <DaysScreen
        onPlace={(placeId, cityId) => {
          const place = placeById(cityId, placeId);
          const city = TRIP.cities.find(c => c.id === cityId);
          if (place && city) openPlace(place, city);
        }}
      />
    );
  } else if (tab === "chat") {
    body = <ChatScreen initialContext={chatCtx} theme={theme} />;
  } else if (tab === "flights") {
    body = <FlightsScreen />;
  } else {
    body = (
      <MoreScreen
        theme={theme}
        onTheme={setTheme}
        go={(id) => {
          if (id === "baggage") push({ kind: "baggage" });
          else if (id === "budget") push({ kind: "budget" });
          else if (id === "filters") push({ kind: "filters" });
        }}
      />
    );
  }

  const onTabChange = (t: Tab) => {
    if (stack.length) setStack([]);
    setTab(t);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
        color: "var(--text)",
        overflow: "hidden",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
        {body}
      </div>
      {!top && <BottomNav active={tab} onChange={onTabChange} />}
    </div>
  );
}
