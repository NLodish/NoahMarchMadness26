import { randomUUID } from "crypto";
import type {
  TraderProfile,
  TradePosition,
  TradeHistory,
  CreateTrader,
  PlaceTrade,
  ClosePosition,
} from "@shared/schema";

// Legacy user types for compatibility
export type User = { id: string; username: string; password: string };
export type InsertUser = { username: string; password: string };

export interface IStorage {
  // Trader profiles
  getAllTraders(): Promise<TraderProfile[]>;
  getTrader(id: string): Promise<TraderProfile | undefined>;
  createTrader(data: CreateTrader): Promise<TraderProfile>;
  placeTrade(traderId: string, trade: PlaceTrade): Promise<TradePosition>;
  closePosition(traderId: string, data: ClosePosition): Promise<TradeHistory>;
}

export class MemStorage implements IStorage {
  private traders: Map<string, TraderProfile> = new Map();

  constructor() {
    // Seed some demo traders
    this._seedDemoTraders();
  }

  private _seedDemoTraders() {
    const demoTraders: TraderProfile[] = [
      {
        id: "trader-noah",
        name: "Noah (Demo)",
        balance: 10000.00,
        positions: [],
        history: [],
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "trader-bracket-buster",
        name: "BracketBuster99",
        balance: 10000.00,
        positions: [],
        history: [],
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "trader-hoop-dreams",
        name: "HoopDreams",
        balance: 10000.00,
        positions: [],
        history: [],
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];
    demoTraders.forEach(t => this.traders.set(t.id, t));
  }

  async getAllTraders(): Promise<TraderProfile[]> {
    return Array.from(this.traders.values()).sort(
      (a, b) => this._totalPnl(b) - this._totalPnl(a)
    );
  }

  async getTrader(id: string): Promise<TraderProfile | undefined> {
    return this.traders.get(id);
  }

  async createTrader(data: CreateTrader): Promise<TraderProfile> {
    const trader: TraderProfile = {
      id: randomUUID(),
      name: data.name,
      balance: 10000,
      positions: [],
      history: [],
      createdAt: new Date().toISOString(),
    };
    this.traders.set(trader.id, trader);
    return trader;
  }

  async placeTrade(traderId: string, trade: PlaceTrade): Promise<TradePosition> {
    const trader = this.traders.get(traderId);
    if (!trader) throw new Error("Trader not found");
    if (trader.balance < trade.amount) throw new Error("Insufficient balance");

    const position: TradePosition = {
      id: randomUUID(),
      market: trade.market,
      side: trade.side,
      amount: trade.amount,
      entryPrice: trade.entryPrice,
      currentPrice: trade.entryPrice,
      status: "open",
      openedAt: new Date().toISOString(),
    };

    trader.balance -= trade.amount;
    trader.positions.push(position);
    this.traders.set(traderId, trader);
    return position;
  }

  async closePosition(traderId: string, data: ClosePosition): Promise<TradeHistory> {
    const trader = this.traders.get(traderId);
    if (!trader) throw new Error("Trader not found");

    const posIdx = trader.positions.findIndex(p => p.id === data.positionId);
    if (posIdx === -1) throw new Error("Position not found");

    const position = trader.positions[posIdx];
    const exitPrice = data.exitPrice;

    // Calculate P&L: shares * (exitPrice - entryPrice) * (1/entryPrice)
    const shares = position.amount / position.entryPrice;
    const pnl = shares * (exitPrice - position.entryPrice);
    const returnedCapital = position.amount + pnl;

    const historyEntry: TradeHistory = {
      id: randomUUID(),
      market: position.market,
      side: position.side,
      amount: position.amount,
      entryPrice: position.entryPrice,
      exitPrice,
      pnl,
      closedAt: new Date().toISOString(),
    };

    trader.positions.splice(posIdx, 1);
    trader.balance += Math.max(0, returnedCapital);
    trader.history.unshift(historyEntry);
    this.traders.set(traderId, trader);
    return historyEntry;
  }

  private _totalPnl(trader: TraderProfile): number {
    const historyPnl = trader.history.reduce((sum, h) => sum + h.pnl, 0);
    const openPnl = trader.positions.reduce((sum, p) => {
      const shares = p.amount / p.entryPrice;
      return sum + shares * (p.currentPrice - p.entryPrice);
    }, 0);
    return historyPnl + openPnl;
  }
}

export const storage = new MemStorage();
