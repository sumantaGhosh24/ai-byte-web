import type { AdminDashboardResponse } from "@/types/dashboard.type";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import StatsCard from "../card/stats-card";

interface QuizAnalyticsProps {
  quizzes: AdminDashboardResponse["dashboard"]["quizzes"];
}

const QuizAnalytics = ({ quizzes }: QuizAnalyticsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <StatsCard title="Average Score" value={`${quizzes.averageScore.toFixed(1)}%`} />
          <StatsCard title="Highest Score" value={`${quizzes.highestScore}%`} />
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizAnalytics;
