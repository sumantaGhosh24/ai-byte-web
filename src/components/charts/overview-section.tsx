import { type AdminDashboardResponse } from "@/types/dashboard.type";

import StatsCard from "../card/stats-card";

interface OverviewSectionProps {
  overview: AdminDashboardResponse["dashboard"]["overview"];
}

const OverviewSection = ({ overview }: OverviewSectionProps) => {
  const cards = [
    { title: "Users", value: overview.totalUsers },
    { title: "Admins", value: overview.totalAdmins },
    { title: "Courses", value: overview.totalCourses },
    { title: "Lessons", value: overview.totalLessons },
    { title: "Quizzes", value: overview.totalQuizzes },
    { title: "Enrollments", value: overview.totalEnrollments },
    { title: "Bookmarks", value: overview.totalBookmarks },
    { title: "Reviews", value: overview.totalReviews },
    { title: "Notifications", value: overview.totalNotifications },
    { title: "Push Tokens", value: overview.totalNotificationTokens },
    { title: "Achievements", value: overview.totalAchievements },
    { title: "Unlocked", value: overview.totalUnlockedAchievements },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <StatsCard key={card.title} title={card.title} value={card.value} />
      ))}
    </div>
  );
};

export default OverviewSection;
