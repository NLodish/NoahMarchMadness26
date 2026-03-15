import { useState } from "react";
import { Link } from "wouter";
import { teams, getTeamsByRegion, type Team } from "@/lib/teamData";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

type Region = "East" | "West" | "South" | "Midwest";

const regions: Region[] = ["East", "West", "South", "Midwest"];

const regionConfig = {
  East: { color: "blue", label: "East", gradient: "from-blue-500/20 to-blue-700/10", accent: "bg-blue-500" },
  West: { color: "red", label: "West", gradient: "from-red-500/20 to-red-700/10", accent: "bg-red-500" },
  South: { color: "green", label: "South", gradient: "from-green-500/20 to-green-700/10", accent: "bg-green-500" },
  Midwest: { color: "purple", label: "Midwest", gradient: "from-purple-500/20 to-purple-700/10", accent: "bg-purple-500" },
};

// Standard seed matchup pairs
const SEED_PAIRS = [[1, 16], [8, 9], [5, 12], [4, 13], [6, 11], [3, 14], [7, 10], [2, 15]] as const;

function SeedBadge({ seed }: { seed: number }) {
  const isTop = seed <= 4;
  return (
    <span className={`text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded flex-shrink-0 ${
      isTop ? "bg-primary/80 text-primary-foreground" : "bg-muted text-muted-foreground"
    }`}>
      {seed}
    </span>
  );
}

function TeamSlot({ team, region }: { team: Team; region: Region }) {
  const cfg = regionConfig[region];
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={`/team/${team.id}`}>
          <div
            className="flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-primary/10 transition-colors cursor-pointer group"
            data-testid={`team-slot-${team.id}`}
          >
            <SeedBadge seed={team.seed} />
            <span className="text-xs text-foreground group-hover:text-primary transition-colors font-medium truncate max-w-[110px]">
              {team.shortName}
            </span>
          </div>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="bg-card border border-border p-3 max-w-[220px]">
        <div className="font-semibold text-foreground mb-1">{team.name}</div>
        <div className="text-xs text-muted-foreground">{team.conference} · {team.record}</div>
        <div className="text-xs text-muted-foreground mt-1">{team.stats.ppg} PPG · {team.stats.defEff} DEff</div>
        <div className="flex flex-wrap gap-1 mt-1.5">
          {team.playingStyle.slice(0, 2).map(s => (
            <span key={s} className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{s}</span>
          ))}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

function Matchup({ region, pair }: { region: Region; pair: readonly [number, number] }) {
  const regionTeams = getTeamsByRegion(region);
  const topTeam = regionTeams.find(t => t.seed === pair[0]);
  const bottomTeam = regionTeams.find(t => t.seed === pair[1]);

  if (!topTeam || !bottomTeam) return null;

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <TeamSlot team={topTeam} region={region} />
      <div className="h-px bg-border mx-2" />
      <TeamSlot team={bottomTeam} region={region} />
    </div>
  );
}

function RegionBracket({ region }: { region: Region }) {
  const cfg = regionConfig[region];

  return (
    <div className="flex-1 min-w-0">
      <div className={`flex items-center gap-2 mb-3 px-1`}>
        <div className={`w-2 h-2 rounded-full ${cfg.accent}`} />
        <h3 className="font-bold text-sm text-foreground uppercase tracking-wide">{region}</h3>
        <Badge variant="outline" className="text-[10px] ml-auto border-border text-muted-foreground">
          Round 1
        </Badge>
      </div>
      <div className={`p-3 rounded-xl bg-gradient-to-br ${cfg.gradient} border border-border space-y-2`}>
        {SEED_PAIRS.map(pair => (
          <Matchup key={`${pair[0]}-${pair[1]}`} region={region} pair={pair} />
        ))}
      </div>
    </div>
  );
}

export default function Bracket() {
  const [selectedRegion, setSelectedRegion] = useState<Region | "all">("all");

  return (
    <div className="p-4 lg:p-6 max-w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">2026 Bracket</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Click any team to view details</p>
        </div>
      </div>

      {/* Region filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setSelectedRegion("all")}
          data-testid="filter-all"
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selectedRegion === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          All Regions
        </button>
        {regions.map(r => (
          <button
            key={r}
            onClick={() => setSelectedRegion(r)}
            data-testid={`filter-${r.toLowerCase()}`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedRegion === r
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {regions.map(r => {
          const regionTeams = getTeamsByRegion(r);
          const top1 = regionTeams.find(t => t.seed === 1);
          const cfg = regionConfig[r];
          return (
            <div key={r} className={`p-3 rounded-xl bg-gradient-to-br ${cfg.gradient} border border-border`}>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">{r} Favorite</div>
              <div className="font-bold text-sm text-foreground mt-1">{top1?.shortName}</div>
              <div className="text-xs text-muted-foreground">{top1?.record}</div>
            </div>
          );
        })}
      </div>

      {/* Bracket grid */}
      <div className={`grid gap-4 ${
        selectedRegion === "all"
          ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
          : "grid-cols-1 max-w-sm"
      }`}>
        {(selectedRegion === "all" ? regions : [selectedRegion]).map(r => (
          <RegionBracket key={r} region={r as Region} />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded bg-primary/80 text-primary-foreground flex items-center justify-center text-[10px] font-bold">1</span>
          Seeds 1–4 = top seeds
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded bg-muted text-muted-foreground flex items-center justify-center text-[10px]">9</span>
          Seeds 5–16 = lower seeds
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-primary cursor-pointer underline">Team name</span>
          = click for team detail
        </div>
      </div>
    </div>
  );
}
