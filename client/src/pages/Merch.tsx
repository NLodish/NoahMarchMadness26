import { useState } from "react";
import { teams, type Team } from "@/lib/teamData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExternalLink, Search, ShoppingBag, Tag } from "lucide-react";

const conferences = ["All", "ACC", "SEC", "Big Ten", "Big 12", "Big East", "WCC", "MWC", "A-10", "American", "Ivy", "Summit", "MAAC", "Patriot", "Big South", "Southern", "NEC", "SWAC", "Southland", "Sun Belt", "WAC", "MAC", "CAA", "Horizon", "Big West", "Big Sky", "ASUN", "OVC", "America East", "MEAC", "MVC"];
const regions = ["All", "East", "West", "South", "Midwest"];

const priceRanges: Record<string, { jersey: string; hat: string }> = {
  "1": { jersey: "$109–$149", hat: "$34–$49" },
  "2": { jersey: "$99–$139", hat: "$32–$45" },
  "3": { jersey: "$89–$129", hat: "$28–$42" },
  "4": { jersey: "$84–$119", hat: "$26–$38" },
  "5": { jersey: "$79–$109", hat: "$24–$35" },
  "6": { jersey: "$74–$104", hat: "$22–$34" },
  "7": { jersey: "$69–$99", hat: "$20–$32" },
  "8": { jersey: "$65–$95", hat: "$18–$30" },
  "9": { jersey: "$60–$89", hat: "$17–$28" },
  "10": { jersey: "$56–$84", hat: "$16–$27" },
  "11": { jersey: "$52–$79", hat: "$15–$26" },
  "12": { jersey: "$48–$74", hat: "$14–$24" },
  "13": { jersey: "$44–$69", hat: "$13–$22" },
  "14": { jersey: "$40–$64", hat: "$12–$20" },
  "15": { jersey: "$36–$59", hat: "$11–$18" },
  "16": { jersey: "$32–$54", hat: "$10–$16" },
};

function TeamMerchCard({ team }: { team: Team }) {
  const prices = priceRanges[String(team.seed)] || { jersey: "$34–$54", hat: "$12–$20" };
  const amazonUrl = `https://www.amazon.com/s?k=${encodeURIComponent(team.shortName + " march madness 2026")}`;
  const officialUrl = `https://www.google.com/search?q=${encodeURIComponent(team.name + " official store")}`;

  const regionBadgeColor = {
    East: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    West: "bg-red-500/10 text-red-400 border-red-500/20",
    South: "bg-green-500/10 text-green-400 border-green-500/20",
    Midwest: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  }[team.region] || "";

  return (
    <Card
      className="bg-card border-border hover:border-primary/30 transition-all hover:shadow-lg"
      data-testid={`merch-card-${team.id}`}
      style={{
        background: `linear-gradient(135deg, ${team.colors.primary}18 0%, transparent 50%)`,
      }}
    >
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold bg-primary/80 text-primary-foreground w-5 h-5 rounded flex items-center justify-center flex-shrink-0">
                {team.seed}
              </span>
              <span className="font-semibold text-foreground text-sm truncate">{team.name}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
              <Badge variant="outline" className={`text-[10px] border px-1.5 ${regionBadgeColor}`}>
                {team.region}
              </Badge>
              <span className="text-[10px] text-muted-foreground">{team.conference}</span>
              <span className="text-[10px] text-muted-foreground">{team.record}</span>
            </div>
          </div>
          {/* Color dots */}
          <div className="flex gap-1 flex-shrink-0">
            <div className="w-4 h-4 rounded-full border border-white/10" style={{ backgroundColor: team.colors.primary }} title={team.colors.primary} />
            <div className="w-4 h-4 rounded-full border border-white/10" style={{ backgroundColor: team.colors.secondary }} title={team.colors.secondary} />
          </div>
        </div>

        {/* Price range */}
        <div className="flex gap-3 mb-3 text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Tag size={10} />
            <span>Jersey: <span className="text-foreground">{prices.jersey}</span></span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Tag size={10} />
            <span>Hat: <span className="text-foreground">{prices.hat}</span></span>
          </div>
        </div>

        {/* Mascot */}
        <div className="text-xs text-muted-foreground mb-3">
          <span className="font-medium text-foreground">{team.mascot.name}</span>
          {" · "}{team.mascot.description.split(".")[0]}.
        </div>

        {/* Links */}
        <div className="grid grid-cols-3 gap-1.5">
          <MerchLink href={team.merchUrl} label="Fanatics" />
          <MerchLink href={amazonUrl} label="Amazon" />
          <MerchLink href={officialUrl} label="Official" />
        </div>
      </CardContent>
    </Card>
  );
}

function MerchLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-1 p-1.5 rounded bg-muted hover:bg-muted/70 transition-colors text-[11px] text-muted-foreground hover:text-foreground group"
      data-testid={`merch-link-${label.toLowerCase()}`}
    >
      {label}
      <ExternalLink size={10} className="opacity-50 group-hover:opacity-100" />
    </a>
  );
}

export default function Merch() {
  const [search, setSearch] = useState("");
  const [conference, setConference] = useState("All");
  const [region, setRegion] = useState("All");
  const [sortBy, setSortBy] = useState<"seed" | "conference" | "name">("seed");

  const filtered = teams
    .filter(t => {
      const matchSearch = search === "" ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.shortName.toLowerCase().includes(search.toLowerCase());
      const matchConf = conference === "All" || t.conference === conference;
      const matchRegion = region === "All" || t.region === region;
      return matchSearch && matchConf && matchRegion;
    })
    .sort((a, b) => {
      if (sortBy === "seed") return a.seed - b.seed;
      if (sortBy === "conference") return a.conference.localeCompare(b.conference);
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <ShoppingBag size={22} className="text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Official Merchandise</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Shop gear for all 68 March Madness 2026 teams</p>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Teams", value: "68" },
          { label: "Conferences", value: "19" },
          { label: "Regions", value: "4" },
          { label: "Showing", value: String(filtered.length) },
        ].map(stat => (
          <div key={stat.label} className="text-center p-3 rounded-xl bg-card border border-border">
            <div className="text-lg font-black text-primary">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search teams..."
            className="pl-9 bg-input border-border"
            data-testid="merch-search"
          />
        </div>
        <Select value={conference} onValueChange={setConference} data-testid="conference-filter">
          <SelectTrigger className="w-[160px] bg-input border-border" data-testid="conference-select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {conferences.map(c => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={region} onValueChange={setRegion} data-testid="region-filter">
          <SelectTrigger className="w-[130px] bg-input border-border" data-testid="region-select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {regions.map(r => (
              <SelectItem key={r} value={r}>{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={v => setSortBy(v as any)} data-testid="sort-by">
          <SelectTrigger className="w-[130px] bg-input border-border" data-testid="sort-select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="seed">By Seed</SelectItem>
            <SelectItem value="conference">By Conference</SelectItem>
            <SelectItem value="name">A–Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <ShoppingBag size={36} className="mx-auto mb-3 opacity-20" />
          <p>No teams match your search. Try adjusting filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(team => (
            <TeamMerchCard key={team.id} team={team} />
          ))}
        </div>
      )}
    </div>
  );
}
