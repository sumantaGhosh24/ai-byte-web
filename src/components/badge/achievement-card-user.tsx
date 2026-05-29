import { toast } from "sonner";
import { Crown, Gem, Shield, Sparkles, Trash2 } from "lucide-react";

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
    glow: "",
  },
  rare: {
    icon: Sparkles,
    border: "border-blue-400",
    bg: "bg-blue-100",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.4)]",
  },
  epic: {
    icon: Gem,
    border: "border-purple-500",
    bg: "bg-purple-100",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.5)]",
  },
  legendary: {
    icon: Crown,
    border: "border-yellow-500",
    bg: "bg-yellow-100",
    glow: "shadow-[0_0_25px_rgba(250,204,21,0.6)]",
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
        <TooltipContent side="top" className="max-w-xs space-y-2 rounded-xl p-4 flex flex-col">
          <div className="flex items-center gap-2 w-full">
            <img
              src={achievement.achievement.badgeImage}
              alt={achievement.achievement.title}
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="font-semibold capitalize mb-1">{achievement.achievement.title}</p>
              <Badge
                variant={
                  achievement.achievement.achievementRarity === "common"
                    ? "success"
                    : achievement.achievement.achievementRarity === "rare"
                      ? "warning"
                      : achievement.achievement.achievementRarity === "epic"
                        ? "warning"
                        : "destructive"
                }
              >
                {achievement.achievement.achievementRarity}
              </Badge>
            </div>
          </div>
          <div className="w-full">
            <p className="text-xs text-muted-foreground">{achievement.achievement.description}</p>
            <p className="text-[11px] text-muted-foreground">
              Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
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
