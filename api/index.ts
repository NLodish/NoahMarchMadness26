import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { randomUUID } from "crypto";
import { z } from "zod";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ============ Types & Schemas ============

interface TradePosition {
  id: string;
  market: string;
  side: "YES" | "NO";
  amount: number;
  entryPrice: number;
  currentPrice: number;
  status: "open" | "closed";
  openedAt: string;
  closedAt?: string;
  pnl?: number;
}

interface TradeHistory {
  id: string;
  market: string;
  side: "YES" | "NO";
  amount: number;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  closedAt: string;
}

interface TraderProfile {
  id: string;
  name: string;
  balance: number;
  positions: TradePosition[];
  history: TradeHistory[];
  createdAt: string;
}

const createTraderSchema = z.object({ name: z.string().min(2).max(50) });
const placeTradeSchema = z.object({
  market: z.string().min(1),
  side: z.enum(["YES", "NO"]),
  amount: z.number().min(1).max(100000),
  entryPrice: z.number().min(0).max(1),
});
const closePositionSchema = z.object({
  positionId: z.string().min(1),
  exitPrice: z.number().min(0).max(1),
});

// ============ In-memory Storage ============

const traders: Map<string, TraderProfile> = new Map();

function totalPnl(trader: TraderProfile): number {
  const historyPnl = trader.history.reduce((sum, h) => sum + h.pnl, 0);
  const openPnl = trader.positions.reduce((sum, p) => {
    const shares = p.amount / p.entryPrice;
    return sum + shares * (p.currentPrice - p.entryPrice);
  }, 0);
  return historyPnl + openPnl;
}

// Seed demo traders
function seedTraders() {
  if (traders.size > 0) return;
  const demoTraders: TraderProfile[] = [
    {
      id: "trader-noah", name: "Noah (Demo)", balance: 10000,
      positions: [],
      history: [],
      createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    },
    {
      id: "trader-bracket-buster", name: "BracketBuster99", balance: 10000,
      positions: [],
      history: [],
      createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
    },
    {
      id: "trader-hoop-dreams", name: "HoopDreams", balance: 10000,
      positions: [],
      history: [],
      createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    },
  ];
  demoTraders.forEach(t => traders.set(t.id, t));
}

seedTraders();

// ============ API Constants ============

const ODDS_API_KEY = process.env.ODDS_API_KEY || "82cd55dff55ba66ac828a859097c705c";
const NCAA_API_BASE = "https://ncaa-api.henrygd.me";
const POLYMARKET_GAMMA_BASE = "https://gamma-api.polymarket.com";
const POLYMARKET_CLOB_BASE = "https://clob.polymarket.com";
const ODDS_API_BASE = "https://api.the-odds-api.com/v4";

async function safeFetch(url: string, label: string) {
  try {
    const res = await fetch(url, {
      headers: { "Accept": "application/json", "User-Agent": "MarchMadness2026App/1.0" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) { console.warn(`[${label}] HTTP ${res.status}`); return null; }
    return await res.json();
  } catch (err: any) {
    console.warn(`[${label}] Error: ${err.message}`);
    return null;
  }
}

// ============ Demo Data ============

function getDemoScores() {
  return {
    games: [
      { gameID: "demo-1", away: { names: { full: "Duke Blue Devils" }, seed: "1", score: "84" }, home: { names: { full: "Siena Saints" }, seed: "16", score: "56" }, gameState: "final", startTimeEpoch: (Date.now() - 7200000) / 1000, network: "CBS", label: "East Region · First Round", currentPeriod: "Final" },
      { gameID: "demo-2", away: { names: { full: "Florida Gators" }, seed: "1", score: "73" }, home: { names: { full: "Prairie View Panthers" }, seed: "16", score: "48" }, gameState: "final", startTimeEpoch: (Date.now() - 10800000) / 1000, network: "TBS", label: "South Region · First Round", currentPeriod: "Final" },
      { gameID: "demo-3", away: { names: { full: "Michigan Wolverines" }, seed: "1", score: "71" }, home: { names: { full: "UMBC Retrievers" }, seed: "16", score: "58" }, gameState: "live", startTimeEpoch: (Date.now() - 3600000) / 1000, network: "TNT", label: "Midwest Region · First Round", currentPeriod: "2nd Half 12:34" },
      { gameID: "demo-4", away: { names: { full: "Arizona Wildcats" }, seed: "1", score: "" }, home: { names: { full: "LIU Sharks" }, seed: "16", score: "" }, gameState: "upcoming", startTimeEpoch: (Date.now() + 7200000) / 1000, network: "ESPN", label: "West Region · First Round", currentPeriod: "" },
      { gameID: "demo-5", away: { names: { full: "UConn Huskies" }, seed: "2", score: "" }, home: { names: { full: "Furman Paladins" }, seed: "15", score: "" }, gameState: "upcoming", startTimeEpoch: (Date.now() + 12600000) / 1000, network: "TBS", label: "East Region · First Round", currentPeriod: "" },
    ],
    demo: true,
  };
}

function getDemoPolymarketEvents() {
  return {
    events: [
      { id: "pm-1", title: "Duke to Win National Championship", probability: 0.22, volume: 712400, markets: [{ id: "pm-1a", outcomePrices: [0.22, 0.78] }] },
      { id: "pm-2", title: "Arizona to Win National Championship", probability: 0.16, volume: 585200, markets: [{ id: "pm-2a", outcomePrices: [0.16, 0.84] }] },
      { id: "pm-3", title: "Michigan to Win National Championship", probability: 0.12, volume: 424100, markets: [{ id: "pm-3a", outcomePrices: [0.12, 0.88] }] },
      { id: "pm-4", title: "Houston to Win National Championship", probability: 0.10, volume: 398700, markets: [{ id: "pm-4a", outcomePrices: [0.10, 0.90] }] },
      { id: "pm-5", title: "Florida to Win National Championship", probability: 0.09, volume: 287300, markets: [{ id: "pm-5a", outcomePrices: [0.09, 0.91] }] },
      { id: "pm-6", title: "Gonzaga to Reach Final Four", probability: 0.32, volume: 186800, markets: [{ id: "pm-6a", outcomePrices: [0.32, 0.68] }] },
      { id: "pm-7", title: "12-Seed Upset in First Round (Any Region)", probability: 0.34, volume: 89400, markets: [{ id: "pm-7a", outcomePrices: [0.34, 0.66] }] },
      { id: "pm-8", title: "VCU to Beat North Carolina", probability: 0.31, volume: 64200, markets: [{ id: "pm-8a", outcomePrices: [0.31, 0.69] }] },
    ],
    demo: true,
  };
}

function getDemoOdds() {
  return [
    {
      id: "odds-demo-1", sport_key: "basketball_ncaab", home_team: "Duke Blue Devils", away_team: "Siena Saints",
      commence_time: new Date(Date.now() + 3600000).toISOString(),
      bookmakers: [
        { key: "draftkings", title: "DraftKings", markets: [{ key: "h2h", outcomes: [{ name: "Duke Blue Devils", price: -2800 }, { name: "Siena Saints", price: 1600 }] }, { key: "spreads", outcomes: [{ name: "Duke Blue Devils", price: -110, point: -24.5 }, { name: "Siena Saints", price: -110, point: 24.5 }] }] },
        { key: "fanduel", title: "FanDuel", markets: [{ key: "h2h", outcomes: [{ name: "Duke Blue Devils", price: -2600 }, { name: "Siena Saints", price: 1400 }] }] },
        { key: "betmgm", title: "BetMGM", markets: [{ key: "h2h", outcomes: [{ name: "Duke Blue Devils", price: -3000 }, { name: "Siena Saints", price: 1800 }] }] },
      ],
    },
    {
      id: "odds-demo-2", sport_key: "basketball_ncaab", home_team: "Florida Gators", away_team: "Prairie View Panthers",
      commence_time: new Date(Date.now() + 10800000).toISOString(),
      bookmakers: [
        { key: "draftkings", title: "DraftKings", markets: [{ key: "h2h", outcomes: [{ name: "Florida Gators", price: -3500 }, { name: "Prairie View Panthers", price: 2000 }] }] },
        { key: "fanduel", title: "FanDuel", markets: [{ key: "h2h", outcomes: [{ name: "Florida Gators", price: -3200 }, { name: "Prairie View Panthers", price: 1900 }] }] },
        { key: "betmgm", title: "BetMGM", markets: [{ key: "h2h", outcomes: [{ name: "Florida Gators", price: -4000 }, { name: "Prairie View Panthers", price: 2400 }] }] },
      ],
    },
  ];
}

// ============ Routes ============

// NCAA Scores
app.get("/api/scores", async (_req, res) => {
  const d = new Date();
  const url = `${NCAA_API_BASE}/scoreboard/basketball-men/d1/${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,"0")}/${String(d.getDate()).padStart(2,"0")}`;
  const data = await safeFetch(url, "NCAA scores");
  res.json(data || getDemoScores());
});

app.get("/api/scores/:date", async (req, res) => {
  const [y, m, d] = req.params.date.split("-");
  const data = await safeFetch(`${NCAA_API_BASE}/scoreboard/basketball-men/d1/${y}/${m}/${d}`, "NCAA scores");
  res.json(data || getDemoScores());
});

app.get("/api/game/:gameId", async (req, res) => {
  const data = await safeFetch(`${NCAA_API_BASE}/game/${req.params.gameId}`, "NCAA game");
  res.json(data || { error: "Game data unavailable", demo: true });
});

// Polymarket
app.get("/api/polymarket/events", async (_req, res) => {
  const data = await safeFetch(`${POLYMARKET_GAMMA_BASE}/events?tag=ncaa&active=true&closed=false&limit=50`, "Polymarket");
  if (data) return res.json(data);
  const data2 = await safeFetch(`${POLYMARKET_GAMMA_BASE}/markets?active=true&closed=false&limit=50`, "Polymarket markets");
  res.json(data2 ? { markets: data2, source: "markets" } : getDemoPolymarketEvents());
});

app.get("/api/polymarket/prices", async (req, res) => {
  const { token_ids } = req.query;
  if (!token_ids) return res.json({ prices: [] });
  const data = await safeFetch(`${POLYMARKET_CLOB_BASE}/prices?token_ids=${token_ids}`, "Polymarket prices");
  res.json(data || { prices: [] });
});

// Odds API
app.get("/api/odds", async (_req, res) => {
  const data = await safeFetch(`${ODDS_API_BASE}/sports/basketball_ncaab/odds?regions=us&markets=h2h,spreads,totals&oddsFormat=american&apiKey=${ODDS_API_KEY}`, "Odds API");
  res.json(data && !data.message ? data : getDemoOdds());
});

app.get("/api/odds/events", async (_req, res) => {
  const data = await safeFetch(`${ODDS_API_BASE}/sports/basketball_ncaab/events?apiKey=${ODDS_API_KEY}`, "Odds events");
  res.json(data && !data.message ? data : []);
});

// Teams
app.get("/api/teams", async (_req, res) => {
  res.json({ message: "Teams available in teamData.ts", count: 68 });
});

// Trading
app.get("/api/traders", async (_req, res) => {
  seedTraders();
  const all = Array.from(traders.values()).sort((a, b) => totalPnl(b) - totalPnl(a));
  res.json(all);
});

app.post("/api/traders", async (req, res) => {
  const parsed = createTraderSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues });
  const trader: TraderProfile = { id: randomUUID(), name: parsed.data.name, balance: 10000, positions: [], history: [], createdAt: new Date().toISOString() };
  traders.set(trader.id, trader);
  res.status(201).json(trader);
});

app.get("/api/traders/:id", async (req, res) => {
  const trader = traders.get(req.params.id);
  if (!trader) return res.status(404).json({ error: "Trader not found" });
  res.json(trader);
});

app.post("/api/traders/:id/trade", async (req, res) => {
  const parsed = placeTradeSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues });
  const trader = traders.get(req.params.id);
  if (!trader) return res.status(404).json({ error: "Trader not found" });
  if (trader.balance < parsed.data.amount) return res.status(400).json({ error: "Insufficient balance" });
  const position: TradePosition = { id: randomUUID(), market: parsed.data.market, side: parsed.data.side, amount: parsed.data.amount, entryPrice: parsed.data.entryPrice, currentPrice: parsed.data.entryPrice, status: "open", openedAt: new Date().toISOString() };
  trader.balance -= parsed.data.amount;
  trader.positions.push(position);
  res.status(201).json(position);
});

app.post("/api/traders/:id/close", async (req, res) => {
  const parsed = closePositionSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues });
  const trader = traders.get(req.params.id);
  if (!trader) return res.status(404).json({ error: "Trader not found" });
  const posIdx = trader.positions.findIndex(p => p.id === parsed.data.positionId);
  if (posIdx === -1) return res.status(400).json({ error: "Position not found" });
  const position = trader.positions[posIdx];
  const shares = position.amount / position.entryPrice;
  const pnl = shares * (parsed.data.exitPrice - position.entryPrice);
  const returnedCapital = position.amount + pnl;
  const historyEntry: TradeHistory = { id: randomUUID(), market: position.market, side: position.side, amount: position.amount, entryPrice: position.entryPrice, exitPrice: parsed.data.exitPrice, pnl, closedAt: new Date().toISOString() };
  trader.positions.splice(posIdx, 1);
  trader.balance += Math.max(0, returnedCapital);
  trader.history.unshift(historyEntry);
  res.json(historyEntry);
});

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (!res.headersSent) {
    res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
  }
});

export default app;
