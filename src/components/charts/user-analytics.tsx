import type { AdminDashboardResponse } from "@/types/dashboard.type";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

interface UserAnalyticsProps {
  users: AdminDashboardResponse["dashboard"]["users"];
  overview: AdminDashboardResponse["dashboard"]["overview"];
}

const UserAnalytics = ({ users, overview }: UserAnalyticsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Analytics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <p>Onboarding Completion</p>
          <Progress value={(users.onboardingCompletedUsers / overview.totalUsers) * 100} />
        </div>
        <div>
          <p>Onboarding Pending</p>
          <Progress value={(users.onboardingPendingUsers / overview.totalUsers) * 100} />
        </div>
        <div>
          <p>Push Notifications Enabled</p>
          <Progress value={(users.pushEnabledUsers / overview.totalUsers) * 100} />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserAnalytics;
