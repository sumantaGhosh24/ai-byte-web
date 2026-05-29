import { toast } from "sonner";
import { Crown, Gem, Shield, Sparkles, Trash2 } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";

import { cn } from "@/lib/utils";
import { useRemoveAchievement } from "@/hooks/use-achievements";
import type { UserAchievement } from "@/types/achievement.type";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const rarityConfig = {
  common: {
    icon: Shield,
    border: "border-slate-300",
    bg: "bg-slate-100",
    cardClass: "border-slate-300 bg-slate-50 dark:bg-slate-900",
    badgeClass: "bg-slate-100 text-slate-700 border-slate-300",
    glow: "",
  },
  rare: {
    icon: Sparkles,
    border: "border-blue-400",
    bg: "bg-blue-100",
    cardClass:
      "border-blue-400 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950",
    badgeClass: "bg-blue-100 text-blue-700 border-blue-300",
    glow: "shadow-[0_0_30px_rgba(59,130,246,0.35)]",
  },
  epic: {
    icon: Gem,
    border: "border-purple-500",
    bg: "bg-purple-100",
    cardClass:
      "border-purple-500 bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-950 dark:to-fuchsia-950",
    badgeClass: "bg-purple-100 text-purple-700 border-purple-300",
    glow: "shadow-[0_0_35px_rgba(168,85,247,0.45)]",
  },
  legendary: {
    icon: Crown,
    border: "border-yellow-500",
    bg: "bg-yellow-100",
    cardClass:
      "border-yellow-500 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-yellow-950 dark:via-amber-950 dark:to-orange-950",
    badgeClass: "bg-yellow-100 text-yellow-700 border-yellow-300",
    glow: "shadow-[0_0_45px_rgba(250,204,21,0.55)]",
  },
} as const;

interface AchievementBadgeProps {
  achievement: UserAchievement;
}

const AchievementBadge = ({ achievement }: AchievementBadgeProps) => {
  const rarity = rarityConfig[achievement.achievement.achievementRarity];

  const Icon = rarity.icon;

  const removeAchievement = useRemoveAchievement();

  const handleRemoveAchievement = () => {
    removeAchievement.mutate(
      {
        userId: achievement.userId,
        achievementId: achievement.achievement.id,
      },
      {
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => toast.success(data.message),
      },
    );
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn(
              "group relative flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-300 hover:scale-110",
              rarity.border,
              rarity.bg,
              rarity.glow,
            )}
          >
            <img
              src={achievement.achievement.badgeImage}
              alt={achievement.achievement.title}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 rounded-full bg-background p-1 border">
              <Icon className="h-3 w-3" />
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className={cn(
            "max-w-xs space-y-2 rounded-xl p-4 flex flex-col",
            rarity.cardClass,
            rarity.glow,
          )}
        >
          {(achievement.achievement.achievementRarity === "epic" ||
            achievement.achievement.achievementRarity === "legendary") && (
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -left-20 top-0 h-full w-12 rotate-12 bg-white/20 blur-xl animate-[shine_4s_linear_infinite]" />
            </div>
          )}
          <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-white/20 blur-3xl" />
          <div className="flex items-center gap-2 w-full">
            <img
              src={achievement.achievement.badgeImage}
              alt={achievement.achievement.title}
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="font-semibold capitalize mb-1 text-white">
                {achievement.achievement.title}
              </p>
              <Badge className={rarity.badgeClass}>
                {achievement.achievement.achievementRarity}
              </Badge>
            </div>
          </div>
          <div className="w-full">
            <p className="text-xs text-muted-foreground">{achievement.achievement.description}</p>
            <p className="text-[11px] text-muted-foreground">
              Unlocked {formatDistanceToNowStrict(achievement.unlockedAt, { addSuffix: true })}
            </p>
          </div>
          <Button
            size="sm"
            variant="destructive"
            className="w-full"
            onClick={handleRemoveAchievement}
            disabled={removeAchievement.isPending}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Remove Achievement
          </Button>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AchievementBadge;
