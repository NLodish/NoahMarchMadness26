import { z } from "zod";

// Trading profile types - stored in-memory on server
export interface TradePosition {
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

export interface TradeHistory {
  id: string;
  market: string;
  side: "YES" | "NO";
  amount: number;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  closedAt: string;
}

export interface TraderProfile {
  id: string;
  name: string;
  balance: number;
  positions: TradePosition[];
  history: TradeHistory[];
  createdAt: string;
}

// Zod schemas for validation
export const createTraderSchema = z.object({
  name: z.string().min(2).max(50),
});

export const placeTradeSchema = z.object({
  market: z.string().min(1),
  side: z.enum(["YES", "NO"]),
  amount: z.number().min(1).max(100000),
  entryPrice: z.number().min(0).max(1),
});

export const closePositionSchema = z.object({
  positionId: z.string().min(1),
  exitPrice: z.number().min(0).max(1),
});

export type CreateTrader = z.infer<typeof createTraderSchema>;
export type PlaceTrade = z.infer<typeof placeTradeSchema>;
export type ClosePosition = z.infer<typeof closePositionSchema>;

// Keep legacy user types for compatibility
export const users = {
  $inferSelect: {} as { id: string; username: string; password: string },
};
export type User = { id: string; username: string; password: string };
export type InsertUser = { username: string; password: string };
