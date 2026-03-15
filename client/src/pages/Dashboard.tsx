import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { Tv, Clock, TrendingUp, AlertTriangle, ChevronDown, ChevronUp, Activity } from "lucide-react";
import { useState } from "react";
import { teams } from "@/lib/teamData";

interface Game {
  gameID: string;
  away: { names: { full: string }; seed: string; score: string };
  home: { names: { full: string }; seed: string; score: string };
  gameState: "live" | "final" | "upcoming" | string;
  startTimeEpoch: number;
  network: string;
  label: string;
  currentPeriod: string;
}

interface ScoresResponse {
  games?: Game[];
  demo?: boolean;
}

function formatOdds(american: number): string {
  return american > 0 ? `+${american}` : `${american}`;
}

function formatTime(epoch: number): string {
  const d = new Date(epoch * 1000);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "America/New_York" }) + " ET";
}

function getTeamId(teamName: string): string {
  const map: Record<string, string> = {
    "Duke Blue Devils": "duke",
    "Kentucky Wildcats": "kentucky",
    "Tennessee Volunteers": "tennessee",
    "Marquette Golden Eagles": "marquette",
    "Michigan State Spartans": "michigan-state",
    "Alabama Crimson Tide": "alabama",
    "Auburn Tigers": "auburn",
    "Purdue Boilermakers": "purdue",
    "Kansas State Wildcats": "kansas-state",
    "Arizona Wildcats": "arizona",
    "Houston Cougars": "houston",
    "Connecticut Huskies": "connecticut",
  };
  return map[teamName] || teamName.toLowerCase().split(" ")[0];
}

const upsetPicks = [
  {
    seed: 12, higherSeed: 5, team: "McNeese Cowboys", opponent: "Virginia Cavaliers",
    reasoning: "Virginia's Pack Line defense is historically vulnerable to high-pace guards. Harwin Francois (16.4 ppg) can exploit the perimeter and McNeese leads the Southland in 3PT% at 36.8%.",
    rating: "HIGH",
    region: "South"
  },
  {
    seed: 11, higherSeed: 6, team: "NC State Wolfpack", opponent: "Indiana Hoosiers",
    reasoning: "NC State has 'survived and advanced' tournament DNA. DJ Burns Jr.'s unique post-up game creates matchup nightmares, and this team upset multiple higher seeds last year.",
    rating: "MEDIUM",
    region: "Midwest"
  },
  {
    seed: 10, higherSeed: 7, team: "New Mexico Lobos", opponent: "Kansas",
    reasoning: "Playing at altitude favors no one in a neutral site, but Jaelen House (17.2 ppg) is one of the best guards in the Mountain West. Kevin McCullar Jr. is questionable for Kansas.",
    rating: "MEDIUM",
    region: "West"
  },
  {
    seed: 13, higherSeed: 4, team: "Yale Bulldogs", opponent: "Gonzaga Bulldogs",
    reasoning: "Ivy League teams are quietly shooting 37.8% from three. John Poulakidas is a pure shooter who can go off. The August Mahoney-led offense is efficient and disciplined.",
    rating: "LOW",
    region: "West"
  },
];

const regions = ["East", "West", "South", "Midwest"] as const;
const regionColors = {
  East: "from-blue-600/20 to-blue-800/10 border-blue-500/30",
  West: "from-red-600/20 to-red-800/10 border-red-500/30",
  South: "from-green-600/20 to-green-800/10 border-green-500/30",
  Midwest: "from-purple-600/20 to-purple-800/10 border-purple-500/30",
};

const regionTop4: Record<string, string[]> = {
  East: ["Duke (1)", "Kentucky (2)", "Tennessee (3)", "Marquette (4)"],
  West: ["Arizona (1)", "Houston (2)", "Iowa State (3)", "Gonzaga (4)"],
  South: ["Auburn (1)", "Purdue (2)", "Texas A&M (3)", "Connecticut (4)"],
  Midwest: ["Kansas State (1)", "St. John's (2)", "Wisconsin (3)", "Oregon (4)"],
};

export default function Dashboard() {
  const [expandedGame, setExpandedGame] = useState<string | null>(null);

  const { data: scores, isLoading: scoresLoading } = useQuery<ScoresResponse>({
    queryKey: ["/api/scores"],
    refetchInterval: 60000,
    queryFn: () => apiRequest("/api/scores"),
  });

  const { data: odds } = useQuery({
    queryKey: ["/api/odds"],
    queryFn: () => apiRequest("/api/odds"),
  });

  const { data: polymarketEvents } = useQuery({
    queryKey: ["/api/polymarket/events"],
    queryFn: () => apiRequest("/api/polymarket/events"),
  });

  const games: Game[] = scores?.games || [];
  const liveGames = games.filter(g => g.gameState === "live");
  const finishedGames = games.filter(g => g.gameState === "final");
  const upcomingGames = games.filter(g => g.gameState === "upcoming");

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-0.5">March Madness 2026 · First Round</p>
        </div>
        {scores?.demo && (
          <Badge variant="outline" className="text-yellow-400 border-yellow-400/30 bg-yellow-400/10">
            Demo Data
          </Badge>
        )}
      </div>

      {/* Live + Recent Games */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-red-500 pulse-live" />
          <h2 className="font-semibold text-foreground">Live & Recent Games</h2>
          <span className="text-xs text-muted-foreground ml-auto">Auto-refreshes every 60s</span>
        </div>

        {scoresLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 rounded-xl" />)}
          </div>
        ) : [...liveGames, ...finishedGames].length === 0 ? (
          <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground">
            <Tv size={18} className="text-muted-foreground flex-shrink-0" />
            <span>No live or recent games right now. The tournament is in the first round — check back closer to tip-off times (typically noon–midnight ET).</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {[...liveGames, ...finishedGames].map(game => (
              <GameCard
                key={game.gameID}
                game={game}
                expanded={expandedGame === game.gameID}
                onToggle={() => setExpandedGame(expandedGame === game.gameID ? null : game.gameID)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Upcoming Games */}
      {upcomingGames.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Clock size={16} className="text-primary" />
            <h2 className="font-semibold text-foreground">Upcoming Games</h2>
          </div>
          <div className="space-y-2">
            {upcomingGames.map(game => (
              <UpcomingGameRow key={game.gameID} game={game} odds={odds} />
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mini Bracket */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={16} className="text-primary" />
            <h2 className="font-semibold text-foreground">Regional Top Seeds</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {regions.map(region => (
              <Link key={region} href="/bracket">
                <div className={`p-3 rounded-xl border bg-gradient-to-br ${regionColors[region]} cursor-pointer hover:opacity-80 transition-opacity`}>
                  <div className="font-semibold text-sm text-foreground mb-2">{region} Region</div>
                  <div className="space-y-1">
                    {regionTop4[region].map((seed, i) => (
                      <div key={i} className="text-xs text-muted-foreground flex items-center gap-1">
                        <span className={`w-4 h-4 rounded text-[10px] flex items-center justify-center font-bold ${i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                          {i + 1}
                        </span>
                        {seed}
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Upset Watch */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className="text-yellow-400" />
            <h2 className="font-semibold text-foreground">Upset Watch</h2>
          </div>
          <div className="space-y-3">
            {upsetPicks.map((pick, i) => (
              <UpsetCard key={i} pick={pick} />
            ))}
          </div>
        </section>
      </div>

      {/* Polymarket Snapshot */}
      {polymarketEvents?.events && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Activity size={16} className="text-primary" />
            <h2 className="font-semibold text-foreground">Market Snapshot</h2>
            <Link href="/markets">
              <span className="text-xs text-primary ml-auto hover:underline">View All →</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {polymarketEvents.events.slice(0, 4).map((event: any) => (
              <Card key={event.id} className="bg-card border-border">
                <CardContent className="p-3">
                  <div className="text-xs text-muted-foreground mb-1 line-clamp-2">{event.title}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${(event.probability * 100).toFixed(0)}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-primary">
                      {(event.probability * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-1">
                    Vol: ${(event.volume / 1000).toFixed(0)}K
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function GameCard({ game, expanded, onToggle }: { game: Game; expanded: boolean; onToggle: () => void }) {
  const isLive = game.gameState === "live";
  const isFinal = game.gameState === "final";

  return (
    <Card
      className="bg-card border-border hover:border-primary/30 transition-colors cursor-pointer"
      data-testid={`game-card-${game.gameID}`}
      onClick={onToggle}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {isLive && <div className="w-2 h-2 rounded-full bg-red-500 pulse-live" />}
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isLive ? "bg-red-500/20 text-red-400" : isFinal ? "bg-muted text-muted-foreground" : "bg-primary/20 text-primary"}`}>
              {isLive ? game.currentPeriod || "LIVE" : isFinal ? "FINAL" : "UPCOMING"}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Tv size={11} />
            {game.network}
          </div>
        </div>

        <div className="space-y-2">
          <TeamRow name={game.away.names.full} seed={game.away.seed} score={game.away.score} isFinal={isFinal} isLive={isLive} />
          <TeamRow name={game.home.names.full} seed={game.home.seed} score={game.home.score} isFinal={isFinal} isLive={isLive} />
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-muted-foreground">{game.label}</span>
          <button data-testid={`expand-game-${game.gameID}`} className="text-muted-foreground hover:text-foreground transition-colors">
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {expanded && (
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Box Score Preview</p>
            <div className="grid grid-cols-4 gap-1 text-xs">
              <div className="text-muted-foreground">Player</div>
              <div className="text-muted-foreground text-center">PTS</div>
              <div className="text-muted-foreground text-center">REB</div>
              <div className="text-muted-foreground text-center">AST</div>
              {getDemoBoxScore(game.away.names.full).map((p, i) => (
                <>
                  <div key={`n-${i}`} className="text-foreground truncate">{p.name}</div>
                  <div key={`pts-${i}`} className="text-center text-foreground font-medium">{p.pts}</div>
                  <div key={`reb-${i}`} className="text-center text-muted-foreground">{p.reb}</div>
                  <div key={`ast-${i}`} className="text-center text-muted-foreground">{p.ast}</div>
                </>
              ))}
            </div>
            <Link href={`/team/${getTeamId(game.away.names.full)}`}>
              <span className="text-xs text-primary hover:underline mt-2 block">View {game.away.names.full} →</span>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TeamRow({ name, seed, score, isFinal, isLive }: {
  name: string; seed: string; score: string; isFinal: boolean; isLive: boolean;
}) {
  const hasScore = score !== "" && score !== undefined;
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground w-5 text-center">({seed})</span>
        <span className="text-sm font-medium text-foreground truncate max-w-[140px]">{name}</span>
      </div>
      {hasScore && (
        <span className={`text-lg font-bold ${isFinal || isLive ? "text-foreground" : "text-muted-foreground"}`}>
          {score}
        </span>
      )}
    </div>
  );
}

function UpcomingGameRow({ game, odds }: { game: Game; odds: any }) {
  // Try to find odds for this game
  const gameOdds = odds?.find?.((o: any) =>
    o.home_team?.includes(game.home.names.full.split(" ")[0]) ||
    o.away_team?.includes(game.away.names.full.split(" ")[0])
  );

  const dk = gameOdds?.bookmakers?.find((b: any) => b.key === "draftkings");
  const h2h = dk?.markets?.find((m: any) => m.key === "h2h");

  return (
    <Card className="bg-card border-border" data-testid={`upcoming-game-${game.gameID}`}>
      <CardContent className="p-3 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground text-xs">({game.away.seed})</span>
            <span className="text-foreground font-medium">{game.away.names.full}</span>
            {h2h && (
              <span className="ml-auto text-xs font-mono text-muted-foreground">
                {formatOdds(h2h.outcomes.find((o: any) => o.name === game.away.names.full)?.price || 0)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm mt-1">
            <span className="text-muted-foreground text-xs">({game.home.seed})</span>
            <span className="text-foreground font-medium">{game.home.names.full}</span>
            {h2h && (
              <span className="ml-auto text-xs font-mono text-muted-foreground">
                {formatOdds(h2h.outcomes.find((o: any) => o.name === game.home.names.full)?.price || 0)}
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock size={11} />
            {formatTime(game.startTimeEpoch)}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <Tv size={11} />
            {game.network}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function UpsetCard({ pick }: { pick: typeof upsetPicks[0] }) {
  const ratingColors = {
    HIGH: "border-red-500/40 bg-red-500/10 text-red-400",
    MEDIUM: "border-yellow-500/40 bg-yellow-500/10 text-yellow-400",
    LOW: "border-blue-500/40 bg-blue-500/10 text-blue-400",
  };

  return (
    <div className="p-3 rounded-xl border border-border bg-card" data-testid={`upset-card-${pick.team}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-primary">#{pick.seed}</span>
          <Link href={`/team/${pick.team.toLowerCase().split(" ")[0]}`}>
            <span className="text-sm font-semibold text-foreground hover:text-primary transition-colors cursor-pointer">
              {pick.team}
            </span>
          </Link>
          <span className="text-muted-foreground text-xs">over</span>
          <span className="text-sm text-muted-foreground">#{pick.higherSeed} {pick.opponent}</span>
        </div>
        <Badge className={`text-[10px] px-1.5 py-0.5 border ${ratingColors[pick.rating as keyof typeof ratingColors]}`}>
          {pick.rating}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{pick.reasoning}</p>
      <span className="text-[10px] text-muted-foreground mt-1 block">{pick.region} Region</span>
    </div>
  );
}

function getDemoBoxScore(teamName: string) {
  const team = teams.find(t => t.name === teamName);
  if (!team) return [{ name: "Player 1", pts: 18, reb: 4, ast: 3 }];
  return team.keyPlayers.slice(0, 4).map(p => ({
    name: p.name.split(" ").slice(-1)[0],
    pts: Math.floor(p.ppg * (0.7 + Math.random() * 0.6)),
    reb: Math.floor(p.rpg * (0.7 + Math.random() * 0.6)),
    ast: Math.floor(p.apg * (0.7 + Math.random() * 0.6)),
  }));
}
