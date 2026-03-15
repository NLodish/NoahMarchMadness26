import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  TrendingUp, TrendingDown, DollarSign, Trophy, Plus, X, BarChart2, User
} from "lucide-react";
import type { TraderProfile, TradePosition } from "@shared/schema";

const DEMO_MARKETS = [
  { id: "m1", title: "Duke to Win National Championship", probability: 0.18, volume: 612400 },
  { id: "m2", title: "Auburn to Win National Championship", probability: 0.14, volume: 485200 },
  { id: "m3", title: "Kansas State to Win National Championship", probability: 0.11, volume: 324100 },
  { id: "m4", title: "Houston to Win National Championship", probability: 0.09, volume: 298700 },
  { id: "m5", title: "St. John's to Win National Championship", probability: 0.07, volume: 187300 },
  { id: "m6", title: "Auburn to Win South Region", probability: 0.55, volume: 248600 },
  { id: "m7", title: "Duke to Win East Region", probability: 0.48, volume: 312400 },
  { id: "m8", title: "Kansas State to Win Midwest Region", probability: 0.42, volume: 198700 },
  { id: "m9", title: "Tennessee to Reach Final Four", probability: 0.28, volume: 156800 },
  { id: "m10", title: "McNeese to Upset Virginia (12 vs 5)", probability: 0.34, volume: 89400 },
  { id: "m11", title: "Oral Roberts to Win First Round", probability: 0.29, volume: 54200 },
  { id: "m12", title: "Yale to Upset Gonzaga (13 vs 4)", probability: 0.19, volume: 42100 },
];

function calcPnl(pos: TradePosition): number {
  const shares = pos.amount / pos.entryPrice;
  return shares * (pos.currentPrice - pos.entryPrice);
}

function calcTotalPnl(trader: TraderProfile): number {
  const histPnl = trader.history.reduce((s, h) => s + h.pnl, 0);
  const openPnl = trader.positions.reduce((s, p) => s + calcPnl(p), 0);
  return histPnl + openPnl;
}

function calcWinRate(trader: TraderProfile): number {
  const wins = trader.history.filter(h => h.pnl > 0).length;
  return trader.history.length > 0 ? (wins / trader.history.length) * 100 : 0;
}

function PnlDisplay({ pnl }: { pnl: number }) {
  const isPos = pnl >= 0;
  return (
    <span className={`font-semibold ${isPos ? "text-green-400" : "text-red-400"}`}>
      {isPos ? "+" : ""}${pnl.toFixed(2)}
    </span>
  );
}

export default function Trading() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [selectedTraderId, setSelectedTraderId] = useState<string | null>(null);
  const [newProfileName, setNewProfileName] = useState("");
  const [tradeMarket, setTradeMarket] = useState("");
  const [tradeSide, setTradeSide] = useState<"YES" | "NO">("YES");
  const [tradeAmount, setTradeAmount] = useState("100");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const { data: traders, isLoading } = useQuery<TraderProfile[]>({
    queryKey: ["/api/traders"],
    queryFn: () => apiRequest("/api/traders"),
  });

  const selectedTrader = traders?.find(t => t.id === selectedTraderId) || traders?.[0] || null;

  const createMutation = useMutation({
    mutationFn: (name: string) =>
      apiRequest("/api/traders", { method: "POST", body: JSON.stringify({ name }) }),
    onSuccess: (newTrader: TraderProfile) => {
      qc.invalidateQueries({ queryKey: ["/api/traders"] });
      setSelectedTraderId(newTrader.id);
      setCreateDialogOpen(false);
      setNewProfileName("");
      toast({ title: "Profile created!", description: `Welcome, ${newTrader.name}!` });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const tradeMutation = useMutation({
    mutationFn: ({ traderId, data }: { traderId: string; data: any }) =>
      apiRequest(`/api/traders/${traderId}/trade`, { method: "POST", body: JSON.stringify(data) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/traders"] });
      setTradeAmount("100");
      toast({ title: "Trade placed!", description: "Position opened successfully." });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const closeMutation = useMutation({
    mutationFn: ({ traderId, positionId, exitPrice }: { traderId: string; positionId: string; exitPrice: number }) =>
      apiRequest(`/api/traders/${traderId}/close`, {
        method: "POST",
        body: JSON.stringify({ positionId, exitPrice }),
      }),
    onSuccess: (history: any) => {
      qc.invalidateQueries({ queryKey: ["/api/traders"] });
      toast({
        title: "Position closed",
        description: `P&L: ${history.pnl >= 0 ? "+" : ""}$${history.pnl.toFixed(2)}`,
      });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const selectedMarket = DEMO_MARKETS.find(m => m.id === tradeMarket);
  const entryPrice = selectedMarket
    ? (tradeSide === "YES" ? selectedMarket.probability : 1 - selectedMarket.probability)
    : 0;
  const potentialPayout = entryPrice > 0 ? Number(tradeAmount) / entryPrice : 0;

  function handlePlaceTrade() {
    if (!selectedTrader || !tradeMarket) return;
    tradeMutation.mutate({
      traderId: selectedTrader.id,
      data: {
        market: selectedMarket?.title,
        side: tradeSide,
        amount: Number(tradeAmount),
        entryPrice,
      },
    });
  }

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mock Trading</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Paper-trade on March Madness markets</p>
        </div>
      </div>

      {/* Profile selector + leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Profile + Trade Form */}
        <div className="lg:col-span-2 space-y-4">
          {/* Profile Selector */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <User size={14} className="text-primary" /> Trading Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <div className="flex gap-2">
                  <Select
                    value={selectedTraderId || selectedTrader?.id || ""}
                    onValueChange={setSelectedTraderId}
                    data-testid="profile-selector"
                  >
                    <SelectTrigger className="bg-input border-border flex-1" data-testid="profile-select-trigger">
                      <SelectValue placeholder="Select profile..." />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {(traders || []).map(t => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.name} — ${t.balance.toFixed(0)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1" data-testid="create-profile-btn">
                        <Plus size={14} /> New
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-border">
                      <DialogHeader>
                        <DialogTitle className="text-foreground">Create Trading Profile</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-foreground text-sm">Display Name</Label>
                          <Input
                            value={newProfileName}
                            onChange={e => setNewProfileName(e.target.value)}
                            placeholder="e.g. BracketKing99"
                            className="mt-1 bg-input border-border"
                            data-testid="new-profile-input"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">You'll start with $10,000 in paper money.</p>
                        <Button
                          onClick={() => createMutation.mutate(newProfileName)}
                          disabled={!newProfileName.trim() || createMutation.isPending}
                          className="w-full"
                          data-testid="create-profile-submit"
                        >
                          {createMutation.isPending ? "Creating..." : "Create Profile"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}

              {/* Portfolio Summary */}
              {selectedTrader && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                  <StatTile label="Balance" value={`$${selectedTrader.balance.toFixed(0)}`} />
                  <StatTile
                    label="Total P&L"
                    value={`${calcTotalPnl(selectedTrader) >= 0 ? "+" : ""}$${calcTotalPnl(selectedTrader).toFixed(0)}`}
                    positive={calcTotalPnl(selectedTrader) >= 0}
                  />
                  <StatTile label="Win Rate" value={`${calcWinRate(selectedTrader).toFixed(0)}%`} />
                  <StatTile label="Total Trades" value={`${selectedTrader.history.length}`} />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Trade Form */}
          {selectedTrader && (
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <BarChart2 size={14} className="text-primary" /> Place Trade
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-foreground text-sm">Market</Label>
                  <Select value={tradeMarket} onValueChange={setTradeMarket} data-testid="market-selector">
                    <SelectTrigger className="mt-1 bg-input border-border" data-testid="market-select-trigger">
                      <SelectValue placeholder="Select a market..." />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {DEMO_MARKETS.map(m => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.title} · {(m.probability * 100).toFixed(0)}%
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-foreground text-sm">Side</Label>
                    <div className="flex gap-2 mt-1">
                      <Button
                        variant={tradeSide === "YES" ? "default" : "outline"}
                        size="sm"
                        className="flex-1"
                        onClick={() => setTradeSide("YES")}
                        data-testid="side-yes"
                      >
                        YES
                      </Button>
                      <Button
                        variant={tradeSide === "NO" ? "default" : "outline"}
                        size="sm"
                        className="flex-1"
                        onClick={() => setTradeSide("NO")}
                        data-testid="side-no"
                      >
                        NO
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-foreground text-sm">Amount ($)</Label>
                    <Input
                      type="number"
                      min="1"
                      max={selectedTrader.balance}
                      value={tradeAmount}
                      onChange={e => setTradeAmount(e.target.value)}
                      className="mt-1 bg-input border-border"
                      data-testid="trade-amount"
                    />
                  </div>
                </div>

                {selectedMarket && (
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center p-2 rounded bg-muted">
                      <div className="text-muted-foreground">Entry Price</div>
                      <div className="font-bold text-primary">{(entryPrice * 100).toFixed(1)}¢</div>
                    </div>
                    <div className="text-center p-2 rounded bg-muted">
                      <div className="text-muted-foreground">Shares</div>
                      <div className="font-bold text-foreground">{entryPrice > 0 ? (Number(tradeAmount) / entryPrice).toFixed(1) : "—"}</div>
                    </div>
                    <div className="text-center p-2 rounded bg-muted">
                      <div className="text-muted-foreground">Max Payout</div>
                      <div className="font-bold text-green-400">${potentialPayout.toFixed(2)}</div>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handlePlaceTrade}
                  disabled={!tradeMarket || !tradeAmount || tradeMutation.isPending || Number(tradeAmount) > selectedTrader.balance}
                  className="w-full"
                  data-testid="place-trade-btn"
                >
                  {tradeMutation.isPending ? "Placing..." : `Place ${tradeSide} Trade — $${tradeAmount}`}
                </Button>
                {Number(tradeAmount) > selectedTrader.balance && (
                  <p className="text-xs text-red-400 text-center">Insufficient balance</p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Open Positions */}
          {selectedTrader && selectedTrader.positions.length > 0 && (
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-foreground">Open Positions ({selectedTrader.positions.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedTrader.positions.map(pos => (
                    <PositionRow
                      key={pos.id}
                      pos={pos}
                      onClose={(exitPrice) => closeMutation.mutate({ traderId: selectedTrader.id, positionId: pos.id, exitPrice })}
                      isClosing={closeMutation.isPending}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Trade History */}
          {selectedTrader && selectedTrader.history.length > 0 && (
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-foreground">Trade History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-muted-foreground border-b border-border">
                        <th className="text-left pb-2">Market</th>
                        <th className="text-center pb-2">Side</th>
                        <th className="text-right pb-2">Entry</th>
                        <th className="text-right pb-2">Exit</th>
                        <th className="text-right pb-2">P&L</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {selectedTrader.history.map(h => (
                        <tr key={h.id} className="hover:bg-muted/50" data-testid={`history-row-${h.id}`}>
                          <td className="py-2.5 pr-4 text-xs text-foreground truncate max-w-[160px]">{h.market}</td>
                          <td className="text-center py-2.5">
                            <Badge variant="outline" className={`text-[10px] border ${h.side === "YES" ? "text-green-400 border-green-400/30" : "text-red-400 border-red-400/30"}`}>
                              {h.side}
                            </Badge>
                          </td>
                          <td className="text-right py-2.5 text-xs font-mono text-muted-foreground">{(h.entryPrice * 100).toFixed(1)}¢</td>
                          <td className="text-right py-2.5 text-xs font-mono text-muted-foreground">{(h.exitPrice * 100).toFixed(1)}¢</td>
                          <td className="text-right py-2.5"><PnlDisplay pnl={h.pnl} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right: Leaderboard */}
        <div>
          <Card className="bg-card border-border sticky top-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Trophy size={14} className="text-primary" /> Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 rounded" />)}
                </div>
              ) : (
                <div className="space-y-2">
                  {(traders || []).map((t, i) => {
                    const pnl = calcTotalPnl(t);
                    const isSelected = selectedTrader?.id === t.id;
                    return (
                      <div
                        key={t.id}
                        onClick={() => setSelectedTraderId(t.id)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          isSelected ? "bg-primary/10 border border-primary/30" : "bg-muted hover:bg-muted/80 border border-transparent"
                        }`}
                        data-testid={`leaderboard-row-${t.id}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold w-5 text-center ${i === 0 ? "text-yellow-400" : i === 1 ? "text-gray-400" : i === 2 ? "text-orange-400" : "text-muted-foreground"}`}>
                            #{i + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold text-foreground truncate">{t.name}</div>
                            <div className="text-[10px] text-muted-foreground">${t.balance.toFixed(0)} balance</div>
                          </div>
                          <div className="text-right">
                            <PnlDisplay pnl={pnl} />
                            <div className="text-[10px] text-muted-foreground">{t.history.length} trades</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatTile({ label, value, positive }: { label: string; value: string; positive?: boolean }) {
  return (
    <div className="text-center p-2 rounded-lg bg-muted">
      <div className={`text-sm font-bold ${
        positive === true ? "text-green-400" : positive === false ? "text-red-400" : "text-foreground"
      }`}>
        {value}
      </div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
}

function PositionRow({
  pos, onClose, isClosing
}: {
  pos: TradePosition;
  onClose: (exitPrice: number) => void;
  isClosing: boolean;
}) {
  const pnl = calcPnl(pos);
  // Simulate a "current price" as entry ± small movement
  const exitPrice = Math.max(0.01, Math.min(0.99, pos.currentPrice + (Math.random() - 0.5) * 0.05));

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted" data-testid={`position-${pos.id}`}>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium text-foreground truncate">{pos.market}</div>
        <div className="flex items-center gap-2 mt-0.5">
          <Badge variant="outline" className={`text-[10px] border ${pos.side === "YES" ? "text-green-400 border-green-400/30" : "text-red-400 border-red-400/30"}`}>
            {pos.side}
          </Badge>
          <span className="text-[10px] text-muted-foreground">${pos.amount} @ {(pos.entryPrice * 100).toFixed(1)}¢</span>
        </div>
      </div>
      <div className="text-right">
        <PnlDisplay pnl={pnl} />
        <div className="text-[10px] text-muted-foreground">unrealized</div>
      </div>
      <Button
        size="sm"
        variant="outline"
        className="text-xs h-7 border-border"
        onClick={() => onClose(exitPrice)}
        disabled={isClosing}
        data-testid={`close-position-${pos.id}`}
      >
        <X size={12} /> Close
      </Button>
    </div>
  );
}
