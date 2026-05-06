// Source of truth for the family trip 2026.
// Ported 1:1 from the design handoff (data.js).

export type CityId = "budapest" | "paris" | "billund" | "amsterdam";

export interface City {
  id: CityId;
  name: string;
  country: string;
  dates: string;
  color: string;
  lng: number;
  lat: number;
}

export interface Flight {
  id: string;
  date: string;
  code: string;
  airline: string;
  from: string;
  to: string;
  time: string;
  dur: string;
  tip: string;
}

export type PlaceTag = "wow" | "kids" | "science" | "food";

export interface Place {
  id: string;
  name: string;
  emoji: string;
  tag: PlaceTag;
  dist: string;
  dur: string;
  age: string;
  price: string;
  subtitle: string;
  addr: string;
  open: string;
  kid: string;
  tip: string;
  // Optional coordinates for the city map. Set only for places we have geocoded.
  lng?: number;
  lat?: number;
}

export type DayItemKind =
  | "flight"
  | "taxi"
  | "transit"
  | "walk"
  | "rest"
  | "nap"
  | "food"
  | "place";

export interface DayItem {
  time: string;
  kind: DayItemKind;
  text: string;
  placeId?: string;
}

export interface Day {
  date: string;
  label: string;
  items: DayItem[];
}

export interface Stay {
  name: string;
  addr: string;
  metro: string;
  lng?: number;
  lat?: number;
}

export interface CityData {
  stay: Stay;
  places: Place[];
  days: Day[];
}

export interface BaggageItem {
  t: string;
  done: boolean;
}
export interface BaggageGroup {
  id: string;
  label: string;
  items: BaggageItem[];
}

export interface BudgetCat {
  name: string;
  plan: number;
  spent: number;
  color: string;
}
export interface Budget {
  total: number;
  spent: number;
  currency: string;
  cats: BudgetCat[];
}

export interface Trip {
  cities: City[];
  flights: Flight[];
  baggage: BaggageGroup[];
  budget: Budget;
  budapest: CityData;
  paris: CityData;
  billund: CityData;
  amsterdam: CityData;
}

export const TRIP: Trip = {
  cities: [
    { id: "budapest", name: "Будапешт", country: "Венгрия", dates: "6–11 мая", color: "#C84F38", lng: 19.04, lat: 47.5 },
    { id: "paris", name: "Париж + Disneyland", country: "Франция", dates: "11–16 мая", color: "#3B6FB8", lng: 2.78, lat: 48.87 },
    { id: "billund", name: "Биллунн", country: "Дания", dates: "16–19 мая", color: "#2F8C5A", lng: 9.15, lat: 55.74 },
    { id: "amsterdam", name: "Амстердам", country: "Нидерланды", dates: "19–22 мая", color: "#7A4FA8", lng: 4.9, lat: 52.37 },
  ],
  flights: [
    { id: "f1", date: "6 мая", code: "W6 2261", airline: "Wizz Air", from: "KIV", to: "BUD", time: "08:15 → 09:05", dur: "1ч 50м", tip: "Прямой. Чек-ин онлайн за 30ч — ручную кладь сразу после." },
    { id: "f2", date: "11 мая", code: "AF 1295", airline: "Air France", from: "BUD", to: "CDG", time: "12:40 → 14:55", dur: "2ч 35м", tip: "Конфликт со сном Лёвы 13:00–15:00. Возьмите тёплый плед и наушники." },
    { id: "f3", date: "16 мая", code: "AF 5478", airline: "Air France", from: "CDG", to: "BLL", time: "13:00 → 14:50", dur: "1ч 50м", tip: "BLL примыкает к Леголенду — 5 минут до Lalandia на такси." },
    { id: "f4", date: "22 мая", code: "KL 1276", airline: "KLM", from: "AMS", to: "KIV", time: "17:45 → 22:35", dur: "3ч 10м", tip: "Возврат. Бронируйте такси в AMS заранее — пересадки с 5 кладями невозможны." },
  ],
  baggage: [
    { id: "docs", label: "Документы", items: [
      { t: "Паспорта × 5 (срок до 11.2026 ≥)", done: true },
      { t: "Визы Schengen — multi entry", done: true },
      { t: "Брони отелей (распечатать PDF)", done: true },
      { t: "Электронные посадочные KIV→BUD", done: false },
      { t: "Страховка с покрытием для детей", done: true },
      { t: "Карты вакцинации (Дания)", done: false },
    ]},
    { id: "kids", label: "Дети", items: [
      { t: "Любимая игрушка Лёвы (без неё нет сна)", done: true },
      { t: "Влажные салфетки × 5 пачек", done: true },
      { t: "Памперсы 12 шт + запас на самолёт", done: false },
      { t: "Антигистамины, парацетамол", done: true },
      { t: "Пюре в дорогу (для 2-летнего)", done: false },
      { t: "Наушники для самолёта (звуконепроницаемые)", done: false },
    ]},
    { id: "gear", label: "Снаряжение", items: [
      { t: "Эрго-рюкзак для Лёвы (вместо коляски)", done: true },
      { t: "Зонт-трость + дождевики × 5", done: false },
      { t: "Универсальные адаптеры (UK/EU)", done: true },
      { t: "Power banks × 2", done: true },
      { t: "Куртки для Дании (+8°C ночью)", done: false },
    ]},
  ],
  budget: {
    total: 8400, spent: 5210, currency: "€",
    cats: [
      { name: "Перелёты", plan: 2400, spent: 2400, color: "#3B82F6" },
      { name: "Жильё", plan: 2800, spent: 1680, color: "#F06B50" },
      { name: "Парки и музеи", plan: 1500, spent: 720, color: "#8B5CF6" },
      { name: "Еда", plan: 1100, spent: 280, color: "#10B981" },
      { name: "Транспорт", plan: 600, spent: 130, color: "#F59E0B" },
    ],
  },
  budapest: {
    stay: { name: "Adina Apartment Hotel Budapest", addr: "Erzsébet krt. 40-42, 1. em. 3 ajtó, 1073 Budapest", metro: "M1 Bajcsy-Zsilinszky", lng: 19.0529, lat: 47.5023 },
    places: [
      { id: "b1", name: "Будапештский зоопарк", emoji: "🦁", tag: "wow", dist: "450 м · 6 мин пешком", dur: "3 часа", age: "0+", price: "€26 семья", subtitle: "Купольная пальмерия, тигры, жирафы. Идеален с 2-летним.", addr: "Állatkerti krt. 6–12, в Городском парке", open: "Пн–Вс 09:00–17:00", kid: "Лёва, мы пойдём смотреть на больших жирафов и слонов! А потом будет дом, где живут разноцветные птички.", tip: "Берите бутылочки с водой — внутри питьевых фонтанчиков мало. Лучшее время 10:00–12:30.", lng: 19.0793, lat: 47.5181 },
      { id: "b2", name: "Венгерский музей естествознания", emoji: "🦴", tag: "science", dist: "1.6 км · трамвай 24", dur: "2 часа", age: "5+", price: "€18 семья", subtitle: "Скелеты динозавров, интерактивная зона. Идеально для Софьи и Артёма.", addr: "Ludovika tér 2–6", open: "Ср–Вс 10:00–18:00", kid: "Артём, представь — там настоящие скелеты динозавров, выше папы! И можно потрогать кости мамонта.", tip: "По средам бесплатно для детей до 6. Кафе внутри — без бронирования, дёшево.", lng: 19.0848, lat: 47.4836 },
      { id: "b3", name: "MiniPolisz", emoji: "🏙", tag: "kids", dist: "450 м · 6 мин пешком", dur: "2.5 часа", age: "2–10", price: "€32 за 3х детей", subtitle: "Игровой город — дети «работают» в банке, пожарной, пекарне.", addr: "Bajcsy-Zsilinszky út 17", open: "Пн–Вс 10:00–19:00", kid: "Софья, ты будешь работать в настоящей пекарне и печь хлеб! А ещё там есть пожарная машина.", tip: "Бронь онлайн — слоты по 2 часа. Идеально на дождливый день.", lng: 19.054, lat: 47.501 },
      { id: "b4", name: "Gettó Gulyás", emoji: "🍲", tag: "food", dist: "300 м · 4 мин пешком", dur: "1 час", age: "0+", price: "€38 на 5", subtitle: "Лучший гуляш в городе. Детское меню, быстро (12 мин).", addr: "Wesselényi u. 18", open: "Пн–Вс 12:00–22:00", kid: "Это венгерский суп, как наш борщ, только с мясом и красным перцем. Будет вкусно!", tip: "Без бронирования до 12:30 и после 14:00 — окна между ланчем и ужином. Стульчики есть.", lng: 19.0617, lat: 47.4977 },
      { id: "b5", name: "Парламент (снаружи)", emoji: "🏛", tag: "wow", dist: "800 м · трамвай 2", dur: "45 мин", age: "0+", price: "бесплатно", subtitle: "Самое красивое здание Будапешта. Вид от площади Кошута.", addr: "Kossuth Lajos tér 1–3", open: "Открытое пространство", kid: "Это огромный замок, где принимают важные решения. Посмотрим на него с реки.", tip: "Внутрь не водите детей — экскурсия 50 мин без перерыва, не подходит для 2-летнего.", lng: 19.0456, lat: 47.5072 },
      { id: "b6", name: "Купальни Сечени", emoji: "♨️", tag: "wow", dist: "450 м · 6 мин пешком", dur: "2 часа", age: "3+", price: "€60 семья", subtitle: "Термальные ванны под открытым небом, в Городском парке.", addr: "Állatkerti krt. 9–11", open: "Пн–Вс 09:00–19:00", kid: "Это большой тёплый бассейн на улице, где плавают взрослые и дети!", tip: "Лёва (2г) — только в крытых детских ваннах. Берите свои тапочки — на месте дорого.", lng: 19.0815, lat: 47.5189 },
      { id: "b7", name: "Магический ресторан (Harry Potter)", emoji: "🪄", tag: "wow", dist: "10 мин пешком от центра", dur: "1.5 часа", age: "3+", price: "€60 на 5", subtitle: "Тематический ужин в стиле Хогвартса — детям зашло на ура.", addr: "Будапешт, центр (уточните адрес)", open: "Пн–Вс 12:00–22:00", kid: "Мы пойдём в настоящий волшебный ресторан — там еду подают как в школе магии!", tip: "Поправьте конкретное название/адрес посещённого места в src/lib/trip.ts (placeholder).", lng: 19.054, lat: 47.4988 },
    ],
    days: [
      { date: "6 мая, ср", label: "Прилёт", items: [
        { time: "08:15", kind: "flight", text: "Wizz Air W6 2261 KIV → BUD" },
        { time: "10:00", kind: "taxi", text: "Bolt в Adina Apartment Hotel (€18, 25 мин)" },
        { time: "11:00", kind: "rest", text: "Заселение, разбор ручной клади" },
        { time: "13:00", kind: "nap", text: "Сон Лёвы — все дома" },
        { time: "15:30", kind: "walk", text: "Прогулка вдоль Дуная (Цепной мост)" },
        { time: "18:30", kind: "food", text: "Ужин: Gettó Gulyás · 300 м", placeId: "b4" },
      ]},
      { date: "7 мая, чт", label: "Джетлаг + центр + магический ужин", items: [
        { time: "10:00", kind: "rest", text: "Восстановление от джетлага, поздний завтрак дома" },
        { time: "11:30", kind: "walk", text: "Прогулка вокруг Базилики Святого Иштвана" },
        { time: "13:00", kind: "nap", text: "Сон Лёвы (обязательно)" },
        { time: "16:00", kind: "walk", text: "Центр: пешеходные улицы Vaci utca, площадь Vörösmarty" },
        { time: "18:30", kind: "food", text: "Ужин: магический ресторан в стиле Гарри Поттера", placeId: "b7" },
      ]},
      { date: "8 мая, пт", label: "Зоопарк", items: [
        { time: "09:30", kind: "place", text: "Будапештский зоопарк (3 часа)", placeId: "b1" },
        { time: "12:30", kind: "walk", text: "Возврат в апартаменты" },
        { time: "13:00", kind: "nap", text: "Сон Лёвы (обязательно)" },
        { time: "15:30", kind: "place", text: "MiniPolisz · 2 часа", placeId: "b3" },
        { time: "19:00", kind: "food", text: "Ужин дома (микроволновка в апартаментах)" },
      ]},
      { date: "9 мая, сб", label: "Динозавры + парк", items: [
        { time: "09:30", kind: "transit", text: "Трамвай 24 → Музей естествознания" },
        { time: "10:00", kind: "place", text: "Музей естествознания · 2 ч", placeId: "b2" },
        { time: "12:15", kind: "taxi", text: "Bolt → Adina (€10)" },
        { time: "13:00", kind: "nap", text: "Сон Лёвы" },
        { time: "15:30", kind: "walk", text: "Городской парк, утки, Vajdahunyad" },
      ]},
      { date: "10 мая, вс", label: "Купальни + Парламент", items: [
        { time: "09:30", kind: "place", text: "Купальни Сечени", placeId: "b6" },
        { time: "12:30", kind: "walk", text: "Возврат, обед дома" },
        { time: "13:00", kind: "nap", text: "Сон Лёвы" },
        { time: "15:30", kind: "place", text: "Парламент с площади Кошута", placeId: "b5" },
        { time: "19:00", kind: "rest", text: "Сборка чемодана к перелёту" },
      ]},
      { date: "11 мая, пн", label: "Перелёт в Париж", items: [
        { time: "09:30", kind: "taxi", text: "Bolt в BUD (€32)" },
        { time: "12:40", kind: "flight", text: "AF 1295 BUD → CDG" },
        { time: "15:30", kind: "taxi", text: "Take Charter Bus → Adagio Serris (45 мин)" },
        { time: "17:00", kind: "rest", text: "Заселение, ужин" },
      ]},
    ],
  },
  paris: {
    stay: { name: "Adagio Aparthotel Marne-la-Vallée", addr: "Val d'Europe, Serris", metro: "RER A · Val d'Europe", lng: 2.7833, lat: 48.8473 },
    places: [
      { id: "p1", name: "Disneyland Park", emoji: "🏰", tag: "wow", dist: "шаттл 8 мин", dur: "6 часов", age: "2+", price: "€420 семья", subtitle: "Главный парк. Карусели, Замок Спящей красавицы, парад в 17:00.", addr: "Bd de Parc, 77777 Coupvray", open: "Пн–Вс 09:30–22:00", kid: "Софья, мы идём в настоящий замок принцессы! А ещё будет парад с принцессами и Микки Маусом.", tip: "Раннее открытие 08:30 для гостей отеля — пользуйтесь. Назад в Adagio к 12:30 на сон.", lng: 2.7758, lat: 48.8722 },
      { id: "p2", name: "Walt Disney Studios", emoji: "🎬", tag: "wow", dist: "шаттл 10 мин", dur: "4 часа", age: "4+", price: "входит в билет", subtitle: "Тачки, Тауэр-террор, Рататуй ride. Лучше для Артёма и Софьи.", addr: "Bd de Parc, рядом с Disneyland", open: "Пн–Вс 10:00–20:00", kid: "Артём, помнишь машинки Тачки? Мы будем кататься на них как настоящие гонщики!", tip: "Лёва (2г) пропустит большинство аттракционов. Один взрослый с ним в Toy Story Land.", lng: 2.7793, lat: 48.8676 },
      { id: "p3", name: "Aquarium Sea Life", emoji: "🐠", tag: "kids", dist: "5 мин пешком", dur: "1.5 часа", age: "2+", price: "€68 семья", subtitle: "Внутри ТЦ Val d'Europe. Туннель с акулами.", addr: "Centre Commercial Val d'Europe", open: "Пн–Вс 10:00–18:00", kid: "Лёва, ты увидишь больших рыб и акул прямо над головой — мы пройдём через тоннель в океане!", tip: "Идеально на дождь или после сна — крытый, рядом с жильём. Бронируйте онлайн (-15%).", lng: 2.7811, lat: 48.8466 },
      { id: "p4", name: "La Vallée Village", emoji: "🛍", tag: "food", dist: "шаттл 12 мин", dur: "2 часа", age: "0+", price: "переменно", subtitle: "Аутлет с детскими брендами. Игровая зона для малышей.", addr: "3 Cours de la Garonne, Serris", open: "Пн–Вс 10:00–20:00", kid: "Это место с магазинами, где покупают одежду и игрушки. Тебе купят что-то одно!", tip: "Бесплатный шаттл от Adagio. Есть детская комната для смены памперса.", lng: 2.7841, lat: 48.8495 },
      { id: "p5", name: "Эйфелева башня (быстрая поездка)", emoji: "🗼", tag: "wow", dist: "RER A · 45 мин", dur: "4 часа", age: "5+", price: "€80 семья", subtitle: "Только для Артёма и Софьи. Один взрослый с Лёвой остаётся в Adagio.", addr: "Champ de Mars, Paris", open: "Пн–Вс 09:00–23:45", kid: "Артём, это самая высокая башня в мире, мы поднимемся на лифте на самый верх!", tip: "РАЗДЕЛЕНИЕ СЕМЬИ. Один день, без Лёвы. Подъём только на 2-й этаж — очередь меньше.", lng: 2.2945, lat: 48.8584 },
      { id: "p6", name: "Chez Rémy (Disney Studios)", emoji: "🍝", tag: "food", dist: "10 мин шаттл", dur: "1 час", age: "0+", price: "€95 на 5", subtitle: "Внутри парка, тематика «Рататуй». Бронь обязательна.", addr: "Walt Disney Studios Park", open: "12:00–22:00", kid: "Софья, помнишь крысёныша Реми? Мы будем есть в его ресторане, как маленькие мышки!", tip: "Бронь за 2 месяца! Если не забронировано — Earl of Sandwich в Disney Village без очереди.", lng: 2.7803, lat: 48.8682 },
    ],
    days: [
      { date: "12 мая, вт", label: "Disneyland Park", items: [
        { time: "08:30", kind: "transit", text: "Шаттл Adagio → Disneyland (раннее открытие)" },
        { time: "09:00", kind: "place", text: "Disneyland Park: Fantasyland", placeId: "p1" },
        { time: "12:15", kind: "transit", text: "Шаттл назад в Adagio" },
        { time: "13:00", kind: "nap", text: "Сон Лёвы" },
        { time: "15:30", kind: "place", text: "Aquarium Sea Life · 1.5 ч", placeId: "p3" },
        { time: "18:00", kind: "food", text: "Ужин: Earl of Sandwich (Disney Village)" },
      ]},
      { date: "13 мая, ср", label: "Walt Disney Studios", items: [
        { time: "09:00", kind: "place", text: "Walt Disney Studios · Toy Story Land", placeId: "p2" },
        { time: "12:00", kind: "food", text: "Chez Rémy (бронь 12:00)", placeId: "p6" },
        { time: "12:45", kind: "transit", text: "Шаттл в Adagio" },
        { time: "13:00", kind: "nap", text: "Сон Лёвы" },
        { time: "15:30", kind: "walk", text: "La Vallée Village · детская зона", placeId: "p4" },
      ]},
      { date: "14 мая, чт", label: "Париж (раздельно)", items: [
        { time: "08:30", kind: "transit", text: "Папа + Артём + Софья: RER A → Paris Châtelet" },
        { time: "10:00", kind: "place", text: "Эйфелева башня, 2-й этаж", placeId: "p5" },
        { time: "13:00", kind: "nap", text: "Лёва спит дома с мамой" },
        { time: "14:30", kind: "food", text: "Обед в Café de l'Homme (с видом)" },
        { time: "17:00", kind: "transit", text: "RER A назад в Serris" },
      ]},
      { date: "15 мая, пт", label: "Disney повтор", items: [
        { time: "09:00", kind: "place", text: "Disneyland: повтор любимого + парад", placeId: "p1" },
        { time: "12:30", kind: "transit", text: "Шаттл в Adagio" },
        { time: "13:00", kind: "nap", text: "Сон Лёвы" },
        { time: "16:00", kind: "place", text: "Disneyland: парад принцесс 17:00", placeId: "p1" },
        { time: "20:00", kind: "rest", text: "Сборы чемодана" },
      ]},
      { date: "16 мая, сб", label: "Перелёт в Биллунн", items: [
        { time: "10:00", kind: "taxi", text: "Adagio → CDG (€85, 50 мин)" },
        { time: "13:00", kind: "flight", text: "AF 5478 CDG → BLL (конфликт со сном!)" },
        { time: "15:30", kind: "taxi", text: "BLL → Lalandia Billund (10 мин)" },
        { time: "16:30", kind: "rest", text: "Заселение в Lalandia коттедж" },
      ]},
    ],
  },
  billund: {
    stay: { name: "Lalandia Billund (коттедж)", addr: "Ellehammers Allé 3, Биллунн", metro: "5 мин до Леголенда", lng: 9.1187, lat: 55.7335 },
    places: [
      { id: "l1", name: "Legoland Billund", emoji: "🧱", tag: "wow", dist: "5 мин на велосипеде", dur: "6 часов", age: "3+", price: "€280 семья", subtitle: "Оригинальный Леголенд 1968 года. Miniland, аттракционы для малышей.", addr: "Nordmarksvej 9, Биллунн", open: "Апр–окт 10:00–20:00", kid: "Артём, тут самые большие в мире модели из лего! Целые города. И настоящие аттракционы.", tip: "Купите билет на 2 дня (+€20) — за один не успеть. Лёва катается с 3 лет почти везде.", lng: 9.1278, lat: 55.7355 },
      { id: "l2", name: "Lego House", emoji: "🏠", tag: "science", dist: "10 мин на машине", dur: "4 часа", age: "4+", price: "€95 семья", subtitle: "4 этажа, 25 млн лего-кирпичей. Зоны Creative, Cognitive, Emotional.", addr: "Ole Kirks Plads 1, Биллунн", open: "Пн–Вс 10:00–18:00", kid: "Софья, тут можно построить ВСЁ из лего! И есть ресторан, где еду тебе принесут роботы.", tip: "На дождь — идеально. Полностью крытый. Mini Chef ресторан — заказ через лего.", lng: 9.1158, lat: 55.7363 },
      { id: "l3", name: "Aquadome (Lalandia)", emoji: "🌊", tag: "kids", dist: "на территории", dur: "3 часа", age: "0+", price: "входит в коттедж", subtitle: "Крупнейший крытый аквапарк в Дании. Внутри курорта.", addr: "Lalandia Resort", open: "10:00–21:00", kid: "Лёва, это огромный бассейн с горками и волнами, прямо в нашем доме!", tip: "Не нужно никуда ехать — критично с режимом сна. Лучшее время 10:30 и 16:00.", lng: 9.1175, lat: 55.7349 },
      { id: "l4", name: "Givskud Zoo (сафари)", emoji: "🦒", tag: "wow", dist: "20 мин на машине", dur: "4 часа", age: "0+", price: "€120 семья", subtitle: "Драйв-сафари — звери приходят к машине. Слоны, львы.", addr: "Løveparkvej 3, Givskud", open: "Май–сен 10:00–17:00", kid: "Лёва, мы поедем туда, где живут настоящие львы и слоны, и они подойдут к машине!", tip: "Аренда машины обязательна. Не выходите из машины в зоне хищников.", lng: 9.2306, lat: 55.8311 },
      { id: "l5", name: "WOW Park", emoji: "🌲", tag: "kids", dist: "30 мин на машине", dur: "3 часа", age: "3+", price: "€85 семья", subtitle: "Лесной парк с верёвочными мостами и горками.", addr: "Frydendalvej 23, Lille Engesvang", open: "Апр–окт 10:00–17:00", kid: "Тут можно лазать по деревьям и кататься с огромных горок прямо в лесу!", tip: "Лёва ограничен — много активностей с 4 лет. Запасная одежда обязательна.", lng: 9.3499, lat: 56.0327 },
    ],
    days: [
      { date: "17 мая, вс", label: "Legoland", items: [
        { time: "09:30", kind: "walk", text: "Велосипед Lalandia → Legoland (5 мин)" },
        { time: "10:00", kind: "place", text: "Legoland: Duplo Land + Miniland", placeId: "l1" },
        { time: "12:30", kind: "walk", text: "Возврат в коттедж" },
        { time: "13:00", kind: "nap", text: "Сон Лёвы" },
        { time: "15:30", kind: "place", text: "Aquadome (на территории!)", placeId: "l3" },
        { time: "18:30", kind: "food", text: "Lalandia food court" },
      ]},
      { date: "18 мая, пн", label: "Lego House + Legoland", items: [
        { time: "10:00", kind: "place", text: "Lego House (Mini Chef обед)", placeId: "l2" },
        { time: "12:30", kind: "taxi", text: "Назад в Lalandia (€12)" },
        { time: "13:00", kind: "nap", text: "Сон Лёвы" },
        { time: "15:30", kind: "place", text: "Legoland: повтор + аттракционы", placeId: "l1" },
      ]},
      { date: "19 мая, вт", label: "В Амстердам", items: [
        { time: "08:00", kind: "taxi", text: "Lalandia → BLL (€20)" },
        { time: "10:30", kind: "flight", text: "KL 1342 BLL → AMS (1ч 20м)" },
        { time: "13:00", kind: "nap", text: "Сон Лёвы (в самолёте/такси)" },
        { time: "14:00", kind: "taxi", text: "AMS → Volkshotel (€55)" },
        { time: "15:30", kind: "rest", text: "Заселение" },
      ]},
    ],
  },
  amsterdam: {
    stay: { name: "Volkshotel Amsterdam", addr: "Wibautstraat 150", metro: "M51/M53 Wibautstraat", lng: 4.9106, lat: 52.3556 },
    places: [
      { id: "a1", name: "NEMO Science Museum", emoji: "🔬", tag: "science", dist: "M52 · 18 мин", dur: "3 часа", age: "4+", price: "€68 семья", subtitle: "Зелёное здание-корабль. 5 этажей интерактивной науки.", addr: "Oosterdok 2", open: "Вт–Вс 10:00–17:30", kid: "Артём, тут можно делать настоящие научные эксперименты! Молнии, мыльные пузыри, химия!", tip: "Крыша бесплатна — лучший вид на город. Кафе наверху без очередей до 12.", lng: 4.9123, lat: 52.3741 },
      { id: "a2", name: "Vondelpark + Kinderkookkafé", emoji: "🌳", tag: "kids", dist: "15 мин на трамвае", dur: "2 часа", age: "0+", price: "бесплатно", subtitle: "Главный парк. Игровая площадка. Кафе, где дети сами готовят.", addr: "Vondelpark 6c", open: "Парк всегда", kid: "Софья, в этом парке можно поиграть на огромной площадке, а потом самой приготовить пиццу в кафе!", tip: "Kinderkookkafé — бронь онлайн. 2 часа: дети готовят, родители в саду.", lng: 4.8678, lat: 52.3579 },
      { id: "a3", name: "Каналы — детский кораблик", emoji: "🚤", tag: "wow", dist: "20 мин на метро", dur: "1.5 часа", age: "2+", price: "€72 семья", subtitle: "Электрический бот по каналам. Без громких комментаторов.", addr: "Anne Frank pier", open: "Каждый час 10:00–18:00", kid: "Лёва, мы поплывём по реке прямо в городе, и будем смотреть на разноцветные дома!", tip: "Закрытый бот в дождь, открытый в солнце. Спасжилеты для детей бесплатно.", lng: 4.8838, lat: 52.3752 },
      { id: "a4", name: "Artis Royal Zoo", emoji: "🦓", tag: "wow", dist: "M51 · 12 мин", dur: "4 часа", age: "0+", price: "€85 семья", subtitle: "Один из старейших зоопарков Европы. Детская ферма + планетарий.", addr: "Plantage Kerklaan 38–40", open: "Пн–Вс 09:00–17:00", kid: "Тут пингвины, бабочки в саду и можно погладить коз на ферме!", tip: "Идите утром — пингвины активны до 11. Карта Iamsterdam = -20%.", lng: 4.9165, lat: 52.3666 },
      { id: "a5", name: "Pannenkoekenhuis Upstairs", emoji: "🥞", tag: "food", dist: "10 мин пешком", dur: "1 час", age: "0+", price: "€42 на 5", subtitle: "Самые маленькие блины Амстердама на самой узкой лестнице.", addr: "Grimburgwal 2", open: "Чт–Вс 12:00–18:00", kid: "Это секретное кафе на крутой лестнице, где делают самые маленькие блинчики в мире!", tip: "Лестница КРУТАЯ — Лёву на руках. Бронь обязательна — 4 столика всего.", lng: 4.892, lat: 52.3697 },
    ],
    days: [
      { date: "20 мая, ср", label: "Каналы + Vondelpark", items: [
        { time: "09:30", kind: "transit", text: "Метро M52 → Anne Frank" },
        { time: "10:00", kind: "place", text: "Кораблик по каналам · 1.5ч", placeId: "a3" },
        { time: "12:00", kind: "taxi", text: "Назад в Volkshotel" },
        { time: "13:00", kind: "nap", text: "Сон Лёвы" },
        { time: "15:30", kind: "place", text: "Vondelpark + игровая", placeId: "a2" },
      ]},
      { date: "21 мая, чт", label: "NEMO + Artis", items: [
        { time: "09:30", kind: "transit", text: "M52 → NEMO Science" },
        { time: "10:00", kind: "place", text: "NEMO Science Museum", placeId: "a1" },
        { time: "12:30", kind: "taxi", text: "В Volkshotel (€12)" },
        { time: "13:00", kind: "nap", text: "Сон Лёвы" },
        { time: "15:30", kind: "place", text: "Artis Zoo · ферма + планетарий", placeId: "a4" },
        { time: "18:30", kind: "food", text: "Pannenkoekenhuis Upstairs (бронь)", placeId: "a5" },
      ]},
      { date: "22 мая, пт", label: "Возврат домой", items: [
        { time: "10:00", kind: "walk", text: "Прогулка вокруг отеля" },
        { time: "13:00", kind: "nap", text: "Последний дневной сон Лёвы" },
        { time: "15:00", kind: "taxi", text: "Volkshotel → AMS (€55, заранее!)" },
        { time: "17:45", kind: "flight", text: "KL 1276 AMS → KIV" },
      ]},
    ],
  },
};

export function cityById(id: string): City | undefined {
  return TRIP.cities.find(c => c.id === id);
}

export function cityData(id: CityId): CityData {
  return TRIP[id];
}

export function placeById(cityId: CityId, placeId: string): Place | undefined {
  return TRIP[cityId].places.find(p => p.id === placeId);
}

export function allDays(): Array<Day & { cityId: CityId; cityName: string; cityColor: string }> {
  const out: Array<Day & { cityId: CityId; cityName: string; cityColor: string }> = [];
  TRIP.cities.forEach(c => {
    TRIP[c.id].days.forEach(d => out.push({ ...d, cityId: c.id, cityName: c.name, cityColor: c.color }));
  });
  return out;
}
