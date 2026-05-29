import { Crown, Gem, Shield, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import type { AchievementItem } from "@/types/achievement.type";

export const rarityConfig = {
  common: {
    label: "Common",
    icon: Shield,
    cardClass: "border-slate-300 bg-slate-50 dark:bg-slate-900",
    badgeClass: "bg-slate-100 text-slate-700 border-slate-300",
    glowClass: "",
  },
  rare: {
    label: "Rare",
    icon: Sparkles,
    cardClass:
      "border-blue-400 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950",
    badgeClass: "bg-blue-100 text-blue-700 border-blue-300",
    glowClass: "shadow-[0_0_30px_rgba(59,130,246,0.35)]",
  },
  epic: {
    label: "Epic",
    icon: Gem,
    cardClass:
      "border-purple-500 bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-950 dark:to-fuchsia-950",
    badgeClass: "bg-purple-100 text-purple-700 border-purple-300",
    glowClass: "shadow-[0_0_35px_rgba(168,85,247,0.45)]",
  },
  legendary: {
    label: "Legendary",
    icon: Crown,
    cardClass:
      "border-yellow-500 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-yellow-950 dark:via-amber-950 dark:to-orange-950",
    badgeClass: "bg-yellow-100 text-yellow-700 border-yellow-300",
    glowClass: "shadow-[0_0_45px_rgba(250,204,21,0.55)]",
  },
} as const;

interface AchievementCardProps {
  achievement: AchievementItem;
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const rarity = rarityConfig[achievement.achievementRarity];

  const Icon = rarity.icon;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border p-5 transition-all duration-300",
        rarity.cardClass,
        rarity.glowClass,
      )}
    >
      {(achievement.achievementRarity === "epic" ||
        achievement.achievementRarity === "legendary") && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 top-0 h-full w-12 rotate-12 bg-white/20 blur-xl animate-[shine_4s_linear_infinite]" />
        </div>
      )}
      <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-white/20 blur-3xl" />
      <div className="relative flex flex-col items-center text-center">
        <div className="relative mb-4">
          <img
            src={achievement.badgeImage}
            alt={achievement.title}
            className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
          />
          <div className="absolute -bottom-1 -right-1 rounded-full bg-background p-1 shadow">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <h3 className="line-clamp-1 text-lg font-bold capitalize">{achievement.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{achievement.description}</p>
        <div
          className={cn(
            "mt-4 rounded-full border px-3 py-1 text-xs font-semibold",
            rarity.badgeClass,
          )}
        >
          {rarity.label}
        </div>
      </div>
    </div>
  );
}
