import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { createTraderSchema, placeTradeSchema, closePositionSchema } from "@shared/schema";

const ODDS_API_KEY = "82cd55dff55ba66ac828a859097c705c";
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
    if (!res.ok) {
      console.warn(`[${label}] HTTP ${res.status} from ${url}`);
      return null;
    }
    return await res.json();
  } catch (err: any) {
    console.warn(`[${label}] Error: ${err.message}`);
    return null;
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // ============ NCAA Scores ============
  app.get("/api/scores", async (req, res) => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    const url = `${NCAA_API_BASE}/scoreboard/basketball-men/d1/${y}/${m}/${d}`;
    const data = await safeFetch(url, "NCAA scores");
    if (data) {
      res.json(data);
    } else {
      // Return demo data when API is unavailable
      res.json(getDemoScores());
    }
  });

  app.get("/api/scores/:date", async (req, res) => {
    const { date } = req.params;
    const [y, m, d] = date.split("-");
    const url = `${NCAA_API_BASE}/scoreboard/basketball-men/d1/${y}/${m}/${d}`;
    const data = await safeFetch(url, "NCAA scores by date");
    if (data) {
      res.json(data);
    } else {
      res.json(getDemoScores());
    }
  });

  app.get("/api/game/:gameId", async (req, res) => {
    const { gameId } = req.params;
    const url = `${NCAA_API_BASE}/game/${gameId}`;
    const data = await safeFetch(url, "NCAA game detail");
    if (data) {
      res.json(data);
    } else {
      res.json({ error: "Game data unavailable", demo: true });
    }
  });

  // ============ Polymarket ============
  app.get("/api/polymarket/events", async (req, res) => {
    const url = `${POLYMARKET_GAMMA_BASE}/events?tag=ncaa&active=true&closed=false&limit=50`;
    const data = await safeFetch(url, "Polymarket events");
    if (data) {
      res.json(data);
    } else {
      // Try alternate endpoint
      const url2 = `${POLYMARKET_GAMMA_BASE}/markets?active=true&closed=false&limit=50`;
      const data2 = await safeFetch(url2, "Polymarket markets");
      if (data2) {
        res.json({ markets: data2, source: "markets" });
      } else {
        res.json(getDemoPolymarketEvents());
      }
    }
  });

  app.get("/api/polymarket/prices", async (req, res) => {
    const { token_ids } = req.query;
    if (!token_ids) {
      return res.json({ prices: [] });
    }
    const url = `${POLYMARKET_CLOB_BASE}/prices?token_ids=${token_ids}`;
    const data = await safeFetch(url, "Polymarket prices");
    if (data) {
      res.json(data);
    } else {
      res.json({ prices: getDemoPrices() });
    }
  });

  // ============ The Odds API ============
  app.get("/api/odds", async (req, res) => {
    const url = `${ODDS_API_BASE}/sports/basketball_ncaab/odds?regions=us&markets=h2h,spreads,totals&oddsFormat=american&apiKey=${ODDS_API_KEY}`;
    const data = await safeFetch(url, "Odds API");
    if (data && !data.message) {
      res.json(data);
    } else {
      res.json(getDemoOdds());
    }
  });

  app.get("/api/odds/events", async (req, res) => {
    const url = `${ODDS_API_BASE}/sports/basketball_ncaab/events?apiKey=${ODDS_API_KEY}`;
    const data = await safeFetch(url, "Odds events");
    if (data && !data.message) {
      res.json(data);
    } else {
      res.json([]);
    }
  });

  // ============ Teams ============
  app.get("/api/teams", async (_req, res) => {
    // Teams are in teamData.ts on frontend, but we expose an endpoint for API consistency
    res.json({ message: "Teams available in teamData.ts", count: 68 });
  });

  // ============ Trading API ============
  app.get("/api/traders", async (_req, res) => {
    try {
      const traders = await storage.getAllTraders();
      res.json(traders);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/traders", async (req, res) => {
    try {
      const parsed = createTraderSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.issues });
      }
      const trader = await storage.createTrader(parsed.data);
      res.status(201).json(trader);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/traders/:id", async (req, res) => {
    try {
      const trader = await storage.getTrader(req.params.id);
      if (!trader) return res.status(404).json({ error: "Trader not found" });
      res.json(trader);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/traders/:id/trade", async (req, res) => {
    try {
      const parsed = placeTradeSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.issues });
      }
      const position = await storage.placeTrade(req.params.id, parsed.data);
      res.status(201).json(position);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.post("/api/traders/:id/close", async (req, res) => {
    try {
      const parsed = closePositionSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.issues });
      }
      const history = await storage.closePosition(req.params.id, parsed.data);
      res.json(history);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  return httpServer;
}

// ============ Demo / Fallback Data ============
function getDemoScores() {
  const now = new Date().toISOString();
  return {
    games: [
      {
        gameID: "demo-1",
        away: { names: { full: "Duke Blue Devils" }, seed: "1", score: "82" },
        home: { names: { full: "Longwood Lancers" }, seed: "16", score: "54" },
        gameState: "final",
        startTimeEpoch: new Date(Date.now() - 2 * 60 * 60 * 1000).getTime() / 1000,
        network: "CBS",
        label: "East 1 vs 16",
        currentPeriod: "2nd Half",
      },
      {
        gameID: "demo-2",
        away: { names: { full: "Auburn Tigers" }, seed: "1", score: "71" },
        home: { names: { full: "Alabama State Hornets" }, seed: "16", score: "43" },
        gameState: "final",
        startTimeEpoch: new Date(Date.now() - 3 * 60 * 60 * 1000).getTime() / 1000,
        network: "TBS",
        label: "South 1 vs 16",
        currentPeriod: "Final",
      },
      {
        gameID: "demo-3",
        away: { names: { full: "Kansas State Wildcats" }, seed: "1", score: "68" },
        home: { names: { full: "Bethune-Cookman Wildcats" }, seed: "16", score: "51" },
        gameState: "live",
        startTimeEpoch: new Date(Date.now() - 60 * 60 * 1000).getTime() / 1000,
        network: "TNT",
        label: "Midwest 1 vs 16",
        currentPeriod: "2nd Half 12:34",
      },
      {
        gameID: "demo-4",
        away: { names: { full: "Arizona Wildcats" }, seed: "1", score: "" },
        home: { names: { full: "St. Francis Terriers" }, seed: "16", score: "" },
        gameState: "upcoming",
        startTimeEpoch: new Date(Date.now() + 2 * 60 * 60 * 1000).getTime() / 1000,
        network: "ESPN",
        label: "West 1 vs 16",
        currentPeriod: "",
      },
      {
        gameID: "demo-5",
        away: { names: { full: "Kentucky Wildcats" }, seed: "2", score: "" },
        home: { names: { full: "Vermont Catamounts" }, seed: "15", score: "" },
        gameState: "upcoming",
        startTimeEpoch: new Date(Date.now() + 3.5 * 60 * 60 * 1000).getTime() / 1000,
        network: "TBS",
        label: "East 2 vs 15",
        currentPeriod: "",
      },
    ],
    demo: true,
  };
}

function getDemoPolymarketEvents() {
  return {
    events: [
      {
        id: "pm-1",
        title: "Auburn to Win National Championship",
        probability: 0.14,
        volume: 485200,
        markets: [{ id: "pm-1a", outcomePrices: [0.14, 0.86] }],
      },
      {
        id: "pm-2",
        title: "Duke Blue Devils to Win National Championship",
        probability: 0.18,
        volume: 612400,
        markets: [{ id: "pm-2a", outcomePrices: [0.18, 0.82] }],
      },
      {
        id: "pm-3",
        title: "Kansas State to Win National Championship",
        probability: 0.11,
        volume: 324100,
        markets: [{ id: "pm-3a", outcomePrices: [0.11, 0.89] }],
      },
      {
        id: "pm-4",
        title: "Houston to Win National Championship",
        probability: 0.09,
        volume: 298700,
        markets: [{ id: "pm-4a", outcomePrices: [0.09, 0.91] }],
      },
      {
        id: "pm-5",
        title: "St. John's to Win National Championship",
        probability: 0.07,
        volume: 187300,
        markets: [{ id: "pm-5a", outcomePrices: [0.07, 0.93] }],
      },
      {
        id: "pm-6",
        title: "Tennessee to Reach Final Four",
        probability: 0.28,
        volume: 156800,
        markets: [{ id: "pm-6a", outcomePrices: [0.28, 0.72] }],
      },
      {
        id: "pm-7",
        title: "12-Seed to Beat 5-Seed (South Region)",
        probability: 0.34,
        volume: 89400,
        markets: [{ id: "pm-7a", outcomePrices: [0.34, 0.66] }],
      },
      {
        id: "pm-8",
        title: "Oral Roberts to Win First Round",
        probability: 0.29,
        volume: 54200,
        markets: [{ id: "pm-8a", outcomePrices: [0.29, 0.71] }],
      },
    ],
    demo: true,
  };
}

function getDemoPrices() {
  return [
    { tokenId: "demo-1", price: 0.14 },
    { tokenId: "demo-2", price: 0.18 },
    { tokenId: "demo-3", price: 0.09 },
  ];
}

function getDemoOdds() {
  return [
    {
      id: "odds-demo-1",
      sport_key: "basketball_ncaab",
      home_team: "Duke Blue Devils",
      away_team: "Longwood Lancers",
      commence_time: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
      bookmakers: [
        {
          key: "draftkings",
          title: "DraftKings",
          markets: [
            {
              key: "h2h",
              outcomes: [
                { name: "Duke Blue Devils", price: -2800 },
                { name: "Longwood Lancers", price: +1600 },
              ],
            },
            {
              key: "spreads",
              outcomes: [
                { name: "Duke Blue Devils", price: -110, point: -24.5 },
                { name: "Longwood Lancers", price: -110, point: +24.5 },
              ],
            },
          ],
        },
        {
          key: "fanduel",
          title: "FanDuel",
          markets: [
            {
              key: "h2h",
              outcomes: [
                { name: "Duke Blue Devils", price: -2600 },
                { name: "Longwood Lancers", price: +1400 },
              ],
            },
            {
              key: "spreads",
              outcomes: [
                { name: "Duke Blue Devils", price: -108, point: -25.0 },
                { name: "Longwood Lancers", price: -112, point: +25.0 },
              ],
            },
          ],
        },
        {
          key: "betmgm",
          title: "BetMGM",
          markets: [
            {
              key: "h2h",
              outcomes: [
                { name: "Duke Blue Devils", price: -3000 },
                { name: "Longwood Lancers", price: +1800 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "odds-demo-2",
      sport_key: "basketball_ncaab",
      home_team: "Auburn Tigers",
      away_team: "Alabama State Hornets",
      commence_time: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
      bookmakers: [
        {
          key: "draftkings",
          title: "DraftKings",
          markets: [
            {
              key: "h2h",
              outcomes: [
                { name: "Auburn Tigers", price: -3500 },
                { name: "Alabama State Hornets", price: +2000 },
              ],
            },
            {
              key: "spreads",
              outcomes: [
                { name: "Auburn Tigers", price: -110, point: -28.5 },
                { name: "Alabama State Hornets", price: -110, point: +28.5 },
              ],
            },
          ],
        },
        {
          key: "fanduel",
          title: "FanDuel",
          markets: [
            {
              key: "h2h",
              outcomes: [
                { name: "Auburn Tigers", price: -3200 },
                { name: "Alabama State Hornets", price: +1900 },
              ],
            },
          ],
        },
        {
          key: "betmgm",
          title: "BetMGM",
          markets: [
            {
              key: "h2h",
              outcomes: [
                { name: "Auburn Tigers", price: -4000 },
                { name: "Alabama State Hornets", price: +2400 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "odds-demo-3",
      sport_key: "basketball_ncaab",
      home_team: "Kansas State Wildcats",
      away_team: "Bethune-Cookman Wildcats",
      commence_time: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
      bookmakers: [
        {
          key: "draftkings",
          title: "DraftKings",
          markets: [
            {
              key: "h2h",
              outcomes: [
                { name: "Kansas State Wildcats", price: -2500 },
                { name: "Bethune-Cookman Wildcats", price: +1400 },
              ],
            },
            {
              key: "spreads",
              outcomes: [
                { name: "Kansas State Wildcats", price: -110, point: -22.5 },
                { name: "Bethune-Cookman Wildcats", price: -110, point: +22.5 },
              ],
            },
          ],
        },
        {
          key: "fanduel",
          title: "FanDuel",
          markets: [
            {
              key: "h2h",
              outcomes: [
                { name: "Kansas State Wildcats", price: -2400 },
                { name: "Bethune-Cookman Wildcats", price: +1350 },
              ],
            },
          ],
        },
        {
          key: "betmgm",
          title: "BetMGM",
          markets: [
            {
              key: "h2h",
              outcomes: [
                { name: "Kansas State Wildcats", price: -2800 },
                { name: "Bethune-Cookman Wildcats", price: +1600 },
              ],
            },
          ],
        },
      ],
    },
  ];
}
