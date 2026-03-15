import { useParams } from "wouter";
import { teams, getTeamById, type Team } from "@/lib/teamData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Music, PawPrint, MapPin, TrendingUp, Users, AlertCircle, ShoppingBag, ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import NotFound from "./not-found";

const injuryColors = {
  Out: "bg-red-500/20 text-red-400 border-red-500/30",
  Doubtful: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Questionable: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "Day-to-Day": "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

const regionColors = {
  East: "text-blue-400 bg-blue-400/10",
  West: "text-red-400 bg-red-400/10",
  South: "text-green-400 bg-green-400/10",
  Midwest: "text-purple-400 bg-purple-400/10",
};

function StatBar({ label, value, max, unit = "" }: { label: string; value: number; max: number; unit?: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-foreground font-semibold">{value}{unit}</span>
      </div>
      <Progress value={pct} className="h-1.5" />
    </div>
  );
}

export default function TeamDetail() {
  const params = useParams<{ teamId: string }>();
  const team = getTeamById(params.teamId || "");

  if (!team) return <NotFound />;

  const regionClass = regionColors[team.region] || "text-muted-foreground bg-muted";

  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-5">
      {/* Back navigation */}
      <Link href="/bracket">
        <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="back-to-bracket">
          <ArrowLeft size={14} /> Back to Bracket
        </button>
      </Link>

      {/* Header */}
      <div
        className="p-5 rounded-2xl border border-border relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${team.colors.primary}22 0%, transparent 60%)` }}
        data-testid="team-header"
      >
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black text-foreground">{team.name}</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge variant="outline" className={`${regionClass} border-0`}>
                {team.region} Region
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                #{team.seed} Seed
              </Badge>
              <span className="text-sm text-muted-foreground">{team.conference}</span>
              <span className="text-sm font-semibold text-foreground">{team.record}</span>
              <span className="text-xs text-muted-foreground">({team.conferenceRecord} conf.)</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {/* Fight Song Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5" data-testid="fight-song-btn">
                  <Music size={14} /> Fight Song
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="text-foreground">{team.name} Fight Song</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Listen to the official fight song of the {team.name}.</p>
                  <a
                    href={team.fightSongUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-red-600/10 border border-red-500/30 rounded-lg hover:bg-red-600/20 transition-colors"
                  >
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">▶</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">Watch on YouTube</div>
                      <div className="text-xs text-muted-foreground">{team.name} Fight Song</div>
                    </div>
                    <ExternalLink size={12} className="ml-auto text-muted-foreground" />
                  </a>
                </div>
              </DialogContent>
            </Dialog>

            {/* Mascot Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5" data-testid="mascot-btn">
                  <PawPrint size={14} /> Mascot
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="text-foreground">{team.mascot.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                  <div className="text-4xl text-center py-2">{getMascotEmoji(team.mascot.name)}</div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">About the Mascot</h4>
                    <p className="text-sm text-muted-foreground">{team.mascot.description}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">Origin</h4>
                    <p className="text-sm text-muted-foreground">{team.mascot.origin}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Merch Link */}
            <a href={team.merchUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-1.5" data-testid="merch-btn">
                <ShoppingBag size={14} /> Merch
              </Button>
            </a>
          </div>
        </div>

        {/* Color swatches */}
        <div className="flex items-center gap-2 mt-3">
          <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: team.colors.primary }} />
          <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: team.colors.secondary }} />
          <span className="text-xs text-muted-foreground ml-1">Team Colors</span>
        </div>
      </div>

      {/* Playing Style */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
            <TrendingUp size={14} className="text-primary" /> Playing Style
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {team.playingStyle.map(style => (
              <Badge key={style} variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs" data-testid={`style-tag-${style}`}>
                {style}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Season Stats */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">Season Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-3 mb-3">
              {[
                { label: "PPG", value: team.stats.ppg },
                { label: "RPG", value: team.stats.rpg },
                { label: "APG", value: team.stats.apg },
              ].map(stat => (
                <div key={stat.label} className="text-center p-2 rounded-lg bg-muted" data-testid={`stat-${stat.label}`}>
                  <div className="text-lg font-bold text-primary">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
            <StatBar label="FG%" value={team.stats.fgPct} max={60} unit="%" />
            <StatBar label="3PT%" value={team.stats.threePct} max={50} unit="%" />
            <StatBar label="FT%" value={team.stats.ftPct} max={90} unit="%" />
            <StatBar label="Pace" value={team.stats.pace} max={80} />
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="text-center p-2 rounded bg-green-500/10 border border-green-500/20">
                <div className="text-sm font-bold text-green-400">{team.stats.offEff}</div>
                <div className="text-[10px] text-muted-foreground">Off. Eff</div>
              </div>
              <div className="text-center p-2 rounded bg-blue-500/10 border border-blue-500/20">
                <div className="text-sm font-bold text-blue-400">{team.stats.defEff}</div>
                <div className="text-[10px] text-muted-foreground">Def. Eff</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Results */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">Notable Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-xs font-semibold text-green-400 mb-2 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" /> Key Wins
              </div>
              <div className="space-y-1.5">
                {team.keyWins.map(win => (
                  <div key={win} className="text-xs text-muted-foreground bg-green-500/5 border border-green-500/10 px-2 py-1 rounded">
                    vs. {win}
                  </div>
                ))}
              </div>
            </div>
            {team.notableLosses.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-red-400 mb-2 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" /> Notable Losses
                </div>
                <div className="space-y-1.5">
                  {team.notableLosses.map(loss => (
                    <div key={loss} className="text-xs text-muted-foreground bg-red-500/5 border border-red-500/10 px-2 py-1 rounded">
                      vs. {loss}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Key Players */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Users size={14} className="text-primary" /> Key Players
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-border">
                  <th className="text-left pb-2 pr-4">Player</th>
                  <th className="text-center pb-2 px-2">Pos</th>
                  <th className="text-center pb-2 px-2">PPG</th>
                  <th className="text-center pb-2 px-2">RPG</th>
                  <th className="text-center pb-2 px-2">APG</th>
                  <th className="text-left pb-2 pl-4">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {team.keyPlayers.map((player, i) => (
                  <tr key={i} className="hover:bg-muted/50 transition-colors" data-testid={`player-row-${i}`}>
                    <td className="py-2.5 pr-4 font-medium text-foreground">{player.name}</td>
                    <td className="text-center py-2.5 px-2">
                      <Badge variant="outline" className="text-[10px] text-muted-foreground">{player.position}</Badge>
                    </td>
                    <td className="text-center py-2.5 px-2 font-semibold text-primary">{player.ppg}</td>
                    <td className="text-center py-2.5 px-2 text-muted-foreground">{player.rpg}</td>
                    <td className="text-center py-2.5 px-2 text-muted-foreground">{player.apg}</td>
                    <td className="py-2.5 pl-4 text-xs text-muted-foreground">{player.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Injury Report */}
      {team.injuries.length > 0 && (
        <Card className="bg-card border-border border-orange-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-orange-400 flex items-center gap-2">
              <AlertCircle size={14} /> Injury Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {team.injuries.map((injury, i) => (
              <div key={i} className="flex items-start gap-3 p-2 rounded-lg bg-orange-500/5 border border-orange-500/10" data-testid={`injury-${i}`}>
                <Badge className={`text-[10px] border shrink-0 ${injuryColors[injury.status]}`}>
                  {injury.status}
                </Badge>
                <div>
                  <div className="text-sm font-medium text-foreground">{injury.player}</div>
                  <div className="text-xs text-muted-foreground">{injury.impact}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Location Analysis */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
            <MapPin size={14} className="text-primary" /> Tournament Context
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            The <span className="text-foreground font-medium">{team.name}</span> enter the tournament as a{" "}
            <span className="text-primary font-bold">#{team.seed} seed</span> in the{" "}
            <span className="text-foreground font-medium">{team.region} Region</span>.
            Playing in neutral-site environments, their{" "}
            <span className="text-foreground">{team.stats.pace < 70 ? "methodical, slower-paced" : "up-tempo"}</span> style
            {team.stats.defEff < 95 ? " combined with elite defense" : " with efficient scoring"}
            {" "}makes them {team.seed <= 4 ? "a legitimate Final Four contender" : team.seed <= 8 ? "a dangerous mid-tier seed" : "a potential upset threat"}.
          </p>
          {team.injuries.length > 0 && (
            <p className="text-orange-400 text-xs">⚠ Monitor injury report — {team.injuries[0].player} is currently {team.injuries[0].status.toLowerCase()}.</p>
          )}
        </CardContent>
      </Card>

      {/* Merchandise Links */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
            <ShoppingBag size={14} className="text-primary" /> Official Merchandise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <a href={team.merchUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors border border-border group"
              data-testid="merch-fanatics">
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Fanatics</span>
              <ExternalLink size={12} className="ml-auto text-muted-foreground" />
            </a>
            <a
              href={`https://www.amazon.com/s?k=${encodeURIComponent(team.shortName + " march madness merchandise")}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors border border-border group"
              data-testid="merch-amazon">
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Amazon</span>
              <ExternalLink size={12} className="ml-auto text-muted-foreground" />
            </a>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(team.name + " official store")}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors border border-border group"
              data-testid="merch-official">
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Official Store</span>
              <ExternalLink size={12} className="ml-auto text-muted-foreground" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function getMascotEmoji(mascotName: string): string {
  const name = mascotName.toLowerCase();
  if (name.includes("wildcat") || name.includes("cat")) return "🐱";
  if (name.includes("bulldog") || name.includes("dog") || name.includes("bully")) return "🐶";
  if (name.includes("eagle") || name.includes("hawk")) return "🦅";
  if (name.includes("bear") || name.includes("bruin")) return "🐻";
  if (name.includes("tiger") || name.includes("bengal")) return "🐯";
  if (name.includes("wolf") || name.includes("husky")) return "🐺";
  if (name.includes("duck")) return "🦆";
  if (name.includes("gator") || name.includes("alligator")) return "🐊";
  if (name.includes("longhorn") || name.includes("bull")) return "🐂";
  if (name.includes("ram")) return "🐏";
  if (name.includes("spartan") || name.includes("knight") || name.includes("warrior") || name.includes("lancer")) return "⚔️";
  if (name.includes("pirate")) return "🏴‍☠️";
  if (name.includes("cowboy")) return "🤠";
  if (name.includes("bird") || name.includes("jay") || name.includes("jayhawk") || name.includes("bluejay")) return "🐦";
  if (name.includes("hoosier")) return "🌽";
  if (name.includes("pioneer") || name.includes("settler")) return "🪓";
  if (name.includes("gael") || name.includes("celtic")) return "☘️";
  if (name.includes("boilermaker")) return "🔩";
  if (name.includes("volunteer")) return "🧡";
  if (name.includes("lobo") || name.includes("wolf pack")) return "🐺";
  if (name.includes("cyclone")) return "🌪️";
  if (name.includes("commodore")) return "⚓";
  if (name.includes("demon") || name.includes("devil")) return "😈";
  if (name.includes("catamount") || name.includes("mountain lion")) return "🦁";
  if (name.includes("jackrabbit")) return "🐇";
  if (name.includes("aztec")) return "🌞";
  if (name.includes("badger")) return "🦡";
  if (name.includes("duck")) return "🦆";
  if (name.includes("hornet")) return "🐝";
  if (name.includes("antelope")) return "🦌";
  if (name.includes("terrier")) return "🐩";
  return "🏀";
}
