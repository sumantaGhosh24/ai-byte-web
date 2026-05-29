import type { AdminDashboardResponse } from "@/types/dashboard.type";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import StatsCard from "../card/stats-card";

interface NotifcationAnalyticsProps {
  overview: AdminDashboardResponse["dashboard"]["overview"];
  notifications: AdminDashboardResponse["dashboard"]["notifications"];
}

const NotificationAnalytics = ({ overview, notifications }: NotifcationAnalyticsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Health</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <StatsCard title="Total" value={overview.totalNotifications} />
          <StatsCard title="Unread" value={notifications.unreadNotifications} />
          <StatsCard title="Active Tokens" value={notifications.activeTokens} />
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationAnalytics;
