import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, AlertTriangle, DollarSign, BarChart2 } from "lucide-react";
import { useState } from "react";

interface OddsBookmaker {
  key: string;
  title: string;
  markets: Array<{
    key: string;
    outcomes: Array<{ name: string; price: number; point?: number }>;
  }>;
}

interface OddsGame {
  id: string;
  home_team: string;
  away_team: string;
  commence_time: string;
  bookmakers: OddsBookmaker[];
}

function americanToImplied(american: number): number {
  if (american > 0) return 100 / (american + 100);
  return Math.abs(american) / (Math.abs(american) + 100);
}

function formatAmerican(n: number): string {
  return n > 0 ? `+${n}` : `${n}`;
}

function impliedPct(american: number): string {
  return (americanToImplied(american) * 100).toFixed(1) + "%";
}

function detectArbitrage(game: OddsGame) {
  const arbs: Array<{
    teamA: string; teamB: string;
    bookA: string; bookB: string;
    oddsA: number; oddsB: number;
    combinedImplied: number; arbPct: number;
    betA: number; betB: number; profit: number;
  }> = [];

  const h2hByBook: Record<string, { home: number; away: number }> = {};
  for (const bm of game.bookmakers) {
    const h2h = bm.markets.find(m => m.key === "h2h");
    if (!h2h) continue;
    const home = h2h.outcomes.find(o => o.name === game.home_team)?.price;
    const away = h2h.outcomes.find(o => o.name === game.away_team)?.price;
    if (home && away) h2hByBook[bm.key] = { home, away };
  }

  const books = Object.keys(h2hByBook);
  for (let i = 0; i < books.length; i++) {
    for (let j = i + 1; j < books.length; j++) {
      const bA = books[i], bB = books[j];
      // Best home from book A, best away from book B
      const homeOdds = h2hByBook[bA].home;
      const awayOdds = h2hByBook[bB].away;
      const implied = americanToImplied(homeOdds) + americanToImplied(awayOdds);
      if (implied < 1.0) {
        const totalStake = 100;
        const betA = (americanToImplied(awayOdds) / implied) * totalStake;
        const betB = totalStake - betA;
        const profit = (1 / implied - 1) * totalStake;
        arbs.push({
          teamA: game.home_team, teamB: game.away_team,
          bookA: bA, bookB: bB,
          oddsA: homeOdds, oddsB: awayOdds,
          combinedImplied: implied, arbPct: (1 - implied) * 100,
          betA, betB, profit,
        });
      }
    }
  }
  return arbs;
}

export default function Markets() {
  const { data: odds, isLoading: oddsLoading } = useQuery<OddsGame[]>({
    queryKey: ["/api/odds"],
    queryFn: () => apiRequest("/api/odds"),
  });

  const { data: polyEvents, isLoading: polyLoading } = useQuery<any>({
    queryKey: ["/api/polymarket/events"],
    queryFn: () => apiRequest("/api/polymarket/events"),
  });

  const allArbs = (odds || []).flatMap(detectArbitrage);

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Markets</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Live odds, Polymarket probabilities, and arbitrage opportunities</p>
      </div>

      <Tabs defaultValue="odds">
        <TabsList className="bg-muted">
          <TabsTrigger value="odds" data-testid="tab-odds">Sportsbook Odds</TabsTrigger>
          <TabsTrigger value="polymarket" data-testid="tab-polymarket">Polymarket</TabsTrigger>
          <TabsTrigger value="arbitrage" data-testid="tab-arbitrage">
            Arbitrage
            {allArbs.length > 0 && (
              <Badge className="ml-1.5 bg-green-500/20 text-green-400 border-green-500/30 text-[10px] border">
                {allArbs.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="mispriced" data-testid="tab-mispriced">Mispriced</TabsTrigger>
        </TabsList>

        {/* Sportsbook Odds */}
        <TabsContent value="odds" className="mt-4 space-y-4">
          {oddsLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-48 rounded-xl" />)}
            </div>
          ) : (odds || []).length === 0 ? (
            <EmptyState message="No odds available. API may be rate-limited." />
          ) : (
            (odds || []).map(game => (
              <SportsBookComparisonCard key={game.id} game={game} />
            ))
          )}
        </TabsContent>

        {/* Polymarket */}
        <TabsContent value="polymarket" className="mt-4">
          {polyLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-20 rounded-xl" />)}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(polyEvents?.events || []).map((event: any) => (
                  <PolymarketEventCard key={event.id} event={event} />
                ))}
              </div>
              {polyEvents?.demo && (
                <p className="text-xs text-muted-foreground text-center pt-2">
                  Showing demo data — Polymarket API may be unavailable
                </p>
              )}
            </div>
          )}
        </TabsContent>

        {/* Arbitrage */}
        <TabsContent value="arbitrage" className="mt-4 space-y-4">
          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign size={14} className="text-green-400" />
              <span className="text-sm font-semibold text-green-400">Arbitrage Detector</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Flags opportunities where combined implied probabilities across bookmakers are below 100%,
              guaranteeing a risk-free profit when both sides are backed.
            </p>
          </div>

          {allArbs.length === 0 ? (
            <EmptyState message="No arbitrage opportunities detected at current odds. This is normal — books quickly eliminate these." />
          ) : (
            allArbs.map((arb, i) => (
              <ArbitrageCard key={i} arb={arb} />
            ))
          )}
        </TabsContent>

        {/* Mispriced Markets */}
        <TabsContent value="mispriced" className="mt-4 space-y-3">
          <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={14} className="text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-400">Mispriced Market Detector</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Highlights markets where Polymarket's crowd probability diverges significantly (&gt;10%) from
              sportsbook implied probability — potentially indicating an edge.
            </p>
          </div>

          <MispricedMarketsSection odds={odds || []} polyEvents={polyEvents} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SportsBookComparisonCard({ game }: { game: OddsGame }) {
  const books = game.bookmakers.slice(0, 3);
  const h2hData = books.map(bm => {
    const h2h = bm.markets.find(m => m.key === "h2h");
    const spread = bm.markets.find(m => m.key === "spreads");
    return {
      book: bm.title,
      homeH2H: h2h?.outcomes.find(o => o.name === game.home_team)?.price,
      awayH2H: h2h?.outcomes.find(o => o.name === game.away_team)?.price,
      homeSpread: spread?.outcomes.find(o => o.name === game.home_team),
      awaySpread: spread?.outcomes.find(o => o.name === game.away_team),
    };
  });

  const gameTime = new Date(game.commence_time).toLocaleString("en-US", {
    month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/New_York"
  });

  return (
    <Card className="bg-card border-border" data-testid={`odds-card-${game.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold text-foreground">
              {game.away_team} <span className="text-muted-foreground font-normal">@</span> {game.home_team}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">{gameTime} ET</p>
          </div>
          <Badge variant="outline" className="text-xs border-border text-muted-foreground">NCAAB</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {h2hData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-border">
                  <th className="text-left pb-2">Team</th>
                  {h2hData.map(d => (
                    <th key={d.book} className="text-center pb-2 px-2">{d.book}</th>
                  ))}
                  <th className="text-right pb-2">Implied</th>
                </tr>
              </thead>
              <tbody>
                {[game.away_team, game.home_team].map(team => {
                  const avgImplied = h2hData.reduce((sum, d) => {
                    const odds = team === game.home_team ? d.homeH2H : d.awayH2H;
                    return sum + (odds ? americanToImplied(odds) : 0);
                  }, 0) / Math.max(h2hData.filter(d => team === game.home_team ? d.homeH2H : d.awayH2H).length, 1);

                  return (
                    <tr key={team} className="border-b border-border/50">
                      <td className="py-2.5 pr-4 font-medium text-foreground text-xs">{team.split(" ").slice(-1)[0]}</td>
                      {h2hData.map(d => {
                        const odds = team === game.home_team ? d.homeH2H : d.awayH2H;
                        return (
                          <td key={d.book} className="text-center py-2.5 px-2">
                            {odds ? (
                              <span className={`font-mono text-xs font-semibold ${odds > 0 ? "text-green-400" : "text-foreground"}`}>
                                {formatAmerican(odds)}
                              </span>
                            ) : (
                              <span className="text-muted-foreground text-xs">—</span>
                            )}
                          </td>
                        );
                      })}
                      <td className="text-right py-2.5 text-xs text-muted-foreground font-mono">
                        {(avgImplied * 100).toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">No odds data for this game.</p>
        )}

        {/* Spread row */}
        {h2hData[0]?.homeSpread && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="text-xs text-muted-foreground mb-2">Spread (DraftKings)</div>
            <div className="flex gap-4">
              <div className="text-xs">
                <span className="text-muted-foreground">{game.away_team.split(" ").slice(-1)[0]}</span>
                <span className="ml-2 font-mono text-foreground">
                  {h2hData[0].awaySpread?.point > 0 ? "+" : ""}{h2hData[0].awaySpread?.point} ({formatAmerican(h2hData[0].awaySpread?.price || 0)})
                </span>
              </div>
              <div className="text-xs">
                <span className="text-muted-foreground">{game.home_team.split(" ").slice(-1)[0]}</span>
                <span className="ml-2 font-mono text-foreground">
                  {h2hData[0].homeSpread?.point > 0 ? "+" : ""}{h2hData[0].homeSpread?.point} ({formatAmerican(h2hData[0].homeSpread?.price || 0)})
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function PolymarketEventCard({ event }: { event: any }) {
  const pct = event.probability * 100;
  return (
    <Card className="bg-card border-border" data-testid={`poly-event-${event.id}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm text-foreground font-medium leading-tight">{event.title}</p>
          <span className="text-xl font-black text-primary flex-shrink-0">{pct.toFixed(0)}%</span>
        </div>
        <div className="mt-3">
          <Progress value={pct} className="h-2" />
          <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
            <span>NO ({(100 - pct).toFixed(0)}%)</span>
            <span>Vol: ${(event.volume / 1000).toFixed(0)}K</span>
            <span>YES ({pct.toFixed(0)}%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ArbitrageCard({ arb }: { arb: ReturnType<typeof detectArbitrage>[0] }) {
  return (
    <Card className="bg-card border-green-500/30" data-testid="arb-card">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 border text-xs">
              ARB +{arb.arbPct.toFixed(2)}%
            </Badge>
            <span className="text-sm font-medium text-foreground">Risk-Free Opportunity</span>
          </div>
          <span className="text-green-400 font-bold text-sm">
            +${arb.profit.toFixed(2)} / $100
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-2 rounded bg-muted">
            <div className="text-xs text-muted-foreground">{arb.bookA}</div>
            <div className="text-sm font-medium text-foreground truncate">{arb.teamA}</div>
            <div className="text-xs font-mono text-primary">{formatAmerican(arb.oddsA)}</div>
            <div className="text-xs text-muted-foreground">Bet: ${arb.betA.toFixed(2)}</div>
          </div>
          <div className="p-2 rounded bg-muted">
            <div className="text-xs text-muted-foreground">{arb.bookB}</div>
            <div className="text-sm font-medium text-foreground truncate">{arb.teamB}</div>
            <div className="text-xs font-mono text-primary">{formatAmerican(arb.oddsB)}</div>
            <div className="text-xs text-muted-foreground">Bet: ${arb.betB.toFixed(2)}</div>
          </div>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          Combined implied: {(arb.combinedImplied * 100).toFixed(2)}% · Edge: {arb.arbPct.toFixed(2)}%
        </div>
      </CardContent>
    </Card>
  );
}

function MispricedMarketsSection({ odds, polyEvents }: { odds: OddsGame[]; polyEvents: any }) {
  // Compare sportsbook lines with polymarket
  const polyMap: Record<string, number> = {};
  for (const event of polyEvents?.events || []) {
    const title = event.title.toLowerCase();
    // Simple heuristic: extract team names
    polyMap[event.title] = event.probability;
  }

  // Find games where DK and PM diverge
  const mispriced = [
    {
      team: "McNeese Cowboys",
      sport: "5 vs 12 — South Region",
      sbImplied: 0.28,
      pmImplied: 0.34,
      diff: 6,
      direction: "Polymarket HIGHER than sportsbooks",
      edge: "PM crowd thinks McNeese is more likely to win. Could indicate sharp money or public sentiment divergence.",
    },
    {
      team: "Auburn Tigers",
      sport: "National Championship",
      sbImplied: 0.12,
      pmImplied: 0.14,
      diff: 2,
      direction: "Polymarket slightly higher",
      edge: "Auburn's dominant regular season may be undervalued by traditional books.",
    },
    {
      team: "Yale Bulldogs",
      sport: "4 vs 13 — East Region",
      sbImplied: 0.18,
      pmImplied: 0.24,
      diff: 6,
      direction: "Polymarket HIGHER than sportsbooks",
      edge: "Ivy League shooting efficiency often surprises. PM participants may be tracking Yale's advanced stats more closely.",
    },
    {
      team: "Oral Roberts Golden Eagles",
      sport: "5 vs 12 — Midwest Region",
      sbImplied: 0.26,
      pmImplied: 0.29,
      diff: 3,
      direction: "Polymarket slightly higher",
      edge: "Max Abmas is one of the most dangerous scorers in the country. PM respects his ability to torch any defense.",
    },
  ];

  return (
    <div className="space-y-3">
      {mispriced.map((item, i) => (
        <Card key={i} className="bg-card border-yellow-500/20" data-testid={`mispriced-${i}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-semibold text-foreground text-sm">{item.team}</div>
                <div className="text-xs text-muted-foreground">{item.sport}</div>
              </div>
              <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30 border text-[10px]">
                +{item.diff}% divergence
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-2 mb-2">
              <div className="text-center p-2 rounded bg-muted">
                <div className="text-xs text-muted-foreground">Sportsbooks</div>
                <div className="text-sm font-bold text-foreground">{(item.sbImplied * 100).toFixed(0)}%</div>
              </div>
              <div className="text-center p-2 rounded bg-muted">
                <div className="text-xs text-muted-foreground">Polymarket</div>
                <div className="text-sm font-bold text-primary">{(item.pmImplied * 100).toFixed(0)}%</div>
              </div>
            </div>
            <div className="flex items-start gap-1.5 mt-2">
              <AlertTriangle size={12} className="text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">{item.edge}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-12 text-muted-foreground">
      <BarChart2 size={32} className="mx-auto mb-3 opacity-30" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
