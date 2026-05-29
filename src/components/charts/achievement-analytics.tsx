import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import type { AdminDashboardResponse } from "@/types/dashboard.type";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

interface AchievementAnalyticsProps {
  achievements: AdminDashboardResponse["dashboard"]["achievements"];
}

const AchievementAnalytics = ({ achievements }: AchievementAnalyticsProps) => {
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={achievements.rarity}>
          <XAxis dataKey="achievementRarity" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="_count" fill="#193cb8" />
        </BarChart>
      </ResponsiveContainer>
      <Card>
        <CardHeader>
          <CardTitle>Most Unlocked Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          {achievements.topAchievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center justify-between py-2">
              <span>{achievement.title}</span>
              <Badge>{achievement.unlocks}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AchievementAnalytics;
