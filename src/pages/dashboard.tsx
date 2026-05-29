import { useAdminDashboard } from "@/hooks/use-dashboard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import OverviewSection from "@/components/charts/overview-section";
import { AlertTriangle } from "lucide-react";
import UserAnalytics from "@/components/charts/user-analytics";
import CourseAnalytics from "@/components/charts/course-analytics";
import QuizAnalytics from "@/components/charts/quiz-analytics";
import AchievementAnalytics from "@/components/charts/achievement-analytics";
import NotificationAnalytics from "@/components/charts/notification-analytics";
import LatestUsersTable from "@/components/charts/latest-users-table";
import DashboardSkeleton from "@/components/skeleton/dashboard-skeleton";

const DashboardPage = () => {
  const { data, isLoading, isFetching, isError, error } = useAdminDashboard();

  if (isError) {
    return (
      <Alert className="my-5">
        <AlertTriangle />
        <AlertTitle>Something went wrong!</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  if (isLoading || isFetching) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6 my-10">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">AIByte admin analytics overview.</p>
      </div>
      <div className="space-y-8">
        <OverviewSection overview={data?.dashboard?.overview} />
        <UserAnalytics overview={data?.dashboard?.overview} users={data?.dashboard?.users} />
        <CourseAnalytics courses={data?.dashboard?.courses} />
        <QuizAnalytics quizzes={data?.dashboard?.quizzes} />
        <AchievementAnalytics achievements={data?.dashboard?.achievements} />
        <NotificationAnalytics
          notifications={data?.dashboard?.notifications}
          overview={data?.dashboard?.overview}
        />
        <LatestUsersTable users={data?.dashboard?.users} />
      </div>
    </div>
  );
};

export default DashboardPage;
